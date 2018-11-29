const filterReducer = (state = '', action) => {

  if (action.type==='FILTER') {
    return action.filter
  }
  return state
}

export const defineFilter = (filter) => (
  {
    type: 'FILTER',
    filter
  }
)

export default filterReducer