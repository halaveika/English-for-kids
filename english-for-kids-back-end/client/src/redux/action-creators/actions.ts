import { Dispatch } from 'redux';
import { push, RouterAction } from 'connected-react-router';
import {
  RenderAction, RenderActionTypes, GameAction, GameActionTypes, StatActionTypes,
  StatAction, UserAction, UserActionTypes,
} from '../types';
import {
  PATHJSON, LOGIN_PATH, AUTH_PATH, GET_CONTENT_PATH, GET_STAT_PATH,
} from '../../constants';
import { IGameCard } from '../../models/IGameCard';
import { IStatWord } from '../../models/IStatWord';
import playAudio from '../../shared/playAudio';
import delay from '../../shared/delay';
import { IContent } from '../../models/IContent';

export const RenderContent = (category:string):RenderAction => ({
  type: RenderActionTypes.GET_CATEGORY,
  payload: category,
});

export const RenderSidebar = (sidebar:boolean)
:RenderAction => ({
  type: RenderActionTypes.GET_SIDEBAR_STATE,
  payload: sidebar,
});

export const RenderPopupLogin = (popup:boolean)
:RenderAction => ({
  type: RenderActionTypes.SET_POPUP_LOGIN,
  payload: popup,
});

export const SwitchGameMode = (mode:string):RenderAction => ({
  type: RenderActionTypes.GET_GAME_MODE,
  payload: mode,
});

export const FetchContent = ():(dispatch: Dispatch<RenderAction>) =>
 void => (dispatch: Dispatch<RenderAction>) => {
  fetch(GET_CONTENT_PATH)
    .then((response) => response.json())
    .then((json) => dispatch({ type: RenderActionTypes.GET_CONTENT, payload: json }));
};

export const SetGame = (game: boolean, cards: IGameCard[] | null) => (dispatch: Dispatch<GameAction>): void => {
  let cardsSorted:IGameCard[] | null = null;
  let currentCard:IGameCard | null = null;
  if (cards !== null) {
    cardsSorted = cards.sort(() => Math.random() - 0.5);
    [currentCard] = cardsSorted;
    delay(1000).then<void>(():void => {
      playAudio(currentCard!.audioSrc);
      dispatch({
        type: GameActionTypes.SET_GAME,
        payload: { game, currentCard: currentCard!, cards: cardsSorted! },
      });
    });
  }
};

export const SetCurrentCard = (currentCard: IGameCard | null) :GameAction => ({
  type: GameActionTypes.SET_CURRENT_CARD,
  payload: currentCard,
});

export const SetGameScore = (turn: boolean) :GameAction => ({
  type: GameActionTypes.SET_GAME_SCORE,
  payload: turn,
});

export const EndGame = () :GameAction => ({
  type: GameActionTypes.END_GAME,
  payload: false,
});

export const FetchStat = ():(dispatch: Dispatch<StatAction>) =>
 void => (dispatch: Dispatch<StatAction>) => {
  fetch(GET_STAT_PATH, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((json) => dispatch({ type: StatActionTypes.FETCH_STAT, payload: json }));
};

export const UpdateTrainStat = (word:string, category:string):(dispatch: Dispatch<StatAction>) =>
 void => (dispatch: Dispatch<StatAction>) => {
  fetch(GET_STAT_PATH, {
    method: 'PUT',
    body: JSON.stringify({
      word, category, trainCount: 1, successCount: 0, failCount: 0,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => dispatch({ type: StatActionTypes.UPDATE_STAT_TRAIN, payload: json }));
};

export const UpdateSuccessStat = (word:string, category:string):(dispatch: Dispatch<StatAction>) =>
 void => (dispatch: Dispatch<StatAction>) => {
  fetch(GET_STAT_PATH, {
    method: 'PUT',
    body: JSON.stringify({
      word, category, trainCount: 0, successCount: 1, failCount: 0,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => dispatch({ type: StatActionTypes.UPDATE_STAT_SUCCESS, payload: json }));
};

export const UpdateFailStat = (word:string, category:string):(dispatch: Dispatch<StatAction>) =>
 void => (dispatch: Dispatch<StatAction>) => {
  fetch(GET_STAT_PATH, {
    method: 'PUT',
    body: JSON.stringify({
      word, category, trainCount: 0, successCount: 0, failCount: 1,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => dispatch({ type: StatActionTypes.UPDATE_STAT_FAIL, payload: json }));
};

export const GetDifficultWords = (statistic:IStatWord[]):StatAction => {
  const difSortedArr = statistic.slice(0)
    .filter((element) => (element.percentSuccess !== 0 && element.percentSuccess !== 100))
    .sort((a, b) => (a.percentSuccess - b.percentSuccess));
  const failSortedArr = statistic.slice(0)
    .filter((element) => (element.percentSuccess === 0 && element.failCount !== 0))
    .sort((a, b) => (b.failCount - a.failCount));
  const difficultWordsArr = [...failSortedArr, ...difSortedArr];
  if (difficultWordsArr.length > 8) { difficultWordsArr.splice(8, difficultWordsArr.length); }
  return {
    type: StatActionTypes.GET_DIFFICULT_WORDS,
    payload: difficultWordsArr,
  };
};

export const SetResetStat = ():(dispatch: Dispatch<StatAction>) =>
 void => (dispatch: Dispatch<StatAction>) => {
  fetch(GET_STAT_PATH, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((json) => dispatch({ type: StatActionTypes.SET_RESET_STAT, payload: json }));
};

interface ILoginResponce {
  token:string,
  user: {
    id: string,
  }
}

export const Login = (body: { login:string, password:string}) => async (dispatch:
   Dispatch<UserAction|RouterAction>) => {
  try {
    const response:Promise<ILoginResponce> = (await fetch(LOGIN_PATH, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
    dispatch({ type: UserActionTypes.SET_USER, payload: (await response).user.id });
    localStorage.setItem('token-jsfe2021q1', (await response).token);
    dispatch(push('/category'));
  } catch (e) {
    alert(e.response.message);
  }
};

export const Logout = () :UserAction => {
  localStorage.removeItem('token-jsfe2021q1');
  return {
    type: UserActionTypes.LOGOUT,
    payload: '',
  };
};

export const Auth = (user:string) => async (dispatch: Dispatch<UserAction>) => {
  try {
    const token = localStorage.getItem('token-jsfe2021q1');
    const response:Promise<ILoginResponce> = (await fetch(AUTH_PATH, {
      method: 'GET',
      body: JSON.stringify({
        token,
        user: {
          id: user,
        },
      }),
      headers: { Authorization: `Bearer ${token}` },
    })).json();
    dispatch({ type: UserActionTypes.SET_USER, payload: (await response).user.id });
    localStorage.setItem('token-jsfe2021q1', (await response).token);
  } catch (e) {
    localStorage.removeItem('token-jsfe2021q1');
  }
};
