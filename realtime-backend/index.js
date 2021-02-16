const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const PORT = 4000
const app = express ()

app.use('/', (req, res) => {
  res.send('<h1> It Works </h1>')
})

const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})
// Connection = Jika ada yang connect ke server
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('test', (payload) => {
    console.log(payload)
  })
  socket.on('pesan', (payload) => {
    io.emit('response-pesan', payload)
  })
})
// Jika pakai socket, yang di listennya yang dari HTTP
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})