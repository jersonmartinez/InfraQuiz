# 🐍 Python Automation - Questions 1

## Questions

### ❓ What's the best way to read a file in Python for automation? 🟢

📝 `with open('file.txt', 'r') as f: content = f.read()`
🔄 `file = open('file.txt'); content = file.read()`
📦 `content = read_file('file.txt')`
🎯 `import file; content = file.read('file.txt')`

**Correct Answer:**
📝 `with open('file.txt', 'r') as f: content = f.read()`

**Explanation:**
💡 The `with` statement automatically handles file closing, even if exceptions occur. This is the Pythonic way and prevents resource leaks! 🎯

---

### 🧠 How do you check if a file exists in Python? 🟢

📝 `import os; os.path.exists('file.txt')`
🔄 `import file; file.exists('file.txt')`
📦 `exists('file.txt')`
🎯 `check_file('file.txt')`

**Correct Answer:**
📝 `import os; os.path.exists('file.txt')`

**Explanation:**
🔍 `os.path.exists()` is the standard way to check file existence. Returns `True` if exists, `False` if not. Simple but crucial for automation! 🎯

---

### 💭 What's the correct way to handle command line arguments? 🟢

📝 `import sys; args = sys.argv[1:]`
🔄 `import argparse; parser = argparse.ArgumentParser()`
📦 `args = get_args()`
🎯 `import cli; args = cli.get_arguments()`

**Correct Answer:**
📝 `import sys; args = sys.argv[1:]`

**Explanation:**
⚡ `sys.argv[1:]` gives you all arguments except the script name. Perfect for simple scripts. For complex CLIs use `argparse`! 🎯

---

### 🤔 How do you make an HTTP request in Python? 🟡

📝 `import requests; response = requests.get('url')`
🔄 `import urllib; response = urllib.request.urlopen('url')`
📦 `import http; response = http.get('url')`
🎯 `import web; response = web.get('url')`

**Correct Answer:**
📝 `import requests; response = requests.get('url')`

**Explanation:**
💡 The `requests` library is the de facto standard for HTTP requests. Simple, readable and handles most cases automatically. Much better than urllib! 🎯

---

### 🔧 What's the best way to handle JSON data? 🟡

📝 `import json; data = json.loads(json_string)`
🔄 `import yaml; data = yaml.load(json_string)`
📦 `data = parse_json(json_string)`
🎯 `import parser; data = parser.json(json_string)`

**Correct Answer:**
📝 `import json; data = json.loads(json_string)`

**Explanation:**
🩺 `json.loads()` parses JSON strings to Python objects. Use `json.dumps()` to convert Python objects to JSON. The native module handles all complexity! 🎯

---

### ⚙️ How do you execute a shell command and capture its output? 🟡

📝 `import subprocess; result = subprocess.run(['cmd'], capture_output=True)`
🔄 `import os; result = os.system('cmd')`
📦 `result = run_command('cmd')`
🎯 `import shell; result = shell.run('cmd')`

**Correct Answer:**
📝 `import subprocess; result = subprocess.run(['cmd'], capture_output=True)`

**Explanation:**
🔧 `subprocess.run()` is the modern way to execute commands. `capture_output=True` captures stdout and stderr. Much safer than `os.system()`! 🎯

---

### 🔍 What's the best practice for handling sensitive data? 🔴

📝 `import os; password = os.environ.get('PASSWORD')`
🔄 `password = input('Enter password: ')`
📦 `password = 'hardcoded_password'`
🎯 `import config; password = config.password`

**Correct Answer:**
📝 `import os; password = os.environ.get('PASSWORD')`

**Explanation:**
🩺 Environment variables are the secure way to handle secrets. Never hardcode passwords or use input() in automation scripts. Use .env files or secret managers! 🎯

---

### 🚀 How do you create proper logging configuration? 🔴

📝 `import logging; logging.basicConfig(level=logging.INFO)`
🔄 `print('INFO: message')`
📦 `import log; log.info('message')`
🎯 `logging.info('message')`

**Correct Answer:**
📝 `import logging; logging.basicConfig(level=logging.INFO)`

**Explanation:**
💡 `logging.basicConfig()` sets up proper logging with timestamps, levels and formatting. Much better than prints for production automation! 🎯

---

### 🔧 What's the most efficient way to process large files? 🟡

📝 `with open('file.txt') as f: for line in f: process(line)`
🔄 `content = open('file.txt').read(); for line in content.splitlines():`
📦 `lines = open('file.txt').readlines(); for line in lines:`
🎯 `import pandas; df = pandas.read_csv('file.txt')`

**Correct Answer:**
📝 `with open('file.txt') as f: for line in f: process(line)`

**Explanation:**
⚡ Iterating directly over the file object reads line by line without loading everything into memory. Perfect for files that don't fit in RAM! 🎯

---

### ❓ How do you define a function in Python? 🟢

📝 `def my_function(parameter):`
🔄 `function my_function(parameter):`
📦 `func my_function(parameter):`
🎯 `define my_function(parameter):`

**Correct Answer:**
📝 `def my_function(parameter):`

**Explanation:**
💡 The `def` keyword defines functions in Python. Followed by name, parameters in parentheses and colon. Fundamental Python syntax! 🎯

---

### 🧠 Which data structure is immutable in Python? 🟢

📝 `tuple = (1, 2, 3)`
🔄 `list = [1, 2, 3]`
📦 `dictionary = {1: 2, 3: 4}`
🎯 `set = {1, 2, 3}`

**Correct Answer:**
📝 `tuple = (1, 2, 3)`

**Explanation:**
🔍 Tuples are immutable - you can't change their elements after creation. Lists, dictionaries and sets are mutable. Useful for data that shouldn't change! 🎯

---

### 💭 How do you import only a specific function from a module? 🟢

📝 `from module import function`
🔄 `import module.function`
📦 `import function from module`
🎯 `use module.function`

**Correct Answer:**
📝 `from module import function`

**Explanation:**
⚡ `from module import function` imports only the specific function. You can use it directly without prefix. Keeps namespace clean! 🎯

---

### 🤔 What's the correct way to handle exceptions? 🟡

📝 `try: code() except Exception as e: handle(e)`
🔄 `if error: handle_error()`
📦 `catch Exception: handle()`
🎯 `on error: handle()`

**Correct Answer:**
📝 `try: code() except Exception as e: handle(e)`

**Explanation:**
💡 The try-except block is the standard way to handle exceptions. Catch specific exceptions when possible. Avoid empty except blocks! 🎯

---

### 🔧 How do you create a list comprehension? 🟡

📝 `[x*2 for x in range(10)]`
🔄 `list(x*2 for x in range(10))`
📦 `for x in range(10): list.append(x*2)`
🎯 `map(lambda x: x*2, range(10))`

**Correct Answer:**
📝 `[x*2 for x in range(10)]`

**Explanation:**
🩺 List comprehensions are the Pythonic way to create lists. More readable and efficient than traditional loops. One powerful line! 🎯

---

### ⚙️ How do you work with dates and times? 🟡

📝 `from datetime import datetime; now = datetime.now()`
🔄 `import time; now = time.now()`
📦 `import date; now = date.today()`
🎯 `from calendar import now; now = now()`

**Correct Answer:**
📝 `from datetime import datetime; now = datetime.now()`

**Explanation:**
🔧 The `datetime` module is the standard for working with dates and times. `datetime.now()` returns current date and time. Essential for logs and timestamps! 🎯

---

### 🔍 What's the correct way to work with file paths? 🔴

📝 `from pathlib import Path; path = Path('dir') / 'file.txt'`
🔄 `path = 'dir' + '/' + 'file.txt'`
📦 `import os; path = os.join('dir', 'file.txt')`
🎯 `path = 'dir\\file.txt'`

**Correct Answer:**
📝 `from pathlib import Path; path = Path('dir') / 'file.txt'`

**Explanation:**
🩺 `pathlib` is the modern and cross-platform way to handle paths. The `/` operator joins paths correctly on any OS. Goodbye backslash problems! 🎯

---

### 🚀 How do you create a simple decorator? 🔴

📝 `def decorator(func): def wrapper(*args): return func(*args)`
🔄 `@decorator def function():`
📦 `decorator = lambda func: func`
🎯 `def decorator: return function`

**Correct Answer:**
📝 `def decorator(func): def wrapper(*args): return func(*args)`

**Explanation:**
💡 A decorator is a function that takes another function and returns a modified version. The wrapper function wraps the original. Powerful Python pattern! 🎯

---

### 🔧 How do you handle multiple return values? 🔴

📝 `def function(): return value1, value2`
🔄 `def function(): return [value1, value2]`
📦 `def function(): return {value1, value2}`
🎯 `def function(): yield value1; yield value2`

**Correct Answer:**
📝 `def function(): return value1, value2`

**Explanation:**
⚡ Python allows returning multiple values as a tuple. Unpack with `a, b = function()`. Cleaner than using lists or dictionaries! 🎯

---

### ❓ What method lists all files in a directory? 🟢

📝 `import os; files = os.listdir('directory')`
🔄 `import dir; files = dir.list('directory')`
📦 `files = list_files('directory')`
🎯 `import files; files = files.all('directory')`

**Correct Answer:**
📝 `import os; files = os.listdir('directory')`

**Explanation:**
💡 `os.listdir()` returns a list with all files and directories. For more control use `os.walk()` or `pathlib`. Basic for file automation! 🎯

---

### 🧠 How do you convert a string to lowercase? 🟢

📝 `text.lower()`
🔄 `text.lowercase()`
📦 `lower(text)`
🎯 `text.toLower()`

**Correct Answer:**
📝 `text.lower()`

**Explanation:**
🔍 The `lower()` method converts all letters to lowercase. Also exists `upper()` for uppercase and `title()` for title case. Essential string methods! 🎯

---

### 💭 What's the correct way to concatenate strings? 🟢

📝 `result = f"{string1} {string2}"`
🔄 `result = string1 + " " + string2`
📦 `result = concat(string1, string2)`
🎯 `result = string1.append(string2)`

**Correct Answer:**
📝 `result = f"{string1} {string2}"`

**Explanation:**
⚡ F-strings (formatted strings) are the modern and efficient way to concatenate. More readable than `+` and faster. Python 3.6+ only! 🎯

