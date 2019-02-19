import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducer'
import { loadState, saveState, getTokenMiddleware } from '../util/helpers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();
const store = createStore(reducers, persistedState,
    composeEnhancers(applyMiddleware(ReduxThunk, getTokenMiddleware)))

store.subscribe(() => saveState({
    auth: store.getState().auth,
    users: store.getState().users,
    recommendations: store.getState().recommendations,
    recommendationItems: store.getState().recommendationItems,
    keywords: store.getState().keywords,
    genres: store.getState().genres,
    sources: store.getState().sources
}))

export default store