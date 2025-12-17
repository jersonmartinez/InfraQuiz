# Python Quiz 4 - Expert Level

❓ What is the purpose of Python's `__metaclass__` attribute? 🔴

📝 Define the metaclass for a class
⚙️ Define class attributes
🧱 Define instance attributes
📦 Define class methods

💡 The `__metaclass__` attribute allows you to specify which metaclass should be used to create a class.

---

❓ Which Python feature allows for type hints and annotations? 🟡

📝 Type hints with `typing` module
⚙️ Regular variables
🧱 Dynamic typing
📦 Duck typing

💡 Type hints allow you to specify expected types for function parameters and return values, improving code documentation and IDE support.

---

❓ What does the `@dataclass` decorator do? 🟡

📝 Automatically generate common methods for data classes
⚙️ Improve performance
🧱 Reduce memory usage
📦 Simplify syntax

💡 The `@dataclass` decorator automatically generates `__init__`, `__repr__`, and other common methods for simple data-holding classes.

---

❓ Which Python concept allows for protocol-based programming? 🟡

📝 Structural typing with `typing.Protocol`
⚙️ Nominal typing
🧱 Duck typing
📦 Static typing

💡 Protocols allow for structural typing where objects are compatible based on their structure rather than inheritance.

---

❓ What is the purpose of Python's `__subclasshook__` method? 🔴

📝 Control subclass checking in abstract base classes
⚙️ Control inheritance
🧱 Control instantiation
📦 Control method calls

💡 The `__subclasshook__` method allows abstract base classes to customize how `issubclass()` works.

---

❓ Which Python feature allows for function overloading? 🟡

📝 `@functools.singledispatch` decorator
⚙️ Regular functions
🧱 Method overloading
📦 Operator overloading

💡 The `@singledispatch` decorator allows you to create functions that behave differently based on the type of their first argument.

---

❓ What does the `@cached_property` decorator do? 🟡

📝 Cache property values after first access
⚙️ Improve performance
🧱 Reduce memory usage
📦 Simplify syntax

💡 This decorator caches property values after the first access, avoiding recomputation on subsequent accesses.

---

❓ Which Python concept allows for custom exception hierarchies? 🟡

📝 Inheriting from built-in exception classes
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom exception hierarchies are created by inheriting from built-in exception classes to provide specific error types.

---

❓ What is the purpose of Python's `__prepare__` method? 🔴

📝 Customize the namespace used during class creation
⚙️ Customize class attributes
🧱 Customize instance attributes
📦 Customize method calls

💡 The `__prepare__` method allows metaclasses to customize the namespace dictionary used during class creation.

---

❓ Which Python feature allows for function composition? 🟡

📝 `functools.reduce` and custom composition functions
⚙️ Regular function calls
🧱 Method chaining
📦 Operator overloading

💡 Function composition allows you to combine multiple functions into a single function that applies them in sequence.

---

❓ What does the `@total_ordering` decorator do? 🟡

📝 Automatically implement comparison methods
⚙️ Improve performance
🧱 Reduce memory usage
📦 Simplify syntax

💡 This decorator automatically implements all comparison methods when you define `__eq__` and one other comparison method.

---

❓ Which Python concept allows for custom context managers? 🟡

📝 Classes implementing `__enter__` and `__exit__`
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom context managers are classes that implement the context manager protocol with `__enter__` and `__exit__` methods.

---

❓ What is the purpose of Python's `__getattribute__` method? 🔴

📝 Intercept all attribute access
⚙️ Intercept specific attributes
🧱 Intercept method calls
📦 Intercept object creation

💡 The `__getattribute__` method intercepts all attribute access, allowing for complete control over how attributes are retrieved.

---

❓ Which Python feature allows for custom sequence types? 🟡

📝 Implementing sequence protocol methods
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom sequence types implement methods like `__len__`, `__getitem__`, and `__setitem__` to behave like built-in sequences.

---

❓ What does the `@functools.wraps` decorator do? 🟡

📝 Preserve function metadata when creating decorators
⚙️ Improve performance
🧱 Reduce memory usage
📦 Simplify syntax

💡 This decorator preserves the original function's metadata (name, docstring, etc.) when creating wrapper functions.

---

❓ Which Python concept allows for custom iterators? 🟡

📝 Classes implementing `__iter__` and `__next__`
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom iterators implement the iterator protocol with `__iter__` and `__next__` methods to control iteration behavior.

---

❓ What is the purpose of Python's `__del__` method? 🟡

📝 Handle object cleanup and finalization
⚙️ Handle object creation
🧱 Handle object modification
📦 Handle object access

💡 The `__del__` method is called when an object is about to be destroyed, allowing for cleanup operations.

---

❓ Which Python feature allows for custom number types? 🟡

📝 Implementing numeric protocol methods
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom number types implement methods like `__add__`, `__sub__`, and `__mul__` to behave like built-in numeric types.

---

❓ What does the `@property.setter` decorator do? 🟡

📝 Define setter behavior for properties
⚙️ Improve performance
🧱 Reduce memory usage
📦 Simplify syntax

💡 This decorator allows you to define setter behavior for properties, controlling how values are assigned.

---

❓ Which Python concept allows for custom mapping types? 🟡

📝 Implementing mapping protocol methods
⚙️ Regular classes
🧱 Functions
📦 Modules

💡 Custom mapping types implement methods like `__getitem__`, `__setitem__`, and `__delitem__` to behave like dictionaries.

---

❓ What is the purpose of Python's `__slots__` inheritance behavior? 🔴

📝 Control how slots are inherited in subclasses
⚙️ Control attribute access
🧱 Control method calls
📦 Control object creation

💡 The inheritance behavior of `__slots__` determines how slot attributes are handled when creating subclasses.
