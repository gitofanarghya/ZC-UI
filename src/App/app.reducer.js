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
    xbeeResponse: [],
    controlledTrackers: [],
    editedTrackers: [],
    SPAParameters: null,
    stowAngles: null,
    sendingSPAParameters: false,
    sendingStowAngles: false,
    gettingSPAParameters: false,
    gettingStowAngles: false,
    addingTrackers: false
}

const difference = (a1, a2) => {
    var result = [];
    for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) === -1) {
        result.push(a1[i]);
    }
    }
    return result;
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
                currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,
                commissioningData: null,
                alert: {
                    type: 'warning',
                    message: 'Please add trackers'
                }
            }
        } else {
            return {
                ...state,
                fetchingCommissioningData: false,
                currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,
                commissioningData: action.json.staticData
            }
        }

        case 'GET_COMMISSIONING_DATA_FAILURE':
        return {
            ...state,
            fetchingCommissioningData: false,
            currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,
            alert: {
                type: 'error',
                message: 'Error loading commissioning data'
            }
        }

        case 'GET_TIMEZONE_SUCCESS':
        if(action.json.timeZone !== null) {
            return {
                ...state,
                timeZone: action.json.timeZone
            }
        } else {
            return state
        }

        case 'GET_TIMEZONE_FAILURE':
        return {
            ...state,
            alert: {
                type: 'error',
                message: 'Error getting timezone'
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
                message: 'Error getting current tracker info'
            }
        }

        case 'DISCOVER_SUCCESS':
        return {
            ...state,
            xbeeResponse: [],
            alert: {
                type: 'success',
                message: 'Started Scanning'
            }
        }

        case 'DISCOVER_FAILURE':
        return {
            ...state,
            alert: {
                type: 'error',
                message: 'Error starting scan'
            }
        }

        case 'ui/rover/scan':
        let a = null
        if(state.commissioningData === null) {
            a = [...state.xbeeResponse, action.json]
        } else {
            let b = state.commissioningData.filter(r => action.json.DID === r.deviceID)
            if(b.length === 0) {
                a = [...state.xbeeResponse, action.json]
            } else {
                a = []
            }
                
        }
        return {
            ...state,
            xbeeResponse: a
        }

        case 'ADD_TRACKERS_REQUEST':
        return {
            ...state,
            addingTrackers: true
        }

        case 'ADD_TRACKERS_SUCCESS':
        const newXbeeResponse = difference(state.xbeeResponse, action.devices)
        return {
            ...state,
            xbeeResponse: newXbeeResponse,
            addingTrackers: false,
            alert: {
                type: 'success',
                message: 'Tracker(s) added'
            }
        }

        case 'ADD_TRACKERS_FAILURE':
        return {
            ...state,
            addingTrackers: false,
            alert: {
                type: 'error',
                message: 'Error adding trackers'
            }
        }

        case 'SET_EDITED_TRACKERS':
        return {
            ...state,
            editedTrackers: action.trackers
        }

        case 'SET_CONTROLLED_TRACKERS':
        return {
            ...state,
            controlledTrackers: action.trackers
        }

        case 'ui/rover/spa':
        return {
            ...state,
            SPAParameters: action.json,
            gettingSPAParameters: false
        }

        case 'ui/rover/stowangles':
        return {
            ...state,
            stowAngles: action.json,
            gettingStowAngles: false
        }

        case 'GET_STOW_ANGLES_REQUEST':
        return {
            ...state,
            gettingStowAngles: true
        }

        case 'GET_STOW_ANGLES_FAILURE':
        return {
            ...state,
            gettingStowAngles: false,
            alert: {
                type: 'error',
                message: 'Error getting stow angles'
            }
        }

        case 'GET_SPA_PARAMETERS_REQUEST':
        return {
            ...state,
            gettingSPAParameters: true
        }

        case 'GET_SPA_PARAMETERS_FAILURE':
        return {
            ...state,
            gettingSPAParameters: false,
            alert: {
                type: 'error',
                message: 'Error getting SPA parameters'
            }
        }

        case 'SEND_SPA_PARAMETERS_REQUEST':
        return {
            ...state,
            sendingSPAParameters: true
        }

        case 'SEND_SPA_PARAMETERS_FAILURE':
        return {
            ...state,
            sendingSPAParameters: false,
            alert: {
                type: 'error',
                message: 'Error setting SPA parameters'
            }
        }

        case 'SEND_SPA_PARAMETERS_SUCCESS':
        return {
            ...state,
            sendingSPAParameters: false
        }

        case 'SEND_STOW_ANGLES_REQUEST':
        return {
            ...state,
            sendingStowAngles: true
        }

        case 'SEND_STOW_ANGLES_FAILURE':
        return {
            ...state,
            sendingStowAngles: false,
            alert: {
                type: 'error',
                message: 'Error setting stow angles'
            }
        }

        case 'SEND_STOW_ANGLES_SUCCESS':
        return {
            ...state,
            sendingStowAngles: false
        }

        default:
        return state
    }
}