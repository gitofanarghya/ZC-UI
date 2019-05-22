const initialState = {
    currentPage: '',
    currentTab: 0,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    alert: null,
    time: Date.now(),
    commissioningData: null
}

export function app(state, action) {
    if (typeof state === 'undefined') {
      return initialState
    }
    switch (action.type) {
        case 'CHANGE_PAGE':
        return {
            ...state,
            currentPage: action.page
        }

        case 'CHANGE_TAB':
        return {
            ...state,
            currentTab: action.value.value
        }

        case 'CLEAR_ALERT':
        return {
            ...state,
            alert: null           
        }

        case 'GET_COMMISSIONING_DATA_SUCCESS':
        if(action.json.staticData === []) {
            return {
                ...state,
                currentPage: 'Row Controller',
                currentTab: 1,
                alert: {
                    type: 'error',
                    message: 'Please add trackers!'
                }
            }
        } else {
            return {
                ...state,
                currentPage: 'Dashboard',
                currentTab: 0,
                commissioningData: action.json.staticData
            }
        }

        case 'GET_COMMISSIONING_DATA_FAILURE':
        return {
            ...state,
            currentPage: 'Row Controller',
            currentTab: 1,
            alert: {
                type: 'error',
                message: 'Error loading commissioning data. Please add trackers!'
            }
        }

        case 'GET_TIMEZONE_SUCCESS':
        if(action.json !== null) {
            return {
                ...state,
                timeZone: action.json.timeZone
            }
        } else {
            break
        }

        case 'GET_TIMEZONE_FAILURE':
        return {
            ...state,
            alert: {
                type: 'error',
                message: 'Error getting timezone!'
            }
        }

        case 'GET_TIME_SUCCESS':
        return {
            ...state,
            time: action.json.message
        }

        case 'SCAN':
        return {
            ...state,
            currentPage: 'Row Controller',
            currentTab: 1
        }

        default:
        return state
    }
}