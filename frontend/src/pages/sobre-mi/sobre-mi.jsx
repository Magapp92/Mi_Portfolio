/* Página "Sobre mi" con el vídeo de fondo, mi foto, mi presentación y mi recorrido */

import { Link } from 'react-router-dom'
import { Cursor } from '@components/cursor/cursor.jsx'
import { RUTAS } from '@const/rutas.js'
import { TRAYECTORIA } from '@data/trayectoria.js'
import './sobre-mi.css'

export const SobreMi = () => {
    return (
        <main className="SobreMi">
            <Cursor variante="halo" />
            <video src="/assets/VideoFondoAbout.mp4" poster="/assets/VideoFondoAbout-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="SobreMi-video"></video>
            <div className="SobreMi-wrapper">
                <section className="SobreMi-section">
                    <div className="SobreMi-content">
                        <h3 className="SobreMi-h3">Reinventarse es el arte de permitirte descubrir <br /> tu mejor versión</h3>
                    </div>
                    <div className="SobreMi-presentacion">
                        <img src="/assets/magaly-puente.webp" alt="Magaly Puente" className="SobreMi-foto" width="520" height="520" />
                        <article className="SobreMi-article">
                            <h2 className="SobreMi-h2">Un poco de mí</h2>
                            <p className="SobreMi-p">
                                Mi camino no ha sido lineal. Empecé en el ámbito sanitario: estudié Óptica y Optometría y después me formé como Higienista Dental, profesión en la que trabajé varios años en la sanidad privada.
                                Con el tiempo eché en falta algo esencial para mí: espacio para crear, imaginar e innovar. Por eso di un giro de 180º hacia la tecnología y me formé en Diseño Gráfico y Desarrollo Web.
                            </p>
                            <h2 className="SobreMi-h2">Lo que me aporta la sanidad</h2>
                            <p className="SobreMi-p">
                                Ocho años atendiendo pacientes me enseñaron a escuchar antes de proponer, a explicar lo técnico a personas sin conocimientos técnicos y a trabajar con rigor en equipo.
                                Hoy lo aplico al diseño y al desarrollo: entender bien a quien va a usar algo antes de construirlo.{' '}
                                <Link to={`${RUTAS.PROYECTOS}/portaldental`} className="SobreMi-link">PortalDental</Link> nace directamente de mi experiencia como higienista.
                            </p>
                        </article>
                    </div>
                </section>
                <section className="SobreMi-recorrido">
                    <h2 className="SobreMi-h2">Mi recorrido</h2>
                    <ol className="SobreMi-linea">
                        {TRAYECTORIA.map(etapa =>
                            <Etapa key={etapa.id} {...etapa} />
                        )}
                    </ol>
                </section>
                <section className="SobreMi-bottom">
                    <h2 className="SobreMi-h2">Cambiando el rumbo</h2>
                    <p className="SobreMi-p">
                        Hoy me dedico al desarrollo web y al diseño. He trabajado con pequeños negocios creando páginas web, logotipos y contenido multimedia, y en mi tiempo libre rediseño webs que me llaman la atención para seguir aprendiendo.
                    </p>
                    <p className="SobreMi-p">
                        Para dar el salto al desarrollo completo me he formado en desarrollo web Full Stack en <a href="https://cei.es/" target="_blank" rel="noopener noreferrer" className="SobreMi-link">CEI</a>: React, Next.js y TypeScript en el front, APIs REST con Node.js y Express, y bases de datos con MongoDB y Prisma.
                        Elegí CEI por su trayectoria de más de 30 años formando en diseño y nuevas tecnologías, por ser centro oficial de formación de empresas como Adobe, Microsoft o AWS y por las opiniones de sus exalumnos, que destacan la calidad del profesorado y una formación intensa y muy completa.
                    </p>
                    <p className="SobreMi-p">
                        Estoy acostumbrada a trabajar en equipo y a poner siempre en el centro las necesidades del cliente.
                        Fuera de la pantalla, disfruto del aire libre con mi familia y mis dos perritas. Pero lo que de verdad me impulsa es dar vida a ideas y proyectos: ahí es donde siento que estoy en mi lugar.
                    </p>
                </section>
            </div>
        </main>
    )
}

/* Cada etapa de la línea de tiempo */
const Etapa = (props) => {

    const { fechas, titulo, texto } = props

    return (
        <li className="SobreMi-etapa">
            <span className="SobreMi-fechas">{fechas}</span>
            <h3 className="SobreMi-etapaTitulo">{titulo}</h3>
            <p className="SobreMi-p">{texto}</p>
        </li>
    )
}
