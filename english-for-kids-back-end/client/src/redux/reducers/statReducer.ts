import {
  StatAction, StatActionTypes, IUpdateStatTrain, IUpdateStatSuccess, IUpdateStatFail,
} from '../types';
import { IStatWord } from '../../models/IStatWord';

export interface IStat {
  statistic: IStatWord[],
  difficultWords: IStatWord[]
}

export const initialState: IStat = {
  statistic: [],
  difficultWords: [],
};

export const statReducer = (statstic: IStat = initialState, action: StatAction):IStat => {
  switch (action.type) {
    case StatActionTypes.GET_STAT_FROM_LOCALSTSTORAGE:
      return { ...statstic, statistic: action.payload };
    case StatActionTypes.FETCH_STAT:
      return { ...statstic, statistic: action.payload };
    case StatActionTypes.UPDATE_STAT_TRAIN:
      return { ...statstic, statistic: action.payload };
    case StatActionTypes.UPDATE_STAT_SUCCESS:
      return { ...statstic, statistic: action.payload };
    case StatActionTypes.UPDATE_STAT_FAIL:
      return { ...statstic, statistic: action.payload };
    case StatActionTypes.GET_DIFFICULT_WORDS:
      return { ...statstic, difficultWords: action.payload };
    case StatActionTypes.SET_RESET_STAT:
      return { ...statstic, statistic: action.payload, difficultWords: [] };
    default: return statstic;
  }
};
