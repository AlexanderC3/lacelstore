import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  resetPasswordSucces: false,
  userErr: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SIGN_IN_SUCCES:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.RESET_USER_STATE:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.SIGN_OUT_USER_SUCCES:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case userTypes.RESET_PASSWORD_SUCCES:
      return {
        ...state,
        resetPasswordSucces: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
