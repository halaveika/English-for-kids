import { IContent } from './IContent';

export interface IDataState {
  category: string,
  mode: string,
  content: IContent[],
  sidebar: boolean,
  popupLogin: boolean
}
