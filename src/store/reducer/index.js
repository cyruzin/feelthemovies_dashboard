import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UsersReducer'
import KeywordsReducer from './KeywordsReducer';

export default combineReducers({
    auth: AuthReducer,
    users: UsersReducer,
    keywords: KeywordsReducer
})