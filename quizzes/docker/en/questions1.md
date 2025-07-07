# 🐳 Docker - Questions 1

## Questions

### 1. 📊 What command shows real-time statistics of a CPU-intensive container? 🟢

A) ⚡ `docker stats`
B) 🔧 `docker top`
C) 🛠️ `docker info`
D) 📊 `docker metrics`

**Correct Answer**: A) ⚡ `docker stats`

> 💡 `docker stats` shows CPU, memory, and network usage in real-time. Like a resource monitor for your containers!

### 2. 📂 What does the WORKDIR instruction do in a Dockerfile? 🟢

A) 🎯 `Sets the working directory`
B) 🔧 `Creates a volume`
C) ⚙️ `Installs dependencies`
D) 📂 `Copies files`

**Correct Answer**: A) 🎯 `Sets the working directory`

> 📘 `WORKDIR` defines the base directory for subsequent instructions. Like a cd command but for your container!

### 3. 💾 Which docker run flag limits container memory? 🟡

A) 💾 `--memory`
B) 🔧 `--mem`
C) ⚙️ `--ram`
D) 📊 `--limit`

**Correct Answer**: A) 💾 `--memory`

> ⚡ `--memory` sets RAM limits. So no container becomes a resource hog!

### 4. 🔌 How do you map container port 80 to host port 8080? 🟢

A) 🔌 `-p 8080:80`
B) 🛠️ `-p 80:8080`
C) 🔧 `--port 80:8080`
D) ⚙️ `--expose 8080:80`

**Correct Answer**: A) 🔌 `-p 8080:80`

> 🎯 `-p HOST:CONTAINER` is the format. Like a doorman directing traffic to the right place!

### 5. 📦 What's the most efficient Dockerfile instruction for installing packages? 🟡

A) ⚡ `RUN apt-get update && apt-get install`
B) 🔧 `RUN apt-get install`
C) 📦 `COPY && RUN`
D) ⚙️ `ADD && INSTALL`

**Correct Answer**: A) ⚡ `RUN apt-get update && apt-get install`

> 💡 Combining commands reduces layers and size. Like doing all your shopping in one trip!

### 6. 🔐 Which command inspects container secrets? 🟡

A) 🕵️ `docker inspect`
B) 🔧 `docker secrets`
C) ⚙️ `docker check`
D) 🛠️ `docker audit`

**Correct Answer**: A) 🕵️ `docker inspect`

> 📘 `docker inspect` reveals configuration and secrets. Like a detective for your containers!

### 7. 🔄 What does the --restart=always option do? 🟢

A) 🔄 `Restarts container if it stops`
B) ⚙️ `Restarts Docker daemon`
C) 🔧 `Updates the image`
D) 🛠️ `Reloads configuration`

**Correct Answer**: A) 🔄 `Restarts container if it stops`

> ⚡ Keeps the container alive automatically. Like a tireless guardian!

### 8. 🏷️ What's the best practice for tagging images? 🟡

A) 📌 `name:version`
B) 🏷️ `name_version`
C) ⚙️ `name-date`
D) 🔧 `nameV1`

**Correct Answer**: A) 📌 `name:version`

> 💡 `name:version` is the standard. Like a well-organized library, each book in its place!

### 9. 🔍 Which command shows image layers? 🟡

A) 🎯 `docker history`
B) 📊 `docker layers`
C) ⚙️ `docker inspect`
D) 🔧 `docker show`

**Correct Answer**: A) 🎯 `docker history`

> 📘 `docker history` reveals layer-by-layer construction. Like an X-ray of your image!

### 10. 🚫 What does the --no-cache flag do when building? 🟡

A) 🚫 `Ignores build cache`
B) 🔧 `Doesn't save image`
C) ⚙️ `Doesn't use network`
D) 📦 `Doesn't compress`

**Correct Answer**: A) 🚫 `Ignores build cache`

> ⚡ Builds from scratch, ignoring cached layers. Perfect for totally fresh builds!

### 11. 🌐 How do you create a custom network for containers? 🟢

A) 🔌 `docker network create`
B) 🔧 `docker create network`
C) ⚙️ `docker new network`
D) 🛠️ `docker network add`

**Correct Answer**: A) 🔌 `docker network create`

> 🎯 `docker network create` generates an isolated network. Like creating a private neighborhood for containers!

### 12. ⚡ Which command executes a command in a running container? 🟢

A) ⚡ `docker exec`
B) 🔧 `docker run`
C) ⚙️ `docker do`
D) 🛠️ `docker cmd`

**Correct Answer**: A) ⚡ `docker exec`

> 💡 `docker exec` runs commands in active containers. Like sending remote instructions!

### 13. 👤 What does the USER instruction do in a Dockerfile? 🟡

A) 👤 `Changes user for commands`
B) 🔧 `Creates a user`
C) ⚙️ `Deletes a user`
D) 🛠️ `Lists users`

**Correct Answer**: A) 👤 `Changes user for commands`

> 📘 `USER` defines who executes subsequent commands. Like changing identity in the container!

### 14. ⚙️ Which command updates container configuration? 🟡

A) ⚙️ `docker update`
B) 🔧 `docker config`
C) 🛠️ `docker modify`
D) 📊 `docker change`

**Correct Answer**: A) ⚙️ `docker update`

> 💡 `docker update` modifies resources on the fly. Like updating game rules without stopping the match!

### 15. 🏷️ What does the LABEL instruction do in Dockerfile? 🟢

A) 🏷️ `Adds metadata to image`
B) 📝 `Labels the container`
C) ⚙️ `Names the image`
D) 🔧 `Versions the build`

**Correct Answer**: A) 🏷️ `Adds metadata to image`

> 📘 `LABEL` adds descriptive information. Like putting post-its on your image!

### 16. 🧹 Which command cleans up unused Docker resources? 🟡

A) 🧹 `docker system prune`
B) 🔧 `docker clean`
C) ⚙️ `docker remove all`
D) 🛠️ `docker cleanup`

**Correct Answer**: A) 🧹 `docker system prune`

> 💡 `docker system prune` removes orphaned resources. Like spring cleaning for Docker!

### 17. 🔐 How do you pass environment variables to a container? 🟢

A) ⚡ `-e VARIABLE=value`
B) 🔧 `--env=VARIABLE`
C) ⚙️ `-v VARIABLE`
D) 🛠️ `--var VARIABLE`

**Correct Answer**: A) ⚡ `-e VARIABLE=value`

> 🎯 `-e` sets environment variables. Like giving secret instructions to your container!

### 18. ⏸️ What does the docker pause command do? 🟢

A) ⏸️ `Suspends all processes`
B) 🔧 `Stops the container`
C) ⚙️ `Restarts processes`
D) 🛠️ `Kills processes`

**Correct Answer**: A) ⏸️ `Suspends all processes`

> 💡 Freezes container processes. Like putting your container in nap mode!

### 19. 💻 Which flag limits container CPU usage? 🟡

A) ⚡ `--cpus`
B) 🔧 `--cpu-limit`
C) ⚙️ `--processor`
D) 🛠️ `--cores`

**Correct Answer**: A) ⚡ `--cpus`

> 📘 `--cpus` sets CPU limits. So everyone gets their fair share of the pie!

### 20. 💓 What does HEALTHCHECK do in a Dockerfile? 🟡

A) 💓 `Verifies if container is healthy`
B) 🔧 `Scans for viruses`
C) ⚙️ `Checks memory`
D) 🛠️ `Monitors network`

**Correct Answer**: A) 💓 `Verifies if container is healthy`

> ⚡ `HEALTHCHECK` runs periodic health tests. Like a doctor for your container!

### 21. 🌐 Which command shows container network details? 🟡

A) 🌐 `docker network inspect`
B) 🔧 `docker net show`
C) ⚙️ `docker inspect network`
D) 🛠️ `docker show network`

**Correct Answer**: A) 🌐 `docker network inspect`

> 🎯 `docker network inspect` shows all network configuration. Like a detailed map of connections!
