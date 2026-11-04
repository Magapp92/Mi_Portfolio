
console.clear()
console.log ('Iniciando Api_Harry_Potter 🤓⚡')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { router } = require('./router')
const { notFound, errorHandler } = require('./middlewares')


require ('dotenv').config()
const { PORT, MONGO_URI } = process.env

// Si la conexión falla se vuelve a intentar en la siguiente petición
let conexion = null

const conectar = () => {
    if (!conexion) {
        conexion = mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
            .catch(( error ) => {
                conexion = null
                throw error
            })
    }
    return conexion
}



const app = express()


app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({extended : false }) )

app.use( async ( req, res, next ) => {
    try {
        await conectar()
        next()
    } catch (error) {
        console.log(`Sin conexión a Mongo: ${error.message}`)
        res.status(503).json({
            message: 'Base de datos no disponible, inténtalo en unos segundos',
            data: null
        })
    }
})

app.use( '/harrypotter' , router )

app.use( notFound )
app.use( errorHandler )

conectar()
    .then(()=> console.log(`Conectado a Mongo ${MONGO_URI}🔗`))
    .catch(( error )=> console.log(`Sin conexión a Mongo: ${error.message}`))

app.listen( PORT , ()=> {
    console.log(`✅Iniciando API en localhost:${PORT}`)
})

module.exports = app
