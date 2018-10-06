import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import UsersReducer from './UsersReducer'

export default combineReducers({
    auth: AuthReducer,
    users: UsersReducer
})