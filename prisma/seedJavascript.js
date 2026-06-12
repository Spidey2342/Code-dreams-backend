const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding JavaScript track (lessons 4–10)...");

  const track = await prisma.track.upsert({
    where: { slug: "javascript" },
    update: {},
    create: {
      name: "JavaScript Foundations",
      slug: "javascript",
      description: "Learn JavaScript by building real, interactive web pages. Every concept connects to something you can actually see and use.",
      color: "#F7DF1E",
      icon: "⚡",
      isLocked: false,
      order: 3,
    },
  });

  const lessons = [
    {
      order: 4,
      title: "Numbers and Maths — Calculating Real Values",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `Almost every app does maths somewhere. A cart adds up prices. A delivery app calculates distance and a fee. A fitness app counts calories. JavaScript handles all of it, and unlike some languages it has just one number type — whether you write 5 or 5.75, it is simply a number.

The basic operators are the ones you expect: plus, minus, asterisk for multiply, and forward slash for divide. Two more are quietly essential. The double asterisk is the exponent operator, so 2 ** 3 is 8. The percent sign is the remainder, or modulo, operator: 10 % 3 is 1, because 10 divided by 3 leaves a remainder of 1. Modulo is used constantly — checking if a number is even (number % 2 === 0), or cycling through a fixed set of options.

JavaScript follows normal order of operations, and you use brackets to control it, exactly like in maths class. (a + b) / 2 averages two numbers.

For anything beyond the basics, JavaScript gives you the Math object — a toolbox of ready-made functions. Math.round() rounds to the nearest whole number, Math.floor() always rounds down, Math.ceil() always rounds up. Math.max() and Math.min() find the largest and smallest of several values. And Math.random() gives a random decimal between 0 and 1, which you scale up to pick random items or numbers.

One thing that trips up beginners: data coming from a form or an input is text, not a number. If a user types 50 into a price field, you receive the string "50", and "50" + 10 gives "5010", not 60, because the plus sign joins text. So you convert first with Number(), or parseInt() for whole numbers and parseFloat() for decimals. This is one of the most common real bugs in beginner code.

To display money cleanly, toFixed() fixes the number of decimal places: (19.5).toFixed(2) gives "19.50". You will reach for it on every price you show.

How this is used in real development: a checkout sums item prices, applies a percentage discount, adds tax, and rounds the total for display. A pagination system uses modulo and Math.ceil to work out how many pages of results there are. A game uses Math.random to spawn things. Numbers are never abstract for long — they are prices, counts, scores, and positions on a screen.`,
        keyConcepts: [
          { code: "+  -  *  /", description: "add, subtract, multiply, divide" },
          { code: "%", description: "remainder — great for even/odd and cycling" },
          { code: "**", description: "exponent — 2 ** 3 is 8" },
          { code: "Math.round(x)", description: "Math object: round, floor, ceil, max, min, random" },
          { code: "Number('50')", description: "turns text from inputs into a real number" },
          { code: "(19.5).toFixed(2)", description: "formats a number to fixed decimals for display" },
        ],
        exerciseDescription: "Build the maths behind a checkout. Add up some prices, apply a discount, add VAT, and format the total like a real receipt. Then convert a 'text' price the way you'd handle a value from a form, and use modulo to check something.",
        hint: "VAT of 15% on an amount: amount * 0.15. To show money: total.toFixed(2). To turn text into a number: Number('50').",
        exercise: `// Numbers and Maths — a mini checkout

const itemA = 25;
const itemB = 40;
const itemC = 15;

// Subtotal
const subtotal = itemA + itemB + itemC;
console.log("Subtotal: GHS", subtotal);

// Apply a 10% discount
const discount = subtotal * 0.10;
const afterDiscount = subtotal - discount;
console.log("After 10% discount: GHS", afterDiscount.toFixed(2));

// Add 15% VAT
const vat = afterDiscount * 0.15;
const total = afterDiscount + vat;
console.log("VAT: GHS", vat.toFixed(2));
console.log("Total: GHS", total.toFixed(2));

// Data from a form arrives as TEXT — convert before doing maths
const typedPrice = "50";              // imagine this came from an input
console.log("Wrong (text join):", typedPrice + 10);    // "5010"
console.log("Right (as number):", Number(typedPrice) + 10); // 60

// Modulo: is the number of items even?
const itemCount = 3;
console.log("Even number of items?", itemCount % 2 === 0);

// Try it: split the total between 4 friends and show each share with toFixed(2)`,
        quiz: [
          { q: "What does 10 % 3 give you?", options: ["3", "1", "0", "3.33"], answer: 1 },
          { q: "If a user types into a price field, what type do you receive?", options: ["A number", "A string (text)", "A boolean", "An array"], answer: 1 },
          { q: "How do you show 19.5 as money with two decimals?", options: ["Math.round(19.5)", "(19.5).toFixed(2)", "Number(19.5)", "19.5 * 100"], answer: 1 },
          { q: "Which always rounds a number down to a whole number?", options: ["Math.round()", "Math.ceil()", "Math.floor()", "toFixed()"], answer: 2 },
        ],
      },
    },
    {
      order: 5,
      title: "Booleans and Comparisons — Asking Yes/No Questions",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `A boolean is the simplest type in programming: it is either true or false. But booleans run everything. Is the user logged in? Is the cart empty? Is the password long enough? Has the form been filled correctly? Every decision your app makes comes down to a true or a false, and this lesson is where you learn to produce them.

You rarely type true and false by hand. Instead you create them by comparing values. The comparison operators are greater than, less than, greater than or equal, and less than or equal — and two for equality. This is where beginners hit their first real gotcha.

To check if two things are equal, use triple equals. Triple equals checks that the values are equal and the same type, which is what you almost always want. There is also a double equals, which tries to convert types before comparing, and it produces surprising results — "5" == 5 is true, which causes subtle bugs. The rule professionals follow: always use triple equals, and its opposite, not-equals written as an exclamation mark and two equals. Forget double equals exists.

Every comparison evaluates to a boolean. 5 > 3 is true. "abena" === "kofi" is false. You can store that result in a variable and use it later: const isAdult = age >= 18.

JavaScript also has the idea of truthy and falsy. In a yes/no context, some values count as false even though they are not the boolean false: zero, an empty string, null, and undefined are all falsy. Everything else is truthy. This is why you can check if (cart.length) — a length of 0 is falsy, meaning empty, and any other length is truthy, meaning it has items.

How this is used in real development: a sign-up form builds a boolean for each rule — is the email valid, is the password long enough, do the passwords match — and only enables the button when all are true. A profile page checks isLoggedIn before showing private data. Booleans are the questions; the answers decide what the user sees.`,
        keyConcepts: [
          { code: "===", description: "equal value AND type — always use this one" },
          { code: "!==", description: "not equal — the opposite of ===" },
          { code: ">  <  >=  <=", description: "comparisons that produce true or false" },
          { code: "const ok = age >= 18", description: "store a comparison's result as a boolean" },
          { code: "truthy / falsy", description: "0, '', null, undefined act as false; others as true" },
        ],
        exerciseDescription: "Produce the booleans a real form relies on. Given a user's details, build true/false answers for several validation rules, and see why triple equals matters. Notice how each comparison becomes a yes/no answer your app could act on.",
        hint: "A comparison like password.length >= 8 IS a boolean — you can log it or store it. Always compare with === , never ==.",
        exercise: `// Booleans and Comparisons — form validation answers

const email = "abena@mail.com";
const password = "secret12";
const age = 19;
const cartItems = 0;

// Each rule produces a true/false answer
const emailHasAt = email.includes("@");
const passwordLongEnough = password.length >= 8;
const isAdult = age >= 18;
const cartIsEmpty = cartItems === 0;

console.log("Email has @?", emailHasAt);
console.log("Password long enough?", passwordLongEnough);
console.log("Is adult?", isAdult);
console.log("Cart is empty?", cartIsEmpty);

// The === vs == gotcha
console.log('"5" === 5 :', "5" === 5);   // false — different types (correct, safe)
console.log('"5" == 5  :', "5" == 5);    // true  — sloppy, avoid ==

// Comparisons are just values — you can combine them later
const canCheckout = !cartIsEmpty;
console.log("Can checkout?", canCheckout);

// Try it: make a boolean 'usernameValid' that is true when a name is 3+ characters`,
        quiz: [
          { q: "Which should you use to compare two values?", options: ["=", "==", "===", "=>"], answer: 2 },
          { q: "What does 5 > 3 evaluate to?", options: ["5", "3", "true", "false"], answer: 2 },
          { q: "Why prefer === over ==?", options: ["It is faster", "It checks value AND type, avoiding surprises", "It works on strings only", "There is no difference"], answer: 1 },
          { q: "Which of these is 'falsy' in JavaScript?", options: ["'hello'", "1", "0", "'0'"], answer: 2 },
        ],
      },
    },
    {
      order: 6,
      title: "Making Decisions with if / else",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `Now that you can produce true and false, you can make your program choose what to do. The if statement runs a block of code only when a condition is true. This is the moment your code stops being a straight line and starts behaving differently in different situations — which is the whole point of an app.

The structure is the keyword if, a condition in round brackets, and a block of code in curly braces. If the condition is true, the block runs. If it is false, the block is skipped.

Add else for the other case: if the condition is false, the else block runs instead. Exactly one of the two runs. For more than two outcomes, chain else if between them. JavaScript checks each condition from top to bottom and runs the first block whose condition is true, then skips the rest. So order matters — put your most specific or highest conditions first.

The curly braces define exactly what belongs to each branch. Unlike Python, JavaScript does not care about indentation for meaning — the braces are what group the code — but you should still indent neatly so humans can read it.

You can nest an if inside another if when a decision depends on a previous one, though deeply nested ifs get hard to read; often combining conditions with the logical operators you will meet next is cleaner.

How this is used in real development: if/else is the backbone of every feature. If the user is logged in, show the dashboard, else show the login page. If the form is valid, submit it, else show the errors. If the payment succeeded, unlock the content, else show a retry. A grade tool decides A, B, C or F. A delivery app picks a fee band by distance. Whenever an app does different things in different situations — which is always — an if/else is underneath.`,
        keyConcepts: [
          { code: "if (condition) { }", description: "runs the block only when the condition is true" },
          { code: "else { }", description: "runs when the if condition was false" },
          { code: "else if (other) { }", description: "checks another condition in the chain" },
          { code: "{ } braces", description: "group the lines that belong to each branch" },
          { code: "first match wins", description: "the first true branch runs; the rest are skipped" },
        ],
        exerciseDescription: "Build a grade classifier — the kind of logic a student portal runs. Given a score, decide the letter grade and a message using an if / else if / else chain. Change the score and watch a different branch run.",
        hint: "Order your conditions from highest to lowest. JavaScript runs the FIRST branch whose condition is true, so score >= 80 must come before score >= 70.",
        exercise: `// if / else — a grade classifier

const studentName = "Efua";
const score = 78;   // change this to see different branches run

let grade;
let message;

if (score >= 80) {
  grade = "A";
  message = "Distinction — excellent work!";
} else if (score >= 70) {
  grade = "B";
  message = "Very good.";
} else if (score >= 60) {
  grade = "C";
  message = "A solid pass.";
} else if (score >= 50) {
  grade = "D";
  message = "Pass — room to improve.";
} else {
  grade = "F";
  message = "Fail — let's review the material.";
}

console.log(studentName + "'s score:", score);
console.log("Grade:", grade);
console.log("Message:", message);

// A separate decision: a special note for top students
if (score >= 80) {
  console.log("🏆 Added to the Dean's List");
}

// Try it: add an else-if for 'A+' when the score is 90 or above (put it FIRST)`,
        quiz: [
          { q: "When does the code inside an if block run?", options: ["Always", "Only when its condition is true", "Only when its condition is false", "Never"], answer: 1 },
          { q: "In an if / else if / else chain, how many branches run?", options: ["All of them", "Exactly one — the first whose condition is true", "None", "The last one"], answer: 1 },
          { q: "What groups the lines belonging to a branch in JavaScript?", options: ["Indentation", "Curly braces { }", "Semicolons", "Brackets ( )"], answer: 1 },
          { q: "If checking scores, why must score >= 80 come before score >= 70?", options: ["Alphabetical order", "Because the first true branch wins, so the higher band must be checked first", "It doesn't matter", "70 is not a valid score"], answer: 1 },
        ],
      },
    },
    {
      order: 7,
      title: "Logical Operators — Combining Conditions",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `Real decisions usually depend on more than one thing at once. A user can check out only if they are logged in AND their cart is not empty. A form is valid if every field passes. A discount applies if the customer is a member OR it is a holiday. Logical operators let you combine true/false values into a single answer.

There are three. The AND operator, written as two ampersands, is true only when both sides are true. The OR operator, written as two vertical bars, is true when at least one side is true. The NOT operator, written as a single exclamation mark in front of a value, flips it — not true is false, not false is true.

You combine these with the comparisons from earlier. age >= 18 && hasID checks two things at once. score < 50 || missedExam is true if either problem exists. !isLoggedIn is true when the user is not logged in.

Two practical behaviours make these even more useful. First, short-circuiting: with AND, if the first side is false JavaScript does not bother checking the second, because the answer is already false; with OR, if the first side is true it stops there. This is both faster and a safety trick — user && user.name avoids an error when user is missing. Second, OR is commonly used to supply a default: const name = typedName || "Guest" uses typedName if it has a value, and falls back to "Guest" if it is empty.

NOT is perfect for toggles and guards. !isOpen flips a menu's state. if (!isValid) return; stops early when something is wrong.

How this is used in real development: validation combines every rule with AND to decide if a form can submit. Access control checks isLoggedIn && isAdmin. Feature flags use OR for fallbacks. The little guards that keep apps from crashing — checking something exists before using it — are built from these three operators. They are how individual yes/no answers become one final decision.`,
        keyConcepts: [
          { code: "a && b", description: "AND — true only when BOTH are true" },
          { code: "a || b", description: "OR — true when AT LEAST ONE is true" },
          { code: "!a", description: "NOT — flips true to false and back" },
          { code: "name || 'Guest'", description: "OR as a default when a value is empty" },
          { code: "user && user.name", description: "short-circuit guard — avoids errors safely" },
        ],
        exerciseDescription: "Combine several yes/no checks into single decisions, the way real validation and access control do. Build a 'can checkout' rule from multiple conditions, use OR to provide a default name, and use NOT to flip a state.",
        hint: "&& needs both true; || needs at least one true; ! flips a boolean. A default value: const x = value || 'fallback'.",
        exercise: `// Logical Operators — combining conditions

const isLoggedIn = true;
const cartCount = 2;
const isAdmin = false;
const typedName = "";   // imagine an empty input

// AND: you can only check out if logged in AND cart is not empty
const canCheckout = isLoggedIn && cartCount > 0;
console.log("Can checkout?", canCheckout);

// OR: show an admin panel if admin OR (for the demo) logged in
const canSeePanel = isAdmin || isLoggedIn;
console.log("Can see panel?", canSeePanel);

// NOT: flip a value
console.log("Is a guest (not logged in)?", !isLoggedIn);

// OR as a default — fall back to "Guest" when the name is empty
const displayName = typedName || "Guest";
console.log("Welcome,", displayName);

// Combine three rules for a form, like real validation
const email = "ama@mail.com";
const password = "secret12";
const formValid = email.includes("@") && password.length >= 8 && cartCount >= 0;
console.log("Form valid?", formValid);

// Try it: make 'freeDelivery' true when the order is 100+ OR the user is admin`,
        quiz: [
          { q: "When is a && b true?", options: ["When either is true", "Only when both are true", "Only when both are false", "Never"], answer: 1 },
          { q: "When is a || b true?", options: ["Only when both are true", "When at least one is true", "Only when both are false", "Never"], answer: 1 },
          { q: "What does !isLoggedIn give if isLoggedIn is true?", options: ["true", "false", "undefined", "an error"], answer: 1 },
          { q: "What does const name = typedName || 'Guest' do?", options: ["Always sets name to 'Guest'", "Uses typedName, or 'Guest' if typedName is empty", "Causes an error", "Joins both texts"], answer: 1 },
        ],
      },
    },
    {
      order: 8,
      title: "Arrays — Storing Lists of Things",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `So far each variable has held a single value. But apps are full of lists: the items in a cart, the messages in a chat, the students on a leaderboard, the photos in a feed. An array is how JavaScript stores an ordered list of values in one variable.

You create an array with square brackets and commas between the items: a list of prices, a list of names, a list of anything. An array can even hold a mix of types, though in practice you usually keep one kind of thing per array.

Each item has a position called an index, and JavaScript counts from zero. The first item is at index 0, the second at index 1, and so on. You read an item with square brackets and its index: names[0] is the first name. Because counting starts at zero, the last item of a list with five items is at index 4 — one less than the length.

The length property tells you how many items are in the array, and it updates automatically as the array changes. The last item is always at index length minus one, which is the standard way to reach the end: names[names.length - 1].

You can change an item by assigning to its position, and arrays are mutable, meaning you can grow and shrink them after creation — which is exactly what apps do as users add and remove things. The next lesson covers the methods that add, remove, and search; this lesson is about holding the list and reaching into it.

How this is used in real development: a shopping cart is an array of items, and the cart total is calculated by going through it. A chat is an array of messages rendered one after another. Search results, a playlist, a to-do list, the rows of a table — almost every list you see on a screen is an array in the code behind it. Learning arrays is learning how apps hold the collections that users actually look at.`,
        keyConcepts: [
          { code: "const list = [1, 2, 3]", description: "creates an array — an ordered list" },
          { code: "list[0]", description: "reads the first item (indexing starts at 0)" },
          { code: "list.length", description: "how many items are in the array" },
          { code: "list[list.length - 1]", description: "the last item" },
          { code: "list[1] = 'new'", description: "change an item by its position" },
        ],
        exerciseDescription: "Hold and reach into a list the way an app does. Create an array of cart items, read the first and last, check the length, change one item, and see how indexing from zero works.",
        hint: "The first item is at index 0, so the last is at index length - 1. Read with cart[0]; count with cart.length.",
        exercise: `// Arrays — a shopping cart as a list

const cart = ["Jollof Rice", "Fanta", "Spring Rolls"];

console.log("Whole cart:", cart);
console.log("How many items?", cart.length);

// Indexing starts at 0
console.log("First item:", cart[0]);
console.log("Second item:", cart[1]);

// The last item is always at length - 1
console.log("Last item:", cart[cart.length - 1]);

// Change an item by its position
cart[1] = "Sprite";
console.log("After swapping item 2:", cart);

// Arrays can hold numbers too — like prices
const prices = [25, 8, 15];
console.log("First price: GHS", prices[0]);
console.log("Number of prices:", prices.length);

// Try it: log the SECOND price, and the LAST price using prices.length - 1`,
        quiz: [
          { q: "What index is the first item of an array?", options: ["1", "0", "-1", "the length"], answer: 1 },
          { q: "How do you find how many items an array has?", options: ["array.count", "array.size()", "array.length", "count(array)"], answer: 2 },
          { q: "For an array of 5 items, what index is the last one?", options: ["5", "4", "0", "6"], answer: 1 },
          { q: "What does cart[1] = 'Sprite' do?", options: ["Adds a new item", "Deletes item 1", "Changes the second item to 'Sprite'", "Causes an error"], answer: 2 },
        ],
      },
    },
    {
      order: 9,
      title: "Array Methods — Adding, Removing, and Looping",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `An array you cannot change is not much use — real lists grow and shrink constantly as users add items to a cart, send messages, or delete tasks. Array methods are the built-in actions that do this work, and a handful of them cover most of what you will ever need.

To add to the end of an array, use push. To remove the last item, use pop. There are matching methods for the front of the list — unshift adds to the start, shift removes from the start — but push and pop are by far the most common.

To check whether something is already in an array, includes returns true or false. This is how you avoid adding a duplicate, or check if a user has already liked a post. If you need the position of an item rather than just whether it exists, indexOf gives you its index, or minus one if it is not there.

To turn an array into a single string — for displaying it — join glues the items together with a separator you choose. Joining names with a comma and a space produces a clean, readable line.

The most important action of all is going through every item, and the cleanest way is forEach. You give forEach a small function, and it runs that function once for each item, handing you the item each time. This is how you add up every price in a cart, or print every message in a chat. forEach is your first taste of doing something to a whole list at once, and it leads directly into the more powerful list tools you will meet later.

How this is used in real development: pressing Add to Cart pushes an item onto the cart array. A like button checks includes to avoid double-liking, then pushes the user's id. Displaying a list joins it, or loops with forEach to build each row. Totting up an order loops the items and sums the prices. These few methods are the verbs of working with lists — the actions behind nearly every list-driven feature.`,
        keyConcepts: [
          { code: ".push(item)", description: "adds an item to the end of the array" },
          { code: ".pop()", description: "removes the last item" },
          { code: ".includes(x)", description: "true/false — is x already in the array?" },
          { code: ".join(', ')", description: "joins items into one readable string" },
          { code: ".forEach(fn)", description: "runs a function once for every item" },
          { code: "indexOf(x)", description: "position of x, or -1 if it is not there" },
        ],
        exerciseDescription: "Run a cart the way an app does: add items, remove one, check for duplicates, display the list as a line, and loop through prices to compute a total with forEach. These are the everyday actions on lists.",
        hint: "cart.push('x') adds to the end. To total prices: let total = 0; prices.forEach(p => { total = total + p; }).",
        exercise: `// Array Methods — a working cart

const cart = ["Jollof Rice"];

// Add items (this is what "Add to cart" does)
cart.push("Fanta");
cart.push("Spring Rolls");
console.log("Cart now:", cart);

// Remove the last item
cart.pop();
console.log("After removing last:", cart);

// Avoid duplicates with includes
if (!cart.includes("Fanta")) {
  cart.push("Fanta");
}
console.log("Has Fanta?", cart.includes("Fanta"));

// Display the list as one clean line
console.log("Your order: " + cart.join(", "));

// Loop every price and add them up with forEach
const prices = [25, 8, 15];
let total = 0;
prices.forEach((price) => {
  total = total + price;
});
console.log("Total: GHS", total);

// Try it: push one more price, then re-run the total loop and log the new total`,
        quiz: [
          { q: "Which method adds an item to the END of an array?", options: [".pop()", ".push()", ".shift()", ".add()"], answer: 1 },
          { q: "What does cart.includes('Fanta') return?", options: ["The index of Fanta", "true or false", "The whole cart", "An error"], answer: 1 },
          { q: "What does .join(', ') do?", options: ["Splits a string into an array", "Joins array items into one string", "Adds an item", "Sorts the array"], answer: 1 },
          { q: "What is forEach used for?", options: ["Removing an item", "Running a function once for every item", "Checking the length", "Sorting"], answer: 1 },
        ],
      },
    },
    {
      order: 10,
      title: "Project 1 — Build a Bill Splitter",
      xpValue: 100,
      isFree: true,
      content: {
        language: "javascript",
        concept: `This is your first project. Everything you have learned so far — variables, numbers, strings, booleans, if/else, logical operators, and arrays — comes together to build something a real app actually does: a bill splitter that works out what each person pays, including a tip.

Here is the thinking behind the build. You start with the data: the bill amount, the number of people, and a tip percentage. These are values, so they go in variables. The bill and tip can change, but the structure stays the same — exactly how a real calculator works.

Next comes the maths from lesson 4. The tip is the bill times the tip percentage. The grand total is the bill plus the tip. Each person pays the grand total divided by the number of people. You format the money with toFixed(2) so it reads like real currency.

Then you add a decision with if/else. If the number of people is zero, you cannot divide — so you guard against it and show a friendly message instead of letting the program break. Guarding against bad input like this is something every real app does, and it is the difference between code that works in a demo and code that survives real users.

Finally you present the result as clear text, the way a user would see it on screen, using template literals to build each line.

When you are ready, take the quiz, then open the project submission and build your own version. Make it yours: add a "round up each share" option, handle an uneven split where one person covers the remainder, or let different people leave different tips. The goal is not to copy the starter — it is to take these fundamentals and make something that genuinely works.

How this is used in real development: this is exactly the shape of a real feature. Take some inputs, validate them, run the calculation, format the output, handle the edge cases. A checkout, a loan calculator, a delivery-fee estimator — they are all this same pattern at a larger scale. If you can build this bill splitter and explain each part, you are no longer just learning syntax; you are building software.`,
        keyConcepts: [
          { code: "inputs -> variables", description: "capture the bill, people, and tip as values" },
          { code: "tip = bill * rate", description: "the maths from lesson 4 in action" },
          { code: "if (people === 0)", description: "guard against dividing by zero (real validation)" },
          { code: "share.toFixed(2)", description: "format each person's amount as money" },
          { code: "template literals", description: "build the result lines users see" },
        ],
        exerciseDescription: "Build the bill splitter. Calculate the tip, the total, and each person's share, format the money, and guard against zero people. This is your Project 1 — after the quiz, open the project submission and build your own improved version.",
        hint: "Each share = total / people. Format with toFixed(2). Guard first: if (people === 0) handle it before dividing.",
        exercise: `// PROJECT 1 — Bill Splitter
// Combine variables, maths, if/else, and template literals

// The inputs — try changing these
const bill = 240;        // GHS
const people = 4;
const tipPercent = 10;   // %

// Guard against bad input BEFORE doing maths (real apps always do this)
if (people === 0) {
  console.log("Please enter at least one person.");
} else {
  // The maths
  const tip = bill * (tipPercent / 100);
  const total = bill + tip;
  const perPerson = total / people;

  // Present it the way a user would see it
  console.log("===== BILL SPLITTER =====");
  console.log(\`Bill:        GHS \${bill.toFixed(2)}\`);
  console.log(\`Tip (\${tipPercent}%):    GHS \${tip.toFixed(2)}\`);
  console.log(\`Total:       GHS \${total.toFixed(2)}\`);
  console.log(\`People:      \${people}\`);
  console.log("-------------------------");
  console.log(\`Each pays:   GHS \${perPerson.toFixed(2)}\`);
}

// YOUR TURN (submit this as your project):
// 1. Add a check: if the tip percent is 0, print "No tip added"
// 2. Add a "generous" message when the tip is 15% or more
// 3. Bonus: round each share UP to the nearest cedi with Math.ceil`,
        quiz: [
          { q: "Why does the project check if (people === 0) before dividing?", options: ["To count the people", "To avoid dividing by zero, which would break the result", "To make it faster", "It is not necessary"], answer: 1 },
          { q: "How do you calculate a 10% tip on a bill?", options: ["bill + 10", "bill * (10 / 100)", "bill / 10", "bill - 10"], answer: 1 },
          { q: "What does perPerson.toFixed(2) achieve?", options: ["Rounds to a whole number", "Formats the amount with 2 decimals like money", "Adds 2 to the amount", "Converts it to text length"], answer: 1 },
          { q: "What's the real-world pattern this project follows?", options: ["Inputs, validate, calculate, format, handle edge cases", "Just printing text", "Only doing maths", "Storing data forever"], answer: 0 },
        ],
      },
    },
  ];

  const orders = lessons.map((l) => l.order);
  await prisma.lesson.deleteMany({ where: { trackId: track.id, order: { in: orders } } });

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: { ...lesson, trackId: track.id },
    });
    console.log(`✅ Lesson ${lesson.order}: ${lesson.title}`);
  }

  console.log("🎉 JavaScript lessons 4–10 seeded!");
}

if (require.main === module) {
  main().catch((e) => { console.error(e); process.exit(1); })
        .finally(async () => { await prisma.$disconnect(); });
}
module.exports = { seedJavaScript: main };