# ☸️ Advanced Kubernetes - Quiz 4

## Questions

### 1. ❓ What is a Custom Resource Definition (CRD) in Kubernetes? 🔴

A) 📝 A way to extend the Kubernetes API with custom resources

B) ⚙️ A special type of pod for custom applications

C) 🔧 A custom controller to manage resources

D) 🐳 A custom namespace to organize resources

**Correct Answer**: A) 📝 A way to extend the Kubernetes API with custom resources

💡 CRDs allow you to define new custom resource types in Kubernetes, extending cluster functionality without modifying the base code.

### 2. 🧠 What is the purpose of an Operator in Kubernetes? 🔴

A) 📝 Automate complex operations and manage application lifecycles

B) ⚙️ Manage user access to cluster resources

C) 🔧 Configure network and security policies

D) 🐳 Monitor cluster performance

**Correct Answer**: A) 📝 Automate complex operations and manage application lifecycles

💡 Operators encapsulate operational knowledge in software, automating complex tasks like backups, updates, and disaster recovery.

### 3. 🤔 What is an Admission Controller in Kubernetes? 🔴

A) 📝 A plugin that intercepts and validates requests before processing

B) ⚙️ A controller that manages pod admission to the cluster

C) 🔧 A service that validates resource configuration

D) 🐳 A component that manages user authentication

**Correct Answer**: A) 📝 A plugin that intercepts and validates requests before processing

💡 Admission Controllers intercept requests to the API server and can modify, reject, or validate resources before they are stored in etcd.

### 4. 🔍 What is the purpose of a Mutating Admission Controller? 🔴

A) 📝 Modify resources before they are stored in etcd

B) ⚙️ Validate resources without modifying them

C) 🔧 Reject resources that don't meet policies

D) 🐳 Manage resource lifecycles

**Correct Answer**: A) 📝 Modify resources before they are stored in etcd

💡 Mutating Admission Controllers can modify resources (like adding labels, sidecars, or configurations) before they are processed by the cluster.

### 5. ❓ What is a Validating Admission Controller? 🔴

A) 📝 Validate resources without modifying them

B) ⚙️ Modify resources before they are stored

C) 🔧 Manage resource replication

D) 🐳 Control resource access

**Correct Answer**: A) 📝 Validate resources without modifying them

💡 Validating Admission Controllers verify that resources meet specific policies without modifying them, rejecting requests that violate rules.

### 6. 🧠 What is the purpose of a Service Mesh in Kubernetes? 🔴

A) 📝 Manage communication between services transparently

B) ⚙️ Manage persistent storage

C) 🔧 Configure network policies

D) 🐳 Monitor cluster performance

**Correct Answer**: A) 📝 Manage communication between services transparently

💡 Service Meshes like Istio provide functionalities like load balancing, service discovery, observability, and security policies for service communication.

### 7. 🤔 What is a HorizontalPodAutoscaler (HPA)? 🔴

A) 📝 Automatically scale the number of pods based on metrics

B) ⚙️ Vertically scale pod resources

C) 🔧 Manage pod distribution across nodes

D) 🐳 Control access to cluster resources

**Correct Answer**: A) 📝 Automatically scale the number of pods based on metrics

💡 HPA automatically adjusts the number of replicas in a Deployment based on metrics like CPU, memory, or custom metrics.

### 8. 🔍 What is the purpose of a VerticalPodAutoscaler (VPA)? 🔴

A) 📝 Automatically adjust CPU and memory resources of pods

B) ⚙️ Horizontally scale the number of pods

C) 🔧 Manage pod distribution across nodes

D) 🐳 Control network policies

**Correct Answer**: A) 📝 Automatically adjust CPU and memory resources of pods

💡 VPA automatically optimizes CPU and memory requests and limits of pods based on actual usage, improving resource utilization.

### 9. ❓ What is a Pod Disruption Budget (PDB)? 🔴

A) 📝 Limit the number of pods that can be disrupted simultaneously

B) ⚙️ Manage cluster resource budget

C) 🔧 Control resource access

D) 🐳 Monitor pod performance

**Correct Answer**: A) 📝 Limit the number of pods that can be disrupted simultaneously

💡 PDBs protect applications during maintenance operations by limiting how many pods can be down at the same time.

### 10. 🧠 What is the purpose of a Network Policy in Kubernetes? 🔴

A) 📝 Control network traffic between pods and namespaces

B) ⚙️ Manage cluster network configuration

C) 🔧 Configure load balancers

D) 🐳 Monitor network traffic

**Correct Answer**: A) 📝 Control network traffic between pods and namespaces

💡 Network Policies allow you to define pod-level firewall rules, controlling which pods can communicate with each other and external services.

### 11. 🤔 What is a Pod Security Policy (PSP)? 🔴

A) 📝 Define security policies for pods before they are created

B) ⚙️ Manage user authentication

C) 🔧 Configure network policies

D) 🐳 Control resource access

**Correct Answer**: A) 📝 Define security policies for pods before they are created

💡 PSPs control security aspects like privileges, capabilities, and volumes that can be used by pods, improving cluster security.

### 12. 🔍 What is the purpose of a ResourceQuota in Kubernetes? 🔴

A) 📝 Limit total resource consumption in a namespace

B) ⚙️ Manage resource distribution across nodes

C) 🔧 Control resource access

D) 🐳 Monitor resource usage

**Correct Answer**: A) 📝 Limit total resource consumption in a namespace

💡 ResourceQuotas set limits on total resource consumption (CPU, memory, pods) within a specific namespace.

### 13. ❓ What is a LimitRange in Kubernetes? 🔴

A) 📝 Set default limits for pod resources in a namespace

B) ⚙️ Limit total resources in a namespace

C) 🔧 Control resource access

D) 🐳 Monitor cluster performance

**Correct Answer**: A) 📝 Set default limits for pod resources in a namespace

💡 LimitRanges set default values and limits for CPU and memory requests and limits of individual pods.

### 14. 🧠 What is the purpose of a ClusterRole in Kubernetes? 🔴

A) 📝 Define permissions that apply to the entire cluster

B) ⚙️ Manage namespace-specific roles

C) 🔧 Control access to specific resources

D) 🐳 Monitor cluster activity

**Correct Answer**: A) 📝 Define permissions that apply to the entire cluster

💡 ClusterRoles define permissions that apply at the cluster level, not limited to a specific namespace.

### 15. 🤔 What is a ClusterRoleBinding in Kubernetes? 🔴

A) 📝 Bind a ClusterRole to users, groups, or ServiceAccounts

B) ⚙️ Manage namespace-specific roles

C) 🔧 Control access to specific resources

D) 🐳 Monitor cluster activity

**Correct Answer**: A) 📝 Bind a ClusterRole to users, groups, or ServiceAccounts

💡 ClusterRoleBindings assign ClusterRole permissions to entities, allowing access to resources across the entire cluster.

### 16. 🔍 What is the purpose of a ServiceAccount in Kubernetes? 🔴

A) 📝 Provide identity for pods communicating with the API

B) ⚙️ Manage cluster user accounts

C) 🔧 Control resource access

D) 🐳 Monitor pod activity

**Correct Answer**: A) 📝 Provide identity for pods communicating with the API

💡 ServiceAccounts provide identity to pods, allowing them to authenticate with the API server and access resources according to their permissions.

### 17. ❓ What is a PersistentVolumeClaim (PVC) in Kubernetes? 🔴

A) 📝 Request persistent storage from the cluster

B) ⚙️ Manage temporary volumes

C) 🔧 Configure storage policies

D) 🐳 Monitor storage usage

**Correct Answer**: A) 📝 Request persistent storage from the cluster

💡 PVCs allow users to request persistent storage without knowing the details of the storage implementation.

### 18. 🧠 What is the purpose of a StorageClass in Kubernetes? 🔴

A) 📝 Define different types of storage available in the cluster

B) ⚙️ Manage temporary volumes

C) 🔧 Configure backup policies

D) 🐳 Monitor storage performance

**Correct Answer**: A) 📝 Define different types of storage available in the cluster

💡 StorageClasses allow administrators to define different types of storage with different characteristics and policies.

### 19. 🤔 What is a ConfigMap in Kubernetes? 🔴

A) 📝 Store non-confidential configuration data

B) ⚙️ Manage secrets and credentials

C) 🔧 Configure network policies

D) 🐳 Monitor cluster configuration

**Correct Answer**: A) 📝 Store non-confidential configuration data

💡 ConfigMaps allow you to decouple configuration from container images, making applications more portable.

### 20. 🔍 What is the purpose of a Secret in Kubernetes? 🔴

A) 📝 Store sensitive data like passwords and tokens

B) ⚙️ Manage non-confidential configurations

C) 🔧 Configure network policies

D) 🐳 Monitor cluster security

**Correct Answer**: A) 📝 Store sensitive data like passwords and tokens

💡 Secrets store sensitive information like passwords, OAuth tokens, and SSH keys, providing a secure way to manage credentials.

### 21. ❓ What is a DaemonSet in Kubernetes? 🔴

A) 📝 Ensure all nodes run a copy of a specific pod

B) ⚙️ Manage stateful applications

C) 🔧 Configure network policies

D) 🐳 Monitor cluster performance

**Correct Answer**: A) 📝 Ensure all nodes run a copy of a specific pod

💡 DaemonSets are useful for running system services like monitoring agents, log collectors, or storage agents on each node.

🔴
