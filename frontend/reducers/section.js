const initialState = {
  section: 'messages',
}

const sections = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_SECTION':
      return {
        section: action.name
      }
    default:
      return state
  }
}

export default sections;