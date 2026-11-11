
/* Las cuatro casas que puede elegir el jugador: nombre, colores del escudo
y del borde y el animal que se dibuja en el escudo */
export const CASAS = {
    gryffindor: { id: 'gryffindor', nombre: 'Gryffindor', color: '#ae0001', borde: '#eeba30', animal: 'león' },
    slytherin:  { id: 'slytherin',  nombre: 'Slytherin',  color: '#1a472a', borde: '#c0c0c0', animal: 'serpiente' },
    ravenclaw:  { id: 'ravenclaw',  nombre: 'Ravenclaw',  color: '#222f5b', borde: '#cd7f32', animal: 'águila' },
    hufflepuff: { id: 'hufflepuff', nombre: 'Hufflepuff', color: '#ecb939', borde: '#372e29', animal: 'tejón' }
}

export const LISTA_CASAS = Object.values(CASAS)
