import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UsersReducer'
import KeywordsReducer from './KeywordsReducer';
import GenresReducer from './GenresReducer';
import SourcesReducer from './SourcesReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    keywords: KeywordsReducer,
    genres: GenresReducer,
    sources: SourcesReducer
})