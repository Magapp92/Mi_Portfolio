// components/boton/boton.jsx
// [IA] Botón presentacional. Cumple regla C15: componentes stateless con
// Styled Components. Usa las variables CSS de la web original para mantener
// la identidad visual. Variantes: primario (azul cabecera), claro (turquesa)
// y fantasma (transparente con borde).

import styled, { css } from 'styled-components'

// Mapa de variantes → estilos.
const variantes = {
    primario: css`
        background-color: var(--header-color);
        color: var(--color-primary-text);
        &:hover { background-color: #1c3a54; }
    `,
    claro: css`
        background-color: var(--light-color);
        color: var(--color-secondary-text);
        &:hover { background-color: #6fc4bc; }
    `,
    fantasma: css`
        background-color: transparent;
        color: var(--light-color);
        border: 1.5px solid var(--light-color);
        &:hover { background-color: rgba(140, 219, 211, 0.12); }
    `
}

const tamanos = {
    sm: css` padding: 0.45rem 0.9rem; font-size: 0.9rem; `,
    md: css` padding: 0.7rem 1.6rem; font-size: 1.05rem; `,
    lg: css` padding: 0.95rem 2rem; font-size: 1.2rem; `
}

// $variante y $tamano con prefijo $ para que styled-components NO los pase al
// DOM (regla C10: solo atributos HTML válidos llegan al <button>).
const BotonEstilado = styled.button`
    font-family: "cabeceras";
    font-weight: 600;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease, transform 0.15s ease;
    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    ${({ $variante = 'primario' }) => variantes[$variante]}
    ${({ $tamano = 'md' }) => tamanos[$tamano]}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:not(:disabled):active {
        transform: translateY(1px);
    }
`

/**
 * Botón estándar del portfolio.
 * @param {object} props
 * @param {'primario'|'claro'|'fantasma'} [props.variante]
 * @param {'sm'|'md'|'lg'} [props.tamano]
 * @param {React.ReactNode} props.children
 */
export const Boton = ({ variante = 'primario', tamano = 'md', children, ...rest }) => {
    return (
        <BotonEstilado $variante={variante} $tamano={tamano} {...rest}>
            {children}
        </BotonEstilado>
    )
}

export default Boton
