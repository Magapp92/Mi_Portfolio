
const { Quiz } = require('../models')

const getQuestions = async ( req, res, next ) => {
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

const getQuestionsById = async ( req, res, next ) => {
    try{
        const { _id } = req.params

        const data = await Quiz.findById(_id,   {
                respuestaCorrecta: 0,
                'feedback.fallo': 0,
                'feedback.acierto': 0
            })
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

const postQuestion = async ( req, res, next ) => {
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

const putQuestion = async ( req, res, next ) => {
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

const patchQuestion = async ( req, res, next ) => {
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

const deleteQuestion = async ( req, res, next ) => {
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


module.exports = {
    getQuestions, 
    getQuestionsById,
    postQuestion, 
    putQuestion,
    patchQuestion,
    deleteQuestion  

}