# 🐚 Bash Scripting - Questions 1

## Questions

### ❓ What's the correct way to check if a file exists in Bash? 🟢

📝 `if [ -f "file.txt" ]; then`
🔄 `if file "file.txt" exists; then`
📦 `if exists "file.txt"; then`
🎯 `if check "file.txt"; then`

**Correct Answer:**
📝 `if [ -f "file.txt" ]; then`

**Explanation:**
💡 The `-f` test operator checks if a file exists and is a regular file. The square brackets `[ ]` are the test command syntax in Bash. Simple but essential for file operations! 🎯

---

### 🧠 How do you assign a value to a variable in Bash? 🟢

📝 `variable=value` (no spaces)
🔄 `variable = value` (with spaces)
📦 `set variable=value`
🎯 `let variable=value`

**Correct Answer:**
📝 `variable=value` (no spaces)

**Explanation:**
⚡ Bash variable assignment requires NO spaces around the equals sign. Spaces would make Bash think you're running a command called `variable` with arguments. Classic gotcha! 😅

---

### 💭 What does `$?` represent in Bash? 🟢

📝 Exit status of the last command
🔄 Current process ID
📦 Number of arguments passed
🎯 Current working directory

**Correct Answer:**
📝 Exit status of the last command

**Explanation:**
🔍 `$?` holds the exit code (0 for success, non-zero for failure) of the most recently executed command. Essential for error handling and conditional logic! 🎯

---

### 🤔 How do you read user input into a variable? 🟡

📝 `read variable_name`
🔄 `input variable_name`
📦 `get variable_name`
🎯 `scanf variable_name`

**Correct Answer:**
📝 `read variable_name`

**Explanation:**
💡 The `read` command waits for user input and stores it in the specified variable. You can also use `read -p "prompt" variable` for a custom prompt! 🎯

---

### 🔧 What's the difference between `$*` and `$@`? 🟡

📝 `$*` is one string, `$@` preserves spaces
🔄 `$*` is faster, `$@` is slower
📦 `$*` works in loops, `$@` doesn't
🎯 No difference, just syntax preference

**Correct Answer:**
📝 `$*` is one string, `$@` preserves spaces

**Explanation:**
🩺 `$*` treats all arguments as a single string, while `$@` preserves individual arguments with their original spacing. Critical for handling arguments with spaces! 🎯

---

### ⚙️ How do you make a script executable? 🟡

📝 `chmod +x script.sh`
🔄 `chmod 755 script.sh`
📦 `make script.sh executable`
🎯 `exec script.sh`

**Correct Answer:**
📝 `chmod +x script.sh`

**Explanation:**
🔧 `chmod +x` adds execute permission to the file. `chmod 755` also works (gives rwx to owner, rx to group/others) but `+x` is more explicit about what you want! 🎯

---

### 🔍 What's the best way to handle errors in a Bash script? 🔴

📝 `set -euo pipefail` at the start
🔄 `trap 'exit 1' ERR`
📦 `if [ $? -ne 0 ]; then exit 1; fi`
🎯 `set -e` only

**Correct Answer:**
📝 `set -euo pipefail` at the start

**Explanation:**
🩺 `set -euo pipefail` is the gold standard: `-e` exits on error, `-u` fails on undefined variables, `-o pipefail` fails if any command in a pipe fails. Production-ready error handling! 🎯

---

### 🚀 How do you create a function that returns a value? 🔴

📝 `function_name() { echo "value"; }`
🔄 `function_name() { return "value"; }`
📦 `function_name() { exit "value"; }`
🎯 `function_name() { printf "value"; }`

**Correct Answer:**
📝 `function_name() { echo "value"; }`

**Explanation:**
💡 Bash functions return values by outputting them (echo/printf). Capture with `result=$(function_name)`. The `return` statement only sets exit codes (0-255), not actual values! 🎯

---

### 🔧 What's the most efficient way to process a file line by line? 🔴

📝 `while IFS= read -r line; do ... done < file`
🔄 `for line in $(cat file); do ... done`
📦 `cat file | while read line; do ... done`
🎯 `readarray -t lines < file; for line in "${lines[@]}"; do`

**Correct Answer:**
📝 `while IFS= read -r line; do ... done < file`

**Explanation:**
⚡ This method is most efficient because it reads the file directly without spawning subshells. `IFS=` preserves leading/trailing whitespace, `-r` prevents backslash interpretation! 🎯

---

### ❓ Which command shows the current directory? 🟢

📝 `pwd`
🔄 `cd`
📦 `ls -d`
🎯 `echo $PWD`

**Correct Answer:**
📝 `pwd`

**Explanation:**
💡 `pwd` stands for "print working directory". While `echo $PWD` also works, `pwd` is the standard command and more portable! 🎯

---

### 🧠 How do you comment a line in Bash? 🟢

📝 `# This is a comment`
🔄 `// This is a comment`
📦 `/* This is a comment */`
🎯 `-- This is a comment`

**Correct Answer:**
📝 `# This is a comment`

**Explanation:**
🔍 The `#` symbol starts a line comment in Bash. Everything after `#` is ignored by the interpreter. Simple but fundamental! 🎯

---

### 💭 What's the correct shebang for a Bash script? 🟢

📝 `#!/bin/bash`
🔄 `#!bash`
📦 `#!/usr/bin/env bash`
🎯 `#/bin/bash`

**Correct Answer:**
📝 `#!/bin/bash`

**Explanation:**
⚡ The shebang `#!/bin/bash` tells the system which interpreter to use. `#!/usr/bin/env bash` is more portable but `#!/bin/bash` is the most common standard! 🎯

---

### 🤔 How do you concatenate strings in Bash? 🟡

📝 `result="${string1}${string2}"`
🔄 `result=$string1 + $string2`
📦 `result=concat($string1, $string2)`
🎯 `result="$string1" . "$string2"`

**Correct Answer:**
📝 `result="${string1}${string2}"`

**Explanation:**
💡 In Bash, you simply put variables together to concatenate. The braces `{}` are optional but recommended for clarity and to avoid ambiguities! 🎯

---

### 🔧 Which operator compares numbers in Bash? 🟡

📝 `-eq` for equal, `-gt` for greater
🔄 `==` for equal, `>` for greater
📦 `=` for equal, `>` for greater
🎯 `.eq.` for equal, `.gt.` for greater

**Correct Answer:**
📝 `-eq` for equal, `-gt` for greater

**Explanation:**
🩺 Bash uses special operators for numbers: `-eq` (equal), `-ne` (not equal), `-gt` (greater than), `-lt` (less than), `-ge` (greater or equal), `-le` (less or equal)! 🎯

---

### ⚙️ How do you execute a command and save its output? 🟡

📝 `output=$(command)`
🔄 `output=command`
📦 `output=exec(command)`
🎯 `output << command`

**Correct Answer:**
📝 `output=$(command)`

**Explanation:**
🔧 The `$(command)` syntax executes the command and captures its output. There's also the old backtick syntax but `$()` is more modern and nestable! 🎯

---

### 🔍 What's the correct way to iterate over files? 🔴

📝 `for file in *.txt; do`
🔄 `for file in $(ls *.txt); do`
📦 `ls *.txt | while read file; do`
🎯 `find . -name "*.txt" | for file; do`

**Correct Answer:**
📝 `for file in *.txt; do`

**Explanation:**
🩺 Direct globbing is safer and more efficient. Avoid `ls` in scripts because it can fail with special filenames. Globbing handles spaces correctly! 🎯

---

### 🚀 How do you pass arguments to a script? 🔴

📝 `$1, $2, $3... for positional arguments`
🔄 `$arg1, $arg2, $arg3...`
📦 `argv[1], argv[2], argv[3]...`
🎯 `param1, param2, param3...`

**Correct Answer:**
📝 `$1, $2, $3... for positional arguments`

**Explanation:**
💡 Arguments are accessed with `$1`, `$2`, etc. `$0` is the script name, `$#` is the argument count, `$@` is all arguments! 🎯

---

### 🔧 What does the `source` command do? 🔴

📝 Executes a script in the current shell
🔄 Compiles a script
📦 Verifies script syntax
🎯 Creates a copy of the script

**Correct Answer:**
📝 Executes a script in the current shell

**Explanation:**
⚡ `source` (or `.`) executes commands in the current shell, not a subshell. Useful for loading environment variables or functions. Changes persist in your session! 🎯

---

### ❓ How do you redirect stderr to a file? 🟢

📝 `command 2> error.log`
🔄 `command > error.log`
📦 `command &> error.log`
🎯 `command >> error.log`

**Correct Answer:**
📝 `command 2> error.log`

**Explanation:**
💡 File descriptor 2 represents stderr. `2>` redirects only errors, `&>` redirects both stdout and stderr, `>` redirects only stdout! 🎯

---

### 🧠 Which logical operator represents AND in Bash? 🟢

📝 `&&`
🔄 `AND`
📦 `&`
🎯 `and`

**Correct Answer:**
📝 `&&`

**Explanation:**
🔍 `&&` executes the second command only if the first succeeds. There's also `||` for OR. Perfect for chaining commands conditionally! 🎯

---

### 💭 How do you declare an array in Bash? 🟢

📝 `array=(element1 element2 element3)`
🔄 `array=[element1, element2, element3]`
📦 `declare array[element1 element2 element3]`
🎯 `array={element1; element2; element3}`

**Correct Answer:**
📝 `array=(element1 element2 element3)`

**Explanation:**
⚡ Bash arrays are declared with parentheses and space-separated elements. Access with `${array[0]}`, `${array[1]}`, etc. Indices start at 0! 🎯 