import { combineEpics, createEpicMiddleware } from 'redux-observable'

const configureReduxObservable = epics => {
  const rootEpic = combineEpics(...epics)
  const epicMiddleware = createEpicMiddleware(rootEpic)
  return {
    epicMiddleware,
  }
}

export default configureReduxObservable
