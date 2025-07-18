# 🐍 Python para Automatización - Cuestionario 1

## Preguntas

### 1. ❓ ¿Cuál es la mejor forma de leer un archivo en Python para automatización? 🟢

A) 📝 `with open('archivo.txt', 'r') as f: contenido = f.read()`

B) 🔄 `archivo = open('archivo.txt'); contenido = archivo.read()`

C) 📦 `contenido = read_file('archivo.txt')`

D) 🎯 `import file; contenido = file.read('archivo.txt')`

**Respuesta correcta**: A) 📝 `with open('archivo.txt', 'r') as f: contenido = f.read()`

> 💡 La declaración `with` maneja automáticamente el cierre del archivo, incluso si ocurren excepciones. ¡Es la forma Pythonic y previene fugas de recursos! 🎯

### 2. 🧠 ¿Cómo verificas si un archivo existe en Python? 🟢

A) 📝 `import os; os.path.exists('archivo.txt')`

B) 🔄 `import file; file.exists('archivo.txt')`

C) 📦 `exists('archivo.txt')`

D) 🎯 `check_file('archivo.txt')`

**Respuesta correcta**: A) 📝 `import os; os.path.exists('archivo.txt')`

> 🔍 `os.path.exists()` es la forma estándar de verificar existencia de archivos. Retorna `True` si existe, `False` si no. ¡Simple pero crucial para automatización! 🎯

### 3. 💭 ¿Cuál es la forma correcta de manejar argumentos de línea de comandos? 🟢

A) 📝 `import sys; args = sys.argv[1:]`

B) 🔄 `import argparse; parser = argparse.ArgumentParser()`

C) 📦 `args = get_args()`

D) 🎯 `import cli; args = cli.get_arguments()`

**Respuesta correcta**: A) 📝 `import sys; args = sys.argv[1:]`

> ⚡ `sys.argv[1:]` te da todos los argumentos excepto el nombre del script. Para scripts simples es perfecto. ¡Para CLIs complejas usa `argparse`! 🎯

### 4. 🤔 ¿Cómo haces una petición HTTP en Python? 🟡

A) 📝 `import requests; respuesta = requests.get('url')`

B) 🔄 `import urllib; respuesta = urllib.request.urlopen('url')`

C) 📦 `import http; respuesta = http.get('url')`

D) 🎯 `import web; respuesta = web.get('url')`

**Respuesta correcta**: A) 📝 `import requests; respuesta = requests.get('url')`

> 💡 La librería `requests` es la forma más simple y elegante para HTTP. ¡Más fácil que urllib y con mejor API!

### 5. 🔧 ¿Cómo ejecutas un comando del sistema en Python? 🟡

A) 📝 `import subprocess; subprocess.run(['comando', 'arg'])`

B) 🔄 `import os; os.system('comando arg')`

C) 📦 `exec('comando arg')`

D) 🎯 `run_command('comando arg')`

**Respuesta correcta**: A) 📝 `import subprocess; subprocess.run(['comando', 'arg'])`

> 🔄 `subprocess.run()` es más seguro que `os.system()`. Maneja argumentos separados y controla mejor la entrada/salida. ¡Previene inyección de comandos!

### 6. 🎯 ¿Cómo parseas JSON en Python? 🟢

A) 📝 `import json; data = json.loads(json_string)`

B) 🔄 `import yaml; data = yaml.parse(json_string)`

C) 📦 `data = parse_json(json_string)`

D) 🎯 `data = JSON.parse(json_string)`

**Respuesta correcta**: A) 📝 `import json; data = json.loads(json_string)`

> 📊 `json.loads()` convierte string JSON a dict Python. `json.dumps()` hace lo contrario. ¡Esencial para APIs y configuraciones!

### 7. 🚀 ¿Cómo manejas excepciones en Python? 🟢

A) 📝 `try: código except Exception as e: manejo`

B) 🔄 `catch (Exception e) { manejo }`

C) 📦 `handle error: manejo`

D) 🎯 `on_error: manejo`

**Respuesta correcta**: A) 📝 `try: código except Exception as e: manejo`

> ⚡ Python usa `try/except` para manejar errores. ¡Siempre especifica el tipo de excepción cuando sea posible!

### 8. 🔍 ¿Cómo iteras sobre archivos en un directorio? 🟡

A) 📝 `import os; for file in os.listdir('dir'): print(file)`

B) 🔄 `import glob; for file in glob.glob('dir/*'): print(file)`

C) 📦 `for file in directory('dir'): print(file)`

D) 🎯 `import pathlib; for file in Path('dir').iterdir(): print(file)`

**Respuesta correcta**: A) 📝 `import os; for file in os.listdir('dir'): print(file)`

> 💡 `os.listdir()` es la forma más simple. Para patrones complejos usa `glob`. Para Python moderno, usa `pathlib`!

### 9. 🎯 ¿Cómo lees variables de entorno? 🟡

A) 📝 `import os; valor = os.getenv('VARIABLE', 'default')`

B) 🔄 `import env; valor = env.get('VARIABLE')`

C) 📦 `valor = getenv('VARIABLE')`

D) 🎯 `valor = environment['VARIABLE']`

**Respuesta correcta**: A) 📝 `import os; valor = os.getenv('VARIABLE', 'default')`

> 🔧 `os.getenv()` es seguro porque puedes definir un valor por defecto. ¡Evita errores si la variable no existe!

### 10. 🔄 ¿Cómo trabajas con fechas en Python? 🟡

A) 📝 `from datetime import datetime; now = datetime.now()`

B) 🔄 `import time; now = time.now()`

C) 📦 `import date; now = date.current()`

D) 🎯 `now = Date.now()`

**Respuesta correcta**: A) 📝 `from datetime import datetime; now = datetime.now()`

> 📅 El módulo `datetime` es el estándar para fechas y horas. ¡Más potente que `time` para la mayoría de casos!

### 11. 🚀 ¿Cómo creas un script ejecutable en Python? 🟡

A) 📝 `#!/usr/bin/env python3` al inicio del archivo

B) 🔄 `#!python` al inicio del archivo

C) 📦 `chmod +x script.py`

D) 🎯 `python -m script`

**Respuesta correcta**: A) 📝 `#!/usr/bin/env python3` al inicio del archivo

> ⚡ El shebang `#!/usr/bin/env python3` permite ejecutar el script directamente. ¡No olvides `chmod +x` también!

### 12. 🔧 ¿Cómo instalas dependencias en Python? 🟢

A) 📝 `pip install paquete`

B) 🔄 `python install paquete`

C) 📦 `apt install python-paquete`

D) 🎯 `npm install paquete`

**Respuesta correcta**: A) 📝 `pip install paquete`

> 📦 `pip` es el gestor de paquetes estándar de Python. ¡Usa `requirements.txt` para proyectos!

### 13. 🎯 ¿Cómo creas un entorno virtual? 🟡

A) 📝 `python -m venv env`

B) 🔄 `virtualenv create env`

C) 📦 `python --venv env`

D) 🎯 `create-env env`

**Respuesta correcta**: A) 📝 `python -m venv env`

> 🔒 Los entornos virtuales aíslan dependencias por proyecto. ¡Siempre usa uno para evitar conflictos!

### 14. 🔍 ¿Cómo debuggeas código Python? 🟡

A) 📝 `import pdb; pdb.set_trace()`

B) 🔄 `console.log(variable)`

C) 📦 `debug(variable)`

D) 🎯 `print_debug(variable)`

**Respuesta correcta**: A) 📝 `import pdb; pdb.set_trace()`

> 🐛 `pdb` es el debugger integrado de Python. ¡También puedes usar `breakpoint()` en Python 3.7+!

### 15. 🚀 ¿Cómo escribes tests en Python? 🟡

A) 📝 `import unittest; class TestCase(unittest.TestCase):`

B) 🔄 `import pytest; def test_function():`

C) 📦 `test_function() { assert(true) }`

D) 🎯 `import test; test.run()`

**Respuesta correcta**: A) 📝 `import unittest; class TestCase(unittest.TestCase):`

> 🧪 `unittest` viene incluido con Python. Para algo más moderno usa `pytest`. ¡Los tests son cruciales para automatización!

### 16. 🔧 ¿Cómo trabajas con CSV en Python? 🟡

A) 📝 `import csv; with open('file.csv') as f: reader = csv.reader(f)`

B) 🔄 `import pandas; df = pandas.read_csv('file.csv')`

C) 📦 `data = read_csv('file.csv')`

D) 🎯 `import excel; data = excel.csv('file.csv')`

**Respuesta correcta**: A) 📝 `import csv; with open('file.csv') as f: reader = csv.reader(f)`

> 📊 El módulo `csv` es perfecto para archivos simples. Para análisis complejo usa `pandas`!

### 17. 🎯 ¿Cómo haces logging en Python? 🟡

A) 📝 `import logging; logging.info('mensaje')`

B) 🔄 `print('LOG: mensaje')`

C) 📦 `log('mensaje')`

D) 🎯 `console.log('mensaje')`

**Respuesta correcta**: A) 📝 `import logging; logging.info('mensaje')`

> 📝 `logging` es mucho mejor que `print()` para aplicaciones serias. ¡Permite niveles, archivos y formato!

### 18. 🔄 ¿Cómo trabajas con bases de datos en Python? 🔴

A) 📝 `import sqlite3; conn = sqlite3.connect('db.sqlite')`

B) 🔄 `import database; db = database.connect('db')`

C) 📦 `db = Database('sqlite://db.sqlite')`

D) 🎯 `import sql; conn = sql.connect('db')`

**Respuesta correcta**: A) 📝 `import sqlite3; conn = sqlite3.connect('db.sqlite')`

> 🗄️ `sqlite3` viene incluido para bases de datos simples. Para otras bases usa drivers específicos como `psycopg2`, `mysql-connector-python`, etc.

### 19. 🚀 ¿Cómo haces scraping web en Python? 🔴

A) 📝 `import requests, BeautifulSoup; soup = BeautifulSoup(response.text)`

B) 🔄 `import urllib, html; html.parse(response)`

C) 📦 `import web; data = web.scrape(url)`

D) 🎯 `import crawler; data = crawler.get(url)`

**Respuesta correcta**: A) 📝 `import requests, BeautifulSoup; soup = BeautifulSoup(response.text)`

> 🕷️ `requests` + `BeautifulSoup` es la combinación clásica. Para JavaScript usa `selenium` o `playwright`!

### 20. 🔧 ¿Cómo optimizas scripts Python? 🔴

A) 📝 Usa list comprehensions, evita loops innecesarios, perfilado con `cProfile`

B) 🔄 Usa solo funciones, evita variables

C) 📦 Compila a C++

D) 🎯 Usa solo librerías externas

**Respuesta correcta**: A) 📝 Usa list comprehensions, evita loops innecesarios, perfilado con `cProfile`

> ⚡ Optimización en Python: usa estructuras nativas, evita loops Python cuando sea posible, perfila con `cProfile`, considera NumPy para números!

### 21. 🎯 ¿Cuál es la mejor práctica para scripts de automatización? 🔴

A) 📝 Usar logging, manejo de errores, argumentos CLI, documentación

B) 🔄 Hacer todo en una función

C) 📦 Usar solo variables globales

D) 🎯 Evitar imports

**Respuesta correcta**: A) 📝 Usar logging, manejo de errores, argumentos CLI, documentación

> 🎯 Scripts de producción necesitan: logging detallado, manejo robusto de errores, CLI amigable, documentación clara y tests. ¡Calidad es clave!

