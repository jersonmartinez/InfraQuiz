# 🐍 Python Automation - Questions 2

## Questions

### 1. 🔧 How do you create a Python decorator? 🔴

A) 🔧 `def decorator(func): def wrapper(): return func(); return wrapper`

B) 🌐 `@decorator def function(): pass`

C) 📦 `decorator = lambda x: x`

D) 🎯 `create_decorator(function)`

**Correct Answer**: A) 🔧 `def decorator(func): def wrapper(): return func(); return wrapper`

> 💡 Decorators wrap functions to modify their behavior. Like adding superpowers to existing functions! Use `@decorator` syntax to apply them.

### 2. 🗄️ How do you connect to a database in Python? 🔴

A) 🗄️ `import sqlite3; conn = sqlite3.connect('db.sqlite')`

B) 🔧 `import database; db = database.connect()`

C) 📦 `db = Database('sqlite')`

D) 🌐 `connect_db('sqlite')`

**Correct Answer**: A) 🗄️ `import sqlite3; conn = sqlite3.connect('db.sqlite')`

> 📘 sqlite3 is built-in for SQLite. For other databases: `psycopg2` (PostgreSQL), `mysql-connector-python` (MySQL), `pyodbc` (SQL Server).

### 3. 🌐 How do you make an API with Flask? 🔴

A) 🌐 `from flask import Flask; app = Flask(__name__); @app.route('/api')`

B) 🔧 `import api; api.create('/endpoint')`

C) 📦 `from web import create_api`

D) 🎯 `api = API(); api.route('/path')`

**Correct Answer**: A) 🌐 `from flask import Flask; app = Flask(__name__); @app.route('/api')`

> ⚡ Flask makes creating APIs simple. Use decorators to define routes: `@app.route('/users', methods=['GET', 'POST'])`.

### 4. 📊 How do you work with data analysis in Python? 🔴

A) 📊 `import pandas as pd; df = pd.read_csv('data.csv')`

B) 🔧 `import data; data.analyze('file.csv')`

C) 📦 `from analysis import load_data`

D) 🌐 `data = DataAnalysis('file.csv')`

**Correct Answer**: A) 📊 `import pandas as pd; df = pd.read_csv('data.csv')`

> 💡 Pandas is the king of data analysis in Python. Use with numpy and matplotlib for complete data science toolkit!

### 5. 🔄 How do you handle async operations in Python? 🔴

A) 🔄 `import asyncio; async def main(): await some_function()`

B) 🔧 `import threading; thread.start()`

C) 📦 `async_run(function)`

D) 🌐 `background_task(function)`

**Correct Answer**: A) 🔄 `import asyncio; async def main(): await some_function()`

> 🎯 Async/await makes concurrent programming easier. Perfect for I/O operations like API calls and file operations!

### 6. 🧪 How do you write unit tests with pytest? 🔴

A) 🧪 `def test_function(): assert result == expected`

B) 🔧 `import unittest; class Test(unittest.TestCase):`

C) 📦 `test(function, expected)`

D) 🌐 `pytest.test(function)`

**Correct Answer**: A) 🧪 `def test_function(): assert result == expected`

> 📘 pytest is simpler than unittest. Just prefix functions with `test_` and use `assert`. Run with `pytest` command!

### 7. 🔧 How do you use list comprehensions? 🟡

A) 🔧 `[x * 2 for x in range(10) if x % 2 == 0]`

B) 🌐 `list.comprehension(x * 2, range(10))`

C) 📦 `comprehend([x * 2 for x in range(10)])`

D) 🎯 `list_comp(lambda x: x * 2, range(10))`

**Correct Answer**: A) 🔧 `[x * 2 for x in range(10) if x % 2 == 0]`

> ⚡ List comprehensions are Pythonic and fast. More concise than for loops for creating lists!

### 8. 📦 How do you work with regular expressions? 🟡

A) 📦 `import re; pattern = re.compile(r'\d+'); matches = pattern.findall(text)`

B) 🔧 `import regex; regex.find('\d+', text)`

C) 🌐 `from regexp import search`

D) 🎯 `regex_search('\d+', text)`

**Correct Answer**: A) 📦 `import re; pattern = re.compile(r'\d+'); matches = pattern.findall(text)`

> 💡 The `re` module handles regular expressions. Use raw strings (`r''`) for regex patterns to avoid escaping issues!

### 9. 🔒 How do you handle configuration and secrets? 🔴

A) 🔒 `import os; password = os.getenv('DB_PASSWORD'); from configparser import ConfigParser`

B) 🔧 `config = load_config('settings.ini')`

C) 📦 `import secrets; secret = secrets.get('password')`

D) 🌐 `from config import get_setting`

**Correct Answer**: A) 🔒 `import os; password = os.getenv('DB_PASSWORD'); from configparser import ConfigParser`

> 🛡️ Never hardcode secrets! Use environment variables for secrets and config files for settings. Security first!

### 10. 🌐 How do you make concurrent HTTP requests? 🔴

A) 🌐 `import asyncio, aiohttp; async with aiohttp.ClientSession() as session:`

B) 🔧 `import requests; requests.async_get(urls)`

C) 📦 `from concurrent import http_requests`

D) 🎯 `parallel_requests(urls)`

**Correct Answer**: A) 🌐 `import asyncio, aiohttp; async with aiohttp.ClientSession() as session:`

> ⚡ aiohttp + asyncio for concurrent requests. Much faster than sequential requests for multiple APIs!

### 11. 📊 How do you profile Python code performance? 🔴

A) 📊 `import cProfile; cProfile.run('function()')`

B) 🔧 `import profiler; profiler.run(function)`

C) 📦 `from performance import profile`

D) 🌐 `profile_code(function)`

**Correct Answer**: A) 📊 `import cProfile; cProfile.run('function()')`

> 🔍 cProfile shows where your code spends time. Also try `python -m cProfile script.py` for command line profiling!

### 12. 🗂️ How do you work with file paths properly? 🟡

A) 🗂️ `from pathlib import Path; path = Path('folder') / 'file.txt'`

B) 🔧 `import os; path = os.path.join('folder', 'file.txt')`

C) 📦 `path = 'folder/file.txt'`

D) 🌐 `filepath('folder', 'file.txt')`

**Correct Answer**: A) 🗂️ `from pathlib import Path; path = Path('folder') / 'file.txt'`

> 💡 pathlib is modern and cross-platform. Works on Windows, Mac, Linux. Much better than string concatenation!

### 13. 🔄 How do you handle data streaming? 🔴

A) 🔄 `def read_large_file(file): for line in file: yield line.strip()`

B) 🔧 `stream = open('file.txt').stream()`

C) 📦 `for chunk in file.chunks():`

D) 🌐 `stream_data('file.txt')`

**Correct Answer**: A) 🔄 `def read_large_file(file): for line in file: yield line.strip()`

> 📘 Generators and `yield` allow processing large files without loading everything into memory. Memory efficient!

### 14. 🐳 How do you containerize a Python app? 🔴

A) 🐳 `FROM python:3.9; COPY . /app; WORKDIR /app; RUN pip install -r requirements.txt`

B) 🔧 `docker create python app.py`

C) 📦 `containerize('python_app')`

D) 🌐 `from docker import container`

**Correct Answer**: A) 🐳 `FROM python:3.9; COPY . /app; WORKDIR /app; RUN pip install -r requirements.txt`

> 🚀 Dockerfile defines how to build your container. Include base image, dependencies, and startup command!

### 15. 🔧 How do you use Python context managers? 🔴

A) 🔧 `with open('file.txt') as f: content = f.read()`

B) 🌐 `context = ContextManager(); context.use()`

C) 📦 `manage_context(open, 'file.txt')`

D) 🎯 `using(open('file.txt')) as f:`

**Correct Answer**: A) 🔧 `with open('file.txt') as f: content = f.read()`

> ⚡ Context managers ensure proper resource cleanup. Use `with` statement for files, database connections, locks, etc.!

### 16. 📊 How do you work with APIs and JSON? 🟡

A) 📊 `response = requests.get('api/users'); data = response.json(); users = data['users']`

B) 🔧 `api_data = get_json('api/users')`

C) 📦 `from api import fetch_users`

D) 🌐 `users = API('users').get()`

**Correct Answer**: A) 📊 `response = requests.get('api/users'); data = response.json(); users = data['users']`

> 💡 requests + json() method makes API consumption easy. Always check `response.status_code` for error handling!

### 17. 🔍 How do you debug production issues? 🔴

A) 🔍 `import logging; logging.exception('Error occurred'); import traceback; traceback.print_exc()`

B) 🔧 `print('Debug:', variable)`

C) 📦 `debug(error)`

D) 🌐 `console.log(error)`

**Correct Answer**: A) 🔍 `import logging; logging.exception('Error occurred'); import traceback; traceback.print_exc()`

> 🔧 Use logging instead of print. logging.exception() captures stack traces. Essential for production debugging!

### 18. 🛠️ How do you create command-line tools? 🔴

A) 🛠️ `import argparse; parser = argparse.ArgumentParser(); parser.add_argument('--input')`

B) 🔧 `import sys; args = sys.argv`

C) 📦 `from cli import create_command`

D) 🌐 `command_line(args)`

**Correct Answer**: A) 🛠️ `import argparse; parser = argparse.ArgumentParser(); parser.add_argument('--input')`

> 🎯 argparse creates professional CLIs with help, validation, and type conversion. Much better than parsing sys.argv manually!

### 19. 📈 How do you optimize Python performance? 🔴

A) 📈 `Use NumPy for numbers, list comprehensions, avoid global variables, cache results`

B) 🔧 `Only use compiled libraries`

C) 📦 `Convert everything to C++`

D) 🌐 `Use only built-in functions`

**Correct Answer**: A) 📈 `Use NumPy for numbers, list comprehensions, avoid global variables, cache results`

> ⚡ Performance tips: NumPy for math, functools.lru_cache for memoization, profile before optimizing, use proper data structures!

### 20. 🔒 How do you implement proper error handling? 🔴

A) 🔒 `try: risky_operation() except SpecificError as e: log_error(e); handle_gracefully()`

B) 🔧 `try: everything() except: pass`

C) 📦 `if not error: continue`

D) 🌐 `handle_all_errors(function)`

**Correct Answer**: A) 🔒 `try: risky_operation() except SpecificError as e: log_error(e); handle_gracefully()`

> 📘 Catch specific exceptions, log errors, handle gracefully. Never use bare `except:` - it hides bugs and makes debugging impossible!

### 21. 🎯 What are Python automation best practices? 🔴

A) 🎯 `Use virtual environments, type hints, logging, tests, CI/CD, documentation`

B) 🔧 `Write everything in one file`

C) 📦 `Use only global variables`

D) 🌐 `Avoid all external libraries`

**Correct Answer**: A) 🎯 `Use virtual environments, type hints, logging, tests, CI/CD, documentation`

> 🏆 Professional Python: venv for isolation, mypy for type checking, pytest for testing, black for formatting, and comprehensive docs! 