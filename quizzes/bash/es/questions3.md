# 🐚 Bash Scripting - Cuestionario 3

## Preguntas

### 1. 🔧 ¿Qué hace `set -u` en Bash? 🟢

A) 📝 Sale en uso de variable indefinida

B) 🔄 Establece permisos de usuario

C) 📦 Establece variables ilimitadas

D) 🎯 Establece modo usuario

**Respuesta correcta**: A) 📝 Sale en uso de variable indefinida

💡 `set -u` hace que Bash salga cuando se usa una variable indefinida. ¡Perfecto para detectar errores tipográficos y variables faltantes temprano! 🚨

### 2. 🚀 ¿Cómo creas una tubería con nombre (FIFO)? 🟡

A) 📝 `mkfifo nombre_tuberia`

B) 🔄 `mknod nombre_tuberia p`

C) 📦 `create pipe nombre_tuberia`

D) 🎯 `pipe create nombre_tuberia`

**Respuesta correcta**: A) 📝 `mkfifo nombre_tuberia`

⚡ Las tuberías con nombre permiten que los procesos se comuniquen. ¡Usa `mkfifo` para crearlas, luego lee/escribe como archivos regulares! 🔄

### 3. 🔍 ¿Qué hace `sed -i`? 🟡

A) 📝 Edita archivos in-place (modifica archivo original)

B) 🔄 Muestra modo interactivo

C) 📦 Muestra archivos de entrada

D) 🎯 Muestra información

**Respuesta correcta**: A) 📝 Edita archivos in-place (modifica archivo original)

🔧 `sed -i` modifica archivos directamente en lugar de imprimir a stdout. ¡Genial para edición por lotes, pero ten cuidado - cambia el original! ⚠️

### 4. 📦 ¿Cómo verificas si un archivo es ejecutable? 🟢

A) 📝 `if [ -x "archivo.sh" ]; then`

B) 🔄 `if executable "archivo.sh"; then`

C) 📦 `if can_execute "archivo.sh"; then`

D) 🎯 `if runnable "archivo.sh"; then`

**Respuesta correcta**: A) 📝 `if [ -x "archivo.sh" ]; then`

💡 El operador de prueba `-x` verifica si un archivo tiene permisos de ejecución. ¡Esencial para verificar si los scripts pueden ejecutarse! 🚀

### 5. 🔄 ¿Qué hace `cron`? 🔴

A) 📝 Programa comandos para ejecutarse en momentos específicos

B) 🔄 Ejecuta comandos en segundo plano

C) 📦 Ejecuta comandos con privilegios elevados

D) 🎯 Ejecuta comandos en secuencia

**Respuesta correcta**: A) 📝 Programa comandos para ejecutarse en momentos específicos

⏰ Cron es el programador de trabajos basado en tiempo. ¡Usa `crontab -e` para editar tus trabajos cron y automatizar tareas repetitivas! 🤖

### 6. 🌟 ¿Cómo obtienes el ID del proceso del shell actual? 🟢

A) 📝 `$$`

B) 🔄 `$PID`

C) 📦 `$PROCESS_ID`

D) 🎯 `$SHELL_PID`

**Respuesta correcta**: A) 📝 `$$`

⚡ `$$` contiene el ID del proceso del shell actual. ¡Útil para crear archivos temporales únicos o identificación de procesos! 🆔

### 7. 🔧 ¿Qué hace `ulimit`? 🔴

A) 📝 Establece límites de recursos para el shell actual

B) 🔄 Establece límites de usuario

C) 📦 Establece recursos ilimitados

D) 🎯 Establece permisos de usuario

**Respuesta correcta**: A) 📝 Establece límites de recursos para el shell actual

🛡️ `ulimit` controla límites de recursos como tamaño de archivo, memoria y conteo de procesos. ¡Esencial para prevenir procesos descontrolados! 🚫

### 8. 📋 ¿Cómo obtienes todos los argumentos como una sola cadena? 🟢

A) 📝 `"$*"`

B) 🔄 `$@`

C) 📦 `$ARGS`

D) 🎯 `$ALL`

**Respuesta correcta**: A) 📝 `"$*"`

🔍 `"$*"` une todos los argumentos en una cadena con espacios. `"$@"` los mantiene separados. ¡Elige según tus necesidades! 🎯

### 9. 🔄 ¿Qué hace `timeout`? 🟡

A) 📝 Ejecuta comando con límite de tiempo

B) 🔄 Establece timeout del sistema

C) 📦 Muestra información de tiempo

D) 🎯 Establece timeout del usuario

**Respuesta correcta**: A) 📝 Ejecuta comando con límite de tiempo

⏱️ `timeout 30s comando` mata el comando después de 30 segundos. ¡Perfecto para prevenir procesos colgados! 🚫

### 10. 🎯 ¿Cómo creas un menú select? 🟡

A) 📝 `select elemento in lista; do comandos; done`

B) 🔄 `menu select elemento from lista; do comandos; end`

C) 📦 `choose elemento in lista: comandos`

D) 🎯 `pick elemento from lista do comandos done`

**Respuesta correcta**: A) 📝 `select elemento in lista; do comandos; done`

💡 ¡Select crea menús interactivos! Los usuarios eligen de opciones numeradas, y manejas su elección en el bucle! 🎮

### 11. 🔍 ¿Qué hace `awk`? 🟡

A) 📝 Procesa archivos de texto línea por línea con coincidencia de patrones

B) 🔄 Muestra tiempos de acceso de archivos

C) 📦 Muestra permisos de archivos

D) 🎯 Muestra propietarios de archivos

**Respuesta correcta**: A) 📝 Procesa archivos de texto línea por línea con coincidencia de patrones

🔧 Awk es un poderoso procesador de texto. ¡Úsalo para extracción de datos, reportes y manipulación de texto! 📊

### 12. 🚀 ¿Cómo verificas si un archivo es un enlace simbólico? 🟢

A) 📝 `if [ -L "enlace" ]; then`

B) 🔄 `if symbolic "enlace"; then`

C) 📦 `if is_link "enlace"; then`

D) 🎯 `if link_exists "enlace"; then`

**Respuesta correcta**: A) 📝 `if [ -L "enlace" ]; then`

💡 El operador de prueba `-L` verifica si un archivo es un enlace simbólico. ¡Útil para determinar tipos de archivo! 🔗

### 13. 🔧 ¿Qué hace `jobs`? 🟡

A) 📝 Lista trabajos en segundo plano en el shell actual

B) 🔄 Muestra trabajos del sistema

C) 📦 Muestra trabajos del usuario

D) 🎯 Muestra todos los trabajos

**Respuesta correcta**: A) 📝 Lista trabajos en segundo plano en el shell actual

📋 `jobs` muestra procesos en segundo plano iniciados con `&`. ¡Usa `fg` para traerlos al primer plano o `bg` para continuar en segundo plano! 🔄

### 14. 🌟 ¿Cómo obtienes el directorio de trabajo actual? 🟢

A) 📝 `$PWD`

B) 🔄 `$CWD`

C) 📦 `$WORKING_DIR`

D) 🎯 `$DIR`

**Respuesta correcta**: A) 📝 `$PWD`

📁 `$PWD` contiene el directorio de trabajo actual. ¡También disponible como el comando `pwd`! 🎯

### 15. 🔄 ¿Qué hace `trap -`? 🟡

A) 📝 Remueve todas las trampas de señales

B) 🔄 Muestra información de trampa

C) 📦 Establece trampas por defecto

D) 🎯 Muestra estado de trampa

**Respuesta correcta**: A) 📝 Remueve todas las trampas de señales

🔄 `trap -` remueve todos los manejadores de señales. ¡Útil para limpiar trampas o restablecer comportamiento por defecto! 🧹

### 16. 📦 ¿Cómo verificas si un archivo está vacío? 🟢

A) 📝 `if [ ! -s "archivo.txt" ]; then`

B) 🔄 `if empty "archivo.txt"; then`

C) 📦 `if file_empty "archivo.txt"; then`

D) 🎯 `if is_empty "archivo.txt"; then`

**Respuesta correcta**: A) 📝 `if [ ! -s "archivo.txt" ]; then`

💡 `-s` verifica si el archivo tiene tamaño > 0. `! -s` significa "no tamaño > 0" = archivo vacío! 📄

### 17. 🚀 ¿Qué hace `screen`? 🔴

A) 📝 Crea sesiones de terminal persistentes

B) 🔄 Muestra información de pantalla

C) 📦 Establece resolución de pantalla

D) 🎯 Establece modo de pantalla

**Respuesta correcta**: A) 📝 Crea sesiones de terminal persistentes

🖥️ Screen crea sesiones de terminal persistentes que sobreviven a las desconexiones. ¡Perfecto para procesos de larga duración! 💻

### 18. 🔧 ¿Cómo rediriges stderr a stdout? 🟡

A) 📝 `comando 2>&1`

B) 🔄 `comando error>output`

C) 📦 `comando redirect error`

D) 🎯 `comando stderr>stdout`

**Respuesta correcta**: A) 📝 `comando 2>&1`

📤 `2>&1` redirige stderr (descriptor de archivo 2) a donde quiera que vaya stdout (descriptor de archivo 1)! 🎯

### 19. 🌟 ¿Qué hace `declare -r`? 🟡

A) 📝 Hace variable de solo lectura (no se puede cambiar)

B) 🔄 Hace variable global

C) 📦 Hace variable local

D) 🎯 Hace variable exportable

**Respuesta correcta**: A) 📝 Hace variable de solo lectura (no se puede cambiar)

🔒 `declare -r` crea variables de solo lectura. ¡Una vez establecidas, no se pueden modificar - perfecto para constantes! 🛡️

### 20. 🔄 ¿Cómo creas una función con parámetros? 🟡

A) 📝 `nombre_funcion() { echo "Primero: $1, Segundo: $2"; }`

B) 🔄 `function nombre_funcion(param1, param2) { echo param1, param2; }`

C) 📦 `def nombre_funcion: echo param1, param2`

D) 🎯 `create nombre_funcion { echo param1, param2 }`

**Respuesta correcta**: A) 📝 `nombre_funcion() { echo "Primero: $1, Segundo: $2"; }`

💡 ¡Las funciones usan parámetros posicionales igual que los scripts! `$1`, `$2`, etc. se refieren a los argumentos pasados a la función! 🎯

### 21. 🎯 ¿Cuál es la mejor práctica para logging en scripts Bash? 🔴

A) 📝 Usar timestamps, niveles de log, formato estructurado y rotación de logs

B) 🔄 Usar solo declaraciones echo

C) 📦 No registrar nada

D) 🎯 Usar solo printf

**Respuesta correcta**: A) 📝 Usar timestamps, niveles de log, formato estructurado y rotación de logs

📝 Los scripts de producción necesitan: timestamps, niveles de log (INFO/WARN/ERROR), formato estructurado, rotación de logs, y registro adecuado de errores. ¡La visibilidad es clave! 🔍
