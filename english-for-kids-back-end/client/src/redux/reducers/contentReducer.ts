import { IDataState } from '../../models/IDataState';
import { RenderAction, RenderActionTypes } from '../types';
import { TRAIN, CATEGORY } from '../../constants';

export const initialState: IDataState = {
  category: CATEGORY,
  mode: TRAIN,
  content: [],
  sidebar: false,
  popupLogin: false,
};

export const contentReducer = (state: IDataState = initialState, action: RenderAction)
: IDataState => {
  switch (action.type) {
    case RenderActionTypes.GET_CONTENT:
      return { ...state, content: action.payload };
    case RenderActionTypes.GET_CATEGORY:
      return { ...state, category: action.payload };
    case RenderActionTypes.GET_GAME_MODE:
      return { ...state, mode: action.payload };
    case RenderActionTypes.GET_SIDEBAR_STATE:
      return { ...state, sidebar: action.payload };
    case RenderActionTypes.SET_POPUP_LOGIN:
      return { ...state, popupLogin: action.payload };
    case RenderActionTypes.GET_STATISTIC:
      return { ...state, category: action.payload };
    default: return state;
  }
};
