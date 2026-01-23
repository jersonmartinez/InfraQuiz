# 🐚 Bash Scripting - Cuestionario 2

## Preguntas

### 1. 🔧 ¿Qué hace `set -x` en Bash? 🟢

A) 📝 Habilita modo debug (muestra comandos antes de ejecución)

B) 🔄 Establece permisos de ejecución

C) 📦 Habilita características extendidas

D) 🎯 Establece salida en error

**Respuesta correcta**: A) 📝 Habilita modo debug (muestra comandos antes de ejecución)

💡 `set -x` imprime cada comando antes de ejecutarlo. ¡Perfecto para depurar scripts y entender el flujo de ejecución! 🐛

### 2. 🚀 ¿Cómo creas un array en Bash? 🟡

A) 📝 `array=(elemento1 elemento2 elemento3)`

B) 🔄 `array = [elemento1, elemento2, elemento3]`

C) 📦 `declare array[elemento1, elemento2, elemento3]`

D) 🎯 `array = {elemento1, elemento2, elemento3}`

**Respuesta correcta**: A) 📝 `array=(elemento1 elemento2 elemento3)`

⚡ Los arrays en Bash usan paréntesis y valores separados por espacios. ¡Accede con `${array[0]}`, `${array[1]}`, etc. Simple pero poderoso! 🎯

### 3. 🔍 ¿Qué hace `grep -v`? 🟡

A) 📝 Invierte la coincidencia (muestra líneas que NO coinciden)

B) 🔄 Muestra salida verbosa

C) 📦 Muestra información de versión

D) 🎯 Muestra coincidencias de variables

**Respuesta correcta**: A) 📝 Invierte la coincidencia (muestra líneas que NO coinciden)

🔍 `grep -v` es como un filtro "NO". ¡Perfecto para excluir patrones específicos de tus resultados de búsqueda! 🚫

### 4. 📦 ¿Cómo verificas si un directorio existe? 🟢

A) 📝 `if [ -d "nombre_dir" ]; then`

B) 🔄 `if directory "nombre_dir" exists; then`

C) 📦 `if exists "nombre_dir"; then`

D) 🎯 `if check "nombre_dir"; then`

**Respuesta correcta**: A) 📝 `if [ -d "nombre_dir" ]; then`

💡 El operador de prueba `-d` verifica si un directorio existe. ¡Similar a `-f` para archivos, pero para directorios! 📁

### 5. 🔄 ¿Qué hace `trap` en Bash? 🔴

A) 📝 Configura manejadores de señales para operaciones de limpieza

B) 🔄 Atrapa errores en scripts

C) 📦 Atrapa entrada del usuario

D) 🎯 Atrapa llamadas del sistema

**Respuesta correcta**: A) 📝 Configura manejadores de señales para operaciones de limpieza

🛡️ `trap` captura señales como SIGINT (Ctrl+C) y ejecuta código de limpieza. ¡Esencial para scripts robustos que necesitan limpiar después de sí mismos! 🧹

### 6. 🌟 ¿Cómo obtienes el último código de salida? 🟢

A) 📝 `$?`

B) 🔄 `$EXIT_CODE`

C) 📦 `$LAST_EXIT`

D) 🎯 `$STATUS`

**Respuesta correcta**: A) 📝 `$?`

⚡ `$?` siempre contiene el estado de salida del comando ejecutado más recientemente. ¡0 = éxito, no-cero = fallo! 🎯

### 7. 🔧 ¿Qué hace `exec`? 🔴

A) 📝 Reemplaza el shell actual con un nuevo comando

B) 🔄 Ejecuta comando en segundo plano

C) 📦 Ejecuta comando con privilegios elevados

D) 🎯 Ejecuta comando en subshell

**Respuesta correcta**: A) 📝 Reemplaza el shell actual con un nuevo comando

🚀 `exec` reemplaza el proceso actual. ¡Útil para scripts que terminan con un comando específico - no hay necesidad de volver al shell! ⚡

### 8. 📋 ¿Cómo obtienes el número de argumentos? 🟢

A) 📝 `$#`

B) 🔄 `$ARGS_COUNT`

C) 📦 `$ARGUMENTS`

D) 🎯 `$COUNT`

**Respuesta correcta**: A) 📝 `$#`

🔢 `$#` te da el conteo de argumentos posicionales. ¡Perfecto para validación: `if [ $# -eq 2 ]; then` verifica exactamente 2 argumentos! ✅

### 9. 🔄 ¿Qué hace `wait`? 🟡

A) 📝 Espera a que todos los procesos en segundo plano se completen

B) 🔄 Espera entrada del usuario

C) 📦 Espera un tiempo específico

D) 🎯 Espera respuesta de red

**Respuesta correcta**: A) 📝 Espera a que todos los procesos en segundo plano se completen

⏳ `wait` asegura que todos los trabajos en segundo plano (`&`) terminen antes de continuar. ¡Esencial para scripts de procesamiento paralelo! 🚀

### 10. 🎯 ¿Cómo creas una declaración case? 🟡

A) 📝 `case $variable in patron1) comandos;; patron2) comandos;; esac`

B) 🔄 `switch $variable { case patron1: comandos; case patron2: comandos; }`

C) 📦 `if $variable matches patron1: comandos; elif patron2: comandos; fi`

D) 🎯 `select $variable from patron1, patron2 do comandos done`

**Respuesta correcta**: A) 📝 `case $variable in patron1) comandos;; patron2) comandos;; esac`

💡 Las declaraciones case son perfectas para verificaciones de múltiples condiciones. ¡Cada patrón termina con `;;` y todo termina con `esac`! 🎯

### 11. 🔍 ¿Qué hace `basename`? 🟡

A) 📝 Extrae nombre de archivo sin ruta

B) 🔄 Muestra directorio base

C) 📦 Muestra permisos de archivo

D) 🎯 Muestra propietario de archivo

**Respuesta correcta**: A) 📝 Extrae nombre de archivo sin ruta

📁 `basename /ruta/al/archivo.txt` devuelve `archivo.txt`. ¡Perfecto para obtener solo el nombre del archivo de una ruta completa! ✂️

### 12. 🚀 ¿Cómo haces un script ejecutable? 🟢

A) 📝 `chmod +x script.sh`

B) 🔄 `chmod 755 script.sh`

C) 📦 `chmod execute script.sh`

D) 🎯 `chmod run script.sh`

**Respuesta correcta**: A) 📝 `chmod +x script.sh`

⚡ `chmod +x` añade permiso de ejecución. ¡También puedes usar `chmod 755` para permisos más específicos (rwxr-xr-x)! 🔐

### 13. 🔧 ¿Qué hace `shift`? 🟡

A) 📝 Remueve primer argumento y desplaza otros a la izquierda

B) 🔄 Desplaza texto a la izquierda

C) 📦 Desplaza elementos del array

D) 🎯 Desplaza posición del cursor

**Respuesta correcta**: A) 📝 Remueve primer argumento y desplaza otros a la izquierda

🔄 `shift` remueve `$1` y hace que `$2` se convierta en `$1`, `$3` se convierta en `$2`, etc. ¡Genial para procesar argumentos en bucles! 📋

### 14. 🌟 ¿Cómo obtienes el nombre del script? 🟢

A) 📝 `$0`

B) 🔄 `$SCRIPT_NAME`

C) 📦 `$NAME`

D) 🎯 `$SCRIPT`

**Respuesta correcta**: A) 📝 `$0`

📝 `$0` contiene el nombre del script como fue llamado. ¡Útil para mensajes de uso y auto-referenciación! 🎯

### 15. 🔄 ¿Qué hace `local` en funciones? 🟡

A) 📝 Declara una variable local a la función

B) 🔄 Hace variable global

C) 📦 Importa variables locales

D) 🎯 Exporta variables locales

**Respuesta correcta**: A) 📝 Declara una variable local a la función

🏠 `local` mantiene variables dentro del alcance de la función. ¡Previene conflictos con variables globales del mismo nombre! 🛡️

### 16. 📦 ¿Cómo verificas si una cadena contiene una subcadena? 🟡

A) 📝 `if [[ "$cadena" == *"subcadena"* ]]; then`

B) 🔄 `if contains "$cadena" "subcadena"; then`

C) 📦 `if cadena has "subcadena"; then`

D) 🎯 `if match "$cadena" "subcadena"; then`

**Respuesta correcta**: A) 📝 `if [[ "$cadena" == *"subcadena"* ]]; then`

🔍 Los comodines `*` coinciden con cualquier cosa antes/después. ¡`[[ ]]` es la sintaxis de prueba moderna con mejor manejo de cadenas! ✨

### 17. 🚀 ¿Qué hace `nohup`? 🔴

A) 📝 Ejecuta comando inmune a señal de colgar

B) 🔄 Ejecuta comando en segundo plano

C) 📦 Ejecuta comando sin salida

D) 🎯 Ejecuta comando sin interacción del usuario

**Respuesta correcta**: A) 📝 Ejecuta comando inmune a señal de colgar

🛡️ `nohup` previene que el comando sea matado cuando cierras sesión. ¡Perfecto para procesos de larga duración! ⏰

### 18. 🔧 ¿Cómo rediriges tanto stdout como stderr? 🟡

A) 📝 `comando &> archivo` o `comando > archivo 2>&1`

B) 🔄 `comando >> archivo`

C) 📦 `comando redirect all archivo`

D) 🎯 `comando | archivo`

**Respuesta correcta**: A) 📝 `comando &> archivo` o `comando > archivo 2>&1`

📤 `&>` redirige ambos flujos al mismo archivo. ¡`2>&1` redirige stderr a donde quiera que vaya stdout! 🎯

### 19. 🌟 ¿Qué hace `declare`? 🟡

A) 📝 Declara variables con atributos específicos

B) 🔄 Declara funciones

C) 📦 Declara arrays

D) 🎯 Declara constantes

**Respuesta correcta**: A) 📝 Declara variables con atributos específicos

💡 `declare -i` hace entero, `declare -r` hace solo lectura, `declare -a` hace array. ¡Te da control sobre el comportamiento de las variables! 🎛️

### 20. 🔄 ¿Cómo creas un documento here? 🟡

A) 📝 `cat << EOF\ncontenido\nEOF`

B) 🔄 `here << contenido >>`

C) 📦 `document << contenido >>`

D) 🎯 `text << contenido >>`

**Respuesta correcta**: A) 📝 `cat << EOF\ncontenido\nEOF`

📄 Los documentos here te permiten incrustar texto multi-línea en scripts. ¡Geniales para generar archivos de configuración o salida de texto largo! 📝

### 21. 🎯 ¿Cuál es la mejor práctica para manejo de errores en Bash? 🔴

A) 📝 Usar `set -euo pipefail`, atrapar señales, validar entradas, registrar errores

B) 🔄 Usar solo verificación básica de errores

C) 📦 Ignorar errores y continuar

D) 🎯 Usar bloques try-catch

**Respuesta correcta**: A) 📝 Usar `set -euo pipefail`, atrapar señales, validar entradas, registrar errores

🛡️ Los scripts de producción necesitan: modo estricto, atrapar señales, validación de entradas, registro comprehensivo, y manejo elegante de errores. ¡La robustez es clave! 🚀
