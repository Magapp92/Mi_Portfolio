/* Quiz de Harry Potter: el jugador elige nick y casa, responde las preguntas
de la API y al terminar ve su puntuación y el ranking */

import { useState } from 'react'
import { QuizPregunta } from '@components/quiz-pregunta/quiz-pregunta.jsx'
import { RankingTabla } from '@components/ranking-tabla/ranking-tabla.jsx'
import { Cursor } from '@components/cursor/cursor.jsx'
import { EscenaMagica } from '@components/escena-magica/escena-magica.jsx'
import { EscudoCasa } from '@components/escudo-casa/escudo-casa.jsx'
import { CopaTresMagos } from '@components/copa-tres-magos/copa-tres-magos.jsx'
import { usePeticion } from '@hooks/use-peticion.js'
import { useJuego } from '@hooks/use-juego.js'
import { useCronometro } from '@hooks/use-cronometro.js'
import { pedir } from '@const/peticiones.js'
import { LISTA_CASAS } from '@data/casas.js'
import './juego.css'

/* Escenarios que vamos alternando en cada pregunta */
const ESCENAS_PREGUNTA = ['mazmorra', 'bosque', 'estacion', 'comedor']

/* Pasamos los segundos a formato mm:ss */
const formatearTiempo = (segundos) => {
    const minutos = String(Math.floor(segundos / 60)).padStart(2, '0')
    const resto = String(segundos % 60).padStart(2, '0')

    return `${minutos}:${resto}`
}

export const Juego = () => {

    const { nick, guardarNick, casa, guardarCasa, ultimaPuntuacionId, guardarUltimaPuntuacionId } = useJuego()

    const [estadoPartida, setEstadoPartida] = useState('inicio')
    const [preguntas, setPreguntas] = useState([])
    const [indicePregunta, setIndicePregunta] = useState(0)
    const [respuestas, setRespuestas] = useState([])
    const [opcionSeleccionada, setOpcionSeleccionada] = useState(null)
    const [resultado, setResultado] = useState(null)
    const [nuevoNick, setNuevoNick] = useState('')
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(false)
    const [copaCerrada, setCopaCerrada] = useState(false)

    const { segundos, iniciarCronometro, pararCronometro } = useCronometro()

    // El ranking solo lo pedimos cuando ya hay resultado
    const { data: ranking, loading: cargandoRanking, refetch: recargarRanking } =
        usePeticion('/puntuacion', { enabled: estadoPartida === 'resultado' })

    // Mientras se juega el fondo cambia con cada pregunta
    const escena = estadoPartida === 'jugando'
        ? ESCENAS_PREGUNTA[indicePregunta % ESCENAS_PREGUNTA.length]
        : 'comedor'

    // Sacamos la copa si la partida que acabamos de jugar va primera en el ranking
    const esCampeon = estadoPartida === 'resultado' && !cargandoRanking &&
        resultado && ranking?.[0]?._id === resultado._id && !copaCerrada

    const cambiarNick = (e) => guardarNick(e.target.value)

    const cambiarNuevoNick = (e) => setNuevoNick(e.target.value)

    /* Pedimos las preguntas a la API y arrancamos el cronómetro */
    const empezarPartida = async () => {
        setError(null)
        setCargando(true)
        try {
            const data = await pedir('/quiz')

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

    /* Guardamos la respuesta y pasamos a la siguiente pregunta o terminamos */
    const confirmarRespuesta = () => {
        const preguntaActual = preguntas[indicePregunta]

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

    /* Enviamos las respuestas y el tiempo, y la API nos devuelve la puntuación */
    const finalizarPartida = async (respuestasFinales) => {
        pararCronometro()
        setCargando(true)
        setError(null)
        try {
            const data = await pedir('/puntuacion', {
                method: 'POST',
                body: {
                    quizId: preguntas[0].quizId,
                    nick,
                    casa,
                    respuestas: respuestasFinales,
                    tiempoTotalSegundos: segundos
                }
            })

            setResultado(data)
            setCopaCerrada(false)
            guardarUltimaPuntuacionId(data._id)
            setEstadoPartida('resultado')
            setCargando(false)
        } catch (err) {
            setError(err)
            setCargando(false)
        }
    }

    /* Cambiamos el nick de la partida guardada y recargamos el ranking */
    const guardarNuevoNick = async () => {
        if (!nuevoNick.trim()) return
        setError(null)
        try {
            const data = await pedir(`/puntuacion/${resultado._id}`, {
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

    /* Borramos nuestra partida del ranking y volvemos al inicio */
    const borrarMiPuntuacion = async () => {
        setError(null)
        try {
            await pedir(`/puntuacion/${resultado._id}`, { method: 'DELETE' })

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

    const cerrarCopa = () => setCopaCerrada(true)

    return (
        <main className="Juego">
            <Cursor variante="snitch" />
            <EscenaMagica escena={escena} />

            <div className="Juego-capa">
                {estadoPartida === 'inicio' && (
                    <h2 className="Juego-titulo">Quiz<br />Harry Potter</h2>
                )}
                {estadoPartida === 'resultado' && resultado && (
                    <h2 className="Juego-titulo Juego-titulo--resultado">¡Partida terminada!</h2>
                )}

                {error && <p className="Juego-error">{error.message}</p>}

                {estadoPartida === 'inicio' && (
                    <section className="Juego-pergamino">
                        <label className="Juego-etiqueta" htmlFor="nick">Tu nick</label>
                        <input
                            id="nick"
                            className="Juego-input"
                            type="text"
                            maxLength={20}
                            placeholder="Ej: HarryFan"
                            value={nick}
                            onChange={cambiarNick}
                        />

                        <p className="Juego-etiqueta" id="elige-casa">Elige tu casa</p>
                        <div className="Juego-casas" role="radiogroup" aria-labelledby="elige-casa">
                            {LISTA_CASAS.map(itemCasa =>
                                <OpcionCasa
                                    key={itemCasa.id}
                                    {...itemCasa}
                                    seleccionada={casa === itemCasa.id}
                                    onElegir={guardarCasa}
                                />
                            )}
                        </div>

                        <button
                            type="button"
                            className="Juego-boton"
                            disabled={!nick.trim() || !casa || cargando}
                            onClick={empezarPartida}
                        >
                            {cargando ? 'Cargando…' : '▶ Empezar partida'}
                        </button>
                    </section>
                )}

                {estadoPartida === 'jugando' && preguntas.length > 0 && (
                    <section className="Juego-pergamino">
                        <QuizPregunta
                            {...preguntas[indicePregunta]}
                            numero={indicePregunta + 1}
                            total={preguntas.length}
                            tiempo={formatearTiempo(segundos)}
                            opcionSeleccionada={opcionSeleccionada}
                            onSeleccionar={seleccionarOpcion}
                        />
                        <button
                            type="button"
                            className="Juego-boton"
                            disabled={!opcionSeleccionada || cargando}
                            onClick={confirmarRespuesta}
                        >
                            {indicePregunta + 1 < preguntas.length ? 'Confirmar' : 'Terminar partida'}
                        </button>
                    </section>
                )}

                {estadoPartida === 'resultado' && resultado && (
                    <section className="Juego-pergamino Juego-pergamino--resultado">
                        <div className="Juego-marcador">
                            <p className="Juego-dato">Aciertos<b>{resultado.aciertos}/{resultado.preguntasTotales}</b></p>
                            <p className="Juego-dato">Tiempo<b>{formatearTiempo(resultado.tiempoTotalSegundos)}</b></p>
                            <p className="Juego-dato">Puntos<b>{resultado.puntuacion}</b></p>
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
                            <button type="button" className="Juego-boton Juego-boton--secundario" disabled={!nuevoNick.trim()} onClick={guardarNuevoNick}>
                                Guardar nick
                            </button>
                            <button type="button" className="Juego-boton Juego-boton--secundario" onClick={borrarMiPuntuacion}>
                                Eliminar mi puntuación
                            </button>
                            <button type="button" className="Juego-boton" onClick={jugarOtraVez}>
                                Jugar otra vez
                            </button>
                        </div>

                        <p className="Juego-etiqueta">Ranking</p>
                        {cargandoRanking && <p className="Juego-cargando">Cargando ranking…</p>}
                        {!cargandoRanking && (
                            <RankingTabla puntuaciones={ranking} idPropia={ultimaPuntuacionId} />
                        )}
                    </section>
                )}
            </div>

            {esCampeon && <CopaTresMagos onCerrar={cerrarCopa} />}
        </main>
    )
}

/* Botón de cada casa con su escudo, la elegida se marca con sus colores */
const OpcionCasa = (props) => {

    const { id, nombre, color, borde, seleccionada, onElegir } = props

    const elegirCasa = () => onElegir(id)

    return (
        <button
            type="button"
            role="radio"
            aria-checked={seleccionada}
            className={`Juego-casa ${seleccionada ? 'isSeleccionada' : ''}`}
            style={{ '--casa-color': color, '--casa-borde': borde }}
            onClick={elegirCasa}
        >
            <EscudoCasa casa={id} tamano="grande" />
            {nombre}
        </button>
    )
}
