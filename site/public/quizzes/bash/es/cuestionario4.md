# 🐚 Bash Avanzado - Cuestionario 4

## Preguntas

### 1. ❓ ¿Qué comando de Bash te permite buscar archivos por nombre y ejecutar comandos en ellos? 🔴

A) 📝 `find -exec`

B) ⚙️ `grep -r`

C) 🔧 `locate -i`

D) 🐳 `which -a`

**Respuesta Correcta**: A) 📝 `find -exec`

💡 `find -exec` permite buscar archivos y ejecutar comandos en los resultados encontrados, proporcionando control granular sobre las operaciones de archivos.

### 2. 🧠 ¿Cuál es el propósito del operador `<<<` en Bash? 🔴

A) 📝 Redirigir entrada desde una cadena (here-string)

B) ⚙️ Redirigir salida a un archivo

C) 🔧 Redirigir entrada desde un archivo

D) 🐳 Redirigir salida de error

**Respuesta Correcta**: A) 📝 Redirigir entrada desde una cadena (here-string)

💡 El operador `<<<` (here-string) redirige una cadena como entrada estándar a un comando, útil para pasar datos directamente sin crear archivos temporales.

### 3. 🤔 ¿Qué comando de Bash te permite crear un archivo de respaldo con timestamp? 🔴

A) 📝 `cp --backup=numbered`

B) ⚙️ `mv -b`

C) 🔧 `tar -czf`

D) 🐳 `rsync --backup`

**Respuesta Correcta**: A) 📝 `cp --backup=numbered`

💡 `cp --backup=numbered` crea copias de respaldo numeradas automáticamente, preservando archivos existentes con extensiones como `.~1~`, `.~2~`, etc.

### 4. 🔍 ¿Cuál es el propósito de la variable especial `$?` en Bash? 🔴

A) 📝 Almacenar el código de salida del último comando

B) ⚙️ Contener el PID del proceso actual

C) 🔧 Almacenar el número de argumentos

D) 🐳 Contener el nombre del script

**Respuesta Correcta**: A) 📝 Almacenar el código de salida del último comando

💡 `$?` contiene el código de salida del último comando ejecutado, donde 0 indica éxito y valores no cero indican diferentes tipos de errores.

### 5. ❓ ¿Qué comando de Bash te permite crear un archivo de log con timestamp automático? 🔴

A) 📝 `logger -t`

B) ⚙️ `tee -a`

C) 🔧 `script -q`

D) 🐳 `logrotate`

**Respuesta Correcta**: A) 📝 `logger -t`

💡 `logger -t` envía mensajes al sistema de logging con un tag personalizado, mientras que puedes combinar `date` con redirección para crear logs con timestamp.

### 6. 🧠 ¿Cuál es el propósito del operador `|&` en Bash? 🔴

A) 📝 Redirigir tanto stdout como stderr

B) ⚙️ Crear un pipe bidireccional

C) 🔧 Redirigir solo stderr

D) 🐳 Combinar múltiples pipes

**Respuesta Correcta**: A) 📝 Redirigir tanto stdout como stderr

💡 El operador `|&` redirige tanto la salida estándar como la de error a través de un pipe, equivalente a `2>&1 |` pero más conciso.

### 7. 🤔 ¿Qué comando de Bash te permite crear un archivo de configuración con valores por defecto? 🔴

A) 📝 `cat > config << EOF`

B) ⚙️ `echo "default" > config`

C) 🔧 `printf "%s\n" "default" > config`

D) 🐳 `tee config <<< "default"`

**Respuesta Correcta**: A) 📝 `cat > config << EOF`

💡 `cat > config << EOF` (here-document) permite crear archivos con contenido multilínea de manera eficiente, ideal para archivos de configuración.

### 8. 🔍 ¿Cuál es el propósito de la función `trap` en Bash? 🔴

A) 📝 Capturar señales y ejecutar comandos

B) ⚙️ Crear trampas para debugging

C) 🔧 Gestionar archivos temporales

D) 🐳 Controlar el flujo de ejecución

**Respuesta Correcta**: A) 📝 Capturar señales y ejecutar comandos

💡 `trap` permite capturar señales del sistema (como SIGINT, SIGTERM) y ejecutar comandos específicos cuando ocurren, útil para limpieza y manejo de errores.

### 9. ❓ ¿Qué comando de Bash te permite crear un archivo de backup incremental? 🔴

A) 📝 `rsync -av --backup-dir`

B) ⚙️ `cp -r --backup`

C) 🔧 `tar -czf --newer`

D) 🐳 `dd if= of=`

**Respuesta Correcta**: A) 📝 `rsync -av --backup-dir`

💡 `rsync -av --backup-dir` crea backups incrementales eficientes, copiando solo archivos modificados y organizándolos en directorios de respaldo separados.

### 10. 🧠 ¿Cuál es el propósito del operador `&>` en Bash? 🔴

A) 📝 Redirigir stdout y stderr a un archivo

B) ⚙️ Ejecutar comandos en background

C) 🔧 Redirigir solo stderr

D) 🐳 Crear un pipe bidireccional

**Respuesta Correcta**: A) 📝 Redirigir stdout y stderr a un archivo

💡 `&>` redirige tanto la salida estándar como la de error a un archivo, más conciso que `> file 2>&1`.

### 11. 🤔 ¿Qué comando de Bash te permite crear un archivo de log rotativo? 🔴

A) 📝 `logrotate -f`

B) ⚙️ `tail -f`

C) 🔧 `tee -a`

D) 🐳 `logger -p`

**Respuesta Correcta**: A) 📝 `logrotate -f`

💡 `logrotate -f` fuerza la rotación de logs según configuraciones predefinidas, mientras que puedes implementar rotación manual con `mv` y compresión.

### 12. 🔍 ¿Cuál es el propósito de la variable `$SECONDS` en Bash? 🔴

A) 📝 Contar segundos desde el inicio del script

B) ⚙️ Almacenar timestamp actual

C) 🔧 Controlar timeouts de comandos

D) 🐳 Gestionar cronómetros

**Respuesta Correcta**: A) 📝 Contar segundos desde el inicio del script

💡 `$SECONDS` cuenta automáticamente los segundos transcurridos desde el inicio del script, útil para medir tiempos de ejecución e implementar timeouts.

### 13. ❓ ¿Qué comando de Bash te permite crear un archivo de configuración con variables expandidas? 🔴

A) 📝 `envsubst < template > config`

B) ⚙️ `sed 's/VAR/val/g' template > config`

C) 🔧 `awk '{gsub(/VAR/, "val")}1' template > config`

D) 🐳 `cat template | tr 'VAR' 'val' > config`

**Respuesta Correcta**: A) 📝 `envsubst < template > config`

💡 `envsubst` expande variables de entorno en plantillas, reemplazando `${VAR}` con valores reales, ideal para generar archivos de configuración dinámicos.

### 14. 🧠 ¿Cuál es el propósito del operador `<>` en Bash? 🔴

A) 📝 Abrir archivo para lectura y escritura

B) ⚙️ Crear un archivo si no existe

C) 🔧 Abrir archivo en modo append

D) 🐳 Crear un enlace simbólico

**Respuesta Correcta**: A) 📝 Abrir archivo para lectura y escritura

💡 `<>` abre un archivo para lectura y escritura simultánea, útil para operaciones que requieren acceso bidireccional al mismo descriptor de archivo.

### 15. 🤔 ¿Qué comando de Bash te permite crear un archivo de backup con compresión? 🔴

A) 📝 `tar -czf backup.tar.gz dir/`

B) ⚙️ `zip -r backup.zip dir/`

C) 🔧 `7z a backup.7z dir/`

D) 🐳 `gzip -r dir/`

**Respuesta Correcta**: A) 📝 `tar -czf backup.tar.gz dir/`

💡 `tar -czf` crea archivos comprimidos con gzip, combinando múltiples archivos en un solo archivo tar comprimido, ideal para backups.

### 16. 🔍 ¿Cuál es el propósito de la función `wait` en Bash? 🔴

A) 📝 Esperar a que procesos en background terminen

B) ⚙️ Pausar la ejecución del script

C) 🔧 Sincronizar archivos

D) 🐳 Controlar el flujo de ejecución

**Respuesta Correcta**: A) 📝 Esperar a que procesos en background terminen

💡 `wait` espera a que todos los procesos en background terminen antes de continuar, útil para sincronizar operaciones paralelas y recolectar códigos de salida.

### 17. ❓ ¿Qué comando de Bash te permite crear un archivo de configuración con validación? 🔴

A) 📝 `bash -n script.sh`

B) ⚙️ `shellcheck script.sh`

C) 🔧 `bash -v script.sh`

D) 🐳 `set -euo pipefail`

**Respuesta Correcta**: A) 📝 `bash -n script.sh`

💡 `bash -n` valida la sintaxis de un script sin ejecutarlo, mientras que `shellcheck` proporciona análisis estático más avanzado para detectar problemas comunes.

### 18. 🧠 ¿Cuál es el propósito del operador `|` en combinación con `tee` en Bash? 🔴

A) 📝 Mostrar salida en pantalla y guardar en archivo

B) ⚙️ Crear un pipe bidireccional

C) 🔧 Redirigir solo stderr

D) 🐳 Combinar múltiples streams

**Respuesta Correcta**: A) 📝 Mostrar salida en pantalla y guardar en archivo

💡 `command | tee file` muestra la salida en pantalla y simultáneamente la guarda en un archivo, útil para logging y debugging sin perder visibilidad.

### 19. 🤔 ¿Qué comando de Bash te permite crear un archivo de backup con verificación? 🔴

A) 📝 `rsync -av --checksum`

B) ⚙️ `cp -v --preserve=all`

C) 🔧 `tar -czf --verify`

D) 🐳 `dd if= of= conv=sync`

**Respuesta Correcta**: A) 📝 `rsync -av --checksum`

💡 `rsync -av --checksum` verifica la integridad de archivos copiados comparando checksums, asegurando que los backups sean idénticos a los originales.

### 20. 🔍 ¿Cuál es el propósito de la variable `$RANDOM` en Bash? 🔴

A) 📝 Generar números aleatorios entre 0-32767

B) ⚙️ Almacenar seed para generador aleatorio

C) 🔧 Controlar la aleatoriedad de comandos

D) 🐳 Gestionar IDs de procesos

**Respuesta Correcta**: A) 📝 Generar números aleatorios entre 0-32767

💡 `$RANDOM` genera números pseudo-aleatorios entre 0 y 32767 cada vez que se accede, útil para scripts que requieren aleatoriedad o selección aleatoria.

### 21. ❓ ¿Qué comando de Bash te permite gestionar el ciclo de vida de contenedores? 🔴

A) 📝 Container lifecycle management

B) ⚙️ Image management

C) 🔧 Volume management

D) 🐳 Network management

**Respuesta Correcta**: A) 📝 Container lifecycle management

💡 Container lifecycle management permite crear, iniciar, detener, reiniciar y eliminar contenedores de forma programática, facilitando la automatización.

🔴
