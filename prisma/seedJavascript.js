const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding JavaScript track...");

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

  console.log("✅ Track created:", track.name);

  const lessons = [
    {
      order: 1,
      title: "What JavaScript Is and How It Powers the Web",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `Every website is built from three layers. HTML is the structure — the headings, paragraphs, and buttons. CSS is the style — the colours, spacing, and fonts. JavaScript is the third layer: behaviour. It is what makes a page do things.

Think about the apps you use every day. When you type a wrong password and the box shakes red, that is JavaScript. When Instagram loads more posts as you scroll without refreshing, that is JavaScript. When a form warns you that your email is missing an @ before you even submit, that is JavaScript. HTML and CSS can only show a fixed page — the moment a page reacts to you, JavaScript is doing the work.

JavaScript runs inside the browser. Every browser — Chrome, Safari, the one on your phone — has a JavaScript engine built in. That means the code you write runs on the user's device instantly, with no server needed. (JavaScript also runs on servers through Node.js, which is how the backend of this very platform is built — so learning it opens both front and back end.)

The single most important tool you will use while writing JavaScript is console.log(). It prints a value so you can see it. This sounds simple, but it is what every professional developer relies on constantly. When you are building a feature and something is not working, you sprinkle console.log() through your code to see what is actually happening at each step. It is your window into your program's mind.

In this track, the console panel on the right is where you will watch your code run. You write code, click RUN, and see the result immediately. Later in the track you will move beyond the console and make changes appear on the page itself — changing text, responding to clicks, building small apps. But console.log() never goes away; you will use it on the job for the rest of your career.

A few mechanics. JavaScript runs your code from top to bottom, one line at a time. Each instruction is called a statement. You can end statements with a semicolon — modern JavaScript does not strictly require them, but they make your intent clear and are good practice. Anything after two slashes is a comment, which JavaScript ignores; comments are notes for humans reading the code.

How this is used in real development: before you build any feature, you confirm your data is what you expect by logging it. A developer building a checkout page logs the cart total before charging the card. A developer building a profile page logs the user object the server sent back. You are not learning a toy — console.log() is the first line of defence in every real codebase.`,
        keyConcepts: [
          { code: "console.log(x)", description: "prints a value to the console so you can see it" },
          { code: "// comment", description: "a note for humans — JavaScript ignores it" },
          { code: "statement;", description: "one instruction; semicolons end them clearly" },
          { code: "behaviour layer", description: "JS is what makes a page react and do things" },
        ],
        exerciseDescription: "Write your first JavaScript. Use console.log() to print a few lines about yourself, then log the result of a small calculation. Notice that the lines appear in the console in the exact order you wrote them — JavaScript runs top to bottom.",
        hint: "console.log() can take several values separated by commas: console.log('Total:', 5 + 3) prints 'Total: 8'.",
        exercise: `// Your first JavaScript program
// The console panel on the right is where output appears

// Print a few lines — they run top to bottom, in order
console.log("Hello! I'm learning JavaScript.");
console.log("I already know HTML and CSS.");
console.log("Now I'm learning to make pages interactive.");

// console.log can print the result of a calculation
console.log("5 + 3 =", 5 + 3);

// It can print several values at once, separated by commas
console.log("My name is", "Kofi", "and I study Computer Science");

// Anything after // is a comment and is ignored
// console.log("This line will NOT run because it is commented out")

// Try it: add your own console.log line below with your name and goal`,
        quiz: [
          { q: "Which layer of the web makes a page react and do things?", options: ["HTML", "CSS", "JavaScript", "The browser"], answer: 2 },
          { q: "What is console.log() mainly used for?", options: ["Styling the page", "Seeing what your code is doing", "Saving data to a server", "Creating HTML elements"], answer: 1 },
          { q: "Where does JavaScript run when a user opens a web page?", options: ["On the server only", "In the browser on the user's device", "In a separate app", "It does not run, it is just text"], answer: 1 },
          { q: "What happens to text after // on a line?", options: ["It runs twice", "It is printed in red", "JavaScript ignores it (a comment)", "It causes an error"], answer: 2 },
        ],
      },
    },
    {
      order: 2,
      title: "Variables — Storing the Data Your App Works With",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `A variable is a named container for a value. Every app is, at its heart, data being stored, changed, and displayed — and variables are how you hold that data. The logged-in user's name, the number of items in a cart, whether a menu is open: all of these live in variables.

In JavaScript you create a variable with the keyword const or let, followed by a name, an equals sign, and a value. Use const when the value will not be reassigned — which is most of the time. Use let when you know the value will change, like a score that goes up or a counter. There is an older keyword, var, that you will see in old code, but modern JavaScript uses const and let; avoid var.

Why prefer const? It protects you. If you mark something const and then accidentally try to overwrite it, JavaScript stops you with an error — which is far better than a silent bug. Reach for const first, and only switch to let when you genuinely need to reassign.

Variable names should describe what they hold. cartTotal is good; x or thing is not. JavaScript convention is camelCase: the first word lowercase, each following word capitalised — like firstName, isLoggedIn, totalPrice. Names are case-sensitive, so userName and username are two different variables.

JavaScript figures out the type of a value automatically. A piece of text in quotes is a string. A number, with or without a decimal, is a number. true or false is a boolean. You do not declare the type — you just assign the value and JavaScript handles it.

A let variable can be reassigned simply by writing its name, an equals sign, and the new value — no keyword the second time. A const variable cannot. Reassigning is how a running app updates state: a cart total recalculates when you add an item, a counter increases when you click.

How this is used in real development: open the code of any real feature and the top is almost always a set of variables capturing the current situation. A login form starts with const email and const password read from the inputs. A shopping cart keeps let total that grows as items are added. A game keeps let score and let lives. Variables are the nouns of your program — before you can do anything, you name the things you are working with.`,
        keyConcepts: [
          { code: "const name = 'Ama'", description: "a value that will not be reassigned (use this most)" },
          { code: "let score = 0", description: "a value you expect to change later" },
          { code: "score = score + 10", description: "reassigning a let variable to update it" },
          { code: "camelCase", description: "JS naming style: firstName, totalPrice, isOpen" },
          { code: "typeof x", description: "tells you the type: 'string', 'number', 'boolean'" },
        ],
        exerciseDescription: "Model a small piece of a real app with variables. Store a user's details and a shopping cart, then update the cart total the way an app would when an item is added. Watch which values can change (let) and which cannot (const).",
        hint: "const is for values that stay fixed (a user's name); let is for values that change (a running total). Update a let with: total = total + price.",
        exercise: `// Variables — modelling a user and a cart

// These describe a fixed situation — use const
const firstName = "Abena";
const isLoggedIn = true;
const country = "Ghana";

console.log("User:", firstName);
console.log("Logged in:", isLoggedIn);

// A cart total CHANGES as items are added — use let
let cartTotal = 0;
console.log("Starting cart total: GHS", cartTotal);

// Add a few items (this is exactly what an app does on "Add to cart")
const itemPrice = 25;
cartTotal = cartTotal + itemPrice;   // add first item
cartTotal = cartTotal + 40;          // add a GHS 40 item
console.log("Cart total after 2 items: GHS", cartTotal);

// Trying to reassign a const would crash — uncomment to see the error:
// firstName = "Kofi";

// Check the types JavaScript chose for you
console.log("typeof firstName:", typeof firstName);
console.log("typeof cartTotal:", typeof cartTotal);
console.log("typeof isLoggedIn:", typeof isLoggedIn);

// Try it: add a 'let points = 0' and increase it twice, then log it`,
        quiz: [
          { q: "Which keyword should you use for a value that will NOT be reassigned?", options: ["var", "let", "const", "static"], answer: 2 },
          { q: "Why prefer const over let when possible?", options: ["It runs faster", "It stops you from accidentally overwriting the value", "It uses less memory", "It is shorter to type"], answer: 1 },
          { q: "What naming style does JavaScript use by convention?", options: ["snake_case", "camelCase", "PascalCase", "kebab-case"], answer: 1 },
          { q: "How do you update a let variable called total by adding price?", options: ["let total = price", "total + price", "total = total + price", "const total = total + price"], answer: 2 },
        ],
      },
    },
    {
      order: 3,
      title: "Strings and Template Literals — Building Text Your Users See",
      xpValue: 50,
      isFree: true,
      content: {
        language: "javascript",
        concept: `Strings are text, and almost everything a user reads on a screen is a string your code put together. A welcome message with their name, a price formatted with GHS in front, an error that says exactly which field is wrong — all of these are strings you build in JavaScript. Getting comfortable with strings is getting comfortable with everything your app says to people.

You create a string with single quotes, double quotes, or backticks. Single and double quotes work the same. Backticks are special and the most useful, so we will focus on them.

A backtick string is called a template literal, and it has a superpower: you can drop variables straight into it using a dollar sign and curly braces. Instead of gluing pieces together with plus signs, you write the sentence naturally and slot the variables in. Compare "Hello " + name + ", you have " + count + " messages" with the template literal version — the template literal is far easier to read and far harder to get wrong. This is what professional code uses almost everywhere.

Template literals can also span multiple lines without any special characters, which makes them perfect for building chunks of text or HTML.

Strings come with built-in methods — actions you can perform on them. toUpperCase() and toLowerCase() change the case. trim() removes spaces from both ends, which you use constantly to clean up what a user types. length tells you how many characters there are. includes() checks whether a string contains some text. slice() pulls out a portion. replace() swaps one piece of text for another.

One key idea: strings are immutable, meaning these methods never change the original string — they return a new one. So you capture the result, usually in a new variable, rather than expecting the original to change.

How this is used in real development: when a user signs up, you trim() their email and lowerCase() it before saving, so " Ama@Mail.com " and "ama@mail.com" are treated as the same account. When you greet them, you build the message with a template literal. When you show a price, you format it as a string with the currency. When you validate a form, includes() checks that the email has an @. Text handling is not a side topic — it is most of what front-end code does, because text is what users actually see.`,
        keyConcepts: [
          { code: "`Hi ${name}`", description: "template literal — slot variables straight into text" },
          { code: ".trim()", description: "removes spaces from both ends (cleans user input)" },
          { code: ".toUpperCase()", description: "returns the text in all capitals" },
          { code: ".includes('@')", description: "checks whether the text contains something" },
          { code: ".length", description: "how many characters the string has" },
          { code: "immutable", description: "string methods return a NEW string, not change the old" },
        ],
        exerciseDescription: "Build the kind of text a real app shows its users. Take a raw, messy name and email the way a form would receive them, clean them up, and use a template literal to build a friendly welcome message and a simple validation check.",
        hint: "Template literals use backticks and ${ }. To embed a variable: `Welcome, ${firstName}!`. Remember methods return a new value, so store the result.",
        exercise: `// Strings — building the text users see

// Raw input, the way a form often receives it (extra spaces, odd casing)
const rawName = "  abena owusu  ";
const rawEmail = "  Abena.Owusu@Mail.COM ";

// Clean it up — methods return NEW strings, so we store the results
const cleanEmail = rawEmail.trim().toLowerCase();
const cleanName = rawName.trim();

console.log("Cleaned email:", cleanEmail);

// Build a welcome message with a template literal (the modern way)
const firstName = cleanName.split(" ")[0];
const welcome = \`Welcome back, \${firstName}! Good to see you. 👋\`;
console.log(welcome);

// Format a price the way a real UI would
const price = 80;
console.log(\`Your CodePath Pro plan is GHS \${price} per month.\`);

// A simple validation check, like a sign-up form does
const emailIsValid = cleanEmail.includes("@") && cleanEmail.includes(".");
console.log(\`Email valid? \${emailIsValid}\`);
console.log(\`Email length: \${cleanEmail.length} characters\`);

// Try it: build a message that says how many letters are in your first name`,
        quiz: [
          { q: "Which quotes create a template literal?", options: ["Single quotes ' '", "Double quotes \" \"", "Backticks \` \`", "Square brackets [ ]"], answer: 2 },
          { q: "How do you put a variable called name inside a template literal?", options: ["{name}", "${name}", "+name+", "(name)"], answer: 1 },
          { q: "What does .trim() do?", options: ["Makes text uppercase", "Removes spaces from both ends", "Counts characters", "Splits the string"], answer: 1 },
          { q: "If you call rawEmail.toLowerCase(), what happens to rawEmail itself?", options: ["It becomes lowercase", "It is deleted", "Nothing — a new string is returned and rawEmail is unchanged", "It causes an error"], answer: 2 },
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

  console.log("🎉 JavaScript track seeded (lessons 1–3)!");
}

if (require.main === module) {
  main().catch((e) => { console.error(e); process.exit(1); })
        .finally(async () => { await prisma.$disconnect(); });
}
module.exports = { seedJavaScript: main };