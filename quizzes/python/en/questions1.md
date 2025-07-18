# 🐍 Python Automation - Questions 1

## Questions

### 1. ❓ What's the best way to read a file in Python for automation? 🟢

A) 📝 `with open('file.txt', 'r') as f: content = f.read()`

B) 🔄 `file = open('file.txt'); content = file.read()`

C) 📦 `content = read_file('file.txt')`

D) 🎯 `import file; content = file.read('file.txt')`

**Correct Answer**: A) 📝 `with open('file.txt', 'r') as f: content = f.read()`

> 💡 The `with` statement automatically handles file closing, even if exceptions occur. This is the Pythonic way and prevents resource leaks! 🎯

### 2. 🧠 How do you check if a file exists in Python? 🟢

A) 📝 `import os; os.path.exists('file.txt')`

B) 🔄 `import file; file.exists('file.txt')`

C) 📦 `exists('file.txt')`

D) 🎯 `check_file('file.txt')`

**Correct Answer**: A) 📝 `import os; os.path.exists('file.txt')`

> 🔍 `os.path.exists()` is the standard way to check file existence. Returns `True` if exists, `False` if not. Simple but crucial for automation! 🎯

### 3. 💭 What's the correct way to handle command line arguments? 🟢

A) 📝 `import sys; args = sys.argv[1:]`

B) 🔄 `import argparse; parser = argparse.ArgumentParser()`

C) 📦 `args = get_args()`

D) 🎯 `import cli; args = cli.get_arguments()`

**Correct Answer**: A) 📝 `import sys; args = sys.argv[1:]`

> ⚡ `sys.argv[1:]` gives you all arguments except the script name. Perfect for simple scripts. For complex CLIs use `argparse`! 🎯

### 4. 🤔 How do you make an HTTP request in Python? 🟡

A) 📝 `import requests; response = requests.get('url')`

B) 🔄 `import urllib; response = urllib.request.urlopen('url')`

C) 📦 `import http; response = http.get('url')`

D) 🎯 `import web; response = web.get('url')`

**Correct Answer**: A) 📝 `import requests; response = requests.get('url')`

> 💡 The `requests` library is the simplest and most elegant way for HTTP. Easier than urllib with a better API!

### 5. 🔧 How do you execute a system command in Python? 🟡

A) 📝 `import subprocess; subprocess.run(['command', 'arg'])`

B) 🔄 `import os; os.system('command arg')`

C) 📦 `exec('command arg')`

D) 🎯 `run_command('command arg')`

**Correct Answer**: A) 📝 `import subprocess; subprocess.run(['command', 'arg'])`

> 🔄 `subprocess.run()` is safer than `os.system()`. It handles separate arguments and better controls input/output. Prevents command injection!

### 6. 🎯 How do you parse JSON in Python? 🟢

A) 📝 `import json; data = json.loads(json_string)`

B) 🔄 `import yaml; data = yaml.parse(json_string)`

C) 📦 `data = parse_json(json_string)`

D) 🎯 `data = JSON.parse(json_string)`

**Correct Answer**: A) 📝 `import json; data = json.loads(json_string)`

> 📊 `json.loads()` converts JSON string to Python dict. `json.dumps()` does the opposite. Essential for APIs and configurations!

### 7. 🚀 How do you handle exceptions in Python? 🟢

A) 📝 `try: code except Exception as e: handle`

B) 🔄 `catch (Exception e) { handle }`

C) 📦 `handle error: manage`

D) 🎯 `on_error: handle`

**Correct Answer**: A) 📝 `try: code except Exception as e: handle`

> ⚡ Python uses `try/except` to handle errors. Always specify the exception type when possible!

### 8. 🔍 How do you iterate over files in a directory? 🟡

A) 📝 `import os; for file in os.listdir('dir'): print(file)`

B) 🔄 `import glob; for file in glob.glob('dir/*'): print(file)`

C) 📦 `for file in directory('dir'): print(file)`

D) 🎯 `import pathlib; for file in Path('dir').iterdir(): print(file)`

**Correct Answer**: A) 📝 `import os; for file in os.listdir('dir'): print(file)`

> 💡 `os.listdir()` is the simplest way. For complex patterns use `glob`. For modern Python, use `pathlib`!

### 9. 🎯 How do you read environment variables? 🟡

A) 📝 `import os; value = os.getenv('VARIABLE', 'default')`

B) 🔄 `import env; value = env.get('VARIABLE')`

C) 📦 `value = getenv('VARIABLE')`

D) 🎯 `value = environment['VARIABLE']`

**Correct Answer**: A) 📝 `import os; value = os.getenv('VARIABLE', 'default')`

> 🔧 `os.getenv()` is safe because you can define a default value. Avoids errors if the variable doesn't exist!

### 10. 🔄 How do you work with dates in Python? 🟡

A) 📝 `from datetime import datetime; now = datetime.now()`

B) 🔄 `import time; now = time.now()`

C) 📦 `import date; now = date.current()`

D) 🎯 `now = Date.now()`

**Correct Answer**: A) 📝 `from datetime import datetime; now = datetime.now()`

> 📅 The `datetime` module is the standard for dates and times. More powerful than `time` for most cases!

### 11. 🚀 How do you create an executable Python script? 🟡

A) 📝 `#!/usr/bin/env python3` at the beginning of the file

B) 🔄 `#!python` at the beginning of the file

C) 📦 `chmod +x script.py`

D) 🎯 `python -m script`

**Correct Answer**: A) 📝 `#!/usr/bin/env python3` at the beginning of the file

> ⚡ The shebang `#!/usr/bin/env python3` allows running the script directly. Don't forget `chmod +x` too!

### 12. 🔧 How do you install dependencies in Python? 🟢

A) 📝 `pip install package`

B) 🔄 `python install package`

C) 📦 `apt install python-package`

D) 🎯 `npm install package`

**Correct Answer**: A) 📝 `pip install package`

> 📦 `pip` is Python's standard package manager. Use `requirements.txt` for projects!

### 13. 🎯 How do you create a virtual environment? 🟡

A) 📝 `python -m venv env`

B) 🔄 `virtualenv create env`

C) 📦 `python --venv env`

D) 🎯 `create-env env`

**Correct Answer**: A) 📝 `python -m venv env`

> 🔒 Virtual environments isolate dependencies per project. Always use one to avoid conflicts!

### 14. 🔍 How do you debug Python code? 🟡

A) 📝 `import pdb; pdb.set_trace()`

B) 🔄 `console.log(variable)`

C) 📦 `debug(variable)`

D) 🎯 `print_debug(variable)`

**Correct Answer**: A) 📝 `import pdb; pdb.set_trace()`

> 🐛 `pdb` is Python's built-in debugger. You can also use `breakpoint()` in Python 3.7+!

### 15. 🚀 How do you write tests in Python? 🟡

A) 📝 `import unittest; class TestCase(unittest.TestCase):`

B) 🔄 `import pytest; def test_function():`

C) 📦 `test_function() { assert(true) }`

D) 🎯 `import test; test.run()`

**Correct Answer**: A) 📝 `import unittest; class TestCase(unittest.TestCase):`

> 🧪 `unittest` comes included with Python. For something more modern use `pytest`. Tests are crucial for automation!

### 16. 🔧 How do you work with CSV in Python? 🟡

A) 📝 `import csv; with open('file.csv') as f: reader = csv.reader(f)`

B) 🔄 `import pandas; df = pandas.read_csv('file.csv')`

C) 📦 `data = read_csv('file.csv')`

D) 🎯 `import excel; data = excel.csv('file.csv')`

**Correct Answer**: A) 📝 `import csv; with open('file.csv') as f: reader = csv.reader(f)`

> 📊 The `csv` module is perfect for simple files. For complex analysis use `pandas`!

### 17. 🎯 How do you do logging in Python? 🟡

A) 📝 `import logging; logging.info('message')`

B) 🔄 `print('LOG: message')`

C) 📦 `log('message')`

D) 🎯 `console.log('message')`

**Correct Answer**: A) 📝 `import logging; logging.info('message')`

> 📝 `logging` is much better than `print()` for serious applications. Allows levels, files, and formatting!

### 18. 🔄 How do you work with databases in Python? 🔴

A) 📝 `import sqlite3; conn = sqlite3.connect('db.sqlite')`

B) 🔄 `import database; db = database.connect('db')`

C) 📦 `db = Database('sqlite://db.sqlite')`

D) 🎯 `import sql; conn = sql.connect('db')`

**Correct Answer**: A) 📝 `import sqlite3; conn = sqlite3.connect('db.sqlite')`

> 🗄️ `sqlite3` comes included for simple databases. For other databases use specific drivers like `psycopg2`, `mysql-connector-python`, etc.

### 19. 🚀 How do you do web scraping in Python? 🔴

A) 📝 `import requests, BeautifulSoup; soup = BeautifulSoup(response.text)`

B) 🔄 `import urllib, html; html.parse(response)`

C) 📦 `import web; data = web.scrape(url)`

D) 🎯 `import crawler; data = crawler.get(url)`

**Correct Answer**: A) 📝 `import requests, BeautifulSoup; soup = BeautifulSoup(response.text)`

> 🕷️ `requests` + `BeautifulSoup` is the classic combination. For JavaScript use `selenium` or `playwright`!

### 20. 🔧 How do you optimize Python scripts? 🔴

A) 📝 Use list comprehensions, avoid unnecessary loops, profile with `cProfile`

B) 🔄 Use only functions, avoid variables

C) 📦 Compile to C++

D) 🎯 Use only external libraries

**Correct Answer**: A) 📝 Use list comprehensions, avoid unnecessary loops, profile with `cProfile`

> ⚡ Python optimization: use native structures, avoid Python loops when possible, profile with `cProfile`, consider NumPy for numbers!

### 21. 🎯 What's the best practice for automation scripts? 🔴

A) 📝 Use logging, error handling, CLI arguments, documentation

B) 🔄 Do everything in one function

C) 📦 Use only global variables

D) 🎯 Avoid imports

**Correct Answer**: A) 📝 Use logging, error handling, CLI arguments, documentation

> 🎯 Production scripts need: detailed logging, robust error handling, friendly CLI, clear documentation, and tests. Quality is key!

