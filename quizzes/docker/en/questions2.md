# 🐳 Docker - Questions 2

## Questions

### 1. 🔄 What does the docker commit command do? 🟡

A) 🎯 `Creates a new image from container`
B) 🔧 `Saves changes to Git`
C) ⚙️ `Updates the container`
D) 📦 `Restarts the container`

**Correct Answer**: A) 🎯 `Creates a new image from container`

> 💡 `docker commit` captures the current state of a container as a new image. Like taking a snapshot of your container!

### 2. 📦 What's the difference between COPY and ADD in Dockerfile? 🟡

A) 🎯 `COPY is simpler, ADD can extract archives`
B) 🔧 `They are exactly the same`
C) ⚙️ `ADD is faster than COPY`
D) 📦 `COPY can download remote files`

**Correct Answer**: A) 🎯 `COPY is simpler, ADD can extract archives`

> 📘 `COPY` is for local files, while `ADD` has extra features like extraction. Like having a simple knife vs a Swiss Army knife!

### 3. 🌐 What is a Docker bridge network? 🟡

A) 🔌 `Default private network for containers`
B) 🔧 `Physical connection between hosts`
C) ⚙️ `VPN for containers`
D) 🛠️ `Reverse proxy`

**Correct Answer**: A) 🔌 `Default private network for containers`

> ⚡ Bridge network is like a virtual switch connecting containers. Like a private neighborhood for containers!

### 4. 🔐 What is Docker Content Trust (DCT)? 🟡

A) 🔒 `Digital signature system for images`
B) 🔧 `Vulnerability scanner`
C) ⚙️ `Backup system`
D) 🛠️ `Secrets manager`

**Correct Answer**: A) 🔒 `Digital signature system for images`

> 💡 DCT ensures images are authentic and unmodified. Like a warranty seal for your images!

### 5. 📊 What does the --memory-reservation flag do? 🟢

A) ⚡ `Sets soft memory limit for container`
B) 🔧 `Reserves host memory`
C) 📦 `Locks system memory`
D) ⚙️ `Limits maximum memory`

**Correct Answer**: A) ⚡ `Sets soft memory limit for container`

> 🎯 It's a soft memory limit that allows flexibility. Like a flexible reservation at a restaurant!

### 6. 🔍 What does the docker diff command do? 🟢

A) 🔍 `Shows filesystem changes`
B) 🔧 `Compares two images`
C) ⚙️ `Checks network differences`
D) 🛠️ `Analyzes config changes`

**Correct Answer**: A) 🔍 `Shows filesystem changes`

> 📘 Lists files modified since container started. Like a change detector for your container!

### 7. 🏷️ What does the latest tag mean? 🟢

A) 🎯 `Last built version of an image`
B) 🔧 `Most stable version`
C) ⚙️ `First version`
D) 📦 `Beta version`

**Correct Answer**: A) 🎯 `Last built version of an image`

> ⚡ 'latest' is just a default tag, doesn't guarantee being the newest. Like a nickname that can be misleading!

### 8. 🔌 What is Docker socket? 🟡

A) 🔌 `Communication point with Docker daemon`
B) 🔧 `Network port`
C) ⚙️ `Configuration file`
D) 🛠️ `Docker plugin`

**Correct Answer**: A) 🔌 `Communication point with Docker daemon`

> 💡 The socket is the interface to communicate with Docker. Like a direct phone line to Docker's brain!

### 9. 📦 What is a multi-stage build? 🟡

A) 🎯 `Build in stages to reduce size`
B) 🔧 `Multiple containers`
C) ⚙️ `Multiple Dockerfiles`
D) 📦 `Parallel build`

**Correct Answer**: A) 🎯 `Build in stages to reduce size`

> 📘 Allows using multiple FROM to optimize final image. Like cooking in several steps but serving only the final dish!

### 10. 🔄 What is Docker swarm? 🟡

A) 🌐 `Docker's native orchestration system`
B) 🔧 `Container network`
C) ⚙️ `Image group`
D) 🛠️ `Backup system`

**Correct Answer**: A) 🌐 `Docker's native orchestration system`

> ⚡ Allows managing a cluster of Docker hosts. Like a conductor organizing a container orchestra!

### 11. 💾 What are tmpfs mounts? 🟡

A) 💾 `Temporary memory mounts`
B) 🔧 `Temporary files`
C) ⚙️ `Temporary backups`
D) 📦 `System cache`

**Correct Answer**: A) 💾 `Temporary memory mounts`

> 🎯 Temporary storage in RAM memory. Like a digital post-it that disappears on restart!

### 12. 🔐 What is a Docker secret? 🟢

A) 🔒 `Sensitive data managed by Docker`
B) 🔧 `Registry password`
C) ⚙️ `Encrypted file`
D) 🛠️ `Environment variable`

**Correct Answer**: A) 🔒 `Sensitive data managed by Docker`

> 💡 Secure way to handle sensitive data in Docker. Like a safe for your secrets!

### 13. 📊 What does ONBUILD do in Dockerfile? 🟡

A) 🎯 `Executes commands in derived images`
B) 🔧 `Builds the image`
C) ⚙️ `Verifies the build`
D) 🛠️ `Optimizes construction`

**Correct Answer**: A) 🎯 `Executes commands in derived images`

> 📘 Trigger that activates when another image uses this as base. Like leaving instructions for the future!

### 14. 🌐 What is a Docker registry? 🟢

A) 🏢 `Repository for Docker images`
B) 🔧 `Container list`
C) ⚙️ `Docker database`
D) 📦 `File system`

**Correct Answer**: A) 🏢 `Repository for Docker images`

> ⚡ Storage where Docker images are kept and distributed. Like a library for Docker images!

### 15. ⚙️ What is a Docker plugin? 🟡

A) ⚙️ `Extension that adds functionality`
B) 🔧 `Automation script`
C) 🛠️ `Monitoring tool`
D) 📊 `Special configuration`

**Correct Answer**: A) ⚙️ `Extension that adds functionality`

> 💡 Adds extra capabilities to Docker. Like accessories to customize your Docker!

### 16. 🔍 What is a custom healthcheck? 🟡

A) 🏥 `Script to verify container health`
B) 🔧 `System monitor`
C) ⚙️ `Error log`
D) 📊 `Status report`

**Correct Answer**: A) 🏥 `Script to verify container health`

> 🎯 Custom command to check if container is working properly. Like a custom medical check-up!

### 17. 📦 What is a volume driver? 🟡

A) 🔌 `Plugin for storage management`
B) 🔧 `Disk controller`
C) ⚙️ `File system`
D) 💾 `Backup manager`

**Correct Answer**: A) 🔌 `Plugin for storage management`

> 📘 Allows using different types of storage for volumes. Like a universal adapter for storage!

### 18. 🔄 What is Docker buildx? 🟡

A) 🏗️ `Multi-platform builder`
B) 🔧 `Build optimizer`
C) ⚙️ `Build cache`
D) 📦 `Image compressor`

**Correct Answer**: A) 🏗️ `Multi-platform builder`

> ⚡ Allows building images for different architectures. Like a universal image builder!

### 19. 🌐 What is a Docker context? 🟢

A) 🎯 `Set of connection configurations`
B) 🔧 `Environment variable`
C) ⚙️ `Configuration file`
D) 🛠️ `Startup script`

**Correct Answer**: A) 🎯 `Set of connection configurations`

> 💡 Defines how and where Docker connects. Like a connection profile for Docker!

### 20. 📊 What is a cgroup? 🟡

A) 🔄 `System resource control`
B) 🔧 `Container group`
C) ⚙️ `Network configuration`
D) 📦 `File system`

**Correct Answer**: A) 🔄 `System resource control`

> 📘 Limits and isolates system resource usage. Like a traffic controller for resources!

### 21. 🔐 What is Docker rootless? 🟡

A) 🔒 `Docker without root privileges`
B) 🔧 `Container without base system`
C) ⚙️ `Image without layers`
D) 🛠️ `System without kernel`

**Correct Answer**: A) 🔒 `Docker without root privileges`

> ⚡ Allows running Docker without superuser privileges. Like using Docker with enhanced security profile! 