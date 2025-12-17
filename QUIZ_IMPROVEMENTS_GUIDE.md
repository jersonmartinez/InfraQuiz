# 🔧 Implementación de Mejoras - Quiz.jsx

## Cambios Requeridos

### 1. Imports Adicionales
```jsx
import { getTopicEmoji } from './QuizSelection';
import { useQuizProgress } from '../hooks/useLocalStorage';
import { Save, Play, X } from 'lucide-react';
```

### 2. Estados Adicionales
```jsx
const { saveProgress, getProgress, clearProgress, hasProgress } = useQuizProgress();
const [showSaveDialog, setShowSaveDialog] = useState(false);
const [pausedTime, setPausedTime] = useState(0);
```

### 3. useEffect para Cargar Progreso Guardado
```jsx
useEffect(() => {
  const savedProgress = getProgress(topic);
  if (savedProgress && questions.length > 0) {
    // Preguntar si quiere continuar
    const shouldResume = window.confirm(
      `You have a saved progress for this quiz (${savedProgress.currentQuestion + 1}/${savedProgress.totalQuestions}). Do you want to continue?`
    );
    
    if (shouldResume) {
      setCurrentQuestionIndex(savedProgress.currentQuestion);
      setScore(savedProgress.score);
      setAnswers(savedProgress.answers);
      setPausedTime(savedProgress.pausedTime || 0);
    } else {
      clearProgress(topic);
    }
  }
}, [topic, questions]);
```

### 4. Función para Guardar Progreso
```jsx
const handleSaveProgress = () => {
  const progress = {
    currentQuestion: currentQuestionIndex,
    score,
    answers,
    totalQuestions: questions.length,
    pausedTime: pausedTime + (Date.now() - startTime),
  };
  
  saveProgress(topic, progress);
  setShowSaveDialog(false);
  alert('Progress saved! You can resume later.');
};
```

### 5. useEffect para Detectar Salida
```jsx
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (!showResults && currentQuestionIndex > 0) {
      e.preventDefault();
      e.returnValue = 'You have unsaved progress. Do you want to save before leaving?';
      return e.returnValue;
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [showResults, currentQuestionIndex]);
```

### 6. Botón de Guardar en UI
```jsx
{/* En el header, junto al timer */}
<div className="flex items-center gap-4">
  <Timer startTime={startTime} isActive={!showResults} />
  <button
    onClick={() => setShowSaveDialog(true)}
    className="flex items-center gap-2 px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
    title="Save progress"
  >
    <Save size={16} />
    Save
  </button>
  <span className="text-gray-400 text-sm">
    {currentQuestionIndex + 1} / {questions.length}
  </span>
</div>
```

### 7. Modal de Confirmación de Guardado
```jsx
{showSaveDialog && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="glass-panel p-6 rounded-2xl max-w-md mx-4">
      <h3 className="text-xl font-bold mb-4">Save Progress?</h3>
      <p className="text-gray-400 mb-6">
        Your current progress will be saved. You can resume this quiz later from where you left off.
      </p>
      <div className="flex gap-3">
        <button
          onClick={handleSaveProgress}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
        >
          <Save size={18} />
          Save & Exit
        </button>
        <button
          onClick={() => setShowSaveDialog(false)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
        >
          <X size={18} />
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
```

### 8. Emoji en Título con Fallback
```jsx
<span className="text-gray-400 font-medium uppercase tracking-wider text-sm flex items-center gap-2">
  <span className="text-xl">{getTopicEmoji(topic)}</span>
  {topic} Quiz
</span>
```

### 9. Emoji por Defecto en Preguntas
```jsx
const renderText = (text) => {
  if (!text) return '';
  
  // Replace broken emojis with default
  const cleanText = text.replace(/[\u{FFFD}\u{FE0F}]/gu, '📝');
  
  return cleanText.split(/(`[^`]+`)/).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      const code = part.slice(1, -1);
      return <code key={i} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">{code}</code>;
    }
    return <span key={i}>{part}</span>;
  });
};
```

### 10. Limpiar Progreso al Completar
```jsx
const handleNext = () => {
  if (currentQuestionIndex < questions.length - 1) {
    // ... código existente ...
  } else {
    // Al finalizar, limpiar progreso guardado
    clearProgress(topic);
    
    // ... resto del código ...
  }
};
```

## Resumen de Funcionalidades

### Guardado Automático
- ✅ Detecta cuando el usuario intenta salir
- ✅ Pregunta si quiere guardar el progreso
- ✅ Guarda: pregunta actual, score, respuestas, tiempo

### Reanudar
- ✅ Al entrar al quiz, detecta si hay progreso guardado
- ✅ Pregunta si quiere continuar desde donde dejó
- ✅ Restaura: pregunta, score, respuestas

### Botón Manual
- ✅ Botón "Save" en el header
- ✅ Modal de confirmación elegante
- ✅ Opción de cancelar

### Emojis
- ✅ Emoji en título del quiz
- ✅ Fallback para emojis rotos (📝)
- ✅ Limpieza de caracteres inválidos

## Implementación

Estos cambios deben agregarse al archivo `Quiz.jsx` existente sin reemplazar toda la funcionalidad actual.
