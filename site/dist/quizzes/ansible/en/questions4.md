# 🔧 Advanced Ansible - Quiz 4

## Questions

### 1. ❓ What is the purpose of the `gather_facts` module in Ansible? 🔴

A) 📝 Collect system information from target hosts

B) ⚙️ Install packages on remote systems

C) 🔧 Configure network interfaces

D) 🐳 Manage user accounts

**Correct Answer**: A) 📝 Collect system information from target hosts

💡 The `gather_facts` module collects system information (such as IP addresses, OS details, hardware info) from target hosts, which can then be used as variables in playbooks.

### 2. 🧠 What Ansible directive allows you to run tasks only on hosts that match specific conditions? 🔴

A) 📝 `when`

B) ⚙️ `if`

C) 🔧 `condition`

D) 🐳 `filter`

**Correct Answer**: A) 📝 `when`

💡 The `when` directive allows you to run tasks conditionally based on facts, variables, or other conditions, making playbooks more dynamic and flexible.

### 3. 🤔 What is the purpose of the `delegate_to` parameter in Ansible tasks? 🔴

A) 📝 Specify which host should execute the task

B) ⚙️ Define task dependencies

C) 🔧 Set task priorities

D) 🐳 Configure task timeouts

**Correct Answer**: A) 📝 Specify which host should execute the task

💡 `delegate_to` allows you to run a task on a different host than the one being managed, useful for tasks that need to run on the Ansible control node or a specific host.

### 4. 🔍 What Ansible feature allows you to reuse playbook logic across different projects? 🔴

A) 📝 Roles

B) ⚙️ Templates

C) 🔧 Variables

D) 🐳 Handlers

**Correct Answer**: A) 📝 Roles

💡 Roles are a way to organize playbooks and make them reusable by grouping related tasks, variables, and files into a standardized structure.

### 5. ❓ What is the purpose of the `serial` parameter in Ansible playbooks? 🔴

A) 📝 Control the order of task execution

B) ⚙️ Limit the number of hosts processed simultaneously

C) 🔧 Set task priorities

D) 🐳 Configure task timeouts

**Correct Answer**: B) ⚙️ Limit the number of hosts processed simultaneously

💡 The `serial` parameter controls rolling updates by limiting how many hosts are processed simultaneously, useful for zero-downtime deployments.

### 6. 🧠 What Ansible module is used to manage systemd services? 🔴

A) 📝 `service`

B) ⚙️ `systemd`

C) 🔧 `daemon`

D) 🐳 `init`

**Correct Answer**: A) 📝 `service`

💡 The `service` module can manage both systemd and init services, automatically detecting the appropriate service manager on the target system.

### 7. 🤔 What is the purpose of the `register` keyword in Ansible tasks? 🔴

A) 📝 Store task results in variables

B) ⚙️ Register hosts with Ansible Tower

C) 🔧 Create user accounts

D) 🐳 Configure network interfaces

**Correct Answer**: A) 📝 Store task results in variables

💡 The `register` keyword captures the output of a task and stores it in a variable, allowing you to use the results in subsequent tasks or conditions.

### 8. 🔍 What Ansible feature allows you to handle task failures gracefully? 🔴

A) 📝 `ignore_errors`

B) ⚙️ `fail_fast`

C) 🔧 `continue_on_error`

D) 🐳 `error_handling`

**Correct Answer**: A) 📝 `ignore_errors`

💡 `ignore_errors` allows tasks to continue even if they fail, while `block` and `rescue` provide more sophisticated error handling capabilities.

### 9. ❓ What is the purpose of the `become` directive in Ansible? 🔴

A) 📝 Change the target host

B) ⚙️ Escalate privileges (become root)

C) 🔧 Change the connection method

D) 🐳 Modify task parameters

**Correct Answer**: B) ⚙️ Escalate privileges (become root)

💡 The `become` directive allows tasks to run with elevated privileges, commonly used to run commands as root or other users.

### 10. 🧠 What Ansible module is used to copy files from the control node to remote hosts? 🔴

A) 📝 `copy`

B) ⚙️ `file`

C) 🔧 `template`

D) 🐳 `fetch`

**Correct Answer**: A) 📝 `copy`

💡 The `copy` module copies files from the Ansible control node to remote hosts, while `template` renders Jinja2 templates and `fetch` copies files from remote hosts to the control node.

### 11. 🤔 What is the purpose of the `loop` keyword in Ansible tasks? 🔴

A) 📝 Create infinite loops

B) ⚙️ Iterate over lists or dictionaries

C) 🔧 Control the order of task execution

D) 🐳 Set task priorities

**Correct Answer**: B) ⚙️ Iterate over lists or dictionaries

💡 The `loop` keyword allows you to iterate over lists or dictionaries, running the same task multiple times with different values.

### 12. 🔍 What Ansible feature allows you to run tasks only when certain conditions are met? 🔴

A) 📝 `when` with facts

B) ⚙️ `if` statements

C) 🔧 `condition` blocks

D) 🐳 `filter` expressions

**Correct Answer**: A) 📝 `when` with facts

💡 The `when` directive can use system facts, variables, or results from previous tasks to determine if a task should run, providing granular control over execution.

### 13. ❓ What is the purpose of the `gather_subset` parameter in Ansible? 🔴

A) 📝 Control which facts are collected

B) ⚙️ Define host subsets

C) 🔧 Set task groups

D) 🐳 Configure dynamic inventories

**Correct Answer**: A) 📝 Control which facts are collected

💡 `gather_subset` allows you to specify which categories of facts to collect (such as hardware, network, distribution), optimizing performance and reducing execution time.

### 14. 🧠 What Ansible module is used to manage packages on Debian-based systems? 🔴

A) 📝 `apt`

B) ⚙️ `yum`

C) 🔧 `package`

D) 🐳 `dnf`

**Correct Answer**: A) 📝 `apt`

💡 The `apt` module is specific to Debian/Ubuntu-based systems, while `package` is generic and automatically detects the appropriate package manager.

### 15. 🤔 What is the purpose of the `tags` keyword in Ansible? 🔴

A) 📝 Tag hosts for inventories

B) ⚙️ Group tasks for selective execution

C) 🔧 Mark files for synchronization

D) 🐳 Categorize environment variables

**Correct Answer**: B) ⚙️ Group tasks for selective execution

💡 Tags allow you to run only certain parts of a playbook, useful for development, testing, or maintenance without running the entire playbook.

### 16. 🔍 What Ansible feature allows you to handle dependencies between tasks? 🔴

A) 📝 `dependencies` blocks

B) ⚙️ `depends_on` parameter

C) 🔧 `require` statements

D) 🐳 `needs` conditions

**Correct Answer**: A) 📝 `dependencies` blocks

💡 Ansible handles dependencies automatically based on task order, but you can use `block` and `rescue` for more sophisticated error handling.

### 17. ❓ What is the purpose of the `forks` parameter in Ansible configuration? 🔴

A) 📝 Control the number of hosts processed simultaneously

B) ⚙️ Define the number of tasks per playbook

C) 🔧 Set memory limits per host

D) 🐳 Configure connection timeouts

**Correct Answer**: A) 📝 Control the number of hosts processed simultaneously

💡 `forks` controls Ansible's parallelism, determining how many hosts are processed simultaneously, affecting performance and resource usage.

### 18. 🧠 What Ansible module is used to manage system users? 🔴

A) 📝 `user`

B) ⚙️ `account`

C) 🔧 `passwd`

D) 🐳 `group`

**Correct Answer**: A) 📝 `user`

💡 The `user` module manages system user accounts, including creation, modification, and deletion, while `group` handles user groups.

### 19. 🤔 What is the purpose of the `environment` keyword in Ansible? 🔴

A) 📝 Define environment variables for tasks

B) ⚙️ Configure the execution environment

C) 🔧 Set security context

D) 🐳 Manage network configurations

**Correct Answer**: A) 📝 Define environment variables for tasks

💡 `environment` allows you to set specific environment variables for individual tasks, useful for commands that require particular environment configurations.

### 20. 🔍 What Ansible feature allows you to run tasks in sequential order? 🔴

A) 📝 `serial` parameter

B) ⚙️ `sequential` blocks

C) 🔧 `order` directive

D) 🐳 `sequence` tasks

**Correct Answer**: A) 📝 `serial` parameter

💡 The `serial` parameter controls the order of task execution, ensuring they run in sequence rather than in parallel.

### 21. ❓ What is the purpose of the `strategy` parameter in Ansible playbooks? 🔴

A) 📝 Define how tasks are executed on hosts

B) ⚙️ Set security policies

C) 🔧 Configure connection methods

D) 🐳 Manage dynamic inventories

**Correct Answer**: A) 📝 Define how tasks are executed on hosts

💡 `strategy` controls how Ansible executes tasks on multiple hosts, with options like `linear` (sequential) or `free` (parallel), affecting performance and deployment control.

🔴
