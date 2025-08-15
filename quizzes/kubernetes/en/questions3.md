# ☸️ Kubernetes - Questions 3

## Questions

### 1. 🔧 What is a VerticalPodAutoscaler (VPA)? 🔴

A) 🔧 Automatically adjusts Pod resource requests and limits

B) 🔄 Manually adjusts Pod resources

C) 📦 Scales Pods horizontally

D) 🌐 Scales nodes vertically

**Correct Answer**: A) 🔧 Automatically adjusts Pod resource requests and limits

💡 VPA automatically sets CPU and memory requests/limits based on usage patterns. Perfect for optimizing resource allocation! 📊

### 2. 🚀 What is a Cluster Autoscaler? 🔴

A) 🚀 Automatically adds/removes nodes based on Pod scheduling needs

B) 🔄 Manually scales the cluster

C) 📦 Scales only Pods

D) 🌐 Scales only services

**Correct Answer**: A) 🚀 Automatically adds/removes nodes based on Pod scheduling needs

⚡ Cluster Autoscaler ensures you have enough nodes for your Pods while keeping costs down. Works with cloud providers! 💰

### 3. 🔍 What is a Pod Topology Spread Constraint? 🔴

A) 🔍 Controls how Pods are distributed across failure domains

B) 🔄 Controls Pod scheduling

C) 📦 Controls Pod storage

D) 🌐 Controls Pod networking

**Correct Answer**: A) 🔍 Controls how Pods are distributed across failure domains

🔄 Ensures Pods are spread across zones, nodes, or other topology domains for high availability! 🎯

### 4. 📦 What is a Pod Affinity? 🟡

A) 📦 Rules that determine where Pods are scheduled relative to other Pods

B) 🔄 Rules that prevent Pod scheduling

C) 📦 Rules that control Pod storage

D) 🌐 Rules that control Pod networking

**Correct Answer**: A) 📦 Rules that determine where Pods are scheduled relative to other Pods

💡 Use Pod Affinity to co-locate related Pods (e.g., web server with cache) or spread them apart for high availability! 🎯

### 5. 🔄 What is a Pod Anti-Affinity? 🟡

A) 🔄 Rules that prevent Pods from being scheduled on the same node

B) 🔧 Rules that force Pod scheduling

C) 📦 Rules that control Pod storage

D) 🌐 Rules that control Pod networking

**Correct Answer**: A) 🔄 Rules that prevent Pods from being scheduled on the same node

🛡️ Pod Anti-Affinity ensures high availability by preventing all replicas from running on the same node! 🚫

### 6. 🌟 What is a Taint and Toleration? 🔴

A) 🌟 Mechanism to repel Pods from nodes unless they tolerate the taint

B) 🔄 Mechanism to attract Pods to nodes

C) 📦 Mechanism to control Pod storage

D) 🌐 Mechanism to control Pod networking

**Correct Answer**: A) 🌟 Mechanism to repel Pods from nodes unless they tolerate the taint

🚫 Taints mark nodes as "unwanted" for certain Pods. Tolerations allow Pods to run on tainted nodes! 🎯

### 7. 🔧 What is a Node Selector? 🟡

A) 🔧 Simple way to constrain Pods to nodes with specific labels

B) 🔄 Complex way to control Pod scheduling

C) 📦 Way to control Pod storage

D) 🌐 Way to control Pod networking

**Correct Answer**: A) 🔧 Simple way to constrain Pods to nodes with specific labels

🏷️ Node Selectors use simple key-value pairs to match Pods to nodes. For complex rules, use Node Affinity! ⚡

### 8. 📋 What is a Node Affinity? 🟡

A) 📋 Advanced rules for controlling Pod placement on nodes

B) 🔄 Basic rules for Pod scheduling

C) 📦 Rules for Pod storage

D) 🌐 Rules for Pod networking

**Correct Answer**: A) 📋 Advanced rules for controlling Pod placement on nodes

🎛️ Node Affinity provides flexible, expressive rules for Pod scheduling. Supports hard requirements and soft preferences! 🎯

### 9. 🔄 What is a Pod Priority and Preemption? 🔴

A) 🔄 System that allows high-priority Pods to evict lower-priority ones

B) 🔧 System that prevents Pod eviction

C) 📦 System that controls Pod storage

D) 🌐 System that controls Pod networking

**Correct Answer**: A) 🔄 System that allows high-priority Pods to evict lower-priority ones

⚡ Critical Pods can preempt less important ones when resources are scarce. Set priority classes for different workloads! 🚀

### 10. 🎯 What is a Pod Disruption Budget (PDB)? 🔴

A) 🎯 Limits voluntary disruptions during maintenance operations

B) 🔄 Prevents all Pod disruptions

C) 📦 Controls Pod scheduling

D) 🌐 Controls Pod networking

**Correct Answer**: A) 🎯 Limits voluntary disruptions during maintenance operations

🛡️ PDB ensures availability during voluntary disruptions like node maintenance or cluster upgrades! 🚫

### 11. 🔍 What is a Pod Security Context? 🟡

A) 🔍 Security settings that apply to a Pod and all its containers

B) 🔄 Security settings for the cluster

C) 📦 Security settings for storage

D) 🌐 Security settings for networking

**Correct Answer**: A) 🔍 Security settings that apply to a Pod and all its containers

🔐 Pod Security Context sets user/group IDs, SELinux options, and other security parameters at the Pod level! 🛡️

### 12. 🚀 What is a Container Security Context? 🟡

A) 🚀 Security settings that apply to a specific container

B) 🔄 Security settings for the Pod

C) 📦 Security settings for storage

D) 🌐 Security settings for networking

**Correct Answer**: A) 🚀 Security settings that apply to a specific container

🔒 Container Security Context controls privileged mode, capabilities, and other security settings per container! 🛡️

### 13. 🔧 What is a Pod Lifecycle Hook? 🟡

A) 🔧 Actions that run before or after container lifecycle events

B) 🔄 Actions that run continuously

C) 📦 Actions that control storage

D) 🌐 Actions that control networking

**Correct Answer**: A) 🔧 Actions that run before or after container lifecycle events

⚡ Use PostStart and PreStop hooks for initialization, cleanup, or graceful shutdown! 🎯

### 14. 🌟 What is a Pod Readiness Probe? 🟡

A) 🌟 Determines if a Pod is ready to receive traffic

B) 🔄 Determines if a Pod is alive

C) 📦 Determines if a Pod has storage

D) 🌐 Determines if a Pod has network access

**Correct Answer**: A) 🌟 Determines if a Pod is ready to receive traffic

✅ Readiness Probes ensure Pods only receive traffic when they're truly ready to handle requests! 🚦

### 15. 🔄 What is a Pod Liveness Probe? 🟡

A) 🔄 Determines if a Pod is alive and should be restarted

B) 🔧 Determines if a Pod is ready

C) 📦 Determines if a Pod has storage

D) 🌐 Determines if a Pod has network access

**Correct Answer**: A) 🔄 Determines if a Pod is alive and should be restarted

💓 Liveness Probes detect deadlocks or stuck states and trigger Pod restart when needed! 🔄

### 16. 📦 What is a Pod Startup Probe? 🟡

A) 📦 Disables other probes until Pod startup is complete

B) 🔄 Replaces other probes

C) 📦 Controls Pod storage

D) 🌐 Controls Pod networking

**Correct Answer**: A) 📦 Disables other probes until Pod startup is complete

🚀 Startup Probes are useful for slow-starting containers. Other probes are disabled until startup probe succeeds! ⏱️

### 17. 🚀 What is a Pod Termination Grace Period? 🟡

A) 🚀 Time given to Pod for graceful shutdown before force kill

B) 🔄 Time to start a Pod

C) 📦 Time to access storage

D) 🌐 Time to access network

**Correct Answer**: A) 🚀 Time given to Pod for graceful shutdown before force kill

⏰ Termination Grace Period allows Pods to clean up resources, close connections, and save state before termination! 🧹

### 18. 🔧 What is a Pod Preemption? 🔴

A) 🔧 Process where high-priority Pods evict lower-priority ones

B) 🔄 Process where Pods are scheduled

C) 📦 Process where Pods access storage

D) 🌐 Process where Pods access network

**Correct Answer**: A) 🔧 Process where high-priority Pods evict lower-priority ones

⚡ Preemption ensures critical workloads get resources when needed, even if it means evicting less important Pods! 🚀

### 19. 🌟 What is a Pod Eviction? 🟡

A) 🌟 Process of removing Pods from nodes

B) 🔄 Process of scheduling Pods

C) 📦 Process of accessing storage

D) 🌐 Process of accessing network

**Correct Answer**: A) 🌟 Process of removing Pods from nodes

🚫 Pods can be evicted due to resource pressure, node maintenance, or preemption by higher-priority Pods! 📉

### 20. 🔄 What is a Pod Disruption? 🟡

A) 🔄 Any event that causes a Pod to stop running

B) 🔧 Any event that starts a Pod

C) 📦 Any event that accesses storage

D) 🌐 Any event that accesses network

**Correct Answer**: A) 🔄 Any event that causes a Pod to stop running

⚠️ Pod Disruptions include voluntary actions (maintenance) and involuntary events (hardware failure, resource pressure)! 🚨

### 21. 🎯 What is the best practice for Pod scheduling? 🔴

A) 🎯 Use appropriate affinity/anti-affinity rules, resource limits, and priority classes

B) 🔄 Use only basic scheduling

C) 📦 Ignore scheduling policies

D) 🌐 Use default scheduling only

**Correct Answer**: A) 🎯 Use appropriate affinity/anti-affinity rules, resource limits, and priority classes

🎯 Production deployments need: proper affinity rules for high availability, resource limits to prevent resource hogging, and priority classes for critical workloads. Smart scheduling is key! 🧠
