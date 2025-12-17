# 🗄️ Advanced Databases - Quiz 4

## Questions

### 1. ❓ What is a composite index in databases? 🔴

A) 📝 An index that includes multiple columns to optimize complex queries

B) ⚙️ An index that is created automatically

C) 🔧 An index that is recreated periodically

D) 🐳 An index that is shared between tables

**Correct Answer**: A) 📝 An index that includes multiple columns to optimize complex queries

💡 Composite indexes include multiple columns in a single index, optimizing queries that filter by multiple conditions simultaneously.

### 2. 🧠 What is the purpose of normalization in databases? 🔴

A) 📝 Eliminate data redundancy and improve integrity

B) ⚙️ Speed up read queries

C) 🔧 Optimize memory usage

D) 🐳 Manage concurrent transactions

**Correct Answer**: A) 📝 Eliminate data redundancy and improve integrity

💡 Normalization eliminates data redundancy, prevents insertion, update, and deletion anomalies, improving referential integrity.

### 3. 🤔 What is a deadlock in databases? 🔴

A) 📝 A situation where two or more transactions wait for each other's locked resources

B) ⚙️ A temporary database lock

C) 🔧 A connection error

D) 🐳 A performance issue

**Correct Answer**: A) 📝 A situation where two or more transactions wait for each other's locked resources

💡 Deadlocks occur when multiple transactions block each other waiting for resources, requiring system intervention to resolve them.

### 4. 🔍 What is the purpose of materialized views in databases? 🔴

A) 📝 Store results of complex queries to improve performance

B) ⚙️ Create table backups

C) 🔧 Manage user permissions

D) 🐳 Optimize storage

**Correct Answer**: A) 📝 Store results of complex queries to improve performance

💡 Materialized views physically store results of complex queries, significantly improving performance for frequent queries.

### 5. ❓ What is table partitioning in databases? 🔴

A) 📝 Divide large tables into smaller parts to improve performance

B) ⚙️ Create incremental backups

C) 🔧 Manage data distribution

D) 🐳 Optimize memory usage

**Correct Answer**: A) 📝 Divide large tables into smaller parts to improve performance

💡 Table partitioning divides large tables into more manageable parts, improving query performance, maintenance, and historical data management.

### 6. 🧠 What is the purpose of triggers in databases? 🔴

A) 📝 Execute code automatically when specific events occur

B) ⚙️ Manage database security

C) 🔧 Optimize queries

D) 🐳 Manage connections

**Correct Answer**: A) 📝 Execute code automatically when specific events occur

💡 Triggers execute code automatically in response to events like INSERT, UPDATE, or DELETE, facilitating business logic implementation.

### 7. 🤔 What is a stored procedure in databases? 🔴

A) 📝 A set of precompiled SQL statements stored in the database

B) ⚙️ An automatic backup procedure

C) 🔧 A maintenance procedure

D) 🐳 A security procedure

**Correct Answer**: A) 📝 A set of precompiled SQL statements stored in the database

💡 Stored procedures allow encapsulating complex business logic, improving performance and centralizing application logic in the database.

### 8. 🔍 What is the purpose of distributed transactions? 🔴

A) 📝 Manage operations involving multiple databases or systems

B) ⚙️ Optimize query performance

C) 🔧 Manage distributed security

D) 🐳 Manage distributed storage

**Correct Answer**: A) 📝 Manage operations involving multiple databases or systems

💡 Distributed transactions ensure data consistency across multiple systems, implementing the two-phase commit protocol to guarantee atomicity.

### 9. ❓ What is replication in databases? 🔴

A) 📝 Copy data from one database to another to improve availability and performance

B) ⚙️ Create automatic backups

C) 🔧 Optimize query performance

D) 🐳 Manage load distribution

**Correct Answer**: A) 📝 Copy data from one database to another to improve availability and performance

💡 Replication maintains synchronized copies of data in multiple locations, improving availability, performance, and facilitating disaster recovery.

### 10. 🧠 What is the purpose of full-text indexes in databases? 🔴

A) 📝 Optimize text searches and unstructured content

B) ⚙️ Manage data compression

C) 🔧 Optimize numeric queries

D) 🐳 Manage text storage

**Correct Answer**: A) 📝 Optimize text searches and unstructured content

💡 Full-text indexes enable efficient searches in textual content, supporting keyword searches, phrases, and boolean operators.

### 11. 🤔 What is sharding in databases? 🔴

A) 📝 Divide a database into multiple instances based on specific criteria

B) ⚙️ Create table partitions

C) 🔧 Manage load distribution

D) 🐳 Optimize memory usage

**Correct Answer**: A) 📝 Divide a database into multiple instances based on specific criteria

💡 Sharding distributes data horizontally across multiple database instances, improving performance and scalability for high-volume applications.

### 12. 🔍 What is the purpose of covering indexes? 🔴

A) 📝 Include all columns needed to satisfy a query without accessing the table

B) ⚙️ Cover all possible queries

C) 🔧 Optimize storage

D) 🐳 Manage security

**Correct Answer**: A) 📝 Include all columns needed to satisfy a query without accessing the table

💡 Covering indexes contain all columns needed for a query, eliminating the need to access the main table and improving performance.

### 13. ❓ What is denormalization in databases? 🔴

A) 📝 Intentionally introduce redundancy to improve query performance

B) ⚙️ Remove unnecessary indexes

C) 🔧 Optimize storage

D) 🐳 Manage security

**Correct Answer**: A) 📝 Intentionally introduce redundancy to improve query performance

💡 Denormalization introduces controlled redundancy to optimize frequent queries, balancing performance with data integrity.

### 14. 🧠 What is the purpose of bitmap indexes? 🔴

A) 📝 Optimize queries with multiple equality conditions on low-cardinality columns

B) ⚙️ Manage full-text queries

C) 🔧 Optimize aggregation queries

D) 🐳 Manage join queries

**Correct Answer**: A) 📝 Optimize queries with multiple equality conditions on low-cardinality columns

💡 Bitmap indexes represent column values as bits, optimizing queries with multiple AND/OR conditions on columns with few unique values.

### 15. 🤔 What is a cursor in databases? 🔴

A) 📝 A mechanism to process query results row by row

B) ⚙️ A position indicator in a table

C) 🔧 A data pointer

D) 🐳 A status indicator

**Correct Answer**: A) 📝 A mechanism to process query results row by row

💡 Cursors allow processing query results row by row, useful for complex operations requiring iterative logic in stored procedures.

### 16. 🔍 What is the purpose of function-based indexes? 🔴

A) 📝 Create indexes based on expressions or functions applied to columns

B) ⚙️ Optimize aggregation functions

C) 🔧 Manage user functions

D) 🐳 Optimize stored procedures

**Correct Answer**: A) 📝 Create indexes based on expressions or functions applied to columns

💡 Function-based indexes allow indexing results of expressions or functions, optimizing queries that use data transformations like UPPER(), LOWER(), or custom functions.

### 17. ❓ What is index fragmentation? 🔴

A) 📝 Performance degradation of indexes due to insert and delete operations

B) ⚙️ Division of large indexes

C) 🔧 Automatic index optimization

D) 🐳 Management of distributed indexes

**Correct Answer**: A) 📝 Performance degradation of indexes due to insert and delete operations

💡 Index fragmentation reduces query performance, requiring periodic maintenance like index reorganization or rebuilding.

### 18. 🧠 What is the purpose of filtered indexes? 🔴

A) 📝 Create indexes that only include rows meeting specific conditions

B) ⚙️ Automatically filter queries

C) 🔧 Optimize filtering queries

D) 🐳 Manage data security

**Correct Answer**: A) 📝 Create indexes that only include rows meeting specific conditions

💡 Filtered indexes include only rows meeting specific conditions, reducing index size and improving performance for queries using those filters.

### 19. 🤔 What is data compression in databases? 🔴

A) 📝 Reduce storage space using compression techniques

B) ⚙️ Optimize query performance

C) 🔧 Manage memory

D) 🐳 Optimize cache storage

**Correct Answer**: A) 📝 Reduce storage space using compression techniques

💡 Data compression reduces storage space using algorithms like RLE, Huffman, or dictionary compression, maintaining query performance.

### 20. 🔍 What is the purpose of full-text indexes in NoSQL databases? 🔴

A) 📝 Optimize text searches in documents and unstructured content

B) ⚙️ Manage aggregation queries

C) 🔧 Optimize join queries

D) 🐳 Manage map-reduce queries

**Correct Answer**: A) 📝 Optimize text searches in documents and unstructured content

💡 Full-text indexes in NoSQL optimize searches in unstructured content, supporting semantic searches and relevance-based queries.

### 21. ❓ What is eventual consistency in distributed databases? 🔴

A) 📝 A consistency model that guarantees data will eventually synchronize

B) ⚙️ A strong consistency model

C) 🔧 A distributed transaction model

D) 🐳 A synchronous replication model

**Correct Answer**: A) 📝 A consistency model that guarantees data will eventually synchronize

💡 Eventual consistency allows different replicas to temporarily have different versions of data, but guarantees they will eventually converge to a consistent state.

🔴
