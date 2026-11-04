// components/quiz-pregunta/quiz-pregunta.jsx
// [IA] Tarjeta de una pregunta del quiz. La API ya envía las preguntas SIN
// respuestaCorrecta (la valida el backend al final de la partida), así que
// aquí solo se pinta el enunciado y las opciones.
// Sigue el patrón de map del profesor (regla C11b): subcomponente extraído,
// spread del item, key estable (opcion.id) y destructuring dentro del cuerpo.

import './quiz-pregunta.css'

/**
 * @param {object} props
 * @param {string} props.pregunta              Enunciado.
 * @param {string} props.pelicula              Película a la que pertenece.
 * @param {Array<{id: string, texto: string}>} props.opciones
 * @param {number} props.numero                Número de pregunta actual (1..n).
 * @param {number} props.total                 Total de preguntas.
 * @param {string|null} props.opcionSeleccionada  Id de la opción marcada.
 * @param {Function} props.onSeleccionar       Recibe el id de la opción pulsada.
 */
export const QuizPregunta = (props) => {

    const { pregunta, pelicula, opciones, numero, total, opcionSeleccionada, onSeleccionar } = props

    return (
        <article className="QuizPregunta">
            <p className="QuizPregunta-progreso">Pregunta {numero} de {total}</p>
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

// Subcomponente de la opción. Recibe props con spread y destructura dentro.
const OpcionQuiz = (props) => {

    const { id, texto, seleccionada, onSeleccionar } = props

    // Handler en castellano (regla C7b).
    const elegirOpcion = () => onSeleccionar(id)

    return (
        <li className="QuizPregunta-item">
            <button
                type="button"
                className={`QuizPregunta-opcion ${seleccionada ? 'is-seleccionada' : ''}`}
                onClick={elegirOpcion}
            >
                <span className="QuizPregunta-letra">{id.toUpperCase()}</span>
                {texto}
            </button>
        </li>
    )
}

export default QuizPregunta
