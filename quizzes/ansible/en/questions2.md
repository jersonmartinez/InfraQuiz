# 🔧 Ansible - Questions 2

## Questions

### 1. 🎯 Which Ansible configuration file sets global settings? 🟢

A) 📝 `ansible.cfg`

B) 🔄 config.yml

C) 📦 settings.conf

D) 🌐 global.ini

**Correct Answer**: A) 📝 `ansible.cfg`

> 💡 `ansible.cfg` configures defaults like inventory location, remote user, and connection settings. Like your personal Ansible preferences file!

### 2. 🔧 What is the default inventory file location? 🟢

A) 📝 `/etc/ansible/hosts`

B) 🔄 /var/ansible/inventory

C) 📦 ~/.ansible/hosts

D) 🌐 /opt/ansible/inventory

**Correct Answer**: A) 📝 `/etc/ansible/hosts`

> 📘 By default, Ansible looks for inventory at `/etc/ansible/hosts`. You can override this with `-i` option or in `ansible.cfg`!

### 3. 🎭 What does `ansible-doc` command do? 🟢

A) 📝 Show module documentation

B) 🔄 Generate documentation

C) 📦 Install modules

D) 🌐 Create playbooks

**Correct Answer**: A) 📝 Show module documentation

> ⚡ `ansible-doc copy` shows documentation for the copy module. Like having a built-in manual for every Ansible module!

### 4. 🔍 What is the purpose of `gather_facts: no`? 🟡

A) 📝 Skip automatic system information collection

B) 🔄 Hide sensitive information

C) 📦 Speed up execution

D) 🌐 Reduce network traffic

**Correct Answer**: A) 📝 Skip automatic system information collection

> 💡 Setting `gather_facts: no` prevents Ansible from collecting system info, making playbooks faster when facts aren't needed!

### 5. 🔧 What does the `copy` module do? 🟢

A) 📝 Copy files from control machine to managed nodes

B) 🔄 Copy files between managed nodes

C) 📦 Backup files

D) 🌐 Move files

**Correct Answer**: A) 📝 Copy files from control machine to managed nodes

> 📘 Example: `copy: src=/home/user/file.txt dest=/tmp/file.txt` copies from Ansible controller to target servers!

### 6. 🌐 What is the difference between `shell` and `command` modules? 🟡

A) 📝 shell processes through shell, command executes directly

B) 🔄 shell is faster than command

C) 📦 command supports pipes, shell doesn't

D) 🌐 No difference

**Correct Answer**: A) 📝 shell processes through shell, command executes directly

> 🎯 Use `shell` for pipes/redirects: `shell: ls | grep txt`. Use `command` for simple commands: `command: ls /tmp`!

### 7. 🔐 How do you encrypt a file with Ansible Vault? 🟡

A) 📝 `ansible-vault encrypt filename`

B) 🔄 ansible-vault create filename

C) 📦 ansible-vault secure filename

D) 🌐 ansible-vault lock filename

**Correct Answer**: A) 📝 `ansible-vault encrypt filename`

> ⚡ `ansible-vault encrypt vars.yml` encrypts your variables file. Protects passwords and sensitive data!

### 8. 📊 What is `notify` used for in Ansible? 🟡

A) 📝 Trigger handlers when task changes

B) 🔄 Send notifications

C) 📦 Log changes

D) 🌐 Alert administrators

**Correct Answer**: A) 📝 Trigger handlers when task changes

> 📘 Example: A task that changes config files can notify a handler to restart the service automatically!

### 9. 🔄 What does `changed_when` do? 🔴

A) 📝 Define when a task should report as changed

B) 🔄 Execute task only when changed

C) 📦 Skip task if changed

D) 🌐 Log when task changes

**Correct Answer**: A) 📝 Define when a task should report as changed

> 💡 `changed_when: result.stdout.find('already installed') == -1` reports change only when software wasn't already installed!

### 10. 🌐 What is the `lineinfile` module used for? 🟡

A) 📝 Ensure a line exists in a file

B) 🔄 Read lines from files

C) 📦 Count lines in files

D) 🌐 Delete lines from files

**Correct Answer**: A) 📝 Ensure a line exists in a file

> 🎯 Example: `lineinfile: path=/etc/hosts line="192.168.1.100 myserver"` adds host entry if it doesn't exist!

### 11. 🔍 What does `register` do in Ansible? 🟡

A) 📝 Store task output in a variable

B) 🔄 Register a new host

C) 📦 Save task results to file

D) 🌐 Register with Ansible Galaxy

**Correct Answer**: A) 📝 Store task output in a variable

> 📘 `register: result` lets you use the output in subsequent tasks: `when: result.stdout.find('success') != -1`!

### 12. 🎭 What is `block` used for in playbooks? 🔴

A) 📝 Group tasks and apply common attributes

B) 🔄 Block task execution

C) 📦 Create code blocks

D) 🌐 Block network access

**Correct Answer**: A) 📝 Group tasks and apply common attributes

> ⚡ Blocks allow grouping tasks with common `when`, `become`, or error handling. Like putting tasks in containers!

### 13. 🔧 What does the `service` module do? 🟢

A) 📝 Manage system services (start, stop, enable)

B) 🔄 Install services

C) 📦 Monitor services

D) 🌐 Configure services

**Correct Answer**: A) 📝 Manage system services (start, stop, enable)

> 💡 Example: `service: name=nginx state=started enabled=yes` starts nginx and enables it at boot!

### 14. 🌐 What is `ansible-pull`? 🔴

A) 📝 Run Ansible from managed nodes (pull mode)

B) 🔄 Download playbooks from Git

C) 📦 Pull inventory from servers

D) 🌐 Download Ansible modules

**Correct Answer**: A) 📝 Run Ansible from managed nodes (pull mode)

> 🔄 Instead of pushing from controller, nodes pull and run playbooks themselves. Great for scaling to thousands of nodes!

### 15. 🔍 What does `debug` module do? 🟢

A) 📝 Display messages and variable values

B) 🔄 Debug Ansible code

C) 📦 Enable debug mode

D) 🌐 Debug network connections

**Correct Answer**: A) 📝 Display messages and variable values

> 📘 `debug: msg="Value is {{ myvar }}"` helps troubleshoot by showing variable contents during playbook execution!

### 16. 🎯 What is `meta` module used for? 🔴

A) 📝 Control playbook execution flow

B) 🔄 Add metadata to tasks

C) 📦 Store metadata

D) 🌐 Configure meta information

**Correct Answer**: A) 📝 Control playbook execution flow

> ⚡ `meta: flush_handlers` forces handler execution immediately. `meta: end_play` stops playbook execution!

### 17. 🔧 What does `file` module do? 🟢

A) 📝 Manage file and directory properties

B) 🔄 Read file contents

C) 📦 Edit files

D) 🌐 Transfer files

**Correct Answer**: A) 📝 Manage file and directory properties

> 💡 `file: path=/tmp/mydir state=directory mode=0755` creates directory with specific permissions!

### 18. 🌐 What is `include_tasks` vs `import_tasks`? 🔴

A) 📝 include_tasks is dynamic, import_tasks is static

B) 🔄 include_tasks is faster

C) 📦 import_tasks supports variables better

D) 🌐 No significant difference

**Correct Answer**: A) 📝 include_tasks is dynamic, import_tasks is static

> 🎯 `import_tasks` loads at parse time (static), `include_tasks` loads at runtime (dynamic). Choose based on when you need tasks loaded!

### 19. 🔐 What does `stat` module do? 🟡

A) 📝 Get file or filesystem status

B) 🔄 Display statistics

C) 📦 Start services

D) 🌐 Check network status

**Correct Answer**: A) 📝 Get file or filesystem status

> 📘 `stat: path=/etc/passwd` returns file info like size, permissions, modification time. Perfect for conditional logic!

### 20. 🔄 What is `async` and `poll` in Ansible? 🔴

A) 📝 Run tasks asynchronously with polling interval

B) 🔄 Async networking and polling data

C) 📦 Asynchronous file operations

D) 🌐 Poll external services

**Correct Answer**: A) 📝 Run tasks asynchronously with polling interval

> ⚡ `async: 300 poll: 10` runs task for up to 300 seconds, checking every 10 seconds. Great for long-running tasks!

### 21. 🎯 What are Ansible Collections? 🔴

A) 📝 Packaged sets of modules, plugins, and roles

B) 🔄 Groups of playbooks

C) 📦 Inventory collections

D) 🌐 Host collections

**Correct Answer**: A) 📝 Packaged sets of modules, plugins, and roles

> 🏆 Collections like `community.general` or `ansible.posix` package related functionality. Install with `ansible-galaxy collection install`! 