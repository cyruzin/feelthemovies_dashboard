import { httpFetchAuthentication } from "../../util/request";
import jwtDecode from "jwt-decode";

export const types = {
  FETCH: "AUTHORIZATION/FETCH",
  SUCCESS: "AUTHORIZATION/SUCCESS",
  FAILURE: "AUTHORIZATION/FAILURE",
  RESET: "AUTHORIZATION/RESET",
};

export const initialState = {
  fetch: false,
  authorized: false,
  user: {},
  error: "",
};

export default function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true,
      };
    case types.SUCCESS:
      return {
        ...state,
        fetch: false,
        error: "",
        authorized: true,
        user: action.payload,
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload,
      };
    case types.RESET:
      return initialState;
    default:
      return state;
  }
}

export const fetchAuthentication = () => ({
  type: types.FETCH,
});

export const successAuthentication = (payload) => ({
  type: types.SUCCESS,
  payload,
});

export const failureAuthentication = (payload) => ({
  type: types.FAILURE,
  payload,
});

export const resetAuthentication = () => ({
  type: types.RESET,
});

export const checkAuthentication = (credentials) => (dispatch) => {
  dispatch(fetchAuthentication());
  return httpFetchAuthentication(credentials)
    .then((response) => {
      const claims = jwtDecode(response.token);
      const payload = { token: response.token, ...claims };
      dispatch(successAuthentication(payload));
    })
    .catch((error) =>
      dispatch(failureAuthentication(error.message || error.errors[0].message))
    );
};
