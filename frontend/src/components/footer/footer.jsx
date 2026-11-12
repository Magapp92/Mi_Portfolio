import { CONTACTO } from '@const/contacto.js'
import './footer.css'

/* Pie de página con el contacto y la autoría */
export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="Footer-contacto">
                <h4 className="Footer-h4">Contáctame</h4>
                <ul className="Footer-enlaces">
                    <li><a href={`mailto:${CONTACTO.EMAIL}`} className="Footer-a">{CONTACTO.EMAIL}</a></li>
                    <li><a href={CONTACTO.LINKEDIN} target="_blank" rel="noopener noreferrer" className="Footer-a">LinkedIn</a></li>
                    <li><a href={CONTACTO.CV} download className="Footer-a">Descargar CV</a></li>
                </ul>
            </div>
            <div className="Footer-autor">
                <h5 className="Footer-h5">Diseñada y desarrollada por Magaly Puente Parada</h5>
                <div className="Footer-fecha">©2026</div>
            </div>
        </footer>
    )
}
