# 🔄 CI/CD Avanzado - Cuestionario 4

## Preguntas

### 1. ❓ ¿Qué es GitOps en el contexto de CI/CD? 🔴

A) 📝 Una práctica que usa Git como fuente única de verdad para el despliegue

B) ⚙️ Un sistema de control de versiones para código fuente

C) 🔧 Una herramienta de gestión de dependencias

D) 🐳 Un framework de testing automatizado

**Respuesta Correcta**: A) 📝 Una práctica que usa Git como fuente única de verdad para el despliegue

💡 GitOps utiliza Git como fuente única de verdad para declarar el estado deseado de la infraestructura y aplicaciones, automatizando el despliegue basándose en cambios en el repositorio.

### 2. 🧠 ¿Cuál es el propósito de un Blue-Green Deployment? 🔴

A) 📝 Reducir el tiempo de inactividad durante despliegues

B) ⚙️ Optimizar el uso de recursos del servidor

C) 🔧 Mejorar la seguridad de las aplicaciones

D) 🐳 Acelerar el proceso de desarrollo

**Respuesta Correcta**: A) 📝 Reducir el tiempo de inactividad durante despliegues

💡 Blue-Green Deployment mantiene dos entornos idénticos, permitiendo cambiar instantáneamente el tráfico de la versión antigua a la nueva sin tiempo de inactividad.

### 3. 🤔 ¿Qué es un Canary Deployment? 🔴

A) 📝 Desplegar una nueva versión a un pequeño porcentaje de usuarios

B) ⚙️ Desplegar solo en servidores de desarrollo

C) 🔧 Desplegar en múltiples regiones simultáneamente

D) 🐳 Desplegar solo en horarios de bajo tráfico

**Respuesta Correcta**: A) 📝 Desplegar una nueva versión a un pequeño porcentaje de usuarios

💡 Canary Deployment permite probar nuevas versiones con un subconjunto de usuarios antes de desplegar completamente, minimizando el riesgo de fallos.

### 4. 🔍 ¿Cuál es el propósito de Feature Flags en CI/CD? 🔴

A) 📝 Controlar la activación de funcionalidades sin redeploy

B) ⚙️ Gestionar permisos de acceso a la aplicación

C) 🔧 Optimizar el rendimiento del código

D) 🐳 Gestionar la configuración de la base de datos

**Respuesta Correcta**: A) 📝 Controlar la activación de funcionalidades sin redeploy

💡 Feature Flags permiten activar o desactivar funcionalidades en tiempo real sin necesidad de redeploy, facilitando el testing y rollback rápido.

### 5. ❓ ¿Qué es Infrastructure as Code (IaC) en CI/CD? 🔴

A) 📝 Gestionar infraestructura mediante archivos de configuración versionados

B) ⚙️ Escribir código para automatizar tareas de infraestructura

C) 🔧 Documentar la arquitectura del sistema

D) 🐳 Gestionar la configuración de aplicaciones

**Respuesta Correcta**: A) 📝 Gestionar infraestructura mediante archivos de configuración versionados

💡 IaC permite definir y gestionar infraestructura mediante código, facilitando la reproducibilidad, versionado y automatización de despliegues.

### 6. 🧠 ¿Cuál es el propósito de un Pipeline as Code? 🔴

A) 📝 Definir pipelines de CI/CD mediante código versionado

B) ⚙️ Automatizar la generación de código

C) 🔧 Optimizar el rendimiento de las aplicaciones

D) 🐳 Gestionar la configuración de bases de datos

**Respuesta Correcta**: A) 📝 Definir pipelines de CI/CD mediante código versionado

💡 Pipeline as Code permite definir pipelines de CI/CD en archivos de configuración versionados, facilitando la colaboración y el control de versiones.

### 7. 🤔 ¿Qué es un Multi-Stage Pipeline? 🔴

A) 📝 Un pipeline que ejecuta múltiples etapas secuenciales

B) ⚙️ Un pipeline que se ejecuta en múltiples servidores

C) 🔧 Un pipeline que maneja múltiples lenguajes de programación

D) 🐳 Un pipeline que se ejecuta en múltiples entornos

**Respuesta Correcta**: A) 📝 Un pipeline que ejecuta múltiples etapas secuenciales

💡 Multi-Stage Pipeline divide el proceso de CI/CD en etapas lógicas como build, test, security scan, y deploy, permitiendo control granular y optimización.

### 8. 🔍 ¿Cuál es el propósito de Security Scanning en CI/CD? 🔴

A) 📝 Detectar vulnerabilidades de seguridad en el código y dependencias

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración de seguridad

D) 🐳 Monitorear el tráfico de red

**Respuesta Correcta**: A) 📝 Detectar vulnerabilidades de seguridad en el código y dependencias

💡 Security Scanning integra análisis de seguridad en el pipeline, detectando vulnerabilidades temprano y previniendo el despliegue de código inseguro.

### 9. ❓ ¿Qué es un Rollback Strategy en CI/CD? 🔴

A) 📝 Un plan para revertir a versiones anteriores en caso de problemas

B) ⚙️ Una estrategia para optimizar el rendimiento

C) 🔧 Un plan para escalar la aplicación

D) 🐳 Una estrategia para gestionar la configuración

**Respuesta Correcta**: A) 📝 Un plan para revertir a versiones anteriores en caso de problemas

💡 Rollback Strategy define cómo revertir rápidamente a una versión estable anterior cuando se detectan problemas en producción, minimizando el impacto.

### 10. 🧠 ¿Cuál es el propósito de Environment Promotion en CI/CD? 🔴

A) 📝 Mover código entre entornos de desarrollo, testing y producción

B) ⚙️ Optimizar el rendimiento de los entornos

C) 🔧 Gestionar la configuración de entornos

D) 🐳 Monitorear el uso de recursos

**Respuesta Correcta**: A) 📝 Mover código entre entornos de desarrollo, testing y producción

💡 Environment Promotion define el flujo de código entre entornos, asegurando que cada promoción pase las validaciones necesarias antes de avanzar.

### 11. 🤔 ¿Qué es Continuous Testing en CI/CD? 🔴

A) 📝 Ejecutar tests automáticamente en cada cambio de código

B) ⚙️ Optimizar el rendimiento de los tests

C) 🔧 Gestionar la configuración de testing

D) 🐳 Monitorear el rendimiento de las aplicaciones

**Respuesta Correcta**: A) 📝 Ejecutar tests automáticamente en cada cambio de código

💡 Continuous Testing ejecuta tests automáticamente en cada commit, asegurando que el código mantenga la calidad y funcionalidad esperada.

### 12. 🔍 ¿Cuál es el propósito de Dependency Management en CI/CD? 🔴

A) 📝 Gestionar y actualizar dependencias de manera segura

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración del sistema

D) 🐳 Monitorear el uso de recursos

**Respuesta Correcta**: A) 📝 Gestionar y actualizar dependencias de manera segura

💡 Dependency Management automatiza la gestión de dependencias, incluyendo actualizaciones, análisis de seguridad y compatibilidad de versiones.

### 13. ❓ ¿Qué es Progressive Delivery en CI/CD? 🔴

A) 📝 Desplegar cambios gradualmente para minimizar riesgos

B) ⚙️ Optimizar la velocidad de despliegue

C) 🔧 Gestionar la configuración de despliegue

D) 🐳 Monitorear el rendimiento del despliegue

**Respuesta Correcta**: A) 📝 Desplegar cambios gradualmente para minimizar riesgos

💡 Progressive Delivery combina técnicas como Canary, Blue-Green y Feature Flags para desplegar cambios de manera controlada y segura.

### 14. 🧠 ¿Cuál es el propósito de Observability en CI/CD? 🔴

A) 📝 Monitorear y entender el comportamiento de aplicaciones en producción

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración del sistema

D) 🐳 Gestionar la infraestructura

**Respuesta Correcta**: A) 📝 Monitorear y entender el comportamiento de aplicaciones en producción

💡 Observability proporciona visibilidad completa del comportamiento de aplicaciones mediante métricas, logs y traces, facilitando el debugging y optimización.

### 15. 🤔 ¿Qué es Chaos Engineering en CI/CD? 🔴

A) 📝 Probar la resiliencia de sistemas mediante fallos controlados

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración del sistema

D) 🐳 Monitorear el rendimiento del sistema

**Respuesta Correcta**: A) 📝 Probar la resiliencia de sistemas mediante fallos controlados

💡 Chaos Engineering introduce fallos controlados en sistemas para identificar debilidades y mejorar la resiliencia antes de que ocurran en producción.

### 16. 🔍 ¿Cuál es el propósito de Compliance as Code en CI/CD? 🔴

A) 📝 Automatizar la verificación de cumplimiento normativo

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración de compliance

D) 🐳 Monitorear el cumplimiento normativo

**Respuesta Correcta**: A) 📝 Automatizar la verificación de cumplimiento normativo

💡 Compliance as Code integra verificaciones de cumplimiento normativo en el pipeline, asegurando que todas las implementaciones cumplan con estándares requeridos.

### 17. ❓ ¿Qué es Shift Left Security en CI/CD? 🔴

A) 📝 Integrar seguridad desde las primeras etapas del desarrollo

B) ⚙️ Optimizar la seguridad de las aplicaciones

C) 🔧 Gestionar la configuración de seguridad

D) 🐳 Monitorear la seguridad del sistema

**Respuesta Correcta**: A) 📝 Integrar seguridad desde las primeras etapas del desarrollo

💡 Shift Left Security integra prácticas de seguridad desde el diseño y desarrollo, no solo en testing y producción, previniendo vulnerabilidades temprano.

### 18. 🧠 ¿Cuál es el propósito de Value Stream Mapping en CI/CD? 🔴

A) 📝 Visualizar y optimizar el flujo de valor desde desarrollo hasta producción

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración del flujo

D) 🐳 Monitorear el flujo de trabajo

**Respuesta Correcta**: A) 📝 Visualizar y optimizar el flujo de valor desde desarrollo hasta producción

💡 Value Stream Mapping identifica cuellos de botella y oportunidades de mejora en el pipeline de CI/CD, optimizando la entrega de valor.

### 19. 🤔 ¿Qué es Continuous Compliance en CI/CD? 🔴

A) 📝 Verificar continuamente el cumplimiento normativo en todo el pipeline

B) ⚙️ Optimizar el cumplimiento normativo

C) 🔧 Gestionar la configuración de compliance

D) 🐳 Monitorear el cumplimiento normativo

**Respuesta Correcta**: A) 📝 Verificar continuamente el cumplimiento normativo en todo el pipeline

💡 Continuous Compliance integra verificaciones de cumplimiento en cada etapa del pipeline, asegurando que se mantenga el cumplimiento normativo.

### 20. 🔍 ¿Cuál es el propósito de Deployment Strategies en CI/CD? 🔴

A) 📝 Definir diferentes enfoques para desplegar aplicaciones

B) ⚙️ Optimizar la velocidad de despliegue

C) 🔧 Gestionar la configuración de despliegue

D) 🐳 Monitorear el rendimiento del despliegue

**Respuesta Correcta**: A) 📝 Definir diferentes enfoques para desplegar aplicaciones

💡 Deployment Strategies definen cómo se despliegan las aplicaciones, incluyendo Rolling, Blue-Green, Canary y otras técnicas para minimizar riesgos.

### 21. ❓ ¿Qué es Continuous Optimization en CI/CD? 🔴

A) 📝 Mejorar continuamente el pipeline y procesos de CI/CD

B) ⚙️ Optimizar el rendimiento de las aplicaciones

C) 🔧 Gestionar la configuración del sistema

D) 🐳 Monitorear el rendimiento del sistema

**Respuesta Correcta**: A) 📝 Mejorar continuamente el pipeline y procesos de CI/CD

💡 Continuous Optimization implica la mejora constante del pipeline de CI/CD basándose en métricas, feedback y mejores prácticas para maximizar la eficiencia.

🔴
