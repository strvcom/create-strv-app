import { INITIALIZE } from './constants'
import { noopAction } from 'utils/actions'

const initializeEpic = action$ =>
  action$.ofType(INITIALIZE).switchMap(() => noopAction())

export default [initializeEpic]
