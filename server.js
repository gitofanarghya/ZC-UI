const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mqtt = require('mqtt')
const mqttServerURL =  'http://159.89.169.50:2000'/* 'http://localhost:1883'*/
const client = mqtt.connect(mqttServerURL)

client.on('connect', function () {
  console.log('\x1B[32m connected to mqtt broker')
  client.subscribe('ui/rover/scan', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic ui/rover/scan")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic ui/rover/stowangles")
    }
  })
  client.subscribe('ui/rover/spa', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic ui/rover/spa")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic ui/rover/stowangles")
    }
  })
  client.subscribe('ui/rover/stowangles', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic ui/rover/stowangles")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic ui/rover/stowangles")
    }
  })
  client.subscribe('ui/rover/response/multiple', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic ui/rover/response/multiple")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic ui/rover/response/multiple")
    }
  })
  client.subscribe('time', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic time")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic time")
    }
  })
  client.subscribe('sensorReadings/wind', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic sensorReadings/wind")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic sensorReadings/wind")
    }
  })
  client.subscribe('sensorReadings/flood', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic sensorReadings/flood")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic sensorReadings/flood")
    }
  })
  client.subscribe('sensorReadings/snow', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic sensorReadings/snow")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic sensorReadings/snow")
    }
  })
  client.subscribe('changeEvent/sensor', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic changeEvent/sensor")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic changeEvent/sensor")
    }
  })
  client.subscribe('changeEvent/rover', function (err) {
    if(!err) {
      console.log("\x1B[32m subscribed to mqtt topic changeEvent/rover")
    } else {
      console.log("\x1b[31m error subscribing to mqtt topic changeEvent/rover")
    }
  })
})

client.on('message', function(topic, message) {
  console.log(`\x1B[33m mqtt: ${topic} says ${message}`)
  io.emit(topic, message.toString())
})

io.on('connection', function(socket) {
  console.log(`\x1B[32m client ${socket.id} connected to socket server`)
  socket.on('disconnect', function(reason) {
    console.log(`\x1B[31m client ${socket.id} disconnected from socket server`)
    socket.disconnect(true)
  })
})


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
  console.log(`\x1B[33m App listening on port ${PORT}`);
  console.log('\x1B[33m Press Ctrl+C to quit.');
});