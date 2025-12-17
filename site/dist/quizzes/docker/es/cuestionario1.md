# 🐳 Docker - Cuestionario 1

## Preguntas

### 1. 🐳 ¿Qué es Docker? 🟢

A) 📝 Plataforma de containerización para empaquetar aplicaciones

B) 🔄 Sistema operativo para servidores

C) 📦 Base de datos distribuida

D) 🎯 Lenguaje de programación

**Respuesta correcta**: A) 📝 Plataforma de containerización para empaquetar aplicaciones

> 💡 Docker permite empaquetar aplicaciones con sus dependencias en containers portátiles. ¡Como cajas de envío estándar para software!

### 2. 🔧 ¿Cuál es la diferencia principal entre containers y VMs? 🟢

A) 📝 Los containers comparten el kernel del OS, las VMs tienen OS completo

B) 🔄 Los containers son más lentos que las VMs

C) 📦 Las VMs usan menos recursos

D) 🎯 No hay diferencia práctica

**Respuesta correcta**: A) 📝 Los containers comparten el kernel del OS, las VMs tienen OS completo

> ⚡ Los containers son más eficientes porque comparten el kernel del host. ¡Como apartamentos vs. casas individuales!

### 3. 🖼️ ¿Qué es una imagen Docker? 🟢

A) 📝 Template de solo lectura para crear containers

B) 🔄 Container en ejecución

C) 📦 Archivo de configuración

D) 🎯 Sistema de monitoreo

**Respuesta correcta**: A) 📝 Template de solo lectura para crear containers

> 🎯 Las imágenes son como moldes o plantillas. Los containers son instancias ejecutándose de esas imágenes. ¡Como un plano vs. la casa construida!

### 4. 📦 ¿Qué es un container Docker? 🟢

A) 📝 Instancia ejecutable de una imagen Docker

B) 🔄 Archivo de configuración Docker

C) 📦 Registro de imágenes

D) 🎯 Herramienta de monitoreo

**Respuesta correcta**: A) 📝 Instancia ejecutable de una imagen Docker

> 🏃‍♂️ Un container es una imagen "viva" - en ejecución. Puedes tener múltiples containers de la misma imagen. ¡Como múltiples Apps de la misma descarga!

### 5. 📄 ¿Qué es un Dockerfile? 🟢

A) 📝 Archivo de texto con instrucciones para construir una imagen

B) 🔄 Container en ejecución

C) 📦 Registro de cambios

D) 🎯 Herramienta de debugging

**Respuesta correcta**: A) 📝 Archivo de texto con instrucciones para construir una imagen

> 📋 Un Dockerfile es como una receta paso a paso para crear una imagen Docker. ¡Instrucciones claras para cocinar tu aplicación!

### 6. 🔨 ¿Qué comando construye una imagen desde un Dockerfile? 🟢

A) 📝 `docker build -t nombre .`

B) 🔄 `docker create -t nombre .`

C) 📦 `docker make -t nombre .`

D) 🎯 `docker compile -t nombre .`

**Respuesta correcta**: A) 📝 `docker build -t nombre .`

> 🏗️ `docker build` lee el Dockerfile y crea la imagen. El `-t` asigna un tag/nombre, el `.` indica el contexto actual.

### 7. 🚀 ¿Qué comando ejecuta un container? 🟢

A) 📝 `docker run imagen`

B) 🔄 `docker start imagen`

C) 📦 `docker execute imagen`

D) 🎯 `docker launch imagen`

**Respuesta correcta**: A) 📝 `docker run imagen`

> 🎬 `docker run` crea Y ejecuta un container de una imagen. Para containers existentes usa `docker start`.

### 8. 📋 ¿Qué comando lista containers en ejecución? 🟢

A) 📝 `docker ps`

B) 🔄 `docker list`

C) 📦 `docker show`

D) 🎯 `docker containers`

**Respuesta correcta**: A) 📝 `docker ps`

> 👀 `docker ps` muestra containers activos. Usa `docker ps -a` para ver TODOS (incluyendo detenidos).

### 9. 🛑 ¿Cómo detienes un container? 🟢

A) 📝 `docker stop container_id`

B) 🔄 `docker kill container_id`

C) 📦 `docker pause container_id`

D) 🎯 `docker halt container_id`

**Respuesta correcta**: A) 📝 `docker stop container_id`

> ⏹️ `docker stop` envía SIGTERM (apagado graceful). `docker kill` envía SIGKILL (forzado). ¡Siempre intenta stop primero!

### 10. 🗑️ ¿Cómo eliminas un container? 🟡

A) 📝 `docker rm container_id`

B) 🔄 `docker delete container_id`

C) 📦 `docker remove container_id`

D) 🎯 `docker destroy container_id`

**Respuesta correcta**: A) 📝 `docker rm container_id`

> 🗂️ `docker rm` elimina containers (deben estar detenidos). `docker rmi` elimina imágenes. ¡Diferentes comandos para diferentes objetos!

### 11. 🔍 ¿Qué comando ejecuta comandos dentro de un container? 🟡

A) 📝 `docker exec -it container_id comando`

B) 🔄 `docker run -it container_id comando`

C) 📦 `docker attach container_id comando`

D) 🎯 `docker connect container_id comando`

**Respuesta correcta**: A) 📝 `docker exec -it container_id comando`

> 🚪 `docker exec` ejecuta comandos en containers EN EJECUCIÓN. El `-it` proporciona terminal interactivo. ¡Como entrar a una habitación ya ocupada!

### 12. 📁 ¿Qué son los volúmenes Docker? 🟡

A) 📝 Mecanismo para persistir datos fuera del container

B) 🔄 Archivos de configuración

C) 📦 Imágenes comprimidas

D) 🎯 Logs del sistema

**Respuesta correcta**: A) 📝 Mecanismo para persistir datos fuera del container

> 💾 Los volúmenes permiten que los datos sobrevivan al container. ¡Como un disco duro externo que persiste cuando apagas la computadora!

### 13. 🌐 ¿Qué es el port mapping en Docker? 🟡

A) 📝 Exponer puertos del container al host

B) 🔄 Configurar DNS del container

C) 📦 Mapear archivos entre container y host

D) 🎯 Configurar variables de entorno

**Respuesta correcta**: A) 📝 Exponer puertos del container al host

> 🚪 Port mapping conecta puertos del container con el host. `-p 8080:80` mapea puerto 80 del container al 8080 del host.

### 14. 🔗 ¿Qué son las redes Docker? 🟡

A) 📝 Sistema para conectar containers entre sí

B) 🔄 Configuración de internet

C) 📦 Archivos de red

D) 🎯 Protocolos de comunicación

**Respuesta correcta**: A) 📝 Sistema para conectar containers entre sí

> 🌉 Las redes Docker permiten comunicación entre containers. ¡Como crear un vecindario donde las casas pueden hablar entre sí!

### 15. 📚 ¿Qué es Docker Hub? 🟡

A) 📝 Registro público de imágenes Docker

B) 🔄 Herramienta de desarrollo local

C) 📦 Sistema de monitoreo

D) 🎯 Editor de Dockerfiles

**Respuesta correcta**: A) 📝 Registro público de imágenes Docker

> 🏪 Docker Hub es como una tienda de aplicaciones para imágenes Docker. ¡Millones de imágenes listas para usar!

### 16. 🎛️ ¿Qué son las variables de entorno en Docker? 🟡

A) 📝 Configuraciones que se pasan al container

B) 🔄 Variables del Dockerfile

C) 📦 Configuraciones de red

D) 🎯 Variables del host

**Respuesta correcta**: A) 📝 Configuraciones que se pasan al container

> ⚙️ Variables de entorno (`-e VAR=valor`) configuran aplicaciones sin modificar código. ¡Como ajustar la configuración desde afuera!

### 17. 🔄 ¿Qué es Docker Compose? 🔴

A) 📝 Herramienta para definir aplicaciones multi-container

B) 🔄 Editor de Dockerfiles

C) 📦 Sistema de monitoreo

D) 🎯 Herramienta de debugging

**Respuesta correcta**: A) 📝 Herramienta para definir aplicaciones multi-container

> 🎼 Docker Compose orquesta múltiples containers con un archivo YAML. ¡Como dirigir una sinfonía de servicios!

### 18. 🏗️ ¿Qué es multi-stage build en Docker? 🔴

A) 📝 Técnica para crear imágenes optimizadas usando múltiples etapas

B) 🔄 Construir múltiples imágenes simultáneamente

C) 📦 Usar múltiples Dockerfiles

D) 🎯 Construir en múltiples servidores

**Respuesta correcta**: A) 📝 Técnica para crear imágenes optimizadas usando múltiples etapas

> 🎯 Multi-stage permite compilar en una etapa y copiar solo binarios a la imagen final. ¡Imágenes más pequeñas y seguras!

### 19. 🔒 ¿Cuáles son las mejores prácticas de seguridad en Docker? 🔴

A) 📝 Usar usuarios no-root, imágenes mínimas, escanear vulnerabilidades

B) 🔄 Solo usar imágenes oficiales

C) 📦 Usar solo containers privilegiados

D) 🎯 No usar volúmenes

**Respuesta correcta**: A) 📝 Usar usuarios no-root, imágenes mínimas, escanear vulnerabilidades

> 🛡️ Seguridad: corre como non-root, usa imágenes base mínimas (alpine), escanea vulnerabilidades, actualiza regularmente.

### 20. 📦 ¿Qué es un registro privado Docker? 🔴

A) 📝 Servidor interno para almacenar imágenes privadas de la organización

B) 🔄 Versión pagada de Docker Hub

C) 📦 Docker Hub con autenticación

D) 🎯 Sistema de backup para imágenes

**Respuesta correcta**: A) 📝 Servidor interno para almacenar imágenes privadas de la organización

> 🏢 Registros privados (Harbor, AWS ECR, Azure ACR) permiten control total sobre imágenes corporativas. ¡Tu propia tienda privada de apps!

### 21. 🎯 ¿Cuáles son las mejores prácticas para Dockerfiles? 🔴

A) 📝 Usar .dockerignore, minimizar capas, orden correcto de comandos, imágenes base específicas

B) 🔄 Usar siempre FROM ubuntu:latest

C) 📦 Instalar todo en una sola línea RUN

D) 🎯 No usar COPY ni ADD

**Respuesta correcta**: A) 📝 Usar .dockerignore, minimizar capas, orden correcto de comandos, imágenes base específicas

> 🏆 Dockerfiles eficientes: usa .dockerignore, combina RUN commands, ordena por frecuencia de cambio, usa tags específicos, no latest. ¡Calidad desde el principio!
