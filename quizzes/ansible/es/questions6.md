# 🔧 Ansible - Cuestionario 6

## Questions

### 1. 🔄 ¿Cuál es el archivo de inventario por defecto de Ansible? 🟡

A) 🔄 /etc/ansible/hosts

B) 📋 inventory.ini

C) ⚙️ hosts.cfg

D) 🌐 ansible.cfg

**Correct Answer**: A) 🔄 /etc/ansible/hosts

> 💡 El archivo de inventario por defecto es /etc/ansible/hosts. ¡Como tener una libreta de direcciones por defecto para tus servidores!

### 2. 📊 ¿Cuál es el propósito de ansible.cfg? 🟡

A) 📊 Configurar comportamiento de Ansible

B) 🔧 Definir inventario

C) 📦 Almacenar variables

D) 🌐 Gestionar conexiones

**Correct Answer**: A) 📊 Configurar comportamiento de Ansible

> 📘 ansible.cfg contiene configuraciones para Ansible. ¡Como tener un archivo de settings para tu herramienta de automatización!

### 3. 🔧 ¿Qué es una task en Ansible? 🟡

A) 🔧 Unidad individual de trabajo

B) 📦 Playbook completo

C) ⚙️ Bloque de configuración

D) 🌐 Comando de red

**Correct Answer**: A) 🔧 Unidad individual de trabajo

> 💡 Una task es una acción individual en un playbook. ¡Como tener pasos individuales en una receta!

### 4. 📝 ¿Cuál es el requerimiento de sintaxis YAML en Ansible? 🟡

A) 📝 Indentación apropiada

B) 🔧 Palabras clave específicas

C) 📦 Extensión de archivo

D) 🌐 Protocolo de red

**Correct Answer**: A) 📝 Indentación apropiada

> 🎯 YAML requiere indentación consistente para estructura. ¡Como tener formato apropiado en un documento!

### 5. 🔄 ¿Qué hace la palabra clave `when`? 🟡

A) 🔄 Ejecución condicional de tasks

B) 📊 Asignación de variables

C) ⚙️ Control de bucles

D) 🌐 Configuración de conexión

**Correct Answer**: A) 🔄 Ejecución condicional de tasks

> 📘 `when` permite ejecutar tasks solo bajo ciertas condiciones. ¡Como tener if-statements en tu automatización!

### 6. 📊 ¿Qué es un register en Ansible? 🟡

A) 📊 Almacenar output de task

B) 🔧 Definir variables

C) 📦 Crear módulos

D) 🌐 Gestionar inventario

**Correct Answer**: A) 📊 Almacenar output de task

> 💡 Register captura el output de una task para uso posterior. ¡Como guardar resultados para referencia futura!

### 7. 🔧 ¿Para qué se usa el módulo `copy`? 🟡

A) 🔧 Transferir archivos a hosts

B) 📦 Instalar paquetes

C) ⚙️ Configurar servicios

D) 🌐 Gestionar redes

**Correct Answer**: A) 🔧 Transferir archivos a hosts

> 📘 El módulo copy transfiere archivos desde el nodo de control a hosts gestionados. ¡Como tener un servicio de entrega de archivos!

### 8. 📦 ¿Para qué es el módulo `yum`? 🟡

A) 📦 Gestión de paquetes en Red Hat

B) 🔧 Operaciones de archivos

C) ⚙️ Gestión de servicios

D) 🌐 Configuración de red

**Correct Answer**: A) 📦 Gestión de paquetes en Red Hat

> 💡 El módulo yum gestiona paquetes en sistemas RHEL/CentOS. ¡Como tener un gestor de paquetes para tu automatización!

### 9. 🌐 ¿Para qué se usa el módulo `uri`? 🟡

A) 🌐 Interactuar con servicios web

B) 🔧 Transferencias de archivos

C) 📦 Instalación de paquetes

D) ⚙️ Configuración del sistema

**Correct Answer**: A) 🌐 Interactuar con servicios web

> 🎯 El módulo uri hace peticiones HTTP a servicios web. ¡Como tener un cliente web en tus playbooks!

### 10. 🔐 ¿Qué hace `become: yes`? 🟡

A) 🔐 Elevar privilegios

B) 📊 Cambiar usuario

C) ⚙️ Cambiar contexto

D) 🌐 Modificar conexión

**Correct Answer**: A) 🔐 Elevar privilegios

> 📘 `become: yes` permite ejecutar tasks con privilegios elevados (sudo). ¡Como tener acceso de administrador cuando se necesita!

### 11. 📊 ¿Qué es un block en Ansible? 🟡

A) 📊 Agrupar tasks relacionadas

B) 🔧 Comando individual

C) 📦 Colección de módulos

D) 🌐 Grupo de red

**Correct Answer**: A) 📊 Agrupar tasks relacionadas

> 💡 Los blocks agrupan tasks para mejor organización y manejo de errores. ¡Como tener secciones en tu playbook!

### 12. 🔄 ¿Qué es la construcción `with_items`? 🟡

A) 🔄 Iterar sobre lista de items

B) 📊 Definir variables

C) ⚙️ Establecer condiciones

D) 🌐 Configurar conexiones

**Correct Answer**: A) 🔄 Iterar sobre lista de items

> 🎯 `with_items` permite iterar sobre una lista de items. ¡Como tener for-loops en tu automatización!

### 13. 📝 ¿Para qué se usa Jinja2 en Ansible? 🟡

A) 📝 Renderizado de templates

B) 🔧 Almacenamiento de variables

C) 📦 Creación de módulos

D) 🌐 Templating de red

**Correct Answer**: A) 📝 Renderizado de templates

> 📘 Jinja2 se usa para contenido dinámico en templates. ¡Como tener texto inteligente que se adapta a variables!

### 14. 🌐 ¿Qué es el módulo `setup`? 🟡

A) 🌐 Recopilar facts del sistema

B) 🔧 Configurar sistema

C) 📦 Instalar software

D) ⚙️ Gestionar servicios

**Correct Answer**: A) 🌐 Recopilar facts del sistema

> 💡 El módulo setup recopila información del sistema automáticamente. ¡Como tener un recopilador de información del sistema!

### 15. 🔧 ¿Qué es el módulo `command`? 🟡

A) 🔧 Ejecutar comandos shell

B) 📦 Instalar paquetes

C) ⚙️ Configurar servicios

D) 🌐 Gestionar redes

**Correct Answer**: A) 🔧 Ejecutar comandos shell

> 🎯 El módulo command ejecuta comandos shell en hosts gestionados. ¡Como tener un ejecutor de comandos!

### 16. 📊 ¿Para qué es el módulo `debug`? 🟡

A) 📊 Imprimir valores de variables

B) 🔧 Ejecutar comandos

C) 📦 Depurar paquetes

D) 🌐 Depurar redes

**Correct Answer**: A) 📊 Imprimir valores de variables

> 📘 El módulo debug ayuda a solucionar problemas mostrando valores de variables. ¡Como tener una declaración print para debugging!

### 17. 🔄 ¿Qué es la condición `failed_when`? 🟡

A) 🔄 Definir condiciones de fallo

B) 📊 Establecer criterios de éxito

C) ⚙️ Controlar bucles

D) 🌐 Gestionar conexiones

**Correct Answer**: A) 🔄 Definir condiciones de fallo

> 💡 `failed_when` permite personalizar cuándo una task debe considerarse fallida. ¡Como tener detección de error custom!

### 18. 📦 ¿Para qué se usa el módulo `apt`? 🟡

A) 📦 Gestión de paquetes en Debian

B) 🔧 Operaciones de archivos

C) ⚙️ Gestión de servicios

D) 🌐 Configuración de red

**Correct Answer**: A) 📦 Gestión de paquetes en Debian

> 🎯 El módulo apt gestiona paquetes en sistemas Debian/Ubuntu. ¡Como tener un gestor de paquetes para sistemas basados en Debian!

### 19. 🌐 ¿Qué es el módulo `ping`? 🟡

A) 🌐 Probar conectividad

B) 🔧 Enviar paquetes ICMP

C) 📦 Verificar servicios

D) ⚙️ Verificar configuración

**Correct Answer**: A) 🌐 Probar conectividad

> 📘 El módulo ping prueba conectividad básica a hosts. ¡Como tener un verificador de conectividad!

### 20. 🔧 ¿Para qué se usa el módulo `file`? 🟡

A) 🔧 Gestionar archivos y directorios

B) 📦 Instalar paquetes

C) ⚙️ Configurar servicios

D) 🌐 Gestionar redes

**Correct Answer**: A) 🔧 Gestionar archivos y directorios

> 💡 El módulo file crea, elimina y gestiona permisos de archivos. ¡Como tener un gestor de archivos!

### 21. 📊 ¿Qué es el módulo `stat`? 🟡

A) 📊 Obtener información de archivos

B) 🔧 Modificar archivos

C) 📦 Verificar paquetes

D) 🌐 Probar redes

**Correct Answer**: A) 📊 Obtener información de archivos

> 🎯 El módulo stat recupera atributos e información de archivos. ¡Como tener un inspector de archivos!