import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UsersReducer'
import KeywordsReducer from './KeywordsReducer';
import GenresReducer from './GenresReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    keywords: KeywordsReducer,
    genres: GenresReducer
})