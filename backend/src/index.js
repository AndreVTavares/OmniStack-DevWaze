const express = require('express')
const mongoose = require('mongoose')

const app = express()

// MongoDB (banco de dados não-relacional)
mongoose.connect('mongodb+srv://andre:andre@restfulapi-k8xmw.mongodb.net/DevWaze?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json())



app.get('/', (req, res) => {
    return res.json({message: "Hello Omnistack!"})
})


// ligação do servidor
app.listen(3333, () => {
    console.log('Servidor Operando...')
})