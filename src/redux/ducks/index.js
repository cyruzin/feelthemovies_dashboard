import { combineReducers } from 'redux'
import Authentication from './authentication'
import Recommendations from './recommendations'

export default combineReducers({
    authentication: Authentication,
    recommendations: Recommendations
})