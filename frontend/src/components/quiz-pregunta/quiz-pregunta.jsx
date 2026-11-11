import './quiz-pregunta.css'

/* Tarjeta con una pregunta del quiz. La respuesta correcta no llega
al front, la comprueba la API al terminar la partida */
export const QuizPregunta = (props) => {

    const { pregunta, pelicula, opciones, numero, total, tiempo, opcionSeleccionada, onSeleccionar } = props

    return (
        <article className="QuizPregunta">
            <div className="QuizPregunta-cabecera">
                <p className="QuizPregunta-progreso">Pregunta {numero}/{total}</p>
                {tiempo && <p className="QuizPregunta-tiempo" aria-label={`Tiempo: ${tiempo}`}>⌛ {tiempo}</p>}
            </div>
            <p className="QuizPregunta-pelicula">{pelicula}</p>
            <h3 className="QuizPregunta-enunciado">{pregunta}</h3>

            <ul className="QuizPregunta-opciones">
                {opciones.map(opcion =>
                    <OpcionQuiz
                        key={opcion.id}
                        {...opcion}
                        seleccionada={opcionSeleccionada === opcion.id}
                        onSeleccionar={onSeleccionar}
                    />
                )}
            </ul>
        </article>
    )
}

/* Botón de cada opción, marcado si es la que ha elegido el jugador */
const OpcionQuiz = (props) => {

    const { id, texto, seleccionada, onSeleccionar } = props

    const elegirOpcion = () => onSeleccionar(id)

    return (
        <li className="QuizPregunta-item">
            <button
                type="button"
                className={`QuizPregunta-opcion ${seleccionada ? 'isSeleccionada' : ''}`}
                onClick={elegirOpcion}
            >
                <span className="QuizPregunta-letra">{id.toUpperCase()}</span>
                {texto}
            </button>
        </li>
    )
}
