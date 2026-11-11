
/* Router con todos los endpoints del quiz y de las puntuaciones */
const express = require('express')
const { notFound, errorHandler } = require('./middlewares')
const { getPreguntas, postPregunta, putPregunta, patchPregunta, deletePregunta } = require('./controllers/quiz')
const { getPreguntaById } = require('./controllers/quiz')
const { getPuntuaciones, postPuntuacion, patchPuntuacion, deletePuntuacion } = require ('./controllers/puntuacion')

const router = express.Router()

/* Preguntas del quiz */
router.route('/quiz')
.get( getPreguntas )
.post( postPregunta )

router.route('/quiz/:_id')
.get( getPreguntaById )
.put( putPregunta )
.patch( patchPregunta )
.delete( deletePregunta )

/* Puntuaciones y ranking */
router.route('/puntuacion')
.get( getPuntuaciones )
.post( postPuntuacion )

router.route('/puntuacion/:_id')
.patch( patchPuntuacion )
.delete( deletePuntuacion )

/* Si ninguna ruta coincide devolvemos 404 y recogemos los errores */
router.use(notFound)
router.use(errorHandler)

module.exports = {
    router
}
