import { GameAction, GameActionTypes } from '../types';
import { IGameCard } from '../../models/IGameCard';

export interface IGameState {
  game: boolean,
  currentCard: IGameCard | null,
  cards: IGameCard[] | null,
  score: boolean[]
}

export const initialState: IGameState = {
  game: false,
  currentCard: null,
  cards: null,
  score: [],
};

export const gameReducer = (state: IGameState = initialState, action: GameAction):IGameState => {
  switch (action.type) {
    case GameActionTypes.SET_GAME:
      return {
        ...state,
        game: action.payload.game,
        currentCard: action.payload.currentCard,
        cards: action.payload.cards,
      };
    case GameActionTypes.SET_CURRENT_CARD:
      return { ...state, currentCard: action.payload };
    case GameActionTypes.SET_GAME_SCORE:
      return { ...state, score: state.score.concat([action.payload]) };
    case GameActionTypes.END_GAME:
      return {
        ...state, game: action.payload, currentCard: null, cards: null, score: [],
      };
    default: return state;
  }
};
