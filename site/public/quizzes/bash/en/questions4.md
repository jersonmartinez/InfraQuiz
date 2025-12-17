# Advanced Bash Quiz 4 🐚

❓ What Bash command allows you to search for files by name and execute commands on them? 🔴

📝 A) `find -exec`
⚙️ B) `grep -r`
🔧 C) `locate -i`
🐳 D) `which -a`

💡 `find -exec` allows you to search for files and execute commands on the found results, providing granular control over file operations.

🧠 What is the purpose of the `<<<` operator in Bash? 🔴

📝 A) Redirect input from a string (here-string)
⚙️ B) Redirect output to a file
🔧 C) Redirect input from a file
🐳 D) Redirect error output

💡 The `<<<` operator (here-string) redirects a string as standard input to a command, useful for passing data directly without creating temporary files.

🤔 What Bash command allows you to create a backup file with timestamp? 🔴

📝 A) `cp --backup=numbered`
⚙️ B) `mv -b`
🔧 C) `tar -czf`
🐳 D) `rsync --backup`

💡 `cp --backup=numbered` automatically creates numbered backup copies, preserving existing files with extensions like `.~1~`, `.~2~`, etc.

🔍 What is the purpose of the special variable `$?` in Bash? 🔴

📝 A) Store the exit code of the last command
⚙️ B) Contain the PID of the current process
🔧 C) Store the number of arguments
🐳 D) Contain the script name

💡 `$?` contains the exit code of the last executed command, where 0 indicates success and non-zero values indicate different types of errors.

❓ What Bash command allows you to create a log file with automatic timestamp? 🔴

📝 A) `logger -t`
⚙️ B) `tee -a`
🔧 C) `script -q`
🐳 D) `logrotate`

💡 `logger -t` sends messages to the system logging with a custom tag, while you can combine `date` with redirection to create timestamped logs.

🧠 What is the purpose of the `|&` operator in Bash? 🔴

📝 A) Redirect both stdout and stderr
⚙️ B) Create a bidirectional pipe
🔧 C) Redirect only stderr
🐳 D) Combine multiple pipes

💡 The `|&` operator redirects both standard output and error through a pipe, equivalent to `2>&1 |` but more concise.

🤔 What Bash command allows you to create a configuration file with default values? 🔴

📝 A) `cat > config << EOF`
⚙️ B) `echo "default" > config`
🔧 C) `printf "%s\n" "default" > config`
🐳 D) `tee config <<< "default"`

💡 `cat > config << EOF` (here-document) allows you to create files with multiline content efficiently, ideal for configuration files.

🔍 What is the purpose of the `trap` function in Bash? 🔴

📝 A) Capture signals and execute commands
⚙️ B) Create traps for debugging
🔧 C) Manage temporary files
🐳 D) Control execution flow

💡 `trap` allows you to capture system signals (like SIGINT, SIGTERM) and execute specific commands when they occur, useful for cleanup and error handling.

❓ What Bash command allows you to create an incremental backup file? 🔴

📝 A) `rsync -av --backup-dir`
⚙️ B) `cp -r --backup`
🔧 C) `tar -czf --newer`
🐳 D) `dd if= of=`

💡 `rsync -av --backup-dir` creates efficient incremental backups, copying only modified files and organizing them in separate backup directories.

🧠 What is the purpose of the `&>` operator in Bash? 🔴

📝 A) Redirect stdout and stderr to a file
⚙️ B) Execute commands in background
🔧 C) Redirect only stderr
🐳 D) Create a bidirectional pipe

💡 `&>` redirects both standard output and error to a file, more concise than `> file 2>&1`.

🤔 What Bash command allows you to create a rotating log file? 🔴

📝 A) `logrotate -f`
⚙️ B) `tail -f`
🔧 C) `tee -a`
🐳 D) `logger -p`

💡 `logrotate -f` forces log rotation according to predefined configurations, while you can implement manual rotation with `mv` and compression.

🔍 What is the purpose of the `$SECONDS` variable in Bash? 🔴

📝 A) Count seconds since script start
⚙️ B) Store current timestamp
🔧 C) Control command timeouts
🐳 D) Manage timers

💡 `$SECONDS` automatically counts seconds elapsed since script start, useful for measuring execution times and implementing timeouts.

❓ What Bash command allows you to create a configuration file with expanded variables? 🔴

📝 A) `envsubst < template > config`
⚙️ B) `sed 's/VAR/val/g' template > config`
🔧 C) `awk '{gsub(/VAR/, "val")}1' template > config`
🐳 D) `cat template | tr 'VAR' 'val' > config`

💡 `envsubst` expands environment variables in templates, replacing `${VAR}` with actual values, ideal for generating dynamic configuration files.

🧠 What is the purpose of the `<>` operator in Bash? 🔴

📝 A) Open file for reading and writing
⚙️ B) Create file if it doesn't exist
🔧 C) Open file in append mode
🐳 D) Create a symbolic link

💡 `<>` opens a file for both reading and writing simultaneously, useful for operations that require bidirectional access to the same file descriptor.

🤔 What Bash command allows you to create a backup file with compression? 🔴

📝 A) `tar -czf backup.tar.gz dir/`
⚙️ B) `zip -r backup.zip dir/`
🔧 C) `7z a backup.7z dir/`
🐳 D) `gzip -r dir/`

💡 `tar -czf` creates compressed files with gzip, combining multiple files into a single compressed tar file, ideal for backups.

🔍 What is the purpose of the `wait` function in Bash? 🔴

📝 A) Wait for background processes to finish
⚙️ B) Pause script execution
🔧 C) Synchronize files
🐳 D) Control execution flow

💡 `wait` waits for all background processes to finish before continuing, useful for synchronizing parallel operations and collecting exit codes.

❓ What Bash command allows you to create a configuration file with validation? 🔴

📝 A) `bash -n script.sh`
⚙️ B) `shellcheck script.sh`
🔧 C) `bash -v script.sh`
🐳 D) `set -euo pipefail`

💡 `bash -n` validates script syntax without executing it, while `shellcheck` provides more advanced static analysis to detect common issues.

🧠 What is the purpose of the `|` operator combined with `tee` in Bash? 🔴

📝 A) Display output on screen and save to file
⚙️ B) Create a bidirectional pipe
🔧 C) Redirect only stderr
🐳 D) Combine multiple streams

💡 `command | tee file` displays output on screen and simultaneously saves it to a file, useful for logging and debugging without losing visibility.

🤔 What Bash command allows you to create a backup file with verification? 🔴

📝 A) `rsync -av --checksum`
⚙️ B) `cp -v --preserve=all`
🔧 C) `tar -czf --verify`
🐳 D) `dd if= of= conv=sync`

💡 `rsync -av --checksum` verifies the integrity of copied files by comparing checksums, ensuring backups are identical to originals.

🔍 What is the purpose of the `$RANDOM` variable in Bash? 🔴

📝 A) Generate random numbers between 0-32767
⚙️ B) Store seed for random generator
🔧 C) Control command randomness
🐳 D) Manage process IDs

💡 `$RANDOM` generates pseudo-random numbers between 0 and 32767 each time accessed, useful for scripts requiring randomness or random selection.

🔴
