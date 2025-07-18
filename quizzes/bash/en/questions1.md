# 🐚 Bash Scripting - Questions 1

## Questions

### 1. ❓ What's the correct way to check if a file exists in Bash? 🟢

A) 📝 `if [ -f "file.txt" ]; then`

B) 🔄 if file "file.txt" exists; then

C) 📦 if exists "file.txt"; then

D) 🎯 if check "file.txt"; then

**Correct Answer**: A) 📝 `if [ -f "file.txt" ]; then`

> 💡 The `-f` test operator checks if a file exists and is a regular file. The square brackets `[ ]` are the test command syntax in Bash. Simple but essential for file operations! 🎯

### 2. 🧠 How do you assign a value to a variable in Bash? 🟢

A) 📝 `variable=value` (no spaces)

B) 🔄 variable = value (with spaces)

C) 📦 set variable=value

D) 🎯 let variable=value

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

B) 🔄 input variable_name

C) 📦 get variable_name

D) 🎯 scanf variable_name

**Correct Answer**: A) 📝 `read variable_name`

> 💡 The `read` command waits for user input and stores it in the specified variable. You can also use `read -p "prompt" variable` for a custom prompt! 🎯

### 5. 🔧 What's the difference between `$*` and `$@`? 🟡

A) 📝 `$*` is one string, `$@` preserves spaces

B) 🔄 No difference between them

C) 📦 `$*` is for arrays, `$@` for strings

D) 🎯 `$@` is deprecated, use `$*`

**Correct Answer**: A) 📝 `$*` is one string, `$@` preserves spaces

> ⚡ `$*` treats all arguments as a single string, while `$@` preserves individual arguments. Use `"$@"` to properly handle arguments with spaces!

### 6. 🎯 How do you create a for loop in Bash? 🟡

A) 📝 `for item in list; do commands; done`

B) 🔄 for (item in list) { commands }

C) 📦 foreach item in list: commands

D) 🎯 for item of list do commands end

**Correct Answer**: A) 📝 `for item in list; do commands; done`

> 🔄 The `for` loop in Bash uses this specific syntax. You can loop over files, numbers, or any list of items!

### 7. 🚀 What does the shebang `#!/bin/bash` do? 🟢

A) 📝 Tells system which interpreter to use

B) 🔄 Comments out the first line

C) 📦 Defines the script version

D) 🎯 Sets the script permissions

**Correct Answer**: A) 📝 Tells system which interpreter to use

> 💡 The shebang (`#!`) tells the system to use `/bin/bash` to execute the script. Like telling someone which language you're speaking!

### 8. 🔍 How do you check if a variable is empty? 🟡

A) 📝 `if [ -z "$variable" ]; then`

B) 🔄 if variable is empty; then

C) 📦 if empty($variable); then

D) 🎯 if !variable; then

**Correct Answer**: A) 📝 `if [ -z "$variable" ]; then`

> 🎯 The `-z` test returns true if the string length is zero. Always quote your variables to handle spaces correctly!

### 9. 📦 How do you get the length of a string? 🟡

A) 📝 `${#string}`

B) 🔄 length(string)

C) 📦 string.length

D) 🎯 len($string)

**Correct Answer**: A) 📝 `${#string}`

> ⚡ The `${#variable}` syntax returns the length of the variable's value. Simple and built into Bash!

### 10. 🔄 How do you create a while loop? 🟡

A) 📝 `while condition; do commands; done`

B) 🔄 while (condition) { commands }

C) 📦 while condition: commands

D) 🎯 while condition do commands end

**Correct Answer**: A) 📝 `while condition; do commands; done`

> 📘 While loops continue as long as the condition is true. Great for reading files line by line or waiting for conditions!

### 11. 🌟 How do you loop through files? 🟡

A) 📝 `for file in *.txt; do echo $file; done`

B) 🔄 loop files *.txt; echo file; end

C) 📦 for file = *.txt; echo $file; next

D) 🎯 foreach file in *.txt; echo $file; end

**Correct Answer**: A) 📝 `for file in *.txt; do echo $file; done`

> 🔄 The `for` loop in Bash uses the syntax `for item in list; do commands; done`. The globbing `*.txt` expands automatically!

### 12. 🚀 How do you make a script safer? 🔴

A) 📝 `set -euo pipefail` at the beginning

B) 🔄 secure_mode on

C) 📦 `bash --safe script.sh`

D) 🎯 `#!/bin/bash --secure`

**Correct Answer**: A) 📝 `set -euo pipefail` at the beginning

> 🛡️ `set -e` exits on error, `set -u` exits on undefined variable, `set -o pipefail` fails if any command in a pipe fails. The triple protection!

### 13. 🔧 How do you generate random numbers? 🟡

A) 📝 `$RANDOM`

B) 🔄 $(random)

C) 📦 rand()

D) 🎯 $RAND

**Correct Answer**: A) 📝 `$RANDOM`

> 🎲 `$RANDOM` generates numbers between 0-32767. For other ranges use `$((RANDOM % max + min))`. For better quality use `/dev/random`!

### 14. 🎯 How do you run commands in parallel? 🔴

A) 📝 `command1 & command2 & wait`

B) 🔄 parallel command1 command2

C) 📦 command1 | command2

D) 🎯 command1 && command2

**Correct Answer**: A) 📝 `command1 & command2 & wait`

> ⚡ The `&` runs in background, `wait` waits for all to finish. For complex cases use GNU `parallel`!

### 15. 🔍 How do you get positional arguments? 🟢

A) 📝 `$1, $2, $3...`

B) 🔄 args[1], args[2], args[3]...

C) 📦 argv[1], argv[2], argv[3]...

D) 🎯 param1, param2, param3...

**Correct Answer**: A) 📝 `$1, $2, $3...`

> 📋 `$1` is the first argument, `$2` the second, etc. `$0` is the script name. For more than 9 use `${10}`!

### 16. 🚀 How do you debug Bash scripts? 🔴

A) 📝 `bash -x script.sh` or `set -x`

B) 🔄 debug script.sh

C) 📦 `bash --debug script.sh`

D) 🎯 trace script.sh

**Correct Answer**: A) 📝 `bash -x script.sh` or `set -x`

> 🔍 The `-x` option shows each command before executing it. Like having a narrator for your script!

### 17. 📦 How do you handle command line options? 🔴

A) 📝 `getopts` or manual parsing with case

B) 🔄 getopt() function

C) 📦 parse_args() function

D) 🎯 argparse module

**Correct Answer**: A) 📝 `getopts` or manual parsing with case

> 💡 `getopts` is built into Bash for simple option parsing. For complex cases, use a `case` statement or external tools!

### 18. 🔧 How do you redirect output? 🟢

A) 📝 `command > file` (stdout), `command 2> file` (stderr)

B) 🔄 command >> file (stdout only)

C) 📦 redirect command to file

D) 🎯 command | file

**Correct Answer**: A) 📝 `command > file` (stdout), `command 2> file` (stderr)

> 📘 `>` redirects stdout, `2>` redirects stderr, `&>` redirects both. The `>>` appends instead of overwriting!

### 19. 🎯 How do you create functions? 🟡

A) 📝 `function_name() { commands; }` or `function function_name { commands; }`

B) 🔄 def function_name(): commands

C) 📦 function function_name(args) commands end

D) 🎯 create function_name { commands }

**Correct Answer**: A) 📝 `function_name() { commands; }` or `function function_name { commands; }`

> ⚡ Both syntaxes work! Functions help organize code and make it reusable. Like having your own custom commands!

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