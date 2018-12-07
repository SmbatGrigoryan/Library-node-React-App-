const BooksReducer = (state = {}, action) => {

  switch (action.type) {

    case 'GET_BOOK':
      return {...state, bookToEdit: action.payload};

    case "GET_BOOKS":
      return {...state, list: action.payload};

    case 'GET_BOOK_W_REVIEWER':
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer
      };

    case 'CLEAR_BOOK_W_REVIEWER':
      return {
        ...state,
        book: action.payload.book,
        reviewer: action.payload.reviewer
      };

    case 'ADD_BOOK':
      return {
        ...state, newBook: action.payload
      };
    case 'CLEAR_NEW_BOOK':
      return {...state, newBook: action.payload};

    case 'UPDATE_BOOK':
      return {...state, updatedBook: action.payload};

    case 'DELETE_BOOK':
      return {...state, deletedBook: action.payload};

    case 'CLEAR_DELETED_BOOK':
      return {...state, ...action.payload};

    default:
      return state;
  }
};

export default BooksReducer;