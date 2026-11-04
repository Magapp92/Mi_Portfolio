
const express = require('express')
const { notFound, errorHandler } = require('./middlewares')
const { getQuestions, postQuestion, putQuestion, patchQuestion, deleteQuestion } = require('./controllers/quiz')
const { getQuestionsById } = require('./controllers/quiz')
const { getPuntuaciones, postPuntuacion, patchPuntuacion, deletePuntuacion } = require ('./controllers/puntuacion')

const router = express.Router()

router.route('/quiz')
.get( getQuestions )
.post( postQuestion )

router.route('/quiz/:_id')
.get( getQuestionsById )
.put( putQuestion )
.patch( patchQuestion )
.delete( deleteQuestion )

router.route('/puntuacion')
.get( getPuntuaciones )
.post( postPuntuacion )

router.route('/puntuacion/:_id')
.patch( patchPuntuacion )
.delete( deletePuntuacion )

router.use(notFound)
router.use(errorHandler)

module.exports = {
    router
}