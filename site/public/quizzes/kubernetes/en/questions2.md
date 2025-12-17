# ☸️ Kubernetes - Questions 2

## Questions

### 1. 🔧 What is a StatefulSet? 🔴

A) 🔧 Manages stateful applications with stable network identities

B) 🔄 Manages stateless applications

C) 📦 Manages database applications only

D) 🌐 Manages network applications

**Correct Answer**: A) 🔧 Manages stateful applications with stable network identities

💡 StatefulSets provide stable, unique network identifiers, stable persistent storage, and ordered, graceful deployment and scaling! 🗄️

### 2. 🚀 What is a Job in Kubernetes? 🟡

A) 🚀 Runs a task to completion (not continuously)

B) 🔄 Runs a continuous service

C) 📦 Runs a background process

D) 🌐 Runs a network service

**Correct Answer**: A) 🚀 Runs a task to completion (not continuously)

⚡ Jobs are perfect for batch processing, data migrations, or one-time tasks. They create Pods and ensure they complete successfully! ✅

### 3. 🔍 What is a CronJob? 🔴

A) 🔍 Runs Jobs on a time-based schedule

B) 🔄 Runs Jobs continuously

C) 📦 Runs Jobs randomly

D) 🌐 Runs Jobs on demand

**Correct Answer**: A) 🔍 Runs Jobs on a time-based schedule

⏰ CronJobs are like cron in Linux but for Kubernetes! Perfect for backups, maintenance tasks, or periodic data processing! 🕐

### 4. 📦 What is a HorizontalPodAutoscaler (HPA)? 🔴

A) 📦 Automatically scales Pods based on CPU/memory usage

B) 🔄 Manually scales Pods

C) 📦 Scales nodes automatically

D) 🌐 Scales services automatically

**Correct Answer**: A) 📦 Automatically scales Pods based on CPU/memory usage

📈 HPA monitors resource usage and automatically adjusts the number of Pods. Set min/max replicas and target CPU/memory! 🎯

### 5. 🔄 What is a PodDisruptionBudget (PDB)? 🔴

A) 🔄 Limits voluntary disruptions during maintenance

B) 🔧 Prevents all Pod disruptions

C) 📦 Manages Pod scheduling

D) 🌐 Manages Pod networking

**Correct Answer**: A) 🔄 Limits voluntary disruptions during maintenance

🛡️ PDB ensures availability during voluntary disruptions like node maintenance or cluster upgrades. Set minAvailable or maxUnavailable! 🚫

### 6. 🌟 What is a NetworkPolicy? 🔴

A) 🌟 Controls Pod-to-Pod communication within the cluster

B) 🔄 Controls external network access

C) 📦 Controls storage access

D) 🌐 Controls DNS resolution

**Correct Answer**: A) 🌟 Controls Pod-to-Pod communication within the cluster

🔒 NetworkPolicies define which Pods can communicate with each other. Like a firewall for your cluster! 🚪

### 7. 🔧 What is a ResourceQuota? 🔴

A) 🔧 Limits resource consumption per namespace

B) 🔄 Limits resource consumption per Pod

C) 📦 Limits resource consumption per node

D) 🌐 Limits resource consumption per cluster

**Correct Answer**: A) 🔧 Limits resource consumption per namespace

💰 ResourceQuotas prevent one namespace from consuming all cluster resources. Set limits for CPU, memory, storage, and object counts! 📊

### 8. 📋 What is a LimitRange? 🟡

A) 📋 Sets default resource limits for Pods in a namespace

B) 🔄 Sets resource limits for the entire cluster

C) 📦 Sets resource limits for nodes

D) 🌐 Sets resource limits for services

**Correct Answer**: A) 📋 Sets default resource limits for Pods in a namespace

📏 LimitRanges provide defaults and constraints for resource requests/limits. Ensures Pods have reasonable resource specifications! 📐

### 9. 🔄 What is a PodSecurityPolicy (PSP)? 🔴

A) 🔄 Controls security-sensitive aspects of Pod specification

B) 🔧 Controls Pod scheduling

C) 📦 Controls Pod storage

D) 🌐 Controls Pod networking

**Correct Answer**: A) 🔄 Controls security-sensitive aspects of Pod specification

🛡️ PSPs control privileged containers, host networking, volume types, and user/group IDs. Note: PSPs are deprecated in favor of Pod Security Standards! ⚠️

### 10. 🎯 What is a Pod Security Standard? 🟡

A) 🎯 Defines security levels (Privileged, Baseline, Restricted) for Pods

B) 🔄 Defines network security for Pods

C) 📦 Defines storage security for Pods

D) 🌐 Defines DNS security for Pods

**Correct Answer**: A) 🎯 Defines security levels (Privileged, Baseline, Restricted) for Pods

🔐 Pod Security Standards are the modern replacement for PSPs. Use admission controllers to enforce these security policies! 🛡️

### 11. 🔍 What is a CustomResourceDefinition (CRD)? 🔴

A) 🔍 Extends Kubernetes API with custom resources

B) 🔄 Creates custom Pods

C) 📦 Creates custom services

D) 🌐 Creates custom networks

**Correct Answer**: A) 🔍 Extends Kubernetes API with custom resources

🚀 CRDs let you define your own resource types! Used by operators, Helm charts, and custom controllers to extend Kubernetes functionality! ⚡

### 12. 🚀 What is a Kubernetes Operator? 🔴

A) 🚀 Extends Kubernetes with application-specific operational knowledge

B) 🔄 Manages basic Kubernetes resources

C) 📦 Manages only Pods

D) 🌐 Manages only services

**Correct Answer**: A) 🚀 Extends Kubernetes with application-specific operational knowledge

🤖 Operators automate complex application operations like backups, updates, and scaling. They use CRDs and custom controllers! 🧠

### 13. 🔧 What is a Helm Chart? 🟡

A) 🔧 Package manager for Kubernetes applications

B) 🔄 Package manager for Docker images

C) 📦 Package manager for Linux packages

D) 🌐 Package manager for cloud resources

**Correct Answer**: A) 🔧 Package manager for Kubernetes applications

📦 Helm Charts package Kubernetes resources into deployable units. Use `helm install` to deploy complex applications with one command! 🚀

### 14. 🌟 What is a Kubernetes Service Mesh? 🔴

A) 🌟 Infrastructure layer for service-to-service communication

B) 🔄 Basic service networking

C) 📦 Pod-to-Pod communication

D) 🌐 External network access

**Correct Answer**: A) 🌟 Infrastructure layer for service-to-service communication

🕸️ Service meshes like Istio provide advanced traffic management, security, and observability. Handle routing, retries, circuit breakers, and more! 🎛️

### 15. 🔄 What is a Kubernetes Ingress Controller? 🟡

A) 🔄 Implements Ingress rules and manages external access

B) 🔧 Creates Ingress resources

C) 📦 Manages internal services

D) 🌐 Manages DNS records

**Correct Answer**: A) 🔄 Implements Ingress rules and manages external access

🚪 Ingress Controllers (like nginx, Traefik, or cloud-specific ones) implement the Ingress API and handle external traffic routing! 🛣️

### 16. 📦 What is a Kubernetes Volume? 🟡

A) 📦 Storage abstraction that persists beyond Pod lifecycle

B) 🔄 Temporary storage for Pods

C) 📦 Network storage only

D) 🌐 Memory storage only

**Correct Answer**: A) 📦 Storage abstraction that persists beyond Pod lifecycle

💾 Volumes provide persistent storage for Pods. Types include emptyDir, hostPath, PersistentVolumeClaim, and many more! 🗂️

### 17. 🚀 What is a PersistentVolume (PV)? 🔴

A) 🚀 Storage resource in the cluster with specific capacity and access modes

B) 🔄 Temporary storage for Pods

C) 📦 Network storage configuration

D) 🌐 Memory storage configuration

**Correct Answer**: A) 🚀 Storage resource in the cluster with specific capacity and access modes

💿 PVs are storage resources that can be claimed by Pods. They define storage capacity, access modes, and storage class! 📊

### 18. 🔧 What is a PersistentVolumeClaim (PVC)? 🟡

A) 🔧 Request for storage by a Pod

B) 🔄 Request for network access

C) 📦 Request for CPU resources

D) 🌐 Request for memory resources

**Correct Answer**: A) 🔧 Request for storage by a Pod

📝 PVCs request storage from PVs. They specify size, access modes, and storage class. Pods use PVCs to get persistent storage! 🔗

### 19. 🌟 What is a StorageClass? 🟡

A) 🌟 Defines storage provisioner and parameters

B) 🔄 Defines network classes

C) 📦 Defines Pod classes

D) 🌐 Defines service classes

**Correct Answer**: A) 🌟 Defines storage provisioner and parameters

⚙️ StorageClasses define how storage is provisioned. They specify the provisioner (like AWS EBS, GCP PD) and parameters like IOPS, type, etc.! 🔧

### 20. 🔄 What is a Kubernetes ConfigMap? 🟡

A) 🔄 Stores non-sensitive configuration data

B) 🔐 Stores sensitive configuration data

C) 📦 Stores binary configuration data

D) 🌐 Stores network configuration data

**Correct Answer**: A) 🔄 Stores non-sensitive configuration data

📋 ConfigMaps store configuration like environment variables, command-line arguments, or configuration files. Mount them into Pods! 📄

### 21. 🎯 What is the best practice for Kubernetes security? 🔴

A) 🎯 Use RBAC, network policies, Pod security standards, and regular updates

B) 🔄 Use only basic authentication

C) 📦 Ignore security policies

D) 🌐 Use default configurations only

**Correct Answer**: A) 🎯 Use RBAC, network policies, Pod security standards, and regular updates

🛡️ Production clusters need: Role-Based Access Control (RBAC), NetworkPolicies, Pod Security Standards, regular security updates, and proper secret management. Security is paramount! 🔒
