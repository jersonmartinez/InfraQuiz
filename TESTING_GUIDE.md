# 🧪 InfraQuiz - Guía de Pruebas

## Fecha: 2025-11-25
## Versión: 2.0.0

---

## 📋 Checklist de Pruebas

### 1. Página Principal (Home)
- [ ] Navega a http://localhost:5173
- [ ] Verifica que se muestra el hero section
- [ ] Verifica que hay 3 categorías en el grid
- [ ] Click en "Start Learning" debe ir a /quiz

**Resultado Esperado**: Página principal carga correctamente con diseño moderno

---

### 2. Selección de Quiz
- [ ] Navega a http://localhost:5173/quiz
- [ ] Verifica que se muestran las **14 categorías**:
  - Terraform (púrpura)
  - Docker (azul)
  - Kubernetes (azul)
  - AWS (naranja)
  - Bash (verde)
  - Python (amarillo)
  - Ansible (rojo)
  - CI/CD (verde)
  - Databases (cyan)
  - GitHub (gris)
  - Monitoring (rosa)
  - Networking (índigo)
  - Security (rojo)
  - Mixed Topics (violeta)

**Resultado Esperado**: Grid de 14 categorías con iconos únicos

---

### 3. Quiz - Terraform
- [ ] Click en "Terraform"
- [ ] Verifica que muestra "1 / 21" (no "1 / 1")
- [ ] Verifica que la pregunta tiene emoji al inicio
- [ ] Verifica que hay 4 opciones (A, B, C, D)
- [ ] **IMPORTANTE**: Verifica que las opciones están en orden aleatorio
  - Recarga la página y verifica que el orden cambió

**Resultado Esperado**: 21 preguntas, opciones aleatorias

---

### 4. Responder Preguntas
- [ ] Selecciona una respuesta
- [ ] Verifica que se muestra:
  - ✅ Verde si es correcta
  - ❌ Rojo si es incorrecta
  - La respuesta correcta se marca en verde
- [ ] Verifica que aparece la explicación
- [ ] Verifica que el código en backticks tiene fondo gris
- [ ] Click en "Next Question"

**Resultado Esperado**: Feedback visual claro, explicaciones legibles

---

### 5. Completar Quiz
- [ ] Completa todas las 21 preguntas
- [ ] Verifica que se muestra la pantalla de resultados
- [ ] Verifica que muestra:
  - Porcentaje (ej: 85%)
  - Score (ej: 18/21)
  - Botón "Try Again"
  - Botón "Other Quizzes"

**Resultado Esperado**: Pantalla de resultados con estadísticas

---

### 6. Analytics Dashboard
- [ ] Navega a http://localhost:5173/analytics
- [ ] Si es tu primer quiz, verifica que muestra:
  - Total Quizzes: 1
  - Average Score: X%
  - Best Score: X%
  - Time Spent: Xm Xs

**Resultado Esperado**: Dashboard con estadísticas del quiz completado

---

### 7. Achievements (Logros)
- [ ] En Analytics, busca la sección "Achievements"
- [ ] Verifica que hay **8 badges**:
  1. 🎯 First Steps (debe estar desbloqueado)
  2. 💯 Perfectionist
  3. 🏆 Master
  4. 📚 Polyglot
  5. ⚡ Speed Demon
  6. 🔥 On Fire
  7. ⭐ Expert
  8. 🎓 Legend

**Resultado Esperado**: Grid de 8 achievements, "First Steps" desbloqueado

---

### 8. Persistencia (localStorage)
- [ ] Completa un quiz
- [ ] Recarga la página (F5)
- [ ] Navega a /analytics
- [ ] Verifica que los datos siguen ahí

**Resultado Esperado**: Datos persisten después de recargar

---

### 9. Múltiples Quizzes
- [ ] Completa 2-3 quizzes más (diferentes temas)
- [ ] Verifica en Analytics:
  - Total Quizzes aumenta
  - Average Score se calcula
  - Aparece "Favorite Topics"
  - "Recent Quizzes" muestra los últimos

**Resultado Esperado**: Estadísticas se actualizan correctamente

---

### 10. Desbloquear Achievements

#### Perfectionist (100%)
- [ ] Completa un quiz con 21/21 correctas
- [ ] Verifica que se desbloquea "Perfectionist"

#### Speed Demon (<5 min)
- [ ] Completa un quiz en menos de 5 minutos
- [ ] Verifica que se desbloquea "Speed Demon"

#### On Fire (3 en un día)
- [ ] Completa 3 quizzes en el mismo día
- [ ] Verifica que se desbloquea "On Fire"

#### Polyglot (5 temas)
- [ ] Completa quizzes en 5 temas diferentes
- [ ] Verifica que se desbloquea "Polyglot"

**Resultado Esperado**: Achievements se desbloquean automáticamente

---

### 11. Responsive Design
- [ ] Abre DevTools (F12)
- [ ] Cambia a vista móvil (375x667)
- [ ] Navega por todas las páginas
- [ ] Verifica que todo se ve bien

**Resultado Esperado**: Diseño responsive en móvil

---

### 12. Limpiar Historial
- [ ] En Analytics, click en "Clear History"
- [ ] Confirma la acción
- [ ] Verifica que se borran todos los datos
- [ ] Verifica que los achievements también se borran

**Resultado Esperado**: Todo se limpia correctamente

---

## 🐛 Bugs Conocidos a Verificar

### ❌ Posibles Problemas:

1. **Emojis no se muestran**
   - Algunos emojis pueden aparecer como ◆
   - Verificar en diferentes navegadores

2. **Opciones no aleatorias**
   - Si siempre aparecen en el mismo orden
   - Verificar que el shuffle funciona

3. **Analytics vacío**
   - Si no se guardan los datos
   - Verificar localStorage en DevTools

4. **Achievements no se desbloquean**
   - Verificar lógica en consola
   - Buscar errores en console.log

---

## 🔍 Debugging

### Ver localStorage:
1. Abre DevTools (F12)
2. Ve a "Application" tab
3. Expande "Local Storage"
4. Click en "http://localhost:5173"
5. Busca:
   - `quizHistory`
   - `achievements`

### Ver errores:
1. Abre DevTools (F12)
2. Ve a "Console" tab
3. Busca errores en rojo
4. Copia y comparte cualquier error

---

## ✅ Criterios de Éxito

### Mínimo Viable:
- [ ] 14 categorías visibles
- [ ] Quizzes cargan con 21 preguntas
- [ ] Opciones se mezclan aleatoriamente
- [ ] Datos se guardan en localStorage
- [ ] Analytics muestra estadísticas
- [ ] Al menos 1 achievement se desbloquea

### Ideal:
- [ ] Todos los emojis se ven correctamente
- [ ] Diseño se ve bien en móvil
- [ ] No hay errores en consola
- [ ] Todos los achievements funcionan
- [ ] Navegación es fluida
- [ ] Animaciones son suaves

---

## 📊 Reporte de Pruebas

### Formato:
```
Fecha: [YYYY-MM-DD]
Navegador: [Chrome/Firefox/Safari]
Versión: [XX.X]

✅ Funciona:
- [Lista de features que funcionan]

❌ No funciona:
- [Lista de bugs encontrados]

💡 Sugerencias:
- [Ideas de mejora]
```

---

## 🚀 Próximos Pasos

Después de probar:
1. Reporta cualquier bug encontrado
2. Sugiere mejoras de UX
3. Decide qué feature implementar siguiente
4. Considera agregar más quizzes

---

**Última Actualización**: 2025-11-25
**Versión**: 2.0.0
**Estado**: Listo para Pruebas
