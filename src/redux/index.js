import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import ReduxDucks from './ducks'
import { loadState, saveState } from '../util/helpers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()

const store = createStore(ReduxDucks, persistedState,
    composeEnhancers(applyMiddleware(ReduxThunk)))

store.subscribe(() => saveState({
    auth: store.getState().auth
}))

export default store