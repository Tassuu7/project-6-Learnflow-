/**
 * LearnFlow Comprehensive Tutorial Curriculum
 * Clean formatted end-to-end learning pack for Python, Java, DBMS, and ML
 * Each topic has 1 theory paragraph, 1 practical example, and 2 key points (zero markdown symbols)
 */

export interface TutorialTopic {
  id: string;
  subject: 'Python' | 'Java' | 'DBMS' | 'ML';
  chapterNumber: number;
  title: string;
  slug: string;
  videoUrl: string;
  videoTitle: string;
  summary: string;
  content: string;
  exampleExplanation: string;
  keyPoints: [string, string];
  exampleCode: string;
  expectedOutput: string;
  practiceQuestion: string;
  practiceStarter: string;
  practiceSolution: string;
  practiceExplanation: string;
}

export interface SubjectTutorialPack {
  subject: 'Python' | 'Java' | 'DBMS' | 'ML';
  title: string;
  description: string;
  fullCourseVideoUrl: string;
  fullCourseVideoTitle: string;
  topics: TutorialTopic[];
}

export const PYTHON_TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: "py_home",
    subject: "Python",
    chapterNumber: 1,
    title: "Python HOME",
    slug: "py_home",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 1: Python HOME",
    summary: "Comprehensive guide to Python HOME",
    content: "Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It is designed with an emphasis on code readability, allowing developers to express concepts in fewer lines of code compared to languages like C or Java. Python supports multiple programming paradigms including procedural, object-oriented, and functional programming styles. Because of its massive library ecosystem and gentle learning curve, Python is widely adopted in web development, scientific computing, automation, data engineering, and artificial intelligence systems.",
    exampleExplanation: "In this example, we define course variables and output a formatted welcome message to the console.",
    keyPoints: [
      "Python emphasizes clean readability and utilizes dynamic typing so variables do not need explicit type declarations.",
      "The language runs on the Python Virtual Machine which executes compiled bytecode across Windows, macOS, and Linux without modification."
    ],
    exampleCode: "# Python HOME Introduction\ncourse_title = \"Python Mastery Track\"\ntotal_modules = 30\nis_active = True\n\nprint(\"Welcome to:\", course_title)\nprint(\"Modules to complete:\", total_modules)\nprint(\"Enrollment Active:\", is_active)",
    expectedOutput: "Welcome to: Python Mastery Track\nModules to complete: 30\nEnrollment Active: True",
    practiceQuestion: "Define two variables named subject and duration, then print them on separate lines.",
    practiceStarter: "# Define your variables below\nsubject = \"Python\"\nduration = \"40 Hours\"\n\n# Print your variables\n",
    practiceSolution: "subject = \"Python\"\nduration = \"40 Hours\"\nprint(\"Subject:\", subject)\nprint(\"Duration:\", duration)",
    practiceExplanation: "Using print outputs each argument to standard output followed by a newline."
  },
  {
    id: "py_intro",
    subject: "Python",
    chapterNumber: 2,
    title: "Python Intro",
    slug: "py_intro",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 2: Python Intro",
    summary: "Comprehensive guide to Python Intro",
    content: "Python is an interpreted scripting language that operates through an execution pipeline involving source code parsing and bytecode compilation. When a Python program is run, the CPython interpreter reads the source instructions, translates them into an abstract syntax tree, compiles them into bytecode, and passes the bytecode to the Python Virtual Machine. This process removes the need for manual compilation steps and allows rapid prototyping across diverse computing platforms.",
    exampleExplanation: "In this example, we import the platform and sys modules to inspect the running Python interpreter environment and operating system.",
    keyPoints: [
      "Python source files are automatically compiled into bytecode with pyc extensions stored in the pycache directory for faster subsequent execution.",
      "Automatic memory management is handled by reference counting paired with a cyclic garbage collector to release unused memory."
    ],
    exampleCode: "import sys\nimport platform\n\nprint(\"Python Implementation:\", platform.python_implementation())\nprint(\"Operating System:\", platform.system())\nprint(\"Compiler:\", platform.python_compiler())",
    expectedOutput: "Python Implementation: CPython\nOperating System: Windows\nCompiler: MSC v.1939 64 bit (AMD64)",
    practiceQuestion: "Use the sys module to print the current Python version string.",
    practiceStarter: "import sys\n# Print the version string\n",
    practiceSolution: "import sys\nprint(\"Version:\", sys.version.split()[0])",
    practiceExplanation: "sys.version provides complete release details of the active Python interpreter."
  },
  {
    id: "py_getstarted",
    subject: "Python",
    chapterNumber: 3,
    title: "Python Get Started",
    slug: "py_getstarted",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 3: Python Get Started",
    summary: "Comprehensive guide to Python Get Started",
    content: "Getting started with Python requires installing the official runtime from python.org and configuring an isolated development workspace. In professional software development, developers use virtual environments to manage dependencies separately for each project, preventing conflicts between different library versions. Scripts are typically executed from the terminal using the python command, while modular scripts use entry point guards to prevent side effects when imported by other files.",
    exampleExplanation: "In this example, we structure a clean main function entry point guarded by the name equals main condition.",
    keyPoints: [
      "Virtual environments created with the venv module isolate project dependencies from global system packages.",
      "The name equals main construct ensures that the program only runs its primary logic when executed directly as a script."
    ],
    exampleCode: "def main():\n    system_name = \"LearnFlow Engine\"\n    version = 3.12\n    print(\"Application:\", system_name)\n    print(\"Version:\", version)\n    print(\"Setup verified successfully.\")\n\nif __name__ == \"__main__\":\n    main()",
    expectedOutput: "Application: LearnFlow Engine\nVersion: 3.12\nSetup verified successfully.",
    practiceQuestion: "Write a function named run_setup that prints 'Environment Ready' and call it inside the main guard.",
    practiceStarter: "# Complete the script\ndef run_setup():\n    pass\n\nif __name__ == \"__main__\":\n    run_setup()",
    practiceSolution: "def run_setup():\n    print(\"Environment Ready\")\n\nif __name__ == \"__main__\":\n    run_setup()",
    practiceExplanation: "Calling functions from within the main guard organizes program execution cleanly."
  },
  {
    id: "py_syntax",
    subject: "Python",
    chapterNumber: 4,
    title: "Python Syntax",
    slug: "py_syntax",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 4: Python Syntax",
    summary: "Comprehensive guide to Python Syntax",
    content: "Python syntax is defined by significant whitespace indentation rather than curly braces or keywords like begin and end. Every block of code under a control structure, loop, or function must be indented by exactly four spaces. Semicolons are not required at the end of statements because the interpreter recognizes line breaks as statement boundaries. This structural constraint enforces clean, uniform formatting across development teams.",
    exampleExplanation: "In this example, we use consistent four-space indentation to define nested decision logic based on temperature readings.",
    keyPoints: [
      "Standard indentation requires four spaces per indentation level and mixing tabs with spaces causes an IndentationError.",
      "A colon character must be placed at the end of conditional, loop, and function header statements before beginning the indented block."
    ],
    exampleCode: "temperature = 26\nis_sunny = True\n\nif temperature > 20:\n    print(\"The weather is warm.\")\n    if is_sunny:\n        print(\"Remember to wear sunglasses.\")\nelse:\n    print(\"The weather is cold.\")",
    expectedOutput: "The weather is warm.\nRemember to wear sunglasses.",
    practiceQuestion: "Write an if else condition with four-space indentation that checks if marks are greater than 50.",
    practiceStarter: "marks = 75\n# Add indented if-else block\n",
    practiceSolution: "marks = 75\nif marks > 50:\n    print(\"Passed\")\nelse:\n    print(\"Failed\")",
    practiceExplanation: "The four-space indentation establishes the code blocks belonging to each branch."
  },
  {
    id: "py_comments",
    subject: "Python",
    chapterNumber: 5,
    title: "Python Comments",
    slug: "py_comments",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 5: Python Comments",
    summary: "Comprehensive guide to Python Comments",
    content: "Comments in Python allow programmers to document source code, explain complex algorithms, and provide instructions for maintenance engineers. The hash character marks the start of a single-line comment, causing the interpreter to ignore the rest of the line. For comprehensive module and function documentation, Python provides docstrings enclosed in triple quotation marks, which remain accessible at runtime through the doc attribute.",
    exampleExplanation: "In this example, we document a financial interest function using both inline comments and an official docstring.",
    keyPoints: [
      "Single-line comments begin with a hash symbol and are completely ignored during program execution.",
      "Docstrings placed directly beneath function signatures are retained in memory and power automated documentation tools."
    ],
    exampleCode: "def calculate_simple_interest(principal, rate, time):\n    '''Calculates simple interest given principal, rate percentage, and time in years.'''\n    # Calculate interest using the standard formula\n    interest = (principal * rate * time) / 100\n    return interest\n\nresult = calculate_simple_interest(1000, 5, 2)\nprint(\"Interest Amount:\", result)\nprint(\"Docstring Summary:\", calculate_simple_interest.__doc__)",
    expectedOutput: "Interest Amount: 100.0\nDocstring Summary: Calculates simple interest given principal, rate percentage, and time in years.",
    practiceQuestion: "Add a docstring to a function that calculates the square of a number.",
    practiceStarter: "def square(n):\n    # Add docstring\n    return n * n\n\nprint(square(6))\nprint(square.__doc__)",
    practiceSolution: "def square(n):\n    '''Returns the square of the given number.'''\n    return n * n\n\nprint(square(6))\nprint(square.__doc__)",
    practiceExplanation: "Triple quotes immediately after the def line define the official docstring."
  },
  {
    id: "py_variables",
    subject: "Python",
    chapterNumber: 6,
    title: "Python Variables",
    slug: "py_variables",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 6: Python Variables",
    summary: "Comprehensive guide to Python Variables",
    content: "Variables in Python serve as named labels that reference objects stored in heap memory. Unlike statically typed languages where memory containers are fixed to a single type, Python variables can be reassigned to objects of different data types at runtime. Python automatically manages object creation and disposal using an internal memory allocator and reference counter. When no variable points to an object, the garbage collector safely reclaims that memory.",
    exampleExplanation: "In this example, we demonstrate variable assignment, dynamic reassignment to a new type, and simultaneous multi-variable assignment.",
    keyPoints: [
      "Variables are created automatically when assigned a value using the equal operator without type declarations.",
      "Python supports simultaneous multiple assignment and direct variable swapping without requiring temporary holding variables."
    ],
    exampleCode: "user_id = 101\nprint(\"Initial value:\", user_id, \"Type:\", type(user_id).__name__)\n\nuser_id = \"USER_101\"\nprint(\"Reassigned value:\", user_id, \"Type:\", type(user_id).__name__)\n\nx, y = 10, 20\nx, y = y, x\nprint(\"Swapped values: x =\", x, \"y =\", y)",
    expectedOutput: "Initial value: 101 Type: int\nReassigned value: USER_101 Type: str\nSwapped values: x = 20 y = 10",
    practiceQuestion: "Assign values 50 and 100 to variables width and height in a single line.",
    practiceStarter: "# Single-line assignment\nwidth, height = 0, 0\n\nprint(\"Width:\", width, \"Height:\", height)",
    practiceSolution: "width, height = 50, 100\nprint(\"Width:\", width, \"Height:\", height)",
    practiceExplanation: "Tuple unpacking enables assigning multiple variables in one line separated by commas."
  },
  {
    id: "py_datatypes",
    subject: "Python",
    chapterNumber: 7,
    title: "Python Data Types",
    slug: "py_datatypes",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 7: Python Data Types",
    summary: "Comprehensive guide to Python Data Types",
    content: "Python features a rich set of built-in data types categorized into numbers, sequence types, mapping collections, sets, and booleans. Everything in Python is treated as an object, including primitive values like integers and floating-point numbers. The type function allows developers to inspect the classification of any variable during runtime. Selecting the appropriate data structure ensures efficient memory utilization and optimal execution speed.",
    exampleExplanation: "In this example, we inspect variables holding different built-in types to examine their internal type classification.",
    keyPoints: [
      "Standard sequence data types include strings, lists, and tuples, while dictionaries represent key-value mappings.",
      "The type function returns the class representation of any object passed to it."
    ],
    exampleCode: "items = [\n    42,\n    3.1415,\n    \"LearnFlow\",\n    True,\n    [1, 2, 3],\n    (4, 5),\n    {\"role\": \"student\"},\n    {10, 20}\n]\n\nfor item in items:\n    print(\"Value:\", str(item).ljust(18), \"Type:\", type(item).__name__)",
    expectedOutput: "Value: 42                 Type: int\nValue: 3.1415             Type: float\nValue: LearnFlow          Type: str\nValue: True               Type: bool\nValue: [1, 2, 3]          Type: list\nValue: (4, 5)             Type: tuple\nValue: {'role': 'student'} Type: dict\nValue: {10, 20}           Type: set",
    practiceQuestion: "Check the data type of a variable holding True and print its name.",
    practiceStarter: "flag = True\n# Print type name\n",
    practiceSolution: "flag = True\nprint(type(flag).__name__)",
    practiceExplanation: "type(flag).__name__ returns bool for boolean values."
  },
  {
    id: "py_numbers",
    subject: "Python",
    chapterNumber: 8,
    title: "Python Numbers",
    slug: "py_numbers",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 8: Python Numbers",
    summary: "Comprehensive guide to Python Numbers",
    content: "Python provides three distinct numeric types: integers, floating-point numbers, and complex numbers. Integers have arbitrary precision in Python 3, meaning they can grow as large as available memory permits without causing integer overflow errors. Floating-point numbers are implemented using standard 64-bit double precision according to the IEEE 754 standard. Complex numbers have real and imaginary components written with a j suffix.",
    exampleExplanation: "In this example, we perform arithmetic calculations on large integers, floating-point numbers, and complex numbers.",
    keyPoints: [
      "Integers automatically scale in size to prevent numerical overflow during large calculations.",
      "Floating-point calculations follow standard binary representation rules where precision limits must be considered."
    ],
    exampleCode: "large_number = 2 ** 64\nprint(\"Large 64-bit integer:\", large_number)\n\nfloating_val = 19.95 + 0.05\nprint(\"Float value:\", floating_val)\n\ncomplex_num = 3 + 4j\nprint(\"Complex number:\", complex_num)\nprint(\"Real part:\", complex_num.real, \"Imaginary part:\", complex_num.imag)",
    expectedOutput: "Large 64-bit integer: 18446744073709551616\nFloat value: 20.0\nComplex number: (3+4j)\nReal part: 3.0 Imaginary part: 4.0",
    practiceQuestion: "Compute 10 raised to the power of 5 using the exponentiation operator.",
    practiceStarter: "# Compute 10^5\nresult = 0\nprint(\"10^5 =\", result)",
    practiceSolution: "result = 10 ** 5\nprint(\"10^5 =\", result)",
    practiceExplanation: "The double asterisk operator performs exponentiation in Python."
  },
  {
    id: "py_casting",
    subject: "Python",
    chapterNumber: 9,
    title: "Python Casting",
    slug: "py_casting",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 9: Python Casting",
    summary: "Comprehensive guide to Python Casting",
    content: "Type casting is the process of converting a value from one data type to another. In Python, casting is performed explicitly using constructor functions such as int, float, str, and bool. Converting a floating-point number to an integer truncates the decimal portion toward zero rather than rounding. When converting string inputs from web forms or files, explicit casting ensures values can participate in mathematical operations.",
    exampleExplanation: "In this example, we convert numeric strings to integers and floats, and demonstrate truncation during float-to-int conversion.",
    keyPoints: [
      "The int function discards decimal fractions when converting floating-point numbers to integers.",
      "Strings containing valid numeric characters can be converted to numbers for arithmetic computations."
    ],
    exampleCode: "price_string = \"89.50\"\nprice_float = float(price_string)\nprice_int = int(price_float)\n\nprint(\"Original string:\", price_string, \"Type:\", type(price_string).__name__)\nprint(\"Converted float:\", price_float, \"Type:\", type(price_float).__name__)\nprint(\"Truncated int:\", price_int, \"Type:\", type(price_int).__name__)\n\nprint(\"Boolean casting of zero:\", bool(0))\nprint(\"Boolean casting of non-zero:\", bool(42))",
    expectedOutput: "Original string: 89.50 Type: str\nConverted float: 89.5 Type: float\nTruncated int: 89 Type: int\nBoolean casting of zero: False\nBoolean casting of non-zero: True",
    practiceQuestion: "Convert the string '250' to an integer and multiply by 4.",
    practiceStarter: "raw_val = \"250\"\n# Convert and multiply\n",
    practiceSolution: "raw_val = \"250\"\ntotal = int(raw_val) * 4\nprint(\"Total:\", total)",
    practiceExplanation: "int('250') converts the string into an integer participating in arithmetic."
  },
  {
    id: "py_strings",
    subject: "Python",
    chapterNumber: 10,
    title: "Python Strings",
    slug: "py_strings",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 10: Python Strings",
    summary: "Comprehensive guide to Python Strings",
    content: "Strings in Python are immutable sequences of Unicode characters, meaning their contents cannot be modified in place after creation. Python provides an extensive set of built-in methods for searching, splitting, replacing, and transforming string data. Characters are accessed using zero-based indexing from the beginning or negative indexing from the end. Formatted string literals allow variables and expressions to be directly embedded inside text using curly braces.",
    exampleExplanation: "In this example, we demonstrate string slicing, character transformation methods, and formatted string interpolation.",
    keyPoints: [
      "Strings are immutable so methods like upper and replace always return a new string instance.",
      "Formatted f-strings provide a readable and efficient syntax for variable interpolation."
    ],
    exampleCode: "message = \"  learnflow engineering academy  \"\ncleaned = message.strip().title()\nprint(\"Cleaned text:\", cleaned)\n\nfirst_word = cleaned[:9]\nprint(\"Sliced first word:\", first_word)\n\nframework = \"Python\"\nlessons = 30\nprint(f\"Enrolled in {framework} with {lessons} comprehensive lessons.\")",
    expectedOutput: "Cleaned text: Learnflow Engineering Academy\nSliced first word: Learnflow\nEnrolled in Python with 30 comprehensive lessons.",
    practiceQuestion: "Extract the first five characters of the string 'Engineering' using slicing.",
    practiceStarter: "text = \"Engineering\"\n# Extract first 5 characters\n",
    practiceSolution: "text = \"Engineering\"\nprint(text[:5])",
    practiceExplanation: "The slice text[:5] retrieves characters from index zero up to index four."
  },
  {
    id: "py_booleans",
    subject: "Python",
    chapterNumber: 11,
    title: "Python Booleans",
    slug: "py_booleans",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 11: Python Booleans",
    summary: "Comprehensive guide to Python Booleans",
    content: "Booleans represent truth values in computer logic, taking one of two states: True or False. In Python, the bool type is a subclass of the integer type where True corresponds to the number one and False corresponds to zero. Every object in Python has an inherent truth value known as truthiness. Empty collections, numerical zero, and the None value evaluate to False, while populated collections and non-zero numbers evaluate to True.",
    exampleExplanation: "In this example, we test boolean evaluation on numbers, strings, and collections to observe truthiness rules.",
    keyPoints: [
      "Empty containers, zero, and None evaluate to False in boolean conditional checks.",
      "Booleans can participate in arithmetic operations where True equals one and False equals zero."
    ],
    exampleCode: "active_users = 15\nhas_permission = True\ncart_items = []\n\nprint(\"Active users truthiness:\", bool(active_users))\nprint(\"Empty cart truthiness:\", bool(cart_items))\n\nif active_users and has_permission:\n    print(\"User access granted.\")\n\nprint(\"Boolean math True + True:\", True + True)",
    expectedOutput: "Active users truthiness: True\nEmpty cart truthiness: False\nUser access granted.\nBoolean math True + True: 2",
    practiceQuestion: "Write a condition that checks if an input string contains non-whitespace text.",
    practiceStarter: "raw_text = \"  Hello  \"\n# Check truthiness of stripped text\n",
    practiceSolution: "raw_text = \"  Hello  \"\nif raw_text.strip():\n    print(\"Valid input\")\nelse:\n    print(\"Empty input\")",
    practiceExplanation: "raw_text.strip() produces non-empty string which evaluates to True."
  },
  {
    id: "py_operators",
    subject: "Python",
    chapterNumber: 12,
    title: "Python Operators",
    slug: "py_operators",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 12: Python Operators",
    summary: "Comprehensive guide to Python Operators",
    content: "Operators are special symbols that carry out arithmetic, relational, logical, assignment, and bitwise computations on operands. Python provides standard arithmetic operators including floor division and modulus, comparison operators that evaluate equality and relative size, and logical operators that support short-circuit evaluation. Identity operators check whether two variables share the same memory address, while membership operators test for presence inside sequences.",
    exampleExplanation: "In this example, we evaluate arithmetic, comparison, logical, and membership operators on sample variables.",
    keyPoints: [
      "Floor division discards fractional remainders, while modulus returns the division remainder.",
      "Logical and and or operators use short-circuit evaluation to skip unnecessary sub-expressions."
    ],
    exampleCode: "a = 19\nb = 4\n\nprint(\"Floor Division (19 // 4):\", a // b)\nprint(\"Modulo Remainder (19 % 4):\", a % b)\nprint(\"Power (2 ** 6):\", 2 ** 6)\n\navailable_roles = [\"admin\", \"instructor\", \"student\"]\ncurrent_role = \"student\"\nprint(\"Membership test (in):\", current_role in available_roles)",
    expectedOutput: "Floor Division (19 // 4): 4\nModulo Remainder (19 % 4): 3\nPower (2 ** 6): 64\nMembership test (in): True",
    practiceQuestion: "Check if number 25 is greater than 10 and less than 50 using comparison chaining.",
    practiceStarter: "num = 25\n# Check range\n",
    practiceSolution: "num = 25\nin_range = 10 < num < 50\nprint(\"In range:\", in_range)",
    practiceExplanation: "Python supports chained comparisons to test ranges in a clean syntax."
  },
  {
    id: "py_lists",
    subject: "Python",
    chapterNumber: 13,
    title: "Python Lists",
    slug: "py_lists",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 13: Python Lists",
    summary: "Comprehensive guide to Python Lists",
    content: "Lists are ordered, mutable collections of heterogeneous elements enclosed in square brackets. Because lists are dynamic arrays, items can be added, modified, reordered, and removed after creation. Python lists support indexed access, slicing, and a rich variety of methods like append, insert, remove, and sort. List comprehensions offer a concise, declarative syntax for transforming and filtering list data into new lists.",
    exampleExplanation: "In this example, we manipulate a list of scores and use a list comprehension to square even numbers.",
    keyPoints: [
      "Lists are mutable so their contents can be altered in place without allocating a new object.",
      "List comprehensions provide an efficient and readable alternative to traditional for loops."
    ],
    exampleCode: "scores = [85, 92, 78, 95, 88]\nscores.append(99)\nscores.sort()\nprint(\"Sorted scores:\", scores)\n\neven_squares = [x * x for x in range(1, 11) if x % 2 == 0]\nprint(\"Even squares up to 10:\", even_squares)",
    expectedOutput: "Sorted scores: [78, 85, 88, 92, 95, 99]\nEven squares up to 10: [4, 16, 36, 64, 100]",
    practiceQuestion: "Use list comprehension to convert a list of lowercase fruit names to uppercase.",
    practiceStarter: "fruits = [\"apple\", \"banana\", \"cherry\"]\n# List comprehension\n",
    practiceSolution: "fruits = [\"apple\", \"banana\", \"cherry\"]\nupper_fruits = [f.upper() for f in fruits]\nprint(upper_fruits)",
    practiceExplanation: "The expression f.upper() runs for each element inside the comprehension."
  },
  {
    id: "py_tuples",
    subject: "Python",
    chapterNumber: 14,
    title: "Python Tuples",
    slug: "py_tuples",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 14: Python Tuples",
    summary: "Comprehensive guide to Python Tuples",
    content: "Tuples are ordered, immutable collections defined with parentheses. Once a tuple is created, its elements cannot be added, replaced, or removed, providing write-protection for sensitive data like geographic coordinates, database configurations, and fixed dimensions. Because tuples are immutable, they can be hashed and used as dictionary keys, unlike lists. Tuples also support unpacking, allowing multiple variables to receive tuple values in a single statement.",
    exampleExplanation: "In this example, we define coordinates as a tuple, unpack them into variables, and verify that single-element tuples require a comma.",
    keyPoints: [
      "Tuples are immutable, which guarantees that data cannot be accidentally altered by other functions.",
      "Creating a single-element tuple requires a trailing comma after the value inside the parentheses."
    ],
    exampleCode: "point = (12.5, 45.8, 110.2)\nx, y, z = point\nprint(f\"Point coordinates: x={x}, y={y}, z={z}\")\n\nsingle_item = (\"LearnFlow\",)\nprint(\"Type of single item tuple:\", type(single_item).__name__)\nprint(\"Total elements in point:\", len(point))",
    expectedOutput: "Point coordinates: x=12.5, y=45.8, z=110.2\nType of single item tuple: tuple\nTotal elements in point: 3",
    practiceQuestion: "Unpack a tuple containing three color codes into red, green, and blue variables.",
    practiceStarter: "rgb = (255, 128, 0)\n# Unpack rgb\n",
    practiceSolution: "rgb = (255, 128, 0)\nr, g, b = rgb\nprint(\"Red:\", r, \"Green:\", g, \"Blue:\", b)",
    practiceExplanation: "Positional unpacking binds each variable to its matching tuple index."
  },
  {
    id: "py_sets",
    subject: "Python",
    chapterNumber: 15,
    title: "Python Sets",
    slug: "py_sets",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 15: Python Sets",
    summary: "Comprehensive guide to Python Sets",
    content: "Sets are unordered collections of unique, hashable elements defined using curly braces or the set constructor. Because duplicate entries are automatically discarded, sets are ideal for eliminating redundancy from datasets. Sets utilize a hash table internally, enabling constant-time average membership testing. They also provide mathematical set operations such as union, intersection, difference, and symmetric difference.",
    exampleExplanation: "In this example, we remove duplicate elements from an array and perform set union and intersection operations.",
    keyPoints: [
      "Sets automatically eliminate duplicate values and do not maintain element insertion order.",
      "Membership testing with the in operator runs in constant time on sets compared to linear time on lists."
    ],
    exampleCode: "raw_ids = [101, 102, 102, 103, 104, 104, 105]\nunique_ids = set(raw_ids)\nprint(\"Deduplicated IDs:\", sorted(list(unique_ids)))\n\nfrontend_skills = {\"HTML\", \"CSS\", \"JavaScript\", \"Git\"}\nbackend_skills = {\"Python\", \"SQL\", \"Docker\", \"Git\"}\n\nprint(\"Shared skills (Intersection):\", frontend_skills & backend_skills)\nprint(\"All skills (Union):\", frontend_skills | backend_skills)",
    expectedOutput: "Deduplicated IDs: [101, 102, 103, 104, 105]\nShared skills (Intersection): {'Git'}\nAll skills (Union): {'CSS', 'Docker', 'Git', 'HTML', 'JavaScript', 'Python', 'SQL'}",
    practiceQuestion: "Find elements present in set A but not in set B using the difference operator.",
    practiceStarter: "set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\n# Difference A - B\n",
    practiceSolution: "set_a = {1, 2, 3, 4}\nset_b = {3, 4, 5, 6}\nprint(\"Difference:\", set_a - set_b)",
    practiceExplanation: "The minus operator returns elements belonging to set A that are absent from set B."
  },
  {
    id: "py_dictionaries",
    subject: "Python",
    chapterNumber: 16,
    title: "Python Dictionaries",
    slug: "py_dictionaries",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 16: Python Dictionaries",
    summary: "Comprehensive guide to Python Dictionaries",
    content: "Dictionaries are mutable collections of key-value pairs where keys must be immutable and unique. In Python 3.7 and later, dictionaries preserve the insertion order of their entries. Dictionaries are implemented using an optimized hash table, allowing fast retrieval, addition, and modification of data. The get method safely retrieves values by providing a default fallback if the requested key does not exist.",
    exampleExplanation: "In this example, we store student attributes in a dictionary, update records, and safely query fields using the get method.",
    keyPoints: [
      "Dictionary keys must be immutable types like strings, numbers, or tuples.",
      "The get method avoids raising a KeyError when accessing keys that may not exist in the dictionary."
    ],
    exampleCode: "student = {\n    \"name\": \"Aria\",\n    \"major\": \"Computer Science\",\n    \"gpa\": 3.92\n}\n\nstudent[\"gpa\"] = 3.95\nstudent[\"completed_credits\"] = 45\n\nprint(\"Student Name:\", student.get(\"name\"))\nprint(\"Scholarship Status:\", student.get(\"scholarship\", \"Pending Review\"))\n\nprint(\"Dictionary keys:\", list(student.keys()))",
    expectedOutput: "Student Name: Aria\nScholarship Status: Pending Review\nDictionary keys: ['name', 'major', 'gpa', 'completed_credits']",
    practiceQuestion: "Add a new key 'semester' with value 4 to an existing dictionary and print it.",
    practiceStarter: "profile = {\"name\": \"Leo\", \"course\": \"Java\"}\n# Add semester\n",
    practiceSolution: "profile = {\"name\": \"Leo\", \"course\": \"Java\"}\nprofile[\"semester\"] = 4\nprint(profile)",
    practiceExplanation: "Assigning to profile['semester'] inserts the key-value pair into the dictionary."
  },
  {
    id: "py_ifelse",
    subject: "Python",
    chapterNumber: 17,
    title: "Python If...Else",
    slug: "py_ifelse",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 17: Python If...Else",
    summary: "Comprehensive guide to Python If...Else",
    content: "Conditional statements direct the flow of execution in a program based on whether specified conditions evaluate to True or False. The if statement executes its code block if the condition is met, while elif tests alternate conditions in sequence, and else provides a default fallback. Python also supports concise conditional expressions known as ternary operators, allowing developers to assign values conditionally on a single line.",
    exampleExplanation: "In this example, we classify examination marks into academic grades and use a ternary expression to determine passing status.",
    keyPoints: [
      "Conditions are evaluated sequentially and execution leaves the block immediately after the first True condition matches.",
      "Ternary expressions evaluate conditions inline to produce clean, readable assignment statements."
    ],
    exampleCode: "score = 84\n\nif score >= 90:\n    grade = \"A\"\nelif score >= 80:\n    grade = \"B\"\nelif score >= 70:\n    grade = \"C\"\nelse:\n    grade = \"F\"\n\nstatus = \"Passed\" if score >= 70 else \"Failed\"\nprint(f\"Score: {score} | Grade: {grade} | Status: {status}\")",
    expectedOutput: "Score: 84 | Grade: B | Status: Passed",
    practiceQuestion: "Write a one-line ternary expression that checks if a number is positive or negative.",
    practiceStarter: "n = 15\n# Ternary expression\n",
    practiceSolution: "n = 15\nresult = \"Positive\" if n > 0 else \"Negative\"\nprint(\"Sign:\", result)",
    practiceExplanation: "The expression assigns Positive when n > 0 and Negative otherwise."
  },
  {
    id: "py_while",
    subject: "Python",
    chapterNumber: 18,
    title: "Python While Loops",
    slug: "py_while",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 18: Python While Loops",
    summary: "Comprehensive guide to Python While Loops",
    content: "While loops execute a block of code repeatedly as long as a target condition remains True. They are primarily used when the exact number of iterations is unknown in advance, such as waiting for user input, reading streaming data, or polling network sockets. Loop execution can be altered using break to exit prematurely, continue to skip to the next iteration, or an optional else block that runs when the loop terminates normally.",
    exampleExplanation: "In this example, we use a while loop to perform a countdown sequence and execute the loop else block.",
    keyPoints: [
      "The condition is evaluated before each iteration and must eventually become False to prevent infinite loops.",
      "The else clause associated with a while loop executes only when the loop terminates without encountering a break statement."
    ],
    exampleCode: "count = 3\nwhile count > 0:\n    print(\"Countdown:\", count)\n    count -= 1\nelse:\n    print(\"Countdown finished. System launched.\")",
    expectedOutput: "Countdown: 3\nCountdown: 2\nCountdown: 1\nCountdown finished. System launched.",
    practiceQuestion: "Write a while loop that doubles a starting number of 2 until it exceeds 20.",
    practiceStarter: "num = 2\n# Double num in while loop\n",
    practiceSolution: "num = 2\nwhile num <= 20:\n    print(\"Value:\", num)\n    num *= 2",
    practiceExplanation: "The loop repeats three times printing 2, 4, 8, 16 before terminating."
  },
  {
    id: "py_for",
    subject: "Python",
    chapterNumber: 19,
    title: "Python For Loops",
    slug: "py_for",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 19: Python For Loops",
    summary: "Comprehensive guide to Python For Loops",
    content: "For loops in Python iterate over elements of any iterable sequence such as lists, strings, tuples, dictionaries, or ranges. Unlike index-counted loops in C or Java, Python for loops function as for-each iterators that automatically extract successive elements. Built-in helpers like range generate arithmetic progressions, enumerate pairs elements with their zero-based index, and zip combines multiple iterables concurrently.",
    exampleExplanation: "In this example, we iterate through lists using range, enumerate, and zip to demonstrate modern looping techniques.",
    keyPoints: [
      "The range function produces numbers on demand using an iterator without storing the entire list in memory.",
      "The enumerate helper generates both the current loop index and the element in a clean tuple unpacking format."
    ],
    exampleCode: "subjects = [\"Python\", \"Java\", \"DBMS\", \"Machine Learning\"]\n\nfor index, name in enumerate(subjects, start=1):\n    print(f\"Track {index}: {name}\")\n\nhours = [40, 35, 25, 30]\nprint(\"\nSubject Hours Overview:\")\nfor name, hr in zip(subjects, hours):\n    print(f\" - {name} requires {hr} hours.\")",
    expectedOutput: "Track 1: Python\nTrack 2: Java\nTrack 3: DBMS\nTrack 4: Machine Learning\n\nSubject Hours Overview:\n - Python requires 40 hours.\n - Java requires 35 hours.\n - DBMS requires 25 hours.\n - Machine Learning requires 30 hours.",
    practiceQuestion: "Compute the sum of integers from 1 to 5 using a for loop.",
    practiceStarter: "total = 0\n# For loop with range\n",
    practiceSolution: "total = 0\nfor i in range(1, 6):\n    total += i\nprint(\"Total sum:\", total)",
    practiceExplanation: "range(1, 6) generates values 1 through 5 which are added to the running total."
  },
  {
    id: "py_functions",
    subject: "Python",
    chapterNumber: 20,
    title: "Python Functions",
    slug: "py_functions",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 20: Python Functions",
    summary: "Comprehensive guide to Python Functions",
    content: "Functions are modular blocks of reusable code designed to perform a specific task and optionally return a result. Defining functions reduces code redundancy, enhances readability, and enables structured testing. Functions are declared with the def keyword and can accept positional arguments, default arguments, and variable-length arguments using args and kwargs. In Python, functions are first-class objects that can be passed as arguments, assigned to variables, and returned from other functions.",
    exampleExplanation: "In this example, we define a billing calculation function that uses default parameters and positional arguments.",
    keyPoints: [
      "Functions return None by default if no explicit return statement is provided.",
      "Default parameter values must always follow non-default parameters in the function definition header."
    ],
    exampleCode: "def calculate_total(base_price, tax_rate=0.08, discount=0.0):\n    subtotal = base_price - discount\n    total = subtotal * (1 + tax_rate)\n    return round(total, 2)\n\ninvoice_a = calculate_total(100.0)\ninvoice_b = calculate_total(100.0, tax_rate=0.10, discount=15.0)\n\nprint(\"Standard Invoice Total:\", invoice_a)\nprint(\"Discounted Invoice Total:\", invoice_b)",
    expectedOutput: "Standard Invoice Total: 108.0\nDiscounted Invoice Total: 93.5",
    practiceQuestion: "Write a function named multiply that takes two numbers and returns their product.",
    practiceStarter: "# Define multiply\n",
    practiceSolution: "def multiply(a, b):\n    return a * b\n\nprint(\"Product:\", multiply(6, 7))",
    practiceExplanation: "The return keyword hands the calculated product back to the caller."
  },
  {
    id: "py_lambda",
    subject: "Python",
    chapterNumber: 21,
    title: "Python Lambda",
    slug: "py_lambda",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 21: Python Lambda",
    summary: "Comprehensive guide to Python Lambda",
    content: "A lambda function is an anonymous, single-expression function defined with the lambda keyword. Lambda functions can accept any number of input parameters but can only evaluate a single expression, which is automatically returned. They are frequently used as short throwaway callback arguments inside higher-order functions like map, filter, and sorted, eliminating the need to declare a separate named function with def.",
    exampleExplanation: "In this example, we use lambda expressions with sorted and filter to sort student dictionaries and filter even numbers.",
    keyPoints: [
      "Lambda functions are restricted to a single expression and cannot contain complex statements or assignments.",
      "They are most effective when passed as sorting key functions or short filtering predicates."
    ],
    exampleCode: "students = [\n    {\"name\": \"Aria\", \"grade\": 94},\n    {\"name\": \"Leo\", \"grade\": 82},\n    {\"name\": \"Sarah\", \"grade\": 98}\n]\n\nstudents_by_grade = sorted(students, key=lambda s: s[\"grade\"], reverse=True)\nfor s in students_by_grade:\n    print(s[\"name\"], \":\", s[\"grade\"])\n\nnumbers = [1, 2, 3, 4, 5, 6, 7, 8]\nevens = list(filter(lambda x: x % 2 == 0, numbers))\nprint(\"Filtered evens:\", evens)",
    expectedOutput: "Sarah : 98\nAria : 94\nLeo : 82\nFiltered evens: [2, 4, 6, 8]",
    practiceQuestion: "Write a lambda function that squares a given number and assign it to square_fn.",
    practiceStarter: "# Define lambda\nsquare_fn = None\nprint(square_fn(5) if square_fn else \"Define lambda\")",
    practiceSolution: "square_fn = lambda x: x * x\nprint(square_fn(5))",
    practiceExplanation: "lambda x: x * x defines an inline function squaring its input parameter."
  },
  {
    id: "py_arrays",
    subject: "Python",
    chapterNumber: 22,
    title: "Python Arrays",
    slug: "py_arrays",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 22: Python Arrays",
    summary: "Comprehensive guide to Python Arrays",
    content: "While Python lists store references to arbitrary objects through pointer indirection, the built-in array module provides compact, contiguous memory buffers for primitive C types. Array instances enforce strict homogeneity, requiring all elements to match a single specified type code such as signed integers or double-precision floats. This makes arrays substantially more memory-efficient when handling large numeric buffers without third-party dependencies.",
    exampleExplanation: "In this example, we create an array of 32-bit signed integers, append items, and inspect the underlying type code.",
    keyPoints: [
      "Arrays store raw primitive values in contiguous memory rather than object pointers, reducing memory overhead.",
      "Every array must specify a valid type code upon creation to enforce element homogeneity."
    ],
    exampleCode: "import array\n\ninteger_buffer = array.array(\"i\", [100, 200, 300, 400])\ninteger_buffer.append(500)\n\nprint(\"Typecode:\", integer_buffer.typecode)\nprint(\"Item size in bytes:\", integer_buffer.itemsize)\nprint(\"Buffer content:\", integer_buffer.tolist())\nprint(\"Total elements:\", len(integer_buffer))",
    expectedOutput: "Typecode: i\nItem size in bytes: 4\nBuffer content: [100, 200, 300, 400, 500]\nTotal elements: 5",
    practiceQuestion: "Create an array of floating-point numbers using typecode 'd' with values 1.1 and 2.2.",
    practiceStarter: "import array\n# Create float array\n",
    practiceSolution: "import array\narr = array.array(\"d\", [1.1, 2.2])\nprint(\"Array items:\", arr.tolist())",
    practiceExplanation: "Typecode 'd' instantiates an array of 64-bit double precision floating-point numbers."
  },
  {
    id: "py_classes",
    subject: "Python",
    chapterNumber: 23,
    title: "Python Classes and Objects",
    slug: "py_classes",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 23: Python Classes and Objects",
    summary: "Comprehensive guide to Python Classes and Objects",
    content: "Classes serve as blueprints for instantiating objects that encapsulate state attributes and behavioral methods. In Python, class definitions are created using the class keyword, and instances are initialized using the dunder init constructor method. The self parameter represents the specific instance being created or invoked, providing access to instance attributes. Class attributes represent shared state across all instances, while instance attributes belong exclusively to each individual object.",
    exampleExplanation: "In this example, we define a StudentAccount class with instance attributes, methods, and shared class attributes.",
    keyPoints: [
      "The init method serves as the constructor to initialize newly created object instances.",
      "The self parameter must be explicitly defined as the first argument in instance methods to access instance state."
    ],
    exampleCode: "class StudentAccount:\n    institution = \"LearnFlow University\"\n\n    def __init__(self, student_id, name, major):\n        self.student_id = student_id\n        self.name = name\n        self.major = major\n        self.completed_credits = 0\n\n    def add_credits(self, credits_earned):\n        self.completed_credits += credits_earned\n        print(f\"{self.name} completed {credits_earned} credits. Total: {self.completed_credits}\")\n\ns1 = StudentAccount(\"STD_101\", \"Aria Montgomery\", \"Data Science\")\ns1.add_credits(4)\nprint(\"Institution:\", s1.institution)",
    expectedOutput: "Aria Montgomery completed 4 credits. Total: 4\nInstitution: LearnFlow University",
    practiceQuestion: "Create a Book class with title and author attributes initialized inside init.",
    practiceStarter: "# Define Book class\n",
    practiceSolution: "class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n\nbook = Book(\"Clean Code\", \"Robert C. Martin\")\nprint(f\"Book: {book.title} by {book.author}\")",
    practiceExplanation: "The init method assigns title and author to the self instance."
  },
  {
    id: "py_inheritance",
    subject: "Python",
    chapterNumber: 24,
    title: "Python Inheritance",
    slug: "py_inheritance",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 24: Python Inheritance",
    summary: "Comprehensive guide to Python Inheritance",
    content: "Inheritance allows a child class to inherit attributes and methods from a parent class, promoting code reuse and modular system design. The child class can extend parent behavior, introduce specialized attributes, or override inherited methods to implement customized logic. The super function provides a clean mechanism to invoke the parent class constructor and methods, ensuring that base class initialization executes reliably.",
    exampleExplanation: "In this example, we create a base User class and inherit an Instructor class that extends permissions and adds departmental fields.",
    keyPoints: [
      "Child classes inherit all non-private attributes and methods from their parent class.",
      "The super function delegates initialization to the parent class constructor to preserve base class invariants."
    ],
    exampleCode: "class User:\n    def __init__(self, username, email):\n        self.username = username\n        self.email = email\n\n    def get_role_description(self):\n        return \"Standard Platform User\"\n\nclass Instructor(User):\n    def __init__(self, username, email, department):\n        super().__init__(username, email)\n        self.department = department\n\n    def get_role_description(self):\n        return f\"Faculty Instructor in {self.department}\"\n\nprof = Instructor(\"m_vance\", \"vance@learnflow.edu\", \"Computer Science\")\nprint(\"User:\", prof.username)\nprint(\"Role:\", prof.get_role_description())",
    expectedOutput: "User: m_vance\nRole: Faculty Instructor in Computer Science",
    practiceQuestion: "Create an Employee child class inheriting from Person and calling super init.",
    practiceStarter: "class Person:\n    def __init__(self, name):\n        self.name = name\n\n# Define Employee(Person)\n",
    practiceSolution: "class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Employee(Person):\n    def __init__(self, name, salary):\n        super().__init__(name)\n        self.salary = salary\n\nemp = Employee(\"Sarah\", 85000)\nprint(f\"{emp.name} earns ${emp.salary}\")",
    practiceExplanation: "super().__init__(name) passes the name to the parent Person class constructor."
  },
  {
    id: "py_iterators",
    subject: "Python",
    chapterNumber: 25,
    title: "Python Iterators",
    slug: "py_iterators",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 25: Python Iterators",
    summary: "Comprehensive guide to Python Iterators",
    content: "An iterator is an object representing a stream of sequential data that returns one element at a time when next is invoked. In Python, any object implementing the iter method is an iterable, while objects implementing both iter and next form the iterator protocol. When an iterator exhausts its data stream, it raises the StopIteration exception. Generator functions simplify iterator creation by using the yield keyword to produce values lazily without storing entire sequences in memory.",
    exampleExplanation: "In this example, we create a Fibonacci generator using yield to produce numbers lazily on demand.",
    keyPoints: [
      "Iterators produce values on demand, enabling memory-efficient processing of massive or infinite data streams.",
      "Generator functions automatically maintain their execution state between successive calls to yield."
    ],
    exampleCode: "def fibonacci_generator(limit):\n    a, b = 0, 1\n    count = 0\n    while count < limit:\n        yield a\n        a, b = b, a + b\n        count += 1\n\nfib_numbers = list(fibonacci_generator(7))\nprint(\"First 7 Fibonacci numbers:\", fib_numbers)",
    expectedOutput: "First 7 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8]",
    practiceQuestion: "Write a generator function that yields squares of numbers from 1 to n.",
    practiceStarter: "# Define squares_gen(n)\n",
    practiceSolution: "def squares_gen(n):\n    for i in range(1, n + 1):\n        yield i * i\n\nprint(list(squares_gen(4)))",
    practiceExplanation: "The yield statement produces each squared value lazily upon iteration."
  },
  {
    id: "py_polymorphism",
    subject: "Python",
    chapterNumber: 26,
    title: "Python Polymorphism",
    slug: "py_polymorphism",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 26: Python Polymorphism",
    summary: "Comprehensive guide to Python Polymorphism",
    content: "Polymorphism allows different classes to share identical method names while providing distinct, class-specific implementations. Python adopts the duck typing philosophy, where an object's suitability is determined by the presence of specific methods rather than explicit inheritance from a common interface. This enables functions to operate uniformly across multiple diverse object types as long as they expose the required behavior.",
    exampleExplanation: "In this example, we define different notification channel classes that share a common send message interface.",
    keyPoints: [
      "Polymorphism allows a single function to process different classes uniformly through a common method interface.",
      "Duck typing eliminates the need for rigid interface declarations if the object implements the expected methods."
    ],
    exampleCode: "class EmailService:\n    def send_notification(self, recipient, message):\n        return f\"Email sent to {recipient}: {message}\"\n\nclass SMSService:\n    def send_notification(self, recipient, message):\n        return f\"SMS sent to {recipient}: {message}\"\n\ndef notify_student(service, student_id, alert_text):\n    print(service.send_notification(student_id, alert_text))\n\nnotify_student(EmailService(), \"std_101\", \"Your certificate is ready.\")\nnotify_student(SMSService(), \"+15550199\", \"Quiz starts in 10 minutes.\")",
    expectedOutput: "Email sent to std_101: Your certificate is ready.\nSMS sent to +15550199: Quiz starts in 10 minutes.",
    practiceQuestion: "Create two classes AudioFile and VideoFile with a play method and call them in a loop.",
    practiceStarter: "# Define AudioFile and VideoFile\n",
    practiceSolution: "class AudioFile:\n    def play(self): return \"Playing audio track\"\n\nclass VideoFile:\n    def play(self): return \"Playing video stream\"\n\nfor media in [AudioFile(), VideoFile()]:\n    print(media.play())",
    practiceExplanation: "Both media instances respond to the play method with their respective outputs."
  },
  {
    id: "py_scope",
    subject: "Python",
    chapterNumber: 27,
    title: "Python Scope",
    slug: "py_scope",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 27: Python Scope",
    summary: "Comprehensive guide to Python Scope",
    content: "Variable scope defines the region of a program where a particular identifier is accessible. Python resolves variable names hierarchically using the LEGB rule, searching Local, Enclosing, Global, and Built-in namespaces in order. Variables assigned inside a function belong to the local scope by default. To modify a global variable inside a function, the global keyword must be declared, while modifying variables in outer enclosing functions requires the nonlocal keyword.",
    exampleExplanation: "In this example, we demonstrate local, enclosing, and global scopes using the nonlocal keyword inside an inner function.",
    keyPoints: [
      "Python searches namespaces in order: Local, Enclosing, Global, and Built-in according to the LEGB rule.",
      "The nonlocal keyword permits modifying variables in an outer enclosing function scope from within an inner nested function."
    ],
    exampleCode: "app_version = \"v2.5\"\n\ndef outer_service():\n    service_status = \"INITIALIZING\"\n\n    def configure_service():\n        nonlocal service_status\n        service_status = \"RUNNING\"\n        print(\"Inner configuration set status to:\", service_status)\n\n    configure_service()\n    print(\"Outer service confirmed status:\", service_status)\n\nouter_service()\nprint(\"Global application version:\", app_version)",
    expectedOutput: "Inner configuration set status to: RUNNING\nOuter service confirmed status: RUNNING\nGlobal application version: v2.5",
    practiceQuestion: "Use the global keyword inside a function to increment a global counter.",
    practiceStarter: "counter = 0\n\ndef increment():\n    # Use global keyword\n    pass\n\nincrement()\nprint(\"Counter:\", counter)",
    practiceSolution: "counter = 0\n\ndef increment():\n    global counter\n    counter += 1\n\nincrement()\nprint(\"Counter:\", counter)",
    practiceExplanation: "Declaring global counter allows the function to mutate the module-level variable."
  },
  {
    id: "py_modules",
    subject: "Python",
    chapterNumber: 28,
    title: "Python Modules",
    slug: "py_modules",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 28: Python Modules",
    summary: "Comprehensive guide to Python Modules",
    content: "A module in Python is a file containing definitions, classes, and executable statements designed for reuse across multiple applications. Modules are loaded using the import statement, which searches directories specified in sys.path. The built-in standard library includes modules for mathematics, operating system interaction, time management, and serialization. Creating custom modules promotes clean modularity and simplifies collaborative software engineering.",
    exampleExplanation: "In this example, we import standard library modules to compute mathematical operations and format date timestamps.",
    keyPoints: [
      "Modules help organize code into logical, maintainable files that can be shared across projects.",
      "The sys.path list determines the order of directories Python searches when resolving module imports."
    ],
    exampleCode: "import math\nfrom datetime import datetime\n\ncurrent_year = datetime.now().year\nradius = 5.0\ncircle_area = math.pi * (radius ** 2)\n\nprint(\"Current Academic Year:\", current_year)\nprint(\"Calculated Circle Area:\", round(circle_area, 2))",
    expectedOutput: "Current Academic Year: 2026\nCalculated Circle Area: 78.54",
    practiceQuestion: "Import the sqrt function from math and calculate the square root of 49.",
    practiceStarter: "# Import sqrt\n",
    practiceSolution: "from math import sqrt\nprint(\"Square root of 49:\", sqrt(49))",
    practiceExplanation: "from math import sqrt brings sqrt directly into the current module namespace."
  },
  {
    id: "py_dates_math",
    subject: "Python",
    chapterNumber: 29,
    title: "Python Dates and Math",
    slug: "py_dates_math",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 29: Python Dates and Math",
    summary: "Comprehensive guide to Python Dates and Math",
    content: "The datetime and math modules provide comprehensive facilities for temporal calculations and scientific computation. The datetime class represents calendar dates and times, while timedelta facilitates date arithmetic such as calculating course deadlines or expiration intervals. The math module provides essential constants like pi and e, alongside functions for trigonometry, logarithms, powers, and ceiling or floor rounding.",
    exampleExplanation: "In this example, we compute future deadlines using timedelta and perform ceiling and power calculations with the math module.",
    keyPoints: [
      "The timedelta class allows adding and subtracting specific intervals of days, hours, or seconds from datetime objects.",
      "The math module provides high-precision floating-point arithmetic functions compliant with the C standard library."
    ],
    exampleCode: "from datetime import datetime, timedelta\nimport math\n\nstart_date = datetime(2026, 9, 1)\ncourse_duration = timedelta(days=60)\ncompletion_deadline = start_date + course_duration\n\nprint(\"Course Start Date:\", start_date.strftime(\"%B %d, %Y\"))\nprint(\"Final Completion Deadline:\", completion_deadline.strftime(\"%B %d, %Y\"))\nprint(\"Ceiling of 4.25:\", math.ceil(4.25))\nprint(\"Hypotenuse of sides 6 and 8:\", math.hypot(6, 8))",
    expectedOutput: "Course Start Date: September 01, 2026\nFinal Completion Deadline: October 31, 2026\nCeiling of 4.25: 5\nHypotenuse of sides 6 and 8: 10.0",
    practiceQuestion: "Use math.floor to round down 8.85 to the nearest integer.",
    practiceStarter: "import math\n# Floor 8.85\n",
    practiceSolution: "import math\nprint(\"Floored value:\", math.floor(8.85))",
    practiceExplanation: "math.floor rounds down to the nearest integer less than or equal to the argument."
  },
  {
    id: "py_tryexcept",
    subject: "Python",
    chapterNumber: 30,
    title: "Python Try...Except",
    slug: "py_tryexcept",
    videoUrl: "https://www.youtube.com/embed/rfscVS0vtbw",
    videoTitle: "Python Masterclass Chapter 30: Python Try...Except",
    summary: "Comprehensive guide to Python Try...Except",
    content: "Exception handling allows programs to intercept and recover gracefully from runtime errors rather than crashing abruptly. In Python, risky code is enclosed within a try block, while specific exceptions are caught and handled in except blocks. An optional else block executes only if no exceptions were raised, and a finally block runs unconditionally to perform mandatory cleanup tasks such as closing open database connections or file handles.",
    exampleExplanation: "In this example, we handle a potential zero division error safely and verify that the finally block always executes.",
    keyPoints: [
      "Catching specific exception types prevents masking unexpected programming bugs.",
      "The finally block is guaranteed to execute regardless of whether an exception was raised or handled."
    ],
    exampleCode: "def safe_divide(numerator, denominator):\n    try:\n        result = numerator / denominator\n    except ZeroDivisionError as err:\n        print(\"Caught division error:\", err)\n        return 0.0\n    except TypeError as err:\n        print(\"Caught type error:\", err)\n        return 0.0\n    else:\n        print(\"Division calculated successfully.\")\n        return result\n    finally:\n        print(\"Cleanup routine completed.\")\n\nprint(\"Result 1:\", safe_divide(10, 2))\nprint(\"Result 2:\", safe_divide(10, 0))",
    expectedOutput: "Division calculated successfully.\nCleanup routine completed.\nResult 1: 5.0\nCaught division error: division by zero\nCleanup routine completed.\nResult 2: 0.0",
    practiceQuestion: "Write a try except block that catches a ValueError when converting an invalid string to an integer.",
    practiceStarter: "# Try except block\n",
    practiceSolution: "try:\n    number = int(\"invalid_number\")\nexcept ValueError:\n    print(\"Invalid integer string handled safely.\")",
    practiceExplanation: "int with an invalid string raises a ValueError that is intercepted by the except block."
  }
];

export const JAVA_TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: "java_home_intro",
    subject: "Java",
    chapterNumber: 1,
    title: "Java HOME & Intro",
    slug: "java_home_intro",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 1: Java HOME & Intro",
    summary: "Comprehensive guide to Java HOME & Intro",
    content: "Java is a versatile, class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. Its core architectural philosophy is write once, run anywhere, which means compiled Java bytecode can execute across any computer or operating system equipped with a compatible Java Virtual Machine. Java is renowned for its enterprise robustness, strong memory management via automatic garbage collection, and high-performance multithreading capabilities across enterprise web backends, financial banking infrastructure, and Android mobile applications.",
    exampleExplanation: "In this example, we define a standard Java class and output informational messages using System.out.println.",
    keyPoints: [
      "Java source files compile into platform-independent bytecode files with dot class extensions that execute inside the Java Virtual Machine.",
      "Automatic memory management is performed continuously by the JVM garbage collector without requiring manual memory freeing."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        String courseName = \"Java Enterprise Track\";\n        int totalLessons = 20;\n        boolean isActive = true;\n\n        System.out.println(\"Course: \" + courseName);\n        System.out.println(\"Lessons: \" + totalLessons);\n        System.out.println(\"Platform Active: \" + isActive);\n    }\n}",
    expectedOutput: "Course: Java Enterprise Track\nLessons: 20\nPlatform Active: true",
    practiceQuestion: "Create a Main class with a main method that prints Java Runtime Active to the console.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Print message\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Runtime Active\");\n    }\n}",
    practiceExplanation: "System.out.println writes the provided string followed by a newline to standard output."
  },
  {
    id: "java_getstarted",
    subject: "Java",
    chapterNumber: 2,
    title: "Java Get Started",
    slug: "java_getstarted",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 2: Java Get Started",
    summary: "Comprehensive guide to Java Get Started",
    content: "Getting started with Java development begins with installing the Java Development Kit which bundles the Java compiler javac, the execution runtime java, and essential standard libraries. Development environments such as IntelliJ IDEA or VS Code manage project classpaths, build tools like Maven or Gradle, and dependency management. Source code files must be saved with a dot java file extension whose name exactly matches the public class defined inside the file.",
    exampleExplanation: "In this example, we inspect system properties such as the Java version and vendor from within a running program.",
    keyPoints: [
      "Every public Java class must reside in a source file whose filename matches the class name identically.",
      "The Java compiler javac transforms human-readable Java code into intermediate bytecode instructions."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        String javaVersion = System.getProperty(\"java.version\");\n        String vendor = System.getProperty(\"java.vendor\");\n\n        System.out.println(\"Java Version: \" + javaVersion);\n        System.out.println(\"Runtime Vendor: \" + vendor);\n        System.out.println(\"Environment Configured Successfully.\");\n    }\n}",
    expectedOutput: "Java Version: 21.0.2\nRuntime Vendor: Oracle Corporation\nEnvironment Configured Successfully.",
    practiceQuestion: "Print the current operating system name using System.getProperty with os.name.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Print os.name property\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"OS: \" + System.getProperty(\"os.name\"));\n    }\n}",
    practiceExplanation: "System.getProperty retrieves runtime configuration properties from the host operating system."
  },
  {
    id: "java_syntax_main",
    subject: "Java",
    chapterNumber: 3,
    title: "Java Syntax & Main Method",
    slug: "java_syntax_main",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 3: Java Syntax & Main Method",
    summary: "Comprehensive guide to Java Syntax & Main Method",
    content: "The syntax of Java is strictly typed, case-sensitive, and requires every instruction block to be organized within class structures. The canonical entry point of any standalone Java application is the public static void main method, where public grants access to the JVM runtime, static allows execution without instantiating the class, void denotes no return value, and String array args captures command-line parameters.",
    exampleExplanation: "In this example, we declare a compliant main method that iterates over supplied command parameters or provides a fallback message.",
    keyPoints: [
      "Every executable Java application requires exactly one main method with the signature public static void main String array args.",
      "Java requires statements to terminate with semicolons and code blocks to be enclosed within curly brackets."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int exitCode = 0;\n        String executionStatus = \"Application Started\";\n\n        System.out.println(\"Status: \" + executionStatus);\n        System.out.println(\"Exit Code: \" + exitCode);\n    }\n}",
    expectedOutput: "Status: Application Started\nExit Code: 0",
    practiceQuestion: "Write a main method that prints System Ready to the console.",
    practiceStarter: "public class Main {\n    // Define main method\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"System Ready\");\n    }\n}",
    practiceExplanation: "The main method is recognized by the JVM as the initial execution thread."
  },
  {
    id: "java_output",
    subject: "Java",
    chapterNumber: 4,
    title: "Java Output & Print",
    slug: "java_output",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 4: Java Output & Print",
    summary: "Comprehensive guide to Java Output & Print",
    content: "Standard output in Java is managed through the System.out print stream which offers multiple printing methods. System.out.println writes the specified argument and immediately appends a newline character, whereas System.out.print outputs the data without terminating the current line. For structured numerical formatting, System.out.printf provides format specifiers such as percent d for decimal integers, percent f for floating points, and percent s for text strings.",
    exampleExplanation: "In this example, we compare print, println, and printf to output formatted student grades.",
    keyPoints: [
      "System.out.println appends a newline after output while System.out.print keeps the cursor on the same line.",
      "System.out.printf supports formatted output using conversion specifiers such as percent s and percent f."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        String student = \"Aria\";\n        double score = 94.5;\n\n        System.out.print(\"Student: \");\n        System.out.println(student);\n        System.out.printf(\"Score: %.2f%%\n\", score);\n    }\n}",
    expectedOutput: "Student: Aria\nScore: 94.50%",
    practiceQuestion: "Use System.out.printf to print an integer age 20 with the label Age: %d.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        // Use printf\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int age = 20;\n        System.out.printf(\"Age: %d\n\", age);\n    }\n}",
    practiceExplanation: "printf with percent d substitutes the integer value into the formatted output."
  },
  {
    id: "java_comments",
    subject: "Java",
    chapterNumber: 5,
    title: "Java Comments",
    slug: "java_comments",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 5: Java Comments",
    summary: "Comprehensive guide to Java Comments",
    content: "Comments in Java provide descriptive documentation for human developers and are completely ignored during compilation. Single-line comments begin with two consecutive forward slashes, multi-line comment blocks are enclosed between slash asterisk and asterisk slash, and official Javadoc comments begin with slash double asterisk. Javadoc comments extract class hierarchies, parameter descriptions, and return types into standardized HTML documentation for developer reference.",
    exampleExplanation: "In this example, we use single-line comments, a multi-line comment, and a Javadoc header above a utility calculation method.",
    keyPoints: [
      "Single-line comments start with double forward slashes and document individual lines or inline variables.",
      "Javadoc comments start with slash double asterisk and are processed by the javadoc tool to generate standard API documentation."
    ],
    exampleCode: "public class Main {\n    /**\n     * Computes the perimeter of a rectangle.\n     */\n    public static int getPerimeter(int width, int height) {\n        // Formula: 2 * (width + height)\n        return 2 * (width + height);\n    }\n\n    public static void main(String[] args) {\n        int p = getPerimeter(5, 10);\n        System.out.println(\"Perimeter: \" + p);\n    }\n}",
    expectedOutput: "Perimeter: 30",
    practiceQuestion: "Add a single-line comment above a variable declaration describing its purpose.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Add comment\n        int maxUsers = 100;\n        System.out.println(\"Limit: \" + maxUsers);\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        // Maximum allowed concurrent users\n        int maxUsers = 100;\n        System.out.println(\"Limit: \" + maxUsers);\n    }\n}",
    practiceExplanation: "Double forward slash comments are ignored by the Java compiler."
  },
  {
    id: "java_variables",
    subject: "Java",
    chapterNumber: 6,
    title: "Java Variables & Identifiers",
    slug: "java_variables",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 6: Java Variables & Identifiers",
    summary: "Comprehensive guide to Java Variables & Identifiers",
    content: "Variables in Java are strongly typed named storage locations in computer memory that hold data values. To declare a variable, you must specify its data type followed by a valid identifier name, optional initialization value, and a terminating semicolon. Java variable identifiers must begin with a letter, underscore, or dollar sign, cannot contain spaces, and cannot match reserved Java keywords.",
    exampleExplanation: "In this example, we declare variables of various primitive and reference types and reassign their values safely.",
    keyPoints: [
      "Every variable in Java must have an explicitly declared type before it can store data.",
      "Variables declared with the final keyword become constants whose values cannot be reassigned after initialization."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int courseId = 101;\n        String courseName = \"Enterprise Java\";\n        final double PASSING_SCORE = 75.0;\n\n        System.out.println(\"Course ID: \" + courseId);\n        System.out.println(\"Title: \" + courseName);\n        System.out.println(\"Passing Threshold: \" + PASSING_SCORE);\n    }\n}",
    expectedOutput: "Course ID: 101\nTitle: Enterprise Java\nPassing Threshold: 75.0",
    practiceQuestion: "Declare a final variable named MAX_SCORE with value 100 and print it.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Declare final variable\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        final int MAX_SCORE = 100;\n        System.out.println(\"Max Score: \" + MAX_SCORE);\n    }\n}",
    practiceExplanation: "The final keyword ensures the variable value remains unchanged throughout program lifecycle."
  },
  {
    id: "java_datatypes",
    subject: "Java",
    chapterNumber: 7,
    title: "Java Data Types & Primitives",
    slug: "java_datatypes",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 7: Java Data Types & Primitives",
    summary: "Comprehensive guide to Java Data Types & Primitives",
    content: "Java provides eight primitive data types categorized into integer numbers, floating point numbers, single characters, and Boolean flags. The integer primitives are byte which is eight bits, short which is sixteen bits, int which is thirty-two bits, and long which is sixty-four bits. For fractional calculations, float is thirty-two bits while double is sixty-four bits. In contrast, non-primitive reference types such as String, Arrays, and user-defined Classes reference objects located in heap memory.",
    exampleExplanation: "In this example, we store and print values using various primitive types alongside reference strings.",
    keyPoints: [
      "Primitive types store raw binary values directly on the thread execution stack rather than in heap memory.",
      "The double type is the standard choice for decimal floating-point computations due to its sixty-four bit precision."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        byte smallNumber = 120;\n        int standardInt = 450000;\n        double price = 99.95;\n        char grade = 'A';\n        boolean isEnrolled = true;\n\n        System.out.println(\"Byte: \" + smallNumber);\n        System.out.println(\"Int: \" + standardInt);\n        System.out.println(\"Price: \" + price);\n        System.out.println(\"Grade: \" + grade);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n    }\n}",
    expectedOutput: "Byte: 120\nInt: 450000\nPrice: 99.95\nGrade: A\nEnrolled: true",
    practiceQuestion: "Declare a char variable with grade letter B and print it.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Declare char\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        char grade = 'B';\n        System.out.println(\"Grade: \" + grade);\n    }\n}",
    practiceExplanation: "Character literals in Java are enclosed within single quotation marks."
  },
  {
    id: "java_typecasting",
    subject: "Java",
    chapterNumber: 8,
    title: "Java Type Casting",
    slug: "java_typecasting",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 8: Java Type Casting",
    summary: "Comprehensive guide to Java Type Casting",
    content: "Type casting in Java involves converting a variable from one data type into another compatible data type. Widening casting occurs automatically when converting a smaller size type to a larger size type, such as int to double, because no loss of numerical precision can occur. Narrowing casting must be performed manually using explicit parenthesis syntax, such as casting double to int, because fractional digits will be truncated.",
    exampleExplanation: "In this example, we demonstrate automatic widening casting from int to double and explicit narrowing casting from double to int.",
    keyPoints: [
      "Widening casting converts smaller data types to larger ones automatically without data loss.",
      "Narrowing casting requires explicit parentheses and truncates any decimal fractions."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int originalInt = 42;\n        double widenedDouble = originalInt;\n\n        double rawPrice = 99.75;\n        int truncatedPrice = (int) rawPrice;\n\n        System.out.println(\"Widened Double: \" + widenedDouble);\n        System.out.println(\"Original Price: \" + rawPrice);\n        System.out.println(\"Truncated Int: \" + truncatedPrice);\n    }\n}",
    expectedOutput: "Widened Double: 42.0\nOriginal Price: 99.75\nTruncated Int: 99",
    practiceQuestion: "Cast a double value of 8.9 into an integer and print the result.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        double val = 8.9;\n        // Cast to int\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        double val = 8.9;\n        int intVal = (int) val;\n        System.out.println(\"Value: \" + intVal);\n    }\n}",
    practiceExplanation: "Explicit casting discards the decimal fraction leaving the whole integer."
  },
  {
    id: "java_operators",
    subject: "Java",
    chapterNumber: 9,
    title: "Java Operators",
    slug: "java_operators",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 9: Java Operators",
    summary: "Comprehensive guide to Java Operators",
    content: "Operators in Java perform mathematical, relational, and logical computations across operands. Arithmetic operators perform addition, subtraction, multiplication, division, and modulo remainder calculations. Comparison operators compare two expressions and evaluate to true or false, while logical operators combine multiple conditions using short-circuit evaluation rules. Assignment operators combine arithmetic operations with variable updates in a compact form.",
    exampleExplanation: "In this example, we evaluate arithmetic operations and logical conditions with short-circuit operators.",
    keyPoints: [
      "The modulo operator returns the remainder left over after integer division.",
      "Short-circuit logical operators skip evaluation of the second operand if the first operand determines the final outcome."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 4;\n\n        int quotient = a / b;\n        int remainder = a % b;\n        boolean isBothValid = (a > 10) && (b < 5);\n\n        System.out.println(\"Quotient: \" + quotient);\n        System.out.println(\"Remainder: \" + remainder);\n        System.out.println(\"Logical Evaluation: \" + isBothValid);\n    }\n}",
    expectedOutput: "Quotient: 3\nRemainder: 3\nLogical Evaluation: true",
    practiceQuestion: "Check if a number 24 is even using the modulo operator.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int num = 24;\n        // Check if even\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int num = 24;\n        boolean isEven = (num % 2 == 0);\n        System.out.println(\"Is Even: \" + isEven);\n    }\n}",
    practiceExplanation: "A number modulo 2 evaluates to zero if the number is evenly divisible by two."
  },
  {
    id: "java_strings",
    subject: "Java",
    chapterNumber: 10,
    title: "Java Strings & String Methods",
    slug: "java_strings",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 10: Java Strings & String Methods",
    summary: "Comprehensive guide to Java Strings & String Methods",
    content: "Strings in Java are immutable reference objects belonging to the java.lang.String class, meaning their internal character sequence cannot be modified after instantiation. String literals are maintained within an internal string constant pool inside heap memory to optimize memory consumption. The String class provides versatile methods including length to measure size, charAt to retrieve characters, substring to slice parts, toUpperCase to modify casing, and equals to compare textual content safely.",
    exampleExplanation: "In this example, we demonstrate string manipulation methods and explain why equals must be used instead of double equals.",
    keyPoints: [
      "String objects in Java are immutable and any modification creates a completely new string object.",
      "String content comparison must use the equals method because double equals compares memory references rather than text values."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        String greeting = \"LearnFlow Academy\";\n\n        System.out.println(\"Length: \" + greeting.length());\n        System.out.println(\"Upper Case: \" + greeting.toUpperCase());\n        System.out.println(\"Substring: \" + greeting.substring(0, 9));\n        System.out.println(\"Equality check: \" + greeting.equals(\"LearnFlow Academy\"));\n    }\n}",
    expectedOutput: "Length: 17\nUpper Case: LEARNFLOW ACADEMY\nSubstring: LearnFlow\nEquality check: true",
    practiceQuestion: "Check if two strings str1 and str2 containing 'Java' are equal using equals.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        String str1 = \"Java\";\n        String str2 = new String(\"Java\");\n        // Compare using equals\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        String str1 = \"Java\";\n        String str2 = new String(\"Java\");\n        System.out.println(\"Equal: \" + str1.equals(str2));\n    }\n}",
    practiceExplanation: "The equals method inspects character content while double equals compares object pointers."
  },
  {
    id: "java_math",
    subject: "Java",
    chapterNumber: 11,
    title: "Java Math & Numbers",
    slug: "java_math",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 11: Java Math & Numbers",
    summary: "Comprehensive guide to Java Math & Numbers",
    content: "The java.lang.Math class provides static mathematical constants and functions for scientific and numerical calculation. Because all methods in Math are static, they can be invoked directly on the Math class without creating an instance. Common methods include Math.max and Math.min for boundary comparison, Math.sqrt for square root calculation, Math.abs for absolute values, Math.pow for exponentiation, and Math.random to generate pseudo-random numbers between zero and one.",
    exampleExplanation: "In this example, we calculate hypotenuse lengths and round random values using the Math utility class.",
    keyPoints: [
      "All methods in the Math class are static and can be invoked directly without instantiating the class.",
      "Math.random generates a double value greater than or equal to 0.0 and strictly less than 1.0."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int sideA = 6;\n        int sideB = 8;\n        double hypotenuse = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));\n\n        System.out.println(\"Max of 15 and 28: \" + Math.max(15, 28));\n        System.out.println(\"Square Root of 64: \" + Math.sqrt(64));\n        System.out.println(\"Calculated Hypotenuse: \" + hypotenuse);\n    }\n}",
    expectedOutput: "Max of 15 and 28: 28\nSquare Root of 64: 8.0\nCalculated Hypotenuse: 10.0",
    practiceQuestion: "Calculate and print the absolute value of -45 using Math.abs.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int val = -45;\n        // Print absolute value\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int val = -45;\n        System.out.println(\"Absolute: \" + Math.abs(val));\n    }\n}",
    practiceExplanation: "Math.abs returns the positive magnitude of a signed number."
  },
  {
    id: "java_booleans",
    subject: "Java",
    chapterNumber: 12,
    title: "Java Booleans & Logic",
    slug: "java_booleans",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 12: Java Booleans & Logic",
    summary: "Comprehensive guide to Java Booleans & Logic",
    content: "Booleans in Java represent binary truth values declared with the primitive boolean keyword, taking either true or false as their literal values. Booleans are central to algorithmic control flow, conditional statements, and loop guards. Relational expressions such as greater than, less than, or equality evaluate directly into boolean outcomes, allowing programs to make structured decisions based on application state.",
    exampleExplanation: "In this example, we evaluate course passing criteria by testing student test scores against threshold variables.",
    keyPoints: [
      "The boolean primitive occupies one bit of information conceptually and can only hold true or false.",
      "Relational comparison expressions evaluate directly into boolean values that govern program control flow."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int testScore = 88;\n        int minimumPassingScore = 70;\n        boolean hasPassed = testScore >= minimumPassingScore;\n        boolean isHonors = testScore >= 90;\n\n        System.out.println(\"Score: \" + testScore);\n        System.out.println(\"Has Passed: \" + hasPassed);\n        System.out.println(\"Qualified for Honors: \" + isHonors);\n    }\n}",
    expectedOutput: "Score: 88\nHas Passed: true\nQualified for Honors: false",
    practiceQuestion: "Declare a boolean variable named isAdult that checks if age 19 is greater than or equal to 18.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        // Declare isAdult\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int age = 19;\n        boolean isAdult = age >= 18;\n        System.out.println(\"Is Adult: \" + isAdult);\n    }\n}",
    practiceExplanation: "The relational operator compares age with 18 to yield a true boolean value."
  },
  {
    id: "java_ifelse",
    subject: "Java",
    chapterNumber: 13,
    title: "Java If...Else Statements",
    slug: "java_ifelse",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 13: Java If...Else Statements",
    summary: "Comprehensive guide to Java If...Else Statements",
    content: "Conditional statements in Java control execution branching based on the truth value of boolean expressions. The if statement executes its code block if its condition evaluates to true, while the optional else branch runs when the condition evaluates to false. Multiple alternative conditions can be chained using else if clauses, providing clear multi-way decision trees that execute top to bottom until the first satisfied condition is met.",
    exampleExplanation: "In this example, we classify examination marks into letter grades using a chained if else if else ladder.",
    keyPoints: [
      "Conditions in if statements must evaluate strictly to a boolean value and cannot use integers as booleans.",
      "An else if ladder terminates as soon as the first matching branch evaluates to true."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int marks = 85;\n        char letterGrade;\n\n        if (marks >= 90) {\n            letterGrade = 'A';\n        } else if (marks >= 80) {\n            letterGrade = 'B';\n        } else if (marks >= 70) {\n            letterGrade = 'C';\n        } else {\n            letterGrade = 'F';\n        }\n\n        System.out.println(\"Marks: \" + marks);\n        System.out.println(\"Letter Grade: \" + letterGrade);\n    }\n}",
    expectedOutput: "Marks: 85\nLetter Grade: B",
    practiceQuestion: "Write an if else condition to check if a number 15 is positive or negative.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int n = 15;\n        // Add if else\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int n = 15;\n        if (n >= 0) {\n            System.out.println(\"Positive\");\n        } else {\n            System.out.println(\"Negative\");\n        }\n    }\n}",
    practiceExplanation: "The condition tests whether n is greater than or equal to zero."
  },
  {
    id: "java_switch",
    subject: "Java",
    chapterNumber: 14,
    title: "Java Switch Statements",
    slug: "java_switch",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 14: Java Switch Statements",
    summary: "Comprehensive guide to Java Switch Statements",
    content: "The switch statement in Java provides multi-way branching based on the exact value of an expression instead of evaluating multiple boolean conditions. Switch statements can test byte, short, char, int, enum types, and String objects. Each candidate value is labeled with the case keyword, and execution continues until a break statement is encountered, preventing unwanted fall-through into subsequent case blocks. A default branch handles unmatched values.",
    exampleExplanation: "In this example, we translate numeric day codes into day names using a structured switch case block with break statements.",
    keyPoints: [
      "The break statement prevents fall-through execution into consecutive case blocks.",
      "The default case runs whenever no matching case label matches the tested switch value."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n        String dayName;\n\n        switch (dayOfWeek) {\n            case 1:\n                dayName = \"Monday\";\n                break;\n            case 2:\n                dayName = \"Tuesday\";\n                break;\n            case 3:\n                dayName = \"Wednesday\";\n                break;\n            default:\n                dayName = \"Other Day\";\n                break;\n        }\n\n        System.out.println(\"Day \" + dayOfWeek + \" is: \" + dayName);\n    }\n}",
    expectedOutput: "Day 3 is: Wednesday",
    practiceQuestion: "Write a switch statement that prints 'Weekend' for day 6 or 7 and 'Weekday' otherwise.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int day = 6;\n        // Switch statement\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int day = 6;\n        switch (day) {\n            case 6:\n            case 7:\n                System.out.println(\"Weekend\");\n                break;\n            default:\n                System.out.println(\"Weekday\");\n                break;\n        }\n    }\n}",
    practiceExplanation: "Stacking case labels allows multiple values to share a single execution block."
  },
  {
    id: "java_while",
    subject: "Java",
    chapterNumber: 15,
    title: "Java While & Do-While Loops",
    slug: "java_while",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 15: Java While & Do-While Loops",
    summary: "Comprehensive guide to Java While & Do-While Loops",
    content: "While loops in Java execute a block of code repeatedly as long as a specified boolean condition evaluates to true. In a standard while loop, the condition is evaluated before each iteration, meaning the loop body may not execute at all if the initial condition is false. In contrast, a do-while loop evaluates its condition after executing the body, guaranteeing that the code block will execute at least once regardless of the condition.",
    exampleExplanation: "In this example, we use a while loop to calculate the factorial of a number and a do-while loop to print a verification sequence.",
    keyPoints: [
      "The while loop tests its condition before executing and will not run if the condition starts false.",
      "The do-while loop executes its body at least once because condition testing happens after each iteration."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int counter = 1;\n        int totalSum = 0;\n\n        while (counter <= 5) {\n            totalSum += counter;\n            counter++;\n        }\n\n        System.out.println(\"Sum of 1 to 5: \" + totalSum);\n\n        int checkCount = 0;\n        do {\n            System.out.println(\"Do-while executed run: \" + checkCount);\n            checkCount++;\n        } while (checkCount < 1);\n    }\n}",
    expectedOutput: "Sum of 1 to 5: 15\nDo-while executed run: 0",
    practiceQuestion: "Use a while loop to print numbers from 1 to 3.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        // While loop\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int i = 1;\n        while (i <= 3) {\n            System.out.println(\"Count: \" + i);\n            i++;\n        }\n    }\n}",
    practiceExplanation: "The counter increments in each pass until the loop condition becomes false."
  },
  {
    id: "java_for",
    subject: "Java",
    chapterNumber: 16,
    title: "Java For Loops & For-Each",
    slug: "java_for",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 16: Java For Loops & For-Each",
    summary: "Comprehensive guide to Java For Loops & For-Each",
    content: "The for loop in Java provides a structured mechanism for iterating a fixed number of times through loop initialization, condition testing, and step update expressions. For traversing arrays and Java collection objects, Java provides the enhanced for-each loop, which simplifies syntax and eliminates off-by-one indexing errors by directly binding each element to an iteration variable.",
    exampleExplanation: "In this example, we iterate through an array of course modules using both standard indexed for loops and enhanced for-each loops.",
    keyPoints: [
      "Standard for loops combine loop counter initialization, condition testing, and incrementation in a single line.",
      "Enhanced for-each loops iterate through arrays and collections safely without requiring explicit indexing variables."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        String[] subjects = {\"Python\", \"Java\", \"DBMS\", \"Machine Learning\"};\n\n        System.out.println(\"Using Enhanced For-Each Loop:\");\n        for (String subject : subjects) {\n            System.out.println(\"- \" + subject);\n        }\n    }\n}",
    expectedOutput: "Using Enhanced For-Each Loop:\n- Python\n- Java\n- DBMS\n- Machine Learning",
    practiceQuestion: "Use an enhanced for-each loop to print elements of an integer array [10, 20, 30].",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        // For-each loop\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int[] nums = {10, 20, 30};\n        for (int n : nums) {\n            System.out.println(\"Value: \" + n);\n        }\n    }\n}",
    practiceExplanation: "The for-each loop accesses each element of the array sequentially."
  },
  {
    id: "java_break_continue",
    subject: "Java",
    chapterNumber: 17,
    title: "Java Break & Continue",
    slug: "java_break_continue",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 17: Java Break & Continue",
    summary: "Comprehensive guide to Java Break & Continue",
    content: "The break and continue jump statements alter the standard sequential flow of loops in Java. The break statement immediately terminates the innermost enclosing loop and transfers program control to the statement following the loop. In contrast, the continue statement terminates the current loop iteration early and skips directly to the next iteration test and update step.",
    exampleExplanation: "In this example, we skip negative numbers using continue and exit a search loop immediately once a target value is discovered using break.",
    keyPoints: [
      "The break statement exits the enclosing loop entirely and transfers execution to code after the loop.",
      "The continue statement skips the remainder of the current iteration and resumes with the next cycle."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {12, -1, 45, 99, 15};\n\n        System.out.println(\"Processing valid scores:\");\n        for (int score : scores) {\n            if (score < 0) {\n                System.out.println(\"Skipped negative entry\");\n                continue;\n            }\n            if (score == 99) {\n                System.out.println(\"Found target 99, stopping loop\");\n                break;\n            }\n            System.out.println(\"Valid score: \" + score);\n        }\n    }\n}",
    expectedOutput: "Processing valid scores:\nValid score: 12\nSkipped negative entry\nValid score: 45\nFound target 99, stopping loop",
    practiceQuestion: "Write a loop that breaks when an iteration index reaches 3.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Loop with break\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            if (i == 3) {\n                break;\n            }\n            System.out.println(\"i: \" + i);\n        }\n    }\n}",
    practiceExplanation: "Encountering break exits the loop when i reaches three."
  },
  {
    id: "java_arrays",
    subject: "Java",
    chapterNumber: 18,
    title: "Java Arrays & Multi-Dimensional",
    slug: "java_arrays",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 18: Java Arrays & Multi-Dimensional",
    summary: "Comprehensive guide to Java Arrays & Multi-Dimensional",
    content: "Arrays in Java are fixed-length objects that store multiple elements of the exact same data type in contiguous memory locations. Arrays are zero-indexed, meaning the first element is accessed at index zero and the final element resides at index length minus one. Multi-dimensional arrays are represented as arrays of arrays, allowing developers to model matrices, tabular records, and grid coordinate systems.",
    exampleExplanation: "In this example, we initialize a single-dimensional array and traverse a two-dimensional matrix using nested loops.",
    keyPoints: [
      "Arrays have fixed sizes defined upon allocation that cannot be changed dynamically.",
      "Multi-dimensional arrays in Java are implemented as arrays containing references to other arrays."
    ],
    exampleCode: "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2},\n            {3, 4}\n        };\n\n        System.out.println(\"Matrix Dimensions: \" + matrix.length + \"x\" + matrix[0].length);\n        for (int r = 0; r < matrix.length; r++) {\n            for (int c = 0; c < matrix[r].length; c++) {\n                System.out.print(matrix[r][c] + \" \");\n            }\n            System.out.println();\n        }\n    }\n}",
    expectedOutput: "Matrix Dimensions: 2x2\n1 2 \n3 4 ",
    practiceQuestion: "Declare an int array with values 5, 10, 15 and print its first element.",
    practiceStarter: "public class Main {\n    public static void main(String[] args) {\n        // Declare and print\n    }\n}",
    practiceSolution: "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {5, 10, 15};\n        System.out.println(\"First element: \" + arr[0]);\n    }\n}",
    practiceExplanation: "Arrays are zero-indexed so the first element is located at index zero."
  },
  {
    id: "java_methods",
    subject: "Java",
    chapterNumber: 19,
    title: "Java Methods & Parameters",
    slug: "java_methods",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 19: Java Methods & Parameters",
    summary: "Comprehensive guide to Java Methods & Parameters",
    content: "Methods in Java are reusable blocks of code that perform specific actions and only execute when invoked. Methods can accept input values called parameters, execute algorithmic logic, and optionally return results using the return statement. Java supports method overloading, which allows multiple methods within the same class to share identical names as long as their parameter lists differ in count or type.",
    exampleExplanation: "In this example, we define overloaded calculation methods for integer and floating point additions.",
    keyPoints: [
      "Methods organize code into modular, testable, and reusable functional units.",
      "Method overloading allows multiple methods to share the same name provided their parameter signatures differ."
    ],
    exampleCode: "public class Main {\n    public static int add(int a, int b) {\n        return a + b;\n    }\n\n    public static double add(double a, double b) {\n        return a + b;\n    }\n\n    public static void main(String[] args) {\n        int sumInt = add(10, 20);\n        double sumDouble = add(5.5, 4.5);\n\n        System.out.println(\"Integer Sum: \" + sumInt);\n        System.out.println(\"Double Sum: \" + sumDouble);\n    }\n}",
    expectedOutput: "Integer Sum: 30\nDouble Sum: 10.0",
    practiceQuestion: "Write a static method named multiply that takes two integers and returns their product.",
    practiceStarter: "public class Main {\n    // Add multiply method\n    public static void main(String[] args) {\n        System.out.println(\"Product: \" + multiply(4, 5));\n    }\n}",
    practiceSolution: "public class Main {\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Product: \" + multiply(4, 5));\n    }\n}",
    practiceExplanation: "The multiply method takes two integers and returns their calculated product."
  },
  {
    id: "java_oop_classes",
    subject: "Java",
    chapterNumber: 20,
    title: "Java OOP & Classes",
    slug: "java_oop_classes",
    videoUrl: "https://www.youtube.com/embed/eIrMbAQSU34",
    videoTitle: "Java Masterclass Chapter 20: Java OOP & Classes",
    summary: "Comprehensive guide to Java OOP & Classes",
    content: "Object-Oriented Programming in Java models real-world entities through classes that define shared templates and objects that represent concrete instantiated instances. The four pillars of Java OOP are encapsulation which hides internal object state behind private access modifiers and public getters or setters, inheritance which allows subclasses to extend superclass functionality, polymorphism which allows dynamic method dispatching, and abstraction which hides implementation complexities through abstract classes and interfaces.",
    exampleExplanation: "In this example, we create an encapsulated BankAccount class with private balance fields and deposit methods.",
    keyPoints: [
      "Encapsulation protects object state from unauthorized modification by restricting field access to class methods.",
      "The this keyword refers to the current object instance within constructors and instance methods."
    ],
    exampleCode: "class BankAccount {\n    private String accountNumber;\n    private double balance;\n\n    public BankAccount(String accountNumber, double initialBalance) {\n        this.accountNumber = accountNumber;\n        this.balance = Math.max(0.0, initialBalance);\n    }\n\n    public void deposit(double amount) {\n        if (amount > 0) {\n            this.balance += amount;\n            System.out.println(\"Deposited: \" + amount);\n        }\n    }\n\n    public double getBalance() {\n        return this.balance;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        BankAccount account = new BankAccount(\"LF-9821\", 500.0);\n        account.deposit(250.0);\n        System.out.println(\"Current Verified Balance: $\" + account.getBalance());\n    }\n}",
    expectedOutput: "Deposited: 250.0\nCurrent Verified Balance: $750.0",
    practiceQuestion: "Define a Student class with private name field, a constructor, and a getName method.",
    practiceStarter: "// Define Student class\npublic class Main {\n    public static void main(String[] args) {\n        // Instantiate and print name\n    }\n}",
    practiceSolution: "class Student {\n    private String name;\n    public Student(String name) { this.name = name; }\n    public String getName() { return name; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student(\"Aria\");\n        System.out.println(\"Student: \" + s.getName());\n    }\n}",
    practiceExplanation: "Private fields paired with public getter methods enforce proper encapsulation."
  }
];

export const DBMS_TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: "sql_intro",
    subject: "DBMS",
    chapterNumber: 1,
    title: "SQL Intro & RDBMS Architecture",
    slug: "sql_intro",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 1: SQL Intro & RDBMS Architecture",
    summary: "Comprehensive guide to SQL Intro & RDBMS Architecture",
    content: "Structured Query Language is the domain-specific declarative language used to manage, query, and manipulate data stored inside Relational Database Management Systems. Introduced by Edgar F. Codd in 1970, the relational model organizes data into two-dimensional tables consisting of rows representing entity instances and columns representing attributes. Relational systems guarantee transactional safety through the ACID properties of Atomicity, Consistency, Isolation, and Durability to prevent data corruption during power failures or concurrent updates.",
    exampleExplanation: "In this example, we define relational table schemas with primary keys and foreign key constraints.",
    keyPoints: [
      "Primary keys uniquely identify each row in a database table and prevent duplicate record creation.",
      "Foreign key constraints enforce referential integrity across related parent and child database tables."
    ],
    exampleCode: "-- Relational Schema Definition\nCREATE TABLE departments (\n    dept_id INT PRIMARY KEY,\n    dept_name VARCHAR(100) NOT NULL UNIQUE\n);\n\nCREATE TABLE employees (\n    emp_id INT PRIMARY KEY,\n    emp_name VARCHAR(100) NOT NULL,\n    dept_id INT REFERENCES departments(dept_id),\n    salary DECIMAL(10, 2) CHECK (salary > 0)\n);\n\nSELECT 'Schema created with relational integrity' AS status;",
    expectedOutput: "+--------------------------------------------+\n| status                                     |\n+--------------------------------------------+\n| Schema created with relational integrity   |\n+--------------------------------------------+",
    practiceQuestion: "Create a students table with student_id as primary key and name column.",
    practiceStarter: "-- Create students table\n",
    practiceSolution: "CREATE TABLE students (\n    student_id INT PRIMARY KEY,\n    name VARCHAR(100) NOT NULL\n);",
    practiceExplanation: "PRIMARY KEY uniquely indexes and identifies each record in the relation."
  },
  {
    id: "sql_syntax",
    subject: "DBMS",
    chapterNumber: 2,
    title: "SQL Syntax & Core Statements",
    slug: "sql_syntax",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 2: SQL Syntax & Core Statements",
    summary: "Comprehensive guide to SQL Syntax & Core Statements",
    content: "SQL statements follow a standardized declarative syntax divided into distinct functional sub-languages based on their operational scope. Data Definition Language statements such as CREATE, ALTER, and DROP define and modify schema objects and structures. Data Manipulation Language statements such as SELECT, INSERT, UPDATE, and DELETE retrieve and modify row records, while Transaction Control Language statements such as COMMIT and ROLLBACK establish transactional boundaries.",
    exampleExplanation: "In this example, we execute a transaction with an insert statement and commit the modification permanently.",
    keyPoints: [
      "DDL statements modify database schema structures while DML statements manipulate actual table records.",
      "COMMIT saves all uncommitted modifications in the current transaction permanently to disk storage."
    ],
    exampleCode: "-- Transaction Control Example\nBEGIN TRANSACTION;\n\nINSERT INTO audit_logs (event, timestamp)\nVALUES ('SYSTEM_SETUP_VERIFIED', CURRENT_TIMESTAMP);\n\nCOMMIT;\n\nSELECT 'Transaction committed successfully' AS result;",
    expectedOutput: "+-----------------------------------+\n| result                            |\n+-----------------------------------+\n| Transaction committed successfully|\n+-----------------------------------+",
    practiceQuestion: "Write a TCL command that discards all uncommitted modifications.",
    practiceStarter: "-- Discard changes\n",
    practiceSolution: "ROLLBACK;",
    practiceExplanation: "ROLLBACK aborts the current transaction and restores data to the previous safe state."
  },
  {
    id: "sql_select",
    subject: "DBMS",
    chapterNumber: 3,
    title: "SQL SELECT & SELECT DISTINCT",
    slug: "sql_select",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 3: SQL SELECT & SELECT DISTINCT",
    summary: "Comprehensive guide to SQL SELECT & SELECT DISTINCT",
    content: "The SELECT statement retrieves specified columns and records from one or more database tables using relational projection. Rather than requesting all table attributes with SELECT asterisk, production systems explicitly designate target column names to conserve network bandwidth and improve index scanning performance. When query results contain duplicate rows across selected columns, the SELECT DISTINCT clause filters out duplicates to return only unique records.",
    exampleExplanation: "In this example, we query unique department names from the course catalog ordered alphabetically.",
    keyPoints: [
      "SELECT queries retrieve specified column attributes from database tables via relational projection.",
      "The DISTINCT keyword eliminates duplicate rows from the final result set."
    ],
    exampleCode: "-- Query unique department names\nSELECT DISTINCT department \nFROM course_catalog \nORDER BY department ASC;",
    expectedOutput: "+----------------------+\n| department           |\n+----------------------+\n| Computer Science     |\n| Data Science         |\n| Information Systems  |\n+----------------------+",
    practiceQuestion: "Write a query to select unique roles from a users table.",
    practiceStarter: "-- Select unique roles\n",
    practiceSolution: "SELECT DISTINCT role FROM users;",
    practiceExplanation: "DISTINCT filters redundant values from the returned query rows."
  },
  {
    id: "sql_where",
    subject: "DBMS",
    chapterNumber: 4,
    title: "SQL WHERE Clause & Filtering",
    slug: "sql_where",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 4: SQL WHERE Clause & Filtering",
    summary: "Comprehensive guide to SQL WHERE Clause & Filtering",
    content: "The WHERE clause filters database records by evaluating boolean conditions against each row before any grouping or aggregation occurs. Rows are returned in the query result only if the condition evaluates to true. SQL provides diverse comparison operators including equality, inequality, numerical ranges with the BETWEEN operator, set membership testing with the IN operator, and wildcard text pattern matching using the LIKE operator.",
    exampleExplanation: "In this example, we filter enrolled students who maintain high grade point averages within an active enrollment year range.",
    keyPoints: [
      "The WHERE clause evaluates conditions to filter candidate rows before data aggregation.",
      "The BETWEEN operator tests whether a column value falls within an inclusive numerical or date range."
    ],
    exampleCode: "-- Filtering active students with high GPA\nSELECT student_id, name, gpa\nFROM students\nWHERE gpa >= 3.50 \n  AND status = 'ACTIVE'\n  AND enrollment_year BETWEEN 2024 AND 2026;",
    expectedOutput: "+------------+-----------------+------+\n| student_id | name            | gpa  |\n+------------+-----------------+------+\n| std_101    | Aria Montgomery | 3.92 |\n| std_104    | Elena Rostova   | 3.85 |\n+------------+-----------------+------+",
    practiceQuestion: "Select all products whose price is between 50 and 100.",
    practiceStarter: "SELECT * FROM products\n-- Add WHERE clause\n;",
    practiceSolution: "SELECT * FROM products\nWHERE price BETWEEN 50 AND 100;",
    practiceExplanation: "The BETWEEN operator filters rows within the specified range inclusively."
  },
  {
    id: "sql_orderby",
    subject: "DBMS",
    chapterNumber: 5,
    title: "SQL ORDER BY & Multi-Column",
    slug: "sql_orderby",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 5: SQL ORDER BY & Multi-Column",
    summary: "Comprehensive guide to SQL ORDER BY & Multi-Column",
    content: "The ORDER BY clause sorts query result sets into ascending or descending sequence based on one or more columns. Relational databases store records in arbitrary physical page order, meaning results are never guaranteed to be sorted unless an explicit ORDER BY clause is provided. Sorting defaults to ascending order using the ASC keyword, while the DESC keyword sorts from highest to lowest, and tie-breaking columns can be supplied in comma-separated order.",
    exampleExplanation: "In this example, we sort courses by descending rating and break any ties using ascending alphabetical titles.",
    keyPoints: [
      "Relational databases do not guarantee record order unless an explicit ORDER BY clause is included.",
      "Supplying multiple columns in ORDER BY resolves sorting ties hierarchically."
    ],
    exampleCode: "-- Top 3 highest-rated courses\nSELECT course_id, title, rating\nFROM courses\nORDER BY rating DESC, title ASC\nLIMIT 3;",
    expectedOutput: "+-----------+-----------------------------------+--------+\n| course_id | title                             | rating |\n+-----------+-----------------------------------+--------+\n| crs_py    | Python Programming Masterclass    | 4.95   |\n| crs_ml    | Machine Learning Foundations      | 4.91   |\n| crs_db    | Database Systems & SQL            | 4.88   |\n+-----------+-----------------------------------+--------+",
    practiceQuestion: "Sort a customers table by last_name ascending and first_name ascending.",
    practiceStarter: "SELECT * FROM customers\n-- Order by names\n;",
    practiceSolution: "SELECT * FROM customers\nORDER BY last_name ASC, first_name ASC;",
    practiceExplanation: "Multiple sorting columns allow deterministic ordering when first names share identical surnames."
  },
  {
    id: "sql_and_or_not",
    subject: "DBMS",
    chapterNumber: 6,
    title: "SQL AND, OR and NOT Operators",
    slug: "sql_and_or_not",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 6: SQL AND, OR and NOT Operators",
    summary: "Comprehensive guide to SQL AND, OR and NOT Operators",
    content: "Complex query predicates are constructed by combining individual conditions using the logical operators AND, OR, and NOT. The AND operator requires all conjoined conditions to evaluate to true for a row to match, whereas the OR operator matches if any individual condition evaluates to true. The NOT operator negates the truth value of an expression. In SQL evaluation order, NOT takes highest precedence followed by AND, and finally OR, so parentheses should be used to enforce clear logical groupings.",
    exampleExplanation: "In this example, we select students eligible for honors by grouping major options with parentheses before evaluating grade thresholds.",
    keyPoints: [
      "Parentheses should always be used to group compound logical expressions to avoid unexpected operator precedence.",
      "The AND operator requires every condition to be true while OR requires only one condition to match."
    ],
    exampleCode: "-- Students eligible for advanced honors track\nSELECT name, major, gpa, credits\nFROM students\nWHERE (major = 'Computer Science' OR major = 'Data Science')\n  AND gpa >= 3.80\n  AND NOT probation_flag;",
    expectedOutput: "+-----------------+------------------+------+---------+\n| name            | major            | gpa  | credits |\n+-----------------+------------------+------+---------+\n| Aria Montgomery | Computer Science | 3.92 | 64      |\n| Cassian Thorne  | Data Science     | 3.98 | 80      |\n+-----------------+------------------+------+---------+",
    practiceQuestion: "Select active users who are either ADMIN or INSTRUCTOR.",
    practiceStarter: "SELECT * FROM users\n-- Add WHERE condition\n;",
    practiceSolution: "SELECT * FROM users\nWHERE is_active = TRUE AND (role = 'ADMIN' OR role = 'INSTRUCTOR');",
    practiceExplanation: "Parentheses group the role conditions before combining with the active flag."
  },
  {
    id: "sql_insert",
    subject: "DBMS",
    chapterNumber: 7,
    title: "SQL INSERT INTO & Batch Insertion",
    slug: "sql_insert",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 7: SQL INSERT INTO & Batch Insertion",
    summary: "Comprehensive guide to SQL INSERT INTO & Batch Insertion",
    content: "The INSERT INTO statement adds new data records into relational database tables. Best practice mandates explicitly declaring the target column names in the insert statement rather than relying on default schema positions, ensuring that future schema modifications do not break application queries. Modern database engines also support batch multi-row inserts within a single query, reducing network round-trip latency and transactional overhead during high-volume data ingestion.",
    exampleExplanation: "In this example, we insert a batch of enrolled student records in a single statement and query the resulting row count.",
    keyPoints: [
      "Explicitly listing column names in INSERT statements prevents errors when table structures evolve.",
      "Batch inserts send multiple record rows in a single network request to maximize throughput."
    ],
    exampleCode: "-- Insert batch of student records\nINSERT INTO enrolled_students (student_id, course_code, enrollment_date)\nVALUES \n    ('std_01', 'CS-101', '2026-09-01'),\n    ('std_02', 'CS-101', '2026-09-02'),\n    ('std_03', 'DS-201', '2026-09-03');\n\nSELECT COUNT(*) AS total_enrolled FROM enrolled_students;",
    expectedOutput: "+----------------+\n| total_enrolled |\n+----------------+\n| 3              |\n+----------------+",
    practiceQuestion: "Write an INSERT statement adding department 10 with name Engineering.",
    practiceStarter: "-- Insert department\n",
    practiceSolution: "INSERT INTO departments (dept_id, dept_name)\nVALUES (10, 'Engineering');",
    practiceExplanation: "The values match the designated columns in order."
  },
  {
    id: "sql_null",
    subject: "DBMS",
    chapterNumber: 8,
    title: "SQL NULL Values & IS NULL",
    slug: "sql_null",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 8: SQL NULL Values & IS NULL",
    summary: "Comprehensive guide to SQL NULL Values & IS NULL",
    content: "In relational databases, NULL represents the total absence of data, an unknown value, or an inapplicable attribute. Because NULL signifies an unknown state, it obeys three-valued logic where comparing NULL with any value using standard equality operators yields unknown rather than true or false. To safely inspect nullability, queries must use the IS NULL or IS NOT NULL operators, and the COALESCE function can provide fallback replacement values.",
    exampleExplanation: "In this example, we query students lacking phone numbers and supply fallback display text using COALESCE.",
    keyPoints: [
      "Comparing values to NULL using equals always yields unknown rather than true or false.",
      "The COALESCE function evaluates arguments in order and returns the first non-null value."
    ],
    exampleCode: "-- Query demonstrating NULL handling\nSELECT \n    name, \n    phone_number,\n    COALESCE(phone_number, 'No Contact Phone Provided') AS contact_display\nFROM student_profiles\nWHERE phone_number IS NULL;",
    expectedOutput: "+----------------+--------------+-----------------------------+\n| name           | phone_number | contact_display             |\n+----------------+--------------+-----------------------------+\n| Sarah Lin      | NULL         | No Contact Phone Provided   |\n| Leo Patel      | NULL         | No Contact Phone Provided   |\n+----------------+--------------+-----------------------------+",
    practiceQuestion: "Select all orders where shipped_date is null.",
    practiceStarter: "SELECT * FROM orders\n-- Check shipped_date is null\n;",
    practiceSolution: "SELECT * FROM orders\nWHERE shipped_date IS NULL;",
    practiceExplanation: "The IS NULL operator identifies records where no date data exists."
  },
  {
    id: "sql_update_delete",
    subject: "DBMS",
    chapterNumber: 9,
    title: "SQL UPDATE & DELETE Statements",
    slug: "sql_update_delete",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 9: SQL UPDATE & DELETE Statements",
    summary: "Comprehensive guide to SQL UPDATE & DELETE Statements",
    content: "The UPDATE and DELETE statements modify or remove existing rows stored in relational database tables. An UPDATE statement alters column values using the SET clause, while a DELETE statement removes records completely from the target table. Both operations must always include a carefully structured WHERE clause, because omitting the WHERE clause causes the database engine to modify or erase every single row in the entire table.",
    exampleExplanation: "In this example, we update academic standing flags for top students and delete expired authorization tokens safely.",
    keyPoints: [
      "Omitting the WHERE clause in an UPDATE or DELETE statement affects all records in the table.",
      "Wrapping data updates in transactions ensures that unintended modifications can be safely rolled back."
    ],
    exampleCode: "-- Update student standing\nUPDATE students\nSET academic_standing = 'Dean Honors List',\n    scholarship_awarded = TRUE\nWHERE gpa >= 3.90;\n\n-- Remove inactive expired temp tokens\nDELETE FROM auth_tokens\nWHERE expires_at < CURRENT_TIMESTAMP;\n\nSELECT 'Data modifications applied safely' AS status;",
    expectedOutput: "+------------------------------------+\n| status                             |\n+------------------------------------+\n| Data modifications applied safely  |\n+------------------------------------+",
    practiceQuestion: "Update the status of course CS-101 to COMPLETED.",
    practiceStarter: "-- Update courses\n",
    practiceSolution: "UPDATE courses\nSET status = 'COMPLETED'\nWHERE course_id = 'CS-101';",
    practiceExplanation: "The WHERE clause isolates the update to only course CS-101."
  },
  {
    id: "sql_joins",
    subject: "DBMS",
    chapterNumber: 10,
    title: "SQL Joins & Relational Integrity",
    slug: "sql_joins",
    videoUrl: "https://www.youtube.com/embed/HXV3zeQKqGY",
    videoTitle: "DBMS Masterclass Chapter 10: SQL Joins & Relational Integrity",
    summary: "Comprehensive guide to SQL Joins & Relational Integrity",
    content: "SQL joins correlate and merge records from two or more tables based on a related common key established through foreign key constraints. An INNER JOIN returns only rows that have matching values in both tables. A LEFT JOIN returns all records from the left table alongside matched records from the right table, filling with NULL where matches do not exist, while FULL OUTER JOIN returns all records when a match exists in either table.",
    exampleExplanation: "In this example, we join student, enrollment, and course tables using inner joins to generate a complete transcript view.",
    keyPoints: [
      "An INNER JOIN returns only rows that have matching values across both joined tables.",
      "A LEFT JOIN retains all rows from the primary left table regardless of whether matches exist on the right."
    ],
    exampleCode: "-- Query students along with their registered course titles\nSELECT \n    s.name AS student_name,\n    c.title AS course_title,\n    e.grade\nFROM students s\nINNER JOIN enrollments e ON s.student_id = e.student_id\nINNER JOIN courses c ON e.course_id = c.course_id\nORDER BY s.name ASC;",
    expectedOutput: "+-----------------+--------------------------------+-------+\n| student_name    | course_title                   | grade |\n+-----------------+--------------------------------+-------+\n| Aria Montgomery | Python Programming Masterclass | 94.0  |\n| Aria Montgomery | Database Systems & SQL         | 91.5  |\n| Leo Patel       | Java Enterprise Systems        | 88.0  |\n+-----------------+--------------------------------+-------+",
    practiceQuestion: "Write an INNER JOIN between orders and customers matching on customer_id.",
    practiceStarter: "SELECT o.order_id, c.name\nFROM orders o\n-- Join customers\n;",
    practiceSolution: "SELECT o.order_id, c.name\nFROM orders o\nINNER JOIN customers c ON o.customer_id = c.customer_id;",
    practiceExplanation: "The ON clause defines the matching key condition linking both relations."
  }
];

export const ML_TUTORIAL_TOPICS: TutorialTopic[] = [
  {
    id: "ml_intro",
    subject: "ML",
    chapterNumber: 1,
    title: "ML Intro & Core Paradigms",
    slug: "ml_intro",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 1: ML Intro & Core Paradigms",
    summary: "Comprehensive guide to ML Intro & Core Paradigms",
    content: "Machine Learning is a branch of Artificial Intelligence where mathematical algorithms learn predictive patterns from empirical data rather than executing hard-coded rule sets. In supervised learning, models train on input feature matrices and known target labels to solve regression or classification problems. In unsupervised learning, models discover latent structure in unlabeled data through clustering and dimensionality reduction. In reinforcement learning, software agents learn optimal behavioral policies by taking actions in an environment to maximize cumulative reward signals.",
    exampleExplanation: "In this example, we represent features and target labels using NumPy arrays and compute their statistical correlation.",
    keyPoints: [
      "Supervised learning trains on labeled input and output pairs to predict continuous values or discrete classes.",
      "Unsupervised learning discovers hidden patterns and natural clusters without requiring labeled output targets."
    ],
    exampleCode: "import numpy as np\n\n# Feature: Study Hours -> Target: Exam Score\nX_study_hours = np.array([2.0, 3.5, 5.0, 7.0, 8.5])\ny_exam_scores = np.array([55.0, 68.0, 78.0, 89.0, 96.0])\n\nprint(\"Feature vector X:\", X_study_hours)\nprint(\"Target vector y:\", y_exam_scores)\nprint(\"Correlation:\", round(float(np.corrcoef(X_study_hours, y_exam_scores)[0, 1]), 4))",
    expectedOutput: "Feature vector X: [2.  3.5 5.  7.  8.5]\nTarget vector y: [55. 68. 78. 89. 96.]\nCorrelation: 0.9961",
    practiceQuestion: "Create an array with values [10, 20, 30] and print its mean.",
    practiceStarter: "import numpy as np\n# Create array and print mean\n",
    practiceSolution: "import numpy as np\narr = np.array([10.0, 20.0, 30.0])\nprint(\"Mean:\", np.mean(arr))",
    practiceExplanation: "np.mean computes the arithmetic average of array elements."
  },
  {
    id: "ml_preprocessing",
    subject: "ML",
    chapterNumber: 2,
    title: "Data Preprocessing & Feature Scaling",
    slug: "ml_preprocessing",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 2: Data Preprocessing & Feature Scaling",
    summary: "Comprehensive guide to Data Preprocessing & Feature Scaling",
    content: "Data preprocessing transforms messy raw data into structured numerical matrices suitable for machine learning training pipelines. Real-world datasets often contain missing entries requiring imputation, categorical attributes requiring one-hot or label encoding, and disparate feature scales that distort distance calculations. Standardization rescales numerical features so they have zero mean and unit variance, while min-max normalization bounds feature ranges between zero and one to stabilize optimization algorithms.",
    exampleExplanation: "In this example, we compute the sample mean and standard deviation of raw features to calculate standard Z-scores.",
    keyPoints: [
      "Feature scaling ensures that features with large numerical magnitudes do not dominate gradient optimization.",
      "Data preprocessing must fit scaling parameters solely on training data to prevent evaluation data leakage."
    ],
    exampleCode: "import numpy as np\n\nraw_features = np.array([12.0, 24.0, 36.0, 48.0, 60.0])\nmean_val = np.mean(raw_features)\nstd_val = np.std(raw_features)\n\n# Standardize: (x - mean) / std\nz_scores = (raw_features - mean_val) / std_val\n\nprint(\"Raw Features:\", raw_features)\nprint(\"Standardized Features:\", np.round(z_scores, 2))",
    expectedOutput: "Raw Features: [12. 24. 36. 48. 60.]\nStandardized Features: [-1.41 -0.71  0.    0.71  1.41]",
    practiceQuestion: "Perform min-max normalization on an array [10, 20, 30] to scale it between 0 and 1.",
    practiceStarter: "import numpy as np\narr = np.array([10.0, 20.0, 30.0])\n# Min-max scale\n",
    practiceSolution: "import numpy as np\narr = np.array([10.0, 20.0, 30.0])\nscaled = (arr - arr.min()) / (arr.max() - arr.min())\nprint(\"Scaled:\", scaled)",
    practiceExplanation: "Subtracting the minimum and dividing by range maps values between 0.0 and 1.0."
  },
  {
    id: "ml_linear_regression",
    subject: "ML",
    chapterNumber: 3,
    title: "Linear Regression & Cost Minimization",
    slug: "ml_linear_regression",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 3: Linear Regression & Cost Minimization",
    summary: "Comprehensive guide to Linear Regression & Cost Minimization",
    content: "Linear Regression models the mathematical relationship between independent explanatory features and a continuous dependent target variable using a linear equation. The model computes predictions by taking the weighted dot product of input features plus an intercept bias parameter. Training involves minimizing a cost function, typically Mean Squared Error, which measures the average squared difference between predictions and actual targets using gradient descent or analytical least squares.",
    exampleExplanation: "In this example, we solve optimal linear regression weights using the analytical ordinary least squares normal equation.",
    keyPoints: [
      "Linear regression finds the hyperplane that minimizes the sum of squared prediction errors.",
      "Gradient descent iteratively updates model weights in the direction that decreases cost function loss."
    ],
    exampleCode: "import numpy as np\n\nx = np.array([1.0, 2.0, 3.0, 4.0, 5.0])\ny = np.array([2.2, 3.9, 6.1, 7.8, 10.2])\n\nX_bias = np.vstack([x, np.ones(len(x))]).T\nweights, bias = np.linalg.lstsq(X_bias, y, rcond=None)[0]\n\nprint(f\"Optimal slope: {weights:.4f}\")\nprint(f\"Optimal intercept: {bias:.4f}\")\nprint(f\"Prediction for x=6: {weights * 6 + bias:.2f}\")",
    expectedOutput: "Optimal slope: 1.9800\nOptimal intercept: 0.1000\nPrediction for x=6: 11.98",
    practiceQuestion: "Compute the Mean Squared Error between actual [4.0, 6.0] and predicted [3.8, 6.2].",
    practiceStarter: "import numpy as np\nactual = np.array([4.0, 6.0])\npred = np.array([3.8, 6.2])\n# Compute MSE\n",
    practiceSolution: "import numpy as np\nactual = np.array([4.0, 6.0])\npred = np.array([3.8, 6.2])\nmse = np.mean((actual - pred) ** 2)\nprint(\"MSE:\", round(mse, 4))",
    practiceExplanation: "Mean squared error calculates the average of squared prediction errors."
  },
  {
    id: "ml_logistic_regression",
    subject: "ML",
    chapterNumber: 4,
    title: "Logistic Regression & Classification",
    slug: "ml_logistic_regression",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 4: Logistic Regression & Classification",
    summary: "Comprehensive guide to Logistic Regression & Classification",
    content: "Logistic Regression is a foundational classification algorithm used to estimate the probability that a given observation belongs to a specific discrete category. The model passes a linear combination of input features through the non-linear sigmoid activation function, which maps any real-valued number into an output probability between zero and one. Binary cross-entropy log loss penalizes incorrect confident predictions with logarithmic severity to guide parameter optimization.",
    exampleExplanation: "In this example, we implement the sigmoid activation function and assign binary class predictions based on a 0.5 decision threshold.",
    keyPoints: [
      "The sigmoid function squashes any real-valued input score into a valid probability range between 0 and 1.",
      "Binary cross-entropy loss heavily penalizes incorrect predictions that the model made with high confidence."
    ],
    exampleCode: "import numpy as np\n\ndef sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-z))\n\nscores = np.array([-2.5, 0.0, 2.5])\nprobs = sigmoid(scores)\n\nfor z, p in zip(scores, probs):\n    pred = 1 if p >= 0.5 else 0\n    print(f\"Score {z:+.1f} -> Probability {p:.4f} -> Class: {pred}\")",
    expectedOutput: "Score -2.5 -> Probability 0.0759 -> Class: 0\nScore +0.0 -> Probability 0.5000 -> Class: 1\nScore +2.5 -> Probability 0.9241 -> Class: 1",
    practiceQuestion: "Calculate the sigmoid probability for score z = 0.",
    practiceStarter: "import math\n# Compute sigmoid(0)\n",
    practiceSolution: "import math\np = 1.0 / (1.0 + math.exp(0))\nprint(\"Sigmoid(0):\", p)",
    practiceExplanation: "A score of zero evaluates to exactly 0.5 probability in the sigmoid function."
  },
  {
    id: "ml_decision_trees",
    subject: "ML",
    chapterNumber: 5,
    title: "Decision Trees & Ensemble Methods",
    slug: "ml_decision_trees",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 5: Decision Trees & Ensemble Methods",
    summary: "Comprehensive guide to Decision Trees & Ensemble Methods",
    content: "Decision Trees are non-parametric supervised algorithms that partition feature space into orthogonal decision regions by asking a sequence of boolean questions. At each internal node, the algorithm selects the feature split that maximizes purity, measured using metrics such as Gini Impurity or Information Gain Entropy. To overcome the high variance and overfitting typical of individual trees, ensemble methods like Random Forest combine hundreds of diverse trees using bootstrap aggregation.",
    exampleExplanation: "In this example, we calculate Gini impurity for pure and mixed leaf nodes to evaluate classification purity.",
    keyPoints: [
      "Gini impurity measures the frequency with which a randomly chosen element would be incorrectly labeled.",
      "Random Forest ensembles reduce variance by averaging predictions across hundreds of decorrelated decision trees."
    ],
    exampleCode: "import numpy as np\n\ndef calculate_gini(labels):\n    classes, counts = np.unique(labels, return_counts=True)\n    probabilities = counts / len(labels)\n    return 1.0 - np.sum(probabilities ** 2)\n\npure_node = np.array([1, 1, 1, 1])\nmixed_node = np.array([0, 1, 0, 1])\n\nprint(\"Gini of pure node:\", calculate_gini(pure_node))\nprint(\"Gini of mixed node:\", calculate_gini(mixed_node))",
    expectedOutput: "Gini of pure node: 0.0\nGini of mixed node: 0.5",
    practiceQuestion: "Calculate Gini impurity for an array where all elements are class 0.",
    practiceStarter: "import numpy as np\n# Calculate Gini\n",
    practiceSolution: "import numpy as np\nlabels = np.array([0, 0, 0])\nprob = 1.0\ngini = 1.0 - (prob ** 2)\nprint(\"Purity Gini:\", gini)",
    practiceExplanation: "When all samples belong to the same class, the node is pure and Gini impurity is zero."
  },
  {
    id: "ml_kmeans",
    subject: "ML",
    chapterNumber: 6,
    title: "K-Means Clustering & Unsupervised Discovery",
    slug: "ml_kmeans",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 6: K-Means Clustering & Unsupervised Discovery",
    summary: "Comprehensive guide to K-Means Clustering & Unsupervised Discovery",
    content: "K-Means is an unsupervised clustering algorithm that partitions unlabeled data points into k distinct clusters based on feature similarity. The algorithm operates through an iterative expectation-maximization process where observations are assigned to their nearest cluster centroid using Euclidean distance, after which centroid positions are updated to the arithmetic mean of their assigned members. The optimal number of clusters is determined using the elbow method by tracking within-cluster inertia.",
    exampleExplanation: "In this example, we demonstrate one iteration of point assignment and centroid updates on a one-dimensional array.",
    keyPoints: [
      "K-Means alternates between assigning observations to the closest centroid and recalculating centroid positions.",
      "The elbow method locates the inflection point where additional clusters yield diminishing returns in inertia reduction."
    ],
    exampleCode: "import numpy as np\n\npoints = np.array([1.0, 2.0, 8.0, 9.0, 10.0])\nc1, c2 = 1.0, 9.0\n\ncluster1 = points[np.abs(points - c1) < np.abs(points - c2)]\ncluster2 = points[np.abs(points - c2) <= np.abs(points - c1)]\n\nnew_c1 = np.mean(cluster1)\nnew_c2 = np.mean(cluster2)\n\nprint(\"Cluster 1:\", cluster1, \"-> New Centroid:\", round(new_c1, 2))\nprint(\"Cluster 2:\", cluster2, \"-> New Centroid:\", round(new_c2, 2))",
    expectedOutput: "Cluster 1: [1. 2.] -> New Centroid: 1.5\nCluster 2: [ 8.  9. 10.] -> New Centroid: 9.0",
    practiceQuestion: "Calculate Euclidean distance between points (0, 0) and (3, 4).",
    practiceStarter: "import numpy as np\n# Distance\n",
    practiceSolution: "import numpy as np\np1 = np.array([0.0, 0.0])\np2 = np.array([3.0, 4.0])\ndist = np.linalg.norm(p1 - p2)\nprint(\"Distance:\", dist)",
    practiceExplanation: "np.linalg.norm calculates the straight-line Euclidean distance between two vectors."
  },
  {
    id: "ml_evaluation",
    subject: "ML",
    chapterNumber: 7,
    title: "Model Evaluation & Cross-Validation",
    slug: "ml_evaluation",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 7: Model Evaluation & Cross-Validation",
    summary: "Comprehensive guide to Model Evaluation & Cross-Validation",
    content: "Evaluating machine learning models requires robust statistical metrics beyond simple overall accuracy, especially when working with imbalanced datasets where minority classes represent critical events. A confusion matrix categorizes predictions into true positives, false positives, true negatives, and false negatives. Precision measures the fraction of positive predictions that were correct, recall measures the fraction of actual positive cases detected, and the F1-score provides their balanced harmonic mean.",
    exampleExplanation: "In this example, we calculate accuracy, precision, recall, and F1-score from confusion matrix counts.",
    keyPoints: [
      "Precision evaluates prediction reliability while recall evaluates detection sensitivity.",
      "The F1-score computes the harmonic mean of precision and recall to provide a balanced evaluation metric."
    ],
    exampleCode: "tp, fp, fn, tn = 85, 10, 15, 890\n\naccuracy = (tp + tn) / (tp + fp + fn + tn)\nprecision = tp / (tp + fp)\nrecall = tp / (tp + fn)\nf1 = 2 * (precision * recall) / (precision + recall)\n\nprint(f\"Accuracy:  {accuracy:.4f}\")\nprint(f\"Precision: {precision:.4f}\")\nprint(f\"Recall:    {recall:.4f}\")\nprint(f\"F1-Score:  {f1:.4f}\")",
    expectedOutput: "Accuracy:  0.9750\nPrecision: 0.8947\nRecall:    0.8500\nF1-Score:  0.8718",
    practiceQuestion: "Calculate precision when true positives is 80 and false positives is 20.",
    practiceStarter: "# Precision calculation\ntp = 80\nfp = 20\n",
    practiceSolution: "tp = 80\nfp = 20\nprecision = tp / (tp + fp)\nprint(\"Precision:\", precision)",
    practiceExplanation: "Precision divides true positives by the total predicted positives."
  },
  {
    id: "ml_neural_networks",
    subject: "ML",
    chapterNumber: 8,
    title: "Neural Networks & Deep Learning Foundations",
    slug: "ml_neural_networks",
    videoUrl: "https://www.youtube.com/embed/i_LwzRVP7bg",
    videoTitle: "ML Masterclass Chapter 8: Neural Networks & Deep Learning Foundations",
    summary: "Comprehensive guide to Neural Networks & Deep Learning Foundations",
    content: "Artificial Neural Networks are computational architectures inspired by biological neural circuits, composed of layers of interconnected artificial neurons. Each neuron computes a weighted sum of its inputs plus a bias term and passes the result through a non-linear activation function like ReLU to enable non-linear pattern learning. In forward propagation, data passes through successive layers to compute predictions, while backpropagation calculates loss gradients using the chain rule to update network weights via gradient descent.",
    exampleExplanation: "In this example, we implement a single dense artificial neuron with linear weighting and ReLU activation.",
    keyPoints: [
      "Non-linear activation functions like ReLU enable deep neural networks to approximate complex non-linear functions.",
      "Backpropagation uses the calculus chain rule to calculate loss gradients across hidden layers for weight optimization."
    ],
    exampleCode: "import numpy as np\n\ndef dense_neuron(inputs, weights, bias):\n    z = np.dot(inputs, weights) + bias\n    return max(0.0, z)\n\ninputs = np.array([0.5, 1.5, -0.8])\nweights = np.array([0.4, 0.2, 0.9])\nbias = 0.1\n\noutput = dense_neuron(inputs, weights, bias)\nprint(\"Neuron ReLU Output:\", round(output, 4))",
    expectedOutput: "Neuron ReLU Output: 0.0",
    practiceQuestion: "Compute the ReLU activation for a negative input of -3.5.",
    practiceStarter: "# ReLU computation\nval = -3.5\n",
    practiceSolution: "val = -3.5\nrelu = max(0.0, val)\nprint(\"ReLU Output:\", relu)",
    practiceExplanation: "ReLU returns zero for any negative input value."
  }
];

export const SUBJECT_TUTORIAL_PACKS: Record<string, SubjectTutorialPack> = {
  Python: {
    subject: 'Python',
    title: 'Python Programming Masterclass',
    description: 'Complete end-to-end 30-lesson curriculum from basics to object-oriented architectures and exceptions.',
    fullCourseVideoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw',
    fullCourseVideoTitle: 'Python Full Course - Complete Masterclass Walkthrough',
    topics: PYTHON_TUTORIAL_TOPICS,
  },
  Java: {
    subject: 'Java',
    title: 'Java Enterprise Engineering',
    description: 'Deep dive 20-lesson course into static typing, JVM execution, OOP patterns, and data structures.',
    fullCourseVideoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
    fullCourseVideoTitle: 'Java Full Course - Beginner to Advanced Masterclass',
    topics: JAVA_TUTORIAL_TOPICS,
  },
  DBMS: {
    subject: 'DBMS',
    title: 'Database Management Systems & SQL',
    description: 'Master 10-lesson relational database architecture, ACID transactions, complex joins, and SQL query tuning.',
    fullCourseVideoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
    fullCourseVideoTitle: 'Database Management Systems & SQL Full Course',
    topics: DBMS_TUTORIAL_TOPICS,
  },
  ML: {
    subject: 'ML',
    title: 'Machine Learning & Neural Foundations',
    description: '8-lesson core curriculum covering data preprocessing, linear/logistic regression, decision trees, K-means, and deep neural networks.',
    fullCourseVideoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg',
    fullCourseVideoTitle: 'Machine Learning Full Course - End-to-End Walkthrough',
    topics: ML_TUTORIAL_TOPICS,
  },
};

export const ALL_TUTORIAL_PACKS = SUBJECT_TUTORIAL_PACKS;
