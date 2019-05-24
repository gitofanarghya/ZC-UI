const express = require('express');
const path = require('path');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const mqtt = require('mqtt')
const client = mqtt.connect(/* 'http://159.89.169.50:2000' */'http://localhost:1883')

client.on('connect', function () {
  console.log('connected to mqtt broker')
  client.subscribe('ui/rover/scan', function (err) {
    if(!err) {
      console.log('subscribed to mqtt topic ui/rover/scan')
    }
  })
})

io.on('connection', function(socket) {
  console.log(`client ${socket.id} connected to socket server`)
  client.on('message', function(topic, message) {
    console.log(`mqtt: ${topic} says ${message}`)
    socket.emit(topic, message.toString())
  })
  socket.on('disconnect', function(reason) {
    console.log(`client ${socket.id} disconnected from socket server`)
    socket.disconnect(true)
  })
})


/* app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}); */

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});