# ☸️ Kubernetes - Cuestionario 2

## Preguntas

### 1. 🔧 ¿Qué es un StatefulSet? 🔴

A) 🔧 Gestiona aplicaciones con estado con identidades de red estables

B) 🔄 Gestiona aplicaciones sin estado

C) 📦 Gestiona solo aplicaciones de base de datos

D) 🌐 Gestiona aplicaciones de red

**Respuesta correcta**: A) 🔧 Gestiona aplicaciones con estado con identidades de red estables

💡 Los StatefulSets proporcionan identificadores de red estables y únicos, almacenamiento persistente estable, y despliegue y escalado ordenado y elegante! 🗄️

### 2. 🚀 ¿Qué es un Job en Kubernetes? 🟡

A) 🚀 Ejecuta una tarea hasta completarse (no continuamente)

B) 🔄 Ejecuta un servicio continuo

C) 📦 Ejecuta un proceso en segundo plano

D) 🌐 Ejecuta un servicio de red

**Respuesta correcta**: A) 🚀 Ejecuta una tarea hasta completarse (no continuamente)

⚡ Los Jobs son perfectos para procesamiento por lotes, migraciones de datos, o tareas únicas. ¡Crean Pods y aseguran que se completen exitosamente! ✅

### 3. 🔍 ¿Qué es un CronJob? 🔴

A) 🔍 Ejecuta Jobs en un horario basado en tiempo

B) 🔄 Ejecuta Jobs continuamente

C) 📦 Ejecuta Jobs aleatoriamente

D) 🌐 Ejecuta Jobs bajo demanda

**Respuesta correcta**: A) 🔍 Ejecuta Jobs en un horario basado en tiempo

⏰ Los CronJobs son como cron en Linux pero para Kubernetes! ¡Perfectos para respaldos, tareas de mantenimiento, o procesamiento periódico de datos! 🕐

### 4. 📦 ¿Qué es un HorizontalPodAutoscaler (HPA)? 🔴

A) 📦 Escala automáticamente Pods basado en uso de CPU/memoria

B) 🔄 Escala Pods manualmente

C) 📦 Escala nodos automáticamente

D) 🌐 Escala servicios automáticamente

**Respuesta correcta**: A) 📦 Escala automáticamente Pods basado en uso de CPU/memoria

📈 HPA monitorea el uso de recursos y ajusta automáticamente el número de Pods. ¡Establece réplicas mín/máx y CPU/memoria objetivo! 🎯

### 5. 🔄 ¿Qué es un PodDisruptionBudget (PDB)? 🔴

A) 🔄 Limita interrupciones voluntarias durante mantenimiento

B) 🔧 Previene todas las interrupciones de Pods

C) 📦 Gestiona programación de Pods

D) 🌐 Gestiona redes de Pods

**Respuesta correcta**: A) 🔄 Limita interrupciones voluntarias durante mantenimiento

🛡️ PDB asegura disponibilidad durante interrupciones voluntarias como mantenimiento de nodos o actualizaciones del clúster. ¡Establece minAvailable o maxUnavailable! 🚫

### 6. 🌟 ¿Qué es una NetworkPolicy? 🔴

A) 🌟 Controla comunicación Pod-a-Pod dentro del clúster

B) 🔄 Controla acceso de red externo

C) 📦 Controla acceso de almacenamiento

D) 🌐 Controla resolución DNS

**Respuesta correcta**: A) 🌟 Controla comunicación Pod-a-Pod dentro del clúster

🔒 Las NetworkPolicies definen qué Pods pueden comunicarse entre sí. ¡Como un firewall para tu clúster! 🚪

### 7. 🔧 ¿Qué es un ResourceQuota? 🔴

A) 🔧 Limita consumo de recursos por namespace

B) 🔄 Limita consumo de recursos por Pod

C) 📦 Limita consumo de recursos por nodo

D) 🌐 Limita consumo de recursos por clúster

**Respuesta correcta**: A) 🔧 Limita consumo de recursos por namespace

💰 Los ResourceQuotas previenen que un namespace consuma todos los recursos del clúster. ¡Establece límites para CPU, memoria, almacenamiento y conteos de objetos! 📊

### 8. 📋 ¿Qué es un LimitRange? 🟡

A) 📋 Establece límites de recursos por defecto para Pods en un namespace

B) 🔄 Establece límites de recursos para todo el clúster

C) 📦 Establece límites de recursos para nodos

D) 🌐 Establece límites de recursos para servicios

**Respuesta correcta**: A) 📋 Establece límites de recursos por defecto para Pods en un namespace

📏 Los LimitRanges proporcionan valores por defecto y restricciones para solicitudes/límites de recursos. ¡Asegura que los Pods tengan especificaciones de recursos razonables! 📐

### 9. 🔄 ¿Qué es un PodSecurityPolicy (PSP)? 🔴

A) 🔄 Controla aspectos sensibles de seguridad de la especificación de Pods

B) 🔧 Controla programación de Pods

C) 📦 Controla almacenamiento de Pods

D) 🌐 Controla redes de Pods

**Respuesta correcta**: A) 🔄 Controla aspectos sensibles de seguridad de la especificación de Pods

🛡️ Los PSPs controlan contenedores privilegiados, redes del host, tipos de volúmenes, y IDs de usuario/grupo. ¡Nota: Los PSPs están obsoletos en favor de los Estándares de Seguridad de Pods! ⚠️

### 10. 🎯 ¿Qué es un Estándar de Seguridad de Pod? 🟡

A) 🎯 Define niveles de seguridad (Privilegiado, Básico, Restringido) para Pods

B) 🔄 Define seguridad de red para Pods

C) 📦 Define seguridad de almacenamiento para Pods

D) 🌐 Define seguridad DNS para Pods

**Respuesta correcta**: A) 🎯 Define niveles de seguridad (Privilegiado, Básico, Restringido) para Pods

🔐 Los Estándares de Seguridad de Pods son el reemplazo moderno para PSPs. ¡Usa controladores de admisión para hacer cumplir estas políticas de seguridad! 🛡️

### 11. 🔍 ¿Qué es un CustomResourceDefinition (CRD)? 🔴

A) 🔍 Extiende la API de Kubernetes con recursos personalizados

B) 🔄 Crea Pods personalizados

C) 📦 Crea servicios personalizados

D) 🌐 Crea redes personalizadas

**Respuesta correcta**: A) 🔍 Extiende la API de Kubernetes con recursos personalizados

🚀 Los CRDs te permiten definir tus propios tipos de recursos! ¡Usados por operadores, charts de Helm, y controladores personalizados para extender la funcionalidad de Kubernetes! ⚡

### 12. 🚀 ¿Qué es un Operador de Kubernetes? 🔴

A) 🚀 Extiende Kubernetes con conocimiento operacional específico de aplicaciones

B) 🔄 Gestiona recursos básicos de Kubernetes

C) 📦 Gestiona solo Pods

D) 🌐 Gestiona solo servicios

**Respuesta correcta**: A) 🚀 Extiende Kubernetes con conocimiento operacional específico de aplicaciones

🤖 Los operadores automatizan operaciones complejas de aplicaciones como respaldos, actualizaciones, y escalado. ¡Usan CRDs y controladores personalizados! 🧠

### 13. 🔧 ¿Qué es un Chart de Helm? 🟡

A) 🔧 Gestor de paquetes para aplicaciones de Kubernetes

B) 🔄 Gestor de paquetes para imágenes de Docker

C) 📦 Gestor de paquetes para paquetes de Linux

D) 🌐 Gestor de paquetes para recursos de nube

**Respuesta correcta**: A) 🔧 Gestor de paquetes para aplicaciones de Kubernetes

📦 Los Charts de Helm empaquetan recursos de Kubernetes en unidades desplegables. ¡Usa `helm install` para desplegar aplicaciones complejas con un comando! 🚀

### 14. 🌟 ¿Qué es una Malla de Servicios de Kubernetes? 🔴

A) 🌟 Capa de infraestructura para comunicación servicio-a-servicio

B) 🔄 Redes básicas de servicios

C) 📦 Comunicación Pod-a-Pod

D) 🌐 Acceso de red externo

**Respuesta correcta**: A) 🌟 Capa de infraestructura para comunicación servicio-a-servicio

🕸️ Las mallas de servicios como Istio proporcionan gestión avanzada de tráfico, seguridad y observabilidad. ¡Maneja enrutamiento, reintentos, cortacircuitos y más! 🎛️

### 15. 🔄 ¿Qué es un Controlador de Ingress de Kubernetes? 🟡

A) 🔄 Implementa reglas de Ingress y gestiona acceso externo

B) 🔧 Crea recursos de Ingress

C) 📦 Gestiona servicios internos

D) 🌐 Gestiona registros DNS

**Respuesta correcta**: A) 🔄 Implementa reglas de Ingress y gestiona acceso externo

🚪 Los Controladores de Ingress (como nginx, Traefik, o específicos de nube) implementan la API de Ingress y manejan enrutamiento de tráfico externo! 🛣️

### 16. 📦 ¿Qué es un Volumen de Kubernetes? 🟡

A) 📦 Abstracción de almacenamiento que persiste más allá del ciclo de vida del Pod

B) 🔄 Almacenamiento temporal para Pods

C) 📦 Almacenamiento de red solo

D) 🌐 Almacenamiento de memoria solo

**Respuesta correcta**: A) 📦 Abstracción de almacenamiento que persiste más allá del ciclo de vida del Pod

💾 Los volúmenes proporcionan almacenamiento persistente para Pods. ¡Tipos incluyen emptyDir, hostPath, PersistentVolumeClaim, y muchos más! 🗂️

### 17. 🚀 ¿Qué es un PersistentVolume (PV)? 🔴

A) 🚀 Recurso de almacenamiento en el clúster con capacidad específica y modos de acceso

B) 🔄 Almacenamiento temporal para Pods

C) 📦 Configuración de almacenamiento de red

D) 🌐 Configuración de almacenamiento de memoria

**Respuesta correcta**: A) 🚀 Recurso de almacenamiento en el clúster con capacidad específica y modos de acceso

💿 Los PVs son recursos de almacenamiento que pueden ser reclamados por Pods. ¡Definen capacidad de almacenamiento, modos de acceso, y clase de almacenamiento! 📊

### 18. 🔧 ¿Qué es un PersistentVolumeClaim (PVC)? 🟡

A) 🔧 Solicitud de almacenamiento por un Pod

B) 🔄 Solicitud de acceso de red

C) 📦 Solicitud de recursos de CPU

D) 🌐 Solicitud de recursos de memoria

**Respuesta correcta**: A) 🔧 Solicitud de almacenamiento por un Pod

📝 Los PVCs solicitan almacenamiento de PVs. ¡Especifican tamaño, modos de acceso, y clase de almacenamiento. Los Pods usan PVCs para obtener almacenamiento persistente! 🔗

### 19. 🌟 ¿Qué es una StorageClass? 🟡

A) 🌟 Define provisionador de almacenamiento y parámetros

B) 🔄 Define clases de red

C) 📦 Define clases de Pods

D) 🌐 Define clases de servicios

**Respuesta correcta**: A) 🌟 Define provisionador de almacenamiento y parámetros

⚙️ Las StorageClasses definen cómo se provisiona el almacenamiento. ¡Especifican el provisionador (como AWS EBS, GCP PD) y parámetros como IOPS, tipo, etc.! 🔧

### 20. 🔄 ¿Qué es un ConfigMap de Kubernetes? 🟡

A) 🔄 Almacena datos de configuración no sensibles

B) 🔐 Almacena datos de configuración sensibles

C) 📦 Almacena datos de configuración binarios

D) 🌐 Almacena datos de configuración de red

**Respuesta correcta**: A) 🔄 Almacena datos de configuración no sensibles

📋 Los ConfigMaps almacenan configuración como variables de entorno, argumentos de línea de comandos, o archivos de configuración. ¡Monta los en Pods! 📄

### 21. 🎯 ¿Cuál es la mejor práctica para seguridad en Kubernetes? 🔴

A) 🎯 Usar RBAC, políticas de red, estándares de seguridad de Pods, y actualizaciones regulares

B) 🔄 Usar solo autenticación básica

C) 📦 Ignorar políticas de seguridad

D) 🌐 Usar solo configuraciones por defecto

**Respuesta correcta**: A) 🎯 Usar RBAC, políticas de red, estándares de seguridad de Pods, y actualizaciones regulares

🛡️ Los clústeres de producción necesitan: Control de Acceso Basado en Roles (RBAC), NetworkPolicies, Estándares de Seguridad de Pods, actualizaciones de seguridad regulares, y gestión adecuada de secretos. ¡La seguridad es primordial! 🔒
