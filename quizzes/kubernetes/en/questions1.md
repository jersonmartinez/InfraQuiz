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

C) 📦 Daemon package

D) 🌐 Network daemon

**Correct Answer**: A) 📊 Ensures all nodes run a copy of a Pod

> 🔄 DaemonSets run exactly one Pod on each node. Like having a security guard on each floor of a building!

### 12. 🔧 How do you create a Pod from command line? 🟡

A) 🔧 `kubectl run my-pod --image=nginx`

B) 🔄 `kube create pod my-pod nginx`

C) 📦 `k8s run my-pod nginx`

D) 🌐 `docker run my-pod nginx`

**Correct Answer**: A) 🔧 `kubectl run my-pod --image=nginx`

> ⚡ `kubectl run` is the imperative way to create Pods. For production, prefer declarative YAML files!

### 13. 📋 How do you get information about Pods? 🟢

A) 📋 `kubectl get pods`

B) 🔄 `kube list pods`

C) 📦 `k8s show pods`

D) 🌐 `docker ps pods`

**Correct Answer**: A) 📋 `kubectl get pods`

> 🔍 `kubectl get` shows basic information. Use `kubectl describe pod <name>` for detailed information!

### 14. 🔍 How do you see Pod logs? 🟢

A) 🔍 `kubectl logs <pod-name>`

B) 🔄 `kube logs <pod-name>`

C) 📦 `k8s logs <pod-name>`

D) 🌐 `docker logs <pod-name>`

**Correct Answer**: A) 🔍 `kubectl logs <pod-name>`

> 📝 Use `kubectl logs -f <pod-name>` to follow logs in real-time. Add `-c <container-name>` for multi-container Pods!

### 15. 🏗️ How do you apply a YAML configuration? 🟡

A) 🏗️ `kubectl apply -f config.yaml`

B) 🔄 `kube apply config.yaml`

C) 📦 `k8s deploy config.yaml`

D) 🌐 `docker apply config.yaml`

**Correct Answer**: A) 🏗️ `kubectl apply -f config.yaml`

> 📄 `kubectl apply` is declarative - it creates or updates resources. Use `kubectl create` for imperative creation!

### 16. 🗑️ How do you delete a Pod? 🟢

A) 🗑️ `kubectl delete pod <pod-name>`

B) 🔄 `kube delete <pod-name>`

C) 📦 `k8s remove <pod-name>`

D) 🌐 `docker rm <pod-name>`

**Correct Answer**: A) 🗑️ `kubectl delete pod <pod-name>`

> ⚠️ Be careful! Deleting Pods managed by Deployments will trigger recreation. Delete the Deployment instead!

### 17. 🌐 How do you expose a Deployment as a Service? 🟡

A) 🌐 `kubectl expose deployment <name> --type=LoadBalancer --port=80`

B) 🔄 `kube expose <name> --port=80`

C) 📦 `k8s service <name> --port=80`

D) 🔧 `docker expose <name> --port=80`

**Correct Answer**: A) 🌐 `kubectl expose deployment <name> --type=LoadBalancer --port=80`

> 🚪 This creates a Service that routes traffic to Pods managed by the Deployment. Choose the right service type for your needs!

### 18. 🔧 How do you scale a Deployment? 🟡

A) 🔧 `kubectl scale deployment <name> --replicas=5`

B) 🔄 `kube scale <name> --replicas=5`

C) 📦 `k8s scale <name> 5`

D) 🌐 `docker scale <name> 5`

**Correct Answer**: A) 🔧 `kubectl scale deployment <name> --replicas=5`

> 📈 Scaling adjusts the number of Pod replicas. Kubernetes will create or destroy Pods to match the desired count!

### 19. 🔍 How do you get detailed information about a resource? 🟡

A) 🔍 `kubectl describe <resource-type> <name>`

B) 🔄 `kube describe <name>`

C) 📦 `k8s info <name>`

D) 🌐 `docker inspect <name>`

**Correct Answer**: A) 🔍 `kubectl describe <resource-type> <name>`

> 📋 `kubectl describe` shows detailed information including events. Very useful for troubleshooting!

### 20. ⚙️ How do you edit a resource directly? 🔴

A) ⚙️ `kubectl edit <resource-type> <name>`

B) 🔄 `kube edit <name>`

C) 📦 `k8s modify <name>`

D) 🌐 `vim <name>`

**Correct Answer**: A) ⚙️ `kubectl edit <resource-type> <name>`

> ✏️ Opens the resource in your default editor. Changes are applied immediately. Prefer declarative YAML files for production!
