# 🔧 Ansible - Questions 3

## Questions

### 1. 🔧 What is Ansible Tower? 🔴

A) 🔧 Enterprise web-based interface for Ansible

B) 🔄 Ansible command line tool

C) 📦 Ansible package manager

D) 🌐 Ansible network tool

**Correct Answer**: A) 🔧 Enterprise web-based interface for Ansible

💡 Ansible Tower (now AWX) provides role-based access control, job scheduling, and visual workflow management! 🏗️

### 2. 🚀 What is Ansible Galaxy? 🟡

A) 🚀 Repository for sharing Ansible roles and collections

B) 🔧 Ansible package manager

C) 📦 Ansible collection tool

D) 🌐 Ansible network repository

**Correct Answer**: A) 🚀 Repository for sharing Ansible roles and collections

⚡ Galaxy is like GitHub for Ansible - find, share, and reuse community-contributed content! 🌟

### 3. 🔍 What is Ansible Vault? 🟡

A) 🔍 Encryption system for sensitive data in Ansible

B) 🔒 Ansible security tool

C) 🛡️ Ansible encryption tool

D) 🔑 Ansible key manager

**Correct Answer**: A) 🔍 Encryption system for sensitive data in Ansible

🔐 Vault encrypts passwords, API keys, and other sensitive information in your playbooks! 🛡️

### 4. 🌐 What is Ansible Collections? 🔴

A) 🌐 Packaged sets of modules, plugins, and roles

B) 🔧 Ansible packages

C) 📦 Ansible modules

D) 🌐 Ansible plugins

**Correct Answer**: A) 🌐 Packaged sets of modules, plugins, and roles

📦 Collections organize related Ansible functionality into installable packages! 📚

### 5. 🔄 What is Ansible Playbook? 🟢

A) 🔄 YAML file defining automation tasks

B) 🔧 Ansible script

C) 📦 Ansible configuration

D) 🌐 Ansible automation

**Correct Answer**: A) 🔄 YAML file defining automation tasks

📝 Playbooks are the heart of Ansible automation - they define what gets done and how! 🎭

### 6. 📊 What is Ansible Inventory? 🟢

A) 📊 List of hosts to manage with Ansible

B) 🔧 Host management

C) 📦 Host configuration

D) 🌐 Host automation

**Correct Answer**: A) 📊 List of hosts to manage with Ansible

📋 Inventory defines which servers Ansible should manage and how to group them! 🎯

### 7. 🔐 What is Ansible Roles? 🟡

A) 🔐 Reusable collections of tasks and configurations

B) 🔒 Ansible security

C) 🛡️ Ansible access control

D) 🔑 Ansible permissions

**Correct Answer**: A) 🔐 Reusable collections of tasks and configurations

🎭 Roles package related tasks, handlers, and files for easy reuse across playbooks! 🔧

### 8. 🎯 What is Ansible Modules? 🟡

A) 🎯 Specific functionality units for Ansible

B) 🔧 Ansible functions

C) 📦 Ansible packages

D) 🌐 Ansible tools

**Correct Answer**: A) 🎯 Specific functionality units for Ansible

⚙️ Modules are the tools Ansible uses to perform specific tasks on managed nodes! 🔧

### 9. 🔄 What is Ansible Handlers? 🟡

A) 🔄 Tasks that run only when notified

B) 🔧 Ansible tasks

C) 📦 Ansible notifications

D) 🌐 Ansible events

**Correct Answer**: A) 🔄 Tasks that run only when notified

📢 Handlers run only when something changes, perfect for service restarts! 🔔

### 10. 🌟 What is Ansible Facts? 🟢

A) 🌟 System information gathered from managed nodes

B) 🔧 System data

C) 📦 System information

D) 🌐 System details

**Correct Answer**: A) 🌟 System information gathered from managed nodes

🔍 Facts provide automatic data about the system (IP, OS, hardware, etc.)! 📊

### 11. 🔧 What is Ansible Variables? 🟢

A) 🔧 Values that can change in Ansible playbooks

B) 🔄 Ansible values

C) 📦 Ansible data

D) 🌐 Ansible information

**Correct Answer**: A) 🔧 Values that can change in Ansible playbooks

💡 Variables allow customizing behavior and making playbooks reusable! 🎛️

### 12. 🔍 What is Ansible Conditionals? 🟡

A) 🔍 Logic to control when tasks run

B) 🔧 Ansible logic

C) 📦 Ansible conditions

D) 🌐 Ansible rules

**Correct Answer**: A) 🔍 Logic to control when tasks run

🎯 Conditionals use `when` statements to run tasks only under specific conditions! 🎲

### 13. 📦 What is Ansible Loops? 🟢

A) 📦 Repeating tasks with different values

B) 🔄 Ansible repetition

C) 📦 Ansible cycles

D) 🌐 Ansible iterations

**Correct Answer**: A) 📦 Repeating tasks with different values

🔄 Loops eliminate repetitive code by running the same task with different inputs! 🔁

### 14. 🔄 What is Ansible Tags? 🟢

A) 🔄 Labels to organize and run specific tasks

B) 🔧 Ansible labels

C) 📦 Ansible markers

D) 🌐 Ansible identifiers

**Correct Answer**: A) 🔄 Labels to organize and run specific tasks

🏷️ Tags allow running only certain parts of a playbook for faster execution! 🎯

### 15. 🌐 What is Ansible Templates? 🟡

A) 🌐 Files with dynamic variables for configuration

B) 🔧 Ansible files

C) 📦 Ansible configurations

D) 🌐 Ansible documents

**Correct Answer**: A) 🌐 Files with dynamic variables for configuration

📄 Templates generate files with dynamic content based on variables and facts! 🎨

### 16. 🔐 What is Ansible Privilege Escalation? 🟡

A) 🔐 Running tasks with elevated permissions

B) 🔒 Ansible security

C) 🛡️ Ansible access

D) 🔑 Ansible permissions

**Correct Answer**: A) 🔐 Running tasks with elevated permissions

🔓 Use `become` to run tasks as root or other privileged users! 👑

### 17. 📊 What is Ansible Error Handling? 🔴

A) 📊 Managing failures and exceptions in playbooks

B) 🔧 Error management

C) 📦 Error handling

D) 🌐 Error control

**Correct Answer**: A) 📊 Managing failures and exceptions in playbooks

🛡️ Error handling includes `ignore_errors`, `failed_when`, and `rescue` blocks! 🚨

### 18. 🔄 What is Ansible Asynchronous Tasks? 🔴

A) 🔄 Running tasks in the background with polling

B) 🔧 Background tasks

C) 📦 Async execution

D) 🌐 Parallel tasks

**Correct Answer**: A) 🔄 Running tasks in the background with polling

⏰ Use `async` and `poll` for long-running tasks that don't block the playbook! ⏱️

### 19. 🎯 What is Ansible Delegation? 🟡

A) 🎯 Running tasks on different hosts than current target

B) 🔧 Task delegation

C) 📦 Host delegation

D) 🌐 Execution delegation

**Correct Answer**: A) 🎯 Running tasks on different hosts than current target

🎭 Use `delegate_to` to run tasks on specific hosts or the control node! 🎯

### 20. 🌟 What is Ansible Callback Plugins? 🔴

A) 🌟 Customizing Ansible output and logging

B) 🔧 Output customization

C) 📦 Logging customization

D) 🌐 Display customization

**Correct Answer**: A) 🌟 Customizing Ansible output and logging

🔌 Callback plugins control how Ansible displays information and logs events! 📊

### 21. 🚀 What is the future of Ansible? 🟢

A) 🚀 AI-powered automation and edge computing

B) 🔧 Traditional automation only

C) 📦 Cloud automation only

D) 🌐 No future development

**Correct Answer**: A) 🚀 AI-powered automation and edge computing

🤖 The future includes AI-driven playbook generation, autonomous remediation, and edge automation! 🚀
