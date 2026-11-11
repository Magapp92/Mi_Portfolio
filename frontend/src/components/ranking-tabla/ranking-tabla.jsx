import { CASAS } from '@data/casas.js'
import { EscudoCasa } from '@components/escudo-casa/escudo-casa.jsx'
import './ranking-tabla.css'

/* Tabla del ranking. Las puntuaciones ya vienen ordenadas de la API
y marcamos la fila del propio jugador */
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
                    <th className="RankingTabla-th"><span className="RankingTabla-oculto">Casa</span></th>
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

/* Fila de cada jugador con el escudo y el color de su casa */
const FilaRanking = (props) => {

    const { nick, casa, puntuacion, aciertos, preguntasTotales, tiempoTotalSegundos, posicion, propia } = props

    return (
        <tr
            className={`RankingTabla-fila ${propia ? 'isPropia' : ''}`}
            style={{ '--casa-color': CASAS[casa]?.color ?? '#6b6b74' }}
        >
            <td className="RankingTabla-td RankingTabla-td--posicion">{posicion}</td>
            <td className="RankingTabla-td RankingTabla-td--escudo"><EscudoCasa casa={casa} /></td>
            <td className="RankingTabla-td">{nick}</td>
            <td className="RankingTabla-td">{puntuacion}</td>
            <td className="RankingTabla-td">{aciertos}/{preguntasTotales}</td>
            <td className="RankingTabla-td">{tiempoTotalSegundos} s</td>
        </tr>
    )
}
