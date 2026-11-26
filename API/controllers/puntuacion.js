
/* Controlador de las puntuaciones. La puntuación la calcula siempre la API
comparando las respuestas con las preguntas guardadas en Mongo */
const crypto = require('crypto')
const{ Quiz, Puntuacion } = require('../models')
const { leerToken, resumirToken, coincideToken, esAdmin } = require('../middlewares')

/* Pedimos el ranking ordenado por puntuación y, si empatan, por menos tiempo */
const getPuntuaciones = async ( req, res, next ) => {
    try {
        const data = await Puntuacion.find()
            .sort({
                puntuacion: -1,
                tiempoTotalSegundos: 1
            })

        res.status(200).json({
            message: 'Mostrando ranking',
            data: data
        })
    } catch (error) {
        next(error)
    }
}

/* Recibimos las respuestas del jugador, las corregimos y guardamos la partida */
const postPuntuacion = async ( req, res, next ) => {
    try {
        const { quizId, nick, casa, respuestas, tiempoTotalSegundos } = req.body

        if (!quizId || !nick || !respuestas) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios',
                data: null
            })
        }

        /* Comprobamos los tipos antes de usarlos: si no, un dato con forma
        equivocada rompería el código más abajo y acabaría en un 500 */
        if (!Array.isArray(respuestas)) {
            return res.status(400).json({
                message: 'Las respuestas tienen que llegar en una lista',
                data: null
            })
        }

        /* Cada respuesta tiene que ser un objeto con el id de su pregunta */
        const respuestasBienFormadas = respuestas.every(
            respuestaJugador => respuestaJugador && typeof respuestaJugador.preguntaId === 'string'
        )

        if (!respuestasBienFormadas) {
            return res.status(400).json({
                message: 'Cada respuesta tiene que llevar el preguntaId de su pregunta',
                data: null
            })
        }

        if (typeof tiempoTotalSegundos !== 'number' || tiempoTotalSegundos < 0) {
            return res.status(400).json({
                message: 'El tiempo tiene que ser un número de segundos',
                data: null
            })
        }

        /* La casa es opcional, pero si llega tiene que ser una de las cuatro */
        const casasValidas = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']

        if (casa && !casasValidas.includes(casa)) {
            return res.status(400).json({
                message: `La casa "${casa}" no existe`,
                data: null
            })
        }

        /* Buscamos las preguntas activas de ese quiz */
        const preguntas = await Quiz.find({
            quizId: quizId,
            activa: true
        })

        if (preguntas.length === 0) {
            return res.status(404).json({
                message: 'No existen preguntas activas para este quiz',
                data: null
            })
        }

        /* Tiene que haber una respuesta por pregunta */
        if (respuestas.length !== preguntas.length) {
            return res.status(400).json({
                message: `El número de respuestas (${respuestas.length}) no coincide con el número de preguntas del quiz (${preguntas.length})`,
                data: null
            })
        }

        /* Comprobamos que no se repita ninguna pregunta */
        const idsRespondidos = respuestas.map(
            respuestaJugador => respuestaJugador.preguntaId
        )

        const hayRepetidos = new Set(idsRespondidos).size !== idsRespondidos.length

        if (hayRepetidos) {
            return res.status(400).json({
                message: 'Hay respuestas con preguntaId repetido',
                data: null
            })
        }

        /* Y que todas las preguntas respondidas sean de este quiz */
        const idsDelQuiz = preguntas.map(
            pregunta => pregunta._id.toString()
        )

        const hayIdsAjenos = idsRespondidos.some(
            preguntaId => !idsDelQuiz.includes(preguntaId)
        )

        if (hayIdsAjenos) {
            return res.status(400).json({
                message: 'Hay respuestas con preguntaId que no pertenece a este quiz',
                data: null
            })
        }

        /* Contamos los aciertos comparando con la respuesta correcta */
        let aciertos = 0

        for (const respuestaJugador of respuestas) {
            const pregunta = preguntas.find(
                pregunta => pregunta._id.toString() === respuestaJugador.preguntaId
            )

            if (pregunta) {
                if (pregunta.respuestaCorrecta === respuestaJugador.respuesta) {
                    aciertos++
                }
            }
        }

        const preguntasTotales = preguntas.length
        const errores = preguntasTotales - aciertos

        /* Cada acierto vale 100 puntos */
        const puntuacion = aciertos * 100

        /* Creamos un token aleatorio para esta partida. Guardamos solo su huella
        y el token se lo devolvemos una única vez al jugador: con él podrá
        cambiar el nick o borrar su partida, y nadie más podrá hacerlo */
        const token = crypto.randomBytes(24).toString('hex')

        const nuevaPuntuacion = await Puntuacion.create({
            quizId: quizId,
            nick: nick,
            casa: casa,
            puntuacion: puntuacion,
            aciertos: aciertos,
            errores: errores,
            preguntasTotales: preguntasTotales,
            tiempoTotalSegundos: tiempoTotalSegundos,
            estado: 'finalizada',
            tokenHash: resumirToken(token)
        })

        // Quitamos la huella de la respuesta y añadimos el token
        const { tokenHash, ...partida } = nuevaPuntuacion.toObject()

        res.status(201).json({
            message: 'Partida finalizada y puntuación guardada',
            data: { ...partida, token }
        })
    } catch (error) {
        next(error)
    }
}

/* Solo dejamos cambiar el nick de una puntuación ya guardada */
const patchPuntuacion = async ( req, res, next ) => {
    try {
        const { _id } = req.params
        const { nick } = req.body

        if (typeof nick !== 'string' || !nick.trim()) {
            return res.status(400).json({
                message: 'Falta el nick nuevo',
                data: null
            })
        }

        const actualizada = await Puntuacion.findByIdAndUpdate(
            _id,
            {
                $set: {
                    nick: nick.trim()
                }
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )

        if (!actualizada) {
            return res.status(404).json({
                message: `No existe la puntuación con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: 'Nick actualizado correctamente',
            data: actualizada
        })
    } catch (error) {
        next(error)
    }
}

/* Borramos una puntuación del ranking */
const deletePuntuacion = async ( req, res, next ) => {
    try {
        const { _id } = req.params

        const eliminada = await Puntuacion.findByIdAndDelete(_id)

        if (!eliminada) {
            return res.status(404).json({
                message: `No existe la puntuación con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: 'Puntuación eliminada correctamente',
            data: eliminada
        })
    } catch (error) {
        next(error)
    }
}

/* Antes de cambiar o borrar una puntuación comprobamos que quien lo pide
tiene el token de esa partida, o el token de administración */
const comprobarTokenPartida = async ( req, res, next ) => {
    try {
        if (esAdmin(req)) return next()

        const token = leerToken(req)

        if (!token) {
            return res.status(401).json({
                message: 'Falta el token de la partida',
                data: null
            })
        }

        const { _id } = req.params
        const partida = await Puntuacion.findById(_id).select('+tokenHash')

        if (!partida) {
            return res.status(404).json({
                message: `No existe la puntuación con id ${_id}`,
                data: null
            })
        }

        if (!coincideToken(token, partida.tokenHash)) {
            return res.status(403).json({
                message: 'Este token no permite modificar esta puntuación',
                data: null
            })
        }

        next()
    } catch (error) {
        next(error)
    }
}

/* Exportamos los controllers para el router */
module.exports = {
    getPuntuaciones,
    postPuntuacion,
    patchPuntuacion,
    deletePuntuacion,
    comprobarTokenPartida
}
