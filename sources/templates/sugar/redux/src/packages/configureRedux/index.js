import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

type PropTypes = {
  children: React.Node,
}

const createReduxProvider = reduxStore => ({ children }: PropTypes) => (
  <Provider store={reduxStore}>{children}</Provider>
)

const configureRedux = (reducers, middlewares = []) => {
  const reduxStore = createStore(
    combineReducers(reducers),
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  return {
    reduxStore,
    ReduxProvider: createReduxProvider(reduxStore),
  }
}

export default configureRedux
