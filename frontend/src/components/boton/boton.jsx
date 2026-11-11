/* Botón del portfolio hecho con styled-components, con tres variantes:
primario, claro y fantasma */

import styled, { css } from 'styled-components'

/* Colores de cada variante del botón */
const VARIANTES = {
    primario: css`
        background-color: var(--color-header);

        color: var(--color-texto-principal);

        &:hover{
            background-color: #1c3a54;
        }
    `,
    claro: css`
        background-color: var(--color-claro);

        color: var(--color-texto-secundario);

        &:hover{
            background-color: #6fc4bc;
        }
    `,
    fantasma: css`
        background-color: transparent;
        border: 1.5px solid var(--color-claro);

        color: var(--color-claro);

        &:hover{
            background-color: rgba(140, 219, 211, .12);
        }
    `
}

/* Padding y tamaño de letra según el tamaño elegido */
const TAMANOS = {
    sm: css`
        padding: .45rem .9rem;
        font-size: .9rem;
    `,
    md: css`
        padding: .7rem 1.6rem;
        font-size: 1.05rem;
    `,
    lg: css`
        padding: .95rem 2rem;
        font-size: 1.2rem;
    `
}

/* Las props llevan $ delante para que no lleguen al <button> del DOM */
const BotonEstilado = styled.button`
    border-radius: .5rem;
    border: none;

    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: .5rem;

    font-family: "cabeceras";
    font-weight: 600;
    line-height: 1.2;

    transition: background-color .15s ease, transform .15s ease;
    cursor: pointer;

    ${({ $variante = 'primario' }) => VARIANTES[$variante]}
    ${({ $tamano = 'md' }) => TAMANOS[$tamano]}

    &:disabled{
        opacity: .5;
        cursor: not-allowed;
    }

    &:not(:disabled):active{
        transform: translateY(1px);
    }
`

/* Pintamos el botón con la variante y el tamaño que nos pasan */
export const Boton = (props) => {

    const { variante = 'primario', tamano = 'md', children, ...resto } = props

    return (
        <BotonEstilado $variante={variante} $tamano={tamano} {...resto}>
            {children}
        </BotonEstilado>
    )
}
