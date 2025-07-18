# 🔧 Terraform - Cuestionario 1

## Preguntas

### 1. ❓ ¿Cuál es el propósito principal de Terraform? 🟢

A) 📝 Herramienta de Infrastructure as Code (IaC)

B) 🔄 Plataforma de orquestación de contenedores

C) 📦 Servicio de monitoreo en la nube

D) 🎯 Sistema de gestión de bases de datos

**Respuesta correcta**: A) 📝 Herramienta de Infrastructure as Code (IaC)

> 💡 Terraform es la herramienta de Infrastructure as Code de HashiCorp que permite definir y provisionar infraestructura usando archivos de configuración declarativos. ¡Como escribir una receta para tu infraestructura! 🎯

### 2. 🧠 ¿Qué extensión de archivo se usa para los archivos de configuración de Terraform? 🟢

A) 📝 `.tf`

B) 🔄 `.yaml`

C) 📦 `.json`

D) 🎯 `.hcl`

**Respuesta correcta**: A) 📝 `.tf`

> 🔍 Terraform usa archivos `.tf` para la configuración. También puedes usar `.tfvars` para archivos de variables y `.tfstate` para archivos de estado. ¡La extensión `.tf` es el estándar! 🎯

### 3. 💭 ¿Qué comando inicializa un directorio de trabajo de Terraform? 🟢

A) 📝 `terraform init`

B) 🔄 `terraform setup`

C) 📦 `terraform configure`

D) 🎯 `terraform start`

**Respuesta correcta**: A) 📝 `terraform init`

> ⚡ `terraform init` descarga proveedores, inicializa el backend y prepara el directorio de trabajo. ¡Es el primer comando que ejecutas en cualquier proyecto de Terraform! 🎯

### 4. 🤔 ¿Qué es un proveedor de Terraform? 🟡

A) 📝 Un plugin que gestiona recursos para una plataforma específica

B) 🔄 Un proveedor de servicios en la nube

C) 📦 Un archivo de configuración de Terraform

D) 🎯 Una estrategia de despliegue

**Respuesta correcta**: A) 📝 Un plugin que gestiona recursos para una plataforma específica

> 💡 Los proveedores son plugins que Terraform usa para interactuar con plataformas cloud, proveedores SaaS y otras APIs. Ejemplos: AWS, Azure, Google Cloud, GitHub, etc. 🎯

### 5. 🔧 ¿Cuál es el bloque principal usado para configurar un proveedor? 🟡

A) 📝 `provider "aws" {}`

B) 🔄 `resource "aws" {}`

C) 📦 `variable "aws" {}`

D) 🎯 `module "aws" {}`

**Respuesta correcta**: A) 📝 `provider "aws" {}`

> ⚡ El bloque `provider` configura el proveedor específico que usarás. Define detalles como región, credenciales y versión. ¡Como configurar tu conexión con el cloud! 🎯

### 6. 🎯 ¿Qué comando planifica los cambios sin aplicarlos? 🟡

A) 📝 `terraform plan`

B) 🔄 `terraform check`

C) 📦 `terraform preview`

D) 🎯 `terraform show`

**Respuesta correcta**: A) 📝 `terraform plan`

> 📋 `terraform plan` muestra qué cambios se realizarán sin ejecutarlos. ¡Como ver el menú antes de ordenar! Esencial para evitar sorpresas desagradables.

### 7. 🚀 ¿Qué comando aplica los cambios planificados? 🟢

A) 📝 `terraform apply`

B) 🔄 `terraform deploy`

C) 📦 `terraform execute`

D) 🎯 `terraform run`

**Respuesta correcta**: A) 📝 `terraform apply`

> ⚡ `terraform apply` ejecuta el plan y realiza los cambios en la infraestructura. ¡Es el momento de la verdad! Siempre revisa el plan antes de aplicar.

### 8. 🔄 ¿Qué es el estado de Terraform? 🟡

A) 📝 Archivo que mapea la configuración con los recursos reales

B) 🔄 Estado actual de la infraestructura

C) 📦 Configuración guardada

D) 🎯 Historial de cambios

**Respuesta correcta**: A) 📝 Archivo que mapea la configuración con los recursos reales

> 💡 El archivo de estado (`terraform.tfstate`) mantiene el mapeo entre tu configuración y los recursos reales. ¡Como el inventario de tu infraestructura!

### 9. 🔍 ¿Qué es un recurso en Terraform? 🟢

A) 📝 Componente de infraestructura que Terraform gestiona

B) 🔄 Archivo de configuración

C) 📦 Variable de entrada

D) 🎯 Salida del comando

**Respuesta correcta**: A) 📝 Componente de infraestructura que Terraform gestiona

> 🎯 Los recursos son los bloques fundamentales de Terraform. Representan componentes de infraestructura como servidores, redes, etc. ¡Los ingredientes de tu receta de infraestructura!

### 10. 📦 ¿Qué es un módulo en Terraform? 🟡

A) 📝 Conjunto reutilizable de recursos

B) 🔄 Archivo de configuración

C) 📦 Plugin del proveedor

D) 🎯 Variable global

**Respuesta correcta**: A) 📝 Conjunto reutilizable de recursos

> 🧩 Los módulos permiten organizar y reutilizar código de Terraform. ¡Como funciones reutilizables para tu infraestructura!

### 11. 🔧 ¿Cómo se define una variable en Terraform? 🟡

A) 📝 `variable "example" {}`

B) 🔄 `var example = "value"`

C) 📦 `set example = "value"`

D) 🎯 `define example "value"`

**Respuesta correcta**: A) 📝 `variable "example" {}`

> 💡 Las variables se definen con el bloque `variable` y pueden tener descripción, tipo y valor por defecto. ¡Como parámetros de función para tu infraestructura!

### 12. 🎯 ¿Cómo se obtiene una salida en Terraform? 🟡

A) 📝 `output "example" {}`

B) 🔄 `return "example"`

C) 📦 `export "example"`

D) 🎯 `show "example"`

**Respuesta correcta**: A) 📝 `output "example" {}`

> ⚡ Los outputs muestran valores importantes después de aplicar la configuración. ¡Como los resultados de tu receta de infraestructura!

### 13. 🚀 ¿Qué comando destruye la infraestructura? 🔴

A) 📝 `terraform destroy`

B) 🔄 `terraform delete`

C) 📦 `terraform remove`

D) 🎯 `terraform clean`

**Respuesta correcta**: A) 📝 `terraform destroy`

> ⚠️ `terraform destroy` elimina TODA la infraestructura gestionada. ¡Úsalo con mucho cuidado! Es como el botón rojo de autodestrucción.

### 14. 🔍 ¿Qué comando muestra el estado actual? 🟡

A) 📝 `terraform show`

B) 🔄 `terraform status`

C) 📦 `terraform list`

D) 🎯 `terraform info`

**Respuesta correcta**: A) 📝 `terraform show`

> 📋 `terraform show` muestra el estado actual en formato legible. ¡Como revisar el inventario de tu infraestructura!

### 15. 🔄 ¿Qué hace `terraform refresh`? 🟡

A) 📝 Actualiza el estado con la infraestructura real

B) 🔄 Reinicia la configuración

C) 📦 Recarga los proveedores

D) 🎯 Limpia la caché

**Respuesta correcta**: A) 📝 Actualiza el estado con la infraestructura real

> 🔄 `terraform refresh` sincroniza el estado con los recursos reales en la plataforma. ¡Como actualizar tu inventario con la realidad!

### 16. 🎯 ¿Qué es el backend en Terraform? 🔴

A) 📝 Configuración de dónde almacenar el estado

B) 🔄 Servidor de Terraform

C) 📦 Base de datos de configuración

D) 🎯 API del proveedor

**Respuesta correcta**: A) 📝 Configuración de dónde almacenar el estado

> 💡 El backend define dónde se almacena el archivo de estado (local, S3, Azure, etc.). ¡Crucial para trabajo en equipo!

### 17. 🔧 ¿Qué es un workspace en Terraform? 🔴

A) 📝 Entorno aislado con su propio estado

B) 🔄 Directorio de trabajo

C) 📦 Archivo de configuración

D) 🎯 Sesión de trabajo

**Respuesta correcta**: A) 📝 Entorno aislado con su propio estado

> 🎯 Los workspaces permiten múltiples entornos (dev, test, prod) con la misma configuración pero estados separados. ¡Como tener varios mundos paralelos!

### 18. 🚀 ¿Qué es el drift en Terraform? 🔴

A) 📝 Diferencia entre configuración y estado real

B) 🔄 Error de configuración

C) 📦 Cambio no planificado

D) 🎯 Versión desactualizada

**Respuesta correcta**: A) 📝 Diferencia entre configuración y estado real

> ⚠️ El drift ocurre cuando alguien modifica la infraestructura fuera de Terraform. ¡Como cuando alguien reorganiza tu casa sin decirte!

### 19. 🔍 ¿Qué archivo contiene configuración sensible? 🔴

A) 📝 `terraform.tfvars`

B) 🔄 `terraform.tf`

C) 📦 `terraform.tfstate`

D) 🎯 `terraform.lock.hcl`

**Respuesta correcta**: A) 📝 `terraform.tfvars`

> 🔐 Los archivos `.tfvars` pueden contener valores sensibles y NO deben commitearse al control de versiones. ¡Como guardar las llaves de tu casa!

### 20. 🎯 ¿Qué es el bloque `locals` en Terraform? 🔴

A) 📝 Variables locales computadas

B) 🔄 Configuración local

C) 📦 Recursos locales

D) 🎯 Archivos locales

**Respuesta correcta**: A) 📝 Variables locales computadas

> 💡 Los `locals` definen valores calculados que se pueden reutilizar en la configuración. ¡Como variables temporales en tu receta!

### 21. 🚀 ¿Cuál es la mejor práctica para secretos en Terraform? 🔴

A) 📝 Usar variables de entorno o servicios de gestión de secretos

B) 🔄 Hardcodear en archivos .tf

C) 📦 Almacenar en archivos .tfvars

D) 🎯 Usar comentarios en el código

**Respuesta correcta**: A) 📝 Usar variables de entorno o servicios de gestión de secretos

> 🔐 NUNCA hardcodees secretos. Usa variables de entorno, AWS Secrets Manager, Azure Key Vault, etc. ¡La seguridad es lo primero!
