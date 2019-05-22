const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  console.log('connected to mqtt broker')
  client.subscribe('xbee/response', function (err) {
    if(!err) {
      console.log('subscribed to mqtt topic xbee/response')
    }
  })
})

io.on('connection', function(socket) {
  console.log('client connected to socket server')
  client.on('message', function(topic, message) {
    console.log(`received message from mqtt broker topic = ${topic} and message = ${message}`)
    socket.emit('message', message)
  })
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});