# Mixed DevOps Quiz 4 - Expert Level

❓ What is the purpose of the SAGA pattern in distributed transactions? 🔴

📝 Manage long-running transactions across services
⚙️ Improve database performance
🧱 Enhance security
📦 Reduce costs

💡 The SAGA pattern breaks distributed transactions into local transactions with compensating actions for rollback scenarios.

---

❓ Which pattern is used for handling service mesh security? 🔴

📝 mTLS (mutual TLS)
⚙️ Basic authentication
🧱 API keys
📦 OAuth2

💡 mTLS provides mutual authentication and encryption between services in a service mesh for enhanced security.

---

❓ What does the event sourcing pattern accomplish? 🔴

📝 Store all changes as a sequence of events
⚙️ Improve database performance
🧱 Enhance security
📦 Reduce costs

💡 Event sourcing stores all changes as events, enabling audit trails, temporal queries, and event replay capabilities.

---

❓ Which tool is used for service mesh observability? 🟡

📝 Kiali
⚙️ Grafana
🧱 Prometheus
📦 Jaeger

💡 Kiali provides visualization and observability for service mesh traffic, topology, and configuration.

---

❓ What is the purpose of the outbox pattern? 🟡

📝 Ensure reliable message delivery in transactions
⚙️ Improve database performance
🧱 Enhance security
📦 Reduce costs

💡 The outbox pattern ensures that messages are reliably delivered as part of database transactions.

---

❓ Which pattern is used for handling service mesh traffic management? 🟡

📝 Traffic splitting and routing
⚙️ Load balancing only
🧱 Service discovery only
📦 Authentication only

💡 Service mesh traffic management includes advanced routing, splitting, and traffic shaping capabilities.

---

❓ What does the CQRS pattern optimize for? 🟡

📝 Read and write performance separately
⚙️ Overall system performance
🧱 Database connections
📦 Network latency

💡 CQRS optimizes read and write operations independently, allowing each to use the most appropriate data model and storage.

---

❓ Which pattern is used for handling service mesh resilience? 🟡

📝 Circuit breaker and retry policies
⚙️ Basic error handling
🧱 Immediate failure
📦 No handling

💡 Service mesh resilience patterns include circuit breakers, retries, timeouts, and fault injection.

---

❓ What is the purpose of the event-driven architecture pattern? 🟡

📝 Decouple services through asynchronous events
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 Event-driven architecture uses events to decouple services and enable loose coupling and scalability.

---

❓ Which tool is used for service mesh policy enforcement? 🟡

📝 OPA (Open Policy Agent)
⚙️ Istio policies
🧱 Linkerd policies
📦 Consul policies

💡 OPA provides policy enforcement across different platforms and can integrate with service mesh implementations.

---

❓ What does the sidecar pattern isolate? 🟡

📝 Cross-cutting concerns from main application
⚙️ Database connections
🧱 Business logic
📦 User interface

💡 The sidecar pattern isolates cross-cutting concerns like logging, monitoring, and security from the main application logic.

---

❓ Which pattern is used for handling service mesh configuration management? 🟡

📝 Dynamic configuration updates
⚙️ Static configuration
🧱 Manual updates
📦 No configuration

💡 Service mesh configuration management allows dynamic updates without restarting services.

---

❓ What is the purpose of the bulkhead pattern in microservices? 🟡

📝 Isolate failures to prevent cascading effects
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 The bulkhead pattern isolates resources and failures to prevent them from affecting the entire system.

---

❓ Which pattern is used for handling service mesh security policies? 🟡

📝 Authorization and access control
⚙️ Basic authentication
🧱 No security
📦 Simple passwords

💡 Service mesh security policies include authorization, access control, and identity verification.

---

❓ What does the ambassador pattern handle? 🟡

📝 Out-of-process communication logic
⚙️ In-process communication
🧱 Direct service calls
📦 Database connections

💡 The ambassador pattern handles communication logic outside the main service process for cross-cutting concerns.

---

❓ Which pattern is used for handling service mesh monitoring? 🟡

📝 Metrics, logs, and traces collection
⚙️ Basic logging only
🧱 No monitoring
📦 Simple metrics

💡 Service mesh monitoring includes comprehensive collection of metrics, logs, and distributed traces.

---

❓ What is the purpose of the strangler fig pattern? 🟡

📝 Gradually replace legacy systems
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 The strangler fig pattern incrementally replaces legacy systems by gradually migrating functionality.

---

❓ Which pattern is used for handling service mesh traffic splitting? 🟡

📝 Canary deployments and A/B testing
⚙️ Basic routing only
🧱 No splitting
📦 Simple load balancing

💡 Traffic splitting enables canary deployments, A/B testing, and gradual rollouts in service mesh architectures.

---

❓ What does the anti-corruption layer pattern prevent? 🟡

📝 Legacy system design from corrupting new architecture
⚙️ Performance issues
🧱 Security problems
📦 Cost overruns

💡 Anti-corruption layers translate between legacy and new systems while maintaining clean architecture boundaries.

---

❓ Which pattern is used for handling service mesh fault injection? 🟡

📝 Testing system resilience and failure scenarios
⚙️ Basic error handling
🧱 No testing
📦 Simple failures

💡 Fault injection tests system resilience by deliberately introducing failures and observing system behavior.

---

❓ What is the purpose of the dead letter queue pattern? 🟡

📝 Handle failed messages for later processing
⚙️ Improve performance
🧱 Reduce costs
📦 Enhance security

💡 Dead letter queues capture failed messages for analysis, debugging, and eventual reprocessing.
