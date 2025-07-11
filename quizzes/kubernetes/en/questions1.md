# ☸️ Kubernetes - Questions 1

## Questions

### 1. ☸️ What is Kubernetes? 🟢

A) ☸️ `Container orchestration platform`
B) 🔧 `Virtualization system`
C) 📦 `Package manager`
D) 🌐 `Web server`

**Correct Answer**: A) ☸️ `Container orchestration platform`

> 💡 Kubernetes automates the deployment, scaling, and management of containerized applications. Like a conductor for your applications!

### 2. 🐳 What is a Pod in Kubernetes? 🟢

A) 🐳 `Smallest deployable unit`
B) 🔧 `Individual container`
C) 📦 `Application package`
D) 🌐 `Network service`

**Correct Answer**: A) 🐳 `Smallest deployable unit`

> 📘 A Pod can contain one or more containers that share resources. Like a room where your applications live!

### 3. 🔄 What is a Deployment? 🟡

A) 🔄 `Resource that manages desired state of Pods`
B) 🔧 `Installation process`
C) 📦 `Deployment package`
D) 🌐 `Network configuration`

**Correct Answer**: A) 🔄 `Resource that manages desired state of Pods`

> ⚡ Deployments ensure the correct number of Pods are running. Like a supervisor that keeps everything working!

### 4. 🌐 What is a Service? 🟡

A) 🌐 `Abstraction that exposes applications`
B) 🔧 `System service`
C) 📦 `Network package`
D) ⚙️ `Network configuration`

**Correct Answer**: A) 🌐 `Abstraction that exposes applications`

> 💡 Services allow applications to communicate with each other. Like a phone directory for your applications!

### 5. 📦 What is a ConfigMap? 🟡

A) 📦 `Store non-sensitive configuration`
B) 🔧 `Configuration file`
C) 📄 `Configuration document`
D) 🌐 `Network configuration`

**Correct Answer**: A) 📦 `Store non-sensitive configuration`

> 🎯 ConfigMaps store configuration data that applications can use. Like a configuration file in the cloud!

### 6. 🔐 What is a Secret? 🟡

A) 🔐 `Store sensitive data securely`
B) 🔒 `Access key`
C) 🛡️ `Encrypted data`
D) 🔑 `Password`

**Correct Answer**: A) 🔐 `Store sensitive data securely`

> 📘 Secrets store passwords, tokens, and other sensitive data. Like a safe for your secrets!

### 7. 📊 What is a Namespace? 🟢

A) 📊 `Logical grouping of resources`
B) 🔧 `Name space`
C) 📦 `Resource package`
D) 🌐 `Virtual network`

**Correct Answer**: A) 📊 `Logical grouping of resources`

> ⚡ Namespaces allow organizing resources into logical groups. Like having different departments in a company!

### 8. 🔄 What is a ReplicaSet? 🟡

A) 🔄 `Maintain specific number of Pods`
B) 🔧 `Replicate files`
C) 📦 `Duplicate packages`
D) 🌐 `Copy services`

**Correct Answer**: A) 🔄 `Maintain specific number of Pods`

> 💡 ReplicaSets ensure the correct number of Pods are always running. Like having an automatic backup system!

### 9. 🌐 What is an Ingress? 🟡

A) 🌐 `Manage external access to services`
B) 🔧 `Network entry`
C) 📦 `Gateway`
D) ⚙️ `Access configuration`

**Correct Answer**: A) 🌐 `Manage external access to services`

> 🎯 Ingress controls how external traffic reaches your applications. Like a doorman who directs visitors!

### 10. 💾 What is a PersistentVolume? 🟡

A) 💾 `Persistent storage for applications`
B) 🔧 `Disk volume`
C) 📦 `Temporary storage`
D) 🌐 `Storage network`

**Correct Answer**: A) 💾 `Persistent storage for applications`

> 📘 PersistentVolumes provide storage that survives restarts. Like a hard drive that doesn't get erased!

### 11. 🔧 What is kubectl? 🟢

A) 🔧 `Command line tool for Kubernetes`
B) 🔧 `Cluster configurator`
C) 📦 `Package manager`
D) 🌐 `Network client`

**Correct Answer**: A) 🔧 `Command line tool for Kubernetes`

> ⚡ kubectl is the main tool for interacting with Kubernetes clusters. Like the remote control for your cluster!

### 12. 🎯 What is a Node? 🟢

A) 🎯 `Physical or virtual machine that runs Pods`
B) 🔧 `Connection point`
C) 📦 `Resource package`
D) 🌐 `Network server`

**Correct Answer**: A) 🎯 `Physical or virtual machine that runs Pods`

> 💡 Nodes are the machines that run your applications. Like the workers in your factory!

### 13. 🔄 What is a DaemonSet? 🟡

A) 🔄 `Run a Pod on each Node`
B) 🔧 `System service`
C) 📦 `Monitoring package`
D) 🌐 `Network service`

**Correct Answer**: A) 🔄 `Run a Pod on each Node`

> 🎯 DaemonSets ensure certain Pods run on all Nodes. Like having a supervisor in each plant!

### 14. 📊 What is a Job? 🟡

A) 📊 `Run tasks that complete`
B) 🔧 `System work`
C) 📦 `Task package`
D) 🌐 `Network task`

**Correct Answer**: A) 📊 `Run tasks that complete`

> 📘 Jobs run tasks that have a defined start and end. Like a temporary worker who does a specific job!

### 15. 🔄 What is a CronJob? 🟡

A) 🔄 `Run Jobs on scheduled times`
B) 🔧 `Scheduled task`
C) 📦 `Schedule package`
D) 🌐 `Network scheduling`

**Correct Answer**: A) 🔄 `Run Jobs on scheduled times`

> ⚡ CronJobs run tasks at specific times. Like an alarm clock for your applications!

### 16. 🔍 What is a Label? 🟢

A) 🔍 `Label to organize resources`
B) 🔧 `File mark`
C) 📦 `Package label`
D) 🌐 `Network label`

**Correct Answer**: A) 🔍 `Label to organize resources`

> 💡 Labels allow organizing and selecting resources. Like putting labels on your files!

### 17. 🔍 What is a Selector? 🟡

A) 🔍 `Criteria to select resources`
B) 🔧 `File selector`
C) 📦 `Package selector`
D) 🌐 `Network selector`

**Correct Answer**: A) 🔍 `Criteria to select resources`

> 🎯 Selectors allow finding resources based on Labels. Like using a filter to find what you're looking for!

### 18. 🔄 What is a Rolling Update? 🟡

A) 🔄 `Update applications without downtime`
B) 🔧 `System update`
C) 📦 `Package update`
D) 🌐 `Network update`

**Correct Answer**: A) 🔄 `Update applications without downtime`

> 📘 Rolling Updates update Pods gradually to avoid interruptions. Like changing car tires while driving!

### 19. 🔍 What is a Health Check? 🟡

A) 🔍 `Verify application status`
B) 🔧 `System review`
C) 📦 `Package verification`
D) 🌐 `Network check`

**Correct Answer**: A) 🔍 `Verify application status`

> ⚡ Health Checks verify that applications are working correctly. Like a doctor who checks your applications!

### 20. 🔄 What is a Horizontal Pod Autoscaler (HPA)? 🟡

A) 🔄 `Automatically scale number of Pods`
B) 🔧 `System autoscaler`
C) 📦 `Package scaler`
D) 🌐 `Network scaler`

**Correct Answer**: A) 🔄 `Automatically scale number of Pods`

> 💡 HPA automatically adjusts the number of Pods based on demand. Like a thermostat that adjusts temperature!

### 21. 🔍 What is a Resource Quota? 🟡

A) 🔍 `Limit resource usage per Namespace`
B) 🔧 `System limit`
C) 📦 `Package quota`
D) 🌐 `Network limit`

**Correct Answer**: A) 🔍 `Limit resource usage per Namespace`

> 📘 Resource Quotas control how many resources each Namespace can use. Like a budget for each department!
