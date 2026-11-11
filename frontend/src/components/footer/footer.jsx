import './footer.css'

/* Pie de página con el contacto y la autoría */
export const Footer = () => {
    return (
        <footer className="Footer">
            <div className="Footer-contacto">
                <a href="mailto:magapp92@gmail.com" className="Footer-a">
                    <h4 className="Footer-h4">Contacto</h4>
                </a>
                <div className="Footer-email">magapp92@gmail.com</div>
            </div>
            <div className="Footer-autor">
                <h5 className="Footer-h5">Diseñada y desarrollada por Magaly Puente Parada</h5>
                <div className="Footer-fecha">©2026</div>
            </div>
        </footer>
    )
}
