const initialState = {
  users: [],
  userid: '',
  name: '',
  profilePicture: null,
  email: '',
  phone: ''
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'GET_USER_ID':
      return {
        ...state,
        userid: action.payload,
      };
    case 'GET_USER_NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'GET_USER_PROFILE_PICTURE':
      return {
        ...state,
        profilePicture: action.payload,
      };
    case 'GET_USER_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'GET_USER_PHONE':
      return {
        ...state,
        phone: action.payload,
      };
    case 'GET_USER_DETAIL':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
