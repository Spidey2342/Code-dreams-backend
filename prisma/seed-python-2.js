const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Python lessons 11-18...");

  const track = await prisma.track.findUnique({ where: { slug: "python-fundamentals" } });
  if (!track) { console.error("Track not found"); return; }

  const lessons = [
    {
      order: 11,
      title: "Dictionaries",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `A dictionary stores data as key-value pairs. Think of it like a real dictionary — you look up a word (the key) to find its definition (the value). In Python, dictionaries are one of the most powerful and frequently used data structures.

You create a dictionary with curly braces. Each entry is a key followed by a colon followed by the value. Keys must be unique and immutable — strings and numbers work as keys, lists do not.

You access values using square brackets with the key. If the key does not exist, Python raises a KeyError. The safe way is to use the get() method which returns None or a default value instead of crashing.

You can add new keys by assigning to them directly. You can delete keys using the del keyword or the pop() method. pop() also returns the value before deleting it.

Three essential methods let you loop over dictionaries. keys() returns all keys. values() returns all values. items() returns key-value pairs as tuples — the most useful one for looping.

Dictionaries are used everywhere in real programs. A student record is a dictionary. An API response is a dictionary. A configuration file is a dictionary. When you fetch data from the internet, it almost always comes as a dictionary (JSON format).

Nested dictionaries — dictionaries inside dictionaries — model complex real-world data. A student record might have a scores key whose value is another dictionary of subject to score pairs.`,
        keyConcepts: [
          { code: "{'key': 'value'}", description: "creates a dictionary with one key-value pair" },
          { code: "dict['key']", description: "accesses value by key — raises error if missing" },
          { code: "dict.get('key', default)", description: "safely gets value with fallback" },
          { code: "dict.keys()", description: "returns all keys in the dictionary" },
          { code: "dict.values()", description: "returns all values in the dictionary" },
          { code: "dict.items()", description: "returns key-value pairs for looping" },
        ],
        exerciseDescription: "Build a student record system using dictionaries. Create a student dictionary with nested data. Add, update, and delete entries. Loop through the dictionary to display a formatted profile. Use get() to safely access optional fields.",
        hint: "To loop through key-value pairs: for key, value in student.items(): — this unpacks each pair into two variables at once.",
        exercise: `# Dictionaries — Student Record System

# A student record as a dictionary
student = {
    "name": "Abena Asante",
    "age": 20,
    "university": "University of Ghana",
    "course": "Computer Science",
    "year": 2,
    "gpa": 3.85,
    "is_active": True,
    "scores": {
        "maths": 88,
        "programming": 92,
        "databases": 79,
        "networking": 85
    }
}

# Access values
print(f"Name: {student['name']}")
print(f"Course: {student['course']}")
print(f"GPA: {student['gpa']}")

# Safe access with get()
phone = student.get("phone", "Not provided")
print(f"Phone: {phone}")

# Add a new field
student["email"] = "abena@ug.edu.gh"
print(f"Email added: {student['email']}")

# Update a field
student["gpa"] = 3.90
print(f"Updated GPA: {student['gpa']}")

# Loop through scores
print("\\n--- Subject Scores ---")
for subject, score in student["scores"].items():
    grade = "A" if score >= 80 else "B" if score >= 70 else "C"
    print(f"  {subject.capitalize():<15} {score}%  ({grade})")

# Summary
scores = list(student["scores"].values())
average = sum(scores) / len(scores)
print(f"\\nAverage score: {average:.1f}%")
print(f"Total subjects: {len(student['scores'])}")
print(f"All keys: {list(student.keys())}")`,
        quiz: [
          { q: "How do you safely access a dictionary key that might not exist?", options: ["dict[key]", "dict.find(key)", "dict.get(key)", "dict.key"], answer: 2 },
          { q: "Which method returns key-value pairs for looping?", options: ["dict.keys()", "dict.values()", "dict.pairs()", "dict.items()"], answer: 3 },
          { q: "How do you add a new key to a dictionary?", options: ["dict.add(key, value)", "dict.append(key, value)", "dict[key] = value", "dict.insert(key, value)"], answer: 2 },
          { q: "What is a nested dictionary?", options: ["A dictionary inside a list", "A dictionary whose value is another dictionary", "A dictionary with duplicate keys", "A read-only dictionary"], answer: 1 },
        ],
      },
    },
    {
      order: 12,
      title: "File Reading and Writing",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `Files let your programs save data permanently. Without files, every variable you create disappears when your program ends. With files, you can save student records, store configuration, log events, and read data from external sources.

Python opens files using the open() function. It takes the filename and a mode. r reads an existing file. w writes to a file — creating it if it does not exist and erasing it if it does. a appends to an existing file without erasing. r+ reads and writes.

Always use the with statement when working with files. It automatically closes the file when you are done, even if an error occurs. Forgetting to close files causes data loss and resource leaks.

The read() method reads the entire file as one string. readlines() reads all lines into a list. readline() reads one line at a time — useful for large files that do not fit in memory.

The write() method writes a string to the file. It does not add a newline automatically — you must add backslash n yourself if you want each entry on its own line.

CSV files — comma separated values — are the most common format for data exchange. Python's csv module handles them properly, taking care of edge cases like commas inside quoted fields.

File paths matter. A relative path like data.txt looks in the current directory. An absolute path like C:/Users/Kofi/data.txt works from anywhere. Use forward slashes or raw strings on Windows.

Real use case: saving student grades to a file so they persist between program runs, reading a list of names from a CSV file, logging errors to a log file, reading configuration from a settings file.`,
        keyConcepts: [
          { code: "open('file.txt', 'r')", description: "opens a file for reading" },
          { code: "open('file.txt', 'w')", description: "opens a file for writing — erases existing content" },
          { code: "open('file.txt', 'a')", description: "opens a file for appending" },
          { code: "with open() as f:", description: "safely opens and auto-closes the file" },
          { code: "f.read()", description: "reads entire file as a string" },
          { code: "f.write('text')", description: "writes a string to the file" },
          { code: "f.readlines()", description: "reads all lines into a list" },
        ],
        exerciseDescription: "Build a student grade logger. Write student names and scores to a file, then read them back and display a formatted report. Use the with statement for all file operations. Calculate the class average from the saved data.",
        hint: "When writing multiple lines, end each with '\\n'. When reading back, use .strip() to remove the newline character from each line.",
        exercise: `# File Reading and Writing — Grade Logger

import os

# ── Write student grades to a file ──
students = [
    ("Kofi Mensah", 82),
    ("Abena Asante", 91),
    ("Kwame Boateng", 68),
    ("Efua Owusu", 75),
    ("Yaw Darko", 88),
]

# Write to file
with open("grades.txt", "w") as f:
    f.write("STUDENT GRADES\\n")
    f.write("=" * 30 + "\\n")
    for name, score in students:
        f.write(f"{name},{score}\\n")

print("Grades saved to grades.txt")

# ── Read back and display ──
print("\\n--- Reading from file ---")

with open("grades.txt", "r") as f:
    lines = f.readlines()

# Display the header
print(lines[0].strip())
print(lines[1].strip())

# Process the data lines
scores = []
for line in lines[2:]:  # Skip header lines
    line = line.strip()
    if line:
        parts = line.split(",")
        name = parts[0]
        score = int(parts[1])
        scores.append(score)
        grade = "A" if score >= 80 else "B" if score >= 70 else "C" if score >= 60 else "F"
        print(f"{name:<20} {score}%  Grade: {grade}")

# Calculate statistics from file data
if scores:
    print(f"\\nClass average: {sum(scores)/len(scores):.1f}%")
    print(f"Highest: {max(scores)}%")
    print(f"Lowest: {min(scores)}%")

# ── Append a new student ──
with open("grades.txt", "a") as f:
    f.write("Akosua Frimpong,79\\n")

print("\\nNew student added to file.")

# Clean up
os.remove("grades.txt")
print("File cleaned up.")`,
        quiz: [
          { q: "Which mode opens a file for writing without erasing existing content?", options: ["'w'", "'r'", "'a'", "'rw'"], answer: 2 },
          { q: "Why should you use the with statement for files?", options: ["It is faster", "It automatically closes the file even if an error occurs", "It reads files faster", "It creates the file automatically"], answer: 1 },
          { q: "What does f.readlines() return?", options: ["A string of the whole file", "A list of all lines", "The first line only", "The number of lines"], answer: 1 },
          { q: "What does 'w' mode do if the file already exists?", options: ["Appends to it", "Raises an error", "Erases it and starts fresh", "Creates a backup"], answer: 2 },
        ],
      },
    },
    {
      order: 13,
      title: "Error Handling",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `Errors are inevitable in real programs. Users type wrong input, files do not exist, network connections fail, APIs return unexpected data. Error handling lets your program deal with these situations gracefully instead of crashing.

Python uses try and except blocks. You put risky code in the try block. If an error occurs, Python jumps to the except block instead of crashing. The program continues running after the except block.

You can catch specific error types. ValueError happens when you try to convert the wrong type — like int("hello"). FileNotFoundError happens when you open a file that does not exist. ZeroDivisionError happens when you divide by zero. KeyError happens when you access a dictionary key that does not exist. Catching specific errors lets you handle each case appropriately.

The else clause runs if no error occurred. The finally clause always runs — whether an error occurred or not. Use finally for cleanup code like closing files or database connections.

You can raise your own errors using the raise keyword. This lets you enforce rules in your code — raise ValueError("Score must be between 0 and 100") if the user enters 150.

The Exception class is the base class for all errors. Catching Exception catches everything — useful as a last resort but avoid using it for everything because it hides bugs.

Good error handling does not just catch errors — it gives users helpful messages and recovers when possible. A payment system that catches a network error and retries automatically is much better than one that just crashes.

Real use case: validating user input before processing, retrying a network request that failed, showing a friendly error message when a file is missing, logging errors for debugging without crashing the program.`,
        keyConcepts: [
          { code: "try: ... except:", description: "attempts risky code and catches errors" },
          { code: "except ValueError:", description: "catches only ValueError type errors" },
          { code: "except Exception as e:", description: "catches any error and stores it in e" },
          { code: "else:", description: "runs if no error occurred in the try block" },
          { code: "finally:", description: "always runs regardless of whether error occurred" },
          { code: "raise ValueError('message')", description: "raises a custom error with a message" },
        ],
        exerciseDescription: "Build a robust student grade input system that handles all possible errors. Validate that the score is a number between 0 and 100. Handle the case where a file does not exist. Use specific exception types for each error. Give the user clear feedback on what went wrong.",
        hint: "Chain multiple except blocks to handle different error types differently: except ValueError: for wrong type, except FileNotFoundError: for missing files.",
        exercise: `# Error Handling — Robust Grade System

def validate_score(score_str):
    """Validate and convert a score string to an integer."""
    try:
        score = int(score_str)
        if score < 0 or score > 100:
            raise ValueError(f"Score must be between 0 and 100, got {score}")
        return score
    except ValueError as e:
        raise ValueError(f"Invalid score: {e}")


def get_grade(score):
    """Convert score to letter grade."""
    if score >= 80: return "A"
    elif score >= 70: return "B"
    elif score >= 60: return "C"
    elif score >= 50: return "D"
    else: return "F"


def read_grades_file(filename):
    """Read grades from file, handle missing file gracefully."""
    try:
        with open(filename, "r") as f:
            return f.readlines()
    except FileNotFoundError:
        print(f"File '{filename}' not found. Starting with empty records.")
        return []


def process_student(name, score_str):
    """Process one student record with full error handling."""
    try:
        score = validate_score(score_str)
        grade = get_grade(score)
        print(f"  {name}: {score}% = Grade {grade}")
        return {"name": name, "score": score, "grade": grade}
    except ValueError as e:
        print(f"  ERROR for {name}: {e}")
        return None
    except Exception as e:
        print(f"  UNEXPECTED ERROR for {name}: {e}")
        return None


# Test with various inputs
print("Processing student grades:")
print("-" * 35)

test_data = [
    ("Kofi Mensah", "82"),
    ("Abena Asante", "hello"),   # Invalid — not a number
    ("Kwame Boateng", "150"),    # Invalid — out of range
    ("Efua Owusu", "75"),
    ("Yaw Darko", "-5"),         # Invalid — negative
]

results = []
for name, score_str in test_data:
    result = process_student(name, score_str)
    if result:
        results.append(result)

print(f"\\nValid records processed: {len(results)}/{len(test_data)}")

# Try to read a file that doesn't exist
print("\\nReading from file:")
lines = read_grades_file("missing_file.txt")
print(f"Lines read: {len(lines)}")

# Division with error handling
print("\\nSafe division:")
try:
    result = 100 / 0
except ZeroDivisionError:
    print("Cannot divide by zero — using 0 as default")
    result = 0
finally:
    print(f"Result: {result}")`,
        quiz: [
          { q: "What happens if an error occurs in a try block?", options: ["The program crashes", "Python jumps to the except block", "The error is ignored", "Python restarts"], answer: 1 },
          { q: "What does the finally block do?", options: ["Runs only if no error occurred", "Runs only if an error occurred", "Always runs regardless of errors", "Catches the error"], answer: 2 },
          { q: "Which error type occurs when you try int('hello')?", options: ["TypeError", "KeyError", "ValueError", "SyntaxError"], answer: 2 },
          { q: "How do you raise a custom error in Python?", options: ["throw ValueError('message')", "raise ValueError('message')", "error ValueError('message')", "trigger ValueError('message')"], answer: 1 },
        ],
      },
    },
    {
      order: 14,
      title: "Modules and Imports",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `A module is a Python file containing functions, classes, and variables that you can reuse in other programs. Instead of writing the same utility functions in every project, you put them in a module and import them wherever needed.

Python comes with a huge standard library of built-in modules. You have already used some without realising — when you write import os or import math, you are importing modules from the standard library.

The import statement loads a module. You then access its contents using dot notation — math.pi, os.getcwd(). The from keyword imports specific things directly — from math import pi lets you use pi without the math prefix.

import as lets you give a module an alias — import datetime as dt makes the module available as dt. This is common for modules with long names.

The math module provides mathematical functions — sqrt, floor, ceil, pow, log. The random module generates random numbers and makes random choices. The datetime module handles dates and times. The os module interacts with the operating system — files, directories, environment variables. The json module reads and writes JSON data.

You can also create your own modules. Any Python file is a module. If you have a file called helpers.py with useful functions, you import it with import helpers in another file in the same directory.

The if __name__ == "__main__" pattern is important. Code inside this block only runs when the file is executed directly, not when it is imported as a module. This lets the same file work both as a standalone script and as an importable module.

Third-party modules are installed with pip — Python's package manager. When you install requests or pandas or flask, pip downloads them from PyPI and makes them importable.`,
        keyConcepts: [
          { code: "import math", description: "imports the entire math module" },
          { code: "from math import sqrt", description: "imports only sqrt from math" },
          { code: "import datetime as dt", description: "imports with an alias" },
          { code: "math.pi", description: "accesses pi from the math module" },
          { code: "if __name__ == '__main__':", description: "runs only when file is executed directly" },
          { code: "pip install requests", description: "installs a third-party module" },
        ],
        exerciseDescription: "Explore Python's standard library modules. Use math for calculations, random for generating test data, datetime for timestamps, and os for system information. Build a student report generator that uses all four modules.",
        hint: "datetime.datetime.now() gives the current date and time. Format it with .strftime('%d %B %Y') for a readable date like '30 May 2024'.",
        exercise: `# Modules and Imports

import math
import random
import datetime
import os

print("=" * 50)
print("   PYTHON STANDARD LIBRARY DEMO")
print("=" * 50)

# ── math module ──
print("\\n📐 Math Module:")
print(f"  Pi: {math.pi:.4f}")
print(f"  Square root of 144: {math.sqrt(144)}")
print(f"  Ceiling of 4.3: {math.ceil(4.3)}")
print(f"  Floor of 4.9: {math.floor(4.9)}")
print(f"  2 to the power 10: {math.pow(2, 10):.0f}")

# Calculate GPA using math
scores = [82, 75, 91, 68, 88]
average = sum(scores) / len(scores)
print(f"  Average score: {math.floor(average * 10) / 10}%")

# ── random module ──
print("\\n🎲 Random Module:")
print(f"  Random number 1-100: {random.randint(1, 100)}")
print(f"  Random choice: {random.choice(['Kofi', 'Abena', 'Kwame', 'Efua'])}")

# Generate random test scores
random_scores = [random.randint(50, 100) for _ in range(5)]
print(f"  Random test scores: {random_scores}")

# Shuffle a list
students = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
random.shuffle(students)
print(f"  Shuffled order: {students}")

# ── datetime module ──
print("\\n📅 Datetime Module:")
now = datetime.datetime.now()
print(f"  Current date: {now.strftime('%d %B %Y')}")
print(f"  Current time: {now.strftime('%H:%M:%S')}")

# Calculate days until end of year
end_of_year = datetime.datetime(now.year, 12, 31)
days_left = (end_of_year - now).days
print(f"  Days until end of year: {days_left}")

# ── os module ──
print("\\n💻 OS Module:")
print(f"  Current directory: {os.getcwd()}")
print(f"  Operating system: {os.name}")

# Check if a file exists
print(f"  grades.txt exists: {os.path.exists('grades.txt')}")

print("\\n" + "=" * 50)`,
        quiz: [
          { q: "What does 'from math import sqrt' do?", options: ["Imports the entire math module", "Imports only the sqrt function", "Creates a new function called sqrt", "Installs the math module"], answer: 1 },
          { q: "What is pip used for?", options: ["Writing Python code", "Running Python files", "Installing third-party modules", "Debugging Python errors"], answer: 2 },
          { q: "What does 'import datetime as dt' do?", options: ["Renames the datetime module to dt", "Imports only the dt function", "Creates a new module", "Deletes the datetime module"], answer: 0 },
          { q: "When does code inside 'if __name__ == __main__' run?", options: ["Always", "Only when imported", "Only when file is executed directly", "Never"], answer: 2 },
        ],
      },
    },
    {
      order: 15,
      title: "List Comprehensions and Lambda",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `List comprehensions are a concise way to create lists in Python. Instead of writing a for loop with append, you write the entire thing in one line inside square brackets. They are faster, cleaner, and more Pythonic.

The basic structure is: new_list = [expression for item in iterable]. You can add a condition: [expression for item in iterable if condition]. This filters items while transforming them.

Dictionary comprehensions work the same way but with curly braces and key-value pairs: {key: value for item in iterable}.

Set comprehensions use curly braces without the colon: {expression for item in iterable}. They automatically remove duplicates.

Generator expressions look like list comprehensions but with parentheses instead of brackets. They do not build the entire list in memory at once — they generate values one at a time. This is essential for large datasets.

Lambda functions are small anonymous functions defined in one line. lambda x: x * 2 creates a function that doubles its input. They are most useful when you need a simple function as an argument to another function.

The sorted() function takes a key parameter where you pass a function to determine sort order. sorted(students, key=lambda s: s['gpa']) sorts students by GPA. The max() and min() functions also accept a key parameter.

The map() function applies a function to every item in an iterable. filter() keeps only items where the function returns True. These are less common now that list comprehensions exist, but you will see them in older Python code.

Real use case: extracting all student names from a list of records, filtering passing students, calculating a list of grades from raw scores, building a lookup dictionary from a list.`,
        keyConcepts: [
          { code: "[x*2 for x in numbers]", description: "list comprehension — doubles each number" },
          { code: "[x for x in list if x > 0]", description: "filtered list comprehension" },
          { code: "{k: v for k, v in dict.items()}", description: "dictionary comprehension" },
          { code: "lambda x: x * 2", description: "anonymous function that doubles its input" },
          { code: "sorted(list, key=lambda x: x['score'])", description: "sorts by a specific field" },
          { code: "map(func, list)", description: "applies a function to every item" },
        ],
        exerciseDescription: "Use list comprehensions and lambda functions to process student data efficiently. Extract names, filter by grade, transform scores, sort by GPA, and build a lookup dictionary. Write each operation in one line using comprehensions.",
        hint: "For nested data: [student['name'] for student in students] extracts the name field from each student dictionary in the list.",
        exercise: `# List Comprehensions and Lambda

students = [
    {"name": "Kofi Mensah", "score": 82, "course": "CS"},
    {"name": "Abena Asante", "score": 91, "course": "CS"},
    {"name": "Kwame Boateng", "score": 65, "course": "EE"},
    {"name": "Efua Owusu", "score": 48, "course": "CS"},
    {"name": "Yaw Darko", "score": 88, "course": "EE"},
    {"name": "Akosua Frimpong", "score": 73, "course": "CS"},
]

# ── List comprehensions ──

# Extract all names
names = [s["name"] for s in students]
print(f"All students: {names}")

# Filter passing students (score >= 50)
passing = [s["name"] for s in students if s["score"] >= 50]
print(f"\\nPassing: {passing}")

# Transform scores to letter grades
grades = [
    "A" if s["score"] >= 80 else
    "B" if s["score"] >= 70 else
    "C" if s["score"] >= 60 else
    "F"
    for s in students
]
print(f"\\nGrades: {grades}")

# CS students only
cs_students = [s["name"] for s in students if s["course"] == "CS"]
print(f"\\nCS students: {cs_students}")

# ── Dictionary comprehension ──
score_lookup = {s["name"]: s["score"] for s in students}
print(f"\\nScore lookup:")
for name, score in score_lookup.items():
    print(f"  {name}: {score}%")

# ── Lambda with sorted ──
by_score = sorted(students, key=lambda s: s["score"], reverse=True)
print(f"\\nRanked by score:")
for i, s in enumerate(by_score, 1):
    print(f"  {i}. {s['name']} — {s['score']}%")

# ── Lambda with filter and map ──
scores = [s["score"] for s in students]
passing_scores = list(filter(lambda x: x >= 50, scores))
doubled = list(map(lambda x: x * 2, [1, 2, 3, 4, 5]))

print(f"\\nPassing scores: {passing_scores}")
print(f"Doubled [1-5]: {doubled}")
print(f"Average: {sum(scores)/len(scores):.1f}%")`,
        quiz: [
          { q: "What does [x*2 for x in [1,2,3]] produce?", options: ["[1, 2, 3]", "[2, 4, 6]", "6", "[x*2, x*2, x*2]"], answer: 1 },
          { q: "How do you add a filter to a list comprehension?", options: ["[x if condition for x in list]", "[x for x in list if condition]", "[x for x if condition in list]", "[if condition x for x in list]"], answer: 1 },
          { q: "What is a lambda function?", options: ["A built-in Python function", "A small anonymous function defined in one line", "A type of loop", "A module import"], answer: 1 },
          { q: "What does sorted(list, key=lambda x: x['score']) do?", options: ["Filters by score", "Sorts the list by the score field", "Finds the maximum score", "Groups by score"], answer: 1 },
        ],
      },
    },
    {
      order: 16,
      title: "Object-Oriented Programming",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `Object-oriented programming — OOP — is a way of organising code around objects that combine data and behaviour. An object is an instance of a class. A class is a blueprint that defines what data an object holds and what actions it can perform.

You define a class using the class keyword. The __init__ method is the constructor — it runs automatically when you create a new object and sets up its initial state. The first parameter of every method is self — it refers to the specific object the method is being called on.

Attributes are the data stored on an object — self.name, self.score. Methods are the functions that belong to the class. They always take self as the first argument.

Encapsulation means keeping an object's internal data and methods together. You interact with objects through their public interface — their methods — without needing to know how they work internally.

Inheritance lets one class inherit attributes and methods from another. A Student class might inherit from a Person class, getting the name and age attributes for free while adding student-specific attributes like gpa and course. The child class calls super().__init__() to run the parent's constructor.

The __str__ method defines what appears when you print an object. Without it, printing an object shows something like Student object at 0x7f1234. With it, you control the output.

Class methods and static methods are variations. A class method receives the class itself as the first argument instead of an instance. A static method receives neither — it is just a regular function that lives inside the class for organisational purposes.

OOP makes large programs manageable. Instead of hundreds of loose functions and variables, you have organised objects with clear responsibilities. Django, Flask, and most major Python frameworks are built around classes.`,
        keyConcepts: [
          { code: "class Student:", description: "defines a new class called Student" },
          { code: "def __init__(self, name):", description: "constructor — runs when object is created" },
          { code: "self.name = name", description: "stores name as an attribute on the object" },
          { code: "student = Student('Kofi')", description: "creates a new Student object" },
          { code: "def __str__(self):", description: "defines how the object prints" },
          { code: "class CS(Student):", description: "CS inherits from Student" },
        ],
        exerciseDescription: "Build a Student management system using OOP. Create a Student class with attributes and methods. Add a GradeBook class that stores students and calculates statistics. Use inheritance to create a CSStudent class with extra attributes. Print formatted reports.",
        hint: "When creating an inherited class, call super().__init__() first to run the parent class constructor before adding your own attributes.",
        exercise: `# Object-Oriented Programming — Student System

class Student:
    """Represents a university student."""

    university = "University of Ghana"  # Class attribute

    def __init__(self, name, age, course, gpa=0.0):
        """Constructor — runs when Student is created."""
        self.name = name
        self.age = age
        self.course = course
        self.gpa = gpa
        self.scores = []

    def add_score(self, subject, score):
        """Add a subject score."""
        self.scores.append({"subject": subject, "score": score})
        self._update_gpa()

    def _update_gpa(self):
        """Private method — updates GPA from scores."""
        if self.scores:
            avg = sum(s["score"] for s in self.scores) / len(self.scores)
            self.gpa = round(avg / 25, 2)  # Convert to 4.0 scale

    def get_classification(self):
        """Returns degree classification."""
        if self.gpa >= 3.6: return "First Class"
        elif self.gpa >= 3.0: return "Second Class Upper"
        elif self.gpa >= 2.5: return "Second Class Lower"
        else: return "Third Class"

    def __str__(self):
        return f"{self.name} ({self.course}) — GPA: {self.gpa}"


class CSStudent(Student):
    """Computer Science student — inherits from Student."""

    def __init__(self, name, age, gpa=0.0, specialisation="General"):
        super().__init__(name, age, "Computer Science", gpa)
        self.specialisation = specialisation
        self.projects = []

    def add_project(self, project_name):
        """Add a completed project."""
        self.projects.append(project_name)
        print(f"  Project added: {project_name}")

    def __str__(self):
        return f"{self.name} (CS — {self.specialisation}) — GPA: {self.gpa}"


class GradeBook:
    """Manages a collection of students."""

    def __init__(self, course_name):
        self.course_name = course_name
        self.students = []

    def add_student(self, student):
        self.students.append(student)

    def top_student(self):
        return max(self.students, key=lambda s: s.gpa)

    def class_average(self):
        if not self.students: return 0
        return sum(s.gpa for s in self.students) / len(self.students)

    def print_report(self):
        print(f"\\n{'='*45}")
        print(f"  {self.course_name} — Grade Report")
        print(f"{'='*45}")
        for i, student in enumerate(self.students, 1):
            print(f"  {i}. {student}")
            print(f"     Classification: {student.get_classification()}")
        print(f"{'='*45}")
        print(f"  Class Average GPA: {self.class_average():.2f}")
        print(f"  Top Student: {self.top_student().name}")


# ── Create students ──
kofi = Student("Kofi Mensah", 20, "Engineering", 3.5)
abena = CSStudent("Abena Asante", 19, specialisation="AI")
abena.gpa = 3.85

# Add scores
kofi.add_score("Maths", 82)
kofi.add_score("Physics", 78)

# CS student projects
abena.add_project("Student Grade Tracker")
abena.add_project("Weather API App")

# ── GradeBook ──
gradebook = GradeBook("UGCS 101 — Intro to Programming")
gradebook.add_student(kofi)
gradebook.add_student(abena)
gradebook.add_student(Student("Kwame Boateng", 21, "Mathematics", 3.1))

gradebook.print_report()

# Print individual objects
print(f"\\nStudent: {kofi}")
print(f"CS Student: {abena}")
print(f"Projects: {abena.projects}")`,
        quiz: [
          { q: "What is a class in Python?", options: ["A function that returns data", "A blueprint for creating objects", "A type of loop", "A module"], answer: 1 },
          { q: "What does __init__ do?", options: ["Deletes the object", "Imports a module", "Runs when the object is created and sets initial state", "Defines the class name"], answer: 2 },
          { q: "What does self refer to in a method?", options: ["The class itself", "The parent class", "The specific object the method is called on", "The first argument passed"], answer: 2 },
          { q: "What is inheritance in OOP?", options: ["Copying code between files", "One class getting attributes and methods from another", "Sharing variables between functions", "Importing a module"], answer: 1 },
        ],
      },
    },
    {
      order: 17,
      title: "Working with APIs",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `An API — Application Programming Interface — lets your program communicate with other software over the internet. When you check the weather on your phone, the app calls a weather API. When you pay with mobile money, a payment API processes the transaction. APIs are how modern software works.

Most APIs use HTTP — the same protocol your browser uses. Your program sends a request to a URL and gets back data, usually in JSON format.

The requests library is the standard Python tool for making HTTP requests. You install it with pip install requests. Then import requests and call requests.get(url) to fetch data from a URL.

The response object has several important attributes. response.status_code tells you if the request succeeded — 200 means OK, 404 means not found, 500 means server error. response.json() converts the response body from JSON text into a Python dictionary automatically.

API keys are how services identify and authenticate your program. You include them as query parameters or headers. Never put API keys in code you share publicly — use environment variables instead.

Query parameters customise your request. They go after a question mark in the URL. requests.get(url, params={"city": "Accra", "units": "metric"}) appends those as query parameters automatically.

Error handling is essential with APIs. Networks fail, rate limits get hit, APIs change. Always check the status code before processing the response. Wrap API calls in try-except to handle network errors.

In this lesson you will work with a free API that requires no key — the RestCountries API — to fetch data about Ghana and other countries. In the exercises beyond this lesson, you will build a currency converter and weather app using real APIs.`,
        keyConcepts: [
          { code: "import requests", description: "imports the requests library for HTTP calls" },
          { code: "requests.get(url)", description: "sends a GET request to a URL" },
          { code: "response.status_code", description: "200 means OK, 404 means not found" },
          { code: "response.json()", description: "converts JSON response to Python dictionary" },
          { code: "params={'key': 'value'}", description: "adds query parameters to the request" },
          { code: "response.raise_for_status()", description: "raises error if request failed" },
        ],
        exerciseDescription: "Fetch data about Ghana and other African countries from the RestCountries API. Display population, capital, currency, and languages. Handle errors gracefully. Compare Ghana with two neighbouring countries.",
        hint: "The RestCountries API is free with no key: https://restcountries.com/v3.1/name/ghana — try fetching it in your browser first to see the response structure.",
        exercise: `# Working with APIs — RestCountries API
# This uses a free API with no key required

import json

# Since we can't make real HTTP requests in this sandbox,
# we simulate the API response with real data from restcountries.com

ghana_data = {
    "name": {"common": "Ghana", "official": "Republic of Ghana"},
    "capital": ["Accra"],
    "population": 33475870,
    "area": 238533,
    "currencies": {"GHS": {"name": "Ghanaian cedi", "symbol": "GH₵"}},
    "languages": {"aka": "Akan", "eng": "English"},
    "region": "Africa",
    "subregion": "Western Africa",
    "flags": {"alt": "Flag of Ghana"}
}

nigeria_data = {
    "name": {"common": "Nigeria", "official": "Federal Republic of Nigeria"},
    "capital": ["Abuja"],
    "population": 218541212,
    "area": 923768,
    "currencies": {"NGN": {"name": "Nigerian naira", "symbol": "₦"}},
    "languages": {"eng": "English"},
    "region": "Africa",
    "subregion": "Western Africa",
}

def display_country(data):
    """Display formatted country information."""
    name = data["name"]["common"]
    capital = data["capital"][0] if data["capital"] else "N/A"
    population = data["population"]
    area = data["area"]

    # Get currency
    currencies = data.get("currencies", {})
    currency_list = [f"{v['name']} ({v['symbol']})" for v in currencies.values()]
    currency = ", ".join(currency_list)

    # Get languages
    languages = list(data.get("languages", {}).values())

    print(f"\\n{'='*40}")
    print(f"  {name}")
    print(f"{'='*40}")
    print(f"  Capital:    {capital}")
    print(f"  Population: {population:,}")
    print(f"  Area:       {area:,} km²")
    print(f"  Currency:   {currency}")
    print(f"  Languages:  {', '.join(languages)}")
    print(f"  Region:     {data['region']} — {data['subregion']}")

# Display both countries
display_country(ghana_data)
display_country(nigeria_data)

# Compare
print(f"\\n{'='*40}")
print("  COMPARISON")
print(f"{'='*40}")
pop_ratio = nigeria_data["population"] / ghana_data["population"]
area_ratio = nigeria_data["area"] / ghana_data["area"]
print(f"  Nigeria population is {pop_ratio:.1f}x larger than Ghana")
print(f"  Nigeria area is {area_ratio:.1f}x larger than Ghana")

# Simulate what a real API call would look like
print(f"\\n--- Real API call would be: ---")
print("import requests")
print("url = 'https://restcountries.com/v3.1/name/ghana'")
print("response = requests.get(url)")
print("if response.status_code == 200:")
print("    data = response.json()[0]")
print("    print(data['name']['common'])")`,
        quiz: [
          { q: "What does response.json() do?", options: ["Saves the response to a file", "Converts JSON text to a Python dictionary", "Sends JSON data to the server", "Formats the response as HTML"], answer: 1 },
          { q: "What does status code 200 mean?", options: ["Not found", "Server error", "Request successful", "Unauthorized"], answer: 2 },
          { q: "How do you add query parameters with requests?", options: ["requests.get(url + params)", "requests.get(url, params=dict)", "requests.params(url, dict)", "requests.get(url, query=dict)"], answer: 1 },
          { q: "Why should API keys not be in shared code?", options: ["They make code slower", "They are confidential and could be misused by others", "They are too long", "APIs work without them"], answer: 1 },
        ],
      },
    },
    {
      order: 18,
      title: "Building a Complete Python App",
      xpValue: 75,
      isFree: true,
      content: {
        language: "python",
        concept: `You have now learned all the core Python concepts needed to build real applications. Variables, strings, numbers, input, conditions, loops, functions, lists, dictionaries, file handling, error handling, modules, OOP, and APIs. This lesson brings everything together.

A complete Python application is more than a script. It has a clear structure — data, logic, and presentation separated. It handles errors gracefully. It gives users clear feedback. It saves data so it persists between runs.

The pattern of building a menu-driven CLI application is a classic Python exercise that demonstrates all these concepts. The user sees a menu, makes a choice, the program responds, and the loop continues until they quit.

Good Python code follows PEP 8 — Python's style guide. Functions are lowercase with underscores. Classes are CamelCase. Constants are UPPERCASE. Lines are under 79 characters. There is one blank line between functions and two blank lines between classes.

Separation of concerns means each function does one thing. A function that validates input should not also save to file. A function that displays results should not also calculate them. This makes code testable, debuggable, and reusable.

This is your final free lesson in the Python Fundamentals track. After this, lessons 19-30 continue with advanced Python — working with databases, building Flask web apps, automation scripts, data analysis, and deploying Python applications. Those lessons require a Pro subscription.

The project for this track is a Student Grade Management System — a complete CLI application that lets you add students, record grades, view reports, and save data to a file. Everything you have learned comes together in one real, working program.`,
        keyConcepts: [
          { code: "main() function", description: "entry point that orchestrates the whole program" },
          { code: "separation of concerns", description: "each function does exactly one thing" },
          { code: "PEP 8", description: "Python's official style guide for readable code" },
          { code: "CLI menu", description: "text-based interface with numbered options" },
          { code: "data persistence", description: "saving data to files so it survives restarts" },
        ],
        exerciseDescription: "Build a complete Student Grade Management System. The app should let you add students, record their scores, view a class report, find the top student, and save everything to a file. Structure the code with clear functions and proper error handling throughout.",
        hint: "Start with the data structure and helper functions, then build the display functions, then wire it all together in main(). Build bottom-up.",
        exercise: `# Complete Python App — Student Grade Manager
# Bringing everything together

import json
import os
from datetime import datetime

# ── Data Management ──

def load_data(filename="students.json"):
    """Load student data from file."""
    if os.path.exists(filename):
        try:
            with open(filename, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []


def save_data(students, filename="students.json"):
    """Save student data to file."""
    try:
        with open(filename, "w") as f:
            json.dump(students, f, indent=2)
        return True
    except IOError as e:
        print(f"Error saving: {e}")
        return False


# ── Student Logic ──

def add_student(students, name, scores):
    """Add a new student record."""
    if any(s["name"].lower() == name.lower() for s in students):
        return False, "Student already exists"

    student = {
        "name": name,
        "scores": scores,
        "added": datetime.now().strftime("%Y-%m-%d"),
    }
    students.append(student)
    return True, student


def get_average(scores):
    """Calculate average score."""
    return sum(scores) / len(scores) if scores else 0


def get_grade(average):
    """Convert average to grade."""
    if average >= 80: return "A", "First Class"
    elif average >= 70: return "B", "Second Class Upper"
    elif average >= 60: return "C", "Second Class Lower"
    elif average >= 50: return "D", "Pass"
    else: return "F", "Fail"


# ── Display ──

def print_report(students):
    """Print full class report."""
    if not students:
        print("No students registered.")
        return

    print(f"\\n{'='*55}")
    print(f"  STUDENT GRADE REPORT — {datetime.now().strftime('%d %B %Y')}")
    print(f"{'='*55}")
    print(f"  {'Name':<20} {'Avg':>6} {'Grade':>6}  Classification")
    print(f"  {'-'*50}")

    all_avgs = []
    for s in sorted(students, key=lambda x: get_average(x["scores"]), reverse=True):
        avg = get_average(s["scores"])
        all_avgs.append(avg)
        grade, classification = get_grade(avg)
        print(f"  {s['name']:<20} {avg:>5.1f}%  {grade:>5}   {classification}")

    print(f"  {'='*50}")
    if all_avgs:
        print(f"  Class average: {sum(all_avgs)/len(all_avgs):.1f}%")
        top = max(students, key=lambda x: get_average(x["scores"]))
        print(f"  Top student:   {top['name']} ({get_average(top['scores']):.1f}%)")
    print(f"  Total students: {len(students)}")


# ── Main Program ──

def main():
    print("=" * 45)
    print("  Student Grade Management System")
    print("  CodePath Python Project")
    print("=" * 45)

    # Load existing data
    students = load_data()
    print(f"Loaded {len(students)} existing student(s).\\n")

    # Add sample students for demo
    sample = [
        ("Kofi Mensah", [82, 75, 88, 91]),
        ("Abena Asante", [91, 88, 95, 87]),
        ("Kwame Boateng", [65, 72, 68, 70]),
        ("Efua Owusu", [48, 52, 55, 50]),
        ("Yaw Darko", [88, 85, 90, 87]),
    ]

    for name, scores in sample:
        success, result = add_student(students, name, scores)
        if success:
            avg = get_average(scores)
            grade, _ = get_grade(avg)
            print(f"Added: {name} — avg {avg:.1f}% (Grade {grade})")
        else:
            print(f"Skipped: {name} — {result}")

    # Display full report
    print_report(students)

    # Save
    if save_data(students):
        print(f"\\nData saved successfully.")

    # Cleanup demo file
    if os.path.exists("students.json"):
        os.remove("students.json")


main()`,
        quiz: [
          { q: "What is separation of concerns in programming?", options: ["Separating CSS from HTML", "Each function does exactly one thing", "Using multiple files", "Keeping variables private"], answer: 1 },
          { q: "What is PEP 8?", options: ["A Python error code", "Python's official style guide for readable code", "A Python module", "A version of Python"], answer: 1 },
          { q: "What is a CLI application?", options: ["A web application", "A mobile app", "A command-line text-based interface", "A cloud application"], answer: 2 },
          { q: "What is data persistence?", options: ["Making data load faster", "Saving data so it survives between program runs", "Encrypting data", "Sharing data between users"], answer: 1 },
        ],
      },
    },
  ];

  await prisma.lesson.deleteMany({
    where: {
      trackId: track.id,
      order: { in: lessons.map(l => l.order) }
    }
  });

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: { ...lesson, trackId: track.id },
    });
    console.log(`✅ Lesson ${lesson.order}: ${lesson.title}`);
  }

  console.log("🎉 Python lessons 11-18 seeded!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });