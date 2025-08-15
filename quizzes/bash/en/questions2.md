# 🐚 Bash Scripting - Questions 2

## Questions

### 1. 🔧 What does `set -x` do in Bash? 🟢

A) 📝 Enables debug mode (shows commands before execution)

B) 🔄 Sets execution permissions

C) 📦 Enables extended features

D) 🎯 Sets exit on error

**Correct Answer**: A) 📝 Enables debug mode (shows commands before execution)

💡 `set -x` prints each command before executing it. Perfect for debugging scripts and understanding execution flow! 🐛

### 2. 🚀 How do you create an array in Bash? 🟡

A) 📝 `array=(item1 item2 item3)`

B) 🔄 `array = [item1, item2, item3]`

C) 📦 `declare array[item1, item2, item3]`

D) 🎯 `array = {item1, item2, item3}`

**Correct Answer**: A) 📝 `array=(item1 item2 item3)`

⚡ Bash arrays use parentheses and space-separated values. Access with `${array[0]}`, `${array[1]}`, etc. Simple but powerful! 🎯

### 3. 🔍 What does `grep -v` do? 🟡

A) 📝 Inverts the match (shows lines that DON'T match)

B) 🔄 Shows verbose output

C) 📦 Shows version information

D) 🎯 Shows variable matches

**Correct Answer**: A) 📝 Inverts the match (shows lines that DON'T match)

🔍 `grep -v` is like a "NOT" filter. Perfect for excluding specific patterns from your search results! 🚫

### 4. 📦 How do you check if a directory exists? 🟢

A) 📝 `if [ -d "dirname" ]; then`

B) 🔄 `if directory "dirname" exists; then`

C) 📦 `if exists "dirname"; then`

D) 🎯 `if check "dirname"; then`

**Correct Answer**: A) 📝 `if [ -d "dirname" ]; then`

💡 The `-d` test operator checks if a directory exists. Similar to `-f` for files, but for directories! 📁

### 5. 🔄 What does `trap` do in Bash? 🔴

A) 📝 Sets up signal handlers for cleanup operations

B) 🔄 Traps errors in scripts

C) 📦 Traps user input

D) 🎯 Traps system calls

**Correct Answer**: A) 📝 Sets up signal handlers for cleanup operations

🛡️ `trap` catches signals like SIGINT (Ctrl+C) and executes cleanup code. Essential for robust scripts that need to clean up after themselves! 🧹

### 6. 🌟 How do you get the last exit code? 🟢

A) 📝 `$?`

B) 🔄 `$EXIT_CODE`

C) 📦 `$LAST_EXIT`

D) 🎯 `$STATUS`

**Correct Answer**: A) 📝 `$?`

⚡ `$?` always contains the exit status of the most recently executed command. 0 = success, non-zero = failure! 🎯

### 7. 🔧 What does `exec` do? 🔴

A) 📝 Replaces current shell with new command

B) 🔄 Executes command in background

C) 📦 Executes command with elevated privileges

D) 🎯 Executes command in subshell

**Correct Answer**: A) 📝 Replaces current shell with new command

🚀 `exec` replaces the current process. Useful for scripts that end with a specific command - no need to return to shell! ⚡

### 8. 📋 How do you get the number of arguments? 🟢

A) 📝 `$#`

B) 🔄 `$ARGS_COUNT`

C) 📦 `$ARGUMENTS`

D) 🎯 `$COUNT`

**Correct Answer**: A) 📝 `$#`

🔢 `$#` gives you the count of positional arguments. Perfect for validation: `if [ $# -eq 2 ]; then` checks for exactly 2 arguments! ✅

### 9. 🔄 What does `wait` do? 🟡

A) 📝 Waits for all background processes to complete

B) 🔄 Waits for user input

C) 📦 Waits for a specific time

D) 🎯 Waits for network response

**Correct Answer**: A) 📝 Waits for all background processes to complete

⏳ `wait` ensures all background jobs (`&`) finish before continuing. Essential for parallel processing scripts! 🚀

### 10. 🎯 How do you create a case statement? 🟡

A) 📝 `case $variable in pattern1) commands;; pattern2) commands;; esac`

B) 🔄 `switch $variable { case pattern1: commands; case pattern2: commands; }`

C) 📦 `if $variable matches pattern1: commands; elif pattern2: commands; fi`

D) 🎯 `select $variable from pattern1, pattern2 do commands done`

**Correct Answer**: A) 📝 `case $variable in pattern1) commands;; pattern2) commands;; esac`

💡 Case statements are perfect for multiple condition checks. Each pattern ends with `;;` and the whole thing ends with `esac`! 🎯

### 11. 🔍 What does `basename` do? 🟡

A) 📝 Extracts filename without path

B) 🔄 Shows base directory

C) 📦 Shows file permissions

D) 🎯 Shows file owner

**Correct Answer**: A) 📝 Extracts filename without path

📁 `basename /path/to/file.txt` returns `file.txt`. Perfect for getting just the filename from a full path! ✂️

### 12. 🚀 How do you make a script executable? 🟢

A) 📝 `chmod +x script.sh`

B) 🔄 `chmod 755 script.sh`

C) 📦 `chmod execute script.sh`

D) 🎯 `chmod run script.sh`

**Correct Answer**: A) 📝 `chmod +x script.sh`

⚡ `chmod +x` adds execute permission. You can also use `chmod 755` for more specific permissions (rwxr-xr-x)! 🔐

### 13. 🔧 What does `shift` do? 🟡

A) 📝 Removes first argument and shifts others left

B) 🔄 Shifts text left

C) 📦 Shifts array elements

D) 🎯 Shifts cursor position

**Correct Answer**: A) 📝 Removes first argument and shifts others left

🔄 `shift` removes `$1` and makes `$2` become `$1`, `$3` become `$2`, etc. Great for processing arguments in loops! 📋

### 14. 🌟 How do you get the script name? 🟢

A) 📝 `$0`

B) 🔄 `$SCRIPT_NAME`

C) 📦 `$NAME`

D) 🎯 `$SCRIPT`

**Correct Answer**: A) 📝 `$0`

📝 `$0` contains the name of the script as it was called. Useful for usage messages and self-referencing! 🎯

### 15. 🔄 What does `local` do in functions? 🟡

A) 📝 Declares a variable local to the function

B) 🔄 Makes variable global

C) 📦 Imports local variables

D) 🎯 Exports local variables

**Correct Answer**: A) 📝 Declares a variable local to the function

🏠 `local` keeps variables inside the function scope. Prevents conflicts with global variables of the same name! 🛡️

### 16. 📦 How do you check if a string contains a substring? 🟡

A) 📝 `if [[ "$string" == *"substring"* ]]; then`

B) 🔄 `if contains "$string" "substring"; then`

C) 📦 `if string has "substring"; then`

D) 🎯 `if match "$string" "substring"; then`

**Correct Answer**: A) 📝 `if [[ "$string" == *"substring"* ]]; then`

🔍 The `*` wildcards match anything before/after. `[[ ]]` is the modern test syntax with better string handling! ✨

### 17. 🚀 What does `nohup` do? 🔴

A) 📝 Runs command immune to hangup signal

B) 🔄 Runs command in background

C) 📦 Runs command with no output

D) 🎯 Runs command with no user interaction

**Correct Answer**: A) 📝 Runs command immune to hangup signal

🛡️ `nohup` prevents the command from being killed when you log out. Perfect for long-running processes! ⏰

### 18. 🔧 How do you redirect both stdout and stderr? 🟡

A) 📝 `command &> file` or `command > file 2>&1`

B) 🔄 `command >> file`

C) 📦 `command redirect all file`

D) 🎯 `command | file`

**Correct Answer**: A) 📝 `command &> file` or `command > file 2>&1`

📤 `&>` redirects both streams to the same file. `2>&1` redirects stderr to wherever stdout is going! 🎯

### 19. 🌟 What does `declare` do? 🟡

A) 📝 Declares variables with specific attributes

B) 🔄 Declares functions

C) 📦 Declares arrays

D) 🎯 Declares constants

**Correct Answer**: A) 📝 Declares variables with specific attributes

💡 `declare -i` makes integer, `declare -r` makes read-only, `declare -a` makes array. Gives you control over variable behavior! 🎛️

### 20. 🔄 How do you create a here document? 🟡

A) 📝 `cat << EOF\ncontent\nEOF`

B) 🔄 `here << content >>`

C) 📦 `document << content >>`

D) 🎯 `text << content >>`

**Correct Answer**: A) 📝 `cat << EOF\ncontent\nEOF`

📄 Here documents let you embed multi-line text in scripts. Great for generating configuration files or long text output! 📝

### 21. 🎯 What's the best practice for error handling in Bash? 🔴

A) 📝 Use `set -euo pipefail`, trap signals, validate inputs, log errors

B) 🔄 Use only basic error checking

C) 📦 Ignore errors and continue

D) 🎯 Use try-catch blocks

**Correct Answer**: A) 📝 Use `set -euo pipefail`, trap signals, validate inputs, log errors

🛡️ Production scripts need: strict mode, signal trapping, input validation, comprehensive logging, and graceful error handling. Robustness is key! 🚀
