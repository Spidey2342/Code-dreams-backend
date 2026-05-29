const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Python track...");

  const track = await prisma.track.upsert({
    where: { slug: "python-fundamentals" },
    update: {},
    create: {
      name: "Python Fundamentals",
      slug: "python-fundamentals",
      description: "Learn Python from scratch. Variables, loops, functions, and real projects built for Ghana.",
      color: "#3776AB",
      icon: "🐍",
      isLocked: false,
      order: 2,
    },
  });

  console.log("✅ Track created:", track.name);

  const lessons = [
    {
      order: 1,
      title: "What is Python and Why Learn It",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `Python is one of the most popular programming languages in the world. It is used by companies like Google, Instagram, Netflix, and NASA. In Ghana and across Africa, Python developers are among the most in-demand and highest-paid tech workers.

Unlike HTML and CSS which only work in browsers, Python is a general-purpose language. You can use it to build websites, analyse data, automate repetitive tasks, create AI models, and build desktop applications.

Python was designed to be readable. It looks almost like plain English, which makes it easier to learn than many other languages. Where other languages use lots of symbols and brackets, Python uses indentation — spaces at the start of lines — to structure code.

Here is what makes Python special for beginners: you can write a working program in one line. You do not need to set up complex project structures or understand compilers. You write code, run it, and see the result immediately.

In this track you will learn Python through real Ghanaian examples. You will build a calculator, a grade tracker, a currency converter, and more. By the end, you will have the skills to automate tasks, work with data, or build web applications with Flask.

Python runs everywhere — on your laptop, on servers, in the cloud. The code you write here will work anywhere Python is installed.`,
        keyConcepts: [
          { code: "print()", description: "outputs text or values to the terminal" },
          { code: "# comment", description: "lines starting with # are ignored by Python" },
          { code: "indentation", description: "Python uses spaces to structure code blocks" },
          { code: "interpreter", description: "Python reads and runs your code line by line" },
        ],
        exerciseDescription: "Write your first Python program. Use print() to display a greeting with your name. Then print your university and your goal for learning Python. Run the code to see the output in the terminal.",
        hint: "print() takes text inside quotes. Try: print('Hello, my name is Kofi')",
        exercise: `# Welcome to Python!
# The print() function displays output in the terminal

# Step 1: Print a greeting with your name
print("Hello, my name is Kofi Mensah")

# Step 2: Print your university
print("I study at University of Ghana")

# Step 3: Print your goal
print("I am learning Python to build real projects")

# Try changing the text above and click RUN to see the output
# Everything after a # symbol is a comment — Python ignores it`,
        quiz: [
          { q: "Which function displays output in Python?", options: ["show()", "display()", "print()", "output()"], answer: 2 },
          { q: "What symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
          { q: "What makes Python different from HTML?", options: ["Python only works in browsers", "Python is a general-purpose language that runs anywhere", "Python cannot display text", "Python requires a special editor"], answer: 1 },
          { q: "How does Python structure code blocks?", options: ["With curly braces", "With square brackets", "With indentation", "With semicolons"], answer: 2 },
        ],
      },
    },
    {
      order: 2,
      title: "Variables and Data Types",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `A variable is a named container that stores a value. Think of it like a labelled box — you put something inside, give it a name, and you can use that name to get the value back later.

In Python, you create a variable by writing the name, then an equals sign, then the value. There is no keyword needed like in some other languages. Python figures out the type automatically.

Python has several data types. Strings are text — always wrapped in quotes, either single or double. Integers are whole numbers with no decimal point. Floats are numbers with decimal points. Booleans are True or False — exactly as written, with a capital letter.

Variable names in Python follow rules. They can contain letters, numbers, and underscores. They cannot start with a number. They are case-sensitive — name and Name are two different variables. By convention, Python variable names use lowercase with underscores between words.

You can check what type a variable is using the type() function. This is useful when debugging — when your code is not doing what you expect, checking types often reveals the problem.

Variables can be reassigned — you can change their value at any time. The variable takes on the new value from that point forward.

In Ghana, you might store a student's GPA, a mobile money balance in cedis, or a market stall owner's daily sales as variables. Variables are the building blocks of every program.`,
        keyConcepts: [
          { code: "name = 'Kofi'", description: "string variable — text in quotes" },
          { code: "age = 20", description: "integer variable — whole number" },
          { code: "gpa = 3.7", description: "float variable — decimal number" },
          { code: "is_student = True", description: "boolean variable — True or False" },
          { code: "type(x)", description: "returns the data type of a variable" },
        ],
        exerciseDescription: "Create variables to store information about a University of Ghana student. Store their name, age, GPA, year of study, and whether they are a computer science student. Print each variable with a descriptive label.",
        hint: "Use f-strings for clean output: print(f'Name: {name}') — the f before the quote lets you put variables inside curly braces",
        exercise: `# Variables and Data Types
# Create variables to store student information

# String — text in quotes
name = "Abena Asante"

# Integer — whole number
age = 19

# Float — decimal number
gpa = 3.85

# Integer — year of study
year = 1

# Boolean — True or False
is_cs_student = True

# Print all the information using f-strings
print(f"Name: {name}")
print(f"Age: {age}")
print(f"GPA: {gpa}")
print(f"Year: {year}")
print(f"CS Student: {is_cs_student}")

# Check the types
print(f"Type of name: {type(name)}")
print(f"Type of gpa: {type(gpa)}")

# Try creating your own variables below
# Store your name, age, and your course`,
        quiz: [
          { q: "Which of these is a valid Python variable name?", options: ["1student", "student-name", "student_name", "student name"], answer: 2 },
          { q: "What data type is the value 3.85?", options: ["Integer", "String", "Boolean", "Float"], answer: 3 },
          { q: "How do you write a boolean True in Python?", options: ["true", "TRUE", "True", "'true'"], answer: 2 },
          { q: "What does the type() function do?", options: ["Converts a variable to a string", "Returns the data type of a value", "Creates a new variable", "Prints the variable value"], answer: 1 },
        ],
      },
    },
    {
      order: 3,
      title: "Strings — Working with Text",
      xpValue: 50,
      isFree: true,
      content: {
        language: "python",
        concept: `Strings are how Python handles text. Any time you deal with names, messages, phone numbers stored as text, addresses, or any written content, you are working with strings.

You can create strings with single quotes or double quotes — both work the same way. Use double quotes when your string contains an apostrophe. Use triple quotes for strings that span multiple lines.

String concatenation joins strings together using the plus sign. But the cleaner modern way is f-strings — you put an f before the opening quote and then use curly braces to embed variables directly inside the string. This is much easier to read than concatenation.

Python strings have many built-in methods. upper() converts to uppercase. lower() converts to lowercase. strip() removes whitespace from both ends — useful when processing user input. replace() swaps one piece of text for another. split() breaks a string into a list of parts.

You can access individual characters using indexing. Python starts counting at zero — the first character is index 0, the second is index 1, and so on. Negative indices count from the end — minus one gives you the last character.

The len() function returns the length of a string — how many characters it contains.

Strings are used everywhere in real programs. A mobile money system stores phone numbers as strings. A student portal stores names and course codes as strings. A messaging app stores every message as a string.`,
        keyConcepts: [
          { code: "f'Hello {name}'", description: "f-string — embeds variables directly in text" },
          { code: ".upper()", description: "converts string to all uppercase letters" },
          { code: ".lower()", description: "converts string to all lowercase letters" },
          { code: ".strip()", description: "removes whitespace from start and end" },
          { code: ".split()", description: "breaks string into a list by spaces or a separator" },
          { code: "len(text)", description: "returns the number of characters in a string" },
        ],
        exerciseDescription: "Work with strings to process student information. Create a name variable and practice all the string methods. Use f-strings to build a formatted student ID. Use len() to count characters. Use split() to separate first and last names.",
        hint: "To split a full name: parts = full_name.split() gives you a list, then parts[0] is first name and parts[1] is last name",
        exercise: `# Strings — Working with Text

full_name = "  abena owusu asante  "

# Clean up the name — remove extra spaces and fix capitalisation
clean_name = full_name.strip().title()
print(f"Clean name: {clean_name}")

# Split into parts
parts = clean_name.split()
first_name = parts[0]
last_name = parts[-1]
print(f"First name: {first_name}")
print(f"Last name: {last_name}")

# Build a student ID
student_id = f"UG-{last_name.upper()[:3]}-2024"
print(f"Student ID: {student_id}")

# Count characters
print(f"Full name length: {len(clean_name)}")

# Check if a name contains a letter
print(f"Contains 'Abena': {'Abena' in clean_name}")

# Replace part of a string
phone = "024-000-0000"
formatted_phone = phone.replace("-", " ")
print(f"Phone: {formatted_phone}")`,
        quiz: [
          { q: "What does .strip() do to a string?", options: ["Converts to uppercase", "Removes whitespace from both ends", "Splits into a list", "Counts the characters"], answer: 1 },
          { q: "What is the index of the first character in a Python string?", options: ["1", "-1", "0", "None"], answer: 2 },
          { q: "Which method splits a string into a list?", options: [".divide()", ".break()", ".split()", ".separate()"], answer: 2 },
          { q: "What does f'Hello {name}' do?", options: ["Creates a function called Hello", "Embeds the variable name inside the string", "Converts name to uppercase", "Checks if name exists"], answer: 1 },
        ],
      },
    },
    {
      order: 4,
      title: "Numbers and Maths",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Python is excellent at maths. You can use it as a simple calculator or to perform complex financial calculations. Understanding how Python handles numbers is essential for building any real application.

Python has two numeric types. Integers are whole numbers — positive, negative, or zero. Floats are numbers with decimal points. Python automatically uses the right type for calculations.

The basic arithmetic operators work exactly as you would expect. Addition uses plus, subtraction uses minus, multiplication uses an asterisk, and division uses a forward slash. Division in Python 3 always returns a float — dividing 10 by 2 gives 5.0 not 5.

Two special operators are very useful. The double asterisk is the power operator — 2 to the power of 3 is written as 2 ** 3. The percent sign is the modulo operator — it gives the remainder after division. 10 % 3 gives 1 because 10 divided by 3 is 3 remainder 1. Modulo is used constantly in programming to check if a number is even or odd, or to cycle through a fixed range.

Floor division uses two forward slashes. It divides and rounds down to the nearest whole number, discarding any decimal.

Python follows standard mathematical order of operations — BODMAS or PEMDAS. Use brackets to control the order explicitly.

The round() function rounds a float to a specified number of decimal places. The abs() function returns the absolute value. The max() and min() functions find the largest and smallest values from a set of numbers.

Real use case: calculating a student's weighted GPA, computing VAT on a purchase in Ghana, splitting a restaurant bill among friends.`,
        keyConcepts: [
          { code: "+  -  *  /", description: "addition, subtraction, multiplication, division" },
          { code: "**", description: "power operator — 2 ** 3 equals 8" },
          { code: "%", description: "modulo — remainder after division" },
          { code: "//", description: "floor division — divides and rounds down" },
          { code: "round(x, 2)", description: "rounds x to 2 decimal places" },
          { code: "abs(x)", description: "returns the absolute positive value of x" },
        ],
        exerciseDescription: "Build a student fee calculator for a Ghanaian university. Calculate tuition fees, add a technology levy, compute the VAT, and show the total in cedis. Then calculate what each student owes if they split a group project cost.",
        hint: "VAT in Ghana is 15%. To add VAT: total = amount * 1.15. To calculate VAT only: vat = amount * 0.15",
        exercise: `# Numbers and Maths — Student Fee Calculator

# Base tuition fee in Ghana cedis
tuition = 3500.00
technology_levy = 250.00
library_fee = 80.00

# Total before VAT
subtotal = tuition + technology_levy + library_fee
print(f"Subtotal: GHS {subtotal:.2f}")

# Add 15% VAT
vat_rate = 0.15
vat_amount = subtotal * vat_rate
total = subtotal + vat_amount
print(f"VAT (15%): GHS {vat_amount:.2f}")
print(f"Total: GHS {total:.2f}")

# Split a group project cost among students
project_cost = 450.00
num_students = 4
per_student = project_cost / num_students
print(f"\\nProject cost per student: GHS {per_student:.2f}")

# Check if the number of students is even
print(f"Even number of students: {num_students % 2 == 0}")

# Calculate GPA points
grades = [85, 72, 91, 68, 88]
total_points = sum(grades)
average = total_points / len(grades)
print(f"\\nAverage grade: {round(average, 1)}%")
print(f"Highest grade: {max(grades)}")
print(f"Lowest grade: {min(grades)}")`,
        quiz: [
          { q: "What does the ** operator do in Python?", options: ["Multiply by 2", "Calculate power/exponent", "Floor division", "Modulo"], answer: 1 },
          { q: "What does 10 % 3 return?", options: ["3", "1", "0", "3.33"], answer: 1 },
          { q: "What does 7 // 2 return?", options: ["3.5", "4", "3", "2"], answer: 2 },
          { q: "Which function finds the largest value from a set of numbers?", options: ["largest()", "top()", "max()", "highest()"], answer: 2 },
        ],
      },
    },
    {
      order: 5,
      title: "Getting Input from Users",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `So far your programs have used fixed data that you typed directly into the code. Real programs get data from users — through forms, command lines, APIs, or databases. The simplest way to get user input in Python is the input() function.

The input() function pauses the program, displays a prompt message, and waits for the user to type something and press Enter. Whatever the user types is returned as a string.

This is critical: input() always returns a string, even if the user types a number. If you need to do maths with the input, you must convert it. Use int() to convert to an integer. Use float() to convert to a decimal number. If the user types something that cannot be converted, Python will raise an error — you will learn how to handle that with try and except in a later lesson.

You can convert in one step: age = int(input("Enter your age: ")) reads the input and immediately converts it to an integer.

String formatting with input makes your programs feel professional. A good prompt tells the user exactly what to enter. "Enter your name: " is better than "Name: " which is better than just having no prompt at all.

In a sandboxed environment like this lesson editor, input() is simulated — you will see it used with predefined values. But in a real Python script running on your computer, it pauses and waits for you to type.

Real use case: a mobile money PIN entry, a form asking for a student's matric number, a calculator asking what numbers to add.`,
        keyConcepts: [
          { code: "input('prompt')", description: "pauses program and gets text from the user" },
          { code: "int(input())", description: "converts user input to a whole number" },
          { code: "float(input())", description: "converts user input to a decimal number" },
          { code: "str(number)", description: "converts a number to a string" },
        ],
        exerciseDescription: "Build an interactive student profile creator. The program should collect a student's name, age, GPA, and course. Then display a formatted profile card. Since input is simulated here, the values are preset — study the code structure and modify the preset values.",
        hint: "In this sandbox, replace input() calls with preset variables to test your logic. In a real terminal, input() would pause and wait for you to type.",
        exercise: `# Getting Input from Users
# In a real terminal, these would use input()
# Here we simulate with preset values

# Simulating user input
name = "Kwame Boateng"
age_str = "20"
gpa_str = "3.6"
course = "Computer Science"
year_str = "2"

# Convert string inputs to the right types
age = int(age_str)
gpa = float(gpa_str)
year = int(year_str)

# Display a formatted student profile
print("=" * 40)
print("       STUDENT PROFILE CARD")
print("=" * 40)
print(f"Name:    {name}")
print(f"Age:     {age} years")
print(f"Course:  {course}")
print(f"Year:    Year {year}")
print(f"GPA:     {gpa}/4.0")
print("-" * 40)

# Calculate grade classification
if gpa >= 3.6:
    classification = "First Class"
elif gpa >= 3.0:
    classification = "Second Class Upper"
elif gpa >= 2.5:
    classification = "Second Class Lower"
else:
    classification = "Third Class"

print(f"Class:   {classification}")
print("=" * 40)

# Try changing the preset values above to see different outputs`,
        quiz: [
          { q: "What does input() always return?", options: ["An integer", "A float", "A string", "A boolean"], answer: 2 },
          { q: "How do you convert user input to an integer?", options: ["number(input())", "integer(input())", "int(input())", "convert(input())"], answer: 2 },
          { q: "What happens if you try int('hello')?", options: ["Returns 0", "Returns None", "Raises a ValueError", "Returns 'hello'"], answer: 2 },
          { q: "Which is the best prompt for asking a student's ID?", options: ["?", "Input:", "Enter your student ID number: ", "ID"], answer: 2 },
        ],
      },
    },
    {
      order: 6,
      title: "If Statements — Making Decisions",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Programs need to make decisions. Should this student pass or fail? Is this mobile money balance enough? Does this password meet the requirements? If statements are how Python makes decisions.

The basic structure is: if a condition is true, do something. The condition is any expression that evaluates to True or False. The code to run is indented — this is where Python indentation matters critically. Everything indented under the if runs when the condition is true.

Comparison operators create conditions. Double equals checks equality — single equals is for assignment, double equals is for comparison. Not equals uses an exclamation mark followed by equals. Greater than, less than, greater than or equal to, and less than or equal to work as expected.

The else clause runs when the if condition is false. You can only have one else per if statement and it must come after all elif clauses.

elif stands for else if. It lets you check multiple conditions in sequence. Python checks each condition from top to bottom and runs the first one that is true. Once one runs, the rest are skipped.

Logical operators combine conditions. and requires both conditions to be true. or requires at least one to be true. not reverses a boolean value.

The in operator checks if a value exists in a collection — very useful for checking if something is in a list.

Real use case: checking if a student passes based on their grade, validating that a phone number has the right number of digits, determining which fee bracket a student falls into.`,
        keyConcepts: [
          { code: "if condition:", description: "runs the indented block if condition is True" },
          { code: "elif condition:", description: "checks another condition if previous was False" },
          { code: "else:", description: "runs if all above conditions were False" },
          { code: "== != > < >= <=", description: "comparison operators that return True or False" },
          { code: "and  or  not", description: "logical operators to combine conditions" },
          { code: "in", description: "checks if a value exists in a collection" },
        ],
        exerciseDescription: "Build a student grade classification system for a Ghanaian university. Given a student's percentage score, determine their letter grade, GPA points, and classification. Then check if they qualify for the Dean's List (above 80%) and if they are on academic probation (below 50%).",
        hint: "Remember: Python checks elif conditions only if all previous conditions were False. Order your conditions from highest to lowest score.",
        exercise: `# If Statements — Grade Classification System

# Student information
student_name = "Efua Mensah"
score = 78  # Try changing this to see different results

print(f"Student: {student_name}")
print(f"Score: {score}%")
print("-" * 30)

# Determine letter grade
if score >= 80:
    grade = "A"
    gpa_points = 4.0
    classification = "Distinction"
elif score >= 75:
    grade = "B+"
    gpa_points = 3.5
    classification = "Very Good"
elif score >= 70:
    grade = "B"
    gpa_points = 3.0
    classification = "Good"
elif score >= 65:
    grade = "C+"
    gpa_points = 2.5
    classification = "Credit"
elif score >= 60:
    grade = "C"
    gpa_points = 2.0
    classification = "Pass"
elif score >= 50:
    grade = "D"
    gpa_points = 1.0
    classification = "Marginal Pass"
else:
    grade = "F"
    gpa_points = 0.0
    classification = "Fail"

print(f"Grade: {grade}")
print(f"GPA Points: {gpa_points}")
print(f"Classification: {classification}")

# Special status checks
if score >= 80:
    print("\\n🏆 Qualifies for Dean's List!")

if score < 50:
    print("\\n⚠️  Academic Probation Warning")

if score >= 50 and score < 60:
    print("\\n📚 Consider supplementary exam")

# Check if passing
is_passing = score >= 50
print(f"\\nPassing: {is_passing}")`,
        quiz: [
          { q: "What is the difference between = and == in Python?", options: ["No difference", "= assigns a value, == compares two values", "== assigns, = compares", "Both compare values"], answer: 1 },
          { q: "What does the elif keyword mean?", options: ["End if", "Else if — another condition to check", "Error if", "Equal if"], answer: 1 },
          { q: "What does 'and' do in a condition?", options: ["Either condition must be true", "Both conditions must be true", "Neither condition must be true", "Reverses the condition"], answer: 1 },
          { q: "If score is 65, which condition runs first?", options: ["score >= 80", "score >= 75", "score >= 70", "score >= 65"], answer: 3 },
        ],
      },
    },
    {
      order: 7,
      title: "While Loops",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Loops let you repeat code without copying and pasting it. There are two types of loops in Python — while loops and for loops. This lesson covers while loops.

A while loop keeps running as long as a condition is true. It checks the condition before each iteration. When the condition becomes false, the loop stops and the program continues with the next line after the loop.

The danger with while loops is infinite loops — if the condition never becomes false, the loop runs forever and freezes your program. Always make sure something inside the loop eventually makes the condition false.

The break statement exits a loop immediately, regardless of the condition. The continue statement skips the rest of the current iteration and goes back to check the condition. These give you precise control over loop flow.

A common pattern is using a counter variable that you increment each time through the loop. Another common pattern is keeping a loop running until the user provides valid input — check, reject bad input, ask again.

While loops are perfect when you do not know in advance how many times you need to repeat something. If you know you need to repeat exactly 10 times, a for loop is usually cleaner. But if you are waiting for something to happen — a valid input, a connection to succeed, a file to download — a while loop is the right tool.

Real use case: keeping a mobile money PIN entry loop running until the correct PIN is entered, continuing to process transactions until the balance reaches zero, retrying a network request until it succeeds.`,
        keyConcepts: [
          { code: "while condition:", description: "repeats the indented block while condition is True" },
          { code: "break", description: "exits the loop immediately" },
          { code: "continue", description: "skips to the next iteration" },
          { code: "counter += 1", description: "shorthand for counter = counter + 1" },
          { code: "while True:", description: "runs forever until a break statement is hit" },
        ],
        exerciseDescription: "Build a mobile money PIN verification system. The user gets 3 attempts to enter the correct PIN. Track attempts with a counter. Lock the account after 3 failed attempts. Show remaining attempts after each wrong entry.",
        hint: "Use a counter that starts at 0 and increments each attempt. The loop should run while attempts < 3 AND the PIN is not correct.",
        exercise: `# While Loops — Mobile Money PIN Verification

correct_pin = "1234"
max_attempts = 3
attempts = 0
account_locked = False

# Simulate PIN attempts (in real app, this would use input())
test_pins = ["0000", "9999", "1234"]  # Change these to test different scenarios

print("=== MTN Mobile Money ===")
print("Please enter your PIN")
print("-" * 25)

while attempts < max_attempts:
    # Get the next test PIN (simulating user input)
    entered_pin = test_pins[attempts] if attempts < len(test_pins) else "0000"
    print(f"PIN entered: {'*' * len(entered_pin)}")

    if entered_pin == correct_pin:
        print("\\n✅ PIN correct! Access granted.")
        print("Welcome to your account.")
        break
    else:
        attempts += 1
        remaining = max_attempts - attempts

        if remaining > 0:
            print(f"❌ Wrong PIN. {remaining} attempt(s) remaining.")
        else:
            account_locked = True
            print("\\n🔒 Account locked after 3 failed attempts.")
            print("Please visit the nearest MTN office.")

print(f"\\nTotal attempts used: {attempts}")
print(f"Account locked: {account_locked}")`,
        quiz: [
          { q: "What happens if a while loop condition never becomes False?", options: ["The program skips the loop", "An error is shown", "The loop runs forever (infinite loop)", "Python stops after 100 iterations"], answer: 2 },
          { q: "What does break do inside a loop?", options: ["Pauses the loop", "Skips to next iteration", "Exits the loop completely", "Restarts the loop"], answer: 2 },
          { q: "What does counter += 1 mean?", options: ["counter equals 1", "Add 1 to counter", "counter is greater than 1", "Reset counter to 1"], answer: 1 },
          { q: "When should you use a while loop instead of a for loop?", options: ["When you know exactly how many times to repeat", "When you don't know in advance how many times to repeat", "When you want to loop through a list", "When you never want to loop"], answer: 1 },
        ],
      },
    },
    {
      order: 8,
      title: "For Loops",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `For loops repeat code a specific number of times or over every item in a collection. They are more common than while loops in Python because most repetition tasks involve going through a known set of items.

The most basic for loop uses range(). range(5) generates the numbers 0, 1, 2, 3, 4 — five numbers starting from zero. range(1, 6) generates 1, 2, 3, 4, 5. range(0, 10, 2) generates 0, 2, 4, 6, 8 — stepping by 2.

You can loop over any iterable — strings, lists, tuples, and dictionaries are all iterable. When you loop over a string, you get one character per iteration. When you loop over a list, you get one item per iteration.

The enumerate() function gives you both the index and the value when looping — very useful when you need to know the position of each item. You unpack it with two variables: for i, item in enumerate(my_list).

You can nest loops — a loop inside a loop. The inner loop runs completely for each iteration of the outer loop. Be careful with nested loops as they can be slow with large data sets.

List comprehensions are a compact way to create lists using a for loop in a single line. Instead of building a list with append() in a regular loop, you write the expression and loop on one line inside square brackets.

The continue and break statements work the same as in while loops.

Real use case: printing a class list, calculating the total of a shopping cart, generating a timetable, processing a list of student grades.`,
        keyConcepts: [
          { code: "for i in range(5):", description: "loops 5 times with i going 0, 1, 2, 3, 4" },
          { code: "for item in list:", description: "loops over every item in a list" },
          { code: "enumerate(list)", description: "gives index and value on each iteration" },
          { code: "range(start, stop, step)", description: "generates numbers from start to stop-1" },
          { code: "[x*2 for x in list]", description: "list comprehension — compact loop to build a list" },
        ],
        exerciseDescription: "Process a class of University of Ghana students. Loop through their grades, calculate statistics, identify top students, and generate a formatted result sheet. Use range() to number the students and enumerate() to access both position and value.",
        hint: "To find the average: sum(grades) / len(grades). To loop with position: for i, grade in enumerate(grades, 1) starts counting at 1 instead of 0",
        exercise: `# For Loops — Class Result Processor

students = [
    {"name": "Kofi Mensah", "score": 82},
    {"name": "Abena Asante", "score": 75},
    {"name": "Kwame Boateng", "score": 91},
    {"name": "Efua Owusu", "score": 64},
    {"name": "Yaw Darko", "score": 88},
    {"name": "Akosua Frimpong", "score": 55},
    {"name": "Kojo Adjei", "score": 79},
]

print("=" * 50)
print("        UNIVERSITY OF GHANA")
print("     SEMESTER RESULT SHEET")
print("=" * 50)
print(f"{'No.':<5} {'Name':<20} {'Score':<8} {'Grade':<6}")
print("-" * 50)

# Process each student
total_score = 0
passed = 0
failed = 0

for i, student in enumerate(students, 1):
    name = student["name"]
    score = student["score"]
    total_score += score

    if score >= 70:
        grade = "A/B"
        passed += 1
    elif score >= 50:
        grade = "C/D"
        passed += 1
    else:
        grade = "F"
        failed += 1

    print(f"{i:<5} {name:<20} {score:<8} {grade:<6}")

print("=" * 50)

# Class statistics
average = total_score / len(students)
scores = [s["score"] for s in students]  # List comprehension
print(f"Class Average: {average:.1f}%")
print(f"Highest Score: {max(scores)}%")
print(f"Lowest Score:  {min(scores)}%")
print(f"Passed: {passed} | Failed: {failed}")`,
        quiz: [
          { q: "What numbers does range(3) generate?", options: ["1, 2, 3", "0, 1, 2, 3", "0, 1, 2", "1, 2"], answer: 2 },
          { q: "What does enumerate() give you?", options: ["Only the index", "Only the value", "Both the index and the value", "The length of the list"], answer: 2 },
          { q: "What is a list comprehension?", options: ["A way to delete list items", "A compact loop to build a new list", "A function that sorts lists", "A method to count list items"], answer: 1 },
          { q: "How do you loop over every character in a string?", options: ["for char in string:", "for i in len(string):", "while string:", "loop string:"], answer: 0 },
        ],
      },
    },
    {
      order: 9,
      title: "Functions",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Functions are reusable blocks of code that you define once and can call as many times as you need. They are one of the most important concepts in programming. Without functions, every program would be one giant block of code that is impossible to understand or maintain.

You define a function using the def keyword, followed by the function name, parentheses, and a colon. The indented block below is the function body — the code that runs when you call the function.

Parameters are the inputs a function accepts. When you call the function, you pass arguments — the actual values — for each parameter. A function can have zero, one, or many parameters.

The return statement sends a value back to whoever called the function. If a function has no return statement, it returns None automatically. You can only return one value, but that value can be a list, dictionary, or tuple containing multiple pieces of data.

Default parameters let you give a parameter a default value that is used when no argument is provided. This makes functions more flexible.

Docstrings are strings written immediately after the def line, inside triple quotes. They document what the function does. Good functions always have docstrings — they help you and others understand the code later.

Keep functions small and focused. A function should do one thing and do it well. If a function is doing three different tasks, split it into three functions. This makes code easier to test, debug, and reuse.

Real use case: a function to calculate VAT on any amount, a function to validate a Ghana phone number, a function to format a student's name and ID.`,
        keyConcepts: [
          { code: "def function_name():", description: "defines a new function" },
          { code: "def func(param1, param2):", description: "function with parameters" },
          { code: "return value", description: "sends a value back to the caller" },
          { code: "def func(x=10):", description: "default parameter value" },
          { code: '"""docstring"""', description: "documents what the function does" },
        ],
        exerciseDescription: "Build a collection of utility functions for a Ghanaian student management system. Write functions to calculate VAT, validate phone numbers, compute GPA, and format student IDs. Call each function with different inputs to test it.",
        hint: "A function that returns a value can be used directly in print() or stored in a variable: result = calculate_vat(100) or print(calculate_vat(100))",
        exercise: `# Functions — Student Management Utilities

def calculate_vat(amount, rate=0.15):
    """Calculate VAT on an amount. Default rate is 15% (Ghana standard)."""
    vat = amount * rate
    total = amount + vat
    return vat, total  # Return multiple values as a tuple


def validate_ghana_phone(number):
    """Check if a Ghana phone number is valid (10 digits, starts with 0)."""
    # Remove spaces and dashes
    cleaned = number.replace(" ", "").replace("-", "")
    if len(cleaned) == 10 and cleaned.startswith("0") and cleaned.isdigit():
        return True
    return False


def calculate_gpa(scores):
    """Calculate GPA from a list of percentage scores."""
    if not scores:
        return 0.0
    average = sum(scores) / len(scores)
    if average >= 80: return 4.0
    elif average >= 75: return 3.5
    elif average >= 70: return 3.0
    elif average >= 65: return 2.5
    elif average >= 60: return 2.0
    elif average >= 50: return 1.0
    else: return 0.0


def format_student_id(last_name, year=2024):
    """Generate a student ID from last name and year."""
    prefix = last_name.upper()[:3]
    return f"UG-{prefix}-{year}"


# Test all functions
print("=== VAT Calculator ===")
vat, total = calculate_vat(500)
print(f"Amount: GHS 500.00")
print(f"VAT: GHS {vat:.2f}")
print(f"Total: GHS {total:.2f}")

print("\\n=== Phone Validator ===")
phones = ["0244123456", "024-412-3456", "123", "0201234567"]
for phone in phones:
    valid = validate_ghana_phone(phone)
    print(f"{phone}: {'✅ Valid' if valid else '❌ Invalid'}")

print("\\n=== GPA Calculator ===")
student_scores = [82, 75, 91, 68, 88]
gpa = calculate_gpa(student_scores)
print(f"Scores: {student_scores}")
print(f"GPA: {gpa}")

print("\\n=== Student ID Generator ===")
names = ["Mensah", "Asante", "Boateng"]
for name in names:
    print(format_student_id(name))`,
        quiz: [
          { q: "What keyword defines a function in Python?", options: ["function", "define", "def", "func"], answer: 2 },
          { q: "What does return do in a function?", options: ["Prints the value", "Ends the program", "Sends a value back to the caller", "Starts the function"], answer: 2 },
          { q: "What is a default parameter?", options: ["A parameter that is always required", "A parameter with a value used when no argument is provided", "The first parameter in a function", "A parameter that returns None"], answer: 1 },
          { q: "What does a function return if it has no return statement?", options: ["0", "An empty string", "False", "None"], answer: 3 },
        ],
      },
    },
    {
      order: 10,
      title: "Lists and Data Collections",
      xpValue: 100,
      isFree: false,
      content: {
        language: "python",
        concept: `Lists are one of the most important data structures in Python. A list stores multiple values in a single variable, in a specific order. Lists are mutable — you can add, remove, and change items after creating them.

You create a list with square brackets, with items separated by commas. Lists can contain any data type — strings, numbers, booleans, or even other lists. A single list can contain mixed types.

Indexing works the same as with strings — zero-based, with negative indices counting from the end. Slicing extracts a portion of a list: list[1:4] gives items at index 1, 2, and 3.

Lists have many built-in methods. append() adds an item to the end. insert() adds at a specific position. remove() removes the first occurrence of a value. pop() removes and returns the item at a given index. sort() sorts in place. len() returns the count of items. in checks if a value exists.

The extend() method adds all items from another list. The + operator also concatenates lists.

Dictionaries store key-value pairs — like a real dictionary where you look up a word to find its definition. You create them with curly braces. Access values using keys in square brackets. The get() method returns a default value if the key does not exist, avoiding errors.

This is your Project 1 checkpoint for the Python track. After completing this lesson, you will build and submit a student grade tracker application. It will use everything you have learned — variables, if statements, loops, functions, and lists.`,
        keyConcepts: [
          { code: "my_list = [1, 2, 3]", description: "creates a list with three items" },
          { code: ".append(item)", description: "adds an item to the end of the list" },
          { code: ".remove(item)", description: "removes the first occurrence of item" },
          { code: "list[0]", description: "accesses the first item (index 0)" },
          { code: "my_dict = {'key': 'value'}", description: "creates a dictionary" },
          { code: "dict.get('key', default)", description: "gets value safely with a fallback" },
        ],
        exerciseDescription: "Build a complete student grade tracker. Store student names and their scores in a list of dictionaries. Add functions to calculate statistics, find top students, and display a formatted report. This is your Project 1 — after completing the quiz, submit your enhanced version for AI review.",
        hint: "A list of dictionaries is the standard way to store records in Python: students = [{'name': 'Kofi', 'scores': [80, 75, 90]}]",
        exercise: `# Lists and Data Collections — Student Grade Tracker
# This is your Project 1 foundation — build on this!

# Student data — list of dictionaries
students = [
    {"name": "Kofi Mensah", "scores": [82, 75, 88, 91, 79]},
    {"name": "Abena Asante", "scores": [91, 88, 95, 87, 92]},
    {"name": "Kwame Boateng", "scores": [65, 72, 68, 70, 75]},
    {"name": "Efua Owusu", "scores": [45, 52, 48, 55, 50]},
    {"name": "Yaw Darko", "scores": [88, 85, 90, 87, 84]},
]


def get_average(scores):
    """Calculate average score."""
    return sum(scores) / len(scores)


def get_grade(average):
    """Convert average to letter grade."""
    if average >= 80: return "A", "First Class"
    elif average >= 70: return "B", "Second Class Upper"
    elif average >= 60: return "C", "Second Class Lower"
    elif average >= 50: return "D", "Pass"
    else: return "F", "Fail"


# Process all students
print("=" * 60)
print("      UNIVERSITY OF GHANA — SEMESTER RESULTS")
print("=" * 60)

results = []
for student in students:
    avg = get_average(student["scores"])
    grade, classification = get_grade(avg)
    results.append({
        "name": student["name"],
        "average": avg,
        "grade": grade,
        "classification": classification
    })
    print(f"{student['name']:<20} Avg: {avg:.1f}%  Grade: {grade}  ({classification})")

print("=" * 60)

# Class statistics
all_averages = [r["average"] for r in results]
class_average = get_average(all_averages)
print(f"\\nClass Average: {class_average:.1f}%")

# Top student
top = max(results, key=lambda r: r["average"])
print(f"Top Student: {top['name']} ({top['average']:.1f}%)")

# Count passes and fails
passed = [r for r in results if r["grade"] != "F"]
print(f"Passed: {len(passed)}/{len(students)}")

# Students by classification
print("\\n--- First Class Students ---")
first_class = [r["name"] for r in results if r["classification"] == "First Class"]
if first_class:
    for name in first_class:
        print(f"  🏆 {name}")
else:
    print("  None this semester")`,
        quiz: [
          { q: "How do you add an item to the end of a list?", options: ["list.add(item)", "list.append(item)", "list.insert(item)", "list.push(item)"], answer: 1 },
          { q: "What is the index of the last item in a list of 5 items?", options: ["5", "-1 or 4", "0", "last"], answer: 1 },
          { q: "How do you safely get a dictionary value without an error if key doesn't exist?", options: ["dict[key]", "dict.find(key)", "dict.get(key, default)", "dict.value(key)"], answer: 2 },
          { q: "What does [x*2 for x in numbers] create?", options: ["A loop that doubles each number", "A new list with each number doubled", "A dictionary", "A string"], answer: 1 },
        ],
      },
    },
  ];

  await prisma.lesson.deleteMany({ where: { trackId: track.id } });

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: { ...lesson, trackId: track.id },
    });
    console.log(`✅ Lesson ${lesson.order}: ${lesson.title}`);
  }

  console.log("🎉 Python track seeded!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });