# 🔧 Terraform - Cuestionario 2

## Preguntas

### 1. 🔧 ¿Qué es terraform import? 🔴

A) 🔧 Comando para importar infraestructura existente al estado de Terraform

B) 🌐 Importar módulos de Terraform

C) 📦 Importar archivos de configuración

D) 🎯 Importar plugins de proveedores

**Respuesta correcta**: A) 🔧 Comando para importar infraestructura existente al estado de Terraform

> 💡 `terraform import` permite traer infraestructura existente bajo la gestión de Terraform. ¡Como adoptar recursos huérfanos!

### 2. 🗄️ ¿Qué es terraform taint? 🔴

A) 🗄️ Marcar recurso para recreación en próximo apply

B) 🔧 Corromper el archivo de estado

C) 📦 Marcar recurso como malo

D) 🌐 Eliminar recurso inmediatamente

**Respuesta correcta**: A) 🗄️ Marcar recurso para recreación en próximo apply

> 📘 `terraform taint` fuerza la recreación de recursos. ¡Útil cuando necesitas reconstruir algo sin cambiar la configuración!

### 3. 🌐 ¿Qué son los provisioners en Terraform? 🔴

A) 🌐 Scripts que se ejecutan en máquinas locales/remotas durante creación de recursos

B) 🔧 Proveedores de recursos

C) 📦 Plantillas de configuración

D) 🎯 Herramientas de gestión de estado

**Respuesta correcta**: A) 🌐 Scripts que se ejecutan en máquinas locales/remotas durante creación de recursos

> ⚡ Los provisioners ejecutan scripts durante el ciclo de vida de recursos. ¡Úsalos con moderación - prefiere gestión de configuración nativa!

### 4. 📊 ¿Qué es terraform graph? 🔴

A) 📊 Visualizar grafo de dependencias de recursos

B) 🔧 Métricas de rendimiento

C) 📦 Estadísticas de recursos

D) 🌐 Visualización de estado

**Respuesta correcta**: A) 📊 Visualizar grafo de dependencias de recursos

> 💡 `terraform graph` genera formato DOT mostrando dependencias de recursos. ¡Excelente para entender infraestructuras complejas!

### 5. 🔄 ¿Cuál es la diferencia entre depends_on y dependencias implícitas? 🔴

A) 🔄 `depends_on` es explícito, implícitas usan referencias de recursos

B) 🔧 No hay diferencia

C) 📦 `depends_on` es automático

D) 🌐 Implícitas son manuales

**Respuesta correcta**: A) 🔄 `depends_on` es explícito, implícitas usan referencias de recursos

> 🎯 Las dependencias implícitas son automáticas cuando referencias atributos. ¡`depends_on` es para dependencias no obvias!

### 6. 🧪 ¿Qué es terraform validate? 🟡

A) 🧪 Verificar sintaxis y estructura de configuración

B) 🔧 Validar contra proveedor de nube

C) 📦 Validar archivo de estado

D) 🌐 Validar credenciales

**Respuesta correcta**: A) 🧪 Verificar sintaxis y estructura de configuración

> 📘 `terraform validate` verifica sintaxis sin acceder a servicios remotos. ¡Forma rápida de detectar errores de configuración!

### 7. 🔧 ¿Qué es terraform fmt? 🟡

A) 🔧 Formatear archivos de configuración consistentemente

B) 🌐 Arreglar configuración rota

C) 📦 Formatear archivos de estado

D) 🎯 Formatear salida

**Respuesta correcta**: A) 🔧 Formatear archivos de configuración consistentemente

> ⚡ `terraform fmt` estandariza formato y estilo. ¡Esencial para colaboración en equipo y revisiones de código!

### 8. 📦 ¿Qué son las fuentes de datos en Terraform? 🟡

A) 📦 Información de solo lectura de sistemas externos

B) 🔧 Datos de entrada para recursos

C) 🌐 Conexiones de base de datos

D) 🎯 Fuentes de datos de archivos

**Respuesta correcta**: A) 📦 Información de solo lectura de sistemas externos

> 💡 Las fuentes de datos obtienen información sin crear recursos. ¡Como buscar IDs de AMI existentes o detalles de VPC!

### 9. 🔒 ¿Qué es sensitive en variables de Terraform? 🔴

A) 🔒 Previene que valores sensibles se muestren en logs

B) 🔧 Encripta variables

C) 📦 Almacena variables de forma segura

D) 🌐 Valida datos sensibles

**Respuesta correcta**: A) 🔒 Previene que valores sensibles se muestren en logs

> 🛡️ La bandera `sensitive` oculta valores en salida CLI y logs. ¡No encripta - usa gestión externa de secretos!

### 10. 🌐 ¿Qué es terraform cloud? 🔴

A) 🌐 Servicio gestionado de Terraform de HashiCorp con características de colaboración

B) 🔧 Integración con proveedor de nube

C) 📦 Almacenamiento en nube para estado

D) 🎯 Validación basada en nube

**Respuesta correcta**: A) 🌐 Servicio gestionado de Terraform de HashiCorp con características de colaboración

> ⚡ Terraform Cloud proporciona estado remoto, colaboración, enforcement de políticas, y más. ¡Terraform en equipo en la nube!

### 11. 📊 ¿Qué es terraform console? 🟡

A) 📊 Consola interactiva para probar expresiones y funciones

B) 🔧 Consola basada en web

C) 📦 Consola de debug

D) 🌐 Consola de configuración

**Respuesta correcta**: A) 📊 Consola interactiva para probar expresiones y funciones

> 🔍 `terraform console` te permite probar expresiones y funciones interactivamente. ¡Excelente para debugging y aprendizaje!

### 12. 🗂️ ¿Qué son las funciones de terraform? 🟡

A) 🗂️ Funciones incorporadas para transformar y combinar valores

B) 🔧 Funciones personalizadas

C) 📦 Funciones de proveedor

D) 🌐 Funciones de recursos

**Respuesta correcta**: A) 🗂️ Funciones incorporadas para transformar y combinar valores

> 💡 Funciones como `length()`, `join()`, `file()` ayudan a manipular datos. ¡Esenciales para configuraciones dinámicas!

### 13. 🔄 ¿Qué es count en Terraform? 🟡

A) 🔄 Crear múltiples instancias de un recurso

B) 🔧 Contar recursos

C) 📦 Contador de rendimiento

D) 🌐 Contar operaciones

**Respuesta correcta**: A) 🔄 Crear múltiples instancias de un recurso

> 📘 `count` crea múltiples recursos similares. ¡Usa `count.index` para diferenciar instancias!

### 14. 🐳 ¿Qué es for_each en Terraform? 🔴

A) 🐳 Crear recursos para cada elemento en mapa o conjunto

B) 🔧 Iterar sobre listas

C) 📦 Iterar sobre recursos

D) 🌐 Para cada proveedor

**Respuesta correcta**: A) 🐳 Crear recursos para cada elemento en mapa o conjunto

> 🚀 `for_each` es más flexible que count, permite creación dinámica de recursos con claves únicas!

### 15. 🔧 ¿Qué es terraform state mv? 🔴

A) 🔧 Mover recursos en archivo de estado

B) 🌐 Mover archivos de estado

C) 📦 Mover configuración

D) 🎯 Mover proveedores

**Respuesta correcta**: A) 🔧 Mover recursos en archivo de estado

> ⚡ `terraform state mv` reubica recursos en estado sin afectar infraestructura real. ¡Útil para refactoring!

### 16. 📊 ¿Qué es terraform state rm? 🔴

A) 📊 Remover recursos del estado sin destruirlos

B) 🔧 Remover archivo de estado

C) 📦 Remover configuración

D) 🌐 Remover proveedores

**Respuesta correcta**: A) 📊 Remover recursos del estado sin destruirlos

> 👁️ `terraform state rm` remueve de la gestión de Terraform pero deja recursos reales intactos!

### 17. 🔧 ¿Qué son las condiciones de terraform? 🔴

A) 🔧 Expresiones condicionales usando `condition ? true_val : false_val`

B) 🌐 Declaraciones if-else

C) 📦 Recursos condicionales

D) 🎯 Condiciones de validación

**Respuesta correcta**: A) 🔧 Expresiones condicionales usando `condition ? true_val : false_val`

> 🏗️ Las expresiones condicionales permiten configuraciones dinámicas basadas en variables u otros valores!

### 18. 📡 ¿Qué es la fuente de datos terraform_remote_state? 🔴

A) 📡 Acceder a outputs de otro estado de Terraform

B) 🔧 Almacenamiento de estado remoto

C) 📦 Sincronización de estado

D) 🌐 Configuración remota

**Respuesta correcta**: A) 📡 Acceder a outputs de otro estado de Terraform

> 🚀 `terraform_remote_state` te permite usar outputs de otros proyectos Terraform. ¡Habilita arquitecturas modulares!

### 19. 🔐 ¿Qué son los locks de terraform? 🔴

A) 🔐 Prevenir operaciones concurrentes en el mismo estado

B) 🔒 Bloqueos de seguridad

C) 🛡️ Bloqueos de recursos

D) 🔑 Bloqueos de configuración

**Respuesta correcta**: A) 🔐 Prevenir operaciones concurrentes en el mismo estado

> 🔍 El bloqueo de estado previene corrupción por operaciones simultáneas de terraform. ¡Crítico para entornos de equipo!

### 20. 🎪 ¿Qué son las restricciones de versión de terraform? 🔴

A) 🎪 Especificar versiones requeridas de Terraform y proveedores

B) 🔧 Control de versión

C) 📦 Verificación de versión

D) 🌐 Actualizaciones de versión

**Respuesta correcta**: A) 🎪 Especificar versiones requeridas de Terraform y proveedores

> 🎭 Las restricciones de versión aseguran deployments reproducibles fijando versiones específicas. ¡Previene drift de versión!

### 21. 🎯 ¿Cuáles son las prácticas avanzadas de Terraform? 🔴

A) 🎯 Usar módulos, estado remoto, restricciones de versión, workspaces, automatización

B) 🔧 Solo usar estado local

C) 📦 Evitar módulos

D) 🌐 Solo deployment manual

**Respuesta correcta**: A) 🎯 Usar módulos, estado remoto, restricciones de versión, workspaces, automatización

> 🏆 Terraform avanzado: diseño modular, backends remotos, integración CI/CD, policy as code, mejores prácticas de gestión de estado! 