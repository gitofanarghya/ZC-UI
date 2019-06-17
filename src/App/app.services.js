export const appService = {
    setWifiInfo,
    selectSensor,
    uploadKey,
    setWindAddress,
    getWindAddress,
    caliberate,
    sendCommand,
    sendStow,
    getCommissioningData,
    getCurrentTrackerInfo,
    triggerDiscovery,
    setPanID,
    threshold,
    setHeartBeat,
    setTimeZone,
    getHeartBeat,
    getThreshold,
    getPanID,
    getFrequency,
    setFrequency,
    getTimeZone,
    getTime,
    discover,
    addTrackers,
    removeTrackers,
    sendSPAParameters,
    sendStowAngles,
    getSPAParameters,
    getStowAngles,
    getSensors,
    addSensor,
    removeSensor,
    enableSensor,
    disableSensor,
    scanWifi,
    getWindLimits,
    setWindLimits,
    getFloodLimits,
    setFloodLimits,
    getSnowLimits,
    setSnowLimits,
    getBQ,
    disableBQ,
    getWifi,
    getZoneID,
    setZoneID
};
const hostName = 'http://astralpresence.in:5000'; 
/*const hostName = `http://${window.location.hostname}:5000`;*/

const hostName2 = `http://${window.location.hostname}:5001`; 

function setZoneID(id) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            zoneID: id
        })
    }

    return fetch(`${hostName}/zoneID/set`, requestOptions)
        .then(handleResponse)
}

function getZoneID() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/zoneID/get`, requestOptions)
        .then(handleResponse)
}

function getWifi() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/wifi/current/get`, requestOptions)
        .then(handleResponse)
}

function setSnowLimits(maxSnowLevel, movingAveragePeriod, rowHeight, rowWidth, stepSize) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            maxSnowLevel: maxSnowLevel,
            movingAveragePeriod: movingAveragePeriod,
            rowHeight: rowHeight,
            rowWidth: rowWidth,
            stepSize: stepSize
        })
    }

    return fetch(`${hostName}/limits/snow/set`, requestOptions)
        .then(handleResponse)
}

function getSnowLimits() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/limits/snow/get`, requestOptions)
        .then(handleResponse)
}


function setFloodLimits(maxFloodLevel, movingAveragePeriod) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            maxFloodLevel : maxFloodLevel,
            movingAveragePeriod : movingAveragePeriod
        })
    }

    return fetch(`${hostName}/limits/flood/set`, requestOptions)
        .then(handleResponse)
}

function getFloodLimits() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/limits/flood/get`, requestOptions)
        .then(handleResponse)
}

function setWindLimits(lowerSpeedLimit, upperSpeedLimit, minBreachTime, maxBreachTime, maxBreachCount) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            speedLimits : {
                upperSpeedLimit: upperSpeedLimit,
                lowerSpeedLimit: lowerSpeedLimit
            },
            breachParameters : {
                minBreachTime: minBreachTime,
                maxBreachTime: maxBreachTime,
                maxBreachCount: maxBreachCount
            }
        })
    }

    return fetch(`${hostName}/limits/wind/set`, requestOptions)
        .then(handleResponse)
}

function getWindLimits() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/limits/wind/get`, requestOptions)
        .then(handleResponse)
}

function scanWifi() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/wifi/get/scan`, requestOptions)
        .then(handleResponse)
}

function disableSensor(type, model) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            type: type, 
            model: model
        })
    }

    return fetch(`${hostName}/sensors/disable`, requestOptions)
        .then(handleResponse)
}

function enableSensor(type, model) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            type: type, 
            model: model
        })
    }

    return fetch(`${hostName}/sensors/enable`, requestOptions)
        .then(handleResponse)
}

function removeSensor(model, type) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            type: type, 
            model: model
        })
    }

    return fetch(`${hostName}/sensors/remove`, requestOptions)
        .then(handleResponse)
}

function addSensor(file, port, type, model, samplingPeriod) {
    var data = new FormData()
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`${hostName}/sensors/add?type=${type}&model=${model}&port=${port}&samplingPeriod=${samplingPeriod}`, requestOptions)
        .then(handleResponse)
}

function getSensors() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        body: null
    }

    return fetch(`${hostName}/sensors/get`, requestOptions)
        .then(handleResponse)
}

function getStowAngles(DID) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DID: DID,
            CMD: 'QSTO'
        })
    }

    return fetch(`${hostName}/rover/params/get`, requestOptions)
        .then(handleResponse)
}


function getSPAParameters(DID) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DID: DID,
            CMD: "QSPA"
        })
    }

    return fetch(`${hostName}/rover/params/get`, requestOptions)
        .then(handleResponse)
}

function sendStowAngles(DID, WindStowAngle, SnowStowAngle, CleanStowAngle, NightStowAngle, EmergencyStowAngle) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DID: DID,
            CMD: 'HSTO',
            VALUES: `${WindStowAngle}, ${SnowStowAngle}, ${CleanStowAngle}, ${NightStowAngle}, ${EmergencyStowAngle}`
        })
    }

    return fetch(`${hostName}/rover/params/set`, requestOptions)
        .then(handleResponse)
}


function sendSPAParameters(DID, Lattitude, Longitude, Altitude, EastLimit, WestLimit, TrackerWidth, Pitch, TrackingAccuracy, AzimuthDeviation, AltitudeTrackeronEast, AltitudeTrackeronWest, StartTimeLead, EndTimeLag, backtracking) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DID: DID,
            CMD: "HSPA",
            VALUES: `${Lattitude}, ${Longitude}, ${Altitude}, ${EastLimit}, ${WestLimit}, ${TrackerWidth}, ${Pitch}, ${TrackingAccuracy}, ${AzimuthDeviation}, ${AltitudeTrackeronEast}, ${AltitudeTrackeronWest}, ${StartTimeLead}, ${EndTimeLag}, 0, ${backtracking}`
        })
    }

    return fetch(`${hostName}/rover/params/set`, requestOptions)
        .then(handleResponse)
}

function removeTrackers(DIDs) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DIDs: DIDs
        })
    }

    return fetch(`${hostName}/rover/remove`, requestOptions)
        .then(handleResponse)
}

function addTrackers(devices) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            devices: devices
        })
    }

    return fetch(`${hostName}/rover/add`, requestOptions)
        .then(handleResponse)
}

function discover(did) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            DID: did
        })
    }

    return fetch(`${hostName}/rover/scan`, requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        } else {
            if(json.result === 'failure') {
                const error = json.message
                return Promise.reject(error)
            } else {
                return json
            }
        }
    });
}


function setWifiInfo(ssid, pass) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "ssid": ssid,
            "password": pass
        })
    };

    return fetch(`${hostName}/wifi/set`, requestOptions)
        .then(handleResponse)
}

function getBQ() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/bigQuery/get`, requestOptions)
        .then(handleResponse)
}

function disableBQ() {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/bigQuery/set?enabled=false`, requestOptions)
        .then(handleResponse)
}

function uploadKey(file) {
    var data = new FormData()
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`${hostName}/bigQuery/set?enabled=true`, requestOptions)
        .then(handleResponse)
}

function selectSensor(windSensor, rainSensor, floodSensor, snowSensor) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "windSensor": windSensor,
            "rainSensor": rainSensor,
            "floodSensor": floodSensor,
            "snowSensor": snowSensor,
        })
    };

    return fetch(`${hostName}/set/sensors`, requestOptions)
        .then(handleResponse)
}

function setWindAddress(address) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "deviceAddress": address,
        })
    };

    return fetch(`${hostName}/set/windSensorSettings`, requestOptions)
        .then(handleResponse)
}


function getWindAddress() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/windSensorSettings`, requestOptions)
        .then(handleResponse)
}

function caliberate(sensor) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "sensor": sensor,
        })
    };


    return fetch(`${hostName}/calibrateSensor`, requestOptions)
        .then(handleResponse)
}

//control

function sendCommand(deviceID, value) {

    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "DID": deviceID,
            "CMD": "HMNM",
            "VALUES": value
        })
    };

    return fetch(`${hostName}/rover/command`, requestOptions)
        .then(handleResponse)
}

function sendStow(deviceID, mode) {

    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "DID": deviceID,
            "CMD": "HMOD",
            "MODE": mode
        })
    };

    return fetch(`${hostName}/rover/command`, requestOptions)
        .then(handleResponse)
}
//dashboard


function getCommissioningData() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/rover/get`, requestOptions)
        .then(handleResponse)
}

function getCurrentTrackerInfo(trackerID) {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/rover/stats/get?trackerID=${trackerID}`, requestOptions)
        .then(handleResponse)
}

function triggerDiscovery() {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "CMD": "HINF",
            "DID": "00000",
        })
    };

    return fetch(`http://${hostName2}/sendCommand`, requestOptions)
        .then(handleResponse)
}


//settings

function setPanID(panID) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "panID": panID
        })
    };

    console.log(panID);

    return fetch(`http://${hostName2}/settings/xbeePanID `, requestOptions)
        .then(handleResponse)
}

function threshold(maxWindSpeed, maxRainFall, meanWindSpeed, windSpeedTimer, maxFloodLevel, maxSnowFall) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "maxWindSpeed": maxWindSpeed,
            "maxRainFall": maxRainFall,
            "meanWindSpeed": meanWindSpeed,
            "windSpeedTimer": windSpeedTimer,
            "maxFloodLevel": maxFloodLevel,
            "maxSnowFall": maxSnowFall,
        })
    };

    return fetch(`${hostName}/set/threshold`, requestOptions)
        .then(handleResponse)
}

function setFrequency(power, status) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "powerRequestTimePeriod": power,
            "statusRequestTimePeriod": status,
        })
    };

    return fetch(`${hostName}/set/requestFrequency`, requestOptions)
        .then(handleResponse)
}



function setHeartBeat(enabled, hbinterval, maxMsgs) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "enabled": enabled,
            "interval": hbinterval,
            "maxMsgs": maxMsgs,
        })
    };

    return fetch(`${hostName}/heartBeat/set`, requestOptions)
        .then(handleResponse)
}

function setTimeZone(time) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "timeZone": time,
        })
    };

    return fetch(`${hostName}/timeZone/set`, requestOptions)
        .then(handleResponse)
}


function getTimeZone() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/timeZone/get`, requestOptions)
        .then(handleResponse)
}

function getTime() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/time`, requestOptions)
        .then(handleResponse)
}

function getThreshold() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/threshold`, requestOptions)
        .then(handleResponse)
}

function getFrequency() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/requestFrequency`, requestOptions)
        .then(handleResponse)
}

function getHeartBeat() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/heartBeat/get`, requestOptions)
        .then(handleResponse)
}

function getPanID() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/panID/get`, requestOptions)
        .then(handleResponse)
}

