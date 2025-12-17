# 🔧 Terraform - Questions 1

## Questions

### 1. ❓ What is Terraform's primary purpose? 🟢

A) 📝 Infrastructure as Code (IaC) tool

B) 🔄 Container orchestration platform

C) 📦 Cloud monitoring service

D) 🎯 Database management system

**Correct Answer**: A) 📝 Infrastructure as Code (IaC) tool

> 💡 Terraform is HashiCorp's Infrastructure as Code tool that allows you to define and provision infrastructure using declarative configuration files. Like writing a recipe for your infrastructure! 🎯

### 2. 🧠 What file extension is used for Terraform configuration files? 🟢

A) 📝 `.tf`

B) 🔄 `.yaml`

C) 📦 `.json`

D) 🎯 `.hcl`

**Correct Answer**: A) 📝 `.tf`

> 🔍 Terraform uses `.tf` files for configuration. You can also use `.tfvars` for variable files and `.tfstate` for state files. The `.tf` extension is the standard! 🎯

### 3. 💭 What command initializes a Terraform working directory? 🟢

A) 📝 `terraform init`

B) 🔄 `terraform setup`

C) 📦 `terraform configure`

D) 🎯 `terraform start`

**Correct Answer**: A) 📝 `terraform init`

> ⚡ `terraform init` downloads providers, initializes the backend, and prepares the working directory. It's the first command you run in any Terraform project! 🎯

### 4. 🤔 What is a Terraform provider? 🟡

A) 📝 A plugin that manages resources for a specific platform

B) 🔄 A cloud service provider

C) 📦 A Terraform configuration file

D) 🎯 A deployment strategy

**Correct Answer**: A) 📝 A plugin that manages resources for a specific platform

> 💡 Providers are plugins that Terraform uses to interact with cloud providers, SaaS providers, and other APIs. Examples: AWS, Azure, Google Cloud, GitHub, etc. 🎯

### 5. 🔧 What is the main block used to configure a provider? 🟡

A) 📝 `provider "aws" {}`

B) 🔄 `resource "aws" {}`

C) 📦 `variable "aws" {}`

D) 🎯 `module "aws" {}`

**Correct Answer**: A) 📝 `provider "aws" {}`

> ⚡ The `provider` block configures the specific provider you'll use. It defines details like region, credentials, and version. Like setting up your cloud connection! 🎯

### 6. 🎯 What command plans changes without applying them? 🟡

A) 📝 `terraform plan`

B) 🔄 `terraform check`

C) 📦 `terraform preview`

D) 🎯 `terraform show`

**Correct Answer**: A) 📝 `terraform plan`

> 📋 `terraform plan` shows what changes will be made without executing them. Like seeing the menu before ordering! Essential to avoid unpleasant surprises.

### 7. 🚀 What command applies the planned changes? 🟢

A) 📝 `terraform apply`

B) 🔄 `terraform deploy`

C) 📦 `terraform execute`

D) 🎯 `terraform run`

**Correct Answer**: A) 📝 `terraform apply`

> ⚡ `terraform apply` executes the plan and makes changes to infrastructure. This is the moment of truth! Always review the plan before applying.

### 8. 🔄 What is Terraform state? 🟡

A) 📝 File that maps configuration to real resources

B) 🔄 Current infrastructure status

C) 📦 Saved configuration

D) 🎯 Change history

**Correct Answer**: A) 📝 File that maps configuration to real resources

> 💡 The state file (`terraform.tfstate`) maintains the mapping between your configuration and real resources. Like the inventory of your infrastructure!

### 9. 🔍 What is a resource in Terraform? 🟢

A) 📝 Infrastructure component that Terraform manages

B) 🔄 Configuration file

C) 📦 Input variable

D) 🎯 Command output

**Correct Answer**: A) 📝 Infrastructure component that Terraform manages

> 🎯 Resources are the fundamental building blocks of Terraform. They represent infrastructure components like servers, networks, etc. The ingredients of your infrastructure recipe!

### 10. 📦 What is a module in Terraform? 🟡

A) 📝 Reusable set of resources

B) 🔄 Configuration file

C) 📦 Provider plugin

D) 🎯 Global variable

**Correct Answer**: A) 📝 Reusable set of resources

> 🧩 Modules allow you to organize and reuse Terraform code. Like reusable functions for your infrastructure!

### 11. 🔧 How do you define a variable in Terraform? 🟡

A) 📝 `variable "example" {}`

B) 🔄 `var example = "value"`

C) 📦 `set example = "value"`

D) 🎯 `define example "value"`

**Correct Answer**: A) 📝 `variable "example" {}`

> 💡 Variables are defined with the `variable` block and can have description, type, and default values. Like function parameters for your infrastructure!

### 12. 🎯 How do you get output in Terraform? 🟡

A) 📝 `output "example" {}`

B) 🔄 `return "example"`

C) 📦 `export "example"`

D) 🎯 `show "example"`

**Correct Answer**: A) 📝 `output "example" {}`

> ⚡ Outputs display important values after applying the configuration. Like the results of your infrastructure recipe!

### 13. 🚀 What command destroys infrastructure? 🔴

A) 📝 `terraform destroy`

B) 🔄 `terraform delete`

C) 📦 `terraform remove`

D) 🎯 `terraform clean`

**Correct Answer**: A) 📝 `terraform destroy`

> ⚠️ `terraform destroy` removes ALL managed infrastructure. Use with extreme caution! It's like the red self-destruct button.

### 14. 🔍 What command shows the current state? 🟡

A) 📝 `terraform show`

B) 🔄 `terraform status`

C) 📦 `terraform list`

D) 🎯 `terraform info`

**Correct Answer**: A) 📝 `terraform show`

> 📋 `terraform show` displays the current state in human-readable format. Like reviewing your infrastructure inventory!

### 15. 🔄 What does `terraform refresh` do? 🟡

A) 📝 Updates state with real infrastructure

B) 🔄 Restarts configuration

C) 📦 Reloads providers

D) 🎯 Clears cache

**Correct Answer**: A) 📝 Updates state with real infrastructure

> 🔄 `terraform refresh` syncs the state with real resources on the platform. Like updating your inventory with reality!

### 16. 🎯 What is the backend in Terraform? 🔴

A) 📝 Configuration of where to store state

B) 🔄 Terraform server

C) 📦 Configuration database

D) 🎯 Provider API

**Correct Answer**: A) 📝 Configuration of where to store state

> 💡 The backend defines where the state file is stored (local, S3, Azure, etc.). Crucial for team collaboration!

### 17. 🔧 What is a workspace in Terraform? 🔴

A) 📝 Isolated environment with its own state

B) 🔄 Working directory

C) 📦 Configuration file

D) 🎯 Work session

**Correct Answer**: A) 📝 Isolated environment with its own state

> 🎯 Workspaces allow multiple environments (dev, test, prod) with the same configuration but separate states. Like having several parallel worlds!

### 18. 🚀 What is drift in Terraform? 🔴

A) 📝 Difference between configuration and real state

B) 🔄 Configuration error

C) 📦 Unplanned change

D) 🎯 Outdated version

**Correct Answer**: A) 📝 Difference between configuration and real state

> ⚠️ Drift occurs when someone modifies infrastructure outside of Terraform. Like when someone rearranges your house without telling you!

### 19. 🔍 What file contains sensitive configuration? 🔴

A) 📝 `terraform.tfvars`

B) 🔄 `terraform.tf`

C) 📦 `terraform.tfstate`

D) 🎯 `terraform.lock.hcl`

**Correct Answer**: A) 📝 `terraform.tfvars`

> 🔐 `.tfvars` files can contain sensitive values and should NOT be committed to version control. Like storing your house keys!

### 20. 🎯 What is the `locals` block in Terraform? 🔴

A) 📝 Computed local variables

B) 🔄 Local configuration

C) 📦 Local resources

D) 🎯 Local files

**Correct Answer**: A) 📝 Computed local variables

> 💡 `locals` define calculated values that can be reused in the configuration. Like temporary variables in your recipe!

### 21. 🚀 What's the best practice for secrets in Terraform? 🔴

A) 📝 Use environment variables or secret management services

B) 🔄 Hardcode in .tf files

C) 📦 Store in .tfvars files

D) 🎯 Use code comments

**Correct Answer**: A) 📝 Use environment variables or secret management services

> 🔐 NEVER hardcode secrets. Use environment variables, AWS Secrets Manager, Azure Key Vault, etc. Security first!
