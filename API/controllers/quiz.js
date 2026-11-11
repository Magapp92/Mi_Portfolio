
/* Controlador de las preguntas del quiz. Al leer nunca mandamos la respuesta
correcta ni el feedback para que no se vean desde el navegador */
const { Quiz } = require('../models')

/* Pedimos todas las preguntas activas sin la respuesta correcta */
const getPreguntas = async ( req, res, next ) => {
    try {
        const data = await Quiz.find(
            { activa: true },
            {
                respuestaCorrecta: 0,
                'feedback.fallo': 0,
                'feedback.acierto': 0
            }
        )

        res.status(200).json({
            message: 'Buscando preguntas activas',
            data
        })
    } catch (error) {
        next(error)
    }
}

/* Una pregunta concreta por su _id */
const getPreguntaById = async ( req, res, next ) => {
    try {
        const { _id } = req.params

        const data = await Quiz.findById(_id, {
            respuestaCorrecta: 0,
            'feedback.fallo': 0,
            'feedback.acierto': 0
        })

        /* 404 si el id no existe */
        if (!data) {
            return res.status(404).json({
                message: `No existe la pregunta con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: `Mostrando la pregunta con id ${_id}`,
            data
        })
    } catch (error) {
        next(error)
    }
}

/* Creamos una pregunta nueva con lo que llega en el body */
const postPregunta = async ( req, res, next ) => {
    try {
        const { body } = req

        const nuevaPregunta = await Quiz.create(body)

        res.status(201).json({
            message: 'Pregunta creada correctamente',
            data: nuevaPregunta
        })
    } catch (error) {
        next(error)
    }
}

/* Sustituimos la pregunta entera por la que llega en el body */
const putPregunta = async ( req, res, next ) => {
    try {
        const { _id } = req.params
        const { body } = req

        const actualizada = await Quiz.findOneAndReplace(
            { _id },
            body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        )

        if (!actualizada) {
            return res.status(404).json({
                message: `No existe la pregunta con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: `Pregunta ${_id} actualizada correctamente`,
            data: actualizada
        })
    } catch (error) {
        next(error)
    }
}

/* Cambiamos solo los campos que vienen en el body */
const patchPregunta = async ( req, res, next ) => {
    try {
        const { _id } = req.params
        const { body } = req

        const actualizada = await Quiz.findByIdAndUpdate( _id,
            { $set: body },
            {
                returnDocument: 'after',
                runValidators: true
            }
        )

        if (!actualizada) {
            return res.status(404).json({
                message: `No existe la pregunta con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: `Pregunta ${_id} modificada correctamente`,
            data: actualizada
        })
    } catch (error) {
        next(error)
    }
}

/* Borramos la pregunta y devolvemos la que se ha eliminado */
const deletePregunta = async ( req, res, next ) => {
    try {
        const { _id } = req.params

        const eliminada = await Quiz.findByIdAndDelete( _id )

        if (!eliminada) {
            return res.status(404).json({
                message: `No existe la pregunta con id ${_id}`,
                data: null
            })
        }

        res.status(200).json({
            message: `Pregunta ${_id} eliminada correctamente`,
            data: eliminada
        })
    } catch (error) {
        next(error)
    }
}

/* Exportamos los controllers para el router */
module.exports = {
    getPreguntas,
    getPreguntaById,
    postPregunta,
    putPregunta,
    patchPregunta,
    deletePregunta
}
