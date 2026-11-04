
const{ Quiz, Puntuacion } = require('../models')

const getPuntuaciones = async (req, res, next) => {
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

const postPuntuacion = async ( req, res, next ) => {
    try {
        const { quizId, nick, respuestas, tiempoTotalSegundos } = req.body

        if (!quizId || !nick || !respuestas) {
            return res.status(400).json({
                message: 'Faltan datos obligatorios',
                data: null
            })
        }


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


        if (respuestas.length !== preguntas.length) {
            return res.status(400).json({
                message: `El número de respuestas (${respuestas.length}) no coincide con el número de preguntas del quiz (${preguntas.length})`,
                data: null
            })
        }


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


        let aciertos = 0

        for (const respuestaJugador of respuestas) {

            const pregunta = preguntas.find(
                pregunta =>
                    pregunta._id.toString() === respuestaJugador.preguntaId
            )

            if (pregunta) {

                if (
                    pregunta.respuestaCorrecta ===
                    respuestaJugador.respuesta
                ) {
                    aciertos++
                }
            }
        }

        const preguntasTotales = preguntas.length

        const errores = preguntasTotales - aciertos


        const puntuacion = aciertos * 100

        const nuevaPuntuacion = await Puntuacion.create({

            quizId: quizId,

            nick: nick,

            puntuacion: puntuacion,

            aciertos: aciertos,

            errores: errores,

            preguntasTotales: preguntasTotales,

            tiempoTotalSegundos: tiempoTotalSegundos,

            estado: 'finalizada'

        })

        res.status(201).json({

            message: 'Partida finalizada y puntuación guardada',

            data: nuevaPuntuacion

        })

    } catch (error) {
        next(error)
    }
}

const patchPuntuacion = async ( req, res, next ) => {
    try {
        const { _id } = req.params
        const { nick } = req.body

        const actualizada = await Puntuacion.findByIdAndUpdate(
            _id,
            {
                $set: {
                    nick: nick
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


module.exports = {
    getPuntuaciones,
    postPuntuacion,
    patchPuntuacion,
    deletePuntuacion
}