// pages/juego/juego.jsx
// [IA] Sección nueva: Quiz de Harry Potter contra la API Express + MongoDB.
// Flujo (diseñado en el PDF del juego):
//   1. inicio    → el jugador escribe su nick y pulsa "Empezar partida".
//   2. jugando   → GET /quiz trae las preguntas activas (sin respuestaCorrecta),
//                  el cronómetro corre en el frontend y el jugador responde.
//   3. resultado → POST /puntuacion envía { quizId, nick, respuestas, tiempo };
//                  el BACKEND valida las respuestas contra Mongo, calcula la
//                  puntuación y la guarda. Aquí se muestra el resultado y el
//                  ranking (GET /puntuacion), con cambio de nick (PATCH) y
//                  borrado de la propia puntuación (DELETE).
// Estado con el patrón profesor: un useState por variable, setter directo (C6/C7),
// arrays actualizados con spread (C6) y handlers en castellano (C7b).

import { useState } from 'react'
import { apiFetch } from '@/const/api.js'
import { useApi } from '@/hooks/use-api.js'
import { useJuego } from '@/hooks/use-juego.js'
import { useCronometro } from '@/hooks/use-cronometro.js'
import { QuizPregunta } from '@/components/quiz-pregunta/quiz-pregunta.jsx'
import { RankingTabla } from '@/components/ranking-tabla/ranking-tabla.jsx'
import { Boton } from '@/components/boton/boton.jsx'
import './juego.css'

const JuegoPage = () => {

    // Estado global (context): nick persistido y última puntuación propia.
    const { nick, guardarNick, ultimaPuntuacionId, guardarUltimaPuntuacionId } = useJuego()

    // Estado local de la partida.
    const [estadoPartida, setEstadoPartida] = useState('inicio')
    const [preguntas, setPreguntas] = useState([])
    const [indicePregunta, setIndicePregunta] = useState(0)
    const [respuestas, setRespuestas] = useState([])
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null)
    const [resultado, setResultado] = useState(null)
    const [nuevoNick, setNuevoNick] = useState('')
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)

    // Cronómetro de la partida (el tiempo se envía al terminar, como en el PDF).
    const { segundos, iniciarCronometro, pararCronometro } = useCronometro()

    // Ranking: solo se pide cuando hay resultado (flag enabled del hook).
    const { data: ranking, loading: cargandoRanking, refetch: recargarRanking } =
        useApi('/puntuacion', { enabled: estadoPartida === 'resultado' })

    // --- Handlers (en castellano, regla C7b) ---

    const cambiarNick = (e) => guardarNick(e.target.value)

    const cambiarNuevoNick = (e) => setNuevoNick(e.target.value)

    const empezarPartida = async () => {
        setError(null)
        setCargando(true)
        try {
            const data = await apiFetch('/quiz')

            if (!data || data.length === 0) {
                setError(new Error('No hay preguntas disponibles en este momento'))
                setCargando(false)
                return
            }

            setPreguntas(data)
            setIndicePregunta(0)
            setRespuestas([])
            setOpcionSeleccionada(null)
            setResultado(null)
            setEstadoPartida('jugando')
            setCargando(false)
            iniciarCronometro()
        } catch (err) {
            setError(err)
            setCargando(false)
        }
    }

    const seleccionarOpcion = (idOpcion) => setOpcionSeleccionada(idOpcion)

    const confirmarRespuesta = () => {
        const preguntaActual = preguntas[indicePregunta]

        // Array con spread (regla C6: nunca mutar el estado).
        const nuevasRespuestas = [
            ...respuestas,
            { preguntaId: preguntaActual._id, respuesta: opcionSeleccionada }
        ]

        setRespuestas(nuevasRespuestas)
        setOpcionSeleccionada(null)

        if (indicePregunta + 1 < preguntas.length) {
            setIndicePregunta(indicePregunta + 1)
            return
        }

        finalizarPartida(nuevasRespuestas)
    }

    const finalizarPartida = async (respuestasFinales) => {
        pararCronometro()
        setCargando(true)
        setError(null)
        try {
            // El backend comprueba las respuestas contra Mongo y calcula todo.
            const data = await apiFetch('/puntuacion', {
                method: 'POST',
                body: {
                    quizId: preguntas[0].quizId,
                    nick,
                    respuestas: respuestasFinales,
                    tiempoTotalSegundos: segundos
                }
            })

            setResultado(data)
            guardarUltimaPuntuacionId(data._id)
            setEstadoPartida('resultado')
            setCargando(false)
        } catch (err) {
            setError(err)
            setCargando(false)
        }
    }

    const guardarNuevoNick = async () => {
        if (!nuevoNick.trim()) return
        setError(null)
        try {
            // PATCH /puntuacion/:_id → cambia el nick de la partida guardada.
            const data = await apiFetch(`/puntuacion/${resultado._id}`, {
                method: 'PATCH',
                body: { nick: nuevoNick.trim() }
            })

            setResultado(data)
            guardarNick(data.nick)
            setNuevoNick('')
            recargarRanking()
        } catch (err) {
            setError(err)
        }
    }

    const borrarMiPuntuacion = async () => {
        setError(null)
        try {
            // DELETE /puntuacion/:_id → elimina la partida del ranking.
            await apiFetch(`/puntuacion/${resultado._id}`, { method: 'DELETE' })

            guardarUltimaPuntuacionId(null)
            setResultado(null)
            setEstadoPartida('inicio')
        } catch (err) {
            setError(err)
        }
    }

    const jugarOtraVez = () => {
        setResultado(null)
        setError(null)
        setEstadoPartida('inicio')
    }

    // --- Render por estado de la partida ---

    return (
        <main className={`Juego ${estadoPartida === 'jugando' ? 'Juego--jugando' : ''}`}>
            <div className="Juego-wrapper">
                {estadoPartida !== 'jugando' && (
                    <section className="Juego-cabecera">
                        <h2 className="Juego-h2">Quiz Harry Potter</h2>
                        <p className="Juego-pSection">¿Cuánto sabes de las películas? Responde y entra en el ranking</p>
                    </section>
                )}

                {error && <p className="Juego-error">{error.message}</p>}

                {estadoPartida === 'inicio' && (
                    <section className="Juego-panel">
                        <label className="Juego-label" htmlFor="nick">Tu nick para el ranking</label>
                        <input
                            id="nick"
                            className="Juego-input"
                            type="text"
                            maxLength={20}
                            placeholder="Ej: HarryFan"
                            value={nick}
                            onChange={cambiarNick}
                        />
                        <Boton variante="claro" tamano="lg" disabled={!nick.trim() || cargando} onClick={empezarPartida}>
                            {cargando ? 'Cargando…' : 'Empezar partida'}
                        </Boton>
                    </section>
                )}

                {estadoPartida === 'jugando' && preguntas.length > 0 && (
                    <section className="Juego-panel">
                        <p className="Juego-cronometro">⏱ {segundos} s</p>
                        <QuizPregunta
                            {...preguntas[indicePregunta]}
                            numero={indicePregunta + 1}
                            total={preguntas.length}
                            opcionSeleccionada={opcionSeleccionada}
                            onSeleccionar={seleccionarOpcion}
                        />
                        <Boton variante="claro" tamano="sm" disabled={!opcionSeleccionada || cargando} onClick={confirmarRespuesta}>
                            {indicePregunta + 1 < preguntas.length ? 'Siguiente pregunta' : 'Terminar partida'}
                        </Boton>
                    </section>
                )}

                {estadoPartida === 'resultado' && resultado && (
                    <section className="Juego-panel">
                        <div className="Juego-resultado">
                            <h3 className="Juego-h3">¡Partida terminada, {resultado.nick}!</h3>
                            <p className="Juego-puntos">{resultado.puntuacion} puntos</p>
                            <div className="Juego-detalle">
                                <p className="Juego-dato Juego-dato--acierto">✔ {resultado.aciertos} aciertos</p>
                                <p className="Juego-dato Juego-dato--fallo">✘ {resultado.errores} errores</p>
                                <p className="Juego-dato">⏱ {resultado.tiempoTotalSegundos} s</p>
                            </div>
                        </div>

                        <div className="Juego-acciones">
                            <input
                                className="Juego-input Juego-input--nick"
                                type="text"
                                maxLength={20}
                                placeholder="Cambiar nick en el ranking"
                                value={nuevoNick}
                                onChange={cambiarNuevoNick}
                            />
                            <Boton variante="fantasma" tamano="sm" disabled={!nuevoNick.trim()} onClick={guardarNuevoNick}>
                                Guardar nick
                            </Boton>
                            <Boton variante="fantasma" tamano="sm" onClick={borrarMiPuntuacion}>
                                Eliminar mi puntuación
                            </Boton>
                            <Boton variante="claro" tamano="sm" onClick={jugarOtraVez}>
                                Jugar otra vez
                            </Boton>
                        </div>

                        <h3 className="Juego-h3">Ranking</h3>
                        {cargandoRanking && <p className="Juego-cargando">Cargando ranking…</p>}
                        {!cargandoRanking && (
                            <RankingTabla puntuaciones={ranking} idPropia={ultimaPuntuacionId} />
                        )}
                    </section>
                )}
            </div>
        </main>
    )
}

export default JuegoPage
