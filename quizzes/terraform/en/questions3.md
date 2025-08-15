# Terraform Quiz 3 - Advanced

❓ What is the purpose of Terraform workspaces? 🔴

📝 Manage multiple environments with same configuration
⚙️ Organize code files
🧱 Manage state files
📦 Manage providers

💡 Terraform workspaces allow you to manage multiple environments (dev, staging, prod) using the same configuration and state management.

---

❓ Which Terraform feature allows for conditional resource creation? 🟡

📝 Count and for_each meta-arguments
⚙️ Variables only
🧱 Locals only
📦 Outputs only

💡 Count and for_each meta-arguments allow you to conditionally create resources based on variable values or lists.

---

❓ What does the `terraform plan` command do? 🟢

📝 Show what changes will be made
⚙️ Apply changes to infrastructure
🧱 Initialize Terraform
📦 Destroy infrastructure

💡 The `terraform plan` command shows a preview of what changes Terraform will make to your infrastructure without actually applying them.

---

❓ Which Terraform concept allows for reusable modules? 🟢

📝 Module system
⚙️ Variables
🧱 Locals
📦 Outputs

💡 Terraform's module system allows you to create reusable, configurable infrastructure components.

---

❓ What is the purpose of Terraform data sources? 🟢

📝 Query existing infrastructure information
⚙️ Create new resources
🧱 Modify existing resources
📦 Delete resources

💡 Data sources allow Terraform to query existing infrastructure to get information needed for resource creation.

---

❓ Which Terraform feature allows for dynamic configuration? 🟡

📝 Dynamic blocks
⚙️ Static blocks only
🧱 Variables only
📦 Locals only

💡 Dynamic blocks allow you to generate configuration blocks dynamically based on variable values.

---

❓ What does the `terraform destroy` command do? 🟢

📝 Remove all managed infrastructure
⚙️ Show planned changes
🧱 Initialize Terraform
📦 Apply changes

💡 The `terraform destroy` command removes all infrastructure managed by Terraform.

---

❓ Which Terraform concept allows for state management? 🟡

📝 Remote state backends
⚙️ Local state only
🧱 No state management
📦 Manual state management

💡 Remote state backends allow you to store Terraform state in remote storage for team collaboration and state locking.

---

❓ What is the purpose of Terraform providers? 🟢

📝 Define infrastructure platforms and services
⚙️ Manage variables
🧱 Manage outputs
📦 Manage modules

💡 Providers define the infrastructure platforms and services that Terraform can manage.

---

❓ Which Terraform feature allows for resource dependencies? 🟢

📝 Implicit and explicit dependencies
⚙️ No dependencies
🧱 Manual ordering only
📦 Random ordering

💡 Terraform automatically determines resource dependencies and can also use explicit dependency declarations.

---

❓ What does the `terraform init` command do? 🟢

📝 Initialize Terraform working directory
⚙️ Apply changes
🧱 Show planned changes
📦 Destroy infrastructure

💡 The `terraform init` command initializes a Terraform working directory and downloads required providers.

---

❓ Which Terraform concept allows for configuration validation? 🟡

📝 `terraform validate` command
⚙️ No validation
🧱 Manual validation only
📦 Provider validation only

💡 The `terraform validate` command checks if your configuration files are syntactically valid and internally consistent.

---

❓ What is the purpose of Terraform variables? 🟢

📝 Make configurations flexible and reusable
⚙️ Store state information
🧱 Manage providers
📦 Manage modules

💡 Variables allow you to make your Terraform configurations flexible and reusable across different environments.

---

❓ Which Terraform feature allows for resource targeting? 🟡

📝 `-target` flag for specific resources
⚙️ No targeting
🧱 All resources only
📦 Random selection

💡 The `-target` flag allows you to apply changes to specific resources rather than the entire configuration.

---

❓ What does the `terraform apply` command do? 🟢

📝 Apply planned changes to infrastructure
⚙️ Show planned changes
🧱 Initialize Terraform
📦 Destroy infrastructure

💡 The `terraform apply` command applies the planned changes to create or modify your infrastructure.

---

❓ Which Terraform concept allows for output values? 🟢

📝 Expose resource information to other systems
⚙️ Store variables
🧱 Manage state
📦 Manage providers

💡 Output values expose resource information to other systems or to the command line.

---

❓ What is the purpose of Terraform locals? 🟡

📝 Define local values for complex expressions
⚙️ Store state
🧱 Manage providers
📦 Manage modules

💡 Locals allow you to define local values for complex expressions that you can reference multiple times.

---

❓ Which Terraform feature allows for state locking? 🟡

📝 Prevent concurrent modifications
⚙️ No locking
🧱 Manual locking only
📦 Random locking

💡 State locking prevents multiple users from modifying the same Terraform state simultaneously.

---

❓ What does the `terraform fmt` command do? 🟢

📝 Format configuration files consistently
⚙️ Apply changes
🧱 Show planned changes
📦 Initialize Terraform

💡 The `terraform fmt` command automatically formats your configuration files to ensure consistent style and formatting.

---

❓ Which Terraform concept allows for resource lifecycle management? 🟡

📝 Lifecycle meta-arguments
⚙️ No lifecycle management
🧱 Manual management only
📦 Automatic management only

💡 Lifecycle meta-arguments allow you to control how Terraform manages resource creation, updates, and deletion.

---

❓ What is the purpose of Terraform workspaces? 🟢

📝 Manage multiple environments with same configuration
⚙️ Organize code files
🧱 Manage state files
📦 Manage providers

💡 Terraform workspaces allow you to manage multiple environments using the same configuration and state management.
