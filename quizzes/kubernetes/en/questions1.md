# ☸️ Kubernetes - Questions 1

## Questions

### 1. ☸️ What is Kubernetes? 🟢

A) ☸️ Container orchestration platform

B) 🔧 Virtualization system

C) 📦 Package manager

D) 🌐 Web server

**Correct Answer**: A) ☸️ Container orchestration platform

> 💡 Kubernetes automates deployment, scaling, and management of containerized applications. Like a conductor for your application orchestra!

### 2. 🐳 What is a Pod in Kubernetes? 🟢

A) 🐳 Smallest deployable unit

B) 🔧 Individual container

C) 📦 Application package

D) 🌐 Network service

**Correct Answer**: A) 🐳 Smallest deployable unit

> 📘 A Pod can contain one or more containers that share resources. Like a room where your applications live!

### 3. 🔄 What is a Deployment? 🟡

A) 🔄 Resource that manages desired state of Pods

B) 🔧 Installation process

C) 📦 Deployment package

D) 🌐 Network configuration

**Correct Answer**: A) 🔄 Resource that manages desired state of Pods

> ⚡ Deployments ensure the correct number of Pods are running. Like a supervisor keeping everything working!

### 4. 🌐 What is a Service? 🟡

A) 🌐 Abstraction that exposes applications

B) 🔧 System service

C) 📦 Network package

D) ⚙️ Network configuration

**Correct Answer**: A) 🌐 Abstraction that exposes applications

> 💡 Services allow applications to communicate with each other. Like a phone directory for your applications!

### 5. 📦 What is a ConfigMap? 🟡

A) 📦 Store non-sensitive configuration

B) 🔧 Configuration file

C) 📄 Configuration document

D) 🌐 Network configuration

**Correct Answer**: A) 📦 Store non-sensitive configuration

> 🔧 ConfigMaps separate configuration from application code. Like having external settings without touching the code!

### 6. 🔐 What is a Secret? 🟡

A) 🔐 Store sensitive information securely

B) 🔒 Access password

C) 🛡️ Authentication system

D) 🔑 Encryption key

**Correct Answer**: A) 🔐 Store sensitive information securely

> 🔒 Secrets store sensitive data like passwords, tokens, keys. Like a safe box for critical information!

### 7. 🗂️ What is a Namespace? 🟡

A) 🗂️ Logical separation of resources in the cluster

B) 🔧 Cluster name

C) 📦 Storage space

D) 🌐 Network space

**Correct Answer**: A) 🗂️ Logical separation of resources in the cluster

> 🏢 Namespaces are like departments in a company. They separate resources for different teams or environments.

### 8. 🎯 What is an Ingress? 🔴

A) 🎯 Manages external HTTP/HTTPS access to services

B) 🔧 Cluster entry point

C) 📦 Load balancer

D) 🌐 Reverse proxy

**Correct Answer**: A) 🎯 Manages external HTTP/HTTPS access to services

> 🚪 Ingress is like a building's reception, directing external traffic to the correct services within the cluster.

### 9. 💾 What is a PersistentVolume? 🔴

A) 💾 Storage independent of Pod lifecycle

B) 🔧 Temporary volume

C) 📦 Container storage

D) 🌐 Network storage

**Correct Answer**: A) 💾 Storage independent of Pod lifecycle

> 🗄️ PersistentVolumes survive Pods. Like an external hard drive that persists even when you change computers!

### 10. 🔄 What is a ReplicaSet? 🟡

A) 🔄 Ensures a specific number of Pods are running

B) 🔧 Pod backup

C) 📦 Replica set

D) 🌐 Replica network

**Correct Answer**: A) 🔄 Ensures a specific number of Pods are running

> 🎭 ReplicaSets maintain the desired number of identical Pods. Like a manager ensuring sufficient staff!

### 11. 📊 What is a DaemonSet? 🔴

A) 📊 Ensures all nodes run a copy of a Pod

B) 🔧 System daemon

C) 📦 Service set

D) 🌐 Configuration set

**Correct Answer**: A) 📊 Ensures all nodes run a copy of a Pod

> 🏭 DaemonSets are perfect for services that need to run on every node: logging, monitoring, storage drivers.

### 12. ⚖️ What is a HorizontalPodAutoscaler? 🔴

A) ⚖️ Automatically scales Pods based on metrics

B) 🔧 Horizontal balancer

C) 📦 Application scaler

D) 🌐 Load distributor

**Correct Answer**: A) ⚖️ Automatically scales Pods based on metrics

> 📈 HPA scales Pods based on CPU, memory, or custom metrics. Like hiring more staff when there's lots of work!

### 13. 🔗 What types of Services exist? 🔴

A) 🔗 ClusterIP, NodePort, LoadBalancer, ExternalName

B) 🔧 Internal, External, Public, Private

C) 📦 HTTP, HTTPS, TCP, UDP

D) 🌐 Frontend, Backend, Database, Cache

**Correct Answer**: A) 🔗 ClusterIP, NodePort, LoadBalancer, ExternalName

> 🌐 Each type exposes services differently: ClusterIP (internal), NodePort (node port), LoadBalancer (cloud), ExternalName (DNS).

### 14. 🎮 What is kubectl? 🟢

A) 🎮 Command-line client for Kubernetes

B) 🔧 Master component

C) 📦 Kubernetes API

D) 🌐 Web dashboard

**Correct Answer**: A) 🎮 Command-line client for Kubernetes

> 🕹️ kubectl is your remote control for Kubernetes. Like a universal remote for managing your entire cluster!

### 15. 🏗️ What are master and worker nodes? 🟡

A) 🏗️ Master manages cluster, workers run applications

B) 🔧 Master stores data, workers process

C) 📦 Master is primary, worker is secondary

D) 🌐 Master connects, worker works

**Correct Answer**: A) 🏗️ Master manages cluster, workers run applications

> 👑 The master (control plane) makes decisions, workers (worker nodes) execute Pods. Like a manager and their employees!

### 16. 📋 What is a Job in Kubernetes? 🔴

A) 📋 Runs Pods until completing a specific task

B) 🔧 Maintenance work

C) 📦 Scheduled task

D) 🌐 Network job

**Correct Answer**: A) 📋 Runs Pods until completing a specific task

> ✅ Jobs execute tasks that must complete: batch processing, migrations, backups. Like assigning a specific task with a deadline!

### 17. ⏰ What is a CronJob? 🔴

A) ⏰ Job that runs on a scheduled time

B) 🔧 System cron task

C) 📦 Timed job

D) 🌐 Task scheduler

**Correct Answer**: A) ⏰ Job that runs on a scheduled time

> 📅 CronJobs are like scheduled tasks: daily backups, weekly reports, monthly cleanups. Temporal automation!

### 18. 🔧 What components does the Control Plane have? 🔴

A) 🔧 API Server, etcd, Scheduler, Controller Manager

B) 🏗️ Master, Worker, Storage, Network

C) 📦 Frontend, Backend, Database, Cache

D) 🌐 Load Balancer, Proxy, Gateway, Router

**Correct Answer**: A) 🔧 API Server, etcd, Scheduler, Controller Manager

> 🧠 The Control Plane is the brain: API Server (communicates), etcd (stores), Scheduler (plans), Controller Manager (maintains state).

### 19. 🌐 What is CNI in Kubernetes? 🔴

A) 🌐 Standard interface for network plugins

B) 🔧 Internal network component

C) 📦 Network controller

D) 🎯 Network API

**Correct Answer**: A) 🌐 Standard interface for network plugins

> 🔌 CNI (Container Network Interface) enables different network solutions: Calico, Flannel, Weave. Like different types of internet connection!

### 20. 🛡️ What is RBAC in Kubernetes? 🔴

A) 🛡️ Role-based access control

B) 🔧 Authentication system

C) 📦 Role configuration

D) 🌐 Network control

**Correct Answer**: A) 🛡️ Role-based access control

> 🔐 RBAC defines who can do what in the cluster. Roles + RoleBindings = specific permissions. Like access badges in a company!

### 21. 🎯 What are Kubernetes best practices? 🔴

A) 🎯 Use namespaces, resource limits, health checks, security policies

B) 🔧 Only use Pods directly

C) 📦 Don't use Services

D) 🌐 Avoid ConfigMaps

**Correct Answer**: A) 🎯 Use namespaces, resource limits, health checks, security policies

> 🏆 Best practices: organize with namespaces, define resource limits, implement liveness/readiness probes, use RBAC, apply network policies. Professional Kubernetes!
