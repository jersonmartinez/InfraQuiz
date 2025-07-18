# 🐚 Bash Scripting - Cuestionario 1

## Preguntas

### 1. ❓ ¿Cuál es la forma correcta de verificar si un archivo existe en Bash? 🟢

A) 📝 `if [ -f "archivo.txt" ]; then`

B) 🔄 `if file "archivo.txt" exists; then`

C) 📦 `if exists "archivo.txt"; then`

D) 🎯 `if check "archivo.txt"; then`

**Respuesta correcta**: A) 📝 `if [ -f "archivo.txt" ]; then`

💡 El operador de prueba `-f` verifica si un archivo existe y es un archivo regular. Los corchetes `[ ]` son la sintaxis del comando test en Bash. ¡Simple pero esencial para operaciones con archivos! 🎯

### 2. 🧠 ¿Cómo asignas un valor a una variable en Bash? 🟢

A) 📝 `variable=valor` (sin espacios)

B) 🔄 `variable = valor` (con espacios)

C) 📦 `set variable=valor`

D) 🎯 `let variable=valor`

**Respuesta correcta**: A) 📝 `variable=valor` (sin espacios)

⚡ La asignación de variables en Bash NO requiere espacios alrededor del signo igual. Los espacios harían que Bash piense que estás ejecutando un comando llamado `variable` con argumentos. ¡Error clásico! 😅

### 3. 💭 ¿Qué representa `$?` en Bash? 🟢

A) 📝 Estado de salida del último comando

B) 🔄 ID del proceso actual

C) 📦 Número de argumentos pasados

D) 🎯 Directorio de trabajo actual

**Respuesta correcta**: A) 📝 Estado de salida del último comando

🔍 `$?` contiene el código de salida (0 para éxito, no-cero para fallo) del comando ejecutado más recientemente. ¡Esencial para manejo de errores y lógica condicional! 🎯

### 4. 🤔 ¿Cómo lees entrada del usuario en una variable? 🟡

A) 📝 `read nombre_variable`

B) 🔄 `input nombre_variable`

C) 📦 `get nombre_variable`

D) 🎯 `scanf nombre_variable`

**Respuesta correcta**: A) 📝 `read nombre_variable`

💡 El comando `read` espera la entrada del usuario y la almacena en la variable especificada. ¡También puedes usar `read -p "prompt" variable` para un prompt personalizado! 🎯

### 5. 🔧 ¿Cuál es la diferencia entre `$*` y `$@`? 🟡

A) 📝 `$*` es una cadena, `$@` preserva espacios

B) 🔄 No hay diferencia entre ellos

C) 📦 `$*` es para arrays, `$@` para cadenas

D) 🎯 `$@` está obsoleto, usa `$*`

**Respuesta correcta**: A) 📝 `$*` es una cadena, `$@` preserva espacios

⚡ `$*` trata todos los argumentos como una sola cadena, mientras que `$@` preserva argumentos individuales. ¡Usa `"$@"` para manejar correctamente argumentos con espacios!

### 6. 🎯 ¿Cómo creas un bucle for en Bash? 🟡

A) 📝 `for elemento in lista; do comandos; done`

B) 🔄 `for (elemento in lista) { comandos }`

C) 📦 `foreach elemento in lista: comandos`

D) 🎯 `for elemento of lista do comandos end`

**Respuesta correcta**: A) 📝 `for elemento in lista; do comandos; done`

🔄 El bucle `for` en Bash usa esta sintaxis específica. ¡Puedes iterar sobre archivos, números o cualquier lista de elementos!

### 7. 🚀 ¿Qué hace el shebang `#!/bin/bash`? 🟢

A) 📝 Indica al sistema qué intérprete usar

B) 🔄 Comenta la primera línea

C) 📦 Define la versión del script

D) 🎯 Establece los permisos del script

**Respuesta correcta**: A) 📝 Indica al sistema qué intérprete usar

💡 El shebang (`#!`) le dice al sistema que use `/bin/bash` para ejecutar el script. ¡Como decirle a alguien en qué idioma estás hablando!

### 8. 🔍 ¿Cómo verificas si una variable está vacía? 🟡

A) 📝 `if [ -z "$variable" ]; then`

B) 🔄 `if variable está vacía; then`

C) 📦 `if vacía($variable); then`

D) 🎯 `if !variable; then`

**Respuesta correcta**: A) 📝 `if [ -z "$variable" ]; then`

🎯 La prueba `-z` devuelve verdadero si la longitud de la cadena es cero. ¡Siempre pon tus variables entre comillas para manejar espacios correctamente!

### 9. 📦 ¿Cómo obtienes la longitud de una cadena? 🟡

A) 📝 `${#cadena}`

B) 🔄 `longitud(cadena)`

C) 📦 `cadena.longitud`

D) 🎯 `len($cadena)`

**Respuesta correcta**: A) 📝 `${#cadena}`

⚡ La sintaxis `${#variable}` devuelve la longitud del valor de la variable. ¡Simple y integrado en Bash!

### 10. 🔄 ¿Cómo creas un bucle while? 🟡

A) 📝 `while condición; do comandos; done`

B) 🔄 `while (condición) { comandos }`

C) 📦 `while condición: comandos`

D) 🎯 `while condición do comandos end`

**Respuesta correcta**: A) 📝 `while condición; do comandos; done`

📘 Los bucles while continúan mientras la condición sea verdadera. ¡Geniales para leer archivos línea por línea o esperar condiciones!

### 11. 🌟 ¿Cómo iteras a través de archivos? 🟡

A) 📝 `for archivo in *.txt; do echo $archivo; done`

B) 🔄 `loop archivos *.txt; echo archivo; end`

C) 📦 `for archivo = *.txt; echo $archivo; siguiente`

D) 🎯 `foreach archivo in *.txt; echo $archivo; end`

**Respuesta correcta**: A) 📝 `for archivo in *.txt; do echo $archivo; done`

🔄 El bucle `for` en Bash usa la sintaxis `for elemento in lista; do comandos; done`. ¡El globbing `*.txt` se expande automáticamente!

### 12. 🚀 ¿Cómo haces un script más seguro? 🔴

A) 📝 `set -euo pipefail` al principio

B) 🔄 `modo_seguro on`

C) 📦 `bash --safe script.sh`

D) 🎯 `#!/bin/bash --secure`

**Respuesta correcta**: A) 📝 `set -euo pipefail` al principio

🛡️ `set -e` sale en error, `set -u` sale en variable indefinida, `set -o pipefail` falla si cualquier comando en un pipe falla. ¡La triple protección!

### 13. 🔧 ¿Cómo generas números aleatorios? 🟡

A) 📝 `$RANDOM`

B) 🔄 `$(aleatorio)`

C) 📦 `rand()`

D) 🎯 `$RAND`

**Respuesta correcta**: A) 📝 `$RANDOM`

🎲 `$RANDOM` genera números entre 0-32767. Para otros rangos usa `$((RANDOM % max + min))`. ¡Para mejor calidad usa `/dev/random`!

### 14. 🎯 ¿Cómo ejecutas comandos en paralelo? 🔴

A) 📝 `comando1 & comando2 & wait`

B) 🔄 `parallel comando1 comando2`

C) 📦 `comando1 | comando2`

D) 🎯 `comando1 && comando2`

**Respuesta correcta**: A) 📝 `comando1 & comando2 & wait`

⚡ El `&` ejecuta en segundo plano, `wait` espera a que todos terminen. ¡Para casos complejos usa GNU `parallel`!

### 15. 🔍 ¿Cómo obtienes argumentos posicionales? 🟢

A) 📝 `$1, $2, $3...`

B) 🔄 `args[1], args[2], args[3]...`

C) 📦 `argv[1], argv[2], argv[3]...`

D) 🎯 `param1, param2, param3...`

**Respuesta correcta**: A) 📝 `$1, $2, $3...`

📋 `$1` es el primer argumento, `$2` el segundo, etc. `$0` es el nombre del script. ¡Para más de 9 usa `${10}`!

### 16. 🚀 ¿Cómo depuras scripts de Bash? 🔴

A) 📝 `bash -x script.sh` o `set -x`

B) 🔄 `debug script.sh`

C) 📦 `bash --debug script.sh`

D) 🎯 `trace script.sh`

**Respuesta correcta**: A) 📝 `bash -x script.sh` o `set -x`

🔍 La opción `-x` muestra cada comando antes de ejecutarlo. ¡Como tener un narrador para tu script!

### 17. 📦 ¿Cómo manejas opciones de línea de comandos? 🔴

A) 📝 `getopts` o análisis manual con `case`

B) 🔄 función `getopt()`

C) 📦 función `parse_args()`

D) 🎯 módulo `argparse`

**Respuesta correcta**: A) 📝 `getopts` o análisis manual con `case`

💡 `getopts` está integrado en Bash para análisis simple de opciones. ¡Para casos complejos, usa una declaración `case` o herramientas externas!

### 18. 🔧 ¿Cómo rediriges la salida? 🟢

A) 📝 `comando > archivo` (stdout), `comando 2> archivo` (stderr)

B) 🔄 `comando >> archivo` (solo stdout)

C) 📦 `redirect comando to archivo`

D) 🎯 `comando | archivo`

**Respuesta correcta**: A) 📝 `comando > archivo` (stdout), `comando 2> archivo` (stderr)

📘 `>` redirige stdout, `2>` redirige stderr, `&>` redirige ambos. ¡El `>>` añade en lugar de sobrescribir!

### 19. 🎯 ¿Cómo creas funciones? 🟡

A) 📝 `nombre_función() { comandos; }` o `function nombre_función { comandos; }`

B) 🔄 `def nombre_función(): comandos`

C) 📦 `function nombre_función(args) comandos end`

D) 🎯 `crear nombre_función { comandos }`

**Respuesta correcta**: A) 📝 `nombre_función() { comandos; }` o `function nombre_función { comandos; }`

⚡ ¡Ambas sintaxis funcionan! Las funciones ayudan a organizar código y hacerlo reutilizable. ¡Como tener tus propios comandos personalizados!

### 20. 🔧 ¿Cuál es la diferencia entre `source` y ejecutar un script? 🔴

A) 📝 `source` ejecuta en el shell actual, ejecutar crea subshell

B) 🔄 `source` es más rápido que ejecutar

C) 📦 `source` solo funciona con scripts `.sh`

D) 🎯 No hay diferencia

**Respuesta correcta**: A) 📝 `source` ejecuta en el shell actual, ejecutar crea subshell

⚡ `source script.sh` (o `. script.sh`) ejecuta en el contexto actual, los cambios de variables persisten. ¡Útil para scripts de configuración!

### 21. 🎯 ¿Cuál es la mejor práctica para scripts Bash robustos? 🔴

A) 📝 Usar `set -euo pipefail`, validar entradas, manejar errores, documentar

B) 🔄 Usar solo comandos básicos

C) 📦 Evitar funciones

D) 🎯 No usar variables

**Respuesta correcta**: A) 📝 Usar `set -euo pipefail`, validar entradas, manejar errores, documentar

🎯 Los scripts de producción necesitan: modo estricto, validación de entradas, manejo de errores, logging, limpieza con trap, y documentación clara. ¡La robustez es clave!