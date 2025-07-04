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

