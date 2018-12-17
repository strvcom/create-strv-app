import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from '../modules'

const middlewares = []

export default initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    module.hot.accept('./modules/index.js', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
