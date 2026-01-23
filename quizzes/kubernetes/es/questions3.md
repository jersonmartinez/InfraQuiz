# ☸️ Kubernetes - Cuestionario 3

## Preguntas

### 1. 🔧 ¿Qué es un VerticalPodAutoscaler (VPA)? 🔴

A) 🔧 Ajusta automáticamente solicitudes y límites de recursos de Pods

B) 🔄 Ajusta manualmente recursos de Pods

C) 📦 Escala Pods horizontalmente

D) 🌐 Escala nodos verticalmente

**Respuesta correcta**: A) 🔧 Ajusta automáticamente solicitudes y límites de recursos de Pods

💡 VPA establece automáticamente solicitudes y límites de CPU y memoria basado en patrones de uso. ¡Perfecto para optimizar asignación de recursos! 📊

### 2. 🚀 ¿Qué es un Cluster Autoscaler? 🔴

A) 🚀 Añade/remueve nodos automáticamente basado en necesidades de programación de Pods

B) 🔄 Escala el clúster manualmente

C) 📦 Escala solo Pods

D) 🌐 Escala solo servicios

**Respuesta correcta**: A) 🚀 Añade/remueve nodos automáticamente basado en necesidades de programación de Pods

⚡ Cluster Autoscaler asegura que tengas suficientes nodos para tus Pods mientras mantiene los costos bajos. ¡Funciona con proveedores de nube! 💰

### 3. 🔍 ¿Qué es un Pod Topology Spread Constraint? 🔴

A) 🔍 Controla cómo se distribuyen los Pods a través de dominios de falla

B) 🔄 Controla programación de Pods

C) 📦 Controla almacenamiento de Pods

D) 🌐 Controla redes de Pods

**Respuesta correcta**: A) 🔍 Controla cómo se distribuyen los Pods a través de dominios de falla

🔄 Asegura que los Pods se distribuyan a través de zonas, nodos, u otros dominios de topología para alta disponibilidad! 🎯

### 4. 📦 ¿Qué es un Pod Affinity? 🟡

A) 📦 Reglas que determinan dónde se programan los Pods relativos a otros Pods

B) 🔄 Reglas que previenen programación de Pods

C) 📦 Reglas que controlan almacenamiento de Pods

D) 🌐 Reglas que controlan redes de Pods

**Respuesta correcta**: A) 📦 Reglas que determinan dónde se programan los Pods relativos a otros Pods

💡 Usa Pod Affinity para co-localizar Pods relacionados (ej. servidor web con caché) o separarlos para alta disponibilidad! 🎯

### 5. 🔄 ¿Qué es un Pod Anti-Affinity? 🟡

A) 🔄 Reglas que previenen que Pods se programen en el mismo nodo

B) 🔧 Reglas que fuerzan programación de Pods

C) 📦 Reglas que controlan almacenamiento de Pods

D) 🌐 Reglas que controlan redes de Pods

**Respuesta correcta**: A) 🔄 Reglas que previenen que Pods se programen en el mismo nodo

🛡️ Pod Anti-Affinity asegura alta disponibilidad previniendo que todas las réplicas corran en el mismo nodo! 🚫

### 6. 🌟 ¿Qué es un Taint y Toleration? 🔴

A) 🌟 Mecanismo para repeler Pods de nodos a menos que toleren el taint

B) 🔄 Mecanismo para atraer Pods a nodos

C) 📦 Mecanismo para controlar almacenamiento de Pods

D) 🌐 Mecanismo para controlar redes de Pods

**Respuesta correcta**: A) 🌟 Mecanismo para repeler Pods de nodos a menos que toleren el taint

🚫 Los Taints marcan nodos como "no deseados" para ciertos Pods. ¡Las Tolerations permiten que Pods corran en nodos tainted! 🎯

### 7. 🔧 ¿Qué es un Node Selector? 🟡

A) 🔧 Forma simple de restringir Pods a nodos con etiquetas específicas

B) 🔄 Forma compleja de controlar programación de Pods

C) 📦 Forma de controlar almacenamiento de Pods

D) 🌐 Forma de controlar redes de Pods

**Respuesta correcta**: A) 🔧 Forma simple de restringir Pods a nodos con etiquetas específicas

🏷️ Node Selectors usan pares clave-valor simples para hacer coincidir Pods con nodos. ¡Para reglas complejas, usa Node Affinity! ⚡

### 8. 📋 ¿Qué es un Node Affinity? 🟡

A) 📋 Reglas avanzadas para controlar colocación de Pods en nodos

B) 🔄 Reglas básicas para programación de Pods

C) 📦 Reglas para almacenamiento de Pods

D) 🌐 Reglas para redes de Pods

**Respuesta correcta**: A) 📋 Reglas avanzadas para controlar colocación de Pods en nodos

🎛️ Node Affinity proporciona reglas flexibles y expresivas para programación de Pods. ¡Soporta requisitos duros y preferencias suaves! 🎯

### 9. 🔄 ¿Qué es un Pod Priority y Preemption? 🔴

A) 🔄 Sistema que permite que Pods de alta prioridad evicten los de menor prioridad

B) 🔧 Sistema que previene evicción de Pods

C) 📦 Sistema que controla almacenamiento de Pods

D) 🌐 Sistema que controla redes de Pods

**Respuesta correcta**: A) 🔄 Sistema que permite que Pods de alta prioridad evicten los de menor prioridad

⚡ Los Pods críticos pueden preemptir los menos importantes cuando los recursos son escasos. ¡Establece clases de prioridad para diferentes cargas de trabajo! 🚀

### 10. 🎯 ¿Qué es un Pod Disruption Budget (PDB)? 🔴

A) 🎯 Limita interrupciones voluntarias durante operaciones de mantenimiento

B) 🔄 Previene todas las interrupciones de Pods

C) 📦 Controla programación de Pods

D) 🌐 Controla redes de Pods

**Respuesta correcta**: A) 🎯 Limita interrupciones voluntarias durante operaciones de mantenimiento

🛡️ PDB asegura disponibilidad durante interrupciones voluntarias como mantenimiento de nodos o actualizaciones del clúster! 🚫

### 11. 🔍 ¿Qué es un Pod Security Context? 🟡

A) 🔍 Configuraciones de seguridad que se aplican a un Pod y todos sus contenedores

B) 🔄 Configuraciones de seguridad para el clúster

C) 📦 Configuraciones de seguridad para almacenamiento

D) 🌐 Configuraciones de seguridad para redes

**Respuesta correcta**: A) 🔍 Configuraciones de seguridad que se aplican a un Pod y todos sus contenedores

🔐 Pod Security Context establece IDs de usuario/grupo, opciones de SELinux, y otros parámetros de seguridad a nivel de Pod! 🛡️

### 12. 🚀 ¿Qué es un Container Security Context? 🟡

A) 🚀 Configuraciones de seguridad que se aplican a un contenedor específico

B) 🔄 Configuraciones de seguridad para el Pod

C) 📦 Configuraciones de seguridad para almacenamiento

D) 🌐 Configuraciones de seguridad para redes

**Respuesta correcta**: A) 🚀 Configuraciones de seguridad que se aplican a un contenedor específico

🔒 Container Security Context controla modo privilegiado, capacidades, y otras configuraciones de seguridad por contenedor! 🛡️

### 13. 🔧 ¿Qué es un Pod Lifecycle Hook? 🟡

A) 🔧 Acciones que se ejecutan antes o después de eventos del ciclo de vida del contenedor

B) 🔄 Acciones que se ejecutan continuamente

C) 📦 Acciones que controlan almacenamiento

D) 🌐 Acciones que controlan redes

**Respuesta correcta**: A) 🔧 Acciones que se ejecutan antes o después de eventos del ciclo de vida del contenedor

⚡ Usa hooks PostStart y PreStop para inicialización, limpieza, o apagado elegante! 🎯

### 14. 🌟 ¿Qué es un Pod Readiness Probe? 🟡

A) 🌟 Determina si un Pod está listo para recibir tráfico

B) 🔄 Determina si un Pod está vivo

C) 📦 Determina si un Pod tiene almacenamiento

D) 🌐 Determina si un Pod tiene acceso de red

**Respuesta correcta**: A) 🌟 Determina si un Pod está listo para recibir tráfico

✅ Los Readiness Probes aseguran que los Pods solo reciban tráfico cuando estén verdaderamente listos para manejar solicitudes! 🚦

### 15. 🔄 ¿Qué es un Pod Liveness Probe? 🟡

A) 🔄 Determina si un Pod está vivo y debe ser reiniciado

B) 🔧 Determina si un Pod está listo

C) 📦 Determina si un Pod tiene almacenamiento

D) 🌐 Determina si un Pod tiene acceso de red

**Respuesta correcta**: A) 🔄 Determina si un Pod está vivo y debe ser reiniciado

💓 Los Liveness Probes detectan deadlocks o estados atascados y disparan reinicio de Pod cuando es necesario! 🔄

### 16. 📦 ¿Qué es un Pod Startup Probe? 🟡

A) 📦 Deshabilita otros probes hasta que el inicio del Pod esté completo

B) 🔄 Reemplaza otros probes

C) 📦 Controla almacenamiento de Pods

D) 🌐 Controla redes de Pods

**Respuesta correcta**: A) 📦 Deshabilita otros probes hasta que el inicio del Pod esté completo

🚀 Los Startup Probes son útiles para contenedores de inicio lento. ¡Otros probes están deshabilitados hasta que el startup probe tenga éxito! ⏱️

### 17. 🚀 ¿Qué es un Pod Termination Grace Period? 🟡

A) 🚀 Tiempo dado al Pod para apagado elegante antes de force kill

B) 🔄 Tiempo para iniciar un Pod

C) 📦 Tiempo para acceder almacenamiento

D) 🌐 Tiempo para acceder red

**Respuesta correcta**: A) 🚀 Tiempo dado al Pod para apagado elegante antes de force kill

⏰ Termination Grace Period permite que los Pods limpien recursos, cierren conexiones, y guarden estado antes de la terminación! 🧹

### 18. 🔧 ¿Qué es un Pod Preemption? 🔴

A) 🔧 Proceso donde Pods de alta prioridad evicten los de menor prioridad

B) 🔄 Proceso donde se programan Pods

C) 📦 Proceso donde Pods acceden almacenamiento

D) 🌐 Proceso donde Pods acceden red

**Respuesta correcta**: A) 🔧 Proceso donde Pods de alta prioridad evicten los de menor prioridad

⚡ La preemption asegura que cargas de trabajo críticas obtengan recursos cuando sea necesario, ¡incluso si significa evictar Pods menos importantes! 🚀

### 19. 🌟 ¿Qué es un Pod Eviction? 🟡

A) 🌟 Proceso de remover Pods de nodos

B) 🔄 Proceso de programar Pods

C) 📦 Proceso de acceder almacenamiento

D) 🌐 Proceso de acceder red

**Respuesta correcta**: A) 🌟 Proceso de remover Pods de nodos

🚫 Los Pods pueden ser evictados debido a presión de recursos, mantenimiento de nodos, o preemption por Pods de mayor prioridad! 📉

### 20. 🔄 ¿Qué es un Pod Disruption? 🟡

A) 🔄 Cualquier evento que cause que un Pod deje de ejecutarse

B) 🔧 Cualquier evento que inicie un Pod

C) 📦 Cualquier evento que acceda almacenamiento

D) 🌐 Cualquier evento que acceda red

**Respuesta correcta**: A) 🔄 Cualquier evento que cause que un Pod deje de ejecutarse

⚠️ Las Pod Disruptions incluyen acciones voluntarias (mantenimiento) y eventos involuntarios (falla de hardware, presión de recursos)! 🚨

### 21. 🎯 ¿Cuál es la mejor práctica para programación de Pods? 🔴

A) 🎯 Usar reglas apropiadas de affinity/anti-affinity, límites de recursos, y clases de prioridad

B) 🔄 Usar solo programación básica

C) 📦 Ignorar políticas de programación

D) 🌐 Usar solo programación por defecto

**Respuesta correcta**: A) 🎯 Usar reglas apropiadas de affinity/anti-affinity, límites de recursos, y clases de prioridad

🎯 Los despliegues de producción necesitan: reglas apropiadas de affinity para alta disponibilidad, límites de recursos para prevenir acaparamiento de recursos, y clases de prioridad para cargas de trabajo críticas. ¡La programación inteligente es clave! 🧠
