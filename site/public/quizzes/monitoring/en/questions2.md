# 📊 Monitoring - Questions 2

## Questions

### 1. 🎯 What is Application Performance Monitoring (APM)? 🟡

A) 🎯 `Real-time monitoring of application performance and user experience`

B) 🔧 `Application testing`

C) 📦 `Performance optimization`

D) 🌐 `Network monitoring`

**Correct Answer**: A) 🎯 `Real-time monitoring of application performance and user experience`

> 💡 APM tools like New Relic, Datadog, and AppDynamics track response times, errors, and user satisfaction!

### 2. 📊 What is distributed tracing? 🔴

A) 📊 `Tracking requests across multiple services in microservices architecture`

B) 🔧 `Tracking user behavior`

C) 📦 `Tracking file changes`

D) 🌐 `Tracking network packets`

**Correct Answer**: A) 📊 `Tracking requests across multiple services in microservices architecture`

> 📘 Tools like Jaeger and Zipkin show how requests flow through different services. Like following a package through multiple delivery centers!

### 3. 🔍 What is synthetic monitoring? 🟡

A) 🔍 `Automated testing that simulates user interactions`

B) 🔧 `Artificial intelligence monitoring`

C) 📦 `Fake data monitoring`

D) 🌐 `Simulated network traffic`

**Correct Answer**: A) 🔍 `Automated testing that simulates user interactions`

> ⚡ Synthetic monitors run scripts that mimic user actions like login, purchase, or navigation to detect issues proactively!

### 4. 📈 What is Real User Monitoring (RUM)? 🟡

A) 📈 `Monitoring actual user interactions and performance`

B) 🔧 `User behavior tracking`

C) 📦 `User data collection`

D) 🌐 `User session recording`

**Correct Answer**: A) 📈 `Monitoring actual user interactions and performance`

> 💡 RUM captures real user data like page load times, clicks, and errors. Like having a camera in every user's browser!

### 5. 🔄 What is log aggregation? 🟡

A) 🔄 `Collecting and centralizing logs from multiple sources`

B) 🔧 `Combining log files`

C) 📦 `Compressing logs`

D) 🌐 `Storing logs`

**Correct Answer**: A) 🔄 `Collecting and centralizing logs from multiple sources`

> 🎯 Tools like ELK Stack, Splunk, and Fluentd gather logs from all services into one searchable location!

### 6. 🚨 What is anomaly detection in monitoring? 🔴

A) 🚨 `Automatically identifying unusual patterns or behaviors`

B) 🔧 `Error detection`

C) 📦 `Performance issues`

D) 🌐 `Security threats`

**Correct Answer**: A) 🚨 `Automatically identifying unusual patterns or behaviors`

> 📘 Machine learning algorithms detect deviations from normal patterns. Like having a smart guard that notices when something's different!

### 7. 📊 What is observability? 🔴

A) 📊 `Ability to understand system internal state from external outputs`

B) 🔧 `System visibility`

C) 📦 `Data monitoring`

D) 🌐 `Performance tracking`

**Correct Answer**: A) 📊 `Ability to understand system internal state from external outputs`

> ⚡ Observability combines metrics, logs, and traces to understand WHY something happened, not just WHAT happened!

### 8. 🔍 What is OpenTelemetry? 🔴

A) 🔍 `Open-source observability framework for collecting telemetry data`

B) 🔧 `Telemetry software`

C) 📦 `Data collection tool`

D) 🌐 `Monitoring platform`

**Correct Answer**: A) 🔍 `Open-source observability framework for collecting telemetry data`

> 💡 OpenTelemetry provides vendor-neutral APIs and SDKs for collecting metrics, logs, and traces!

### 9. 📈 What is a Service Level Objective (SLO)? 🟡

A) 📈 `Target level of service quality agreed upon`

B) 🔧 `Service objective`

C) 📦 `Quality target`

D) 🌐 `Performance goal`

**Correct Answer**: A) 📈 `Target level of service quality agreed upon`

> 📘 Example: "99.9% uptime" or "95% of requests respond under 200ms". SLOs define what "good" means!

### 10. 🎯 What is error budget? 🔴

A) 🎯 `Amount of acceptable downtime or errors before SLO is breached`

B) 🔧 `Error allowance`

C) 📦 `Failure budget`

D) 🌐 `Downtime limit`

**Correct Answer**: A) 🎯 `Amount of acceptable downtime or errors before SLO is breached`

> 🎯 If SLO is 99.9% uptime, error budget is 0.1% = ~43 minutes of downtime per month!

### 11. 🔄 What is a monitoring runbook? 🟡

A) 🔄 `Step-by-step guide for responding to alerts`

B) 🔧 `Monitoring manual`

C) 📦 `Alert documentation`

D) 🌐 `Incident procedures`

**Correct Answer**: A) 🔄 `Step-by-step guide for responding to alerts`

> ⚡ Runbooks tell engineers exactly what to do when alerts fire. Like emergency procedures for your systems!

### 12. 📊 What is white-box monitoring? 🔴

A) 📊 `Monitoring based on internal system metrics and logs`

B) 🔧 `Internal monitoring`

C) 📦 `Code monitoring`

D) 🌐 `Application monitoring`

**Correct Answer**: A) 📊 `Monitoring based on internal system metrics and logs`

> 💡 White-box uses internal data like CPU, memory, database queries. You know how the system works internally!

### 13. 🔍 What is black-box monitoring? 🟡

A) 🔍 `Monitoring from user perspective without internal knowledge`

B) 🔧 `External monitoring`

C) 📦 `Outside monitoring`

D) 🌐 `User monitoring`

**Correct Answer**: A) 🔍 `Monitoring from user perspective without internal knowledge`

> 📘 Black-box tests what users experience: "Can I access the website? Is login working?" Like testing from outside!

### 14. 🚨 What is alert fatigue? 🟡

A) 🚨 `Desensitization to alerts due to too many false positives`

B) 🔧 `Alert overload`

C) 📦 `Notification burnout`

D) 🌐 `Warning exhaustion`

**Correct Answer**: A) 🚨 `Desensitization to alerts due to too many false positives`

> 🎯 Too many noisy alerts make engineers ignore them. Like car alarms - if they go off constantly, nobody pays attention!

### 15. 📈 What is a golden signal? 🔴

A) 📈 `Key metric that indicates system health (latency, traffic, errors, saturation)`

B) 🔧 `Important signal`

C) 📦 `Priority metric`

D) 🌐 `Main indicator`

**Correct Answer**: A) 📈 `Key metric that indicates system health (latency, traffic, errors, saturation)`

> ⚡ Google's SRE book defines 4 golden signals: latency, traffic, errors, and saturation - the core of what to monitor!

### 16. 🔄 What is metric cardinality? 🔴

A) 🔄 `Number of unique combinations of labels/tags in metrics`

B) 🔧 `Metric complexity`

C) 📦 `Data dimensions`

D) 🌐 `Metric count`

**Correct Answer**: A) 🔄 `Number of unique combinations of labels/tags in metrics`

> 💡 High cardinality (millions of unique label combinations) can overwhelm monitoring systems. Like too many file folders!

### 17. 📊 What is time series data? 🟡

A) 📊 `Data points indexed by time, showing changes over time`

B) 🔧 `Time-based data`

C) 📦 `Historical data`

D) 🌐 `Temporal information`

**Correct Answer**: A) 📊 `Data points indexed by time, showing changes over time`

> 📘 Perfect for monitoring: CPU usage at 10:00=50%, 10:01=60%, 10:02=55%. Shows trends and patterns!

### 18. 🔍 What is log parsing? 🟡

A) 🔍 `Extracting structured information from unstructured log text`

B) 🔧 `Reading logs`

C) 📦 `Log analysis`

D) 🌐 `Text processing`

**Correct Answer**: A) 🔍 `Extracting structured information from unstructured log text`

> 🎯 Parsing extracts fields like timestamp, IP, status code from raw log lines for analysis and alerting!

### 19. 📈 What is capacity planning in monitoring? 🟡

A) 📈 `Predicting future resource needs based on current trends`

B) 🔧 `Planning resources`

C) 📦 `Capacity management`

D) 🌐 `Resource forecasting`

**Correct Answer**: A) 📈 `Predicting future resource needs based on current trends`

> ⚡ Monitoring trends helps predict when you'll need more servers, storage, or bandwidth before running out!

### 20. 🔄 What is a monitoring data pipeline? 🔴

A) 🔄 `Flow of data from collection to storage to visualization`

B) 🔧 `Data processing`

C) 📦 `Information flow`

D) 🌐 `Data stream`

**Correct Answer**: A) 🔄 `Flow of data from collection to storage to visualization`

> 💡 Pipeline: Agent collects → Processes/filters → Stores in database → Displays in dashboard. Like an assembly line for monitoring data!

### 21. 🚨 What is incident response in monitoring? 🔴

A) 🚨 `Structured process for detecting, responding to, and resolving incidents`

B) 🔧 `Problem solving`

C) 📦 `Issue handling`

D) 🌐 `Emergency response`

**Correct Answer**: A) 🚨 `Structured process for detecting, responding to, and resolving incidents`

> 🏆 Good incident response includes: detection → triage → investigation → mitigation → postmortem. Like a fire department for your systems! 