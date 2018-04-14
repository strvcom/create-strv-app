import { INITIALIZE } from './constants'
import { createAction } from 'utils/actions'

export const initialize = () => createAction(INITIALIZE)
