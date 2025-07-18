# 🐚 Bash Scripting - Cuestionario 1

## Preguntas

### 1. ❓ ¿Cuál es la forma correcta de verificar si un archivo existe en Bash? 🟢

A) 📝 `if [ -f "archivo.txt" ]; then`

B) 🔄 `if file "archivo.txt" exists; then`

C) 📦 `if exists "archivo.txt"; then`

D) 🎯 `if check "archivo.txt"; then`

**Respuesta correcta**: A) 📝 `if [ -f "archivo.txt" ]; then`

> 💡 El operador `-f` verifica si existe un archivo regular. Los corchetes `[ ]` son la sintaxis del comando test en Bash. ¡Simple pero esencial para operaciones con archivos! 🎯

### 2. 🧠 ¿Cómo se asigna un valor a una variable en Bash? 🟢

A) 📝 `variable=valor` (sin espacios)

B) 🔄 `variable = valor` (con espacios)

C) 📦 `set variable=valor`

D) 🎯 `let variable=valor`

**Respuesta correcta**: A) 📝 `variable=valor` (sin espacios)

> ⚡ La asignación en Bash NO permite espacios alrededor del igual. Con espacios, Bash pensaría que ejecutas un comando llamado `variable`. ¡Error clásico de principiantes! 😅

### 3. 💭 ¿Qué representa `$?` en Bash? 🟢

A) 📝 Estado de salida del último comando

B) 🔄 ID del proceso actual

C) 📦 Número de argumentos pasados

D) 🎯 Directorio de trabajo actual

**Respuesta correcta**: A) 📝 Estado de salida del último comando

> 🔍 `$?` contiene el código de salida (0 para éxito, no-cero para error) del comando más reciente. ¡Esencial para manejo de errores y lógica condicional! 🎯

### 4. 🤔 ¿Cómo se lee entrada del usuario en una variable? 🟡

A) 📝 `read nombre_variable`

B) 🔄 `input nombre_variable`

C) 📦 `get nombre_variable`

D) 🎯 `scanf nombre_variable`

**Respuesta correcta**: A) 📝 `read nombre_variable`

> 💡 El comando `read` espera entrada del usuario y la almacena en la variable especificada. También puedes usar `read -p "prompt" variable` para un mensaje personalizado! 🎯

### 5. 🔧 ¿Cuál es la diferencia entre `$*` y `$@`? 🟡

A) 📝 `$*` es una cadena, `$@` preserva espacios

B) 🔄 `$*` es más rápido, `$@` es más lento

C) 📦 `$*` incluye el nombre del script, `$@` no

D) 🎯 No hay diferencia

**Respuesta correcta**: A) 📝 `$*` es una cadena, `$@` preserva espacios

> ⚡ `$*` une todos los argumentos en una cadena, `$@` los mantiene como argumentos separados. ¡Crucial para scripts que procesan múltiples argumentos!

### 6. 🎯 ¿Cómo redirigir tanto stdout como stderr a un archivo? 🟡

A) 📝 `comando > archivo 2>&1`

B) 🔄 `comando >> archivo 2>> archivo`

C) 📦 `comando &> archivo`

D) 🎯 `comando > archivo 2> archivo`

**Respuesta correcta**: A) 📝 `comando > archivo 2>&1`

> 🔄 `2>&1` redirige stderr (2) al mismo lugar que stdout (1). ¡También puedes usar `&>` como atajo en Bash moderno!

### 7. 🚀 ¿Cómo crear una función en Bash? 🟡

A) 📝 `function nombre() { comandos; }`

B) 🔄 `def nombre() { comandos; }`

C) 📦 `function nombre { comandos; }`

D) 🎯 `nombre() => { comandos; }`

**Respuesta correcta**: A) 📝 `function nombre() { comandos; }`

> 💡 Las funciones en Bash pueden definirse con `function nombre()` o simplemente `nombre()`. ¡Útil para código reutilizable!

### 8. 🔍 ¿Cómo verificar si una variable está vacía? 🟡

A) 📝 `if [ -z "$variable" ]; then`

B) 🔄 `if [ $variable == "" ]; then`

C) 📦 `if [ empty "$variable" ]; then`

D) 🎯 `if [ null "$variable" ]; then`

**Respuesta correcta**: A) 📝 `if [ -z "$variable" ]; then`

> 🔍 `-z` verifica si la variable está vacía (zero length). `-n` verifica lo contrario (not zero length). ¡Siempre usa comillas!

### 9. 🎯 ¿Cómo obtener la longitud de una cadena? 🟡

A) 📝 `${#cadena}`

B) 🔄 `length($cadena)`

C) 📦 `$cadena.length`

D) 🎯 `len($cadena)`

**Respuesta correcta**: A) 📝 `${#cadena}`

> ⚡ La sintaxis `${#variable}` devuelve la longitud de la cadena. ¡Útil para validaciones y loops!

### 10. 🔄 ¿Cómo crear un loop for sobre archivos? 🟡

A) 📝 `for archivo in *.txt; do echo $archivo; done`

B) 🔄 `for (archivo in *.txt) { echo $archivo }`

C) 📦 `for archivo = *.txt; echo $archivo; next`

D) 🎯 `foreach archivo in *.txt; echo $archivo; end`

**Respuesta correcta**: A) 📝 `for archivo in *.txt; do echo $archivo; done`

> 🔄 El loop `for` en Bash usa la sintaxis `for item in lista; do comandos; done`. ¡El globbing `*.txt` se expande automáticamente!

### 11. 🚀 ¿Cómo hacer un script más seguro? 🔴

A) 📝 `set -euo pipefail` al inicio

B) 🔄 `secure_mode on`

C) 📦 `bash --safe script.sh`

D) 🎯 `#!/bin/bash --secure`

**Respuesta correcta**: A) 📝 `set -euo pipefail` al inicio

> 🛡️ `set -e` sale en error, `set -u` sale en variable no definida, `set -o pipefail` falla si cualquier comando en pipe falla. ¡La triple protección!

### 12. 🔧 ¿Cómo generar números aleatorios? 🟡

A) 📝 `$RANDOM`

B) 🔄 `$(random)`

C) 📦 `rand()`

D) 🎯 `$RAND`

**Respuesta correcta**: A) 📝 `$RANDOM`

> 🎲 `$RANDOM` genera números entre 0-32767. Para otros rangos usa `$((RANDOM % max + min))`. ¡Para mayor calidad usa `/dev/random`!

### 13. 🎯 ¿Cómo ejecutar comandos en paralelo? 🔴

A) 📝 `comando1 & comando2 & wait`

B) 🔄 `parallel comando1 comando2`

C) 📦 `comando1 | comando2`

D) 🎯 `comando1 && comando2`

**Respuesta correcta**: A) 📝 `comando1 & comando2 & wait`

> ⚡ El `&` ejecuta en background, `wait` espera a que terminen todos. ¡Para casos complejos usa GNU `parallel`!

### 14. 🔍 ¿Cómo obtener argumentos posicionales? 🟢

A) 📝 `$1, $2, $3...`

B) 🔄 `args[1], args[2], args[3]...`

C) 📦 `argv[1], argv[2], argv[3]...`

D) 🎯 `param1, param2, param3...`

**Respuesta correcta**: A) 📝 `$1, $2, $3...`

> 📋 `$1` es el primer argumento, `$2` el segundo, etc. `$0` es el nombre del script. ¡Para más de 9 usa `${10}`!

### 15. 🚀 ¿Cómo hacer debugging en Bash? 🔴

A) 📝 `bash -x script.sh` o `set -x`

B) 🔄 `debug script.sh`

C) 📦 `bash --debug script.sh`

D) 🎯 `trace script.sh`

**Respuesta correcta**: A) 📝 `bash -x script.sh` o `set -x`

> 🐛 La opción `-x` muestra cada comando antes de ejecutarlo. ¡Perfecto para encontrar dónde falla tu script!

### 16. 🔧 ¿Cómo trabajar con arrays? 🔴

A) 📝 `array=(item1 item2 item3); echo ${array[0]}`

B) 🔄 `array[0]=item1; array[1]=item2; echo $array[0]`

C) 📦 `declare array=(item1 item2 item3); echo array[0]`

D) 🎯 `set array item1 item2 item3; echo $array[0]`

**Respuesta correcta**: A) 📝 `array=(item1 item2 item3); echo ${array[0]}`

> 📚 Los arrays en Bash usan sintaxis especial: `array=(...)` para crear, `${array[index]}` para acceder. ¡Nota las llaves!

### 17. 🎯 ¿Cómo hacer sustitución de cadenas? 🔴

A) 📝 `${variable/old/new}` para primera, `${variable//old/new}` para todas

B) 🔄 `$variable.replace(old, new)`

C) 📦 `replace($variable, old, new)`

D) 🎯 `substitute $variable old new`

**Respuesta correcta**: A) 📝 `${variable/old/new}` para primera, `${variable//old/new}` para todas

> 🔄 La expansión de parámetros permite manipular cadenas sin comandos externos. ¡Más rápido que `sed` para casos simples!

### 18. 🚀 ¿Cómo manejar señales en scripts? 🔴

A) 📝 `trap 'cleanup' EXIT INT TERM`

B) 🔄 `signal_handler EXIT INT TERM`

C) 📦 `on_signal cleanup EXIT INT TERM`

D) 🎯 `catch EXIT INT TERM cleanup`

**Respuesta correcta**: A) 📝 `trap 'cleanup' EXIT INT TERM`

> 🎯 `trap` permite capturar señales y ejecutar código de limpieza. ¡Esencial para scripts robustos que manejan recursos!

### 19. 🔍 ¿Cómo trabajar con archivos temporales seguramente? 🔴

A) 📝 `mktemp` para crear archivos temporales únicos

B) 🔄 `touch /tmp/temp$$`

C) 📦 `tempfile=$(date +%s)`

D) 🎯 `temp=/tmp/temp.txt`

**Respuesta correcta**: A) 📝 `mktemp` para crear archivos temporales únicos

> 🔐 `mktemp` crea archivos con nombres únicos y permisos seguros. ¡Evita condiciones de carrera y conflictos de nombres!

### 20. 🔧 ¿Cuál es la diferencia entre `source` y ejecutar un script? 🔴

A) 📝 `source` ejecuta en el shell actual, ejecutar crea subshell

B) 🔄 `source` es más rápido que ejecutar

C) 📦 `source` solo funciona con scripts .sh

D) 🎯 No hay diferencia

**Respuesta correcta**: A) 📝 `source` ejecuta en el shell actual, ejecutar crea subshell

> ⚡ `source script.sh` (o `. script.sh`) ejecuta en el contexto actual, los cambios de variables persisten. ¡Útil para scripts de configuración!

### 21. 🎯 ¿Cuál es la mejor práctica para scripts Bash robustos? 🔴

A) 📝 Usar `set -euo pipefail`, validar entradas, manejar errores, documentar

B) 🔄 Usar solo comandos básicos

C) 📦 Evitar funciones

D) 🎯 No usar variables

**Respuesta correcta**: A) 📝 Usar `set -euo pipefail`, validar entradas, manejar errores, documentar

> 🎯 Scripts de producción necesitan: modo estricto, validación de entrada, manejo de errores, logging, cleanup con trap, y documentación clara. ¡La robustez es clave!