# 🐍 Python para Automatización - Cuestionario 1

## Preguntas

### ❓ ¿Cuál es la mejor forma de leer un archivo en Python para automatización? 🟢

📝 `with open('archivo.txt', 'r') as f: contenido = f.read()`
🔄 `archivo = open('archivo.txt'); contenido = archivo.read()`
📦 `contenido = read_file('archivo.txt')`
🎯 `import file; contenido = file.read('archivo.txt')`

**Respuesta Correcta:**
📝 `with open('archivo.txt', 'r') as f: contenido = f.read()`

**Explicación:**
💡 La declaración `with` maneja automáticamente el cierre del archivo, incluso si ocurren excepciones. ¡Es la forma Pythonic y previene fugas de recursos! 🎯

---

### 🧠 ¿Cómo verificas si un archivo existe en Python? 🟢

📝 `import os; os.path.exists('archivo.txt')`
🔄 `import file; file.exists('archivo.txt')`
📦 `exists('archivo.txt')`
🎯 `check_file('archivo.txt')`

**Respuesta Correcta:**
📝 `import os; os.path.exists('archivo.txt')`

**Explicación:**
🔍 `os.path.exists()` es la forma estándar de verificar existencia de archivos. Retorna `True` si existe, `False` si no. ¡Simple pero crucial para automatización! 🎯

---

### 💭 ¿Cuál es la forma correcta de manejar argumentos de línea de comandos? 🟢

📝 `import sys; args = sys.argv[1:]`
🔄 `import argparse; parser = argparse.ArgumentParser()`
📦 `args = get_args()`
🎯 `import cli; args = cli.get_arguments()`

**Respuesta Correcta:**
📝 `import sys; args = sys.argv[1:]`

**Explicación:**
⚡ `sys.argv[1:]` te da todos los argumentos excepto el nombre del script. Para scripts simples es perfecto. ¡Para CLIs complejas usa `argparse`! 🎯

---

### 🤔 ¿Cómo haces una petición HTTP en Python? 🟡

📝 `import requests; respuesta = requests.get('url')`
🔄 `import urllib; respuesta = urllib.request.urlopen('url')`
📦 `import http; respuesta = http.get('url')`
🎯 `import web; respuesta = web.get('url')`

**Respuesta Correcta:**
📝 `import requests; respuesta = requests.get('url')`

**Explicación:**
💡 La librería `requests` es el estándar de facto para peticiones HTTP. Simple, legible y maneja la mayoría de casos automáticamente. ¡Mucho mejor que urllib! 🎯

---

### 🔧 ¿Cuál es la mejor forma de manejar datos JSON? 🟡

📝 `import json; datos = json.loads(json_string)`
🔄 `import yaml; datos = yaml.load(json_string)`
📦 `datos = parse_json(json_string)`
🎯 `import parser; datos = parser.json(json_string)`

**Respuesta Correcta:**
📝 `import json; datos = json.loads(json_string)`

**Explicación:**
🩺 `json.loads()` parsea strings JSON a objetos Python. Usa `json.dumps()` para convertir objetos Python a JSON. ¡El módulo nativo maneja toda la complejidad! 🎯

---

### ⚙️ ¿Cómo ejecutas un comando shell y capturas su salida? 🟡

📝 `import subprocess; resultado = subprocess.run(['cmd'], capture_output=True)`
🔄 `import os; resultado = os.system('cmd')`
📦 `resultado = run_command('cmd')`
🎯 `import shell; resultado = shell.run('cmd')`

**Respuesta Correcta:**
📝 `import subprocess; resultado = subprocess.run(['cmd'], capture_output=True)`

**Explicación:**
🔧 `subprocess.run()` es la forma moderna de ejecutar comandos. `capture_output=True` captura stdout y stderr. ¡Mucho más seguro que `os.system()`! 🎯

---

### 🔍 ¿Cuál es la mejor práctica para manejar datos sensibles? 🔴

📝 `import os; password = os.environ.get('PASSWORD')`
🔄 `password = input('Ingresa contraseña: ')`
📦 `password = 'contraseña_hardcodeada'`
🎯 `import config; password = config.password`

**Respuesta Correcta:**
📝 `import os; password = os.environ.get('PASSWORD')`

**Explicación:**
🩺 Las variables de entorno son la forma segura de manejar secretos. Nunca hardcodees contraseñas o uses input() en scripts de automatización. ¡Usa archivos .env o gestores de secretos! 🎯

---

### 🚀 ¿Cómo creas una configuración de logging apropiada? 🔴

📝 `import logging; logging.basicConfig(level=logging.INFO)`
🔄 `print('INFO: mensaje')`
📦 `import log; log.info('mensaje')`
🎯 `logging.info('mensaje')`

**Respuesta Correcta:**
📝 `import logging; logging.basicConfig(level=logging.INFO)`

**Explicación:**
💡 `logging.basicConfig()` configura logging apropiado con timestamps, niveles y formato. ¡Mucho mejor que prints para automatización en producción! 🎯

---

### 🔧 ¿Cuál es la forma más eficiente de procesar archivos grandes? 🔴

📝 `with open('archivo.txt') as f: for linea in f: procesar(linea)`
🔄 `contenido = open('archivo.txt').read(); for linea in contenido.splitlines():`
📦 `lineas = open('archivo.txt').readlines(); for linea in lineas:`
🎯 `import pandas; df = pandas.read_csv('archivo.txt')`

**Respuesta Correcta:**
📝 `with open('archivo.txt') as f: for linea in f: procesar(linea)`

**Explicación:**
⚡ Iterar directamente sobre el objeto archivo lee línea por línea sin cargar todo en memoria. ¡Perfecto para archivos que no caben en RAM! 🎯

---

### ❓ ¿Cómo defines una función en Python? 🟢

📝 `def mi_funcion(parametro):`
🔄 `function mi_funcion(parametro):`
📦 `func mi_funcion(parametro):`
🎯 `define mi_funcion(parametro):`

**Respuesta Correcta:**
📝 `def mi_funcion(parametro):`

**Explicación:**
💡 La palabra clave `def` define funciones en Python. Seguida del nombre, parámetros entre paréntesis y dos puntos. ¡Sintaxis fundamental de Python! 🎯

---

### 🧠 ¿Qué estructura de datos es inmutable en Python? 🟢

📝 `tupla = (1, 2, 3)`
🔄 `lista = [1, 2, 3]`
📦 `diccionario = {1: 2, 3: 4}`
🎯 `conjunto = {1, 2, 3}`

**Respuesta Correcta:**
📝 `tupla = (1, 2, 3)`

**Explicación:**
🔍 Las tuplas son inmutables - no puedes cambiar sus elementos después de crearlas. Listas, diccionarios y conjuntos son mutables. ¡Útil para datos que no deben cambiar! 🎯

---

### 💭 ¿Cómo importas solo una función específica de un módulo? 🟢

📝 `from modulo import funcion`
🔄 `import modulo.funcion`
📦 `import funcion from modulo`
🎯 `use modulo.funcion`

**Respuesta Correcta:**
📝 `from modulo import funcion`

**Explicación:**
⚡ `from modulo import funcion` importa solo la función específica. Puedes usarla directamente sin prefijo. ¡Mantiene el namespace limpio! 🎯

---

### 🤔 ¿Cuál es la forma correcta de manejar excepciones? 🟡

📝 `try: codigo() except Exception as e: manejar(e)`
🔄 `if error: manejar_error()`
📦 `catch Exception: manejar()`
🎯 `on error: manejar()`

**Respuesta Correcta:**
📝 `try: codigo() except Exception as e: manejar(e)`

**Explicación:**
💡 El bloque try-except es la forma estándar de manejar excepciones. Captura errores específicos cuando sea posible. ¡Evita except vacíos! 🎯

---

### 🔧 ¿Cómo creas una lista por comprensión? 🟡

📝 `[x*2 for x in range(10)]`
🔄 `list(x*2 for x in range(10))`
📦 `for x in range(10): lista.append(x*2)`
🎯 `map(lambda x: x*2, range(10))`

**Respuesta Correcta:**
📝 `[x*2 for x in range(10)]`

**Explicación:**
🩺 Las list comprehensions son la forma Pythonic de crear listas. Más legible y eficiente que loops tradicionales. ¡Una línea poderosa! 🎯

---

### ⚙️ ¿Cómo trabajas con fechas y horas? 🟡

📝 `from datetime import datetime; ahora = datetime.now()`
🔄 `import time; ahora = time.now()`
📦 `import date; ahora = date.today()`
🎯 `from calendar import now; ahora = now()`

**Respuesta Correcta:**
📝 `from datetime import datetime; ahora = datetime.now()`

**Explicación:**
🔧 El módulo `datetime` es el estándar para trabajar con fechas y horas. `datetime.now()` retorna fecha y hora actual. ¡Esencial para logs y timestamps! 🎯

---

### 🔍 ¿Cuál es la forma correcta de trabajar con rutas de archivos? 🔴

📝 `from pathlib import Path; ruta = Path('dir') / 'archivo.txt'`
🔄 `ruta = 'dir' + '/' + 'archivo.txt'`
📦 `import os; ruta = os.join('dir', 'archivo.txt')`
🎯 `ruta = 'dir\\archivo.txt'`

**Respuesta Correcta:**
📝 `from pathlib import Path; ruta = Path('dir') / 'archivo.txt'`

**Explicación:**
🩺 `pathlib` es la forma moderna y multiplataforma de manejar rutas. El operador `/` une rutas correctamente en cualquier OS. ¡Adiós problemas de backslashes! 🎯

---

### 🚀 ¿Cómo creas un decorador simple? 🔴

📝 `def decorador(func): def wrapper(*args): return func(*args)`
🔄 `@decorator def funcion():`
📦 `decorator = lambda func: func`
🎯 `def decorador: return funcion`

**Respuesta Correcta:**
📝 `def decorador(func): def wrapper(*args): return func(*args)`

**Explicación:**
💡 Un decorador es una función que recibe otra función y retorna una versión modificada. La función wrapper envuelve la original. ¡Patrón poderoso de Python! 🎯

---

### 🔧 ¿Cómo manejas múltiples valores de retorno? 🔴

📝 `def funcion(): return valor1, valor2`
🔄 `def funcion(): return [valor1, valor2]`
📦 `def funcion(): return {valor1, valor2}`
🎯 `def funcion(): yield valor1; yield valor2`

**Respuesta Correcta:**
📝 `def funcion(): return valor1, valor2`

**Explicación:**
⚡ Python permite retornar múltiples valores como tupla. Se desempaquetan con `a, b = funcion()`. ¡Más limpio que usar listas o diccionarios! 🎯

---

### ❓ ¿Qué método lista todos los archivos en un directorio? 🟢

📝 `import os; archivos = os.listdir('directorio')`
🔄 `import dir; archivos = dir.list('directorio')`
📦 `archivos = list_files('directorio')`
🎯 `import files; archivos = files.all('directorio')`

**Respuesta Correcta:**
📝 `import os; archivos = os.listdir('directorio')`

**Explicación:**
💡 `os.listdir()` retorna una lista con todos los archivos y directorios. Para más control usa `os.walk()` o `pathlib`. ¡Básico para automatización de archivos! 🎯

---

### 🧠 ¿Cómo conviertes una string a minúsculas? 🟢

📝 `texto.lower()`
🔄 `texto.lowercase()`
📦 `lower(texto)`
🎯 `texto.toLower()`

**Respuesta Correcta:**
📝 `texto.lower()`

**Explicación:**
🔍 El método `lower()` convierte todas las letras a minúsculas. También existe `upper()` para mayúsculas y `title()` para capitalizar. ¡Métodos esenciales de strings! 🎯

---

### 💭 ¿Cuál es la forma correcta de concatenar strings? 🟢

📝 `resultado = f"{string1} {string2}"`
🔄 `resultado = string1 + " " + string2`
📦 `resultado = concat(string1, string2)`
🎯 `resultado = string1.append(string2)`

**Respuesta Correcta:**
📝 `resultado = f"{string1} {string2}"`

**Explicación:**
⚡ Los f-strings (formatted strings) son la forma moderna y eficiente de concatenar. Más legibles que `+` y más rápidos. ¡Python 3.6+ únicamente! 🎯

