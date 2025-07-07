# 🐳 Docker - Cuestionario 1

## Preguntas

### 1. 📊 ¿Qué comando nos da las estadísticas en tiempo real de un contenedor con alto consumo de CPU? 🟢

A) ⚡ `docker stats`
B) 🔧 `docker top`
C) 🛠️ `docker info`
D) 📊 `docker metrics`

**Respuesta correcta**: A) ⚡ `docker stats`

> 💡 `docker stats` muestra el uso de CPU, memoria y red en tiempo real. ¡Como un monitor de recursos para tus contenedores!

### 2. 📂 ¿Qué hace la instrucción WORKDIR en el Dockerfile? 🟢

A) 🎯 `Establece el directorio de trabajo`
B) 🔧 `Crea un volumen`
C) ⚙️ `Instala dependencias`
D) 📂 `Copia archivos`

**Respuesta correcta**: A) 🎯 `Establece el directorio de trabajo`

> 📘 `WORKDIR` define el directorio base para las siguientes instrucciones. ¡Como un cd pero para tu contenedor!

### 3. 💾 ¿Qué bandera de docker run limita la memoria de un contenedor? 🟡

A) 💾 `--memory`
B) 🔧 `--mem`
C) ⚙️ `--ram`
D) 📊 `--limit`

**Respuesta correcta**: A) 💾 `--memory`

> ⚡ `--memory` establece el límite de RAM. ¡Para que ningún contenedor se vuelva un glotón de recursos!

### 4. 🔌 ¿Cómo mapeas el puerto 80 del contenedor al 8080 del host? 🟢

A) 🔌 `-p 8080:80`
B) 🛠️ `-p 80:8080`
C) 🔧 `--port 80:8080`
D) ⚙️ `--expose 8080:80`

**Respuesta correcta**: A) 🔌 `-p 8080:80`

> 🎯 `-p HOST:CONTAINER` es el formato. ¡Como un portero dirigiendo el tráfico al lugar correcto!

### 5. 📦 ¿Qué instrucción del Dockerfile es la más eficiente para instalar paquetes? 🟡

A) ⚡ `RUN apt-get update && apt-get install`
B) 🔧 `RUN apt-get install`
C) 📦 `COPY && RUN`
D) ⚙️ `ADD && INSTALL`

**Respuesta correcta**: A) ⚡ `RUN apt-get update && apt-get install`

> 💡 Combinar comandos reduce capas y tamaño. ¡Como hacer la compra de una vez en lugar de varios viajes!

### 6. 🔐 ¿Qué comando inspecciona los secretos de un contenedor? 🟡

A) 🕵️ `docker inspect`
B) 🔧 `docker secrets`
C) ⚙️ `docker check`
D) 🛠️ `docker audit`

**Respuesta correcta**: A) 🕵️ `docker inspect`

> 📘 `docker inspect` revela configuración y secretos. ¡Como un detective para tus contenedores!

### 7. 🔄 ¿Qué hace la opción --restart=always? 🟢

A) 🔄 `Reinicia el contenedor si se detiene`
B) ⚙️ `Reinicia Docker daemon`
C) 🔧 `Actualiza la imagen`
D) 🛠️ `Recarga la configuración`

**Respuesta correcta**: A) 🔄 `Reinicia el contenedor si se detiene`

> ⚡ Mantiene el contenedor vivo automáticamente. ¡Como un guardián incansable!

### 8. 🏷️ ¿Cuál es la mejor práctica para etiquetar imágenes? 🟡

A) 📌 `nombre:versión`
B) 🏷️ `nombre_versión`
C) ⚙️ `nombre-fecha`
D) 🔧 `nombreV1`

**Respuesta correcta**: A) 📌 `nombre:versión`

> 💡 `nombre:versión` es el estándar. ¡Como una biblioteca bien organizada, cada libro en su lugar!

### 9. 🔍 ¿Qué comando muestra las capas de una imagen? 🟡

A) 🎯 `docker history`
B) 📊 `docker layers`
C) ⚙️ `docker inspect`
D) 🔧 `docker show`

**Respuesta correcta**: A) 🎯 `docker history`

> 📘 `docker history` revela la construcción capa por capa. ¡Como una radiografía de tu imagen!

### 10. 🚫 ¿Qué hace el flag --no-cache al construir una imagen? 🟡

A) 🚫 `Ignora la caché de construcción`
B) 🔧 `No guarda la imagen`
C) ⚙️ `No usa red`
D) 📦 `No comprime`

**Respuesta correcta**: A) 🚫 `Ignora la caché de construcción`

> ⚡ Construye desde cero, ignorando capas cacheadas. ¡Útil para builds totalmente frescos!

### 11. 🌐 ¿Cómo crear una red personalizada para contenedores? 🟢

A) 🔌 `docker network create`
B) 🔧 `docker create network`
C) ⚙️ `docker new network`
D) 🛠️ `docker network add`

**Respuesta correcta**: A) 🔌 `docker network create`

> 🎯 `docker network create` genera una red aislada. ¡Como crear un vecindario privado para contenedores!

### 12. ⚡ ¿Qué comando ejecuta un comando en un contenedor en ejecución? 🟢

A) ⚡ `docker exec`
B) 🔧 `docker run`
C) ⚙️ `docker do`
D) 🛠️ `docker cmd`

**Respuesta correcta**: A) ⚡ `docker exec`

> 💡 `docker exec` ejecuta comandos en contenedores activos. ¡Como enviar instrucciones a distancia!

### 13. 👤 ¿Qué hace la instrucción USER en un Dockerfile? 🟡

A) 👤 `Cambia el usuario para los comandos`
B) 🔧 `Crea un usuario`
C) ⚙️ `Borra un usuario`
D) 🛠️ `Lista usuarios`

**Respuesta correcta**: A) 👤 `Cambia el usuario para los comandos`

> 📘 `USER` define quién ejecuta los comandos siguientes. ¡Como cambiar de identidad en el contenedor!

### 14. ⚙️ ¿Qué comando actualiza la configuración de un contenedor? 🟡

A) ⚙️ `docker update`
B) 🔧 `docker config`
C) 🛠️ `docker modify`
D) 📊 `docker change`

**Respuesta correcta**: A) ⚙️ `docker update`

> 💡 `docker update` modifica recursos en caliente. ¡Como actualizar las reglas del juego sin parar el partido!

### 15. 🏷️ ¿Qué hace la instrucción LABEL en Dockerfile? 🟢

A) 🏷️ `Agrega metadatos a la imagen`
B) 📝 `Etiqueta el contenedor`
C) ⚙️ `Nombra la imagen`
D) 🔧 `Versiona el build`

**Respuesta correcta**: A) 🏷️ `Agrega metadatos a la imagen`

> 📘 `LABEL` añade información descriptiva. ¡Como poner post-its en tu imagen!

### 16. 🧹 ¿Qué comando limpia todos los recursos Docker no usados? 🟡

A) 🧹 `docker system prune`
B) 🔧 `docker clean`
C) ⚙️ `docker remove all`
D) 🛠️ `docker cleanup`

**Respuesta correcta**: A) 🧹 `docker system prune`

> 💡 `docker system prune` elimina recursos huérfanos. ¡Como una limpieza de primavera para Docker!

### 17. 🔐 ¿Cómo se pasan variables de entorno a un contenedor? 🟢

A) ⚡ `-e VARIABLE=valor`
B) 🔧 `--env=VARIABLE`
C) ⚙️ `-v VARIABLE`
D) 🛠️ `--var VARIABLE`

**Respuesta correcta**: A) ⚡ `-e VARIABLE=valor`

> 🎯 `-e` establece variables de entorno. ¡Como darle instrucciones secretas a tu contenedor!

### 18. ⏸️ ¿Qué hace el comando docker pause? 🟢

A) ⏸️ `Suspende todos los procesos`
B) 🔧 `Detiene el contenedor`
C) ⚙️ `Reinicia procesos`
D) 🛠️ `Mata procesos`

**Respuesta correcta**: A) ⏸️ `Suspende todos los procesos`

> 💡 Congela los procesos del contenedor. ¡Como poner tu contenedor en modo siesta!

### 19. 💻 ¿Qué bandera limita el uso de CPU de un contenedor? 🟡

A) ⚡ `--cpus`
B) 🔧 `--cpu-limit`
C) ⚙️ `--processor`
D) 🛠️ `--cores`

**Respuesta correcta**: A) ⚡ `--cpus`

> 📘 `--cpus` establece el límite de CPU. ¡Para que todos tengan su parte justa del pastel!

### 20. 💓 ¿Qué hace HEALTHCHECK en un Dockerfile? 🟡

A) 💓 `Verifica si el contenedor está sano`
B) 🔧 `Escanea virus`
C) ⚙️ `Chequea memoria`
D) 🛠️ `Monitorea red`

**Respuesta correcta**: A) 💓 `Verifica si el contenedor está sano`

> ⚡ `HEALTHCHECK` ejecuta pruebas de salud periódicas. ¡Como un doctor para tu contenedor!

### 21. 🌐 ¿Qué comando muestra los detalles de red de un contenedor? 🟡

A) 🌐 `docker network inspect`
B) 🔧 `docker net show`
C) ⚙️ `docker inspect network`
D) 🛠️ `docker show network`

**Respuesta correcta**: A) 🌐 `docker network inspect`

> 🎯 `docker network inspect` muestra toda la configuración de red. ¡Como un mapa detallado de las conexiones!
