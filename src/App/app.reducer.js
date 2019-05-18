const initialState = {
    currentPage: 'Dashboard'
}

export function app(state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }
    switch (action.type) {
        case 'CHANGE_PAGE':
        return {
            currentPage: action.page
        }
        default:
        return state
    }
}