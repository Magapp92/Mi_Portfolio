
/* Arranque de la API del quiz de Harry Potter: Express, cors y conexión a Mongo */
console.clear()
console.log ('Iniciando Api_Harry_Potter 🤓⚡')

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { router } = require('./router')
const { notFound, errorHandler } = require('./middlewares')

/* Leemos las variables del .env */
require ('dotenv').config()
const { PORT, MONGO_URI } = process.env

/* Guardamos la conexión para no abrir una nueva en cada petición.
Si falla la dejamos a null y se vuelve a intentar en la siguiente */
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

/* Middlewares para permitir peticiones del front y leer el body */
app.use( cors() )
app.use( express.json() )
app.use( express.urlencoded({extended : false }) )

/* Antes de cada petición comprobamos que hay conexión con Mongo */
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

/* Todas las rutas cuelgan de /harrypotter */
app.use( '/harrypotter' , router )

app.use( notFound )
app.use( errorHandler )

/* Conectamos al arrancar para ver en consola si Mongo responde */
conectar()
    .then(()=> console.log(`Conectado a Mongo ${MONGO_URI}🔗`))
    .catch(( error )=> console.log(`Sin conexión a Mongo: ${error.message}`))

app.listen( PORT , ()=> {
    console.log(`✅Iniciando API en localhost:${PORT}`)
})

module.exports = app
