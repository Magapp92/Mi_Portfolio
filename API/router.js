
/* Router con todos los endpoints del quiz y de las puntuaciones */
const express = require('express')
const { notFound, errorHandler, soloAdmin } = require('./middlewares')
const { getPreguntas, postPregunta, putPregunta, patchPregunta, deletePregunta } = require('./controllers/quiz')
const { getPreguntaById } = require('./controllers/quiz')
const { getPuntuaciones, postPuntuacion, patchPuntuacion, deletePuntuacion, comprobarTokenPartida } = require ('./controllers/puntuacion')

const router = express.Router()

/* Preguntas del quiz. Leerlas es público; crearlas, cambiarlas o borrarlas
solo lo puede hacer quien tenga el token de administración */
router.route('/quiz')
.get( getPreguntas )
.post( soloAdmin, postPregunta )

router.route('/quiz/:_id')
.get( getPreguntaById )
.put( soloAdmin, putPregunta )
.patch( soloAdmin, patchPregunta )
.delete( soloAdmin, deletePregunta )

/* Puntuaciones y ranking. Cualquiera puede ver el ranking y guardar su partida,
pero para cambiar el nick o borrarla hace falta el token de esa partida */
router.route('/puntuacion')
.get( getPuntuaciones )
.post( postPuntuacion )

router.route('/puntuacion/:_id')
.patch( comprobarTokenPartida, patchPuntuacion )
.delete( comprobarTokenPartida, deletePuntuacion )

/* Si ninguna ruta coincide devolvemos 404 y recogemos los errores */
router.use(notFound)
router.use(errorHandler)

module.exports = {
    router
}
