import { combineReducers } from 'redux'
import Authentication from './authentication'
import Recommendations from './recommendations'
import RecommendationItems from './recommendationItems'
import Genres from './genres'
import Keywords from './keywords'
import Sources from './sources'

export default combineReducers({
    authentication: Authentication,
    recommendations: Recommendations,
    recommendationItems: RecommendationItems,
    genres: Genres,
    keywords: Keywords,
    sources: Sources
})