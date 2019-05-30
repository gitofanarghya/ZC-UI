export const appService = {
    setWifiInfo,
    upload,
    selectSensor,
    uploadKey,
    getSensors,
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
    heartBeat,
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
    getStowAngles
};
/* const hostName = 'http://159.89.169.50:4000'; */
const hostName = `http://${window.location.hostname}:5000`;

const hostName2 = `http://${window.location.hostname}:5001`; 



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

    return fetch(`${hostName}/removePairedDevices`, requestOptions)
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

    return fetch(`${hostName}/addDiscoveredDevices`, requestOptions)
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

    return fetch(`${hostName}/scan`, requestOptions)
        .then(handleResponse)
}


function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            const error = (json && json.message) || response.statusText;
            return Promise.reject(error);
        }
        return json;
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

    return fetch(`${hostName}/setWifiInfo`, requestOptions)
        .then(handleResponse)
}

function upload(file) {
    var data = new FormData()
    data.append('file', file)
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: data
    };

    return fetch(`${hostName}/loadStaticData`, requestOptions)
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

    return fetch(`${hostName}/loadBigQueryKey`, requestOptions)
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

function getSensors() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/sensors`, requestOptions)
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

    return fetch(`${hostName}/rover/control`, requestOptions)
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

    return fetch(`${hostName}/rover/control`, requestOptions)
        .then(handleResponse)
}
//dashboard


function getCommissioningData() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/getCommissioningData`, requestOptions)
        .then(handleResponse)
}

function getCurrentTrackerInfo(trackerID) {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/getCurrentTrackerInfo?id=${trackerID}`, requestOptions)
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



function heartBeat(enabled, hbinterval, maxMsgs) {
    const requestOptions = {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            "enabled": enabled,
            "interval": hbinterval,
            "maxMsgs": maxMsgs,
        })
    };

    return fetch(`${hostName}/set/heartBeatSettings`, requestOptions)
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

    return fetch(`${hostName}/set/timeZone`, requestOptions)
        .then(handleResponse)
}


function getTimeZone() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`${hostName}/get/timeZone`, requestOptions)
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

    return fetch(`${hostName}/get/heartBeatSettings`, requestOptions)
        .then(handleResponse)
}

function getPanID() {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        body: null
    };

    return fetch(`http://${hostName2}/gettings/xbeePanID`, requestOptions)
        .then(handleResponse)
}

