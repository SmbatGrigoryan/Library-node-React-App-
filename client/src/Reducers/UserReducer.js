
const UserReducer = (state = {}, action) => {
  switch (action.type) {

    case 'USER_LOGIN':
      return { ...state, login: action.payload };

    case 'USER_AUTH':
      return {  ...state,
        authLogin: action.payload,
        userIsAuthenticated: action.payload.userIsAuthenticated
      };

    case 'GET_USER_POSTS':
      return {...state, userPosts: action.payload };

    case 'GET_ALL_USERS':
      return { ...state, allUsers: action.payload };

    case 'REGISTER_NEW_USER':
      return {
        ...state,
        allUsers: action.payload.allUsers,
        registerUserSuccess: action.payload.success,
        newUser: action.payload.newUser,
        authLogin: action.payload.authLogin,
        userIsAuthenticated: action.payload.userIsAuthenticated
      };

      case 'CLEAR_REGISTER_USER':
      return {
        ...state,
        registerUserSuccess: action.payload.success
      };

    case 'USER_LOGOUT':
      return {
        ...state,
        authLogin: action.payload.authLogin,
        login: action.payload.login,
        userIsAuthenticated: action.payload.userIsAuthenticated,
        userPosts: action.payload.userPosts
      };

    default:
      return state;
  }
};

export default UserReducer;