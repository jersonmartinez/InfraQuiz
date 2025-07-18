# 🔧 Terraform - Questions 2

## Questions

### 1. 🔧 What is terraform import? 🔴

A) 🔧 Command to import existing infrastructure into Terraform state

B) 🌐 Import Terraform modules

C) 📦 Import configuration files

D) 🎯 Import provider plugins

**Correct Answer**: A) 🔧 Command to import existing infrastructure into Terraform state

> 💡 `terraform import` allows you to bring existing infrastructure under Terraform management. Like adopting orphaned resources!

### 2. 🗄️ What is terraform taint? 🔴

A) 🗄️ Mark resource for recreation on next apply

B) 🔧 Corrupt the state file

C) 📦 Mark resource as bad

D) 🌐 Delete resource immediately

**Correct Answer**: A) 🗄️ Mark resource for recreation on next apply

> 📘 `terraform taint` forces resource recreation. Useful when you need to rebuild something without changing config!

### 3. 🌐 What are provisioners in Terraform? 🔴

A) 🌐 Scripts that run on local/remote machines during resource creation

B) 🔧 Resource providers

C) 📦 Configuration templates

D) 🎯 State management tools

**Correct Answer**: A) 🌐 Scripts that run on local/remote machines during resource creation

> ⚡ Provisioners execute scripts during resource lifecycle. Use sparingly - prefer native configuration management!

### 4. 📊 What is terraform graph? 🔴

A) 📊 Visualize dependency graph of resources

B) 🔧 Performance metrics

C) 📦 Resource statistics

D) 🌐 State visualization

**Correct Answer**: A) 📊 Visualize dependency graph of resources

> 💡 `terraform graph` generates DOT format showing resource dependencies. Great for understanding complex infrastructures!

### 5. 🔄 What is the difference between depends_on and implicit dependencies? 🔴

A) 🔄 `depends_on` is explicit, implicit uses resource references

B) 🔧 No difference

C) 📦 `depends_on` is automatic

D) 🌐 Implicit is manual

**Correct Answer**: A) 🔄 `depends_on` is explicit, implicit uses resource references

> 🎯 Implicit dependencies are automatic when you reference attributes. `depends_on` is for non-obvious dependencies!

### 6. 🧪 What is terraform validate? 🟡

A) 🧪 Check configuration syntax and structure

B) 🔧 Validate against cloud provider

C) 📦 Validate state file

D) 🌐 Validate credentials

**Correct Answer**: A) 🧪 Check configuration syntax and structure

> 📘 `terraform validate` checks syntax without accessing remote services. Fast way to catch configuration errors!

### 7. 🔧 What is terraform fmt? 🟡

A) 🔧 Format configuration files consistently

B) 🌐 Fix broken configuration

C) 📦 Format state files

D) 🎯 Format output

**Correct Answer**: A) 🔧 Format configuration files consistently

> ⚡ `terraform fmt` standardizes formatting and style. Essential for team collaboration and code reviews!

### 8. 📦 What are data sources in Terraform? 🟡

A) 📦 Read-only information from external systems

B) 🔧 Input data for resources

C) 🌐 Database connections

D) 🎯 File data sources

**Correct Answer**: A) 📦 Read-only information from external systems

> 💡 Data sources fetch information without creating resources. Like looking up existing AMI IDs or VPC details!

### 9. 🔒 What is sensitive in Terraform variables? 🔴

A) 🔒 Prevents sensitive values from being displayed in logs

B) 🔧 Encrypts variables

C) 📦 Stores variables securely

D) 🌐 Validates sensitive data

**Correct Answer**: A) 🔒 Prevents sensitive values from being displayed in logs

> 🛡️ The `sensitive` flag hides values in CLI output and logs. Doesn't encrypt - use external secret management!

### 10. 🌐 What is terraform cloud? 🔴

A) 🌐 HashiCorp's managed Terraform service with collaboration features

B) 🔧 Cloud provider integration

C) 📦 Cloud storage for state

D) 🎯 Cloud-based validation

**Correct Answer**: A) 🌐 HashiCorp's managed Terraform service with collaboration features

> ⚡ Terraform Cloud provides remote state, collaboration, policy enforcement, and more. Team Terraform in the cloud!

### 11. 📊 What is terraform console? 🟡

A) 📊 Interactive console for testing expressions and functions

B) 🔧 Web-based console

C) 📦 Debug console

D) 🌐 Configuration console

**Correct Answer**: A) 📊 Interactive console for testing expressions and functions

> 🔍 `terraform console` lets you test expressions and functions interactively. Great for debugging and learning!

### 12. 🗂️ What are terraform functions? 🟡

A) 🗂️ Built-in functions for transforming and combining values

B) 🔧 Custom functions

C) 📦 Provider functions

D) 🌐 Resource functions

**Correct Answer**: A) 🗂️ Built-in functions for transforming and combining values

> 💡 Functions like `length()`, `join()`, `file()` help manipulate data. Essential for dynamic configurations!

### 13. 🔄 What is count in Terraform? 🟡

A) 🔄 Create multiple instances of a resource

B) 🔧 Count resources

C) 📦 Performance counter

D) 🌐 Count operations

**Correct Answer**: A) 🔄 Create multiple instances of a resource

> 📘 `count` creates multiple similar resources. Use `count.index` to differentiate instances!

### 14. 🐳 What is for_each in Terraform? 🔴

A) 🐳 Create resources for each item in map or set

B) 🔧 Loop through lists

C) 📦 Iterate over resources

D) 🌐 For each provider

**Correct Answer**: A) 🐳 Create resources for each item in map or set

> 🚀 `for_each` is more flexible than count, allows dynamic resource creation with unique keys!

### 15. 🔧 What is terraform state mv? 🔴

A) 🔧 Move resources in state file

B) 🌐 Move state files

C) 📦 Move configuration

D) 🎯 Move providers

**Correct Answer**: A) 🔧 Move resources in state file

> ⚡ `terraform state mv` relocates resources in state without affecting actual infrastructure. Useful for refactoring!

### 16. 📊 What is terraform state rm? 🔴

A) 📊 Remove resources from state without destroying them

B) 🔧 Remove state file

C) 📦 Remove configuration

D) 🌐 Remove providers

**Correct Answer**: A) 📊 Remove resources from state without destroying them

> 👁️ `terraform state rm` removes from Terraform management but leaves actual resources untouched!

### 17. 🔧 What are terraform conditions? 🔴

A) 🔧 Conditional expressions using `condition ? true_val : false_val`

B) 🌐 If-else statements

C) 📦 Conditional resources

D) 🎯 Validation conditions

**Correct Answer**: A) 🔧 Conditional expressions using `condition ? true_val : false_val`

> 🏗️ Conditional expressions enable dynamic configurations based on variables or other values!

### 18. 📡 What is terraform_remote_state data source? 🔴

A) 📡 Access outputs from another Terraform state

B) 🔧 Remote state storage

C) 📦 State synchronization

D) 🌐 Remote configuration

**Correct Answer**: A) 📡 Access outputs from another Terraform state

> 🚀 `terraform_remote_state` lets you use outputs from other Terraform projects. Enables modular architectures!

### 19. 🔐 What is terraform locks? 🔴

A) 🔐 Prevent concurrent operations on same state

B) 🔒 Security locks

C) 🛡️ Resource locks

D) 🔑 Configuration locks

**Correct Answer**: A) 🔐 Prevent concurrent operations on same state

> 🔍 State locking prevents corruption from simultaneous terraform operations. Critical for team environments!

### 20. 🎪 What is terraform version constraints? 🔴

A) 🎪 Specify required Terraform and provider versions

B) 🔧 Version control

C) 📦 Version checking

D) 🌐 Version updates

**Correct Answer**: A) 🎪 Specify required Terraform and provider versions

> 🎭 Version constraints ensure reproducible deployments by pinning specific versions. Prevents version drift!

### 21. 🎯 What are advanced Terraform practices? 🔴

A) 🎯 Use modules, remote state, version constraints, workspaces, automation

B) 🔧 Only use local state

C) 📦 Avoid modules

D) 🌐 Manual deployment only

**Correct Answer**: A) 🎯 Use modules, remote state, version constraints, workspaces, automation

> 🏆 Advanced Terraform: modular design, remote backends, CI/CD integration, policy as code, state management best practices! 