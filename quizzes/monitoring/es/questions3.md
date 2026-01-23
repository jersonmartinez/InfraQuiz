# Cuestionario de Monitoreo 3 - Avanzado

❓ ¿Cuál es el propósito del distributed tracing en microservicios? 🔴

📝 Rastrear el flujo de solicitudes a través de múltiples servicios
⚙️ Monitorear rendimiento individual de servicios
🧱 Rastrear consultas de base de datos
📦 Monitorear latencia de red

💡 El distributed tracing proporciona visibilidad sobre cómo fluyen las solicitudes a través de múltiples servicios, ayudando a identificar cuellos de botella y dependencias.

---

❓ ¿Qué herramienta de monitoreo está diseñada específicamente para Kubernetes? 🟡

📝 Prometheus
⚙️ Nagios
🧱 Zabbix
📦 Datadog

💡 Prometheus está diseñado para entornos nativos de la nube y se integra perfectamente con Kubernetes para monitoreo y alertas.

---

❓ ¿En qué se enfoca el APM (Application Performance Monitoring)? 🟡

📝 Métricas de rendimiento a nivel de aplicación
⚙️ Monitoreo de infraestructura
🧱 Monitoreo de red
📦 Monitoreo de base de datos

💡 Las herramientas APM se enfocan en rendimiento de aplicaciones, experiencia del usuario y monitoreo de transacciones de negocio.

---

❓ ¿Qué protocolo se usa comúnmente para recolección de métricas? 🟢

📝 Formato de métricas de Prometheus
⚙️ SNMP
🧱 WMI
📦 JMX

💡 El formato de métricas de Prometheus es ampliamente adoptado para recopilar y exponer métricas en aplicaciones nativas de la nube.

---

❓ ¿Cuál es el propósito de las reglas de alerta en monitoreo? 🟢

📝 Notificar automáticamente cuando se exceden umbrales
⚙️ Recopilar datos de métricas
🧱 Visualizar datos
📦 Almacenar datos históricos

💡 Las reglas de alerta activan automáticamente notificaciones cuando se cumplen umbrales o condiciones predefinidas.

---

❓ ¿Qué patrón de monitoreo se usa para manejar datos de alta cardinalidad? 🟡

📝 Bases de datos de series temporales
⚙️ Bases de datos relacionales
🧱 Bases de datos de documentos
📦 Almacenes clave-valor

💡 Las bases de datos de series temporales están optimizadas para almacenar y consultar datos de monitoreo de alta cardinalidad a lo largo del tiempo.

---

❓ ¿En qué se enfoca el enfoque de monitoreo blackbox? 🟡

📝 Monitoreo externo desde la perspectiva del usuario
⚙️ Métricas internas de la aplicación
🧱 Métricas de infraestructura
📦 Rendimiento de base de datos

💡 El monitoreo blackbox simula solicitudes de usuarios externos para monitorear disponibilidad del servicio y tiempos de respuesta.

---

❓ ¿Qué herramienta se usa comúnmente para agregación y análisis de logs? 🟢

📝 ELK Stack (Elasticsearch, Logstash, Kibana)
⚙️ Prometheus
🧱 Grafana
📦 Jaeger

💡 ELK Stack proporciona capacidades integrales de recopilación, procesamiento y visualización de logs.

---

❓ ¿Cuál es el propósito de la observabilidad del service mesh? 🟡

📝 Monitorear comunicación entre servicios y tráfico
⚙️ Monitorear servicios individuales
🧱 Monitorear infraestructura
📦 Monitorear bases de datos

💡 La observabilidad del service mesh proporciona insights sobre comunicación entre servicios, patrones de tráfico y dependencias.

---

❓ ¿Qué métrica de monitoreo es más importante para la experiencia del usuario? 🟢

📝 Tiempo de respuesta
⚙️ Uso de CPU
🧱 Uso de memoria
📦 I/O de disco

💡 El tiempo de respuesta impacta directamente la experiencia del usuario y es un indicador clave del rendimiento de la aplicación.

---

❓ ¿Qué proporciona el enfoque de monitoreo whitebox? 🟡

📝 Métricas internas detalladas de aplicación y sistema
⚙️ Métricas de experiencia del usuario externo
🧱 Métricas de rendimiento de red
📦 Métricas de infraestructura

💡 El monitoreo whitebox proporciona métricas internas detalladas sobre rendimiento de la aplicación y recursos del sistema.

---

❓ ¿Qué herramienta se usa para visualizar datos de monitoreo? 🟢

📝 Grafana
⚙️ Prometheus
🧱 Elasticsearch
📦 Logstash

💡 Grafana es una herramienta de visualización popular que puede conectarse a varias fuentes de datos para crear dashboards y gráficos.

---

❓ ¿Cuál es el propósito del monitoreo sintético? 🟡

📝 Simular interacciones y transacciones del usuario
⚙️ Monitorear comportamiento real del usuario
🧱 Monitorear recursos del sistema
📦 Monitorear rendimiento de red

💡 El monitoreo sintético usa scripts automatizados para simular interacciones del usuario y verificar funcionalidad de la aplicación.

---

❓ ¿Qué patrón de monitoreo ayuda con la planificación de capacidad? 🟡

📝 Análisis de tendencias y pronósticos
⚙️ Monitoreo en tiempo real
🧱 Alertas
📦 Análisis de logs

💡 El análisis de tendencias ayuda a predecir necesidades futuras de recursos y planificar la capacidad en consecuencia.

---

❓ ¿En qué se enfoca el enfoque de monitoreo de señales doradas? 🟢

📝 Latencia, tráfico, errores y saturación
⚙️ CPU, memoria, disco y red
🧱 Tiempo de respuesta, rendimiento y disponibilidad
📦 Experiencia del usuario y métricas de negocio

💡 Las señales doradas (latencia, tráfico, errores, saturación) proporcionan una vista integral de la salud del servicio.

---

❓ ¿Qué herramienta se usa para distributed tracing? 🟡

📝 Jaeger
⚙️ Prometheus
🧱 Grafana
📦 ELK Stack

💡 Jaeger es un sistema de distributed tracing que ayuda a monitorear y solucionar problemas de transacciones en arquitecturas de microservicios.

---

❓ ¿Cuál es el propósito de los IDs de correlación en monitoreo? 🟡

📝 Rastrear solicitudes a través de múltiples servicios
⚙️ Identificar usuarios individuales
🧱 Monitorear rendimiento
📦 Rastrear errores

💡 Los IDs de correlación ayudan a rastrear solicitudes mientras fluyen a través de múltiples servicios en sistemas distribuidos.

---

❓ ¿Qué enfoque de monitoreo es mejor para detectar anomalías? 🟡

📝 Detección de anomalías basada en machine learning
⚙️ Alertas basadas en umbrales
🧱 Monitoreo manual
📦 Verificaciones programadas

💡 El machine learning puede identificar patrones y detectar anomalías que podrían ser pasadas por alto por el monitoreo simple basado en umbrales.

---

❓ ¿Qué significa el método RED en monitoreo? 🟢

📝 Rate, Errors, Duration
⚙️ Response, Errors, Data
🧱 Request, Errors, Delay
📦 Reliability, Efficiency, Data

💡 El método RED se enfoca en Rate (solicitudes por segundo), Errors (tasa de errores), y Duration (tiempo de respuesta).

---

❓ ¿Qué herramienta de monitoreo se usa para infraestructura como código? 🟡

📝 Terraform con proveedores de monitoreo
⚙️ Ansible
🧱 Chef
📦 Puppet

💡 Terraform puede provisionar infraestructura de monitoreo junto con infraestructura de aplicación para despliegue consistente.

---

❓ ¿Cuál es el propósito de los dashboards de monitoreo? 🟢

📝 Visualizar y analizar datos de monitoreo
⚙️ Almacenar datos históricos
🧱 Recopilar métricas
📦 Enviar alertas

💡 Los dashboards proporcionan representaciones visuales de datos de monitoreo para análisis y toma de decisiones.
