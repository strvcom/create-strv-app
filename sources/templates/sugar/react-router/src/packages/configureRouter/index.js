import React from 'react'
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

type PropTypes = {
  children: React.Node,
}

const createRouterProvider = history => ({ children }: PropTypes) => (
  <ConnectedRouter history={history}>{children}</ConnectedRouter>
)

const configureRouter = () => {
  const history = createHistory()

  return {
    history,
    RouterProvider: createRouterProvider(history),
    routerMiddleware: routerMiddleware(history),
    routerReducer,
  }
}

export default configureRouter
