# Portfolio Maga

Portfolio de Magaly Puente hecho con React. Además de las páginas del portfolio
tiene un quiz de Harry Potter que guarda las puntuaciones en una API propia.

- **Frontend**: React 18 + Vite + React Router (`frontend/`)
- **Backend**: Express 5 + Mongoose (`API/`)
- **Base de datos**: MongoDB

## Requisitos

- **Node.js** 18 o superior
- **MongoDB**: un servidor local (con MongoDB Compass) o un cluster de Atlas

## Instalación

Los comandos se lanzan desde la carpeta raíz del proyecto, donde están `API/` y `frontend/`.

1. **Instalar dependencias** (en las dos carpetas):

```bash
cd API && npm install
cd ../frontend && npm install
```

2. **Crear los archivos `.env`** (no se suben con el código):

- `API/.env`: `PORT` (puerto de la API, por ejemplo 3000) y `MONGO_URI` (la cadena de conexión a tu Mongo)
- `frontend/.env`: copiar el `.env.example` como `.env`. Lleva `VITE_API_URL`, la URL base
  de la API con el prefijo `/harrypotter`. Si no está se usa `http://localhost:3000/harrypotter`

3. **Importar las preguntas** en MongoDB: con Compass, importar `API/juego_harry_potter_crud_final.json`
   en una colección llamada `quiz`. La colección `puntuaciones` se crea sola al terminar la primera partida.

4. **Arrancar** (dos terminales):

```bash
cd API && npm run dev          # API en localhost:3000
cd frontend && npm run dev     # web en localhost:5173
```

## Estructura del proyecto

```
├── API/                  Backend Express
│   ├── controllers/      Lógica del quiz y de las puntuaciones
│   ├── router.js         Todos los endpoints bajo /harrypotter
│   ├── schemas.js        Schemas de Mongoose · models.js Modelos · middlewares.js 404 y errores
│   └── index.js          Arranque: Express + cors + conexión a Mongo
│
└── frontend/             Frontend React + Vite
    └── src/
        ├── pages/        Inicio, sobre mí, proyectos, detalle de proyecto, formación, juego y 404
        ├── components/   Header, footer, cursor, botón, preguntas del quiz, ranking, escudos…
        ├── context/      Contexto del juego (nick, casa y última puntuación en localStorage)
        ├── hooks/        usePeticion, useAlmacenamiento, useCronometro, useJuego
        ├── const/        Rutas y la función que hace las peticiones a la API
        └── data/         Textos de las páginas (estudios, proyectos, formación, casas)
```

Los imports del front usan los alias `@components`, `@pages`, `@hooks`, `@context`, `@const`
y `@data` definidos en `vite.config.js`.

## Cómo funciona el quiz

1. `GET /quiz`: la API devuelve las preguntas activas sin la respuesta correcta.
2. El jugador elige casa y nick y responde mientras corre el cronómetro.
3. `POST /puntuacion`: se envían `quizId`, `nick`, `casa`, `respuestas` y `tiempoTotalSegundos`.
   La API corrige las respuestas con las de Mongo, calcula la puntuación y la guarda.
4. `GET /puntuacion`: ranking ordenado por puntuación y, si empatan, por menos tiempo.
5. Al terminar la partida se puede cambiar el nick (`PATCH /puntuacion/:_id`) o borrar
   la puntuación propia (`DELETE /puntuacion/:_id`).
