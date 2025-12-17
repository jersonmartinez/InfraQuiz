# Mixed DevOps Quiz 3 - Advanced

❓ What is the purpose of the CQRS pattern in microservices? 🔴

📝 Separate read and write operations
⚙️ Improve database performance
🧱 Enhance security
📦 Reduce costs

💡 CQRS (Command Query Responsibility Segregation) separates read and write operations to optimize performance and scalability.

---

❓ Which tool is used for distributed tracing in microservices? 🟡

📝 Jaeger
⚙️ Prometheus
🧱 Grafana
📦 ELK Stack

💡 Jaeger is a distributed tracing system that helps monitor and troubleshoot transactions in microservices architectures.

---

❓ What does the bulkhead pattern prevent? 🟡

📝 Resource exhaustion from cascading failures
⚙️ Network congestion
🧱 Database deadlocks
📦 Memory leaks

💡 The bulkhead pattern isolates resources to prevent failures in one part of the system from affecting others.

---

❓ Which pattern is used for handling asynchronous communication? 🟡

📝 Event-driven architecture
⚙️ Request-response
🧱 Synchronous calls
📦 Direct communication

💡 Event-driven architecture uses events to decouple services and enable asynchronous communication patterns.

---

❓ What is the purpose of API versioning? 🟢

📝 Maintain backward compatibility
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 API versioning allows you to maintain backward compatibility while introducing new features or changes.

---

❓ Which tool is used for service mesh implementation? 🟡

📝 Istio
⚙️ Envoy
🧱 Linkerd
📦 All of the above

💡 These are all popular service mesh implementations that provide traffic management, security, and observability.

---

❓ What does the sidecar pattern provide? 🟡

📝 Additional functionality without modifying main service
⚙️ Load balancing
🧱 Service discovery
📦 Authentication

💡 The sidecar pattern attaches additional containers to provide cross-cutting concerns without modifying the main application.

---

❓ Which pattern is used for handling data consistency in distributed systems? 🟡

📝 Eventual consistency
⚙️ Strong consistency
🧱 Immediate consistency
📦 No consistency

💡 Eventual consistency allows systems to achieve consistency over time, which is often necessary in distributed architectures.

---

❓ What is the purpose of health check endpoints? 🟢

📝 Monitor service health and readiness
⚙️ Track user authentication
🧱 Monitor database performance
📦 Track API usage

💡 Health check endpoints provide information about service health, readiness, and liveness for monitoring systems.

---

❓ Which tool is used for configuration management in microservices? 🟡

📝 Consul
⚙️ etcd
🧱 ZooKeeper
📦 All of the above

💡 These tools provide distributed configuration management and service discovery for microservices architectures.

---

❓ What does the ambassador pattern provide? 🟡

📝 Out-of-process communication logic
⚙️ In-process communication
🧱 Direct service calls
📦 Database connections

💡 The ambassador pattern handles communication logic outside the main service process, often for cross-cutting concerns.

---

❓ Which pattern is used for handling service failures? 🟡

📝 Retry pattern with exponential backoff
⚙️ Immediate failure
🧱 Infinite retry
📦 No retry

💡 Retry patterns with exponential backoff help handle transient failures while preventing overwhelming failing services.

---

❓ What is the purpose of distributed logging? 🟢

📝 Centralized log collection and analysis
⚙️ Local log storage
🧱 Real-time monitoring
📦 Performance tracking

💡 Distributed logging collects logs from multiple services into a centralized system for analysis and troubleshooting.

---

❓ Which tool is used for metrics collection? 🟢

📝 Prometheus
⚙️ Grafana
🧱 Jaeger
📦 ELK Stack

💡 Prometheus is designed for metrics collection and time-series data storage in cloud-native environments.

---

❓ What does the anti-corruption layer pattern do? 🟡

📝 Isolate legacy systems from new architecture
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 Anti-corruption layers prevent legacy systems from corrupting the design of new systems through translation and isolation.

---

❓ Which pattern is used for handling service dependencies? 🟡

📝 Dependency injection
⚙️ Direct instantiation
🧱 Global variables
📦 Static methods

💡 Dependency injection provides loose coupling and makes services easier to test and maintain.

---

❓ What is the purpose of circuit breaker thresholds? 🟡

📝 Configure failure detection parameters
⚙️ Set timeout values
🧱 Define retry policies
📦 Configure load balancing

💡 Circuit breaker thresholds define when to open the circuit based on failure rates and response times.

---

❓ Which tool is used for service mesh data plane? 🟡

📝 Envoy
⚙️ Istio
🧱 Linkerd
📦 Consul

💡 Envoy is a high-performance proxy commonly used as the data plane in service mesh implementations.

---

❓ What does the strangler fig pattern accomplish? 🟡

📝 Gradually replace legacy systems
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 The strangler fig pattern gradually replaces legacy systems by incrementally migrating functionality to new systems.

---

❓ Which pattern is used for handling service communication failures? 🟡

📝 Dead letter queue
⚙️ Immediate failure
🧱 Infinite retry
📦 No handling

💡 Dead letter queues capture failed messages for later analysis and processing when services are unavailable.

---

❓ What is the purpose of service mesh control plane? 🟡

📝 Manage and configure service mesh behavior
⚙️ Handle traffic routing
🧱 Process requests
📦 Store data

💡 The control plane manages configuration and policies while the data plane handles actual traffic processing.
