const initialState = {
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return { ...state, error: action.payload, isAuthenticated: false };
    case "LOGOUT_SUCCESS":e
      return { ...state, isAuthenticated: false, error: null };
    case "LOGOUT_FAILURE":
      return { ...state, isAuthenticated: true, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
