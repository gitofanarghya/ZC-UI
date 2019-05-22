const initialState = {
    currentPage: '',
    currentTab: 0,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    alert: null,
    time: Date.now(),
    commissioningData: null,
    fetchingCommissioningData: false,
    currentTracker: null,
    currentTrackerInfo: null,
    xbeeResponse: []
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

        case 'GET_COMMISSIONING_DATA_REQUEST':
        return {
            ...state,
            fetchingCommissioningData: true
        }

        case 'GET_COMMISSIONING_DATA_SUCCESS':
        if(action.json.staticData === null || action.json.staticData.length === 0) {
            return {
                ...state,
                fetchingCommissioningData: false,
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
                fetchingCommissioningData: false,
                currentPage: 'Dashboard',
                currentTab: 0,
                commissioningData: action.json.staticData
            }
        }

        case 'GET_COMMISSIONING_DATA_FAILURE':
        return {
            ...state,
            fetchingCommissioningData: false,
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

        case 'GET_CURRENT_TRACKER_INFO_REQUEST':
        return {
            ...state,
            currentTracker: action.trackerID
        }

        case 'GET_CURRENT_TRACKER_INFO_SUCCESS':
        return {
            ...state,
            currentTrackerInfo: action.json
        }

        case 'GET_CURRENT_TRACKER_INFO_FAILURE':
        return {
            ...state,
            alert: {
                type: 'error',
                message: 'Error getting current tracker info!'
            }
        }

        case 'DISCOVER_SUCCESS':
        return {
            ...state,
            xbeeResponse: []
        }

        case 'XBEE_RESPONSE':
        const newXbeeResponse = [...state.xbeeResponse, action.json]
        return {
            ...state,
            xbeeResponse: newXbeeResponse
        }

        case 'ADD_TRACKERS_SUCCESS':
        const newXbeeResponse2 = state.xbeeResponse.length > 1 ? state.xbeeResponse.map(r => {
            if(action.devices.indexOf(r) === -1) {
                return r
            }
        }) : []
        return {
            ...state,
            xbeeResponse: newXbeeResponse2
        }

        default:
        return state
    }
}