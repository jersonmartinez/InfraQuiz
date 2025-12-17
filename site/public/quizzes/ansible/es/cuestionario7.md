# 🔧 Ansible - Cuestionario 7

## Questions

### 1. 🔄 ¿Qué es la estrategia de ejecución de Ansible? 🔴

A) 🔄 Controlar cómo se ejecutan las tasks

B) 📊 Definir estructura del playbook

C) ⚙️ Configurar inventario

D) 🌐 Gestionar conexiones

**Correct Answer**: A) 🔄 Controlar cómo se ejecutan las tasks

> 💡 Las estrategias de ejecución determinan cómo Ansible ejecuta tasks a través de hosts. ¡Como elegir entre ejecución serial o paralela!

### 2. 📊 ¿Qué es el cache de facts de Ansible? 🔴

A) 📊 Almacenar facts recopilados

B) 🔧 Cache de configuraciones

C) 📦 Almacenar paquetes

D) 🌐 Cache de conexiones

**Correct Answer**: A) 📊 Almacenar facts recopilados

> 📘 El cache de facts almacena información del sistema recopilada para evitar re-recopilación. ¡Como tener memoria para detalles del sistema!

### 3. 🔧 ¿Qué es un plugin de callback de Ansible? 🔴

A) 🔧 Personalizar output/logging

B) 📦 Manejar paquetes

C) ⚙️ Gestionar configuraciones

D) 🌐 Controlar conexiones

**Correct Answer**: A) 🔧 Personalizar output/logging

> 💡 Los plugins de callback permiten personalizar el output y logging de Ansible. ¡Como tener reporters custom para tu automatización!

### 4. 📝 ¿Qué es la precedencia de variables de Ansible? 🔴

A) 📝 Orden de override de variables

B) 🔧 Definición de variables

C) 📦 Almacenamiento de variables

D) 🌐 Transmisión de variables

**Correct Answer**: A) 📝 Orden de override de variables

> 🎯 La precedencia de variables determina qué valor de variable toma efecto cuando múltiples están definidos. ¡Como tener jerarquía de importancia de variables!

### 5. 🔄 ¿Qué es el polling async de Ansible? 🔴

A) 🔄 Monitorear tasks de larga duración

B) 📊 Poll de facts

C) ⚙️ Poll de configuraciones

D) 🌐 Poll de conexiones

**Correct Answer**: A) 🔄 Monitorear tasks de larga duración

> 📘 El polling async permite monitorear tasks que toman más tiempo que el timeout SSH. ¡Como tener un watchdog para operaciones largas!

### 6. 📊 ¿Qué es un plugin de lookup de Ansible? 🔴

A) 📊 Recuperar data dinámicamente

B) 🔧 Buscar configuraciones

C) 📦 Buscar paquetes

D) 🌐 Buscar conexiones

**Correct Answer**: A) 📊 Recuperar data dinámicamente

> 💡 Los plugins de lookup obtienen data de fuentes externas durante ejecución del playbook. ¡Como tener recuperación de data dinámica!

### 7. 🔧 ¿Qué es un plugin de conexión de Ansible? 🔴

A) 🔧 Manejar conexiones a hosts

B) 📊 Gestionar data

C) 📦 Manejar paquetes

D) ⚙️ Gestionar configuraciones

**Correct Answer**: A) 🔧 Manejar conexiones a hosts

> 🎯 Los plugins de conexión definen cómo Ansible se conecta a hosts gestionados. ¡Como tener diferentes mecanismos de transporte!

### 8. 📦 ¿Qué es el comando ansible-galaxy init? 🔴

A) 📦 Inicializar estructura de rol nueva

B) 🔧 Iniciar servidor galaxy

C) 📊 Inicializar collections

D) 🌐 Inicializar inventario

**Correct Answer**: A) 📦 Inicializar estructura de rol nueva

> 📘 `ansible-galaxy init` crea la estructura de directorio estándar para un rol nuevo. ¡Como tener un template para creación de roles!

### 9. 🌐 ¿Qué es la automatización de red de Ansible? 🔴

A) 🌐 Gestionar dispositivos de red

B) 🔧 Conexiones de red

C) 📦 Paquetes de red

D) ⚙️ Configuraciones de red

**Correct Answer**: A) 🌐 Gestionar dispositivos de red

> 💡 Ansible puede automatizar configuración de dispositivos de red usando módulos específicos. ¡Como tener automatización de infraestructura para redes!

### 10. 🔐 ¿Qué es el rekey de vault de Ansible? 🔴

A) 🔐 Cambiar contraseña de vault

B) 📊 Rekey de facts

C) ⚙️ Rekey de configuraciones

D) 🌐 Rekey de conexiones

**Correct Answer**: A) 🔐 Cambiar contraseña de vault

> 🎯 El rekey de vault permite cambiar la contraseña para archivos encriptados. ¡Como actualizar la clave de tu bóveda segura!

### 11. 📊 ¿Qué son los plugins de inventario de Ansible? 🔴

A) 📊 Generar inventario dinámico

B) 🔧 Gestión de plugins

C) 📦 Plugins de paquetes

D) 🌐 Plugins de conexión

**Correct Answer**: A) 📊 Generar inventario dinámico

> 📘 Los plugins de inventario crean inventario desde fuentes externas como proveedores cloud. ¡Como tener descubrimiento automático de hosts!

### 12. 🔧 ¿Qué son los plugins de estrategia de Ansible? 🔴

A) 🔧 Controlar flujo de ejecución de tasks

B) 📊 Gestión de estrategia

C) 📦 Paquetes de estrategia

D) 🌐 Conexiones de estrategia

**Correct Answer**: A) 🔧 Controlar flujo de ejecución de tasks

> 💡 Los plugins de estrategia definen cómo se ejecutan las tasks a través del inventario. ¡Como tener diferentes patrones de ejecución!

### 13. 📝 ¿Qué es la herencia de templates de Ansible? 🔴

A) 📝 Extender templates base

B) 🔧 Gestión de templates

C) 📦 Paquetes de templates

D) 🌐 Conexiones de templates

**Correct Answer**: A) 📝 Extender templates base

> 🎯 La herencia de templates permite crear jerarquías de templates. ¡Como tener relaciones padre-hijo en templates!

### 14. 🌐 ¿Qué es la estrategia mitogen de Ansible? 🔴

A) 🌐 Acelerar ejecución

B) 🔧 Gestión de estrategia

C) 📦 Paquetes de estrategia

D) ⚙️ Configuraciones de estrategia

**Correct Answer**: A) 🌐 Acelerar ejecución

> 📘 Mitogen es un plugin de estrategia que acelera significativamente la ejecución de Ansible. ¡Como tener un booster de rendimiento para tus playbooks!

### 15. 🔐 ¿Qué son los plugins become de Ansible? 🔴

A) 🔐 Manejar escalada de privilegios

B) 📊 Gestión become

C) 📦 Paquetes become

D) 🌐 Conexiones become

**Correct Answer**: A) 🔐 Manejar escalada de privilegios

> 💡 Los plugins become gestionan cómo funciona la escalada de privilegios en diferentes sistemas. ¡Como tener mecanismos sudo custom!

### 16. 📊 ¿Qué son los plugins de recopilación de facts de Ansible? 🔴

A) 📊 Personalizar recopilación de facts

B) 🔧 Gestión de facts

C) 📦 Paquetes de facts

D) 🌐 Conexiones de facts

**Correct Answer**: A) 📊 Personalizar recopilación de facts

> 🎯 Los plugins de recopilación de facts permiten personalizar qué información del sistema se recopila. ¡Como tener inspectores del sistema a medida!

### 17. 🔧 ¿Qué son los plugins de acción de Ansible? 🔴

A) 🔧 Ejecutar acciones de módulos

B) 📊 Gestión de acciones

C) 📦 Paquetes de acciones

D) 🌐 Conexiones de acciones

**Correct Answer**: A) 🔧 Ejecutar acciones de módulos

> 📘 Los plugins de acción manejan la ejecución de módulos de Ansible. ¡Como tener el motor que ejecuta tus módulos!

### 18. 📦 ¿Qué son las dependencias de collections de Ansible? 🔴

A) 📦 Gestionar requerimientos de collections

B) 🔧 Gestión de dependencias

C) ⚙️ Configuraciones de dependencias

D) 🌐 Conexiones de dependencias

**Correct Answer**: A) 📦 Gestionar requerimientos de collections

> 💡 Las dependencias de collections permiten especificar collections requeridas. ¡Como tener gestión de dependencias para tu contenido!

### 19. 🌐 ¿Qué es la API HTTP de Ansible? 🔴

A) 🌐 API REST para automatización

B) 🔧 Gestión de API

C) 📦 Paquetes de API

D) ⚙️ Configuraciones de API

**Correct Answer**: A) 🌐 API REST para automatización

> 🎯 La API HTTP de Ansible proporciona endpoints REST para tasks de automatización. ¡Como tener un servicio web para tu automatización!

### 20. 🔐 ¿Qué es la encriptación de vault de Ansible? 🔴

A) 🔐 Encriptar data sensible

B) 📊 Gestión de encriptación

C) 📦 Paquetes de encriptación

D) 🌐 Conexiones de encriptación

**Correct Answer**: A) 🔐 Encriptar data sensible

> 📘 La encriptación de vault protege data sensible en tus playbooks y roles. ¡Como tener almacenamiento encriptado para secretos!

### 21. 📊 ¿Qué son los plugins de logging de Ansible? 🔴

A) 📊 Personalizar output de logging

B) 🔧 Gestión de logging

C) 📦 Paquetes de logging

D) 🌐 Conexiones de logging

**Correct Answer**: A) 📊 Personalizar output de logging

> 💡 Los plugins de logging permiten personalizar cómo Ansible registra sus operaciones. ¡Como tener loggers custom para tu automatización!