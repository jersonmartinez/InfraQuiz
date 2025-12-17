# 🔧 Ansible - Cuestionario 2

## Preguntas

### 1. 🎯 ¿Qué archivo de configuración establece ajustes globales de Ansible? 🟢

A) 📝 `ansible.cfg`

B) 🔄 config.yml

C) 📦 settings.conf

D) 🌐 global.ini

**Respuesta correcta**: A) 📝 `ansible.cfg`

> 💡 `ansible.cfg` configura valores por defecto como ubicación del inventario, usuario remoto y ajustes de conexión. ¡Como tu archivo de preferencias personal de Ansible!

### 2. 🔧 ¿Cuál es la ubicación por defecto del archivo de inventario? 🟢

A) 📝 `/etc/ansible/hosts`

B) 🔄 /var/ansible/inventory

C) 📦 ~/.ansible/hosts

D) 🌐 /opt/ansible/inventory

**Respuesta correcta**: A) 📝 `/etc/ansible/hosts`

> 📘 Por defecto, Ansible busca el inventario en `/etc/ansible/hosts`. ¡Puedes sobrescribirlo con la opción `-i` o en `ansible.cfg`!

### 3. 🎭 ¿Qué hace el comando `ansible-doc`? 🟢

A) 📝 Mostrar documentación de módulos

B) 🔄 Generar documentación

C) 📦 Instalar módulos

D) 🌐 Crear playbooks

**Respuesta correcta**: A) 📝 Mostrar documentación de módulos

> ⚡ `ansible-doc copy` muestra la documentación del módulo copy. ¡Como tener un manual integrado para cada módulo de Ansible!

### 4. 🔍 ¿Cuál es el propósito de `gather_facts: no`? 🟡

A) 📝 Omitir la recolección automática de información del sistema

B) 🔄 Ocultar información sensible

C) 📦 Acelerar la ejecución

D) 🌐 Reducir el tráfico de red

**Respuesta correcta**: A) 📝 Omitir la recolección automática de información del sistema

> 💡 Configurar `gather_facts: no` evita que Ansible recolecte información del sistema, ¡haciendo los playbooks más rápidos cuando no se necesitan facts!

### 5. 🔧 ¿Qué hace el módulo `copy`? 🟢

A) 📝 Copiar archivos desde la máquina de control a nodos gestionados

B) 🔄 Copiar archivos entre nodos gestionados

C) 📦 Hacer backup de archivos

D) 🌐 Mover archivos

**Respuesta correcta**: A) 📝 Copiar archivos desde la máquina de control a nodos gestionados

> 📘 Ejemplo: `copy: src=/home/user/archivo.txt dest=/tmp/archivo.txt` copia desde el controlador Ansible a los servidores objetivo!

### 6. 🌐 ¿Cuál es la diferencia entre los módulos `shell` y `command`? 🟡

A) 📝 shell procesa a través del shell, command ejecuta directamente

B) 🔄 shell es más rápido que command

C) 📦 command soporta pipes, shell no

D) 🌐 No hay diferencia

**Respuesta correcta**: A) 📝 shell procesa a través del shell, command ejecuta directamente

> 🎯 Usa `shell` para pipes/redirecciones: `shell: ls | grep txt`. Usa `command` para comandos simples: `command: ls /tmp`!

### 7. 🔐 ¿Cómo encriptas un archivo con Ansible Vault? 🟡

A) 📝 `ansible-vault encrypt filename`

B) 🔄 ansible-vault create filename

C) 📦 ansible-vault secure filename

D) 🌐 ansible-vault lock filename

**Respuesta correcta**: A) 📝 `ansible-vault encrypt filename`

> ⚡ `ansible-vault encrypt vars.yml` encripta tu archivo de variables. ¡Protege contraseñas y datos sensibles!

### 8. 📊 ¿Para qué se usa `notify` en Ansible? 🟡

A) 📝 Activar handlers cuando una tarea cambia

B) 🔄 Enviar notificaciones

C) 📦 Registrar cambios

D) 🌐 Alertar administradores

**Respuesta correcta**: A) 📝 Activar handlers cuando una tarea cambia

> 📘 Ejemplo: Una tarea que cambia archivos de configuración puede notificar a un handler para reiniciar el servicio automáticamente!

### 9. 🔄 ¿Qué hace `changed_when`? 🔴

A) 📝 Definir cuándo una tarea debe reportarse como cambiada

B) 🔄 Ejecutar tarea solo cuando cambia

C) 📦 Omitir tarea si cambió

D) 🌐 Registrar cuándo la tarea cambia

**Respuesta correcta**: A) 📝 Definir cuándo una tarea debe reportarse como cambiada

> 💡 `changed_when: result.stdout.find('already installed') == -1` reporta cambio solo cuando el software no estaba ya instalado!

### 10. 🌐 ¿Para qué se usa el módulo `lineinfile`? 🟡

A) 📝 Asegurar que una línea existe en un archivo

B) 🔄 Leer líneas de archivos

C) 📦 Contar líneas en archivos

D) 🌐 Eliminar líneas de archivos

**Respuesta correcta**: A) 📝 Asegurar que una línea existe en un archivo

> 🎯 Ejemplo: `lineinfile: path=/etc/hosts line="192.168.1.100 miservidor"` añade entrada de host si no existe!

### 11. 🔍 ¿Qué hace `register` en Ansible? 🟡

A) 📝 Almacenar la salida de una tarea en una variable

B) 🔄 Registrar un nuevo host

C) 📦 Guardar resultados de tarea en archivo

D) 🌐 Registrarse con Ansible Galaxy

**Respuesta correcta**: A) 📝 Almacenar la salida de una tarea en una variable

> 📘 `register: resultado` te permite usar la salida en tareas posteriores: `when: resultado.stdout.find('éxito') != -1`!

### 12. 🎭 ¿Para qué se usa `block` en playbooks? 🔴

A) 📝 Agrupar tareas y aplicar atributos comunes

B) 🔄 Bloquear ejecución de tareas

C) 📦 Crear bloques de código

D) 🌐 Bloquear acceso de red

**Respuesta correcta**: A) 📝 Agrupar tareas y aplicar atributos comunes

> ⚡ Los bloques permiten agrupar tareas con `when`, `become`, o manejo de errores comunes. ¡Como poner tareas en contenedores!

### 13. 🔧 ¿Qué hace el módulo `service`? 🟢

A) 📝 Gestionar servicios del sistema (iniciar, parar, habilitar)

B) 🔄 Instalar servicios

C) 📦 Monitorear servicios

D) 🌐 Configurar servicios

**Respuesta correcta**: A) 📝 Gestionar servicios del sistema (iniciar, parar, habilitar)

> 💡 Ejemplo: `service: name=nginx state=started enabled=yes` inicia nginx y lo habilita en el arranque!

### 14. 🌐 ¿Qué es `ansible-pull`? 🔴

A) 📝 Ejecutar Ansible desde nodos gestionados (modo pull)

B) 🔄 Descargar playbooks desde Git

C) 📦 Obtener inventario desde servidores

D) 🌐 Descargar módulos de Ansible

**Respuesta correcta**: A) 📝 Ejecutar Ansible desde nodos gestionados (modo pull)

> 🔄 En lugar de empujar desde el controlador, los nodos descargan y ejecutan playbooks por sí mismos. ¡Excelente para escalar a miles de nodos!

### 15. 🔍 ¿Qué hace el módulo `debug`? 🟢

A) 📝 Mostrar mensajes y valores de variables

B) 🔄 Depurar código de Ansible

C) 📦 Habilitar modo debug

D) 🌐 Depurar conexiones de red

**Respuesta correcta**: A) 📝 Mostrar mensajes y valores de variables

> 📘 `debug: msg="El valor es {{ mivariable }}"` ayuda a solucionar problemas mostrando contenido de variables durante la ejecución!

### 16. 🎯 ¿Para qué se usa el módulo `meta`? 🔴

A) 📝 Controlar el flujo de ejecución del playbook

B) 🔄 Añadir metadatos a tareas

C) 📦 Almacenar metadatos

D) 🌐 Configurar meta información

**Respuesta correcta**: A) 📝 Controlar el flujo de ejecución del playbook

> ⚡ `meta: flush_handlers` fuerza la ejecución inmediata de handlers. `meta: end_play` detiene la ejecución del playbook!

### 17. 🔧 ¿Qué hace el módulo `file`? 🟢

A) 📝 Gestionar propiedades de archivos y directorios

B) 🔄 Leer contenido de archivos

C) 📦 Editar archivos

D) 🌐 Transferir archivos

**Respuesta correcta**: A) 📝 Gestionar propiedades de archivos y directorios

> 💡 `file: path=/tmp/midir state=directory mode=0755` crea directorio con permisos específicos!

### 18. 🌐 ¿Cuál es la diferencia entre `include_tasks` e `import_tasks`? 🔴

A) 📝 include_tasks es dinámico, import_tasks es estático

B) 🔄 include_tasks es más rápido

C) 📦 import_tasks soporta mejor las variables

D) 🌐 No hay diferencia significativa

**Respuesta correcta**: A) 📝 include_tasks es dinámico, import_tasks es estático

> 🎯 `import_tasks` carga en tiempo de análisis (estático), `include_tasks` carga en tiempo de ejecución (dinámico). ¡Elige según cuándo necesites cargar las tareas!

### 19. 🔐 ¿Qué hace el módulo `stat`? 🟡

A) 📝 Obtener estado de archivo o sistema de archivos

B) 🔄 Mostrar estadísticas

C) 📦 Iniciar servicios

D) 🌐 Verificar estado de red

**Respuesta correcta**: A) 📝 Obtener estado de archivo o sistema de archivos

> 📘 `stat: path=/etc/passwd` devuelve información del archivo como tamaño, permisos, tiempo de modificación. ¡Perfecto para lógica condicional!

### 20. 🔄 ¿Qué son `async` y `poll` en Ansible? 🔴

A) 📝 Ejecutar tareas asíncronamente con intervalo de polling

B) 🔄 Red asíncrona y polling de datos

C) 📦 Operaciones de archivos asíncronas

D) 🌐 Polling de servicios externos

**Respuesta correcta**: A) 📝 Ejecutar tareas asíncronamente con intervalo de polling

> ⚡ `async: 300 poll: 10` ejecuta tarea hasta 300 segundos, verificando cada 10 segundos. ¡Genial para tareas de larga duración!

### 21. 🎯 ¿Qué son las Colecciones de Ansible? 🔴

A) 📝 Conjuntos empaquetados de módulos, plugins y roles

B) 🔄 Grupos de playbooks

C) 📦 Colecciones de inventario

D) 🌐 Colecciones de hosts

**Respuesta correcta**: A) 📝 Conjuntos empaquetados de módulos, plugins y roles

> 🏆 Colecciones como `community.general` o `ansible.posix` empaquetan funcionalidad relacionada. ¡Instala con `ansible-galaxy collection install`! 