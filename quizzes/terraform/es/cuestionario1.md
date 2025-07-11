# 🔧 Terraform - Cuestionario 1

## Preguntas

### ❓ ¿Cuál es el propósito principal de Terraform? 🟢

📝 Herramienta de Infrastructure as Code (IaC)
🔄 Plataforma de orquestación de contenedores
📦 Servicio de monitoreo en la nube
🎯 Sistema de gestión de bases de datos

**Respuesta Correcta:**
📝 Herramienta de Infrastructure as Code (IaC)

**Explicación:**
💡 Terraform es la herramienta de Infrastructure as Code de HashiCorp que permite definir y provisionar infraestructura usando archivos de configuración declarativos. ¡Como escribir una receta para tu infraestructura! 🎯

---

### 🧠 ¿Qué extensión de archivo se usa para los archivos de configuración de Terraform? 🟢

📝 `.tf`
🔄 `.yaml`
📦 `.json`
🎯 `.hcl`

**Respuesta Correcta:**
📝 `.tf`

**Explicación:**
🔍 Terraform usa archivos `.tf` para la configuración. También puedes usar `.tfvars` para archivos de variables y `.tfstate` para archivos de estado. ¡La extensión `.tf` es el estándar! 🎯

---

### 💭 ¿Qué comando inicializa un directorio de trabajo de Terraform? 🟢

📝 `terraform init`
🔄 `terraform setup`
📦 `terraform configure`
🎯 `terraform start`

**Respuesta Correcta:**
📝 `terraform init`

**Explicación:**
⚡ `terraform init` descarga proveedores, inicializa el backend y prepara el directorio de trabajo. ¡Es el primer comando que ejecutas en cualquier proyecto de Terraform! 🎯

---

### 🤔 ¿Qué es un proveedor de Terraform? 🟡

📝 Un plugin que gestiona recursos para una plataforma específica
🔄 Un proveedor de servicios en la nube
📦 Un archivo de configuración de Terraform
🎯 Una estrategia de despliegue

**Respuesta Correcta:**
📝 Un plugin que gestiona recursos para una plataforma específica

**Explicación:**
💡 Los proveedores son plugins que Terraform usa para interactuar con proveedores de nube, proveedores SaaS y otras APIs. Ejemplos: AWS, Azure, Google Cloud, GitHub, etc. 🎯

---

### 🔧 ¿Cuál es el bloque principal usado para configurar un proveedor? 🟡

📝 `provider "aws" {}`
🔄 `resource "aws" {}`
📦 `variable "aws" {}`
🎯 `module "aws" {}`

**Respuesta Correcta:**
📝 `provider "aws" {}`

**Explicación:**
🩺 El bloque `provider` configura un proveedor específico. Especificas el nombre del proveedor y cualquier opción de configuración requerida como región, credenciales, etc. 🎯

---

### ⚙️ ¿Qué comando muestra el plan de ejecución? 🟡

📝 `terraform plan`
🔄 `terraform preview`
📦 `terraform show`
🎯 `terraform status`

**Respuesta Correcta:**
📝 `terraform plan`

**Explicación:**
🔧 `terraform plan` muestra lo que Terraform hará antes de hacer cambios. Es como una vista previa de los cambios de infraestructura que se aplicarán. ¡Siempre revisa el plan! 🎯

---

### 🔍 ¿Qué es un archivo de estado de Terraform? 🔴

📝 Un archivo que rastrea el estado actual de los recursos gestionados
🔄 Un archivo de configuración del proyecto
📦 Una copia de seguridad de tu infraestructura
🎯 Un archivo de registro de operaciones de Terraform

**Respuesta Correcta:**
📝 Un archivo que rastrea el estado actual de los recursos gestionados

**Explicación:**
🩺 El archivo de estado mapea recursos del mundo real a tu configuración, mantiene un seguimiento de metadatos y mejora el rendimiento para infraestructuras grandes. ¡Es la memoria de Terraform! 🎯

---

### 🚀 ¿Qué es un backend de Terraform? 🔴

📝 Una configuración que determina dónde se almacena el estado
🔄 Un servidor que ejecuta comandos de Terraform
📦 Un endpoint de API del proveedor de nube
🎯 Un archivo de configuración de Terraform

**Respuesta Correcta:**
📝 Una configuración que determina dónde se almacena el estado

**Explicación:**
💡 Los backends determinan dónde Terraform almacena su estado. Opciones incluyen archivos locales, almacenamiento remoto (S3, Azure Storage), o Terraform Cloud. ¡Habilita la colaboración en equipo! 🎯

---

### 🔧 ¿Qué es un módulo de Terraform? 🔴

📝 Una colección reutilizable de recursos de Terraform
🔄 Un archivo de configuración de Terraform
📦 Un plugin de proveedor
🎯 Una estrategia de despliegue

**Respuesta Correcta:**
📝 Una colección reutilizable de recursos de Terraform

**Explicación:**
⚡ Los módulos son configuraciones reutilizables de Terraform que pueden ser llamadas desde otras configuraciones. Ayudan a organizar código, hacerlo reutilizable y tratar piezas de infraestructura como cajas negras! 🎯

---

### ❓ ¿Qué comando aplica los cambios de Terraform? 🟢

📝 `terraform apply`
🔄 `terraform deploy`
📦 `terraform execute`
🎯 `terraform run`

**Respuesta Correcta:**
📝 `terraform apply`

**Explicación:**
💡 `terraform apply` ejecuta las acciones propuestas en un plan de Terraform para alcanzar el estado deseado de la configuración. ¡Es el comando que realmente crea/modifica recursos! 🎯

---

### 🧠 ¿Qué es una variable de Terraform? 🟢

📝 Un valor nombrado que puede ser establecido para personalizar la configuración
🔄 Una variable de programación en Terraform
📦 Un archivo de configuración
🎯 Un tipo de recurso

**Respuesta Correcta:**
📝 Un valor nombrado que puede ser establecido para personalizar la configuración

**Explicación:**
🔍 Las variables te permiten personalizar aspectos de los módulos de Terraform sin alterar el código fuente del módulo. ¡Hacen que tus configuraciones sean flexibles y reutilizables! 🎯

---

### 💭 ¿Cuál es la sintaxis para referenciar una variable? 🟢

📝 `var.nombre_variable`
🔄 `variable.nombre_variable`
📦 `var[nombre_variable]`
🎯 `variable[nombre_variable]`

**Respuesta Correcta:**
📝 `var.nombre_variable`

**Explicación:**
⚡ Usa `var.nombre_variable` para referenciar variables en tu configuración de Terraform. El prefijo `var` le dice a Terraform que estás referenciando una variable, no un recurso o fuente de datos! 🎯

---

### 🤔 ¿Qué es una fuente de datos de Terraform? 🟡

📝 Una forma de obtener información sobre recursos que existen fuera de Terraform
🔄 Un repositorio de código fuente para Terraform
📦 Una copia de seguridad de tu infraestructura
🎯 Un archivo de configuración

**Respuesta Correcta:**
📝 Una forma de obtener información sobre recursos que existen fuera de Terraform

**Explicación:**
💡 Las fuentes de datos permiten que Terraform use información definida fuera de Terraform, o definida por otra configuración separada de Terraform. ¡Como leer recursos existentes! 🎯

---

### 🔧 ¿Cuál es la sintaxis para referenciar una fuente de datos? 🟡

📝 `data.tipo.nombre.atributo`
🔄 `datasource.tipo.nombre.atributo`
📦 `data[tipo.nombre].atributo`
🎯 `datasource[tipo.nombre].atributo`

**Respuesta Correcta:**
📝 `data.tipo.nombre.atributo`

**Explicación:**
🩺 Usa `data.tipo.nombre.atributo` para referenciar fuentes de datos. El prefijo `data` lo distingue de los recursos, y puedes acceder a cualquier atributo de la fuente de datos! 🎯

---

### ⚙️ ¿Qué es una salida de Terraform? 🟡

📝 Una forma de exponer ciertos valores de tu configuración
🔄 Un mensaje de registro de Terraform
📦 Un archivo de configuración
🎯 Un tipo de recurso

**Respuesta Correcta:**
📝 Una forma de exponer ciertos valores de tu configuración

**Explicación:**
🔧 Las salidas exponen valores específicos de tu configuración de Terraform. Son útiles para obtener información sobre recursos después de que se crean, como direcciones IP o URLs! 🎯

---

### 🔍 ¿Qué es un workspace de Terraform? 🔴

📝 Una colección nombrada de archivos de estado para gestionar múltiples entornos
🔄 Un entorno de desarrollo para Terraform
📦 Un workspace en la nube para colaboración
🎯 Un directorio de configuración de Terraform

**Respuesta Correcta:**
📝 Una colección nombrada de archivos de estado para gestionar múltiples entornos

**Explicación:**
🩺 Los workspaces te permiten gestionar múltiples archivos de estado dentro de una sola configuración de Terraform. Útil para gestionar diferentes entornos (dev, staging, prod) con el mismo código! 🎯

---

### 🚀 ¿Qué es un recurso de Terraform? 🔴

📝 Un bloque que describe uno o más objetos de infraestructura
🔄 Un recurso en la nube como un servidor
📦 Un archivo de configuración de Terraform
🎯 Un plugin de proveedor

**Respuesta Correcta:**
📝 Un bloque que describe uno o más objetos de infraestructura

**Explicación:**
💡 Los recursos son el elemento más importante en el lenguaje de Terraform. Cada bloque de recurso describe uno o más objetos de infraestructura, como redes virtuales, instancias de cómputo o registros DNS! 🎯

---

### 🔧 ¿Cuál es la sintaxis para referenciar un atributo de recurso? 🔴

📝 `tipo_recurso.nombre_recurso.atributo`
🔄 `resource.tipo_recurso.nombre_recurso.atributo`
📦 `tipo_recurso[nombre_recurso].atributo`
🎯 `resource[tipo_recurso.nombre_recurso].atributo`

**Respuesta Correcta:**
📝 `tipo_recurso.nombre_recurso.atributo`

**Explicación:**
⚡ Usa `tipo_recurso.nombre_recurso.atributo` para referenciar atributos de recursos. Esta sintaxis te permite usar valores de un recurso en otro recurso o salida! 🎯

---

### ❓ ¿Qué comando destruye la infraestructura gestionada por Terraform? 🟢

📝 `terraform destroy`
🔄 `terraform delete`
📦 `terraform remove`
🎯 `terraform cleanup`

**Respuesta Correcta:**
📝 `terraform destroy`

**Explicación:**
💡 `terraform destroy` elimina todos los recursos gestionados por la configuración actual de Terraform. ¡Es lo opuesto a `terraform apply` - elimina infraestructura! 🎯

---

### 🧠 ¿Qué es un valor local de Terraform? 🟢

📝 Un valor nombrado que puede ser asignado y usado múltiples veces
🔄 Un archivo local en Terraform
📦 Una variable que solo está disponible localmente
🎯 Una configuración

**Respuesta Correcta:**
📝 Un valor nombrado que puede ser asignado y usado múltiples veces

**Explicación:**
🔍 Los valores locales asignan un nombre a una expresión, para que puedas usarla múltiples veces sin repetición. ¡Ayudan a reducir la repetición en tu configuración de Terraform! 🎯

---

### 💭 ¿Cuál es la sintaxis para referenciar un valor local? 🟢

📝 `local.nombre_valor`
🔄 `local[nombre_valor]`
📦 `local_value.nombre_valor`
🎯 `local_value[nombre_valor]`

**Respuesta Correcta:**
📝 `local.nombre_valor`

**Explicación:**
⚡ Usa `local.nombre_valor` para referenciar valores locales en tu configuración de Terraform. ¡El prefijo `local` le dice a Terraform que estás referenciando un valor local! 🎯
