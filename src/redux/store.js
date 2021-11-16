import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './rootReducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    coins: rootReducer,
  }),
  composeEnhancer(applyMiddleware(thunk))
)

export default store
