# 🐳 Docker - Questions 1

## Questions

### 1. 🐳 What is Docker? 🟢

A) 📝 Containerization platform for packaging applications

B) 🔄 Server operating system

C) 📦 Distributed database

D) 🎯 Programming language

**Correct Answer**: A) 📝 Containerization platform for packaging applications

> 💡 Docker allows packaging applications with their dependencies in portable containers. Like standard shipping containers for software!

### 2. 🔧 What's the main difference between containers and VMs? 🟢

A) 📝 Containers share the OS kernel, VMs have complete OS

B) 🔄 Containers are slower than VMs

C) 📦 VMs use fewer resources

D) 🎯 There's no practical difference

**Correct Answer**: A) 📝 Containers share the OS kernel, VMs have complete OS

> ⚡ Containers are more efficient because they share the host's kernel. Like apartments vs. individual houses!

### 3. 🖼️ What is a Docker image? 🟢

A) 📝 Read-only template for creating containers

B) 🔄 Running container

C) 📦 Configuration file

D) 🎯 Monitoring system

**Correct Answer**: A) 📝 Read-only template for creating containers

> 🎯 Images are like molds or templates. Containers are running instances of those images. Like a blueprint vs. the built house!

### 4. 📦 What is a Docker container? 🟢

A) 📝 Executable instance of a Docker image

B) 🔄 Docker configuration file

C) 📦 Image registry

D) 🎯 Monitoring tool

**Correct Answer**: A) 📝 Executable instance of a Docker image

> 🏃‍♂️ A container is a "living" image - running. You can have multiple containers from the same image. Like multiple Apps from the same download!

### 5. 📄 What is a Dockerfile? 🟢

A) 📝 Text file with instructions to build an image

B) 🔄 Running container

C) 📦 Change log

D) 🎯 Debugging tool

**Correct Answer**: A) 📝 Text file with instructions to build an image

> 📋 A Dockerfile is like a step-by-step recipe for creating a Docker image. Clear instructions for cooking your application!

### 6. 🔨 What command builds an image from a Dockerfile? 🟢

A) 📝 `docker build -t name .`

B) 🔄 `docker create -t name .`

C) 📦 `docker make -t name .`

D) 🎯 `docker compile -t name .`

**Correct Answer**: A) 📝 `docker build -t name .`

> 🏗️ `docker build` reads the Dockerfile and creates the image. The `-t` assigns a tag/name, the `.` indicates current context.

### 7. 🚀 What command runs a container? 🟢

A) 📝 `docker run image`

B) 🔄 `docker start image`

C) 📦 `docker execute image`

D) 🎯 `docker launch image`

**Correct Answer**: A) 📝 `docker run image`

> 🎬 `docker run` creates AND runs a container from an image. For existing containers use `docker start`.

### 8. 📋 What command lists running containers? 🟢

A) 📝 `docker ps`

B) 🔄 `docker list`

C) 📦 `docker show`

D) 🎯 `docker containers`

**Correct Answer**: A) 📝 `docker ps`

> 👀 `docker ps` shows active containers. Use `docker ps -a` to see ALL (including stopped ones).

### 9. 🛑 How do you stop a container? 🟢

A) 📝 `docker stop container_id`

B) 🔄 `docker kill container_id`

C) 📦 `docker pause container_id`

D) 🎯 `docker halt container_id`

**Correct Answer**: A) 📝 `docker stop container_id`

> ⏹️ `docker stop` sends SIGTERM (graceful shutdown). `docker kill` sends SIGKILL (forced). Always try stop first!

### 10. 🗑️ How do you remove a container? 🟡

A) 📝 `docker rm container_id`

B) 🔄 `docker delete container_id`

C) 📦 `docker remove container_id`

D) 🎯 `docker destroy container_id`

**Correct Answer**: A) 📝 `docker rm container_id`

> 🗂️ `docker rm` removes containers (must be stopped). `docker rmi` removes images. Different commands for different objects!

### 11. 🔍 What command executes commands inside a container? 🟡

A) 📝 `docker exec -it container_id command`

B) 🔄 `docker run -it container_id command`

C) 📦 `docker attach container_id command`

D) 🎯 `docker connect container_id command`

**Correct Answer**: A) 📝 `docker exec -it container_id command`

> 🚪 `docker exec` executes commands in RUNNING containers. The `-it` provides interactive terminal. Like entering an already occupied room!

### 12. 📁 What are Docker volumes? 🟡

A) 📝 Mechanism to persist data outside the container

B) 🔄 Configuration files

C) 📦 Compressed images

D) 🎯 System logs

**Correct Answer**: A) 📝 Mechanism to persist data outside the container

> 💾 Volumes allow data to survive the container. Like an external hard drive that persists when you turn off the computer!

### 13. 🌐 What is port mapping? 🟡

A) 📝 Expose container ports to the host

B) 🔄 Configure container DNS

C) 📦 Map files between container and host

D) 🎯 Configure environment variables

**Correct Answer**: A) 📝 Expose container ports to the host

> 🚪 Port mapping connects container ports with the host. `-p 8080:80` maps container port 80 to host port 8080.

### 14. 🔗 What are Docker networks? 🟡

A) 📝 System to connect containers with each other

B) 🔄 Internet configuration

C) 📦 Network files

D) 🎯 Communication protocols

**Correct Answer**: A) 📝 System to connect containers with each other

> 🌉 Docker networks enable communication between containers. Like creating a neighborhood where houses can talk to each other!

### 15. 📚 What is Docker Hub? 🟡

A) 📝 Public registry of Docker images

B) 🔄 Local development tool

C) 📦 Monitoring system

D) 🎯 Dockerfile editor

**Correct Answer**: A) 📝 Public registry of Docker images

> 🏪 Docker Hub is like an app store for Docker images. Millions of images ready to use!

### 16. 🎛️ What are environment variables in Docker? 🟡

A) 📝 Configurations passed to the container

B) 🔄 Dockerfile variables

C) 📦 Network configurations

D) 🎯 Host variables

**Correct Answer**: A) 📝 Configurations passed to the container

> ⚙️ Environment variables (`-e VAR=value`) configure applications without modifying code. Like adjusting settings from the outside!

### 17. 🔄 What is Docker Compose? 🔴

A) 📝 Tool to define multi-container applications

B) 🔄 Dockerfile editor

C) 📦 Monitoring system

D) 🎯 Debugging tool

**Correct Answer**: A) 📝 Tool to define multi-container applications

> 🎼 Docker Compose orchestrates multiple containers with a YAML file. Like conducting a symphony of services!

### 18. 🏗️ What is multi-stage build? 🔴

A) 📝 Technique to create optimized images using multiple stages

B) 🔄 Build multiple images simultaneously

C) 📦 Use multiple Dockerfiles

D) 🎯 Build on multiple servers

**Correct Answer**: A) 📝 Technique to create optimized images using multiple stages

> 🎯 Multi-stage allows compiling in one stage and copying only binaries to the final image. Smaller and more secure images!

### 19. 🔒 What are Docker security best practices? 🔴

A) 📝 Use non-root users, minimal images, scan vulnerabilities

B) 🔄 Only use official images

C) 📦 Use only privileged containers

D) 🎯 Don't use volumes

**Correct Answer**: A) 📝 Use non-root users, minimal images, scan vulnerabilities

> 🛡️ Security: run as non-root, use minimal base images (alpine), scan vulnerabilities, update regularly.

### 20. 📦 What is a private Docker registry? 🔴

A) 📝 Internal server to store organization's private images

B) 🔄 Paid version of Docker Hub

C) 📦 Docker Hub with authentication

D) 🎯 Backup system for images

**Correct Answer**: A) 📝 Internal server to store organization's private images

> 🏢 Private registries (Harbor, AWS ECR, Azure ACR) allow total control over corporate images. Your own private app store!

### 21. 🎯 What are Dockerfile best practices? 🔴

A) 📝 Use .dockerignore, minimize layers, correct command order, specific base images

B) 🔄 Always use FROM ubuntu:latest

C) 📦 Install everything in one RUN line

D) 🎯 Don't use COPY or ADD

**Correct Answer**: A) 📝 Use .dockerignore, minimize layers, correct command order, specific base images

> 🏆 Efficient Dockerfiles: use .dockerignore, combine RUN commands, order by frequency of change, use specific tags, not latest. Quality from the start!
