import axios from 'axios';

const getBooks = (limit = 20, start = 0, order = 'asc', oldList = '') => {
  let requestUrl = `/api/book/all?limit=${limit}&skip=${start}&order=${order}`;

  const books = axios.get(requestUrl)
      .then(booksFromDB => {
        return oldList ? [...booksFromDB.data, ...oldList] : booksFromDB.data;
      })
      .catch(e => console.log(e));

  return {
    type: "GET_BOOKS",
    payload: books
  }
};

const getBookWithReviewer = async (id) => {
  let book = await axios.get(`/api/book?id=${id}`);
  let user = await axios.get(`/api/users/getReviewer?id=${book.data.ownerID}`);
  return (dispatch) => {
    dispatch({
      type: 'GET_BOOK_W_REVIEWER',
      payload: {book: book.data, reviewer: user.data}
    })
  }
};

const clearBookWithReviewer = () => {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {book: {}, reviewer: {}}
  }
};

const addBook = async (book) => {
  let newBook = await axios.post('/api/book', book);

  return (dispatch) => {
    return dispatch({
      type: 'ADD_BOOK',
      payload: newBook.data
    })
  }
};

const clearNewBook = () => {
  return {
    type: 'CLEAR_NEW_BOOK',
    payload: {}
  }
};

const getBookWithId = async (id) => {
  let book = await axios.get(`/api/book/?id=${id}`);
  return (dispatch) => {
    return dispatch({
      type: 'GET_BOOK',
      payload: book.data
    })
  }
};

const updateBook = async (book) => {
  const updatedBook = await axios.put(`/api/book/`, book);

  return (dispatch) => {
    return dispatch({
      type: 'UPDATE_BOOK',
      payload: updatedBook.data
    })
  }
};

const deleteBook = async (id) => {
  let bookToDelete = await axios.delete(`/api/book/?id=${id}`);

  return (dispatch) => {
    return dispatch({
      type: 'DELETE_BOOK',
      payload: bookToDelete.data
    })
  }
};

const clearDeletedBook = () => {
  return {
    type: 'CLEAR_DELETED_BOOK',
    payload: {
      updatedBook: false,
      deletedBook: false
    }
  }
};

//--------USER------------------------------------------------------------

const registerUser = async (userToAdd, usersInUI) => {
  let newUser = await axios.post('/api/users/register', userToAdd);

  let allUsers = newUser.data.success ? (
      [ newUser.data.user, ...usersInUI ]
  ) :  usersInUI;

  return (dispatch) => {
    return dispatch({
      type: 'REGISTER_NEW_USER',
      payload: {
        allUsers,
        success: newUser.data.success,
        newUser: newUser.data.user,
        authLogin: {isAuth: newUser.data.isAuth},
        userIsAuthenticated: newUser.data.isAuth
      }
    })
  }
};

const clearRegisterUser = () => {
  return {
    type: 'CLEAR_REGISTER_USER',
    payload: {
      registerUserSuccess: false
    }
  }
};

const loginUser = async (email, password) => {

  let user = await axios.post('/api/users/login', {email, password});

  return (dispatch) => {
    return dispatch({
      type: 'USER_LOGIN',
      payload: {message: '', ...user.data}
    })
  };
};

const logOut = () => {
  return (dispatch) => {
    return dispatch({
      type: 'USER_LOGOUT',
      payload: {
        authLogin: '',
        login: '',
        userIsAuthenticated: false,
        userPosts: []
      }
    })
  };
};


const auth = async () => {
  let userAuth = await axios.get('/api/users/auth');

  return (dispatch) => {
    return dispatch({
      type: 'USER_AUTH',
      payload: {
        ...userAuth.data,
        userIsAuthenticated: userAuth.data.isAuth
      }
    })
  };
};

const getUserPosts = async (id) => {

  let userPosts = await axios.get(`/api/users/posts?userID=${id}`);

  return (dispatch) => {
    dispatch({
      type: 'GET_USER_POSTS',
      payload: userPosts.data
    })
  }
};

const getUsers = async () => {

  let allUsers = await axios.get('/api/users');

  return (dispatch) => {
    return dispatch({
      type: 'GET_ALL_USERS',
      payload: allUsers.data
    })
  }
};


export {
  getBooks,
  getBookWithReviewer,
  clearBookWithReviewer,
  loginUser,
  auth,
  addBook,
  clearNewBook,
  getUserPosts,
  getBookWithId,
  updateBook,
  deleteBook,
  clearDeletedBook,
  getUsers,
  registerUser,
  clearRegisterUser,
  logOut
}