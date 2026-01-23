# 🔧 Ansible Avanzado - Cuestionario 4

## Preguntas

### 1. ❓ ¿Cuál es el propósito del módulo `gather_facts` en Ansible? 🔴

A) 📝 Recopilar información del sistema de los hosts objetivo

B) ⚙️ Instalar paquetes en sistemas remotos

C) 🔧 Configurar interfaces de red

D) 🐳 Gestionar cuentas de usuario

**Respuesta Correcta**: A) 📝 Recopilar información del sistema de los hosts objetivo

💡 El módulo `gather_facts` recopila información del sistema (como direcciones IP, detalles del SO, información de hardware) de los hosts objetivo, que luego puede usarse como variables en los playbooks.

### 2. 🧠 ¿Qué directiva de Ansible te permite ejecutar tareas solo en hosts que coincidan con condiciones específicas? 🔴

A) 📝 `when`

B) ⚙️ `if`

C) 🔧 `condition`

D) 🐳 `filter`

**Respuesta Correcta**: A) 📝 `when`

💡 La directiva `when` te permite ejecutar tareas condicionalmente basándose en facts, variables u otras condiciones, haciendo los playbooks más dinámicos y flexibles.

### 3. 🤔 ¿Cuál es el propósito del parámetro `delegate_to` en las tareas de Ansible? 🔴

A) 📝 Especificar qué host debe ejecutar la tarea

B) ⚙️ Definir dependencias de tareas

C) 🔧 Establecer prioridades de tareas

D) 🐳 Configurar timeouts de tareas

**Respuesta Correcta**: A) 📝 Especificar qué host debe ejecutar la tarea

💡 `delegate_to` te permite ejecutar una tarea en un host diferente al que se está gestionando, útil para tareas que necesitan ejecutarse en el nodo de control de Ansible o en un host específico.

### 4. 🔍 ¿Qué característica de Ansible te permite reutilizar lógica de playbook en diferentes proyectos? 🔴

A) 📝 Roles

B) ⚙️ Plantillas

C) 🔧 Variables

D) 🐳 Handlers

**Respuesta Correcta**: A) 📝 Roles

💡 Los roles son una forma de organizar playbooks y hacerlos reutilizables agrupando tareas, variables y archivos relacionados en una estructura estandarizada.

### 5. ❓ ¿Cuál es el propósito del parámetro `serial` en los playbooks de Ansible? 🔴

A) 📝 Controlar el orden de ejecución de tareas

B) ⚙️ Limitar el número de hosts procesados simultáneamente

C) 🔧 Establecer prioridades de tareas

D) 🐳 Configurar timeouts de tareas

**Respuesta Correcta**: B) ⚙️ Limitar el número de hosts procesados simultáneamente

💡 El parámetro `serial` controla las actualizaciones graduales limitando cuántos hosts se procesan simultáneamente, útil para despliegues sin tiempo de inactividad.

### 6. 🧠 ¿Qué módulo de Ansible se usa para gestionar servicios systemd? 🔴

A) 📝 `service`

B) ⚙️ `systemd`

C) 🔧 `daemon`

D) 🐳 `init`

**Respuesta Correcta**: A) 📝 `service`

💡 El módulo `service` puede gestionar tanto servicios systemd como init, detectando automáticamente el gestor de servicios apropiado en el sistema objetivo.

### 7. 🤔 ¿Cuál es el propósito de la palabra clave `register` en las tareas de Ansible? 🔴

A) 📝 Almacenar resultados de tareas en variables

B) ⚙️ Registrar hosts con Ansible Tower

C) 🔧 Crear cuentas de usuario

D) 🐳 Configurar interfaces de red

**Respuesta Correcta**: A) 📝 Almacenar resultados de tareas en variables

💡 La palabra clave `register` captura la salida de una tarea y la almacena en una variable, permitiéndote usar los resultados en tareas posteriores o condiciones.

### 8. 🔍 ¿Qué característica de Ansible te permite manejar fallos de tareas de manera elegante? 🔴

A) 📝 `ignore_errors`

B) ⚙️ `fail_fast`

C) 🔧 `continue_on_error`

D) 🐳 `error_handling`

**Respuesta Correcta**: A) 📝 `ignore_errors`

💡 `ignore_errors` permite que las tareas continúen incluso si fallan, mientras que `block` y `rescue` proporcionan capacidades de manejo de errores más sofisticadas.

### 9. ❓ ¿Cuál es el propósito de la directiva `become` en Ansible? 🔴

A) 📝 Cambiar el host objetivo

B) ⚙️ Escalar privilegios (convertirse en root)

C) 🔧 Cambiar el método de conexión

D) 🐳 Modificar parámetros de tareas

**Respuesta Correcta**: B) ⚙️ Escalar privilegios (convertirse en root)

💡 La directiva `become` permite que las tareas se ejecuten con privilegios elevados, comúnmente usado para ejecutar comandos como root u otros usuarios.

### 10. 🧠 ¿Qué módulo de Ansible se usa para copiar archivos del nodo de control a hosts remotos? 🔴

A) 📝 `copy`

B) ⚙️ `file`

C) 🔧 `template`

D) 🐳 `fetch`

**Respuesta Correcta**: A) 📝 `copy`

💡 El módulo `copy` copia archivos del nodo de control de Ansible a hosts remotos, mientras que `template` renderiza plantillas Jinja2 y `fetch` copia archivos de hosts remotos al nodo de control.

### 11. 🤔 ¿Cuál es el propósito de la palabra clave `loop` en las tareas de Ansible? 🔴

A) 📝 Crear bucles infinitos

B) ⚙️ Iterar sobre listas o diccionarios

C) 🔧 Controlar el orden de ejecución de tareas

D) 🐳 Establecer prioridades de tareas

**Respuesta Correcta**: B) ⚙️ Iterar sobre listas o diccionarios

💡 La palabra clave `loop` te permite iterar sobre listas o diccionarios, ejecutando la misma tarea múltiples veces con diferentes valores.

### 12. 🔍 ¿Qué característica de Ansible te permite ejecutar tareas solo cuando se cumplen ciertas condiciones? 🔴

A) 📝 `when` con facts

B) ⚙️ `if` statements

C) 🔧 `condition` blocks

D) 🐳 `filter` expressions

**Respuesta Correcta**: A) 📝 `when` con facts

💡 La directiva `when` puede usar facts del sistema, variables, o resultados de tareas anteriores para determinar si una tarea debe ejecutarse, proporcionando control granular sobre la ejecución.

### 13. ❓ ¿Cuál es el propósito del parámetro `gather_subset` en Ansible? 🔴

A) 📝 Controlar qué facts se recopilan

B) ⚙️ Definir subconjuntos de hosts

C) 🔧 Establecer grupos de tareas

D) 🐳 Configurar inventarios dinámicos

**Respuesta Correcta**: A) 📝 Controlar qué facts se recopilan

💡 `gather_subset` te permite especificar qué categorías de facts recopilar (como hardware, red, distribución), optimizando el rendimiento y reduciendo el tiempo de ejecución.

### 14. 🧠 ¿Qué módulo de Ansible se usa para gestionar paquetes en sistemas basados en Debian? 🔴

A) 📝 `apt`

B) ⚙️ `yum`

C) 🔧 `package`

D) 🐳 `dnf`

**Respuesta Correcta**: A) 📝 `apt`

💡 El módulo `apt` es específico para sistemas basados en Debian/Ubuntu, mientras que `package` es genérico y detecta automáticamente el gestor de paquetes apropiado.

### 15. 🤔 ¿Cuál es el propósito de la palabra clave `tags` en Ansible? 🔴

A) 📝 Etiquetar hosts para inventarios

B) ⚙️ Agrupar tareas para ejecución selectiva

C) 🔧 Marcar archivos para sincronización

D) 🐳 Categorizar variables de entorno

**Respuesta Correcta**: B) ⚙️ Agrupar tareas para ejecución selectiva

💡 Los `tags` permiten ejecutar solo ciertas partes de un playbook, útil para desarrollo, testing o mantenimiento sin ejecutar todo el playbook.

### 16. 🔍 ¿Qué característica de Ansible te permite manejar dependencias entre tareas? 🔴

A) 📝 `dependencies` blocks

B) ⚙️ `depends_on` parameter

C) 🔧 `require` statements

D) 🐳 `needs` conditions

**Respuesta Correcta**: A) 📝 `dependencies` blocks

💡 Ansible maneja dependencias automáticamente basándose en el orden de las tareas, pero puedes usar `block` y `rescue` para manejo de errores más sofisticado.

### 17. ❓ ¿Cuál es el propósito del parámetro `forks` en la configuración de Ansible? 🔴

A) 📝 Controlar el número de hosts procesados simultáneamente

B) ⚙️ Definir el número de tareas por playbook

C) 🔧 Establecer límites de memoria por host

D) 🐳 Configurar timeouts de conexión

**Respuesta Correcta**: A) 📝 Controlar el número de hosts procesados simultáneamente

💡 `forks` controla el paralelismo de Ansible, determinando cuántos hosts se procesan simultáneamente, afectando el rendimiento y uso de recursos.

### 18. 🧠 ¿Qué módulo de Ansible se usa para gestionar usuarios del sistema? 🔴

A) 📝 `user`

B) ⚙️ `account`

C) 🔧 `passwd`

D) 🐳 `group`

**Respuesta Correcta**: A) 📝 `user`

💡 El módulo `user` gestiona cuentas de usuario del sistema, incluyendo creación, modificación y eliminación, mientras que `group` maneja grupos de usuarios.

### 19. 🤔 ¿Cuál es el propósito de la palabra clave `environment` en Ansible? 🔴

A) 📝 Definir variables de entorno para tareas

B) ⚙️ Configurar el entorno de ejecución

C) 🔧 Establecer el contexto de seguridad

D) 🐳 Gestionar configuraciones de red

**Respuesta Correcta**: A) 📝 Definir variables de entorno para tareas

💡 `environment` te permite establecer variables de entorno específicas para tareas individuales, útil para comandos que requieren configuraciones de entorno particulares.

### 20. 🔍 ¿Qué característica de Ansible te permite ejecutar tareas en orden secuencial? 🔴

A) 📝 `serial` parameter

B) ⚙️ `sequential` blocks

C) 🔧 `order` directive

D) 🐳 `sequence` tasks

**Respuesta Correcta**: A) 📝 `serial` parameter

💡 El parámetro `serial` controla el orden de ejecución de tareas, asegurando que se ejecuten en secuencia en lugar de en paralelo.

### 21. ❓ ¿Cuál es el propósito del parámetro `strategy` en los playbooks de Ansible? 🔴

A) 📝 Definir cómo se ejecutan las tareas en los hosts

B) ⚙️ Establecer políticas de seguridad

C) 🔧 Configurar métodos de conexión

D) 🐳 Gestionar inventarios dinámicos

**Respuesta Correcta**: A) 📝 Definir cómo se ejecutan las tareas en los hosts

💡 `strategy` controla cómo Ansible ejecuta tareas en múltiples hosts, con opciones como `linear` (secuencial) o `free` (paralelo), afectando el rendimiento y control de despliegues.

🔴
