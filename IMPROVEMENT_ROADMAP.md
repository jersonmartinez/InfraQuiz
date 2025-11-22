# 🗺️ InfraQuiz - Hoja de Ruta de Mejoras y Simplificación

## 🔍 Diagnóstico Actual
El proyecto tiene una base sólida pero sufre de **sobre-ingeniería** y **duplicación de código**. Se han implementado patrones complejos (como gestores de memoria manuales, optimizadores de CSS en tiempo de ejecución, y sistemas de caché personalizados) que son innecesarios para una aplicación web estática y añaden deuda técnica.

### Problemas Identificados
1.  **Código "Fantasma"**: Archivos como `performance-optimization.js` contienen clases enteras que simulan funcionalidad (con comentarios como "In a real implementation...") pero no aportan valor real.
2.  **Duplicación de Lógica**: Múltiples archivos intentan manejar la misma responsabilidad (ej: Service Workers en `init.js`, `enhanced-config.js` y `performance-optimization.js`).
3.  **Fragmentación**: La lógica de Flashcards está dividida arbitrariamente entre `flashcards.js` y `flashcard-integration.js`.
4.  **Mezcla de Responsabilidades**: Archivos JS inyectando estilos CSS (`flashcard-integration.js`), lo cual rompe la separación de intereses.

---

## 🚀 Plan de Acción

### Fase 1: Limpieza y Consolidación (Inmediato)

#### 1. Eliminar "Bloatware" (Código innecesario)
- 🗑️ **Eliminar `enhanced-config.js`**: Reemplazar con un `config.js` simple y estático.
- 🗑️ **Eliminar `performance-optimization.js`**: La mayoría de sus funciones son placebos o innecesarias para el tamaño actual de la app.
- 🗑️ **Eliminar `accessibility-utils.js`**: Si su funcionalidad ya está en `script.js` (que parece estarlo).

#### 2. Unificar Módulos Core
- 📦 **Fusionar Flashcards**: Integrar `flashcard-integration.js` dentro de `flashcards.js`. La lógica de gamificación debe ser parte nativa del módulo, no un parche externo.
- 📦 **Unificar Inicialización**: Combinar `init.js` y `script.js` en un punto de entrada claro (ej: `main.js`).

#### 3. Estandarización de Módulos
- Mover todos los scripts de la raíz `site/` a `site/js/`.
- Usar módulos ES6 (`import`/`export`) en lugar de variables globales (`window.InfraQuiz`).

### Fase 2: Arquitectura y Calidad (Corto Plazo)

#### 1. Separación de Estilos
- Extraer los estilos inyectados por JS (en `flashcard-integration.js`) y moverlos a `css/components.css` o `css/flashcards.css`.

#### 2. Configuración Centralizada
- Crear un único archivo `js/config.js` que exporte la configuración necesaria (rutas, límites, feature flags).

#### 3. Manejo de Estado
- Centralizar el estado de la aplicación (usuario, progreso, configuración) en un `Store` simple o usar `localStorage` de forma consistente a través de un servicio `StorageService`.

### Fase 3: Optimización Real (Mediano Plazo)

#### 1. Build System (Opcional pero recomendado)
- Introducir **Vite** o **Parcel**. Esto eliminaría la necesidad de "code splitters" manuales y optimizaría los assets automáticamente.

#### 2. Testing
- Añadir pruebas unitarias reales para la lógica de negocio (cálculo de puntajes, algoritmo SM-2 de flashcards).

---

## 📅 Propuesta de Ejecución Inmediata

Para responder a tu inquietud sobre si el código es funcional o aporta valor, propongo ejecutar inmediatamente la **Fase 1**:

1.  **Auditoría de Funcionalidad**: Verificar qué características de `enhanced-config.js` son realmente usadas.
2.  **Refactorización de Flashcards**: Crear un único archivo `js/modules/flashcards.js` limpio.
3.  **Limpieza de Archivos**: Borrar los archivos redundantes identificados.

### Resultado Esperado
- Reducción de ~40% en el tamaño del código JS.
- Eliminación de la complejidad cognitiva (más fácil de entender).
- Una aplicación más robusta y fácil de mantener.
