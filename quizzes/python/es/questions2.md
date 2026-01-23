# 🐍 Python para Automatización - Cuestionario 2

## Preguntas

### 1. 🔧 ¿Cómo creas un decorador en Python? 🔴

A) 🔧 `def decorator(func): def wrapper(): return func(); return wrapper`

B) 🌐 `@decorator def function(): pass`

C) 📦 `decorator = lambda x: x`

D) 🎯 `create_decorator(function)`

**Respuesta correcta**: A) 🔧 `def decorator(func): def wrapper(): return func(); return wrapper`

> 💡 Los decoradores envuelven funciones para modificar su comportamiento. ¡Como añadir superpoderes a funciones existentes! Usa la sintaxis `@decorator` para aplicarlos.

### 2. 🗄️ ¿Cómo te conectas a una base de datos en Python? 🔴

A) 🗄️ `import sqlite3; conn = sqlite3.connect('db.sqlite')`

B) 🔧 `import database; db = database.connect()`

C) 📦 `db = Database('sqlite')`

D) 🌐 `connect_db('sqlite')`

**Respuesta correcta**: A) 🗄️ `import sqlite3; conn = sqlite3.connect('db.sqlite')`

> 📘 sqlite3 viene integrado para SQLite. Para otras bases de datos: `psycopg2` (PostgreSQL), `mysql-connector-python` (MySQL), `pyodbc` (SQL Server).

### 3. 🌐 ¿Cómo haces una API con Flask? 🔴

A) 🌐 `from flask import Flask; app = Flask(__name__); @app.route('/api')`

B) 🔧 `import api; api.create('/endpoint')`

C) 📦 `from web import create_api`

D) 🎯 `api = API(); api.route('/path')`

**Respuesta correcta**: A) 🌐 `from flask import Flask; app = Flask(__name__); @app.route('/api')`

> ⚡ Flask hace que crear APIs sea simple. Usa decoradores para definir rutas: `@app.route('/users', methods=['GET', 'POST'])`.

### 4. 📊 ¿Cómo trabajas con análisis de datos en Python? 🔴

A) 📊 `import pandas as pd; df = pd.read_csv('data.csv')`

B) 🔧 `import data; data.analyze('file.csv')`

C) 📦 `from analysis import load_data`

D) 🌐 `data = DataAnalysis('file.csv')`

**Respuesta correcta**: A) 📊 `import pandas as pd; df = pd.read_csv('data.csv')`

> 💡 Pandas es el rey del análisis de datos en Python. ¡Úsalo con numpy y matplotlib para un toolkit completo de ciencia de datos!

### 5. 🔄 ¿Cómo manejas operaciones asíncronas en Python? 🔴

A) 🔄 `import asyncio; async def main(): await some_function()`

B) 🔧 `import threading; thread.start()`

C) 📦 `async_run(function)`

D) 🌐 `background_task(function)`

**Respuesta correcta**: A) 🔄 `import asyncio; async def main(): await some_function()`

> 🎯 Async/await hace la programación concurrente más fácil. ¡Perfecto para operaciones I/O como llamadas API y operaciones de archivo!

### 6. 🧪 ¿Cómo escribes tests unitarios con pytest? 🔴

A) 🧪 `def test_function(): assert result == expected`

B) 🔧 `import unittest; class Test(unittest.TestCase):`

C) 📦 `test(function, expected)`

D) 🌐 `pytest.test(function)`

**Respuesta correcta**: A) 🧪 `def test_function(): assert result == expected`

> 📘 pytest es más simple que unittest. Solo prefija funciones con `test_` y usa `assert`. ¡Ejecuta con el comando `pytest`!

### 7. 🔧 ¿Cómo usas list comprehensions? 🟡

A) 🔧 `[x * 2 for x in range(10) if x % 2 == 0]`

B) 🌐 `list.comprehension(x * 2, range(10))`

C) 📦 `comprehend([x * 2 for x in range(10)])`

D) 🎯 `list_comp(lambda x: x * 2, range(10))`

**Respuesta correcta**: A) 🔧 `[x * 2 for x in range(10) if x % 2 == 0]`

> ⚡ Las list comprehensions son pythónicas y rápidas. ¡Más concisas que los loops for para crear listas!

### 8. 📦 ¿Cómo trabajas con expresiones regulares? 🟡

A) 📦 `import re; pattern = re.compile(r'\d+'); matches = pattern.findall(text)`

B) 🔧 `import regex; regex.find('\d+', text)`

C) 🌐 `from regexp import search`

D) 🎯 `regex_search('\d+', text)`

**Respuesta correcta**: A) 📦 `import re; pattern = re.compile(r'\d+'); matches = pattern.findall(text)`

> 💡 El módulo `re` maneja expresiones regulares. ¡Usa raw strings (`r''`) para patrones regex para evitar problemas de escape!

### 9. 🔒 ¿Cómo manejas configuración y secretos? 🔴

A) 🔒 `import os; password = os.getenv('DB_PASSWORD'); from configparser import ConfigParser`

B) 🔧 `config = load_config('settings.ini')`

C) 📦 `import secrets; secret = secrets.get('password')`

D) 🌐 `from config import get_setting`

**Respuesta correcta**: A) 🔒 `import os; password = os.getenv('DB_PASSWORD'); from configparser import ConfigParser`

> 🛡️ ¡Nunca hardcodees secretos! Usa variables de entorno para secretos y archivos de configuración para ajustes. ¡La seguridad es primero!

### 10. 🌐 ¿Cómo haces peticiones HTTP concurrentes? 🔴

A) 🌐 `import asyncio, aiohttp; async with aiohttp.ClientSession() as session:`

B) 🔧 `import requests; requests.async_get(urls)`

C) 📦 `from concurrent import http_requests`

D) 🎯 `parallel_requests(urls)`

**Respuesta correcta**: A) 🌐 `import asyncio, aiohttp; async with aiohttp.ClientSession() as session:`

> ⚡ aiohttp + asyncio para peticiones concurrentes. ¡Mucho más rápido que peticiones secuenciales para múltiples APIs!

### 11. 📊 ¿Cómo perfilas el rendimiento del código Python? 🔴

A) 📊 `import cProfile; cProfile.run('function()')`

B) 🔧 `import profiler; profiler.run(function)`

C) 📦 `from performance import profile`

D) 🌐 `profile_code(function)`

**Respuesta correcta**: A) 📊 `import cProfile; cProfile.run('function()')`

> 🔍 cProfile muestra dónde tu código gasta tiempo. ¡También prueba `python -m cProfile script.py` para profiling desde línea de comandos!

### 12. 🗂️ ¿Cómo trabajas con rutas de archivos apropiadamente? 🟡

A) 🗂️ `from pathlib import Path; path = Path('folder') / 'file.txt'`

B) 🔧 `import os; path = os.path.join('folder', 'file.txt')`

C) 📦 `path = 'folder/file.txt'`

D) 🌐 `filepath('folder', 'file.txt')`

**Respuesta correcta**: A) 🗂️ `from pathlib import Path; path = Path('folder') / 'file.txt'`

> 💡 pathlib es moderno y multiplataforma. Funciona en Windows, Mac, Linux. ¡Mucho mejor que concatenación de strings!

### 13. 🔄 ¿Cómo manejas streaming de datos? 🔴

A) 🔄 `def read_large_file(file): for line in file: yield line.strip()`

B) 🔧 `stream = open('file.txt').stream()`

C) 📦 `for chunk in file.chunks():`

D) 🌐 `stream_data('file.txt')`

**Respuesta correcta**: A) 🔄 `def read_large_file(file): for line in file: yield line.strip()`

> 📘 Los generadores y `yield` permiten procesar archivos grandes sin cargar todo en memoria. ¡Eficiente en memoria!

### 14. 🐳 ¿Cómo containerizas una app Python? 🔴

A) 🐳 `FROM python:3.9; COPY . /app; WORKDIR /app; RUN pip install -r requirements.txt`

B) 🔧 `docker create python app.py`

C) 📦 `containerize('python_app')`

D) 🌐 `from docker import container`

**Respuesta correcta**: A) 🐳 `FROM python:3.9; COPY . /app; WORKDIR /app; RUN pip install -r requirements.txt`

> 🚀 El Dockerfile define cómo construir tu contenedor. ¡Incluye imagen base, dependencias y comando de inicio!

### 15. 🔧 ¿Cómo usas context managers en Python? 🔴

A) 🔧 `with open('file.txt') as f: content = f.read()`

B) 🌐 `context = ContextManager(); context.use()`

C) 📦 `manage_context(open, 'file.txt')`

D) 🎯 `using(open('file.txt')) as f:`

**Respuesta correcta**: A) 🔧 `with open('file.txt') as f: content = f.read()`

> ⚡ Los context managers aseguran limpieza apropiada de recursos. ¡Usa declaración `with` para archivos, conexiones de BD, locks, etc.!

### 16. 📊 ¿Cómo trabajas con APIs y JSON? 🟡

A) 📊 `response = requests.get('api/users'); data = response.json(); users = data['users']`

B) 🔧 `api_data = get_json('api/users')`

C) 📦 `from api import fetch_users`

D) 🌐 `users = API('users').get()`

**Respuesta correcta**: A) 📊 `response = requests.get('api/users'); data = response.json(); users = data['users']`

> 💡 requests + método json() hace el consumo de APIs fácil. ¡Siempre verifica `response.status_code` para manejo de errores!

### 17. 🔍 ¿Cómo debuggeas problemas de producción? 🔴

A) 🔍 `import logging; logging.exception('Error occurred'); import traceback; traceback.print_exc()`

B) 🔧 `print('Debug:', variable)`

C) 📦 `debug(error)`

D) 🌐 `console.log(error)`

**Respuesta correcta**: A) 🔍 `import logging; logging.exception('Error occurred'); import traceback; traceback.print_exc()`

> 🔧 Usa logging en lugar de print. logging.exception() captura stack traces. ¡Esencial para debugging de producción!

### 18. 🛠️ ¿Cómo creas herramientas de línea de comandos? 🔴

A) 🛠️ `import argparse; parser = argparse.ArgumentParser(); parser.add_argument('--input')`

B) 🔧 `import sys; args = sys.argv`

C) 📦 `from cli import create_command`

D) 🌐 `command_line(args)`

**Respuesta correcta**: A) 🛠️ `import argparse; parser = argparse.ArgumentParser(); parser.add_argument('--input')`

> 🎯 argparse crea CLIs profesionales con ayuda, validación y conversión de tipos. ¡Mucho mejor que parsear sys.argv manualmente!

### 19. 📈 ¿Cómo optimizas el rendimiento de Python? 🔴

A) 📈 `Usa NumPy para números, list comprehensions, evita variables globales, cachea resultados`

B) 🔧 `Solo usa librerías compiladas`

C) 📦 `Convierte todo a C++`

D) 🌐 `Usa solo funciones built-in`

**Respuesta correcta**: A) 📈 `Usa NumPy para números, list comprehensions, evita variables globales, cachea resultados`

> ⚡ Tips de rendimiento: NumPy para matemáticas, functools.lru_cache para memoización, perfila antes de optimizar, usa estructuras de datos apropiadas!

### 20. 🔒 ¿Cómo implementas manejo apropiado de errores? 🔴

A) 🔒 `try: risky_operation() except SpecificError as e: log_error(e); handle_gracefully()`

B) 🔧 `try: everything() except: pass`

C) 📦 `if not error: continue`

D) 🌐 `handle_all_errors(function)`

**Respuesta correcta**: A) 🔒 `try: risky_operation() except SpecificError as e: log_error(e); handle_gracefully()`

> 📘 Captura excepciones específicas, registra errores, maneja elegantemente. ¡Nunca uses `except:` desnudo - oculta bugs y hace el debugging imposible!

### 21. 🎯 ¿Cuáles son las mejores prácticas de automatización Python? 🔴

A) 🎯 `Usa entornos virtuales, type hints, logging, tests, CI/CD, documentación`

B) 🔧 `Escribe todo en un archivo`

C) 📦 `Usa solo variables globales`

D) 🌐 `Evita todas las librerías externas`

**Respuesta correcta**: A) 🎯 `Usa entornos virtuales, type hints, logging, tests, CI/CD, documentación`

> 🏆 Python profesional: venv para aislamiento, mypy para type checking, pytest para testing, black para formateo, y documentación comprensiva! 