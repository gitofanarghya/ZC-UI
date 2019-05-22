const express = require('express');
const io = require('socket.io-client');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

const socket = io(`http://localhost:5000`)

socket.on('connect', () => {
  console.log('connected')
})

socket.on('message', (data) => console.log(data))
socket.on('discovery', (data) => console.log(data))