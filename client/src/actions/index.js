import axios from 'axios';
import { FETCH_USER, FETCH_BOOKS, FETCH_BOOK } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBook = (values, history) => async dispatch => {
  const res = await axios.post('/api/book', values);

  history.push('/book');
  dispatch({ type: FETCH_BOOK, payload: res.data });
};

export const fetchBooks = () => async dispatch => {
  const res = await axios.get('/api/book');

  dispatch({ type: FETCH_BOOKS, payload: res.data });
};

export const fetchBook = id => async dispatch => {
  const res = await axios.get(`/api/book/${id}`);

  dispatch({ type: FETCH_BOOK, payload: res.data });
};
