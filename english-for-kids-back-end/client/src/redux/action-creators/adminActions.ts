import { Dispatch } from 'redux';
import axios from 'axios';
import { AdminAction, AdminActionTypes } from '../types';
import {
  GET_CATEGORY_PATH, PAGEN_NUMBER, GET_WORDS_PATH, UPLOAD_PATH,
} from '../../constants';

export const AdminGetCategories = (number: number):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.get(`${GET_CATEGORY_PATH}?number=${number}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_CATEGORIES, payload: response.data });
};

export const AdminPostCategory = (title: string):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.post(`${GET_CATEGORY_PATH}?number=${PAGEN_NUMBER - 1}&title=${title}`,
    null, { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_CATEGORIES, payload: response.data });
};

export const AdminDeleteCategory = (title: string):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.delete(`${GET_CATEGORY_PATH}?number=${PAGEN_NUMBER - 1}&title=${title}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_CATEGORIES, payload: response.data });
};

export const AdminUpdateCategory = (title: string, newTitle: string):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const resp = await axios
    .put(`${GET_CATEGORY_PATH}?number=${PAGEN_NUMBER - 1}&title=${title}&newTitle=${newTitle}`,
      null, { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_CATEGORIES, payload: resp.data });
};

export const AdminSetCurrentCategory = (category:string | null)
 :AdminAction => ({
  type: AdminActionTypes.SET_CURRENT_CATEGORY,
  payload: category,
});

export const AdminGetWords = (number: number, category: string):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.get(`${GET_WORDS_PATH}?number=${number}&category=${category}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_WORDS, payload: response.data });
};

export const AdminUpdateWord = (formData: FormData):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.put(`${UPLOAD_PATH}`, formData,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_WORDS, payload: response.data });
};

export const AdminDeleteWord = (word: string, category: string, number: number):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.delete(`${GET_WORDS_PATH}?number=${number}&category=${category}&word=${word}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token-jsfe2021q1')}` } });
  dispatch({ type: AdminActionTypes.GET_WORDS, payload: response.data });
};

export const AdminPostWord = (formData: FormData):(dispatch: Dispatch<AdminAction>) =>
 void => async (dispatch: Dispatch<AdminAction>) => {
  const response = await axios.post(`${UPLOAD_PATH}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  dispatch({ type: AdminActionTypes.GET_WORDS, payload: response.data });
};
