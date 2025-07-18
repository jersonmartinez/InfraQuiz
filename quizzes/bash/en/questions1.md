# 🐚 Bash Scripting - Questions 1

## Questions

### 1. ❓ What's the correct way to check if a file exists in Bash? 🟢

A) 📝 `if [ -f "file.txt" ]; then`

B) 🔄 `if file "file.txt" exists; then`

C) 📦 `if exists "file.txt"; then`

D) 🎯 `if check "file.txt"; then`

**Correct Answer**: A) 📝 `if [ -f "file.txt" ]; then`

> 💡 The `-f` test operator checks if a file exists and is a regular file. The square brackets `[ ]` are the test command syntax in Bash. Simple but essential for file operations! 🎯

### 2. 🧠 How do you assign a value to a variable in Bash? 🟢

A) 📝 `variable=value` (no spaces)

B) 🔄 `variable = value` (with spaces)

C) 📦 `set variable=value`

D) 🎯 `let variable=value`

**Correct Answer**: A) 📝 `variable=value` (no spaces)

> ⚡ Bash variable assignment requires NO spaces around the equals sign. Spaces would make Bash think you're running a command called `variable` with arguments. Classic gotcha! 😅

### 3. 💭 What does `$?` represent in Bash? 🟢

A) 📝 Exit status of the last command

B) 🔄 Current process ID

C) 📦 Number of arguments passed

D) 🎯 Current working directory

**Correct Answer**: A) 📝 Exit status of the last command

> 🔍 `$?` holds the exit code (0 for success, non-zero for failure) of the most recently executed command. Essential for error handling and conditional logic! 🎯

### 4. 🤔 How do you read user input into a variable? 🟡

A) 📝 `read variable_name`

B) 🔄 `input variable_name`

C) 📦 `get variable_name`

D) 🎯 `scanf variable_name`

**Correct Answer**: A) 📝 `read variable_name`

> 💡 The `read` command waits for user input and stores it in the specified variable. You can also use `read -p "prompt" variable` for a custom prompt! 🎯

### 5. 🔧 What's the difference between `$*` and `$@`? 🟡

A) 📝 `$*` is one string, `$@` preserves spaces

B) 🔄 `$*` is faster, `$@` is slower

C) 📦 `$*` includes script name, `$@` doesn't

D) 🎯 There's no difference

**Correct Answer**: A) 📝 `$*` is one string, `$@` preserves spaces

> ⚡ `$*` joins all arguments into a single string, `$@` keeps them as separate arguments. Crucial for scripts handling multiple arguments!

### 6. 🎯 How do you redirect both stdout and stderr to a file? 🟡

A) 📝 `command > file 2>&1`

B) 🔄 `command >> file 2>> file`

C) 📦 `command &> file`

D) 🎯 `command > file 2> file`

**Correct Answer**: A) 📝 `command > file 2>&1`

> 🔄 `2>&1` redirects stderr (2) to the same place as stdout (1). You can also use `&>` as a shortcut in modern Bash!

### 7. 🚀 How do you create a function in Bash? 🟡

A) 📝 `function name() { commands; }`

B) 🔄 `def name() { commands; }`

C) 📦 `function name { commands; }`

D) 🎯 `name() => { commands; }`

**Correct Answer**: A) 📝 `function name() { commands; }`

> 💡 Bash functions can be defined with `function name()` or just `name()`. Useful for reusable code!

### 8. 🔍 How do you check if a variable is empty? 🟡

A) 📝 `if [ -z "$variable" ]; then`

B) 🔄 `if [ $variable == "" ]; then`

C) 📦 `if [ empty "$variable" ]; then`

D) 🎯 `if [ null "$variable" ]; then`

**Correct Answer**: A) 📝 `if [ -z "$variable" ]; then`

> 🔍 `-z` checks if the variable is empty (zero length). `-n` checks the opposite (not zero length). Always use quotes!

### 9. 🎯 How do you get the length of a string? 🟡

A) 📝 `${#string}`

B) 🔄 `length($string)`

C) 📦 `$string.length`

D) 🎯 `len($string)`

**Correct Answer**: A) 📝 `${#string}`

> ⚡ The `${#variable}` syntax returns the string length. Useful for validations and loops!

### 10. 🔄 How do you create a for loop over files? 🟡

A) 📝 `for file in *.txt; do echo $file; done`

B) 🔄 `for (file in *.txt) { echo $file }`

C) 📦 `for file = *.txt; echo $file; next`

D) 🎯 `foreach file in *.txt; echo $file; end`

**Correct Answer**: A) 📝 `for file in *.txt; do echo $file; done`

> 🔄 The `for` loop in Bash uses the syntax `for item in list; do commands; done`. The globbing `*.txt` expands automatically!

### 11. 🚀 How do you make a script safer? 🔴

A) 📝 `set -euo pipefail` at the beginning

B) 🔄 `secure_mode on`

C) 📦 `bash --safe script.sh`

D) 🎯 `#!/bin/bash --secure`

**Correct Answer**: A) 📝 `set -euo pipefail` at the beginning

> 🛡️ `set -e` exits on error, `set -u` exits on undefined variable, `set -o pipefail` fails if any command in a pipe fails. The triple protection!

### 12. 🔧 How do you generate random numbers? 🟡

A) 📝 `$RANDOM`

B) 🔄 `$(random)`

C) 📦 `rand()`

D) 🎯 `$RAND`

**Correct Answer**: A) 📝 `$RANDOM`

> 🎲 `$RANDOM` generates numbers between 0-32767. For other ranges use `$((RANDOM % max + min))`. For better quality use `/dev/random`!

### 13. 🎯 How do you run commands in parallel? 🔴

A) 📝 `command1 & command2 & wait`

B) 🔄 `parallel command1 command2`

C) 📦 `command1 | command2`

D) 🎯 `command1 && command2`

**Correct Answer**: A) 📝 `command1 & command2 & wait`

> ⚡ The `&` runs in background, `wait` waits for all to finish. For complex cases use GNU `parallel`!

### 14. 🔍 How do you get positional arguments? 🟢

A) 📝 `$1, $2, $3...`

B) 🔄 `args[1], args[2], args[3]...`

C) 📦 `argv[1], argv[2], argv[3]...`

D) 🎯 `param1, param2, param3...`

**Correct Answer**: A) 📝 `$1, $2, $3...`

> 📋 `$1` is the first argument, `$2` the second, etc. `$0` is the script name. For more than 9 use `${10}`!

### 15. 🚀 How do you debug Bash scripts? 🔴

A) 📝 `bash -x script.sh` or `set -x`

B) 🔄 `debug script.sh`

C) 📦 `bash --debug script.sh`

D) 🎯 `trace script.sh`

**Correct Answer**: A) 📝 `bash -x script.sh` or `set -x`

> 🐛 The `-x` option shows each command before executing it. Perfect for finding where your script fails!

### 16. 🔧 How do you work with arrays? 🔴

A) 📝 `array=(item1 item2 item3); echo ${array[0]}`

B) 🔄 `array[0]=item1; array[1]=item2; echo $array[0]`

C) 📦 `declare array=(item1 item2 item3); echo array[0]`

D) 🎯 `set array item1 item2 item3; echo $array[0]`

**Correct Answer**: A) 📝 `array=(item1 item2 item3); echo ${array[0]}`

> 📚 Arrays in Bash use special syntax: `array=(...)` to create, `${array[index]}` to access. Note the braces!

### 17. 🎯 How do you do string substitution? 🔴

A) 📝 `${variable/old/new}` for first, `${variable//old/new}` for all

B) 🔄 `$variable.replace(old, new)`

C) 📦 `replace($variable, old, new)`

D) 🎯 `substitute $variable old new`

**Correct Answer**: A) 📝 `${variable/old/new}` for first, `${variable//old/new}` for all

> 🔄 Parameter expansion allows string manipulation without external commands. Faster than `sed` for simple cases!

### 18. 🚀 How do you handle signals in scripts? 🔴

A) 📝 `trap 'cleanup' EXIT INT TERM`

B) 🔄 `signal_handler EXIT INT TERM`

C) 📦 `on_signal cleanup EXIT INT TERM`

D) 🎯 `catch EXIT INT TERM cleanup`

**Correct Answer**: A) 📝 `trap 'cleanup' EXIT INT TERM`

> 🎯 `trap` allows capturing signals and executing cleanup code. Essential for robust scripts that handle resources!

### 19. 🔍 How do you work with temporary files safely? 🔴

A) 📝 `mktemp` to create unique temporary files

B) 🔄 `touch /tmp/temp$$`

C) 📦 `tempfile=$(date +%s)`

D) 🎯 `temp=/tmp/temp.txt`

**Correct Answer**: A) 📝 `mktemp` to create unique temporary files

> 🔐 `mktemp` creates files with unique names and secure permissions. Avoids race conditions and name conflicts!

### 20. 🔧 What's the difference between `source` and executing a script? 🔴

A) 📝 `source` executes in current shell, executing creates subshell

B) 🔄 `source` is faster than executing

C) 📦 `source` only works with .sh scripts

D) 🎯 There's no difference

**Correct Answer**: A) 📝 `source` executes in current shell, executing creates subshell

> ⚡ `source script.sh` (or `. script.sh`) executes in the current context, variable changes persist. Useful for configuration scripts!

### 21. 🎯 What's the best practice for robust Bash scripts? 🔴

A) 📝 Use `set -euo pipefail`, validate inputs, handle errors, document

B) 🔄 Use only basic commands

C) 📦 Avoid functions

D) 🎯 Don't use variables

**Correct Answer**: A) 📝 Use `set -euo pipefail`, validate inputs, handle errors, document

> 🎯 Production scripts need: strict mode, input validation, error handling, logging, cleanup with trap, and clear documentation. Robustness is key! 