import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import booksReducer from './bookReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  books: booksReducer,
  book: booksReducer
});
