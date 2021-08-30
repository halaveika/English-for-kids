import { combineReducers, Reducer, CombinedState } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { contentReducer } from './contentReducer';
import { gameReducer, IGameState } from './gameReducer';
import { statReducer, IStat } from './statReducer';
import { userReducer, IUser } from './userReducer';
import { adminReducer, IAdminState } from './adminReducer';
import { IDataState } from '../../models/IDataState';

import {
  RenderAction, GameAction, StatAction, UserAction, AdminAction,
} from '../types';

const rootReducer = (history:History):Reducer<CombinedState<{
  data: IDataState;
  game: IGameState;
  stat: IStat;
  user: IUser;
  router: RouterState;
  admin: IAdminState;
}>, RenderAction | GameAction | StatAction | UserAction | AdminAction> => combineReducers({
  data: contentReducer,
  game: gameReducer,
  stat: statReducer,
  user: userReducer,
  router: connectRouter(history),
  admin: adminReducer,
});

export default rootReducer;
