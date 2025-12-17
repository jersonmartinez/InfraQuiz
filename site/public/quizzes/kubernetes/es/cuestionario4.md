# ☸️ Kubernetes Avanzado - Cuestionario 4

## Preguntas

### 1. ❓ ¿Qué es un Custom Resource Definition (CRD) en Kubernetes? 🔴

A) 📝 Una forma de extender la API de Kubernetes con recursos personalizados

B) ⚙️ Un tipo de pod especial para aplicaciones personalizadas

C) 🔧 Un controlador personalizado para gestionar recursos

D) 🐳 Un namespace personalizado para organizar recursos

**Respuesta Correcta**: A) 📝 Una forma de extender la API de Kubernetes con recursos personalizados

💡 Los CRDs permiten definir nuevos tipos de recursos personalizados en Kubernetes, extendiendo la funcionalidad del cluster sin modificar el código base.

### 2. 🧠 ¿Cuál es el propósito de un Operator en Kubernetes? 🔴

A) 📝 Automatizar operaciones complejas y gestionar el ciclo de vida de aplicaciones

B) ⚙️ Gestionar el acceso de usuarios a recursos del cluster

C) 🔧 Configurar políticas de red y seguridad

D) 🐳 Monitorear el rendimiento del cluster

**Respuesta Correcta**: A) 📝 Automatizar operaciones complejas y gestionar el ciclo de vida de aplicaciones

💡 Los Operators encapsulan conocimiento operacional en software, automatizando tareas complejas como backups, actualizaciones y recuperación de desastres.

### 3. 🤔 ¿Qué es un Admission Controller en Kubernetes? 🔴

A) 📝 Un plugin que intercepta y valida requests antes de ser procesados

B) ⚙️ Un controlador que gestiona la admisión de pods al cluster

C) 🔧 Un servicio que valida la configuración de recursos

D) 🐳 Un componente que gestiona la autenticación de usuarios

**Respuesta Correcta**: A) 📝 Un plugin que intercepta y valida requests antes de ser procesados

💡 Los Admission Controllers interceptan requests a la API server y pueden modificar, rechazar o validar recursos antes de ser almacenados en etcd.

### 4. 🔍 ¿Cuál es el propósito de un Mutating Admission Controller? 🔴

A) 📝 Modificar recursos antes de ser almacenados en etcd

B) ⚙️ Validar recursos sin modificarlos

C) 🔧 Rechazar recursos que no cumplan políticas

D) 🐳 Gestionar el ciclo de vida de recursos

**Respuesta Correcta**: A) 📝 Modificar recursos antes de ser almacenados en etcd

💡 Los Mutating Admission Controllers pueden modificar recursos (como agregar labels, sidecars, o configuraciones) antes de ser procesados por el cluster.

### 5. ❓ ¿Qué es un Validating Admission Controller? 🔴

A) 📝 Validar recursos sin modificarlos

B) ⚙️ Modificar recursos antes de ser almacenados

C) 🔧 Gestionar la replicación de recursos

D) 🐳 Controlar el acceso a recursos

**Respuesta Correcta**: A) 📝 Validar recursos sin modificarlos

💡 Los Validating Admission Controllers verifican que los recursos cumplan con políticas específicas sin modificarlos, rechazando requests que violen las reglas.

### 6. 🧠 ¿Cuál es el propósito de un Service Mesh en Kubernetes? 🔴

A) 📝 Gestionar la comunicación entre servicios de manera transparente

B) ⚙️ Gestionar el almacenamiento persistente

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear el rendimiento del cluster

**Respuesta Correcta**: A) 📝 Gestionar la comunicación entre servicios de manera transparente

💡 Los Service Meshes como Istio proporcionan funcionalidades como load balancing, service discovery, observabilidad y políticas de seguridad para la comunicación entre servicios.

### 7. 🤔 ¿Qué es un HorizontalPodAutoscaler (HPA)? 🔴

A) 📝 Escalar automáticamente el número de pods basándose en métricas

B) ⚙️ Escalar verticalmente los recursos de un pod

C) 🔧 Gestionar la distribución de pods en nodos

D) 🐳 Controlar el acceso a recursos del cluster

**Respuesta Correcta**: A) 📝 Escalar automáticamente el número de pods basándose en métricas

💡 El HPA ajusta automáticamente el número de réplicas de un Deployment basándose en métricas como CPU, memoria o métricas personalizadas.

### 8. 🔍 ¿Cuál es el propósito de un VerticalPodAutoscaler (VPA)? 🔴

A) 📝 Ajustar automáticamente los recursos de CPU y memoria de pods

B) ⚙️ Escalar horizontalmente el número de pods

C) 🔧 Gestionar la distribución de pods en nodos

D) 🐳 Controlar políticas de red

**Respuesta Correcta**: A) 📝 Ajustar automáticamente los recursos de CPU y memoria de pods

💡 El VPA optimiza automáticamente las requests y limits de CPU y memoria de pods basándose en el uso real, mejorando la utilización de recursos.

### 9. ❓ ¿Qué es un Pod Disruption Budget (PDB)? 🔴

A) 📝 Limitar el número de pods que pueden ser interrumpidos simultáneamente

B) ⚙️ Gestionar el presupuesto de recursos del cluster

C) 🔧 Controlar el acceso a recursos

D) 🐳 Monitorear el rendimiento de pods

**Respuesta Correcta**: A) 📝 Limitar el número de pods que pueden ser interrumpidos simultáneamente

💡 Los PDBs protegen aplicaciones durante operaciones de mantenimiento limitando cuántos pods pueden estar down al mismo tiempo.

### 10. 🧠 ¿Cuál es el propósito de un Network Policy en Kubernetes? 🔴

A) 📝 Controlar el tráfico de red entre pods y namespaces

B) ⚙️ Gestionar la configuración de red del cluster

C) 🔧 Configurar load balancers

D) 🐳 Monitorear el tráfico de red

**Respuesta Correcta**: A) 📝 Controlar el tráfico de red entre pods y namespaces

💡 Las Network Policies permiten definir reglas de firewall a nivel de pod, controlando qué pods pueden comunicarse entre sí y con servicios externos.

### 11. 🤔 ¿Qué es un Pod Security Policy (PSP)? 🔴

A) 📝 Definir políticas de seguridad para pods antes de ser creados

B) ⚙️ Gestionar la autenticación de usuarios

C) 🔧 Configurar políticas de red

D) 🐳 Controlar el acceso a recursos

**Respuesta Correcta**: A) 📝 Definir políticas de seguridad para pods antes de ser creados

💡 Los PSPs controlan aspectos de seguridad como privilegios, capacidades, y volúmenes que pueden ser usados por pods, mejorando la seguridad del cluster.

### 12. 🔍 ¿Cuál es el propósito de un ResourceQuota en Kubernetes? 🔴

A) 📝 Limitar el consumo total de recursos en un namespace

B) ⚙️ Gestionar la distribución de recursos entre nodos

C) 🔧 Controlar el acceso a recursos

D) 🐳 Monitorear el uso de recursos

**Respuesta Correcta**: A) 📝 Limitar el consumo total de recursos en un namespace

💡 Los ResourceQuotas establecen límites en el consumo total de recursos (CPU, memoria, pods) dentro de un namespace específico.

### 13. ❓ ¿Qué es un LimitRange en Kubernetes? 🔴

A) 📝 Establecer límites por defecto para recursos de pods en un namespace

B) ⚙️ Limitar el número total de recursos en un namespace

C) 🔧 Controlar el acceso a recursos

D) 🐳 Monitorear el rendimiento del cluster

**Respuesta Correcta**: A) 📝 Establecer límites por defecto para recursos de pods en un namespace

💡 Los LimitRanges establecen valores por defecto y límites para requests y limits de CPU y memoria de pods individuales.

### 14. 🧠 ¿Cuál es el propósito de un ClusterRole en Kubernetes? 🔴

A) 📝 Definir permisos que se aplican a todo el cluster

B) ⚙️ Gestionar roles específicos de namespace

C) 🔧 Controlar el acceso a recursos específicos

D) 🐳 Monitorear la actividad del cluster

**Respuesta Correcta**: A) 📝 Definir permisos que se aplican a todo el cluster

💡 Los ClusterRoles definen permisos que se aplican a nivel de cluster, no limitados a un namespace específico.

### 15. 🤔 ¿Qué es un ClusterRoleBinding en Kubernetes? 🔴

A) 📝 Vincular un ClusterRole con usuarios, grupos o ServiceAccounts

B) ⚙️ Gestionar roles específicos de namespace

C) 🔧 Controlar el acceso a recursos específicos

D) 🐳 Monitorear la actividad del cluster

**Respuesta Correcta**: A) 📝 Vincular un ClusterRole con usuarios, grupos o ServiceAccounts

💡 Los ClusterRoleBindings asignan permisos de ClusterRole a entidades, permitiendo acceso a recursos en todo el cluster.

### 16. 🔍 ¿Cuál es el propósito de un ServiceAccount en Kubernetes? 🔴

A) 📝 Proporcionar identidad para pods que se comunican con la API

B) ⚙️ Gestionar cuentas de usuario del cluster

C) 🔧 Controlar el acceso a recursos

D) 🐳 Monitorear la actividad de pods

**Respuesta Correcta**: A) 📝 Proporcionar identidad para pods que se comunican con la API

💡 Los ServiceAccounts proporcionan identidad a pods, permitiéndoles autenticarse con la API server y acceder a recursos según sus permisos.

### 17. ❓ ¿Qué es un PersistentVolumeClaim (PVC) en Kubernetes? 🔴

A) 📝 Solicitar almacenamiento persistente del cluster

B) ⚙️ Gestionar volúmenes temporales

C) 🔧 Configurar políticas de almacenamiento

D) 🐳 Monitorear el uso de almacenamiento

**Respuesta Correcta**: A) 📝 Solicitar almacenamiento persistente del cluster

💡 Los PVCs permiten a los usuarios solicitar almacenamiento persistente sin conocer los detalles de la implementación del almacenamiento.

### 18. 🧠 ¿Cuál es el propósito de un StorageClass en Kubernetes? 🔴

A) 📝 Definir diferentes tipos de almacenamiento disponibles en el cluster

B) ⚙️ Gestionar volúmenes temporales

C) 🔧 Configurar políticas de backup

D) 🐳 Monitorear el rendimiento de almacenamiento

**Respuesta Correcta**: A) 📝 Definir diferentes tipos de almacenamiento disponibles en el cluster

💡 Los StorageClasses permiten a los administradores definir diferentes tipos de almacenamiento con diferentes características y políticas.

### 19. 🤔 ¿Qué es un ConfigMap en Kubernetes? 🔴

A) 📝 Almacenar datos de configuración no confidenciales

B) ⚙️ Gestionar secretos y credenciales

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear la configuración del cluster

**Respuesta Correcta**: A) 📝 Almacenar datos de configuración no confidenciales

💡 Los ConfigMaps permiten desacoplar la configuración de la imagen del contenedor, facilitando la portabilidad de aplicaciones.

### 20. 🔍 ¿Cuál es el propósito de un Secret en Kubernetes? 🔴

A) 📝 Almacenar datos sensibles como contraseñas y tokens

B) ⚙️ Gestionar configuraciones no confidenciales

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear la seguridad del cluster

**Respuesta Correcta**: A) 📝 Almacenar datos sensibles como contraseñas y tokens

💡 Los Secrets almacenan información sensible como contraseñas, tokens OAuth y claves SSH, proporcionando una forma segura de gestionar credenciales.

### 21. ❓ ¿Qué es un DaemonSet en Kubernetes? 🔴

A) 📝 Asegurar que todos los nodos ejecuten una copia de un pod específico

B) ⚙️ Gestionar aplicaciones con estado

C) 🔧 Configurar políticas de red

D) 🐳 Monitorear el rendimiento del cluster

**Respuesta Correcta**: A) 📝 Asegurar que todos los nodos ejecuten una copia de un pod específico

💡 Los DaemonSets son útiles para ejecutar servicios de sistema como agentes de monitoreo, recolectores de logs, o agentes de almacenamiento en cada nodo.

🔴
