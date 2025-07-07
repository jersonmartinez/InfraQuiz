# 🐳 Docker - Cuestionario 2

## Preguntas

### 1. 🔄 ¿Qué hace el comando docker commit? 🟡

A) 🎯 `Crea una nueva imagen del contenedor`
B) 🔧 `Guarda cambios en Git`
C) ⚙️ `Actualiza el contenedor`
D) 📦 `Reinicia el contenedor`

**Respuesta correcta**: A) 🎯 `Crea una nueva imagen del contenedor`

> 💡 `docker commit` captura el estado actual del contenedor como una nueva imagen. ¡Como tomar una foto instantánea de tu contenedor!

### 2. 📦 ¿Cuál es la diferencia entre COPY y ADD en Dockerfile? 🟡

A) 🎯 `COPY es más simple, ADD puede descomprimir archivos`
B) 🔧 `Son exactamente lo mismo`
C) ⚙️ `ADD es más rápido que COPY`
D) 📦 `COPY puede descargar archivos remotos`

**Respuesta correcta**: A) 🎯 `COPY es más simple, ADD puede descomprimir archivos`

> 📘 `COPY` es para copiar archivos locales, mientras que `ADD` tiene funciones extra como descomprimir. ¡Como tener un cuchillo simple vs una navaja suiza!

### 3. 🌐 ¿Qué es un Docker bridge network? 🟡

A) 🔌 `Red privada por defecto para contenedores`
B) 🔧 `Conexión física entre hosts`
C) ⚙️ `VPN para contenedores`
D) 🛠️ `Proxy inverso`

**Respuesta correcta**: A) 🔌 `Red privada por defecto para contenedores`

> ⚡ Bridge network es como un switch virtual que conecta contenedores. ¡Como un vecindario privado para contenedores!

### 4. 🔐 ¿Qué es Docker Content Trust (DCT)? 🟡

A) 🔒 `Sistema de firma digital de imágenes`
B) 🔧 `Escáner de vulnerabilidades`
C) ⚙️ `Sistema de backups`
D) 🛠️ `Gestor de secretos`

**Respuesta correcta**: A) 🔒 `Sistema de firma digital de imágenes`

> 💡 DCT asegura que las imágenes son auténticas y no han sido modificadas. ¡Como un sello de garantía para tus imágenes!

### 5. 📊 ¿Qué hace el flag --memory-reservation? 🟢

A) ⚡ `Establece memoria blanda para el contenedor`
B) 🔧 `Reserva memoria en el host`
C) 📦 `Bloquea memoria del sistema`
D) ⚙️ `Limita memoria máxima`

**Respuesta correcta**: A) ⚡ `Establece memoria blanda para el contenedor`

> 🎯 Es un límite suave de memoria que permite flexibilidad. ¡Como una reserva flexible en un restaurante!

### 6. 🔍 ¿Qué hace el comando docker diff? 🟢

A) 🔍 `Muestra cambios en el sistema de archivos`
B) 🔧 `Compara dos imágenes`
C) ⚙️ `Verifica diferencias de red`
D) 🛠️ `Analiza cambios de configuración`

**Respuesta correcta**: A) 🔍 `Muestra cambios en el sistema de archivos`

> 📘 Lista los archivos modificados desde que el contenedor inició. ¡Como un detector de cambios para tu contenedor!

### 7. 🏷️ ¿Qué significa la etiqueta latest? 🟢

A) 🎯 `La última versión construida de una imagen`
B) 🔧 `La versión más estable`
C) ⚙️ `La primera versión`
D) 📦 `La versión beta`

**Respuesta correcta**: A) 🎯 `La última versión construida de una imagen`

> ⚡ 'latest' es simplemente una etiqueta por defecto, no garantiza ser la más reciente. ¡Como un apodo que puede ser engañoso!

### 8. 🔌 ¿Qué es Docker socket? 🟡

A) 🔌 `Punto de comunicación con daemon Docker`
B) 🔧 `Puerto de red`
C) ⚙️ `Archivo de configuración`
D) 🛠️ `Plugin de Docker`

**Respuesta correcta**: A) 🔌 `Punto de comunicación con daemon Docker`

> 💡 El socket es la interfaz para comunicarse con Docker. ¡Como un teléfono directo al cerebro de Docker!

### 9. 📦 ¿Qué es un multi-stage build? 🟡

A) 🎯 `Construcción en etapas para reducir tamaño`
B) 🔧 `Múltiples contenedores`
C) ⚙️ `Varios Dockerfiles`
D) 📦 `Build paralelo`

**Respuesta correcta**: A) 🎯 `Construcción en etapas para reducir tamaño`

> 📘 Permite usar múltiples FROM para optimizar la imagen final. ¡Como cocinar en varios pasos pero servir solo el plato final!

### 10. 🔄 ¿Qué es Docker swarm? 🟡

A) 🌐 `Sistema de orquestación nativo de Docker`
B) 🔧 `Red de contenedores`
C) ⚙️ `Grupo de imágenes`
D) 🛠️ `Sistema de backup`

**Respuesta correcta**: A) 🌐 `Sistema de orquestación nativo de Docker`

> ⚡ Permite gestionar un cluster de hosts Docker. ¡Como un director organizando una orquesta de contenedores!

### 11. 💾 ¿Qué son los tmpfs mounts? 🟡

A) 💾 `Montajes temporales en memoria`
B) 🔧 `Archivos temporales`
C) ⚙️ `Backups temporales`
D) 📦 `Caché del sistema`

**Respuesta correcta**: A) 💾 `Montajes temporales en memoria`

> 🎯 Almacenamiento temporal en memoria RAM. ¡Como un post-it digital que desaparece al reiniciar!

### 12. 🔐 ¿Qué es un Docker secret? 🟢

A) 🔒 `Dato sensible gestionado por Docker`
B) 🔧 `Contraseña de registro`
C) ⚙️ `Archivo encriptado`
D) 🛠️ `Variable de entorno`

**Respuesta correcta**: A) 🔒 `Dato sensible gestionado por Docker`

> 💡 Manera segura de manejar datos sensibles en Docker. ¡Como una caja fuerte para tus secretos!

### 13. 📊 ¿Qué hace ONBUILD en Dockerfile? 🟡

A) 🎯 `Ejecuta comandos en imágenes derivadas`
B) 🔧 `Construye la imagen`
C) ⚙️ `Verifica el build`
D) 🛠️ `Optimiza la construcción`

**Respuesta correcta**: A) 🎯 `Ejecuta comandos en imágenes derivadas`

> 📘 Trigger que se activa cuando otra imagen usa esta como base. ¡Como dejar instrucciones para el futuro!

### 14. 🌐 ¿Qué es un Docker registry? 🟢

A) 🏢 `Repositorio de imágenes Docker`
B) 🔧 `Lista de contenedores`
C) ⚙️ `Base de datos Docker`
D) 📦 `Sistema de archivos`

**Respuesta correcta**: A) 🏢 `Repositorio de imágenes Docker`

> ⚡ Almacén donde se guardan y distribuyen imágenes Docker. ¡Como una biblioteca de imágenes Docker!

### 15. ⚙️ ¿Qué es un Docker plugin? 🟡

A) ⚙️ `Extensión que añade funcionalidad`
B) 🔧 `Script de automatización`
C) 🛠️ `Herramienta de monitoreo`
D) 📊 `Configuración especial`

**Respuesta correcta**: A) ⚙️ `Extensión que añade funcionalidad`

> 💡 Añade capacidades extra a Docker. ¡Como accesorios para personalizar tu Docker!

### 16. 🔍 ¿Qué es un healthcheck personalizado? 🟡

A) 🏥 `Script para verificar salud del contenedor`
B) 🔧 `Monitor de sistema`
C) ⚙️ `Log de errores`
D) 📊 `Reporte de estado`

**Respuesta correcta**: A) 🏥 `Script para verificar salud del contenedor`

> 🎯 Comando personalizado para verificar si el contenedor está funcionando correctamente. ¡Como un chequeo médico a medida!

### 17. 📦 ¿Qué es un volume driver? 🟡

A) 🔌 `Plugin para gestionar almacenamiento`
B) 🔧 `Controlador de disco`
C) ⚙️ `Sistema de archivos`
D) 💾 `Gestor de backups`

**Respuesta correcta**: A) 🔌 `Plugin para gestionar almacenamiento`

> 📘 Permite usar diferentes tipos de almacenamiento para volúmenes. ¡Como un adaptador universal para almacenamiento!

### 18. 🔄 ¿Qué es Docker buildx? 🟡

A) 🏗️ `Constructor multiplataforma`
B) 🔧 `Optimizador de builds`
C) ⚙️ `Caché de construcción`
D) 📦 `Compressor de imágenes`

**Respuesta correcta**: A) 🏗️ `Constructor multiplataforma`

> ⚡ Permite construir imágenes para diferentes arquitecturas. ¡Como un constructor universal de imágenes!

### 19. 🌐 ¿Qué es un Docker context? 🟢

A) 🎯 `Conjunto de configuraciones de conexión`
B) 🔧 `Variable de entorno`
C) ⚙️ `Archivo de configuración`
D) 🛠️ `Script de inicio`

**Respuesta correcta**: A) 🎯 `Conjunto de configuraciones de conexión`

> 💡 Define cómo y dónde Docker se conecta. ¡Como un perfil de conexión para Docker!

### 20. 📊 ¿Qué es un cgroup? 🟡

A) 🔄 `Control de recursos del sistema`
B) 🔧 `Grupo de contenedores`
C) ⚙️ `Configuración de red`
D) 📦 `Sistema de archivos`

**Respuesta correcta**: A) 🔄 `Control de recursos del sistema`

> 📘 Limita y aísla el uso de recursos del sistema. ¡Como un controlador de tráfico para recursos!

### 21. 🔐 ¿Qué es un Docker rootless? 🟡

A) 🔒 `Docker sin privilegios root`
B) 🔧 `Contenedor sin sistema base`
C) ⚙️ `Imagen sin capas`
D) 🛠️ `Sistema sin kernel`

**Respuesta correcta**: A) 🔒 `Docker sin privilegios root`

> ⚡ Permite ejecutar Docker sin privilegios de superusuario. ¡Como usar Docker con un perfil de seguridad mejorado! 