# 🔧 Ansible - Questions 7

## Questions

### 1. 🔄 What is Ansible's execution strategy? 🔴

A) 🔄 Control how tasks run

B) 📊 Define playbook structure

C) ⚙️ Configure inventory

D) 🌐 Manage connections

**Correct Answer**: A) 🔄 Control how tasks run

> 💡 Execution strategies determine how Ansible runs tasks across hosts. Like choosing between serial or parallel execution!

### 2. 📊 What is Ansible's fact caching? 🔴

A) 📊 Store gathered facts

B) 🔧 Cache configurations

C) 📦 Store packages

D) 🌐 Cache connections

**Correct Answer**: A) 📊 Store gathered facts

> 📘 Fact caching stores gathered system information to avoid re-gathering. Like having a memory for system details!

### 3. 🔧 What is an Ansible callback plugin? 🔴

A) 🔧 Customize output/logging

B) 📦 Handle packages

C) ⚙️ Manage configurations

D) 🌐 Control connections

**Correct Answer**: A) 🔧 Customize output/logging

> 💡 Callback plugins allow customizing Ansible's output and logging behavior. Like having custom reporters for your automation!

### 4. 📝 What is Ansible's variable precedence? 🔴

A) 📝 Order of variable override

B) 🔧 Variable definition

C) 📦 Variable storage

D) 🌐 Variable transmission

**Correct Answer**: A) 📝 Order of variable override

> 🎯 Variable precedence determines which variable value takes effect when multiple are defined. Like having a hierarchy of variable importance!

### 5. 🔄 What is Ansible's async polling? 🔴

A) 🔄 Monitor long-running tasks

B) 📊 Poll for facts

C) ⚙️ Poll configurations

D) 🌐 Poll connections

**Correct Answer**: A) 🔄 Monitor long-running tasks

> 📘 Async polling allows monitoring tasks that take longer than the SSH timeout. Like having a watchdog for long operations!

### 6. 📊 What is an Ansible lookup plugin? 🔴

A) 📊 Retrieve data dynamically

B) 🔧 Look up configurations

C) 📦 Look up packages

D) 🌐 Look up connections

**Correct Answer**: A) 📊 Retrieve data dynamically

> 💡 Lookup plugins fetch data from external sources during playbook execution. Like having dynamic data retrieval!

### 7. 🔧 What is Ansible's connection plugin? 🔴

A) 🔧 Handle host connections

B) 📊 Manage data

C) 📦 Handle packages

D) ⚙️ Manage configurations

**Correct Answer**: A) 🔧 Handle host connections

> 🎯 Connection plugins define how Ansible connects to managed hosts. Like having different transport mechanisms!

### 8. 📦 What is Ansible's galaxy init command? 🔴

A) 📦 Initialize new role structure

B) 🔧 Start galaxy server

C) 📊 Initialize collections

D) 🌐 Initialize inventory

**Correct Answer**: A) 📦 Initialize new role structure

> 📘 `ansible-galaxy init` creates the standard directory structure for a new role. Like having a template for role creation!

### 9. 🌐 What is Ansible's network automation? 🔴

A) 🌐 Manage network devices

B) 🔧 Network connections

C) 📦 Network packages

D) ⚙️ Network configurations

**Correct Answer**: A) 🌐 Manage network devices

> 💡 Ansible can automate network device configuration using specific modules. Like having infrastructure automation for networks!

### 10. 🔐 What is Ansible's vault rekey? 🔴

A) 🔐 Change vault password

B) 📊 Rekey facts

C) ⚙️ Rekey configurations

D) 🌐 Rekey connections

**Correct Answer**: A) 🔐 Change vault password

> 🎯 Vault rekey allows changing the password for encrypted files. Like updating the key to your secure vault!

### 11. 📊 What is Ansible's inventory plugins? 🔴

A) 📊 Generate dynamic inventory

B) 🔧 Plugin management

C) 📦 Package plugins

D) 🌐 Connection plugins

**Correct Answer**: A) 📊 Generate dynamic inventory

> 📘 Inventory plugins create inventory from external sources like cloud providers. Like having automatic host discovery!

### 12. 🔧 What is Ansible's strategy plugins? 🔴

A) 🔧 Control task execution flow

B) 📊 Strategy management

C) 📦 Strategy packages

D) 🌐 Strategy connections

**Correct Answer**: A) 🔧 Control task execution flow

> 💡 Strategy plugins define how tasks are executed across the inventory. Like having different execution patterns!

### 13. 📝 What is Ansible's template inheritance? 🔴

A) 📝 Extend base templates

B) 🔧 Template management

C) 📦 Template packages

D) 🌐 Template connections

**Correct Answer**: A) 📝 Extend base templates

> 🎯 Template inheritance allows creating template hierarchies. Like having parent-child relationships in templates!

### 14. 🌐 What is Ansible's mitogen strategy? 🔴

A) 🌐 Speed up execution

B) 🔧 Strategy management

C) 📦 Strategy packages

D) ⚙️ Strategy configurations

**Correct Answer**: A) 🌐 Speed up execution

> 📘 Mitogen is a strategy plugin that speeds up Ansible execution significantly. Like having a performance booster for your playbooks!

### 15. 🔐 What is Ansible's become plugins? 🔴

A) 🔐 Handle privilege escalation

B) 📊 Become management

C) 📦 Become packages

D) 🌐 Become connections

**Correct Answer**: A) 🔐 Handle privilege escalation

> 💡 Become plugins manage how privilege escalation works on different systems. Like having custom sudo mechanisms!

### 16. 📊 What is Ansible's fact gathering plugins? 🔴

A) 📊 Customize fact collection

B) 🔧 Fact management

C) 📦 Fact packages

D) 🌐 Fact connections

**Correct Answer**: A) 📊 Customize fact collection

> 🎯 Fact gathering plugins allow customizing what system information is collected. Like having tailored system inspectors!

### 17. 🔧 What is Ansible's action plugins? 🔴

A) 🔧 Execute module actions

B) 📊 Action management

C) 📦 Action packages

D) 🌐 Action connections

**Correct Answer**: A) 🔧 Execute module actions

> 📘 Action plugins handle the execution of Ansible modules. Like having the engine that runs your modules!

### 18. 📦 What is Ansible's collection dependencies? 🔴

A) 📦 Manage collection requirements

B) 🔧 Dependency management

C) ⚙️ Dependency configurations

D) 🌐 Dependency connections

**Correct Answer**: A) 📦 Manage collection requirements

> 💡 Collection dependencies allow specifying required collections. Like having dependency management for your content!

### 19. 🌐 What is Ansible's HTTP API? 🔴

A) 🌐 REST API for automation

B) 🔧 API management

C) 📦 API packages

D) ⚙️ API configurations

**Correct Answer**: A) 🌐 REST API for automation

> 🎯 Ansible's HTTP API provides REST endpoints for automation tasks. Like having a web service for your automation!

### 20. 🔐 What is Ansible's vault encryption? 🔴

A) 🔐 Encrypt sensitive data

B) 📊 Encryption management

C) 📦 Encryption packages

D) 🌐 Encryption connections

**Correct Answer**: A) 🔐 Encrypt sensitive data

> 📘 Vault encryption protects sensitive data in your playbooks and roles. Like having encrypted storage for secrets!

### 21. 📊 What is Ansible's logging plugins? 🔴

A) 📊 Customize logging output

B) 🔧 Logging management

C) 📦 Logging packages

D) 🌐 Logging connections

**Correct Answer**: A) 📊 Customize logging output

> 💡 Logging plugins allow customizing how Ansible logs its operations. Like having custom loggers for your automation!