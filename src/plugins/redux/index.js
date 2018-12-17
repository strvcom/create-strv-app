'use strict'

module.exports = api => {
  api.addDependency('redux')
  api.addDependency('react-redux')
}

// api.addDependency('redux-saga')
// api.addDependency('redux-observable')
// api.addDependency('rxjs')

// rematch
// import { init } from '@rematch/core'
// import models from './models'

// export default initialState => {
// const store = init({
//   models,
//   redux: {
//     initialState
// rootReducers: {
//   'RESET': (state, action) => undefined,
// }
//   }
// })

// export const { dispatch } = store
// export default store

// redux-observable
// import { createEpicMiddleware } from 'redux-observable';
// import { rootEpic } from './modules'
// export const rootEpic = combineEpics(
//   pingEpic,
//   fetchUserEpic
// );
// const epicMiddleware = createEpicMiddleware()
// epicMiddleware.run(rootEpic);

// redux-saga
// const sagas = []
// export default function* rootSaga() {
//  yield sagas.map(saga => fork(saga))
// }
// import { rootSaga } from './modules'
// import createSagaMiddleware from 'redux-saga'
// const sagaMiddleware = createSagaMiddleware()
// sagaMiddleware.run(rootSaga)

// import { Provider, connect } from 'react-redux'
// import createStore from './store'
// const store = createStore()
// <Provider store={store}>
// </Provider>
