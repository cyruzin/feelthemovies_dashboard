import { httpFetch } from "../../util/request";

export const types = {
  FETCH: "kEYWORDS_LIST/FETCH",
  SUCCESS: "kEYWORDS_LIST/SUCCESS",
  FAILURE: "kEYWORDS_LIST/FAILURE",
  SEARCH: "kEYWORDS_LIST/SEARCH",
  REMOVE: "kEYWORDS_LIST/REMOVE",
};

export const initialState = {
  fetch: false,
  data: [],
  searchData: [],
  message: "",
  error: "",
};

export default function keywordsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH:
      return {
        ...state,
        fetch: true,
        message: "",
      };
    case types.SUCCESS:
      return {
        ...state,
        fetch: false,
        data: action.payload,
        error: "",
      };
    case types.SEARCH:
      return {
        ...state,
        fetch: false,
        searchData: action.payload,
        error: "",
      };
    case types.REMOVE:
      return {
        ...state,
        fetch: false,
        message: action.payload,
        error: "",
      };
    case types.FAILURE:
      return {
        ...state,
        fetch: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const fetchKeywords = () => ({
  type: types.FETCH,
});

export const successKeywords = (payload) => ({
  type: types.SUCCESS,
  payload,
});

export const failureKeywords = (payload) => ({
  type: types.FAILURE,
  payload,
});

export const searchKeywords = (payload) => ({
  type: types.SEARCH,
  payload,
});

export const removeKeywords = (payload) => ({
  type: types.REMOVE,
  payload,
});

/**
 * Keywords Side Effects Types and Functions.
 */

export const getKeywords = () => (dispatch) => {
  dispatch(fetchKeywords());
  return httpFetch({ method: "GET", url: "/keywords" })
    .then((response) => dispatch(successKeywords(response.data)))
    .catch((error) => dispatch(failureKeywords(error.message)));
};

export const getSearchKeywords = (query) => (dispatch) => {
  dispatch(fetchKeywords());
  return httpFetch({
    method: "GET",
    url: `/search_keyword?query=${query}`,
  })
    .then((response) =>
      dispatch(searchKeywords(response.data !== null ? response.data : []))
    )
    .catch((error) => dispatch(failureKeywords(error.message)));
};

export const deleteKeywords = (id) => (dispatch) => {
  dispatch(fetchKeywords());
  return httpFetch({ method: "DELETE", url: `/keyword/${id}` })
    .then((response) => {
      dispatch(getKeywords());
      dispatch(removeKeywords(response.message));
    })
    .catch((error) => dispatch(failureKeywords(error.message)));
};
