# Cuestionario DevOps Mixto 2 - Intermedio

❓ ¿Cuál es el propósito principal de un service mesh en microservicios? 🟡

📝 Gestión de comunicación entre servicios
⚙️ Pool de conexiones de base de datos
🧱 Solo balanceo de carga
📦 Solo autenticación

💡 Los service meshes gestionan la comunicación entre servicios, seguridad y observabilidad en arquitecturas de microservicios.

---

❓ ¿Qué herramienta se usa comúnmente para infraestructura como código en AWS? 🟢

📝 Terraform
⚙️ Ansible
🧱 Chef
📦 Puppet

💡 Terraform es una herramienta popular de IaC que puede provisionar y gestionar recursos AWS usando archivos de configuración declarativos.

---

❓ ¿Qué enfatiza la metodología "12-Factor App"? 🟡

📝 Principios de diseño de aplicaciones nativas de la nube
⚙️ Optimización de base de datos
🧱 Fortalecimiento de seguridad
📦 Ajuste de rendimiento

💡 La metodología 12-Factor App proporciona guías para construir aplicaciones escalables y mantenibles nativas de la nube.

---

❓ ¿Qué herramienta de monitoreo es de código abierto y se usa comúnmente con Kubernetes? 🟢

📝 Prometheus
⚙️ Nagios
🧱 Zabbix
📦 Datadog

💡 Prometheus es un kit de herramientas popular de monitoreo y alertas de código abierto diseñado para entornos nativos de la nube.

---

❓ ¿Cuál es el propósito del despliegue blue-green? 🟢

📝 Actualizaciones de aplicación sin tiempo de inactividad
⚙️ Migraciones de base de datos
🧱 Actualizaciones de seguridad
📦 Optimización de rendimiento

💡 El despliegue blue-green permite cambiar el tráfico entre dos entornos de producción idénticos para actualizaciones sin tiempo de inactividad.

---

❓ ¿Qué protocolo se usa comúnmente para descubrimiento de servicios en microservicios? 🟡

📝 HTTP/REST
⚙️ TCP
🧱 UDP
📦 FTP

💡 HTTP/REST es el protocolo más común para comunicación y descubrimiento de servicios en arquitecturas de microservicios.

---

❓ ¿Qué previene el patrón circuit breaker? 🟡

📝 Fallas en cascada en sistemas distribuidos
⚙️ Problemas de conexión de base de datos
🧱 Latencia de red
📦 Fugas de memoria

💡 Los circuit breakers previenen fallas en cascada deteniendo temporalmente las solicitudes a servicios que fallan.

---

❓ ¿Qué herramienta se usa para orquestación de contenedores? 🟢

📝 Kubernetes
⚙️ Docker Compose
🧱 Docker Swarm
📦 Mesos

💡 Kubernetes es la plataforma de orquestación de contenedores más popular para gestionar aplicaciones containerizadas.

---

❓ ¿Cuál es el propósito de los health checks en microservicios? 🟢

📝 Monitorear disponibilidad y estado del servicio
⚙️ Rastrear autenticación de usuario
🧱 Monitorear rendimiento de base de datos
📦 Rastrear uso de API

💡 Los health checks verifican que los servicios estén ejecutándose correctamente y puedan responder a solicitudes.

---

❓ ¿Qué patrón se usa para manejar transacciones distribuidas? 🟡

📝 Patrón Saga
⚙️ Patrón Observer
🧱 Patrón Factory
📦 Patrón Singleton

💡 El patrón Saga gestiona transacciones distribuidas dividiéndolas en transacciones locales con acciones compensatorias.

---

❓ ¿Qué proporciona API Gateway en microservicios? 🟢

📝 Punto de entrada único para solicitudes del cliente
⚙️ Gestión de conexiones de base de datos
🧱 Descubrimiento de servicios
📦 Solo balanceo de carga

💡 API Gateway actúa como punto de entrada único, manejando enrutamiento, autenticación y otras preocupaciones transversales.

---

❓ ¿Qué herramienta se usa comúnmente para agregación de logs? 🟢

📝 ELK Stack (Elasticsearch, Logstash, Kibana)
⚙️ Prometheus
🧱 Grafana
📦 Jaeger

💡 ELK Stack es una solución popular para recopilar, procesar y visualizar logs de múltiples fuentes.

---

❓ ¿Cuál es el propósito del rate limiting en APIs? 🟢

📝 Prevenir abuso de API y asegurar uso justo
⚙️ Mejorar rendimiento
🧱 Reducir costos
📦 Mejorar seguridad

💡 El rate limiting previene el abuso limitando el número de solicitudes que un cliente puede hacer en un período de tiempo dado.

---

❓ ¿Qué patrón se usa para manejar consistencia eventual? 🟡

📝 Event sourcing
⚙️ CQRS
🧱 Patrón Saga
📦 Circuit breaker

💡 Event sourcing almacena todos los cambios como una secuencia de eventos, permitiendo consistencia eventual y auditorías.

---

❓ ¿Qué hace un load balancer? 🟢

📝 Distribuir tráfico a través de múltiples servidores
⚙️ Almacenar datos de sesión
🧱 Autenticar usuarios
📦 Cachear respuestas

💡 Los load balancers distribuyen el tráfico entrante a través de múltiples servidores para mejorar el rendimiento y disponibilidad.

---

❓ ¿Qué herramienta se usa para integración continua? 🟢

📝 Jenkins
⚙️ GitLab CI
🧱 GitHub Actions
📦 Todas las anteriores

💡 Todas estas herramientas se usan comúnmente para pipelines de integración y despliegue continuos.

---

❓ ¿Cuál es el propósito de la gestión de secretos? 🟡

📝 Almacenar y gestionar datos sensibles de forma segura
⚙️ Mejorar rendimiento de la aplicación
🧱 Reducir costos
📦 Mejorar monitoreo

💡 La gestión de secretos asegura que la información sensible como contraseñas y claves API se almacene y acceda de forma segura.

---

❓ ¿Qué patrón se usa para manejar fallas de servicios de forma elegante? 🟡

📝 Patrón de reintento
⚙️ Circuit breaker
🧱 Patrón bulkhead
📦 Todas las anteriores

💡 Estos patrones trabajan juntos para manejar fallas de servicios de forma elegante y mejorar la resiliencia del sistema.

---

❓ ¿Qué hace un reverse proxy? 🟢

📝 Reenviar solicitudes del cliente a servicios backend
⚙️ Cachear contenido estático
🧱 Balancear solicitudes de carga
📦 Todas las anteriores

💡 Los reverse proxies pueden realizar múltiples funciones incluyendo reenvío de solicitudes, cacheo y balanceo de carga.

---

❓ ¿Qué herramienta se usa para monitoreo de infraestructura? 🟢

📝 Prometheus
⚙️ Grafana
🧱 Jaeger
📦 Todas las anteriores

💡 Estas herramientas trabajan juntas para monitoreo integral de infraestructura y observabilidad.

---

❓ ¿Cuál es el propósito del descubrimiento de servicios? 🟢

📝 Localizar y comunicarse con servicios dinámicamente
⚙️ Monitorear salud del servicio
🧱 Gestionar configuración del servicio
📦 Rastrear métricas del servicio

💡 El descubrimiento de servicios permite que los servicios se encuentren y comuniquen entre sí sin endpoints codificados.
