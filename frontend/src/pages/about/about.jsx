// pages/about/about.jsx
// Página "Sobre mi". Traslada about.html con su cursor de halo.

import { Cursor } from '@/components/cursor/cursor.jsx'
import './about.css'

const AboutPage = () => {
    return (
        <main className="About">
            <Cursor variante="halo" />
            <video src="/assets/VideoFondoAbout.mp4" poster="/assets/VideoFondoAbout-poster.jpg" autoPlay muted loop playsInline preload="metadata" className="About-video"></video>
            <div className="About-wrapper">
                <section className="About-section">
                    <div className="About-content">
                        <h3 className="About-h3">Reinventarse es el arte de permitirte descubrir <br /> tu mejor versión</h3>
                    </div>
                    <article className="About-article">
                        <h2 className="About-h2">Un poco de mí</h2>
                        <p className="About-p">
                            Mi camino no ha sido lineal. Empecé en el ámbito sanitario: estudié Óptica y Optometría y después me formé como Higienista Dental, profesión en la que trabajé varios años en la sanidad privada.
                            Con el tiempo eché en falta algo esencial para mí: espacio para crear, imaginar e innovar. Por eso di un giro de 180º hacia la tecnología y me formé en Diseño Gráfico y Desarrollo Web.
                        </p>
                    </article>
                </section>
                <section className="About-bottom">
                    <h2 className="About-h2">Cambiando el rumbo</h2>
                    <p className="About-p">
                        Hoy me dedico al desarrollo web y al diseño. He trabajado con pequeños negocios creando páginas web, logotipos y contenido multimedia, y en mi tiempo libre rediseño webs que me llaman la atención para seguir aprendiendo.
                        Para dar el salto al desarrollo completo me he formado en desarrollo web Full Stack en <a href="https://cei.es/" target="_blank" rel="noopener noreferrer" className="About-link">CEI</a>: React, Next.js y TypeScript en el front, APIs REST con Node.js y Express, y bases de datos con MongoDB y Prisma.
                        Elegí CEI por su trayectoria de más de 30 años formando en diseño y nuevas tecnologías, por ser centro oficial de formación de empresas como Adobe, Microsoft o AWS y por las opiniones de sus exalumnos, que destacan la calidad del profesorado y una formación intensa y muy completa.
                        Estoy acostumbrada a trabajar en equipo y a poner siempre en el centro las necesidades del cliente.
                        Fuera de la pantalla, disfruto del aire libre con mi familia y mis dos perritas, Panchi y Bolita, haciendo rutas de senderismo. Pero lo que de verdad me impulsa es dar vida a ideas y proyectos: ahí es donde siento que estoy en mi lugar.
                    </p>
                </section>
            </div>
        </main>
    )
}

export default AboutPage
