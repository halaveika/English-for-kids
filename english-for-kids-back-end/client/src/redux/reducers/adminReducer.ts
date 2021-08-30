import { IGetCategiesPayload } from '../../models/admin/IGetCategiesPayload';
import { IDataMedia } from '../../models/IDataMedia';
import { AdminAction, AdminActionTypes } from '../types';

export interface IAdminState {
  categories: IGetCategiesPayload[],
  words: IDataMedia[],
  currentCategory: string | null,
}

export const initialState: IAdminState = {
  categories: [],
  words: [],
  currentCategory: null,
};

export const adminReducer = (state: IAdminState = initialState, action: AdminAction)
: IAdminState => {
  switch (action.type) {
    case AdminActionTypes.GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case AdminActionTypes.POST_CATEGORY:
      return { ...state, categories: action.payload };
    case AdminActionTypes.DELETE_CATEGORY:
      return { ...state, categories: action.payload };
    case AdminActionTypes.UPDATE_CATEGORY:
      return { ...state, categories: action.payload };
    case AdminActionTypes.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case AdminActionTypes.GET_WORDS:
      return { ...state, words: action.payload };
    case AdminActionTypes.POST_WORD:
      return { ...state, words: action.payload };
    case AdminActionTypes.UPDATE_WORD:
      return { ...state, words: action.payload };
    case AdminActionTypes.DELETE_WORD:
      return { ...state, words: action.payload };
    default: return state;
  }
};
