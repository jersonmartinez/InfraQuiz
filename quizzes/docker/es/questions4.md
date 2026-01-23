# 🐳 Docker Avanzado - Cuestionario 4

## Preguntas

### 1. ❓ ¿Qué es Docker Swarm en el contexto de Docker? 🔴

A) 📝 Un orquestador nativo de Docker para gestionar clusters de contenedores

B) ⚙️ Una herramienta de monitoreo de contenedores

C) 🔧 Un sistema de backup para imágenes Docker

D) 🐳 Un gestor de volúmenes persistentes

**Respuesta Correcta**: A) 📝 Un orquestador nativo de Docker para gestionar clusters de contenedores

💡 Docker Swarm es la solución nativa de Docker para orquestación, permitiendo gestionar múltiples nodos como un cluster unificado con características de alta disponibilidad.

### 2. 🧠 ¿Cuál es el propósito de Docker Compose en entornos de producción? 🔴

A) 📝 Orquestar aplicaciones multi-contenedor en entornos de producción

B) ⚙️ Gestionar solo contenedores de desarrollo

C) 🔧 Configurar redes de contenedores

D) 🐳 Gestionar volúmenes de datos

**Respuesta Correcta**: A) 📝 Orquestar aplicaciones multi-contenedor en entornos de producción

💡 Docker Compose permite definir y gestionar aplicaciones multi-contenedor tanto en desarrollo como en producción, facilitando la gestión de servicios complejos.

### 3. 🤔 ¿Qué es un Dockerfile multi-stage? 🔴

A) 📝 Un Dockerfile que usa múltiples etapas para optimizar el tamaño de la imagen final

B) ⚙️ Un Dockerfile que crea múltiples imágenes

C) 🔧 Un Dockerfile que gestiona múltiples servicios

D) 🐳 Un Dockerfile que configura múltiples redes

**Respuesta Correcta**: A) 📝 Un Dockerfile que usa múltiples etapas para optimizar el tamaño de la imagen final

💡 Los Dockerfiles multi-stage permiten usar múltiples etapas de construcción, separando herramientas de build del runtime, resultando en imágenes más pequeñas y seguras.

### 4. 🔍 ¿Cuál es el propósito de Docker BuildKit? 🔴

A) 📝 Mejorar el rendimiento y funcionalidades del proceso de construcción de imágenes

B) ⚙️ Gestionar el almacenamiento de imágenes

C) 🔧 Configurar redes de contenedores

D) 🐳 Monitorear el rendimiento de contenedores

**Respuesta Correcta**: A) 📝 Mejorar el rendimiento y funcionalidades del proceso de construcción de imágenes

💡 BuildKit es el nuevo motor de construcción de Docker que ofrece mejor rendimiento, construcción paralela, y funcionalidades avanzadas como cache distribuido.

### 5. ❓ ¿Qué es Docker Content Trust (DCT)? 🔴

A) 📝 Un sistema de verificación de integridad y autenticidad de imágenes Docker

B) ⚙️ Un sistema de gestión de permisos de usuarios

C) 🔧 Un sistema de backup de imágenes

D) 🐳 Un sistema de monitoreo de contenedores

**Respuesta Correcta**: A) 📝 Un sistema de verificación de integridad y autenticidad de imágenes Docker

💡 DCT utiliza notary para firmar y verificar imágenes Docker, asegurando que solo se ejecuten imágenes auténticas y no manipuladas.

### 6. 🧠 ¿Cuál es el propósito de Docker Secrets? 🔴

A) 📝 Gestionar información sensible como contraseñas y claves de manera segura

B) ⚙️ Gestionar configuraciones no confidenciales

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear la seguridad de contenedores

**Respuesta Correcta**: A) 📝 Gestionar información sensible como contraseñas y claves de manera segura

💡 Docker Secrets permite gestionar información sensible de manera segura, encriptando datos y proporcionando acceso controlado a los contenedores que los necesiten.

### 7. 🤔 ¿Qué es un Docker Overlay Network? 🔴

A) 📝 Una red que permite comunicación entre contenedores en diferentes nodos de un cluster

B) ⚙️ Una red que conecta contenedores con servicios externos

C) 🔧 Una red que gestiona el tráfico interno de un nodo

D) 🐳 Una red que conecta contenedores con volúmenes

**Respuesta Correcta**: A) 📝 Una red que permite comunicación entre contenedores en diferentes nodos de un cluster

💡 Las Overlay Networks permiten que contenedores en diferentes nodos de un cluster Docker se comuniquen como si estuvieran en la misma red, facilitando la comunicación distribuida.

### 8. 🔍 ¿Cuál es el propósito de Docker Health Checks? 🔴

A) 📝 Verificar que los contenedores estén funcionando correctamente

B) ⚙️ Monitorear el uso de recursos de los contenedores

C) 🔧 Gestionar la configuración de los contenedores

D) 🐳 Controlar el acceso a los contenedores

**Respuesta Correcta**: A) 📝 Verificar que los contenedores estén funcionando correctamente

💡 Health Checks permiten a Docker verificar periódicamente el estado de los contenedores, detectando cuando un contenedor no responde correctamente.

### 9. ❓ ¿Qué es Docker Registry? 🔴

A) 📝 Un repositorio centralizado para almacenar y distribuir imágenes Docker

B) ⚙️ Un sistema de gestión de contenedores

C) 🔧 Un sistema de configuración de redes

D) 🐳 Un sistema de monitoreo de contenedores

**Respuesta Correcta**: A) 📝 Un repositorio centralizado para almacenar y distribuir imágenes Docker

💡 Docker Registry permite almacenar, versionar y distribuir imágenes Docker, facilitando la colaboración entre equipos y el despliegue de aplicaciones.

### 10. 🧠 ¿Cuál es el propósito de Docker Volumes? 🔴

A) 📝 Proporcionar almacenamiento persistente para contenedores

B) ⚙️ Gestionar la memoria de los contenedores

C) 🔧 Configurar redes de contenedores

D) 🐳 Monitorear el rendimiento de contenedores

**Respuesta Correcta**: A) 📝 Proporcionar almacenamiento persistente para contenedores

💡 Los Volumes permiten que los datos persistan más allá del ciclo de vida de los contenedores, facilitando el almacenamiento de bases de datos y archivos de configuración.

### 11. 🤔 ¿Qué es Docker Networking? 🔴

A) 📝 Un sistema que permite a los contenedores comunicarse entre sí y con servicios externos

B) ⚙️ Un sistema de gestión de recursos

C) 🔧 Un sistema de configuración de contenedores

D) 🐳 Un sistema de monitoreo de contenedores

**Respuesta Correcta**: A) 📝 Un sistema que permite a los contenedores comunicarse entre sí y con servicios externos

💡 Docker Networking proporciona diferentes tipos de redes (bridge, host, overlay) para permitir la comunicación entre contenedores y servicios externos de manera segura y eficiente.

### 12. 🔍 ¿Cuál es el propósito de Docker Compose Networks? 🔴

A) 📝 Definir redes personalizadas para aplicaciones multi-contenedor

B) ⚙️ Gestionar la configuración de redes del sistema

C) 🔧 Configurar políticas de firewall

D) 🐳 Monitorear el tráfico de red

**Respuesta Correcta**: A) 📝 Definir redes personalizadas para aplicaciones multi-contenedor

💡 Docker Compose Networks permiten crear redes personalizadas para aislar y conectar servicios específicos, mejorando la seguridad y organización de la comunicación.

### 13. ❓ ¿Qué es Docker Build Context? 🔴

A) 📝 El directorio y archivos que se envían al daemon de Docker durante la construcción

B) ⚙️ El contexto de ejecución de un contenedor

C) 🔧 La configuración de red de un contenedor

D) 🐳 El entorno de ejecución de un contenedor

**Respuesta Correcta**: A) 📝 El directorio y archivos que se envían al daemon de Docker durante la construcción

💡 El Build Context es el conjunto de archivos y directorios que se envían al daemon de Docker para construir una imagen, incluyendo el Dockerfile y archivos necesarios.

### 14. 🧠 ¿Cuál es el propósito de Docker Labels? 🔴

A) 📝 Agregar metadatos a imágenes y contenedores para organización y gestión

B) ⚙️ Gestionar permisos de acceso

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear el rendimiento

**Respuesta Correcta**: A) 📝 Agregar metadatos a imágenes y contenedores para organización y gestión

💡 Los Labels permiten agregar metadatos personalizados a imágenes y contenedores, facilitando la organización, filtrado y gestión de recursos Docker.

### 15. 🤔 ¿Qué es Docker Image Layering? 🔴

A) 📝 Un sistema que organiza las imágenes en capas para optimizar el almacenamiento y construcción

B) ⚙️ Un sistema de gestión de versiones de imágenes

C) 🔧 Un sistema de configuración de redes

D) 🐳 Un sistema de monitoreo de imágenes

**Respuesta Correcta**: A) 📝 Un sistema que organiza las imágenes en capas para optimizar el almacenamiento y construcción

💡 Image Layering permite que las imágenes Docker se construyan en capas, facilitando el cache, la reutilización y la optimización del almacenamiento.

### 16. 🔍 ¿Cuál es el propósito de Docker Compose Environment Variables? 🔴

A) 📝 Configurar variables de entorno para servicios específicos

B) ⚙️ Gestionar la configuración del sistema

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear el rendimiento de servicios

**Respuesta Correcta**: A) 📝 Configurar variables de entorno para servicios específicos

💡 Environment Variables en Docker Compose permiten configurar el comportamiento de los servicios mediante variables de entorno, facilitando la configuración y personalización.

### 17. ❓ ¿Qué es Docker Service Discovery? 🔴

A) 📝 Un mecanismo que permite a los contenedores encontrar y comunicarse con otros servicios

B) ⚙️ Un sistema de gestión de servicios

C) 🔧 Un sistema de configuración de redes

D) 🐳 Un sistema de monitoreo de servicios

**Respuesta Correcta**: A) 📝 Un mecanismo que permite a los contenedores encontrar y comunicarse con otros servicios

💡 Service Discovery permite que los contenedores encuentren automáticamente otros servicios en el cluster, facilitando la comunicación dinámica entre microservicios.

### 18. 🧠 ¿Cuál es el propósito de Docker Compose Dependencies? 🔴

A) 📝 Definir el orden de inicio de servicios basándose en dependencias

B) ⚙️ Gestionar las dependencias de software

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear las dependencias del sistema

**Respuesta Correcta**: A) 📝 Definir el orden de inicio de servicios basándose en dependencias

💡 Dependencies en Docker Compose permiten definir el orden de inicio de servicios, asegurando que los servicios dependientes se inicien en el orden correcto.

### 19. 🤔 ¿Qué es Docker Resource Limits? 🔴

A) 📝 Restricciones en el uso de CPU, memoria y otros recursos del sistema

B) ⚙️ Límites en el número de contenedores

C) 🔧 Límites en la configuración de redes

D) 🐳 Límites en el almacenamiento disponible

**Respuesta Correcta**: A) 📝 Restricciones en el uso de CPU, memoria y otros recursos del sistema

💡 Resource Limits permiten controlar el consumo de recursos de los contenedores, previniendo que un contenedor consuma todos los recursos del sistema.

### 20. 🔍 ¿Cuál es el propósito de Docker Compose Restart Policies? 🔴

A) 📝 Definir el comportamiento de reinicio de servicios cuando fallan

B) ⚙️ Gestionar la configuración del sistema

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear el estado de los servicios

**Respuesta Correcta**: A) 📝 Definir el comportamiento de reinicio de servicios cuando fallan

💡 Restart Policies definen cómo Docker debe manejar el reinicio de servicios cuando fallan, mejorando la resiliencia y disponibilidad de las aplicaciones.

### 21. ❓ ¿Qué es Docker Image Optimization? 🔴

A) 📝 Técnicas para reducir el tamaño y mejorar el rendimiento de las imágenes Docker

B) ⚙️ Optimización del rendimiento de contenedores

C) 🔧 Optimización de la configuración de redes

D) 🐳 Optimización del almacenamiento

**Respuesta Correcta**: A) 📝 Técnicas para reducir el tamaño y mejorar el rendimiento de las imágenes Docker

💡 Image Optimization incluye técnicas como multi-stage builds, minimización de capas, y selección de imágenes base ligeras para crear imágenes más eficientes.

🔴
