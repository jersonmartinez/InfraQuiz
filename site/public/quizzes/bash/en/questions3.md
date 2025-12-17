# 🐚 Bash Scripting - Questions 3

## Questions

### 1. 🔧 What does `set -u` do in Bash? 🟢

A) 📝 Exits on undefined variable usage

B) 🔄 Sets user permissions

C) 📦 Sets unlimited variables

D) 🎯 Sets user mode

**Correct Answer**: A) 📝 Exits on undefined variable usage

💡 `set -u` makes Bash exit when an undefined variable is used. Perfect for catching typos and missing variables early! 🚨

### 2. 🚀 How do you create a named pipe (FIFO)? 🟡

A) 📝 `mkfifo pipe_name`

B) 🔄 `mknod pipe_name p`

C) 📦 `create pipe pipe_name`

D) 🎯 `pipe create pipe_name`

**Correct Answer**: A) 📝 `mkfifo pipe_name`

⚡ Named pipes allow processes to communicate. Use `mkfifo` to create them, then read/write like regular files! 🔄

### 3. 🔍 What does `sed -i` do? 🟡

A) 📝 Edits files in-place (modifies original file)

B) 🔄 Shows interactive mode

C) 📦 Shows input files

D) 🎯 Shows information

**Correct Answer**: A) 📝 Edits files in-place (modifies original file)

🔧 `sed -i` modifies files directly instead of printing to stdout. Great for batch file editing, but be careful - it changes the original! ⚠️

### 4. 📦 How do you check if a file is executable? 🟢

A) 📝 `if [ -x "file.sh" ]; then`

B) 🔄 `if executable "file.sh"; then`

C) 📦 `if can_execute "file.sh"; then`

D) 🎯 `if runnable "file.sh"; then`

**Correct Answer**: A) 📝 `if [ -x "file.sh" ]; then`

💡 The `-x` test operator checks if a file has execute permissions. Essential for checking if scripts can be run! 🚀

### 5. 🔄 What does `cron` do? 🔴

A) 📝 Schedules commands to run at specific times

B) 🔄 Runs commands in background

C) 📦 Runs commands with elevated privileges

D) 🎯 Runs commands in sequence

**Correct Answer**: A) 📝 Schedules commands to run at specific times

⏰ Cron is the time-based job scheduler. Use `crontab -e` to edit your cron jobs and automate repetitive tasks! 🤖

### 6. 🌟 How do you get the process ID of the current shell? 🟢

A) 📝 `$$`

B) 🔄 `$PID`

C) 📦 `$PROCESS_ID`

D) 🎯 `$SHELL_PID`

**Correct Answer**: A) 📝 `$$`

⚡ `$$` contains the process ID of the current shell. Useful for creating unique temporary files or process identification! 🆔

### 7. 🔧 What does `ulimit` do? 🔴

A) 📝 Sets resource limits for the current shell

B) 🔄 Sets user limits

C) 📦 Sets unlimited resources

D) 🎯 Sets user permissions

**Correct Answer**: A) 📝 Sets resource limits for the current shell

🛡️ `ulimit` controls resource limits like file size, memory, and process count. Essential for preventing runaway processes! 🚫

### 8. 📋 How do you get all arguments as a single string? 🟢

A) 📝 `"$*"`

B) 🔄 `$@`

C) 📦 `$ARGS`

D) 🎯 `$ALL`

**Correct Answer**: A) 📝 `"$*"`

🔍 `"$*"` joins all arguments into one string with spaces. `"$@"` keeps them separate. Choose based on your needs! 🎯

### 9. 🔄 What does `timeout` do? 🟡

A) 📝 Runs command with a time limit

B) 🔄 Sets system timeout

C) 📦 Shows time information

D) 🎯 Sets user timeout

**Correct Answer**: A) 📝 Runs command with a time limit

⏱️ `timeout 30s command` kills the command after 30 seconds. Perfect for preventing hanging processes! 🚫

### 10. 🎯 How do you create a select menu? 🟡

A) 📝 `select item in list; do commands; done`

B) 🔄 `menu select item from list; do commands; end`

C) 📦 `choose item in list: commands`

D) 🎯 `pick item from list do commands done`

**Correct Answer**: A) 📝 `select item in list; do commands; done`

💡 Select creates interactive menus! Users pick from numbered options, and you handle their choice in the loop! 🎮

### 11. 🔍 What does `awk` do? 🟡

A) 📝 Processes text files line by line with pattern matching

B) 🔄 Shows file access times

C) 📦 Shows file permissions

D) 🎯 Shows file ownership

**Correct Answer**: A) 📝 Processes text files line by line with pattern matching

🔧 Awk is a powerful text processor. Use it for data extraction, reporting, and text manipulation! 📊

### 12. 🚀 How do you check if a file is a symbolic link? 🟢

A) 📝 `if [ -L "link" ]; then`

B) 🔄 `if symbolic "link"; then`

C) 📦 `if is_link "link"; then`

D) 🎯 `if link_exists "link"; then`

**Correct Answer**: A) 📝 `if [ -L "link" ]; then`

💡 The `-L` test operator checks if a file is a symbolic link. Useful for determining file types! 🔗

### 13. 🔧 What does `jobs` do? 🟡

A) 📝 Lists background jobs in current shell

B) 🔄 Shows system jobs

C) 📦 Shows user jobs

D) 🎯 Shows all jobs

**Correct Answer**: A) 📝 Lists background jobs in current shell

📋 `jobs` shows background processes started with `&`. Use `fg` to bring them to foreground or `bg` to continue in background! 🔄

### 14. 🌟 How do you get the current working directory? 🟢

A) 📝 `$PWD`

B) 🔄 `$CWD`

C) 📦 `$WORKING_DIR`

D) 🎯 `$DIR`

**Correct Answer**: A) 📝 `$PWD`

📁 `$PWD` contains the current working directory. Also available as the `pwd` command! 🎯

### 15. 🔄 What does `trap -` do? 🟡

A) 📝 Removes all signal traps

B) 🔄 Shows trap information

C) 📦 Sets default traps

D) 🎯 Shows trap status

**Correct Answer**: A) 📝 Removes all signal traps

🔄 `trap -` removes all signal handlers. Useful for cleaning up traps or resetting to default behavior! 🧹

### 16. 📦 How do you check if a file is empty? 🟢

A) 📝 `if [ ! -s "file.txt" ]; then`

B) 🔄 `if empty "file.txt"; then`

C) 📦 `if file_empty "file.txt"; then`

D) 🎯 `if is_empty "file.txt"; then`

**Correct Answer**: A) 📝 `if [ ! -s "file.txt" ]; then`

💡 `-s` checks if file has size > 0. `! -s` means "not size > 0" = empty file! 📄

### 17. 🚀 What does `screen` do? 🔴

A) 📝 Creates persistent terminal sessions

B) 🔄 Shows screen information

C) 📦 Sets screen resolution

D) 🎯 Sets screen mode

**Correct Answer**: A) 📝 Creates persistent terminal sessions

🖥️ Screen creates persistent terminal sessions that survive disconnections. Perfect for long-running processes! 💻

### 18. 🔧 How do you redirect stderr to stdout? 🟡

A) 📝 `command 2>&1`

B) 🔄 `command error>output`

C) 📦 `command redirect error`

D) 🎯 `command stderr>stdout`

**Correct Answer**: A) 📝 `command 2>&1`

📤 `2>&1` redirects stderr (file descriptor 2) to wherever stdout (file descriptor 1) is going! 🎯

### 19. 🌟 What does `declare -r` do? 🟡

A) 📝 Makes variable read-only (cannot be changed)

B) 🔄 Makes variable global

C) 📦 Makes variable local

D) 🎯 Makes variable exportable

**Correct Answer**: A) 📝 Makes variable read-only (cannot be changed)

🔒 `declare -r` creates read-only variables. Once set, they cannot be modified - perfect for constants! 🛡️

### 20. 🔄 How do you create a function with parameters? 🟡

A) 📝 `function_name() { echo "First: $1, Second: $2"; }`

B) 🔄 `function function_name(param1, param2) { echo param1, param2; }`

C) 📦 `def function_name: echo param1, param2`

D) 🎯 `create function_name { echo param1, param2 }`

**Correct Answer**: A) 📝 `function_name() { echo "First: $1, Second: $2"; }`

💡 Functions use positional parameters just like scripts! `$1`, `$2`, etc. refer to the arguments passed to the function! 🎯

### 21. 🎯 What's the best practice for logging in Bash scripts? 🔴

A) 📝 Use timestamps, log levels, structured format, and log rotation

B) 🔄 Use only echo statements

C) 📦 Don't log anything

D) 🎯 Use printf only

**Correct Answer**: A) 📝 Use timestamps, log levels, structured format, and log rotation

📝 Production scripts need: timestamps, log levels (INFO/WARN/ERROR), structured format, log rotation, and proper error logging. Visibility is key! 🔍
