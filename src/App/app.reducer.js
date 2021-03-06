const initialState = {
    currentPage: '',
    currentTab: 0,
    currentEditTab: 0,
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
    addingTrackers: false,
    sensors: [],
    responseQueue: [],
    listen: false,
    windSense: {
        speed: null,
        direction: null
    },
    floodSense: null,
    snowSense: null,
    wifiList: [],
    sensorEvents: {
        wind: 'disconnected',
        snow: 'disconnected',
        flood: 'disconnected'
    },
    roverStatus: {},
    windLimits: {
        speedLimits : {
            upperSpeedLimit: '',
            lowerSpeedLimit: ''
        },
        breachParameters : {
            minBreachTime: '',
            maxBreachTime: '',
            maxBreachCount: ''
        }
    },
    floodLimits: {
        maxFloodLevel: '',
        movingAveragePeriod: ''
    },
    snowLimits: {
        maxSnowLevel: '',
        movingAveragePeriod: '',
        rowHeight: '',
        rowWidth: '',
        stepSize: ''
    },
    gettingFloodLimits: false,
    settingFloodLimits: false,
    gettingSnowLimits: false,
    settingSnowLimits: false,
    gettingWindLimits: false,
    settingWindLimits: false,
    PANID: '',
    bqEnabled: false,
    currentWifi: '',
    zoneID: '',
    heartBeatInterval: '',
    heartBeatMaxMessages: '',
    heartBeatEnabled: false,
    powerRequestTimePeriod: '',
    statusRequestTimePeriod: '',
    logList: [],
    enableEthernet: false,
    staticIP: '',
    connected: false
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

        case 'CONNECTED':
        return {
            ...state,
            connected: true
        }

        case 'DISCONNECTED':
        return {
            ...state,
            connected: false
        }

        case 'GET_ETHERNET_SETTINGS_SUCCESS':
        return {
            ...state,
            enableEthernet: action.json.message.dhcpStatus,
            staticIP: action.json.message.staticIP === null ? '' : action.json.message.staticIP
        }

        case 'GET_LOGS_LIST_SUCCESS':
        return {
            ...state,
            logList: action.json.message
        }

        case 'GET_REQUEST_FREQUENCY_SUCCESS':
        return {
            ...state,
            powerRequestTimePeriod: action.json.message.powerRequestTimePeriod,
            statusRequestTimePeriod: action.json.message.statusRequestTimePeriod
        }

        case 'GET_HEARTBEAT_SETTINGS_SUCCESS': 
        return {
            ...state,
            heartBeatInterval: action.json.message.interval,
            heartBeatMaxMessages: action.json.message.maxMsgs,
            heartBeatEnabled: Boolean(action.json.message.enabled)
        }

        case 'GET_ZONE_ID_SUCCESS': 
        return {
            ...state,
            zoneID: action.json.message
        }

        case 'GET_WIFI_SUCCESS': 
        return {
            ...state,
            currentWifi: action.json.message
        }

        case 'GET_BQ_SUCCESS': 
        return {
            ...state,
            bqEnabled: action.json
        }

        case 'ui/xbee/panid':
        return {
            ...state,
            PANID: action.json.panID
        }

        case 'SET_SNOW_LIMITS_REQUEST':
        return {
            ...state,
            settingSnowLimits: true
        }

        case 'SET_FLOOD_LIMITS_REQUEST':
        return {
            ...state,
            settingFloodLimits: true
        }
        
        case 'SET_WIND_LIMITS_REQUEST':
        return {
            ...state,
            settingWindLimits: true
        }
        
        case 'SET_SNOW_LIMITS_SUCCESS':
        return {
            ...state,
            settingSnowLimits: false
        }

        case 'SET_FLOOD_LIMITS_SUCCESS':
        return {
            ...state,
            settingFloodLimits: false
        }
        
        case 'SET_WIND_LIMITS_SUCCESS':
        return {
            ...state,
            settingWindLimits: false
        }
        
        case 'GET_SNOW_LIMITS_REQUEST':
        return {
            ...state,
            gettingSnowLimits: true
        }

        case 'GET_FLOOD_LIMITS_REQUEST':
        return {
            ...state,
            gettingFloodLimits: true
        }
        
        case 'GET_WIND_LIMITS_REQUEST':
        return {
            ...state,
            gettingWindLimits: true
        }
        
        case 'GET_SNOW_LIMITS_SUCCESS':
        return {
            ...state,
            snowLimits: action.json.message,
            gettingSnowLimits: false
        }

        case 'GET_FLOOD_LIMITS_SUCCESS':
        return {
            ...state,
            floodLimits: action.json.message,
            gettingFloodLimits: false
        }
        
        case 'GET_WIND_LIMITS_SUCCESS':
        return {
            ...state,
            windLimits: action.json.message,
            gettingWindLimits: false
        }
        
        case 'changeEvent/rover':
        return {
            ...state,
            roverStatus: {...state.roverStatus, [action.json.DID]: action.json.state}
        }

        case 'SCAN_WIFI_SUCCESS':
        return {
            ...state,
            wifiList: action.json.message
        }

        case 'sensorReadings/wind':
        return {
            ...state,
            windSense: action.json
        }

        case 'sensorReadings/flood':
        return {
            ...state,
            floodSense: action.json.reading
        }
        case 'sensorReadings/snow':
        return {
            ...state,
            snowSense: action.json.reading
        }

        case 'time':
        return {
            ...state,
            time: action.json.time
        }

        case 'SET_CURRENT_TRACKER':
        return {
            ...state,
            currentTracker: action.deviceID
        }

        case 'SET_RESPONSE_LISTENER':
        return {
            ...state,
            listen: true
        }

        case 'SEND_SPA_PARAMETERS_REQUEST':
        return {
            ...state,
            sendingSPAParameters: true,
            responseQueue: []
        }

        case 'SEND_STOW_ANGLES_REQUEST':
        return {
            ...state,
            sendingStowAngles: true,
            responseQueue: []
        }

        case 'ui/rover/response/multiple':
        if(state.listen) {
            if(state.editedTrackers.length === state.responseQueue.length + 1) {
                return {
                    ...state,
                    responseQueue: [...state.responseQueue, action.json],
                    listen: false
                }
            }
            return {
                ...state,
                responseQueue: [...state.responseQueue, action.json]
            }
        } else {
            return {
                ...state
            }
        }
        

        case 'GET_SENSORS_SUCCESS':
        let temp = {
            wind: 'disconnected',
            snow: 'disconnected',
            flood: 'disconnected'
        }
        action.json.message.map(s => {
            temp[s.type] = s.status
        })
        return {
            ...state,
            sensors: action.json.message,
            sensorEvents: temp
        }

        case 'REMOVE_SENSOR_SUCCESS':
                alert(`Removed Sensor of type: ${action.type} and model no: ${action.model} successfully`)
        return {
            ...state,
            sensorEvents: {...state.sensorEvents, [action.type]: 'disconnected'}/* 
            alert: {
                type: 'success',
                message: 'Removed Sensor Successfully'
            } */
        }

        case 'ADD_SENSORS_SUCCESS':
        alert('Added Sensor Successfully')
        return {
            ...state,/* 
            alert: {
                type: 'success',
                message: 'Added Sensor Successfully'
            } */
        }
        
        case 'CHANGE_PAGE':
        return {
            ...state,
            currentPage: action.page,
            responseQueue: [],
            commandQueue: []
        }

        case 'CHANGE_TAB':
        return {
            ...state,
            currentTab: action.value.value,
            responseQueue: [],
            commandQueue: []
        }

        
        case 'CHANGE_EDIT_TAB':
        return {
            ...state,
            currentEditTab: action.value.value,
            responseQueue: [],
            commandQueue: []
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
        if(action.json.message === null || action.json.message.length === 0) {
            return {
                ...state,
                fetchingCommissioningData: false,
                currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,
                commissioningData: null
            }
        } else {
            let newRoverStatus = {...state.roverStatus}
            action.json.message.map(r => {
                newRoverStatus[r.deviceID] = 'online'
            })
            return {
                ...state,
                fetchingCommissioningData: false,
                currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,
                commissioningData: action.json.message.sort((a, b) => a.deviceID - b.deviceID),
                currentTracker: action.json.message[0].deviceID,
                roverStatus: newRoverStatus
            }
        }

        case 'GET_COMMISSIONING_DATA_FAILURE':
        alert('Error loading commissioning data')
        return {
            ...state,
            fetchingCommissioningData: false,
            currentPage: state.currentPage === '' ? 'Dashboard' : state.currentPage,/* 
            alert: {
                type: 'error',
                message: 'Error loading commissioning data'
            } */
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
        alert('Error getting timezone')
        return {
            ...state,/* 
            alert: {
                type: 'error',
                message: 'Error getting timezone'
            } */
        }

        case 'SCAN':
        return {
            ...state,
            currentPage: 'Row Controller',
            currentTab: 1
        }

        case 'GET_CURRENT_TRACKER_INFO_REQUEST':
        return {
            ...state
        }

        case 'GET_CURRENT_TRACKER_INFO_SUCCESS':
        return {
            ...state,
            currentTrackerInfo: action.json.message
        }

        case 'GET_CURRENT_TRACKER_INFO_FAILURE':
        //alert('Error getting current tracker info')
        return {
            ...state,/* 
            alert: {
                type: 'error',
                message: 'Error getting current tracker info'
            } */
        }

        case 'DISCOVER_SUCCESS':
        alert('Started Scanning')
        return {
            ...state,
            xbeeResponse: [],/* 
            alert: {
                type: 'success',
                message: 'Started Scanning'
            } */
        }

        case 'DISCOVER_FAILURE':
        alert('Error Starting Scan')
        return {
            ...state,/* 
            alert: {
                type: 'error',
                message: 'Error starting scan'
            } */
        }

        case 'ui/rover/scan':
        let a = null
        if(state.commissioningData === null) {
            if(state.xbeeResponse.filter(r => action.json.macID === r.macID).length === 0) {
                a = [...state.xbeeResponse, action.json]
            } else {
                a = state.xbeeResponse
            }
        } else {
            let b = state.commissioningData.filter(r => action.json.macID === r.macID)
            if(b.length === 0) {
                if(state.xbeeResponse.filter(r => action.json.macID === r.macID).length === 0) {
                    a = [...state.xbeeResponse, action.json]
                } else {
                    a = [...state.xbeeResponse]    
                }
            } else {
                a = [...state.xbeeResponse]
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
        alert('Tracker(s) added')
        const newXbeeResponse = difference(state.xbeeResponse, action.devices)
        return {
            ...state,
            xbeeResponse: newXbeeResponse,
            addingTrackers: false,/* 
            alert: {
                type: 'success',
                message: 'Tracker(s) added'
            } */
        }

        case 'ADD_TRACKERS_FAILURE':
        alert('Error adding trackers')
        return {
            ...state,
            addingTrackers: false,/* 
            alert: {
                type: 'error',
                message: 'Error adding trackers'
            } */
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
            SPAParameters: {...state.SPAParameters, [action.json.DID]: action.json},
            gettingSPAParameters: false
        }

        case 'ui/rover/stowangles':
        return {
            ...state,
            stowAngles: {...state.stowAngles, [action.json.DID]: action.json},
            gettingStowAngles: false
        }

        case 'GET_STOW_ANGLES_REQUEST':
        return {
            ...state,
            gettingStowAngles: true
        }

        case 'GET_STOW_ANGLES_FAILURE':
        alert('Error getting stow angles')
        return {
            ...state,
            gettingStowAngles: false,/* 
            alert: {
                type: 'error',
                message: 'Error getting stow angles'
            } */
        }

        case 'GET_SPA_PARAMETERS_REQUEST':
        return {
            ...state,
            gettingSPAParameters: true
        }

        case 'GET_SPA_PARAMETERS_FAILURE':
        alert('Error getting SPA parameters')
        return {
            ...state,
            gettingSPAParameters: false,/* 
            alert: {
                type: 'error',
                message: 'Error getting SPA parameters'
            } */
        }

        case 'SEND_SPA_PARAMETERS_FAILURE':
        alert('Error setting SPA parameters')
        return {
            ...state,
            sendingSPAParameters: false,/* 
            alert: {
                type: 'error',
                message: 'Error setting SPA parameters'
            } */
        }

        case 'SEND_SPA_PARAMETERS_SUCCESS':
        return {
            ...state,
            sendingSPAParameters: false
        }

        case 'SEND_STOW_ANGLES_FAILURE':
        alert('Error setting stow angles')
        return {
            ...state,
            sendingStowAngles: false,/* 
            alert: {
                type: 'error',
                message: 'Error setting stow angles'
            } */
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