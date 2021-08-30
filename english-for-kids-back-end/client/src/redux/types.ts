import { IContent } from '../models/IContent';
import { IGameCard } from '../models/IGameCard';
import { IStatWord } from '../models/IStatWord';
import { IUpdateStatPayload } from '../models/IUpdateStatPayload';
import { IGetCategiesPayload } from '../models/admin/IGetCategiesPayload';
import { IDataMedia } from '../models/IDataMedia';

export enum RenderActionTypes {
  GET_CONTENT = 'RENDER/GET_CONTENT',
  GET_CATEGORY = 'RENDER/GET_CATEGORY',
  GET_GAME_MODE = 'RENDER/GET_GAME_MODE',
  GET_SIDEBAR_STATE ='RENDER/GET_SIDEBAR_STATE',
  SET_POPUP_LOGIN ='RENDER/SET_POPUP_LOGIN',
  GET_STATISTIC = 'RENDER/GET_STATISTIC',
}

export interface GetContent {
  type: RenderActionTypes.GET_CONTENT
  payload: IContent[]
}

export interface GetCategory {
  type: RenderActionTypes.GET_CATEGORY,
  payload: string
}

export interface GetGameMode {
  type: RenderActionTypes.GET_GAME_MODE,
  payload: string
}

export interface GetSidebarState {
  type: RenderActionTypes.GET_SIDEBAR_STATE,
  payload: boolean
}

export interface SetPopupLogin {
  type: RenderActionTypes.SET_POPUP_LOGIN,
  payload: boolean
}

export interface GetStatistic {
  type: RenderActionTypes.GET_STATISTIC
  payload: string
}

export type RenderAction = GetContent | GetGameMode | GetCategory | GetSidebarState |
SetPopupLogin | GetStatistic;

export enum GameActionTypes {
  SET_GAME = 'GAME/SET_GAME',
  SET_CURRENT_CARD = 'GAME/SET_CURRENT_CARD',
  END_GAME = 'GAME/END_GAME',
  SET_GAME_SCORE = 'GAME/SET_GAME_SCORE'
}

export interface SetGame {
  type: GameActionTypes.SET_GAME,
  payload: {game: boolean, currentCard:IGameCard | null, cards: IGameCard[] }
}

export interface ISetGameScore {
  type: GameActionTypes.SET_GAME_SCORE,
  payload: boolean
}

export interface SetCurrentCard {
  type: GameActionTypes.SET_CURRENT_CARD,
  payload: IGameCard | null
}

export interface EndGame {
  type: GameActionTypes.END_GAME,
  payload: boolean
}

export type GameAction = SetGame | SetCurrentCard | ISetGameScore | EndGame;

export enum StatActionTypes {
  GET_STAT_FROM_LOCALSTSTORAGE = 'STAT/GET_STAT_FROM_LOCALSTSTORAGE',
  FETCH_STAT = 'STAT/FETCH_STAT',
  UPDATE_STAT_TRAIN = 'STAT/UPDATE_STAT_TRAIN',
  UPDATE_STAT_SUCCESS = 'STAT/UPDATE_STAT_SUCCESS',
  UPDATE_STAT_FAIL = 'STAT/UPDATE_STAT_FAIL',
  SET_NULL_STAT_LASTUPDATE = 'STAT/SET_NULL_STAT_LASTUPDATE',
  GET_DIFFICULT_WORDS = 'STAT/GET_DIFFICULT_WORDS',
  SET_RESET_STAT = 'SET_RESET_STAT'
}

export interface IGetStat {
  type: StatActionTypes.GET_STAT_FROM_LOCALSTSTORAGE,
  payload: IStatWord[]
}

export interface IFetchStat {
  type: StatActionTypes.FETCH_STAT,
  payload: IStatWord[]
}

export interface IUpdateStatTrain {
  type: StatActionTypes.UPDATE_STAT_TRAIN,
  payload:IStatWord[]
}

export interface IUpdateStatSuccess {
  type: StatActionTypes.UPDATE_STAT_SUCCESS,
  payload: IStatWord[]
}

export interface IUpdateStatFail {
  type: StatActionTypes.UPDATE_STAT_FAIL,
  payload: IStatWord[]
}

export interface IGetDifficultWords {
  type: StatActionTypes.GET_DIFFICULT_WORDS,
  payload: IStatWord[]
}

export interface ISetResetStat {
  type: StatActionTypes.SET_RESET_STAT,
  payload: IStatWord[]
}

export type StatAction = IGetStat | IFetchStat | IUpdateStatTrain
 | IUpdateStatSuccess | IUpdateStatFail | IGetDifficultWords | ISetResetStat;

export enum UserActionTypes {
  SET_USER = 'USER/SET_USER',
  LOGOUT = 'USER/Logout',
}

export interface ISET_USER {
  type: UserActionTypes.SET_USER,
  payload: string
}

export interface Logout {
  type: UserActionTypes.LOGOUT,
  payload: ''
}

export type UserAction = ISET_USER | Logout;

export enum AdminActionTypes {
  GET_CATEGORIES = 'ADMIN/GET_CATEGORIES',
  POST_CATEGORY = 'ADMIN/POST_CATEGORY',
  UPDATE_CATEGORY = 'ADMIN/UPDATE_CATEGORY',
  DELETE_CATEGORY = 'ADMIN/DELETE_CATEGORY',
  GET_WORDS = 'ADMIN/GET_WORD',
  POST_WORD = 'ADMIN/POST_WORD',
  UPDATE_WORD = 'ADMIN/UPDATE_WORD',
  DELETE_WORD = 'ADMIN/DELETE_WORD',
  SET_CURRENT_CATEGORY = 'ADMIN/SET_CURRENT_CATEGORY',
}

export interface AdminGetCategories {
  type: AdminActionTypes.GET_CATEGORIES
  payload: IGetCategiesPayload[]
}

export interface AdminPostCategory {
  type: AdminActionTypes.POST_CATEGORY
  payload: IGetCategiesPayload[]
}

export interface AdminDeleteCategory {
  type: AdminActionTypes.DELETE_CATEGORY
  payload: IGetCategiesPayload[]
}

export interface AdminUpdateCategory {
  type: AdminActionTypes.UPDATE_CATEGORY
  payload: IGetCategiesPayload[]
}

export interface AdminGetWords {
  type: AdminActionTypes.GET_WORDS
  payload: IDataMedia[]
}

export interface AdminPostWord {
  type: AdminActionTypes.POST_WORD
  payload: IDataMedia[]
}

export interface AdminUpdateWord {
  type: AdminActionTypes.UPDATE_WORD
  payload: IDataMedia[]
}

export interface AdminDeleteWord {
  type: AdminActionTypes.DELETE_WORD
  payload: IDataMedia[]
}

export interface AdminSetCurrentCategory {
  type: AdminActionTypes.SET_CURRENT_CATEGORY
  payload: string | null
}

export type AdminAction = AdminGetCategories | AdminDeleteCategory | AdminPostCategory
 | AdminUpdateCategory | AdminGetWords | AdminSetCurrentCategory | AdminPostWord | AdminDeleteWord | AdminUpdateWord;
