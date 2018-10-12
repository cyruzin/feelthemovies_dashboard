import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UsersReducer'
import RecommendationsReducer from './RecommendationsReducer';
import GenresReducer from './GenresReducer';
import KeywordsReducer from './KeywordsReducer';
import SourcesReducer from './SourcesReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    recommendations: RecommendationsReducer,
    keywords: KeywordsReducer,
    genres: GenresReducer,
    sources: SourcesReducer
})