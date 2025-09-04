# 🔧 Ansible - Questions 6

## Questions

### 1. 🔄 What is Ansible's default inventory file? 🟡

A) 🔄 /etc/ansible/hosts

B) 📋 inventory.ini

C) ⚙️ hosts.cfg

D) 🌐 ansible.cfg

**Correct Answer**: A) 🔄 /etc/ansible/hosts

> 💡 The default inventory file is /etc/ansible/hosts. Like having a default address book for your servers!

### 2. 📊 What is the purpose of ansible.cfg? 🟡

A) 📊 Configure Ansible behavior

B) 🔧 Define inventory

C) 📦 Store variables

D) 🌐 Manage connections

**Correct Answer**: A) 📊 Configure Ansible behavior

> 📘 ansible.cfg contains configuration settings for Ansible. Like having a settings file for your automation tool!

### 3. 🔧 What is a task in Ansible? 🟡

A) 🔧 Single unit of work

B) 📦 Complete playbook

C) ⚙️ Configuration block

D) 🌐 Network command

**Correct Answer**: A) 🔧 Single unit of work

> 💡 A task is a single action in a playbook. Like having individual steps in a recipe!

### 4. 📝 What is YAML syntax requirement in Ansible? 🟡

A) 📝 Proper indentation

B) 🔧 Specific keywords

C) 📦 File extension

D) 🌐 Network protocol

**Correct Answer**: A) 📝 Proper indentation

> 🎯 YAML requires consistent indentation for structure. Like having proper formatting in a document!

### 5. 🔄 What does the `when` keyword do? 🟡

A) 🔄 Conditional task execution

B) 📊 Variable assignment

C) ⚙️ Loop control

D) 🌐 Connection setup

**Correct Answer**: A) 🔄 Conditional task execution

> 📘 `when` allows running tasks only under certain conditions. Like having if-statements in your automation!

### 6. 📊 What is a register in Ansible? 🟡

A) 📊 Store task output

B) 🔧 Define variables

C) 📦 Create modules

D) 🌐 Manage inventory

**Correct Answer**: A) 📊 Store task output

> 💡 Register captures the output of a task for later use. Like saving results for future reference!

### 7. 🔧 What is the `copy` module used for? 🟡

A) 🔧 Transfer files to hosts

B) 📦 Install packages

C) ⚙️ Configure services

D) 🌐 Manage networks

**Correct Answer**: A) 🔧 Transfer files to hosts

> 📘 The copy module transfers files from control node to managed hosts. Like having a file delivery service!

### 8. 📦 What is the `yum` module for? 🟡

A) 📦 Package management on Red Hat

B) 🔧 File operations

C) ⚙️ Service management

D) 🌐 Network configuration

**Correct Answer**: A) 📦 Package management on Red Hat

> 💡 The yum module manages packages on RHEL/CentOS systems. Like having a package manager for your automation!

### 9. 🌐 What is the `uri` module used for? 🟡

A) 🌐 Interact with web services

B) 🔧 File transfers

C) 📦 Package installation

D) ⚙️ System configuration

**Correct Answer**: A) 🌐 Interact with web services

> 🎯 The uri module makes HTTP requests to web services. Like having a web client in your playbooks!

### 10. 🔐 What does `become: yes` do? 🟡

A) 🔐 Elevate privileges

B) 📊 Change user

C) ⚙️ Switch context

D) 🌐 Modify connection

**Correct Answer**: A) 🔐 Elevate privileges

> 📘 `become: yes` allows running tasks with elevated privileges (sudo). Like having administrator access when needed!

### 11. 📊 What is a block in Ansible? 🟡

A) 📊 Group related tasks

B) 🔧 Single command

C) 📦 Module collection

D) 🌐 Network group

**Correct Answer**: A) 📊 Group related tasks

> 💡 Blocks group tasks for better organization and error handling. Like having sections in your playbook!

### 12. 🔄 What is the `with_items` construct? 🟡

A) 🔄 Loop over list items

B) 📊 Define variables

C) ⚙️ Set conditions

D) 🌐 Configure connections

**Correct Answer**: A) 🔄 Loop over list items

> 🎯 `with_items` allows iterating over a list of items. Like having for-loops in your automation!

### 13. 📝 What is Jinja2 used for in Ansible? 🟡

A) 📝 Template rendering

B) 🔧 Variable storage

C) 📦 Module creation

D) 🌐 Network templating

**Correct Answer**: A) 📝 Template rendering

> 📘 Jinja2 is used for dynamic content in templates. Like having smart text that adapts to variables!

### 14. 🌐 What is the `setup` module? 🟡

A) 🌐 Gather system facts

B) 🔧 Configure system

C) 📦 Install software

D) ⚙️ Manage services

**Correct Answer**: A) 🌐 Gather system facts

> 💡 The setup module collects system information automatically. Like having a system information gatherer!

### 15. 🔧 What is the `command` module? 🟡

A) 🔧 Execute shell commands

B) 📦 Install packages

C) ⚙️ Configure services

D) 🌐 Manage networks

**Correct Answer**: A) 🔧 Execute shell commands

> 🎯 The command module runs shell commands on managed hosts. Like having a command executor!

### 16. 📊 What is the `debug` module for? 🟡

A) 📊 Print variable values

B) 🔧 Execute commands

C) 📦 Debug packages

D) 🌐 Debug networks

**Correct Answer**: A) 📊 Print variable values

> 📘 The debug module helps troubleshoot by displaying variable values. Like having a print statement for debugging!

### 17. 🔄 What is the `failed_when` condition? 🟡

A) 🔄 Define failure conditions

B) 📊 Set success criteria

C) ⚙️ Control loops

D) 🌐 Manage connections

**Correct Answer**: A) 🔄 Define failure conditions

> 💡 `failed_when` allows customizing when a task should be considered failed. Like having custom error detection!

### 18. 📦 What is the `apt` module used for? 🟡

A) 📦 Package management on Debian

B) 🔧 File operations

C) ⚙️ Service management

D) 🌐 Network configuration

**Correct Answer**: A) 📦 Package management on Debian

> 🎯 The apt module manages packages on Debian/Ubuntu systems. Like having a package manager for Debian-based systems!

### 19. 🌐 What is the `ping` module? 🟡

A) 🌐 Test connectivity

B) 🔧 Send ICMP packets

C) 📦 Check services

D) ⚙️ Verify configuration

**Correct Answer**: A) 🌐 Test connectivity

> 📘 The ping module tests basic connectivity to hosts. Like having a connectivity checker!

### 20. 🔧 What is the `file` module used for? 🟡

A) 🔧 Manage files and directories

B) 📦 Install packages

C) ⚙️ Configure services

D) 🌐 Manage networks

**Correct Answer**: A) 🔧 Manage files and directories

> 💡 The file module creates, deletes, and manages file permissions. Like having a file manager!

### 21. 📊 What is the `stat` module? 🟡

A) 📊 Get file information

B) 🔧 Modify files

C) 📦 Check packages

D) 🌐 Test networks

**Correct Answer**: A) 📊 Get file information

> 🎯 The stat module retrieves file attributes and information. Like having a file inspector!