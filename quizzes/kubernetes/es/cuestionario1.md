# ☸️ Kubernetes - Cuestionario 1

## Preguntas

### 1. ☸️ ¿Qué es Kubernetes? 🟢

A) ☸️ Plataforma de orquestación de contenedores

B) 🔧 Sistema de virtualización

C) 📦 Gestor de paquetes

D) 🌐 Servidor web

**Respuesta correcta**: A) ☸️ Plataforma de orquestación de contenedores

> 💡 Kubernetes automatiza el despliegue, escalado y gestión de aplicaciones en contenedores. ¡Como un director de orquesta para tus aplicaciones!

### 2. 🐳 ¿Qué es un Pod en Kubernetes? 🟢

A) 🐳 Unidad más pequeña de despliegue

B) 🔧 Contenedor individual

C) 📦 Paquete de aplicación

D) 🌐 Servicio de red

**Respuesta correcta**: A) 🐳 Unidad más pequeña de despliegue

> 📘 Un Pod puede contener uno o más contenedores que comparten recursos. ¡Como una habitación donde viven tus aplicaciones!

### 3. 🔄 ¿Qué es un Deployment? 🟡

A) 🔄 Recurso que gestiona el estado deseado de los Pods

B) 🔧 Proceso de instalación

C) 📦 Paquete de despliegue

D) 🌐 Configuración de red

**Respuesta correcta**: A) 🔄 Recurso que gestiona el estado deseado de los Pods

> ⚡ Los Deployments aseguran que el número correcto de Pods esté ejecutándose. ¡Como un supervisor que mantiene todo funcionando!

### 4. 🌐 ¿Qué es un Service? 🟡

A) 🌐 Abstracción que expone aplicaciones

B) 🔧 Servicio del sistema

C) 📦 Paquete de red

D) ⚙️ Configuración de red

**Respuesta correcta**: A) 🌐 Abstracción que expone aplicaciones

> 💡 Los Services permiten que las aplicaciones se comuniquen entre sí. ¡Como un directorio telefónico para tus aplicaciones!

### 5. 📦 ¿Qué es un ConfigMap? 🟡

A) 📦 Almacenar configuración no sensible

B) 🔧 Archivo de configuración

C) 📄 Documento de configuración

D) 🌐 Configuración de red

**Respuesta correcta**: A) 📦 Almacenar configuración no sensible

> 🔧 ConfigMaps separan la configuración del código de aplicación. ¡Como tener ajustes externos sin tocar el código!

### 6. 🔐 ¿Qué es un Secret? 🟡

A) 🔐 Almacenar información sensible de forma segura

B) 🔒 Contraseña de acceso

C) 🛡️ Sistema de autenticación

D) 🔑 Clave de encriptación

**Respuesta correcta**: A) 🔐 Almacenar información sensible de forma segura

> 🔒 Los Secrets guardan datos sensibles como passwords, tokens, keys. ¡Como una caja fuerte para información crítica!

### 7. 🗂️ ¿Qué es un Namespace? 🟡

A) 🗂️ Separación lógica de recursos en el clúster

B) 🔧 Nombre del clúster

C) 📦 Espacio de almacenamiento

D) 🌐 Espacio de red

**Respuesta correcta**: A) 🗂️ Separación lógica de recursos en el clúster

> 🏢 Los Namespaces son como departamentos en una empresa. Separan recursos para diferentes equipos o entornos.

### 8. 🎯 ¿Qué es un Ingress? 🔴

A) 🎯 Gestiona acceso HTTP/HTTPS externo a services

B) 🔧 Punto de entrada del clúster

C) 📦 Balanceador de carga

D) 🌐 Proxy reverso

**Respuesta correcta**: A) 🎯 Gestiona acceso HTTP/HTTPS externo a services

> 🚪 Ingress es como la recepción de un edificio, dirigiendo tráfico externo a los servicios correctos dentro del clúster.

### 9. 💾 ¿Qué es un PersistentVolume? 🔴

A) 💾 Almacenamiento independiente del ciclo de vida del Pod

B) 🔧 Volumen temporal

C) 📦 Almacenamiento del contenedor

D) 🌐 Almacenamiento de red

**Respuesta correcta**: A) 💾 Almacenamiento independiente del ciclo de vida del Pod

> 🗄️ Los PersistentVolumes sobreviven a los Pods. ¡Como un disco duro externo que persiste aunque cambies de computadora!

### 10. 🔄 ¿Qué es un ReplicaSet? 🟡

A) 🔄 Asegura que un número específico de Pods estén ejecutándose

B) 🔧 Copia de seguridad de Pods

C) 📦 Conjunto de réplicas

D) 🌐 Red de réplicas

**Respuesta correcta**: A) 🔄 Asegura que un número específico de Pods estén ejecutándose

> 🎭 Los ReplicaSets mantienen el número deseado de Pods idénticos. ¡Como un manager que asegura tener suficiente personal!

### 11. 📊 ¿Qué es un DaemonSet? 🔴

A) 📊 Asegura que todos los nodos ejecuten una copia de un Pod

B) 🔧 Demonio del sistema

C) 📦 Conjunto de servicios

D) 🌐 Set de configuración

**Respuesta correcta**: A) 📊 Asegura que todos los nodos ejecuten una copia de un Pod

> 🏭 DaemonSets son perfectos para servicios que necesitan ejecutarse en cada nodo: logging, monitoring, storage drivers.

### 12. ⚖️ ¿Qué es un HorizontalPodAutoscaler? 🔴

A) ⚖️ Escala automáticamente Pods basado en métricas

B) 🔧 Balanceador horizontal

C) 📦 Escalador de aplicaciones

D) 🌐 Distribuidor de carga

**Respuesta correcta**: A) ⚖️ Escala automáticamente Pods basado en métricas

> 📈 HPA escala Pods según CPU, memoria o métricas custom. ¡Como contratar más personal cuando hay mucho trabajo!

### 13. 🔗 ¿Qué tipos de Services existen? 🔴

A) 🔗 ClusterIP, NodePort, LoadBalancer, ExternalName

B) 🔧 Internal, External, Public, Private

C) 📦 HTTP, HTTPS, TCP, UDP

D) 🌐 Frontend, Backend, Database, Cache

**Respuesta correcta**: A) 🔗 ClusterIP, NodePort, LoadBalancer, ExternalName

> 🌐 Cada tipo expone servicios de manera diferente: ClusterIP (interno), NodePort (puerto del nodo), LoadBalancer (cloud), ExternalName (DNS).

### 14. 🎮 ¿Qué es kubectl? 🟢

A) 🎮 Cliente de línea de comandos para Kubernetes

B) 🔧 Componente del master

C) 📦 API de Kubernetes

D) 🌐 Dashboard web

**Respuesta correcta**: A) 🎮 Cliente de línea de comandos para Kubernetes

> 🕹️ kubectl es tu control remoto para Kubernetes. ¡Como un mando universal para gestionar todo tu clúster!

### 15. 🏗️ ¿Qué son los nodos master y worker? 🟡

A) 🏗️ Master gestiona el clúster, workers ejecutan las aplicaciones

B) 🔧 Master guarda datos, workers procesan

C) 📦 Master es principal, worker es secundario

D) 🌐 Master conecta, worker trabaja

**Respuesta correcta**: A) 🏗️ Master gestiona el clúster, workers ejecutan las aplicaciones

> 👑 El master (control plane) toma decisiones, los workers (nodos de trabajo) ejecutan los Pods. ¡Como un gerente y sus empleados!

### 16. 📋 ¿Qué es un Job en Kubernetes? 🔴

A) 📋 Ejecuta Pods hasta completar una tarea específica

B) 🔧 Trabajo de mantenimiento

C) 📦 Tarea programada

D) 🌐 Trabajo de red

**Respuesta correcta**: A) 📋 Ejecuta Pods hasta completar una tarea específica

> ✅ Jobs ejecutan tareas que deben completarse: procesamiento batch, migraciones, backups. ¡Como asignar una tarea específica con fecha límite!

### 17. ⏰ ¿Qué es un CronJob? 🔴

A) ⏰ Job que se ejecuta según un horario programado

B) 🔧 Tarea cron del sistema

C) 📦 Trabajo cronometrado

D) 🌐 Planificador de tareas

**Respuesta correcta**: A) ⏰ Job que se ejecuta según un horario programado

> 📅 CronJobs son como tareas programadas: backups diarios, reportes semanales, limpiezas mensuales. ¡Automatización temporal!

### 18. 🔧 ¿Qué componentes tiene el Control Plane? 🔴

A) 🔧 API Server, etcd, Scheduler, Controller Manager

B) 🏗️ Master, Worker, Storage, Network

C) 📦 Frontend, Backend, Database, Cache

D) 🌐 Load Balancer, Proxy, Gateway, Router

**Respuesta correcta**: A) 🔧 API Server, etcd, Scheduler, Controller Manager

> 🧠 El Control Plane es el cerebro: API Server (comunica), etcd (almacena), Scheduler (planifica), Controller Manager (mantiene estado).

### 19. 🌐 ¿Qué es un CNI en Kubernetes? 🔴

A) 🌐 Interface estándar para plugins de red

B) 🔧 Componente de red interno

C) 📦 Controlador de red

D) 🎯 API de red

**Respuesta correcta**: A) 🌐 Interface estándar para plugins de red

> 🔌 CNI (Container Network Interface) permite diferentes soluciones de red: Calico, Flannel, Weave. ¡Como diferentes tipos de conexión de internet!

### 20. 🛡️ ¿Qué es RBAC en Kubernetes? 🔴

A) 🛡️ Control de acceso basado en roles

B) 🔧 Sistema de autenticación

C) 📦 Configuración de roles

D) 🌐 Control de red

**Respuesta correcta**: A) 🛡️ Control de acceso basado en roles

> 🔐 RBAC define quién puede hacer qué en el clúster. Roles + RoleBindings = permisos específicos. ¡Como badges de acceso en una empresa!

### 21. 🎯 ¿Cuáles son las mejores prácticas para Kubernetes? 🔴

A) 🎯 Usar namespaces, limits de recursos, health checks, políticas de seguridad

B) 🔧 Solo usar Pods directamente

C) 📦 No usar Services

D) 🌐 Evitar ConfigMaps

**Respuesta correcta**: A) 🎯 Usar namespaces, limits de recursos, health checks, políticas de seguridad

> 🏆 Mejores prácticas: organizar con namespaces, definir resource limits, implementar liveness/readiness probes, usar RBAC, aplicar network policies. ¡Kubernetes profesional!
