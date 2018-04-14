export const createAction = (type, data) => ({
  type,
  payload: data,
})

export const noopAction = () => createAction('noopAction')
