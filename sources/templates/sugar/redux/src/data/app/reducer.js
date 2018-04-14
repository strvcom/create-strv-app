import { INITIALIZE } from './constants'

const initialState = {
  initialized: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        initialized: true,
      }
    default:
      return state
  }
}

export default appReducer
