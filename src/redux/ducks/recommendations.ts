import { httpFetch } from '../../util/request';

export const types = {
  FETCH: 'RECOMMENDATIONS_LIST/FETCH',
  SUCCESS: 'RECOMMENDATIONS_LIST/SUCCESS',
  FAILURE: 'RECOMMENDATIONS_LIST/FAILURE',
  SEARCH: 'RECOMMENDATIONS_LIST/SEARCH',
  REMOVE: 'RECOMMENDATIONS_LIST/REMOVE'
};

export const initialState = {
  fetch: false,
  data: [],
  searchData: [],
  message: '',
  error: ''
};

export default function recommendationReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true,
        message: ''
      };
    case types.SUCCESS:
      return {
        ...state,
        fetch: false,
        data: action.payload,
        error: ''
      };
    case types.SEARCH:
      return {
        ...state,
        fetch: false,
        searchData: action.payload,
        error: ''
      };
    case types.REMOVE:
      return {
        ...state,
        fetch: false,
        message: action.payload,
        error: ''
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const fetchRecommendations = () => ({
  type: types.FETCH
});

export const successRecommendations = (payload) => ({
  type: types.SUCCESS,
  payload
});

export const failureRecommendations = (payload) => ({
  type: types.FAILURE,
  payload
});

export const searchRecommendations = (payload) => ({
  type: types.SEARCH,
  payload
});

export const removeRecommendations = (payload) => ({
  type: types.REMOVE,
  payload
});

export const getRecommendations = () => (dispatch) => {
  dispatch(fetchRecommendations());
  return httpFetch({ method: 'GET', url: '/recommendations_admin' })
    .then((response) => dispatch(successRecommendations(response.data)))
    .catch((error) => dispatch(failureRecommendations(error.message)));
};

export const getSearchRecommendations = (query) => (dispatch) => {
  dispatch(fetchRecommendations());
  return httpFetch({
    method: 'GET',
    url: `/search_recommendation?query=${query}`
  })
    .then((response) =>
      dispatch(
        searchRecommendations(response.data !== null ? response.data : [])
      )
    )
    .catch((error) => dispatch(failureRecommendations(error.message)));
};

export const deleteRecommendations = (id) => (dispatch) => {
  dispatch(fetchRecommendations());
  return httpFetch({ method: 'DELETE', url: `/recommendation/${id}` })
    .then((response) => {
      dispatch(getRecommendations());
      dispatch(removeRecommendations(response.message));
    })
    .catch((error) => dispatch(failureRecommendations(error.message)));
};
