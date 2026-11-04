// components/ranking-tabla/ranking-tabla.jsx
// [IA] Tabla del ranking de puntuaciones. Componente presentacional: recibe la
// lista ya ordenada por la API (puntuación desc, tiempo asc) y resalta la fila
// del propio jugador. Patrón de map del profesor (regla C11b): subcomponente
// FilaRanking + spread + key={item._id}.

import './ranking-tabla.css'

/**
 * @param {object} props
 * @param {Array<object>} props.puntuaciones   Partidas ordenadas por la API.
 * @param {string|null} props.idPropia         _id de la puntuación del jugador.
 */
export const RankingTabla = (props) => {

    const { puntuaciones, idPropia } = props

    if (!puntuaciones || puntuaciones.length === 0) {
        return <p className="RankingTabla-vacio">Todavía no hay puntuaciones. ¡Sé la primera persona del ranking!</p>
    }

    return (
        <table className="RankingTabla">
            <thead className="RankingTabla-cabecera">
                <tr>
                    <th className="RankingTabla-th">#</th>
                    <th className="RankingTabla-th">Nick</th>
                    <th className="RankingTabla-th">Puntos</th>
                    <th className="RankingTabla-th">Aciertos</th>
                    <th className="RankingTabla-th">Tiempo</th>
                </tr>
            </thead>
            <tbody>
                {puntuaciones.map((puntuacion, indice) =>
                    <FilaRanking
                        key={puntuacion._id}
                        {...puntuacion}
                        posicion={indice + 1}
                        propia={puntuacion._id === idPropia}
                    />
                )}
            </tbody>
        </table>
    )
}

// Subcomponente de la fila. Recibe props con spread y destructura dentro.
const FilaRanking = (props) => {

    const { nick, puntuacion, aciertos, preguntasTotales, tiempoTotalSegundos, posicion, propia } = props

    return (
        <tr className={`RankingTabla-fila ${propia ? 'is-propia' : ''}`}>
            <td className="RankingTabla-td">{posicion}</td>
            <td className="RankingTabla-td">{nick}</td>
            <td className="RankingTabla-td">{puntuacion}</td>
            <td className="RankingTabla-td">{aciertos}/{preguntasTotales}</td>
            <td className="RankingTabla-td">{tiempoTotalSegundos} s</td>
        </tr>
    )
}

export default RankingTabla
