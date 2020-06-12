const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const http = require('http')
const { setupWebsocket } = require('./websocket')

const app = express()
const server = http.Server(app)

setupWebsocket(server)

// MongoDB (banco de dados não-relacional)
mongoose.connect('mongodb+srv://andre:andre@restfulapi-k8xmw.mongodb.net/DevWaze?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors())
app.use(express.json())
app.use(routes)


// ligação do servidor
server.listen(3333, () => {
    console.log('Servidor Operando...')
})