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

> 🔧 Los ConfigMaps separan la configuración del código de la aplicación. ¡Como tener configuraciones externas sin tocar el código!

### 6. 🔐 ¿Qué es un Secret? 🟡

A) 🔐 Almacenar información sensible de forma segura

B) 🔒 Contraseña de acceso

C) 🛡️ Sistema de autenticación

D) 🔑 Clave de cifrado

**Respuesta correcta**: A) 🔐 Almacenar información sensible de forma segura

> 🔒 Los Secrets almacenan datos sensibles como contraseñas, tokens, claves. ¡Como una caja fuerte para información crítica!

### 7. 🗂️ ¿Qué es un Namespace? 🟡

A) 🗂️ Separación lógica de recursos en el clúster

B) 🔧 Nombre del clúster

C) 📦 Espacio de almacenamiento

D) 🌐 Espacio de red

**Respuesta correcta**: A) 🗂️ Separación lógica de recursos en el clúster

> 🏢 Los Namespaces son como departamentos en una empresa. Separan recursos para diferentes equipos o entornos.

### 8. 🎯 ¿Qué es un Ingress? 🔴

A) 🎯 Gestiona acceso HTTP/HTTPS externo a servicios

B) 🔧 Punto de entrada del clúster

C) 📦 Balanceador de carga

D) 🌐 Proxy inverso

**Respuesta correcta**: A) 🎯 Gestiona acceso HTTP/HTTPS externo a servicios

> 🚪 Ingress es como la recepción de un edificio, dirigiendo el tráfico externo a los servicios correctos dentro del clúster.

### 9. 💾 ¿Qué es un PersistentVolume? 🔴

A) 💾 Almacenamiento independiente del ciclo de vida del Pod

B) 🔧 Volumen temporal

C) 📦 Almacenamiento de contenedor

D) 🌐 Almacenamiento de red

**Respuesta correcta**: A) 💾 Almacenamiento independiente del ciclo de vida del Pod

> 🗄️ Los PersistentVolumes sobreviven a los Pods. ¡Como un disco duro externo que persiste aunque cambies de computadora!

### 10. 🔄 ¿Qué es un ReplicaSet? 🟡

A) 🔄 Asegura que un número específico de Pods esté ejecutándose

B) 🔧 Respaldo de Pod

C) 📦 Conjunto de réplicas

D) 🌐 Red de réplicas

**Respuesta correcta**: A) 🔄 Asegura que un número específico de Pods esté ejecutándose

> 🎭 Los ReplicaSets mantienen el número deseado de Pods idénticos. ¡Como un gerente que asegura tener suficiente personal!

### 11. 📊 ¿Qué es un DaemonSet? 🔴

A) 📊 Asegura que todos los nodos ejecuten una copia de un Pod

B) 🔧 Demonio del sistema

C) 📦 Paquete de demonio

D) 🌐 Demonio de red

**Respuesta correcta**: A) 📊 Asegura que todos los nodos ejecuten una copia de un Pod

> 🔄 Los DaemonSets ejecutan exactamente un Pod en cada nodo. ¡Como tener un guardia de seguridad en cada piso de un edificio!

### 12. 🔧 ¿Cómo creas un Pod desde línea de comandos? 🟡

A) 🔧 `kubectl run mi-pod --image=nginx`

B) 🔄 `kube create pod mi-pod nginx`

C) 📦 `k8s run mi-pod nginx`

D) 🌐 `docker run mi-pod nginx`

**Respuesta correcta**: A) 🔧 `kubectl run mi-pod --image=nginx`

> ⚡ `kubectl run` es la forma imperativa de crear Pods. ¡Para producción, prefiere archivos YAML declarativos!

### 13. 📋 ¿Cómo obtienes información sobre Pods? 🟢

A) 📋 `kubectl get pods`

B) 🔄 `kube list pods`

C) 📦 `k8s show pods`

D) 🌐 `docker ps pods`

**Respuesta correcta**: A) 📋 `kubectl get pods`

> 🔍 `kubectl get` muestra información básica. ¡Usa `kubectl describe pod <nombre>` para información detallada!

### 14. 🔍 ¿Cómo ves los logs de un Pod? 🟢

A) 🔍 `kubectl logs <nombre-pod>`

B) 🔄 `kube logs <nombre-pod>`

C) 📦 `k8s logs <nombre-pod>`

D) 🌐 `docker logs <nombre-pod>`

**Respuesta correcta**: A) 🔍 `kubectl logs <nombre-pod>`

> 📝 Usa `kubectl logs -f <nombre-pod>` para seguir logs en tiempo real. ¡Añade `-c <nombre-contenedor>` para Pods multi-contenedor!

### 15. 🏗️ ¿Cómo aplicas una configuración YAML? 🟡

A) 🏗️ `kubectl apply -f config.yaml`

B) 🔄 `kube apply config.yaml`

C) 📦 `k8s deploy config.yaml`

D) 🌐 `docker apply config.yaml`

**Respuesta correcta**: A) 🏗️ `kubectl apply -f config.yaml`

> 📄 `kubectl apply` es declarativo - crea o actualiza recursos. ¡Usa `kubectl create` para creación imperativa!

### 16. 🗑️ ¿Cómo eliminas un Pod? 🟢

A) 🗑️ `kubectl delete pod <nombre-pod>`

B) 🔄 `kube delete <nombre-pod>`

C) 📦 `k8s remove <nombre-pod>`

D) 🌐 `docker rm <nombre-pod>`

**Respuesta correcta**: A) 🗑️ `kubectl delete pod <nombre-pod>`

> ⚠️ ¡Ten cuidado! Eliminar Pods gestionados por Deployments disparará la recreación. ¡Elimina el Deployment en su lugar!

### 17. 🌐 ¿Cómo expones un Deployment como Service? 🟡

A) 🌐 `kubectl expose deployment <nombre> --type=LoadBalancer --port=80`

B) 🔄 `kube expose <nombre> --port=80`

C) 📦 `k8s service <nombre> --port=80`

D) 🔧 `docker expose <nombre> --port=80`

**Respuesta correcta**: A) 🌐 `kubectl expose deployment <nombre> --type=LoadBalancer --port=80`

> 🚪 Esto crea un Service que enruta tráfico a Pods gestionados por el Deployment. ¡Elige el tipo de servicio correcto para tus necesidades!

### 18. 🔧 ¿Cómo escalas un Deployment? 🟡

A) 🔧 `kubectl scale deployment <nombre> --replicas=5`

B) 🔄 `kube scale <nombre> --replicas=5`

C) 📦 `k8s scale <nombre> 5`

D) 🌐 `docker scale <nombre> 5`

**Respuesta correcta**: A) 🔧 `kubectl scale deployment <nombre> --replicas=5`

> 📈 El escalado ajusta el número de réplicas de Pod. ¡Kubernetes creará o destruirá Pods para coincidir con el conteo deseado!

### 19. 🔍 ¿Cómo obtienes información detallada sobre un recurso? 🟡

A) 🔍 `kubectl describe <tipo-recurso> <nombre>`

B) 🔄 `kube describe <nombre>`

C) 📦 `k8s info <nombre>`

D) 🌐 `docker inspect <nombre>`

**Respuesta correcta**: A) 🔍 `kubectl describe <tipo-recurso> <nombre>`

> 📋 `kubectl describe` muestra información detallada incluyendo eventos. ¡Muy útil para resolución de problemas!

### 20. ⚙️ ¿Cómo editas un recurso directamente? 🔴

A) ⚙️ `kubectl edit <tipo-recurso> <nombre>`

B) 🔄 `kube edit <nombre>`

C) 📦 `k8s modify <nombre>`

D) 🌐 `vim <nombre>`

**Respuesta correcta**: A) ⚙️ `kubectl edit <tipo-recurso> <nombre>`

> ✏️ Abre el recurso en tu editor predeterminado. Los cambios se aplican inmediatamente. ¡Prefiere archivos YAML declarativos para producción!
