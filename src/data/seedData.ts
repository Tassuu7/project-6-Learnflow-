import {
  User,
  Course,
  Quiz,
  Assignment,
  AssignmentSubmission,
  Certificate,
  NotificationItem,
  AuditLogItem,
  MLModelInfo,
  Enrollment,
  StudentDoubt,
} from '../types';

export const SEED_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'usr_student_1',
    email: 'student01@example.local',
    name: 'Aria Montgomery',
    role: 'STUDENT',
    department: 'Computer Science',
    title: 'Graduate Scholar',
    status: 'ACTIVE',
    createdAt: '2026-01-10T08:00:00Z',
    lastLogin: '2026-09-04T02:40:00Z',
    bio: 'Specializing in Python data science, machine learning pipelines, and backend databases.',
    passwordHash: 'student123',
  },
  {
    id: 'usr_student_2',
    email: 'student02@example.local',
    name: 'Marcus Vance',
    role: 'STUDENT',
    department: 'Software Engineering',
    title: 'Undergraduate Fellow',
    status: 'ACTIVE',
    createdAt: '2026-01-14T09:30:00Z',
    lastLogin: '2026-09-02T14:10:00Z',
    bio: 'Passionate about Java object-oriented design, DBMS query optimization, and offline-first apps.',
    passwordHash: 'student123',
  },
  {
    id: 'usr_instructor_1',
    email: 'instructor01@example.local',
    name: 'Dr. Elena Rostova',
    role: 'INSTRUCTOR',
    department: 'Computer Science & Engineering',
    title: 'Lead Faculty & Systems Professor',
    status: 'ACTIVE',
    createdAt: '2025-11-01T10:00:00Z',
    lastLogin: '2026-09-04T01:15:00Z',
    bio: '15+ years of software architecture, Python automation, and distributed database systems.',
    passwordHash: 'instructor123',
  },
  {
    id: 'usr_instructor_2',
    email: 'instructor02@example.local',
    name: 'Prof. David K. Sterling',
    role: 'INSTRUCTOR',
    department: 'Data & Applied Intelligence',
    title: 'Principal Machine Learning Scientist & Faculty',
    status: 'ACTIVE',
    createdAt: '2025-12-05T11:00:00Z',
    lastLogin: '2026-09-03T18:22:00Z',
    bio: 'Specializes in Machine Learning models, Deep Learning architectures, and Java enterprise ecosystems.',
    passwordHash: 'instructor123',
  },
  {
    id: 'usr_admin_1',
    email: 'admin@example.local',
    name: 'Cassian Thorne',
    role: 'ADMIN',
    department: 'Operations & Academic Governance',
    title: 'Platform Chief Administrator',
    status: 'ACTIVE',
    createdAt: '2025-10-01T08:00:00Z',
    lastLogin: '2026-09-04T02:55:00Z',
    bio: 'Oversees institutional policy, faculty curation, student analytics, model deployments, and platform integrity.',
    passwordHash: 'admin123',
  },
];

export const SEED_COURSES: Course[] = [
  // 1. PYTHON
  {
    id: 'crs_python_101',
    title: 'Python Programming & Scripting Masterclass',
    slug: 'python-programming-masterclass',
    description:
      'Master Python from foundational syntax to object-oriented programming, data structures, modular design, and standard automation scripting.',
    instructorId: 'usr_instructor_1',
    instructorName: 'Dr. Elena Rostova',
    category: 'Programming Languages',
    subject: 'Python',
    difficulty: 'BEGINNER',
    estimatedHours: 20,
    status: 'PUBLISHED',
    isOfflineAvailable: true,
    packageSizeMb: 38.5,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-02-15T14:30:00Z',
    prerequisites: ['Basic Computer Literacy', 'Problem Solving Foundations'],
    learningObjectives: [
      'Understand core Python syntax, primitive and collection data types (lists, tuples, dicts)',
      'Construct robust control flows, loops, functions, and generator comprehensions',
      'Implement Object-Oriented Programming (OOP) in Python: Classes, Inheritance, and Dunder methods',
      'Handle file I/O operations, context managers, and custom exception handling',
    ],
    tags: ['Python', 'Programming', 'OOP', 'Data Structures', 'Scripting'],
    modules: [
      {
        id: 'mod_py_1',
        title: 'Module 1: Python Fundamentals & Data Structures',
        description: 'Core syntax, variables, lists, dictionaries, tuples, and memory references.',
        order: 1,
        chapters: [
          {
            id: 'chap_py_1_1',
            title: 'Chapter 1: Python Architecture & Core Variables',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
            lessons: [
              {
                id: 'les_py_1_1_1',
                title: 'Python Execution Model & Dynamic Typing',
                summary: 'How the Python Virtual Machine (PVM) interprets bytecode and handles dynamic reference counts.',
                order: 1,
                durationMinutes: 20,
                videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
                materials: [
                  {
                    id: 'mat_py_1_1_1_a',
                    title: 'Faculty Lesson Notes: Python Syntax & Memory Allocation',
                    type: 'TEXT',
                    content: `### Python Execution Model & Dynamic Typing

Python is an interpreted, high-level, dynamically typed language. When you execute a Python script:
1. Source code (\`.py\`) is parsed into an Abstract Syntax Tree (AST).
2. The compiler transforms it into bytecode (\`.pyc\` cached in \`__pycache__\`).
3. The **Python Virtual Machine (PVM)** executes the bytecode loop.

\`\`\`python
# Dynamic Typing Example
x = 42          # x references integer object 42 in memory
x = "LearnFlow" # x now references string object "LearnFlow"
print(type(x))  # <class 'str'>
\`\`\`

**Key Takeaways:**
- Everything in Python is an object, including functions and classes.
- Immutable types: \`int\`, \`float\`, \`str\`, \`tuple\`, \`frozenset\`.
- Mutable types: \`list\`, \`dict\`, \`set\`.`,
                    durationMinutes: 15,
                    isDownloadable: true,
                  },
                ],
              },
              {
                id: 'les_py_1_1_2',
                title: 'Data Structures: Lists, Dictionaries, and Sets',
                summary: 'Mastering sequential and hash-map based collection types for algorithmic efficiency.',
                order: 2,
                durationMinutes: 25,
                videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
                materials: [
                  {
                    id: 'mat_py_1_1_2_a',
                    title: 'Detailed Guide: Python Collections & Big-O Complexity',
                    type: 'TEXT',
                    content: `### Python Built-in Collections

#### 1. Lists (Dynamic Arrays)
- Lookups by index: $O(1)$
- Append to end: $O(1)$ amortized
- Insert/Delete at arbitrary position: $O(n)$

\`\`\`python
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]
\`\`\`

#### 2. Dictionaries (Hash Tables)
- Average Key Lookup, Insertion, Deletion: $O(1)$
- Implemented with open addressing and sparse table optimization.

\`\`\`python
faculty_profile = {
    "name": "Dr. Elena Rostova",
    "course": "Python Masterclass",
    "students": 45
}
\`\`\``,
                    durationMinutes: 20,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
          {
            id: 'chap_py_1_2',
            title: 'Chapter 2: Functions, Scopes & Functional Constructs',
            order: 2,
            videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I',
            lessons: [
              {
                id: 'les_py_1_2_1',
                title: 'First-Class Functions, *args, **kwargs & Closures',
                summary: 'Pass functions as arguments, unpack variable parameters, and capture enclosing scopes.',
                order: 1,
                durationMinutes: 30,
                videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I',
                materials: [
                  {
                    id: 'mat_py_1_2_1_a',
                    title: 'Curriculum Notes: Python Functions & Decorators',
                    type: 'TEXT',
                    content: `### Functions as First-Class Citizens

In Python, functions can be bound to names, passed into other functions, and returned from functions.

\`\`\`python
def timer_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        duration = time.perf_counter() - start
        print(f"{func.__name__} took {duration:.4f}s")
        return result
    return wrapper

@timer_decorator
def calculate_factorial(n):
    import math
    return math.factorial(n)
\`\`\``,
                    durationMinutes: 20,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mod_py_2',
        title: 'Module 2: Object-Oriented Python & File Systems',
        description: 'Class declarations, inheritance, encapsulation, and robust file management.',
        order: 2,
        chapters: [
          {
            id: 'chap_py_2_1',
            title: 'Chapter 3: OOP Classes, Inheritance & Context Managers',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
            lessons: [
              {
                id: 'les_py_2_1_1',
                title: 'Classes, Dunder Methods & Encapsulation',
                summary: 'Creating stateful blueprints, operator overloading with __init__, __str__, and __repr__.',
                order: 1,
                durationMinutes: 35,
                videoUrl: 'https://www.youtube.com/embed/JeznW_7DlB0',
                materials: [
                  {
                    id: 'mat_py_2_1_1_a',
                    title: 'Faculty Reference: Object-Oriented Architecture in Python',
                    type: 'TEXT',
                    content: `### Object-Oriented Programming (OOP) in Python

\`\`\`python
class StudentLearner:
    def __init__(self, name: str, student_id: str):
        self.name = name
        self.student_id = student_id
        self._completed_modules = []  # protected attribute

    def enroll(self, module_name: str) -> None:
        self._completed_modules.append(module_name)

    @property
    def progress_count(self) -> int:
        return len(self._completed_modules)

    def __repr__(self) -> str:
        return f"StudentLearner(name={self.name!r}, id={self.student_id!r})"
\`\`\``,
                    durationMinutes: 25,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. JAVA
  {
    id: 'crs_java_102',
    title: 'Java Programming & Object-Oriented Software Engineering',
    slug: 'java-programming-oop',
    description:
      'Rigorous study of strongly-typed object-oriented design in Java, the JVM ecosystem, inheritance, polymorphism, interfaces, exception propagation, and the Collections framework.',
    instructorId: 'usr_instructor_1',
    instructorName: 'Dr. Elena Rostova',
    category: 'Programming Languages',
    subject: 'Java',
    difficulty: 'INTERMEDIATE',
    estimatedHours: 25,
    status: 'PUBLISHED',
    isOfflineAvailable: true,
    packageSizeMb: 44.0,
    createdAt: '2026-01-12T11:00:00Z',
    updatedAt: '2026-02-18T10:00:00Z',
    prerequisites: ['Basic Programming Logic', 'Algorithmic Thinking'],
    learningObjectives: [
      'Master Java syntax, bytecode compilation (javac), JVM memory zones (Heap & Stack)',
      'Apply 4 pillars of OOP: Encapsulation, Inheritance, Polymorphism, Abstraction',
      'Leverage Java Interfaces, Abstract Classes, and Functional Interfaces (Lambdas)',
      'Utilize Java Collections Framework (ArrayList, HashMap, TreeSet) and Generics safely',
    ],
    tags: ['Java', 'OOP', 'JVM', 'Collections', 'Design Patterns'],
    modules: [
      {
        id: 'mod_jv_1',
        title: 'Module 1: Java Syntax & Object-Oriented Foundations',
        description: 'Classes, Objects, JVM heap vs stack allocation, and Encapsulation.',
        order: 1,
        chapters: [
          {
            id: 'chap_jv_1_1',
            title: 'Chapter 1: Java Virtual Machine & Class Construction',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
            lessons: [
              {
                id: 'les_jv_1_1_1',
                title: 'JVM Memory Model: Stack vs Heap Allocation',
                summary: 'How Java allocates primitive types on the stack and object instances in the garbage-collected heap.',
                order: 1,
                durationMinutes: 30,
                videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
                materials: [
                  {
                    id: 'mat_jv_1_1_1_a',
                    title: 'Faculty Lesson Notes: Java Memory & Execution Lifecycle',
                    type: 'TEXT',
                    content: `### Java Architecture & The JVM

Java follows the **"Write Once, Run Anywhere" (WORA)** philosophy through bytecode execution:
1. Source file (\`.java\`) is compiled by \`javac\` into bytecode (\`.class\`).
2. The JVM ClassLoader loads classes dynamically.
3. The Execution Engine (JIT Compiler + Interpreter) translates bytecode to native machine code.

#### Stack vs Heap Memory:
- **Stack Memory:** Stores method execution frames, local primitive variables, and references to objects.
- **Heap Memory:** Stores all instantiated objects. Managed by the Garbage Collector (GC).`,
                    durationMinutes: 20,
                    isDownloadable: true,
                  },
                ],
              },
              {
                id: 'les_jv_1_1_2',
                title: 'Inheritance, Polymorphism and Abstract Classes',
                summary: 'Code reuse via inheritance hierarchy, method overriding, and dynamic method dispatch.',
                order: 2,
                durationMinutes: 35,
                videoUrl: 'https://www.youtube.com/embed/grEKMHGYyns',
                materials: [
                  {
                    id: 'mat_jv_1_1_2_a',
                    title: 'Detailed Notes: Polymorphic Architecture in Java',
                    type: 'TEXT',
                    content: `### Polymorphism & Dynamic Dispatch in Java

\`\`\`java
public abstract class AcademicEntity {
    private String id;
    private String name;

    public AcademicEntity(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public abstract void displayRoleDetails();
}

public class StudentUser extends AcademicEntity {
    private double gradePointAverage;

    public StudentUser(String id, String name, double gpa) {
        super(id, name);
        this.gradePointAverage = gpa;
    }

    @Override
    public void displayRoleDetails() {
        System.out.println("Scholar Record | GPA: " + gradePointAverage);
    }
}
\`\`\``,
                    durationMinutes: 25,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mod_jv_2',
        title: 'Module 2: Java Collections Framework & Exception Handling',
        description: 'Collections, Maps, Generics, and checked vs unchecked exceptions.',
        order: 2,
        chapters: [
          {
            id: 'chap_jv_2_1',
            title: 'Chapter 2: Collections Framework & Generics',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/WPvGqX-TXP0',
            lessons: [
              {
                id: 'les_jv_2_1_1',
                title: 'Lists, Sets, Maps & Generic Type Safety',
                summary: 'Comprehensive examination of ArrayList vs LinkedList, HashSet vs TreeSet, and HashMap operations.',
                order: 1,
                durationMinutes: 30,
                videoUrl: 'https://www.youtube.com/embed/WPvGqX-TXP0',
                materials: [
                  {
                    id: 'mat_jv_2_1_1_a',
                    title: 'Faculty Reference: Java Collections Performance',
                    type: 'TEXT',
                    content: `### Java Collections Framework Overview

- **\`List<T>\`**: Ordered collection, duplicates permitted.
  - \`ArrayList\`: Continuous array, fast random access $O(1)$, slower insertions $O(n)$.
  - \`LinkedList\`: Doubly linked nodes, fast edge insertions $O(1)$, slow traversal $O(n)$.
- **\`Set<T>\`**: Unique items. \`HashSet\` provides $O(1)$ operations using \`hashCode()\` and \`equals()\`.
- **\`Map<K, V>\`**: Key-value pairs. \`HashMap\` uses hashing buckets with treeification at high collision density.`,
                    durationMinutes: 20,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. DBMS
  {
    id: 'crs_dbms_103',
    title: 'Database Management Systems (DBMS) & SQL Architecture',
    slug: 'database-management-systems-sql',
    description:
      'Master the principles of relational databases, relational algebra, SQL DDL/DML, normalization (1NF, 2NF, 3NF, BCNF), indexing, concurrency control, and ACID transactions.',
    instructorId: 'usr_instructor_2',
    instructorName: 'Prof. David K. Sterling',
    category: 'Database Systems',
    subject: 'DBMS',
    difficulty: 'INTERMEDIATE',
    estimatedHours: 22,
    status: 'PUBLISHED',
    isOfflineAvailable: true,
    packageSizeMb: 36.0,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-02-20T12:00:00Z',
    prerequisites: ['Basic Discrete Mathematics', 'Fundamental Programming Knowledge'],
    learningObjectives: [
      'Design normalized relational database schemas using Entity-Relationship (ER) modeling',
      'Construct complex SQL queries with multi-table joins, subqueries, group by, and window functions',
      'Eliminate anomalies through functional dependency analysis and 1NF/2NF/3NF/BCNF normalization',
      'Understand transaction isolation levels, two-phase locking (2PL), write-ahead logging (WAL), and ACID guarantees',
    ],
    tags: ['DBMS', 'SQL', 'Normalization', 'Relational Model', 'Transactions', 'ACID'],
    modules: [
      {
        id: 'mod_db_1',
        title: 'Module 1: Relational Model & SQL Query Mastery',
        description: 'Table schemas, primary & foreign keys, SQL joins, and aggregate filtering.',
        order: 1,
        chapters: [
          {
            id: 'chap_db_1_1',
            title: 'Chapter 1: Relational Schema Design & SQL Queries',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
            lessons: [
              {
                id: 'les_db_1_1_1',
                title: 'Relational Integrity & Complex SQL Joins',
                summary: 'Entity integrity, referential integrity cascades, and INNER vs OUTER join semantics.',
                order: 1,
                durationMinutes: 30,
                videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
                materials: [
                  {
                    id: 'mat_db_1_1_1_a',
                    title: 'Faculty Lesson Notes: SQL Queries and Relational Algebra',
                    type: 'TEXT',
                    content: `### Relational Schema & SQL Joins

A relational database organizes data into relation tables composed of tuples (rows) and attributes (columns).

\`\`\`sql
-- Schema with Referential Integrity
CREATE TABLE Students (
    student_id VARCHAR(32) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL
);

CREATE TABLE Enrollments (
    enrollment_id VARCHAR(32) PRIMARY KEY,
    student_id VARCHAR(32) REFERENCES Students(student_id) ON DELETE CASCADE,
    course_code VARCHAR(16) NOT NULL,
    score NUMERIC(5,2),
    enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Advanced Aggregation Query
SELECT 
    s.department,
    COUNT(e.enrollment_id) AS total_enrolled,
    ROUND(AVG(e.score), 2) AS avg_score
FROM Students s
INNER JOIN Enrollments e ON s.student_id = e.student_id
GROUP BY s.department
HAVING AVG(e.score) >= 75.0;
\`\`\``,
                    durationMinutes: 20,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mod_db_2',
        title: 'Module 2: Normalization & Transaction Management (ACID)',
        description: 'Eliminating redundancy, functional dependencies, and concurrency control.',
        order: 2,
        chapters: [
          {
            id: 'chap_db_2_1',
            title: 'Chapter 2: Database Normalization & ACID Transactions',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/UrYLYV7WSHM',
            lessons: [
              {
                id: 'les_db_2_1_1',
                title: 'Functional Dependencies & Normal Forms (1NF to BCNF)',
                summary: 'Decomposing schemas to eliminate insertion, update, and deletion anomalies while preserving dependencies.',
                order: 1,
                durationMinutes: 35,
                videoUrl: 'https://www.youtube.com/embed/UrYLYV7WSHM',
                materials: [
                  {
                    id: 'mat_db_2_1_1_a',
                    title: 'Detailed Notes: Normalization & ACID Guarantees',
                    type: 'TEXT',
                    content: `### Database Normalization Principles

1. **1NF (First Normal Form):** Atomic values only; no repeating groups.
2. **2NF (Second Normal Form):** In 1NF and no partial functional dependency (every non-key attribute is fully functionally dependent on the primary key).
3. **3NF (Third Normal Form):** In 2NF and no transitive dependencies ($A \\to B$ and $B \\to C$ where $C$ is non-prime).
4. **BCNF (Boyce-Codd Normal Form):** For every functional dependency $X \\to Y$, $X$ must be a super key.

### ACID Properties:
- **Atomicity:** All-or-nothing execution.
- **Consistency:** Transactions preserve database integrity constraints.
- **Isolation:** Concurrent transactions do not interfere with each other.
- **Durability:** Committed state survives system crashes (via Write-Ahead Logging).`,
                    durationMinutes: 25,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. MACHINE LEARNING (ML)
  {
    id: 'crs_ml_104',
    title: 'Machine Learning (ML) & Intelligent Systems',
    slug: 'machine-learning-intelligent-systems',
    description:
      'Comprehensive study of Machine Learning algorithms: linear/logistic regression, decision trees, random forests, clustering, model evaluation metrics, and neural network foundations.',
    instructorId: 'usr_instructor_2',
    instructorName: 'Prof. David K. Sterling',
    category: 'Artificial Intelligence',
    subject: 'ML',
    difficulty: 'ADVANCED',
    estimatedHours: 26,
    status: 'PUBLISHED',
    isOfflineAvailable: true,
    packageSizeMb: 48.0,
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-02-25T16:00:00Z',
    prerequisites: ['Python Foundations', 'Linear Algebra & Probability Basics'],
    learningObjectives: [
      'Understand the end-to-end ML lifecycle: feature engineering, train-test splitting, scaling',
      'Implement Supervised Learning: Linear Regression, Logistic Classification, Decision Trees',
      'Explore Unsupervised Learning: K-Means Clustering and Dimensionality Reduction (PCA)',
      'Evaluate models rigorously with Confusion Matrix, Precision, Recall, F1-Score, and ROC-AUC',
    ],
    tags: ['Machine Learning', 'AI', 'Data Science', 'Deep Learning', 'Neural Networks'],
    modules: [
      {
        id: 'mod_ml_1',
        title: 'Module 1: Foundations of ML & Supervised Algorithms',
        description: 'Supervised classification, regression, loss functions, and gradient descent.',
        order: 1,
        chapters: [
          {
            id: 'chap_ml_1_1',
            title: 'Chapter 1: Data Engineering & Supervised Learning',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/ukzFI9RGwfU',
            lessons: [
              {
                id: 'les_ml_1_1_1',
                title: 'Regression, Classification & Gradient Descent',
                summary: 'Minimizing Mean Squared Error (MSE) and Cross-Entropy loss via stochastic gradient descent.',
                order: 1,
                durationMinutes: 35,
                videoUrl: 'https://www.youtube.com/embed/ukzFI9RGwfU',
                materials: [
                  {
                    id: 'mat_ml_1_1_1_a',
                    title: 'Faculty Lesson Notes: Supervised Learning & Optimization',
                    type: 'TEXT',
                    content: `### Supervised Machine Learning

In supervised learning, models learn an approximation mapping function $y = f(X)$ from labeled training pairs.

#### Optimization via Gradient Descent:
Parameters $\\theta$ are updated iteratively along the negative gradient of the loss function $J(\\theta)$:
$$\\theta := \\theta - \\alpha \\nabla_{\\theta} J(\\theta)$$
where $\\alpha$ is the learning rate.

\`\`\`python
import numpy as np

# Simple Gradient Descent for Linear Regression
def gradient_descent(X, y, lr=0.01, epochs=1000):
    m = len(y)
    weights = np.zeros(X.shape[1])
    bias = 0.0

    for epoch in range(epochs):
        y_pred = np.dot(X, weights) + bias
        dw = (2 / m) * np.dot(X.T, (y_pred - y))
        db = (2 / m) * np.sum(y_pred - y)

        weights -= lr * dw
        bias -= lr * db

    return weights, bias
\`\`\``,
                    durationMinutes: 25,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'mod_ml_2',
        title: 'Module 2: Model Evaluation & Deep Learning Overview',
        description: 'Cross-validation, hyperparameter tuning, metrics, and artificial neural networks.',
        order: 2,
        chapters: [
          {
            id: 'chap_ml_2_1',
            title: 'Chapter 2: Model Evaluation & Neural Network Architectures',
            order: 1,
            videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
            lessons: [
              {
                id: 'les_ml_2_1_1',
                title: 'Confusion Matrix, F1-Score & Multilayer Perceptrons',
                summary: 'Diagnosing bias-variance tradeoffs, calculating precision/recall, and forward/backward propagation.',
                order: 1,
                durationMinutes: 40,
                videoUrl: 'https://www.youtube.com/embed/aircAruvnKk',
                materials: [
                  {
                    id: 'mat_ml_2_1_1_a',
                    title: 'Detailed Notes: ML Evaluation Metrics & Neural Architectures',
                    type: 'TEXT',
                    content: `### Model Evaluation Metrics

When classes are imbalanced, Accuracy alone is deceptive. We rely on:

- **Precision:** $\\frac{TP}{TP + FP}$ (Fraction of positive predictions that were correct)
- **Recall (Sensitivity):** $\\frac{TP}{TP + FN}$ (Fraction of actual positives detected)
- **F1-Score:** Harmonic mean of Precision and Recall:
  $$F_1 = 2 \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$

### Neural Networks (Perceptrons):
An artificial neuron calculates an affine transformation followed by a non-linear activation:
$$a = \\sigma(W^T x + b)$$
Common activations include ReLU ($\max(0, z)$), Sigmoid, and Softmax.`,
                    durationMinutes: 25,
                    isDownloadable: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export const SEED_QUIZZES: Quiz[] = [
  // 1. Python Quiz
  {
    id: 'qiz_python_1',
    courseId: 'crs_python_101',
    title: 'Python Core Assessment: Syntax, Data Structures & OOP',
    description: 'Evaluate your grasp of Python data structures, list comprehensions, decorators, and OOP classes.',
    timeLimitMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    isOfflinePermitted: true,
    createdAt: '2026-01-20T10:00:00Z',
    questions: [
      {
        id: 'qst_py_1',
        text: 'Which of the following data types in Python is IMMUTABLE?',
        type: 'MULTIPLE_CHOICE',
        options: ['List', 'Dictionary', 'Tuple', 'Set'],
        correctAnswers: [2],
        explanation: 'Tuples are immutable sequences in Python; once created, their elements cannot be modified.',
        topicTag: 'Python Data Structures',
        points: 10,
      },
      {
        id: 'qst_py_2',
        text: 'What will the expression [x**2 for x in range(5) if x % 2 == 1] evaluate to?',
        type: 'MULTIPLE_CHOICE',
        options: ['[0, 4, 16]', '[1, 9]', '[1, 4, 9, 16]', '[0, 1, 4, 9, 16]'],
        correctAnswers: [1],
        explanation: 'The list comprehension filters odd numbers (1 and 3) from range(5) and squares them, producing [1, 9].',
        topicTag: 'Comprehensions',
        points: 10,
      },
      {
        id: 'qst_py_3',
        text: 'True or False: In Python, functions can be passed as arguments into other functions because functions are first-class objects.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correctAnswers: [0],
        explanation: 'True. Functions in Python are first-class citizens and can be assigned to variables, passed to functions, and returned from other functions.',
        topicTag: 'Functions & Closures',
        points: 10,
      },
      {
        id: 'qst_py_4',
        text: 'What special method (dunder method) in Python acts as the constructor when creating a class instance?',
        type: 'FILL_BLANK',
        options: ['__init__', '__new__', '__construct__', '__start__'],
        correctAnswers: [0],
        correctTextAnswer: '__init__',
        explanation: '__init__ is the initializer method invoked automatically after object creation in Python.',
        topicTag: 'Python OOP',
        points: 10,
      },
      {
        id: 'qst_py_5',
        text: 'Which built-in Python statement ensures cleanup resources (like file streams) are released safely, even if an exception occurs?',
        type: 'MULTIPLE_CHOICE',
        options: ['using statement', 'with statement', 'defer statement', 'protect statement'],
        correctAnswers: [1],
        explanation: 'The with statement invokes context managers (__enter__ and __exit__) ensuring guaranteed resource cleanup.',
        topicTag: 'Resource Management',
        points: 10,
      },
    ],
  },

  // 2. Java Quiz
  {
    id: 'qiz_java_1',
    courseId: 'crs_java_102',
    title: 'Java OOP Assessment: JVM Memory, Polymorphism & Collections',
    description: 'Verify your understanding of Stack vs Heap allocation, Interface contracts, and Collections complexity.',
    timeLimitMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    isOfflinePermitted: true,
    createdAt: '2026-01-22T10:00:00Z',
    questions: [
      {
        id: 'qst_jv_1',
        text: 'In Java JVM runtime architecture, where are instantiated objects and class instances stored?',
        type: 'MULTIPLE_CHOICE',
        options: ['Call Stack', 'Heap Memory', 'Instruction Register', 'Thread-Local Storage'],
        correctAnswers: [1],
        explanation: 'All Java objects and arrays are allocated on the Heap and managed by the Garbage Collector.',
        topicTag: 'JVM Memory Architecture',
        points: 10,
      },
      {
        id: 'qst_jv_2',
        text: 'Which Java keyword prevents a class from being inherited or a method from being overridden?',
        type: 'MULTIPLE_CHOICE',
        options: ['static', 'sealed', 'final', 'immutable'],
        correctAnswers: [2],
        explanation: 'Applying final to a class prevents subclassing; applying final to a method prevents overriding.',
        topicTag: 'Java OOP Modifiers',
        points: 10,
      },
      {
        id: 'qst_jv_3',
        text: 'True or False: An interface in Java can contain default implemented methods starting in Java 8.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correctAnswers: [0],
        explanation: 'True. Java 8 introduced default and static methods in interfaces to support backward compatibility with lambda expressions.',
        topicTag: 'Java Interfaces',
        points: 10,
      },
      {
        id: 'qst_jv_4',
        text: 'Which collection implementation in the Java Collections Framework provides O(1) average lookup time based on hashing?',
        type: 'MULTIPLE_CHOICE',
        options: ['ArrayList', 'HashMap', 'TreeMap', 'LinkedList'],
        correctAnswers: [1],
        explanation: 'HashMap calculates bucket positions using hashCode() and equals(), providing average O(1) key access.',
        topicTag: 'Java Collections',
        points: 10,
      },
    ],
  },

  // 3. DBMS Quiz
  {
    id: 'qiz_dbms_1',
    courseId: 'crs_dbms_103',
    title: 'DBMS & SQL Assessment: Relational Algebra, Normalization & ACID',
    description: 'Test your knowledge on SQL joins, functional dependencies, 3NF/BCNF normalization, and transaction ACID properties.',
    timeLimitMinutes: 15,
    passingScorePercentage: 70,
    maxAttempts: 3,
    isOfflinePermitted: true,
    createdAt: '2026-01-25T10:00:00Z',
    questions: [
      {
        id: 'qst_db_1',
        text: 'Which normal form requires that a relation is in 2NF and contains NO transitive functional dependencies among non-prime attributes?',
        type: 'MULTIPLE_CHOICE',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswers: [2],
        explanation: 'Third Normal Form (3NF) eliminates transitive functional dependencies where a non-prime attribute depends on another non-prime attribute.',
        topicTag: 'Database Normalization',
        points: 10,
      },
      {
        id: 'qst_db_2',
        text: 'In the ACID transaction model, what property guarantees that once a transaction commits, its effects survive subsequent system or power failures?',
        type: 'MULTIPLE_CHOICE',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctAnswers: [3],
        explanation: 'Durability ensures committed transaction changes persist permanently through write-ahead logging (WAL) and disk flushes.',
        topicTag: 'ACID Transactions',
        points: 10,
      },
      {
        id: 'qst_db_3',
        text: 'True or False: A LEFT OUTER JOIN returns all rows from the left table regardless of whether there is a matching row in the right table.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correctAnswers: [0],
        explanation: 'True. A LEFT OUTER JOIN preserves all rows from the left relation, padding right columns with NULL when no match exists.',
        topicTag: 'SQL Joins',
        points: 10,
      },
    ],
  },

  // 4. ML Quiz
  {
    id: 'qiz_ml_1',
    courseId: 'crs_ml_104',
    title: 'Machine Learning Assessment: Supervised Models, Metrics & Neural Nets',
    description: 'Validate your understanding of gradient descent, confusion matrices, F1-scores, and perceptron activations.',
    timeLimitMinutes: 20,
    passingScorePercentage: 70,
    maxAttempts: 3,
    isOfflinePermitted: true,
    createdAt: '2026-01-28T10:00:00Z',
    questions: [
      {
        id: 'qst_ml_1',
        text: 'When training data exhibits strong class imbalance, which metric provides the harmonic mean of Precision and Recall?',
        type: 'MULTIPLE_CHOICE',
        options: ['Accuracy', 'F1-Score', 'Mean Absolute Error', 'R-Squared Score'],
        correctAnswers: [1],
        explanation: 'F1-Score is the harmonic mean of Precision and Recall, serving as a reliable benchmark on imbalanced datasets.',
        topicTag: 'Model Evaluation Metrics',
        points: 10,
      },
      {
        id: 'qst_ml_2',
        text: 'In Artificial Neural Networks, which non-linear activation function is defined mathematically as f(x) = max(0, x)?',
        type: 'MULTIPLE_CHOICE',
        options: ['Sigmoid', 'Hyperbolic Tangent (Tanh)', 'Rectified Linear Unit (ReLU)', 'Softmax'],
        correctAnswers: [2],
        explanation: 'ReLU outputs x for x > 0 and 0 otherwise, preventing vanishing gradients during backpropagation.',
        topicTag: 'Neural Network Architectures',
        points: 10,
      },
      {
        id: 'qst_ml_3',
        text: 'True or False: Overfitting occurs when a model performs exceptionally well on training data but fails to generalize to unseen test data.',
        type: 'TRUE_FALSE',
        options: ['True', 'False'],
        correctAnswers: [0],
        explanation: 'True. Overfitting corresponds to high variance where the model memorizes training noise instead of the underlying data distribution.',
        topicTag: 'Bias-Variance Tradeoff',
        points: 10,
      },
    ],
  },
];

export const SEED_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg_py_1',
    courseId: 'crs_python_101',
    title: 'Practical Lab 1: Python Modular Data Pipeline',
    instructions:
      'Write a Python module that ingests an array of student records, filters out inactive records, applies grade scaling via list comprehensions, and outputs a formatted summary dictionary. Must include custom exception handling.',
    dueDate: '2026-09-25T23:59:59Z',
    maxScore: 100,
    isOfflinePermitted: true,
    rubric: [
      { criterion: 'Comprehensions & Functional Filtering', points: 30 },
      { criterion: 'Custom Exception Handling & Validation', points: 35 },
      { criterion: 'Clean PEP8 Formatting & Modularity', points: 35 },
    ],
  },
  {
    id: 'asg_jv_1',
    courseId: 'crs_java_102',
    title: 'Practical Lab 2: Java Generic Repository & Exception Handler',
    instructions:
      'Design a generic interface Repository<T, ID> and implement an in-memory InMemoryRepository<T, ID> backed by HashMap. Provide thread-safe lookups and throw custom EntityNotFoundException.',
    dueDate: '2026-09-30T23:59:59Z',
    maxScore: 100,
    isOfflinePermitted: true,
    rubric: [
      { criterion: 'Generic Interface & Class Design', points: 35 },
      { criterion: 'Collection Map Utilization & Safety', points: 35 },
      { criterion: 'Custom Exception Hierarchy', points: 30 },
    ],
  },
  {
    id: 'asg_db_1',
    courseId: 'crs_dbms_103',
    title: 'Practical Lab 3: Schema Normalization & Complex SQL Reporting',
    instructions:
      'Given an unnormalized spreadsheet of course enrollments, decompose the schema to 3NF. Write a SQL migration script with DDL constraints and an analytical query computing student completion rates.',
    dueDate: '2026-10-05T23:59:59Z',
    maxScore: 100,
    isOfflinePermitted: true,
    rubric: [
      { criterion: 'Correct 3NF Table Decomposition', points: 40 },
      { criterion: 'Primary & Foreign Key Referential Integrity', points: 30 },
      { criterion: 'Multi-table Analytical JOIN Query', points: 30 },
    ],
  },
  {
    id: 'asg_ml_1',
    courseId: 'crs_ml_104',
    title: 'Practical Lab 4: End-to-End Classification Model & Evaluation',
    instructions:
      'Build a binary classification workflow in Python: split training/testing sets, train a logistic classifier or decision tree, generate a confusion matrix, and explain the Precision vs Recall tradeoffs.',
    dueDate: '2026-10-10T23:59:59Z',
    maxScore: 100,
    isOfflinePermitted: true,
    rubric: [
      { criterion: 'Data Preprocessing & Train-Test Splitting', points: 30 },
      { criterion: 'Model Training & Convergence', points: 35 },
      { criterion: 'Evaluation Metrics & Tradeoff Analysis', points: 35 },
    ],
  },
];

export const SEED_SUBMISSIONS: AssignmentSubmission[] = [
  {
    id: 'sub_py_1',
    assignmentId: 'asg_py_1',
    userId: 'usr_student_1',
    studentName: 'Aria Montgomery',
    submittedAt: '2026-08-28T16:20:00Z',
    content: `### Solution Implementation Overview: Python Data Pipeline
\`\`\`python
class InvalidRecordError(Exception):
    pass

def process_student_pipeline(records):
    cleaned = []
    for r in records:
        if not r.get("id"):
            raise InvalidRecordError("Missing student ID")
        if r.get("status") == "ACTIVE":
            cleaned.append({
                "id": r["id"],
                "scaled_score": min(100.0, r.get("raw_score", 0) * 1.1)
            })
    return {"processed_count": len(cleaned), "students": cleaned}
\`\`\``,
    attachmentName: 'python_data_pipeline.py',
    status: 'GRADED',
    score: 95,
    feedback:
      'Exceptional work Aria! Your custom exception handling is clean and the list transformation is efficient and PEP8 compliant.',
    gradedBy: 'Dr. Elena Rostova',
    gradedAt: '2026-08-30T10:15:00Z',
  },
  {
    id: 'sub_jv_1',
    assignmentId: 'asg_jv_1',
    userId: 'usr_student_2',
    studentName: 'Marcus Vance',
    submittedAt: '2026-09-02T11:45:00Z',
    content: `### Java Generic Repository Implementation
Implemented Repository<T, ID> using ConcurrentHashMap with synchronized blocks for key indexing. Added EntityNotFoundException when key lookups return null.`,
    attachmentName: 'GenericRepository.java',
    status: 'SUBMITTED',
  },
];

export const SEED_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr_1',
    userId: 'usr_student_1',
    courseId: 'crs_python_101',
    enrolledAt: '2026-01-15T09:00:00Z',
    completedLessons: ['les_py_1_1_1', 'les_py_1_1_2', 'les_py_1_2_1', 'les_py_2_1_1'],
    completedAt: '2026-08-30T12:00:00Z',
    lastAccessedAt: '2026-09-03T19:30:00Z',
    timeSpentMinutes: 1240,
    isDownloadedOffline: true,
    scorePercentage: 92,
    facultyFeedback: 'Outstanding comprehension of Python syntax and object models. Ready for advanced projects.',
  },
  {
    id: 'enr_2',
    userId: 'usr_student_1',
    courseId: 'crs_dbms_103',
    enrolledAt: '2026-02-01T10:00:00Z',
    completedLessons: ['les_db_1_1_1'],
    lastAccessedAt: '2026-09-04T02:10:00Z',
    timeSpentMinutes: 380,
    isDownloadedOffline: false,
    scorePercentage: 80,
    facultyFeedback: 'Good progress on SQL queries; continue practicing 3NF normalization.',
  },
  {
    id: 'enr_3',
    userId: 'usr_student_2',
    courseId: 'crs_java_102',
    enrolledAt: '2026-02-10T14:00:00Z',
    completedLessons: ['les_jv_1_1_1'],
    lastAccessedAt: '2026-09-01T15:20:00Z',
    timeSpentMinutes: 290,
    isDownloadedOffline: true,
    scorePercentage: 85,
    facultyFeedback: 'Solid grasp of JVM memory allocation and Stack vs Heap principles.',
  },
  {
    id: 'enr_4',
    userId: 'usr_student_2',
    courseId: 'crs_ml_104',
    enrolledAt: '2026-02-12T16:00:00Z',
    completedLessons: [],
    lastAccessedAt: '2026-09-02T10:00:00Z',
    timeSpentMinutes: 90,
    isDownloadedOffline: false,
    scorePercentage: 75,
  },
];

export const SEED_CERTIFICATES: Certificate[] = [
  {
    id: 'cert_py_001',
    certificateNumber: 'LF-2026-PY-9281',
    userId: 'usr_student_1',
    userName: 'Aria Montgomery',
    courseId: 'crs_python_101',
    courseTitle: 'Python Programming & Scripting Masterclass',
    instructorName: 'Dr. Elena Rostova',
    issueDate: '2026-08-30T12:00:00Z',
    verificationCode: 'VERIFY-PY-8849',
    scorePercentage: 92,
  },
];

export const SEED_DOUBTS: StudentDoubt[] = [
  {
    id: 'dbt_1',
    courseId: 'crs_python_101',
    courseTitle: 'Python Programming & Scripting Masterclass',
    chapterTitle: 'Chapter 1: Python Architecture & Core Variables',
    studentId: 'usr_student_1',
    studentName: 'Aria Montgomery',
    facultyId: 'usr_instructor_1',
    facultyName: 'Dr. Elena Rostova',
    question:
      'What is the fundamental difference between "is" and "==" in Python when comparing objects?',
    codeSnippet: 'a = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b) # True\nprint(a is b) # False',
    status: 'RESOLVED',
    answer:
      'Great question Aria! "==" checks for VALUE EQUALITY (whether the contents of both objects are equal). On the other hand, "is" checks for IDENTITY EQUALITY (whether both variables point to the exact same memory address, verified via id(a) == id(b)). Since "a" and "b" are distinct list allocations in memory, a == b is True, but a is b is False.',
    answeredAt: '2026-08-29T14:30:00Z',
    createdAt: '2026-08-29T11:00:00Z',
  },
  {
    id: 'dbt_2',
    courseId: 'crs_java_102',
    courseTitle: 'Java Programming & Object-Oriented Software Engineering',
    chapterTitle: 'Chapter 1: Java Virtual Machine & Class Construction',
    studentId: 'usr_student_2',
    studentName: 'Marcus Vance',
    facultyId: 'usr_instructor_1',
    facultyName: 'Dr. Elena Rostova',
    question:
      'Why does Java not support multiple inheritance with classes, but allows a class to implement multiple interfaces?',
    codeSnippet: '// class Multi extends ClassA, ClassB {} // Compile Error!\n// class Multi implements InterfaceA, InterfaceB {} // Allowed',
    status: 'RESOLVED',
    answer:
      'Java avoids multiple class inheritance to prevent the "Diamond Problem" of ambiguity: if ClassA and ClassB both define a concrete method foo(), the compiler would not know which method Multi inherits. With interfaces, before Java 8 they only declared abstract method signatures with no state fields, so no ambiguity occurred. Even with default methods, Java forces explicit override resolution.',
    answeredAt: '2026-09-01T16:00:00Z',
    createdAt: '2026-09-01T09:20:00Z',
  },
  {
    id: 'dbt_3',
    courseId: 'crs_dbms_103',
    courseTitle: 'Database Management Systems (DBMS) & SQL Architecture',
    chapterTitle: 'Chapter 2: Database Normalization & ACID Transactions',
    studentId: 'usr_student_1',
    studentName: 'Aria Montgomery',
    facultyId: 'usr_instructor_2',
    facultyName: 'Prof. David K. Sterling',
    question:
      'How does Write-Ahead Logging (WAL) in DBMS guarantee the Durability property in ACID transactions without flushing the entire database file to disk immediately?',
    status: 'PENDING',
    createdAt: '2026-09-03T18:10:00Z',
  },
];

export const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_student_1',
    title: 'Certificate Awarded: Python Programming',
    message: 'Congratulations! You achieved a 92% mastery score and earned your accredited Python Certificate.',
    type: 'CERTIFICATE',
    isRead: false,
    createdAt: '2026-08-30T12:00:00Z',
    actionUrl: 'certificates',
  },
  {
    id: 'notif_2',
    userId: 'usr_student_1',
    title: 'Faculty Resolved Your Doubt',
    message: 'Dr. Elena Rostova answered your question regarding "is" vs "==" in Python.',
    type: 'COURSE',
    isRead: false,
    createdAt: '2026-08-29T14:30:00Z',
    actionUrl: 'doubts',
  },
  {
    id: 'notif_3',
    userId: 'usr_instructor_1',
    title: 'New Student Question Received',
    message: 'Aria Montgomery asked a question on DBMS WAL Durability.',
    type: 'COURSE',
    isRead: false,
    createdAt: '2026-09-03T18:10:00Z',
    actionUrl: 'doubts',
  },
];

export const SEED_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud_1',
    timestamp: '2026-09-04T02:55:00Z',
    actorId: 'usr_admin_1',
    actorName: 'Cassian Thorne',
    actorRole: 'ADMIN',
    action: 'PLATFORM_HEALTH_CHECK',
    entity: 'SystemService',
    entityId: 'srv_sys_01',
    result: 'SUCCESS',
    details: 'Verified 4 active core subject syllabi (Python, Java, DBMS, ML) and local AI solver status.',
  },
  {
    id: 'aud_2',
    timestamp: '2026-09-03T18:10:00Z',
    actorId: 'usr_student_1',
    actorName: 'Aria Montgomery',
    actorRole: 'STUDENT',
    action: 'STUDENT_DOUBT_SUBMITTED',
    entity: 'StudentDoubt',
    entityId: 'dbt_3',
    result: 'SUCCESS',
    details: 'Submitted question on DBMS Write-Ahead Logging to faculty.',
  },
];

export const SEED_ML_MODELS: MLModelInfo[] = [
  {
    id: 'mdl_tutor_py',
    name: 'Python Knowledge Inference Engine',
    type: 'KNOWLEDGE_RETRIEVER',
    algorithm: 'AST Semantic Graph + TF-IDF Vector Space',
    version: '2.4.1',
    trainingDate: '2026-02-15T00:00:00Z',
    datasetVersion: 'py-curriculum-v3',
    featureCount: 256,
    accuracy: 0.96,
    f1Score: 0.95,
    status: 'ACTIVE',
    deploymentStatus: 'PRODUCTION_LOCAL',
  },
  {
    id: 'mdl_tutor_jv',
    name: 'Java Architecture Reasoner',
    type: 'KNOWLEDGE_RETRIEVER',
    algorithm: 'Heuristic OOP Parser & Semantic Indexer',
    version: '1.8.0',
    trainingDate: '2026-02-18T00:00:00Z',
    datasetVersion: 'java-core-v2',
    featureCount: 312,
    accuracy: 0.94,
    f1Score: 0.93,
    status: 'ACTIVE',
    deploymentStatus: 'PRODUCTION_LOCAL',
  },
  {
    id: 'mdl_tutor_db',
    name: 'DBMS Relational Query Assistant',
    type: 'KNOWLEDGE_RETRIEVER',
    algorithm: 'Relational Algebra Tree Analyzer',
    version: '2.1.0',
    trainingDate: '2026-02-20T00:00:00Z',
    datasetVersion: 'dbms-sql-v2',
    featureCount: 198,
    accuracy: 0.95,
    f1Score: 0.94,
    status: 'ACTIVE',
    deploymentStatus: 'PRODUCTION_LOCAL',
  },
  {
    id: 'mdl_tutor_ml',
    name: 'Machine Learning Concepts & Code Solver',
    type: 'KNOWLEDGE_RETRIEVER',
    algorithm: 'Gradient Vector Embeddings & Math Solver',
    version: '3.0.1',
    trainingDate: '2026-02-25T00:00:00Z',
    datasetVersion: 'ml-ai-v4',
    featureCount: 420,
    accuracy: 0.97,
    f1Score: 0.96,
    status: 'ACTIVE',
    deploymentStatus: 'PRODUCTION_LOCAL',
  },
];
