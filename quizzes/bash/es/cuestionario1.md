# 🐚 Bash Scripting - Cuestionario 1

## Preguntas

### ❓ ¿Cuál es la forma correcta de verificar si un archivo existe en Bash? 🟢

📝 `if [ -f "archivo.txt" ]; then`

🔄 `if file "archivo.txt" exists; then`

📦 `if exists "archivo.txt"; then`

🎯 `if check "archivo.txt"; then`

**Respuesta Correcta:**
📝 `if [ -f "archivo.txt" ]; then`

**Explicación:**
💡 El operador `-f` verifica si existe un archivo regular. Los corchetes `[ ]` son la sintaxis del comando test en Bash. ¡Simple pero esencial para operaciones con archivos! 🎯

---

### 🧠 ¿Cómo se asigna un valor a una variable en Bash? 🟢

📝 `variable=valor` (sin espacios)

🔄 `variable = valor` (con espacios)

📦 `set variable=valor`

🎯 `let variable=valor`

**Respuesta Correcta:**
📝 `variable=valor` (sin espacios)

**Explicación:**
⚡ La asignación en Bash NO permite espacios alrededor del igual. Con espacios, Bash pensaría que ejecutas un comando llamado `variable`. ¡Error clásico de principiantes! 😅

---

### 💭 ¿Qué representa `$?` en Bash? 🟢

📝 Estado de salida del último comando

🔄 ID del proceso actual

📦 Número de argumentos pasados

🎯 Directorio de trabajo actual

**Respuesta Correcta:**
📝 Estado de salida del último comando

**Explicación:**
🔍 `$?` contiene el código de salida (0 para éxito, no-cero para error) del comando más reciente. ¡Esencial para manejo de errores y lógica condicional! 🎯

---

### 🤔 ¿Cómo se lee entrada del usuario en una variable? 🟡

📝 `read nombre_variable`

🔄 `input nombre_variable`

📦 `get nombre_variable`

🎯 `scanf nombre_variable`

**Respuesta Correcta:**
📝 `read nombre_variable`

**Explicación:**
💡 El comando `read` espera entrada del usuario y la almacena en la variable especificada. También puedes usar `read -p "prompt" variable` para un mensaje personalizado! 🎯

---

### 🔧 ¿Cuál es la diferencia entre `$*` y `$@`? 🟡

📝 `$*` es una cadena, `$@` preserva espacios

🔄 `$*` es más rápido, `$@` más lento

📦 `$*` funciona en loops, `$@` no

🎯 No hay diferencia, solo sintaxis

**Respuesta Correcta:**
📝 `$*` es una cadena, `$@` preserva espacios

**Explicación:**
🩺 `$*` trata todos los argumentos como una sola cadena, mientras `$@` preserva argumentos individuales con sus espacios originales. ¡Crítico para manejar argumentos con espacios! 🎯

---

### ⚙️ ¿Cómo se hace ejecutable un script? 🟡

📝 `chmod +x script.sh`

🔄 `chmod 755 script.sh`

📦 `make script.sh executable`

🎯 `exec script.sh`

**Respuesta Correcta:**
�  `chmod +x script.sh`

**Explicación:**
🔧 `chmod +x` añade permisos de ejecución al archivo. `chmod 755` también funciona (rwx para dueño, rx para grupo/otros) pero `+x` es más explícito sobre lo que quieres! 🎯

---

### � ¿ Cuál es la mejor práctica para manejar errores en Bash? 🔴

📝 `set -euo pipefail` al inicio

🔄 `trap 'exit 1' ERR`

� `if [ $? -ne 0 ]; then exit 1; fi`

🎯 `set -e` solamente

**Respuesta Correcta:**
📝 `set -euo pipefail` al inicio

**Explicación:**
🩺 `set -euo pipefail` es el estándar dorado: `-e` sale en error, `-u` falla en variables indefinidas, `-o pipefail` falla si algún comando en un pipe falla. ¡Manejo de errores listo para producción! 🎯

---

### 🚀 ¿Cómo se crea una función que retorna un valor? 🔴

📝 `funcion() { echo "valor"; }`

🔄 `funcion() { return "valor"; }`

� `funcion() { exit "valor"; }`

🎯 `funcion() { printf "valor"; }`

**Respuesta Correcta:**
📝 `funcion() { echo "valor"; }`

**Explicación:**
💡 Las funciones Bash retornan valores mediante salida (echo/printf). Captura con `resultado=$(funcion)`. El comando `return` solo establece códigos de salida (0-255), ¡no valores reales! 🎯

---

### 🔧 ¿Cuál es la forma más eficiente de procesar un archivo línea por línea? 🔴

📝 `while IFS= read -r linea; do ... done < archivo`

🔄 `for linea in $(cat archivo); do ... done`

📦 `cat archivo | while read linea; do ... done`

🎯 `readarray -t lineas < archivo; for linea in "${lineas[@]}"; do`

**Respuesta Correcta:**
📝 `while IFS= read -r linea; do ... done < archivo`

**Explicación:**
⚡ Este método es más eficiente porque lee el archivo directamente sin crear subshells. `IFS=` preserva espacios iniciales/finales, `-r` previene interpretación de backslashes! 🎯

---

### ❓ ¿Qué comando muestra el directorio actual? 🟢

📝 `pwd`

🔄 `cd`

� `ls E-d`

🎯 `echo $PWD`

**Respuesta Correcta:**
📝 `pwd`

**Explicación:**
� `p wd` significa "print working directory". Aunque `echo $PWD` también funciona, `pwd` es el comando estándar y más portable! 🎯

---

### 🧠 ¿Cómo se comenta una línea en Bash? 🟢

📝 `# Este es un comentario`

� ``// Este es un comentario`

📦 `/* Este es un comentario */`

🎯 `-- Este es un comentario`

**Respuesta Correcta:**
📝 `# Este es un comentario`

**Explicación:**
🔍 El símbolo `#` inicia un comentario de línea en Bash. Todo después de `#` es ignorado por el intérprete. ¡Simple pero fundamental! 🎯

---

### 💭 ¿Cuál es el shebang correcto para un script Bash? 🟢

📝 `#!/bin/bash`

🔄 `#!bash`

� `#!/usr/bin/env bash`

🎯 `#/bin/bash`

**Respuesta Correcta:**
📝 `#!/bin/bash`

**Explicación:**
⚡ El shebang `#!/bin/bash` le dice al sistema qué intérprete usar. `#!/usr/bin/env bash` es más portable pero `#!/bin/bash` es el estándar más común! 🎯

---

### 🤔 ¿Cómo se concatenan strings en Bash? 🟡

📝 `resultado="${string1}${string2}"`

🔄 `resultado=$string1 + $string2`

📦 `resultado=concat($string1, $string2)`

🎯 `resultado="$string1" . "$string2"`

**Respuesta Correcta:**
📝 `resultado="${string1}${string2}"`

**Explicación:**
💡 En Bash, simplemente pones las variables juntas para concatenar. Las llaves `{}` son opcionales pero recomendadas para claridad y evitar ambigüedades! 🎯

---

### 🔧 ¿Qué operador compara números en Bash? 🟡

� `-eq` paara igual, `-gt` para mayor

🔄 `==` para igual, `>` para mayor

📦 `=` para igual, `>` para mayor

🎯 `.eq.` para igual, `.gt.` para mayor

**Respuesta Correcta:**
📝 `-eq` para igual, `-gt` para mayor

**Explicación:**
🩺 Bash usa operadores especiales para números: `-eq` (equal), `-ne` (not equal), `-gt` (greater than), `-lt` (less than), `-ge` (greater or equal), `-le` (less or equal)! 🎯

---

### ⚙️ ¿Cómo se ejecuta un comando y se guarda su salida? 🟡

📝 `salida=$(comando)`

� `salida=comando`

� `$salida=exec(comando)`

🎯 `salida << comando`

**Respuesta Correcta:**
📝 `salida=$(comando)`

**Explicación:**
�  La sintaxis `$(comando)` ejecuta el comando y captura su salida. También existe la sintaxis antigua con backticks pero `$()` es más moderna y anidable! 🎯

---

### � ¿¿Cuál es la forma correcta de iterar sobre archivos? 🔴

📝 `for archivo in *.txt; do`

� V`for archivo in $(ls *.txt); do`

📦 `ls *.txt | while read archivo; do`

🎯 `find . -name "*.txt" | for archivo; do`

**Respuesta Correcta:**
📝 `for archivo in *.txt; do`

**Explicación:**
🩺 El globbing directo es más seguro y eficiente. Evita `ls` en scripts porque puede fallar con nombres de archivo especiales. ¡El globbing maneja espacios correctamente! 🎯

---

### � a¿Cómo se pasan argumentos a un script? 🔴

📝 `$1, $2, $3... para argumentos posicionales`

🔄 `$arg1, $arg2, $arg3...`

� `argv[1], argv[2], argv[3]...`

🎯 `param1, param2, param3...`

**Respuesta Correcta:**
📝 `$1, $2, $3... para argumentos posicionales`

**Explicación:**
� Los argumentos se acceden con `$1`, `$2`, etc. `$0` es el nombre del script, `$#` es el número de argumentos, `$@` son todos los argumentos! 🎯

---

### 🔧 ¿Qué hace el comando `source`? 🔴

📝 Ejecuta un script en el shell actual

🔄 Compila un script

📦 Verifica la sintaxis de un script

🎯 Crea una copia del script

**Respuesta Correcta:**
📝 Ejecuta un script en el shell actual

**Explicación:**
⚡ `source` (o `.`) ejecuta comandos en el shell actual, no en un subshell. Útil para cargar variables de entorno o funciones. ¡Los cambios persisten en tu sesión! 🎯

---

### ❓ ¿Cómo se redirige stderr a un archivo? 🟢

📝 `comando 2> error.log`

🔄 `comando > error.log`

📦 `comando &> error.log`

🎯 `comando >> error.log`

**Respuesta Correcta:**
📝 `comando 2> error.log`

**Explicación:**
💡 El descriptor de archivo 2 representa stderr. `2>` redirige solo errores, `&>` redirige tanto stdout como stderr, `>` redirige solo stdout! 🎯

---

### 🧠 ¿Qué operador lógico representa AND en Bash? 🟢

📝 `&&`

🔄 `AND`

📦 `&`

🎯 `and`

**Respuesta Correcta:**
📝 `&&`

**Explicación:**
🔍 `&&` ejecuta el segundo comando solo si el primero tiene éxito. También existe `||` para OR. ¡Perfecto para encadenar comandos condicionalmente! 🎯

---

### 💭 ¿Cómo se declara un array en Bash? 🟢

📝 `array=(elemento1 elemento2 elemento3)`

🔄 `array=[elemento1, elemento2, elemento3]`

📦 `declare array[elemento1 elemento2 elemento3]`

🎯 `array={elemento1; elemento2; elemento3}`

**Respuesta Correcta:**
📝 `array=(elemento1 elemento2 elemento3)`

**Explicación:**
⚡ Los arrays en Bash se declaran con paréntesis y elementos separados por espacios. Accede con `${array[0]}`, `${array[1]}`, etc. ¡Los índices empiezan en 0! 🎯