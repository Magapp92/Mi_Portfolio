# Portfolio Maga — Frontend React

SPA del portfolio de Magaly Puente (conversión de la web estática original) con
una sección nueva: el **Quiz de Harry Potter** conectado a la API Express + MongoDB
de `../API`.

## Stack

- Vite + React 18 + JavaScript (JSDoc para tipar props y hooks)
- React Router (`createBrowserRouter`, lazy + Suspense por página)
- Styled Components para presentacionales atómicos (Botón); CSS plano por
  componente/página para layout
- Alias de importación `@` → `/src`

## Estructura

```
src/
├── components/   # header, footer, cursor, boton, quiz-pregunta, ranking-tabla
├── const/        # api.js (helper fetch), routes.js
├── context/      # juego-context (nick + última puntuación, en localStorage)
├── data/         # contenido estático (estudios, proyectos, formación)
├── hooks/        # use-api, use-juego, use-local-storage, use-cronometro
└── pages/        # home, about, proyectos, formacion, juego, not-found
```

## Puesta en marcha

```bash
npm install
copy .env.example .env    # ajustar VITE_API_URL si hace falta
npm run dev               # http://localhost:5173
```

La API debe estar corriendo (por defecto `http://localhost:3000/harrypotter`)
con MongoDB y la colección `quiz` poblada (`juego_harry_potter_crud_final.json`).

## Flujo del juego

1. `GET /quiz` — preguntas activas (la API oculta `respuestaCorrecta`).
2. El jugador responde; el cronómetro corre en el frontend.
3. `POST /puntuacion` — se envían `{ quizId, nick, respuestas, tiempoTotalSegundos }`;
   el backend valida contra Mongo, calcula la puntuación y la guarda.
4. `GET /puntuacion` — ranking ordenado (puntuación desc, tiempo asc).
5. Extras: `PATCH /puntuacion/:id` (cambiar nick) y `DELETE /puntuacion/:id`
   (eliminar la propia puntuación).
