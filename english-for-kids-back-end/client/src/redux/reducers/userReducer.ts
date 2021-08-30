import { UserAction, UserActionTypes } from '../types';

export interface IUser{
  userId: string,
  isAuth: boolean,
}

export const initialState: IUser = {
  userId: '',
  isAuth: false,
};

export const userReducer = (state: IUser = initialState, action: UserAction)
: IUser => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return { ...state, userId: action.payload, isAuth: true };
    case UserActionTypes.LOGOUT:
      return { ...state, userId: action.payload, isAuth: false };
    default: return state;
  }
};
