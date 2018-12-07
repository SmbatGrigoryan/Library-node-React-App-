import { combineReducers } from 'redux';

import BooksReducer from './BooksReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  books: BooksReducer,
  user: UserReducer
});

export default rootReducer;