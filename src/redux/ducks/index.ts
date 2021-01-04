import { combineReducers } from 'redux';
import Authentication from './authentication';
import Users from './users';
import Recommendations from './recommendations';
import RecommendationItems from './recommendationItems';
import Genres from './genres';
import Keywords from './keywords';
import Sources from './sources';

export default combineReducers({
  authentication: Authentication,
  users: Users,
  recommendations: Recommendations,
  recommendationItems: RecommendationItems,
  genres: Genres,
  keywords: Keywords,
  sources: Sources
});
