export const types = {
  FETCH: 'USERS_CREATE/EDIT/FETCH',
  FAILURE: 'USERS_CREATE/EDIT/FAILURE',
  MESSAGE: 'USERS_CREATE/EDIT/MESSAGE',
  RESET: 'USERS_CREATE/EDIT/RESET',
  NAME: 'USERS_CREATE/EDIT/NAME',
  EMAIL: 'USERS_CREATE/EDIT/EMAIL',
  PASSWORD: 'USERS_CREATE/EDIT/PASSWORD',
  USER: 'USERS_CREATE/EDIT/USER'
};

export const initialState = {
  fetch: false,
  error: '',
  message: '',
  name: '',
  email: '',
  user: {},
  password: ''
};

export function reducer(state, action) {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true,
        error: ''
      };
    case types.FAILURE:
      return {
        ...state,
        error: action.payload,
        fetch: false
      };
    case types.MESSAGE:
      return {
        ...state,
        message: action.payload,
        error: '',
        fetch: false
      };
    case types.NAME:
      return {
        ...state,
        name: action.payload,
        fetch: false
      };
    case types.EMAIL:
      return {
        ...state,
        email: action.payload,
        fetch: false
      };
    case types.PASSWORD:
      return {
        ...state,
        password: action.payload,
        fetch: false
      };
    case types.USER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        fetch: false
      };
    case types.RESET:
      return initialState;
    default:
      throw new Error();
  }
}
