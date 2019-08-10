import { combineReducers } from 'redux'
import Authentication from './authentication'
import Recommendations from './recommendations'
import RecommendationItems from './recommendationItems'

export default combineReducers({
    authentication: Authentication,
    recommendations: Recommendations,
    recommendationItems: RecommendationItems
})