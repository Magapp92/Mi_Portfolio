/* Filtro SVG del efecto de vidrio líquido: deforma lo que hay detrás del elemento
como si fuera un cristal ondulado. Solo Chrome y Edge saben usar un filtro SVG en
backdrop-filter, así que marcamos el <html> con una clase y el CSS solo lo aplica
con ella; en el resto de navegadores se queda el cristal esmerilado normal */

import { useEffect } from 'react'

const esChromium = () => navigator.userAgentData?.brands?.some(marca => marca.brand === 'Chromium') ?? false

export const VidrioLiquido = () => {

    useEffect(() => {
        if (!esChromium()) return

        document.documentElement.classList.add('conVidrioLiquido')

        return () => document.documentElement.classList.remove('conVidrioLiquido')
    }, [])

    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            <filter id="vidrio-liquido" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                {/* Ruido muy suave que hace de mapa de ondas */}
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="2" seed="7" result="ruido" />
                <feGaussianBlur in="ruido" stdDeviation="2" result="ondas" />
                {/* Desplazamos los píxeles de detrás según las ondas */}
                <feDisplacementMap in="SourceGraphic" in2="ondas" scale="40" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
    )
}
