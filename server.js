const express = require('express');
const path = require('path');
const app = express();
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')

client.on('connect', function () {
  client.subscribe('xbee/response', function (err) {
    if(!err) {
      console.log('subscribed to xbee/response')
    }
  })
})

client.on('message', function (topic, message) {
  console.log(message.toString())
  console.log(topic.toString())
  client.end()
})

client.on('xbee/response', function (topic, message) {
  console.log(message.toString())
  console.log(topic.toString())
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});