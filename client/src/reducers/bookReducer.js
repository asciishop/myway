import mapKeys from 'lodash/mapKeys';
import { FETCH_BOOKS, FETCH_BOOK, FETCH_ALL_BOOKS, ADD_BOOK } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_BOOK:
      const book = action.payload;
      return { ...state, [book._id]: book };
    case FETCH_BOOKS:
      return { ...state, ...mapKeys(action.payload, '_id') };
    case FETCH_ALL_BOOKS:
        return { ...state, ...mapKeys(action.payload, '_id') };
    case ADD_BOOK:
      return state.concat([action.payload]);
    default:
      return state;
  }
}
