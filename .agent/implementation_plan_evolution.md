# Plan de Implementación: InfraQuiz Evolution

Este documento detalla la estrategia para implementar las nuevas funcionalidades solicitadas, divididas en fases lógicas para asegurar estabilidad y calidad.

## Fase 1: Infraestructura de Persistencia y Gamificación Base
*   **Bookmarks (Marcadores)**:
    *   Implementar `useBookmarks` hook usando `localStorage`.
    *   Añadir botón de "Guardar" en la interfaz de `Quiz.jsx`.
    *   Crear página `Bookmarks.jsx` para visualizar y repasar preguntas guardadas.
*   **Sistema de Rachas (Streaks)**:
    *   Actualizar `useLocalStorage` para trackear la última fecha de actividad.
    *   Lógica en `Dashboard.jsx` para calcular y mostrar la racha actual.
*   **InfraPoints (Monedas)**:
    *   Añadir contador de puntos en el estado global/local.
    *   Lógica de recompensa en `QuizResults.jsx`.
    *   Implementar el "Comodín 50/50" en `Quiz.jsx` consumiendo puntos.

## Fase 2: Aprendizaje y Contenido
*   **Flashcards Automáticas**:
    *   Integrar con el sistema de flashcards existente (si lo hay) o crear un repositorio de `failedQuestions`.
    *   Lógica para añadir preguntas fallidas al pool de repaso espaciado.
*   **Recursos de Referencia**:
    *   Actualizar los archivos de datos de los quizzes para incluir un campo `referenceUrl`.
    *   Mostrar enlace en la sección de explicación de respuestas.
*   **Sintaxis Enriquecida**:
    *   Integrar `react-syntax-highlighter` en `Quiz.jsx` para bloques de código.

## Fase 3: Engagement y Comunidad
*   **Desafío Diario (Daily Challenge)**:
    *   Algoritmo para seleccionar preguntas aleatorias basadas en la fecha (`seed`).
    *   Banner especial en la `Home.jsx`.
*   **Ranking (Leaderboards - Local)**:
    *   Simular un ranking local basado en el historial del usuario mientras se escala a un backend.
*   **Exportación de Resultados**:
    *   Implementar generación de imágenes (usando `html-to-image`) o Share API para redes sociales.

## Fase 4: UX Avanzado
*   **Modo Focus**:
    *   Prop `isFocusMode` en el layout que oculte Navbar/Footer.
    *   Toggle en el menú de configuración del quiz.
*   **Comentarios y Discusión**:
    *   Sección de comentarios (inicialmente local o vía integración externa) bajo la explicación del resultado.

---

## Próximos Pasos Inmediatos
1.  **Crear el hook de Marcadores y Rachas**.
2.  **Modificar `Quiz.jsx` para soportar Marcadores y Modo Focus**.
3.  **Implementar la lógica de InfraPoints en los resultados**.
