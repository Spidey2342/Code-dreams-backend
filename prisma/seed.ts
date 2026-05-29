import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const track = await prisma.track.upsert({
    where: { slug: "html-css" },
    update: {},
    create: {
      name: "HTML & CSS Foundation",
      slug: "html-css",
      description: "Master the building blocks of the web. Learn semantic markup and modern styling techniques.",
      color: "#E34F26",
      icon: "🌐",
      isLocked: false,
      order: 1,
    },
  });

  console.log("✅ Track created:", track.name);

  const lessons = [
    {
      order: 1,
      title: "Introduction to HTML",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `HTML stands for HyperText Markup Language. It is the language every browser understands, and it is the foundation of every single website on the internet — from Google to a local Ghanaian business website.

HTML is not a programming language. You are not writing logic or calculations. You are writing structure. You are telling the browser: "this is a heading", "this is a paragraph", "this is an image". The browser then displays it accordingly.

Think of it like building a house. Before you paint the walls or install furniture, you need the skeleton — the beams and walls that hold everything together. HTML is that skeleton.

Every HTML document has the same basic structure. You start with a declaration, then the root element, then the head section, then the body section. The head contains information about the page that users don't see directly. The body contains everything the user actually sees on screen.

HTML works with tags. A tag is a keyword wrapped in angle brackets. Most tags come in pairs — an opening tag and a closing tag. The closing tag has a forward slash before the keyword. Everything between the opening and closing tag is the content of that element.`,
        keyConcepts: [
          { code: "<!DOCTYPE html>", description: "tells the browser this is an HTML5 document" },
          { code: "<html>", description: "the root element that wraps the entire page" },
          { code: "<head>", description: "contains metadata — title, fonts, styles" },
          { code: "<body>", description: "contains everything the user sees on screen" },
          { code: "<h1>", description: "the main heading — one per page" },
          { code: "<p>", description: "a paragraph of text" },
        ],
        exerciseDescription: "Write your first HTML page. Inside the body, add an h1 heading with your full name, then add a paragraph explaining why you want to learn coding. Run the code to see it render in the browser.",
        hint: "Try: <h1>Kofi Mensah</h1> then <p>I want to build websites because...</p>",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>

    <!-- Step 1: Add your name as the main heading -->
    <h1>Your Name Here</h1>

    <!-- Step 2: Add a paragraph about why you want to learn coding -->
    <p>I want to learn coding because...</p>

  </body>
</html>`,
        quiz: [
          { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Links", "Home Tool Markup Language"], answer: 0 },
          { q: "Which tag is used for the main heading on a page?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2 },
          { q: "What goes inside the <body> tag?", options: ["Metadata and fonts", "The page title", "Everything the user sees", "CSS styles only"], answer: 2 },
          { q: "What does a closing tag look like?", options: ["<tag>", "<tag/>", "</tag>", "<<tag>>"], answer: 2 },
        ],
      },
    },
    {
      order: 2,
      title: "Headings and Paragraphs",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `HTML gives you six levels of headings — h1 through h6. h1 is the largest and most important. h6 is the smallest. Think of them like a newspaper: the big bold title is h1, the section titles are h2, and subsections go deeper from there.

The golden rule: only ever use one h1 per page. Search engines like Google use your h1 to understand what your page is about. If you have five h1 tags, Google gets confused. One clear h1 tells the story.

Paragraphs use the p tag. Every paragraph gets its own p tag. The browser automatically adds space above and below each paragraph, so you do not need to add blank lines manually.

Two other useful tags: strong makes text bold — use it for important words. em makes text italic — use it for emphasis. Both have semantic meaning, not just visual. Screen readers use them to understand importance.

Line breaks use the br tag. It is a self-closing tag — no closing tag needed. But use br sparingly. If you find yourself adding many line breaks, that usually means you need a new paragraph instead.

Good heading structure matters more than you think. It helps screen readers, search engines, and assistants understand your content. A well-structured page is also easier to style with CSS later.`,
        keyConcepts: [
          { code: "<h1> to <h6>", description: "six heading levels — h1 is most important" },
          { code: "<p>", description: "paragraph — gets automatic spacing above and below" },
          { code: "<strong>", description: "bold text with semantic importance" },
          { code: "<em>", description: "italic text with semantic emphasis" },
          { code: "<br>", description: "line break — self-closing, no closing tag" },
        ],
        exerciseDescription: "Build a simple profile page. Use h1 for your name, h2 for section titles like 'About Me' and 'My Goals', and p tags for the content in each section. Use strong for one important word in each paragraph.",
        hint: "Structure: h1 name → h2 'About Me' → p about yourself → h2 'My Goals' → p your goals",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My Profile</title>
  </head>
  <body>

    <!-- Your name — the most important heading -->
    <h1>Kofi Mensah</h1>

    <!-- About Me section -->
    <h2>About Me</h2>
    <p>I am a <strong>software developer</strong> based in Accra, Ghana. I love building things for the web.</p>

    <!-- My Goals section -->
    <h2>My Goals</h2>
    <p>My goal is to build <strong>real products</strong> that solve problems for people in Ghana.</p>

    <!-- Try adding another section below -->

  </body>
</html>`,
        quiz: [
          { q: "How many h1 tags should a page have?", options: ["As many as you need", "Only one", "At least three", "Two maximum"], answer: 1 },
          { q: "Which tag makes text bold with semantic meaning?", options: ["<b>", "<bold>", "<strong>", "<heavy>"], answer: 2 },
          { q: "What does the <br> tag do?", options: ["Creates bold text", "Creates a line break", "Starts a new paragraph", "Adds a border"], answer: 1 },
          { q: "Which heading is the smallest?", options: ["<h1>", "<h3>", "<h5>", "<h6>"], answer: 3 },
        ],
      },
    },
    {
      order: 3,
      title: "Links and Images",
      xpValue: 50,
      isFree: true,
      content: `Links and images are what make the web feel alive. Without them, a webpage is just a wall of text. Links connect pages together — they are the reason we call it the World Wide Web. Images communicate visually in ways words cannot.

Links use the anchor tag: a. The most important attribute is href — it stands for Hypertext Reference and it tells the browser where to go when the user clicks. The text between the opening and closing a tag is what the user sees and clicks.

By default, links open in the same tab. If you want a link to open in a new tab — which is common for external websites — you add target="_blank". When you use target="_blank", always also add rel="noopener" for security reasons.

Images use the img tag. It is self-closing — no closing tag. The src attribute points to the image file, either on your computer or on the internet. The alt attribute is not optional — always write a description. It is read by screen readers for visually impaired users, and it shows as text if the image fails to load. Google also reads it.

Think about building a website for a Ghanaian business. You would use links to connect to their Facebook page, their Paystack payment page, their WhatsApp number. You would use images to show their products, their shop, their team. Links and images are not just decoration — they are the core user experience.`,
        keyConcepts: [
          { code: '<a href="url">', description: "creates a clickable link to another page" },
          { code: 'target="_blank"', description: "opens the link in a new browser tab" },
          { code: '<img src="url">', description: "displays an image from a URL or file path" },
          { code: 'alt="description"', description: "describes the image for accessibility and SEO" },
          { code: 'rel="noopener"', description: "security attribute used with target blank" },
        ],
        exerciseDescription: "Build a page called 'My Favourite Websites'. Add links to 3 websites you use regularly — make each one open in a new tab. Then add an image from the internet using its URL. Make sure to write a proper alt description for the image.",
        hint: "For external links always add target='_blank' and rel='noopener'. Find an image URL by right-clicking any image on the web and choosing 'Copy image address'.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My Favourite Websites</title>
  </head>
  <body>

    <h1>My Favourite Websites</h1>

    <!-- Add 3 links that open in new tabs -->
    <p><a href="https://google.com" target="_blank" rel="noopener">Google</a></p>
    <p><a href="https://github.com" target="_blank" rel="noopener">GitHub</a></p>
    <!-- Add your third link here -->

    <h2>My Favourite Image</h2>
    <!-- Add an image from the web — replace the src with a real image URL -->
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Ghana.svg/320px-Flag_of_Ghana.svg.png"
      alt="The flag of Ghana — red, gold, and green with a black star"
      width="300"
    >

  </body>
</html>`,
        quiz: [
          { q: "Which attribute defines where a link goes?", options: ["src", "href", "link", "url"], answer: 1 },
          { q: "What does target='_blank' do?", options: ["Opens in same tab", "Opens in a new tab", "Downloads the file", "Closes the window"], answer: 1 },
          { q: "Why is the alt attribute important on images?", options: ["It makes the image bigger", "For accessibility and SEO", "It adds a border", "It is required to display the image"], answer: 1 },
          { q: "Which of these is correct image syntax?", options: ["<image src='pic.jpg'>", "<img href='pic.jpg'>", "<img src='pic.jpg' alt='description'>", "<img>pic.jpg</img>"], answer: 2 },
        ],
      },
    },
    {
      order: 4,
      title: "Lists in HTML",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Lists are one of the most used HTML elements. Every navigation menu is a list. Every set of features on a product page is a list. Every step-by-step tutorial is a list. Learning to use lists properly will make your pages cleaner and more organised.

HTML has two main types of lists. Unordered lists use bullet points — the order of items does not matter. Ordered lists use numbers — the order matters. Both use the same li tag for each list item. The only difference is whether you wrap them in ul or ol.

When should you use which? Use unordered lists for things like navigation links, features, ingredients, or skills — things where the order is not important. Use ordered lists for steps in a process, rankings, or instructions — things where sequence matters.

Lists can be nested. You can put a list inside another list item. This is how dropdown navigation menus are built. A nested list is just an li that contains another ul or ol.

One important thing: never use lists just for visual indentation. Lists have semantic meaning — they tell browsers and screen readers that these items are related. If you want indentation without that semantic meaning, use CSS margin or padding instead.

Real example: A website for a jollof rice restaurant in Accra would use an unordered list for the menu categories, an ordered list for the recipe steps, and a nested list to show side dish options under each main dish.`,
        keyConcepts: [
          { code: "<ul>", description: "unordered list — bullet points, order doesn't matter" },
          { code: "<ol>", description: "ordered list — numbers, sequence matters" },
          { code: "<li>", description: "list item — used inside both ul and ol" },
          { code: "nested lists", description: "a list inside an li creates a sub-list" },
        ],
        exerciseDescription: "Build a food page. Create an unordered list of at least 5 Ghanaian foods you enjoy. Then create an ordered list showing the steps to make one of them. Finally, try nesting a list — add ingredients as a sub-list under one of the steps.",
        hint: "For a nested list, add a <ul> or <ol> inside one of your <li> elements. The browser will indent it automatically.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Ghanaian Foods</title>
  </head>
  <body>

    <h1>My Favourite Ghanaian Foods</h1>

    <!-- Unordered list — order doesn't matter -->
    <ul>
      <li>Jollof Rice</li>
      <li>Waakye</li>
      <li>Banku and Tilapia</li>
      <li>Kelewele</li>
      <!-- Add your 5th food here -->
    </ul>

    <h2>How to Make Jollof Rice</h2>

    <!-- Ordered list — steps must be in order -->
    <ol>
      <li>
        Wash and soak the rice for 30 minutes
        <!-- Nested list for variations -->
        <ul>
          <li>Use long grain rice for best results</li>
          <li>Basmati also works well</li>
        </ul>
      </li>
      <li>Blend tomatoes, onions, and peppers</li>
      <li>Fry the blended tomato mixture in oil</li>
      <li>Add the rice and chicken stock</li>
      <li>Cook on low heat until rice is done</li>
    </ol>

  </body>
</html>`,
        quiz: [
          { q: "Which tag creates an unordered list?", options: ["<ol>", "<list>", "<ul>", "<li>"], answer: 2 },
          { q: "Which tag is used for each item in any list?", options: ["<item>", "<li>", "<list>", "<bullet>"], answer: 1 },
          { q: "When should you use an ordered list?", options: ["For navigation menus", "For a list of skills", "For step-by-step instructions", "For ingredient lists"], answer: 2 },
          { q: "How do you create a nested list?", options: ["Add indent attribute to li", "Put a ul or ol inside an li", "Use the nested tag", "Add class='nested' to ul"], answer: 1 },
        ],
      },
    },
    {
      order: 5,
      title: "HTML Forms",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Forms are how the web collects information from users. Every login page, every checkout form, every search bar, every contact form is built with HTML form elements. Understanding forms means understanding how users communicate with websites.

The form tag wraps everything. It has two important attributes: action tells the form where to send the data, and method tells it how to send it. GET puts the data in the URL — good for search forms. POST sends data invisibly in the request body — good for passwords and sensitive information.

Inside the form, you use input elements for most fields. The type attribute changes what the input does. Text gives a simple text box. Email validates that the user typed an email address. Password hides the text as dots. Number only accepts numbers. Checkbox gives a tick box. Radio gives a choice between options.

The label tag is not optional. Always pair each input with a label. The for attribute on the label should match the id attribute on the input — this connects them so clicking the label focuses the input. This is essential for mobile users and people using screen readers.

The textarea tag creates a multi-line text box — useful for messages and comments. Unlike input, it has a closing tag and the rows and cols attributes control its size.

The button tag with type="submit" sends the form. Always specify the type — without it, the browser guesses.

Think about building a Paystack payment form for a Ghanaian business. You would need: a text input for the customer name, an email input for the receipt, a number input for the amount, and a submit button. That is a real, functional form that processes payments.`,
        keyConcepts: [
          { code: "<form>", description: "wraps all form elements — has action and method" },
          { code: '<input type="text">', description: "single line text field" },
          { code: '<input type="email">', description: "email field with built-in validation" },
          { code: '<input type="password">', description: "password field — hides characters" },
          { code: "<textarea>", description: "multi-line text area for longer messages" },
          { code: "<label>", description: "labels an input — connect with for and id attributes" },
        ],
        exerciseDescription: "Build a contact form for a fictional Ghanaian business called 'Accra Eats'. The form should collect: customer name, email address, phone number, and a message. Use proper labels for every field. Add a submit button.",
        hint: "Connect each label to its input using matching for='fieldname' on label and id='fieldname' on input",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact Accra Eats</title>
  </head>
  <body>

    <h1>Contact Accra Eats</h1>
    <p>Fill in the form below and we will get back to you.</p>

    <form action="#" method="POST">

      <!-- Name field -->
      <label for="name">Full Name</label>
      <input type="text" id="name" name="name" placeholder="Kofi Mensah">

      <br><br>

      <!-- Email field -->
      <label for="email">Email Address</label>
      <input type="email" id="email" name="email" placeholder="kofi@example.com">

      <br><br>

      <!-- Phone field — add it here -->
      <label for="phone">Phone Number</label>
      <input type="tel" id="phone" name="phone" placeholder="+233 24 000 0000">

      <br><br>

      <!-- Message field -->
      <label for="message">Your Message</label>
      <br>
      <textarea id="message" name="message" rows="5" cols="40" placeholder="Tell us what you need..."></textarea>

      <br><br>

      <!-- Submit button -->
      <button type="submit">Send Message</button>

    </form>

  </body>
</html>`,
        quiz: [
          { q: "Which input type hides the text as dots while typing?", options: ["hidden", "secret", "password", "private"], answer: 2 },
          { q: "What attribute connects a label to its input?", options: ["name", "for and id", "class", "link"], answer: 1 },
          { q: "Which tag creates a multi-line text input?", options: ["<input>", "<textbox>", "<multiline>", "<textarea>"], answer: 3 },
          { q: "What does method='POST' do?", options: ["Sends data in the URL", "Sends data invisibly in the request body", "Deletes the form data", "Gets data from the server"], answer: 1 },
        ],
      },
    },
    {
      order: 6,
      title: "Introduction to CSS",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `CSS stands for Cascading Style Sheets. If HTML is the skeleton of a building, CSS is the paint, the furniture, and the lighting. It is what turns a plain document into a beautiful, professional-looking website.

CSS works by selecting HTML elements and applying style rules to them. The basic syntax is always the same: selector, then curly braces, then property and value pairs. The selector targets which elements to style. The property is what you want to change. The value is what you want to change it to.

There are three ways to add CSS. Inline styles go directly on an HTML element using the style attribute — quick but hard to maintain. Internal styles go in a style tag inside the head — fine for small pages. External stylesheets are separate .css files linked with a link tag — this is the professional approach for real projects because it keeps your HTML clean and lets you style the entire site from one file.

The cascade in Cascading Style Sheets means that styles flow down from parent elements to children. If you set the font on the body, all text inside inherits it unless overridden. More specific selectors override less specific ones. Styles that come later in the file override earlier ones.

Common properties every developer uses daily: color for text colour, background-color for backgrounds, font-size for text size, font-family for fonts, padding for space inside elements, margin for space outside elements, border for lines around elements, and width and height for sizing.

Colours in CSS can be written as colour names like "red", hexadecimal values like "#FF0000", or RGB values like "rgb(255, 0, 0)". Hex is most common in real projects.`,
        keyConcepts: [
          { code: "selector { }", description: "targets HTML elements to style" },
          { code: "color", description: "changes the text colour" },
          { code: "background-color", description: "changes the background colour" },
          { code: "font-size", description: "changes the text size — use px or rem" },
          { code: "padding", description: "space inside an element, between content and border" },
          { code: "margin", description: "space outside an element, between it and others" },
        ],
        exerciseDescription: "Style the HTML page provided. Change the body background to a dark colour. Style the h1 with a bright colour and larger font size. Add padding to the paragraphs. Give the page a max-width of 600px and center it using margin auto.",
        hint: "To center a block element: set a max-width then add margin: 0 auto — this splits the remaining space equally on both sides",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My Styled Page</title>
    <style>

      /* Reset default browser styles */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      /* Style the entire page */
      body {
        background-color: #0a0a0f;
        color: #f8fafc;
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      /* Style the main heading */
      h1 {
        color: #6366f1;
        font-size: 36px;
        margin-bottom: 16px;
      }

      /* Style paragraphs */
      p {
        font-size: 16px;
        line-height: 1.7;
        color: #94a3b8;
        margin-bottom: 12px;
        /* Add padding here */
      }

      /* Try styling the h2 yourself */
      h2 {

      }

    </style>
  </head>
  <body>
    <h1>Welcome to CodePath</h1>
    <h2>Learn to Build</h2>
    <p>This page is being styled with CSS. Every property you change appears instantly in the preview.</p>
    <p>CSS gives you complete control over how your HTML looks. Try changing the colors and sizes above.</p>
  </body>
</html>`,
        quiz: [
          { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Coded Style Sheets"], answer: 1 },
          { q: "Which CSS property changes the text colour?", options: ["text-color", "font-color", "color", "foreground"], answer: 2 },
          { q: "What is the best way to add CSS to a real project?", options: ["Inline styles on each element", "A style tag in the head", "An external .css file", "JavaScript"], answer: 2 },
          { q: "What does 'Cascading' mean in CSS?", options: ["Styles load one by one", "Styles flow from parent to child", "Styles are sorted alphabetically", "Styles only apply to one element"], answer: 1 },
        ],
      },
    },
    {
      order: 7,
      title: "CSS Selectors",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Selectors are how you target specific elements in CSS. Without good selectors, you either style everything the same or you repeat yourself constantly. Understanding selectors is what separates developers who guess from developers who know exactly what they are doing.

The element selector targets all elements of that type. Writing p styles every paragraph. Writing h2 styles every h2. This is the broadest selector — use it for base styles that should apply everywhere.

The class selector targets elements with a specific class attribute. Classes start with a dot in CSS. You can add the same class to multiple elements, and one element can have multiple classes. Classes are reusable — the power of CSS is writing one class and applying it to ten different elements instead of styling each individually.

The ID selector targets one specific element. IDs start with a hash in CSS. IDs must be unique — only one element on a page should have any given ID. Use IDs sparingly. They are hard to override because of their high specificity.

Specificity determines which style wins when multiple rules target the same element. ID selectors beat class selectors. Class selectors beat element selectors. Inline styles beat everything. Understanding this prevents a lot of confusion about why styles are not applying.

Combinators let you target elements based on their relationship to other elements. A space means "descendant" — .card p targets any p inside a .card. A > means "direct child" only. These are useful for targeting elements without adding extra classes.

Pseudo-classes target elements in a specific state. :hover applies when the mouse is over an element. :focus applies when an input is focused. :first-child targets the first child of a parent. These are what make interactive CSS possible.`,
        keyConcepts: [
          { code: "p { }", description: "element selector — targets all p elements" },
          { code: ".classname { }", description: "class selector — reusable, starts with a dot" },
          { code: "#idname { }", description: "ID selector — unique element, starts with hash" },
          { code: ".card p { }", description: "descendant selector — p inside .card" },
          { code: ":hover", description: "pseudo-class — styles element when mouse is over it" },
          { code: ":focus", description: "pseudo-class — styles input when it is focused" },
        ],
        exerciseDescription: "Style the provided HTML using selectors. Style all paragraphs with grey text. Create a class called 'highlight' with a yellow background and dark text. Create a class called 'btn' that looks like a button. Add a hover effect to the button. Give the main title an ID and style it with a gradient effect.",
        hint: "For hover effects: .btn:hover { background-color: darker-colour; } — the colon connects the pseudo-class directly to the selector",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Selectors</title>
    <style>

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 32px;
        max-width: 600px;
        margin: 0 auto;
      }

      /* Element selector — style all paragraphs */
      p {
        color: #94a3b8;
        line-height: 1.7;
        margin-bottom: 12px;
      }

      /* Class selector — highlighted text */
      .highlight {
        background-color: #fef08a;
        color: #1a1a2e;
        padding: 2px 6px;
        border-radius: 4px;
      }

      /* Class selector — button style */
      .btn {
        display: inline-block;
        background-color: #6366f1;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 14px;
        margin-top: 8px;
      }

      /* Hover effect — add this yourself */
      .btn:hover {

      }

      /* ID selector — the main title */
      #main-title {
        font-size: 32px;
        color: #a78bfa;
        margin-bottom: 16px;
      }

    </style>
  </head>
  <body>

    <h1 id="main-title">CodePath Ghana</h1>

    <p>This is a normal paragraph styled with the element selector.</p>
    <p>This paragraph has a <span class="highlight">highlighted word</span> using a class.</p>
    <p>Classes make your CSS reusable — write once, apply anywhere.</p>

    <button class="btn">Get Started</button>
    <button class="btn">Learn More</button>

  </body>
</html>`,
        quiz: [
          { q: "How do you write a class selector in CSS?", options: ["#classname", ".classname", "*classname", "@classname"], answer: 1 },
          { q: "How do you write an ID selector in CSS?", options: [".idname", "*idname", "#idname", "@idname"], answer: 2 },
          { q: "Which selector has the highest specificity?", options: ["Element selector", "Class selector", "ID selector", "Universal selector"], answer: 2 },
          { q: "What does the :hover pseudo-class do?", options: ["Styles element when clicked", "Styles element when mouse is over it", "Styles element when focused", "Styles the first element"], answer: 1 },
        ],
      },
    },
    {
      order: 8,
      title: "The CSS Box Model",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `The box model is one of the most important concepts in CSS. Every single element on a webpage — every heading, paragraph, image, button, and div — is a rectangular box. Understanding how that box works is what lets you control spacing precisely.

Each box has four layers. The innermost layer is the content — the actual text or image. Surrounding the content is padding — space between the content and the border. Then comes the border — a visible line you can style. Finally, the outermost layer is the margin — invisible space between this element and other elements.

Here is the key insight that confuses many beginners: by default, width and height only control the content area. If you set an element to width 200px and then add 20px of padding on each side, the total width becomes 240px. This breaks layouts.

The fix is box-sizing: border-box. This tells the browser to include padding and border inside the specified width. Set width 200px and the total size stays 200px — padding eats into the content area instead of expanding the box. Always use this. Put it in your CSS reset at the top of every project.

Margin has one very useful trick for centering: margin: 0 auto. Set a max-width on a block element and then margin: 0 auto, and the browser splits the remaining space equally on both sides, centering the element perfectly.

Padding and margin can be set on all four sides individually: top, right, bottom, left. The shorthand goes clockwise: padding: top right bottom left. Two values mean top/bottom and left/right. One value applies to all sides.`,
        keyConcepts: [
          { code: "content", description: "innermost layer — the actual text or image" },
          { code: "padding", description: "space between content and border — inside the element" },
          { code: "border", description: "visible line around the element" },
          { code: "margin", description: "space outside the element — between it and neighbours" },
          { code: "box-sizing: border-box", description: "makes padding included in width/height" },
          { code: "margin: 0 auto", description: "centers a block element horizontally" },
        ],
        exerciseDescription: "Build a profile card using the box model. The card should have a background colour, a border, padding inside, and a margin to separate it from other cards. Use border-radius to round the corners. Use box-shadow to add depth. Center the card on the page.",
        hint: "box-shadow: 0 4px 20px rgba(0,0,0,0.3) adds a subtle shadow below the card. The four values are: x-offset y-offset blur-radius colour",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Profile Card</title>
    <style>

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background: #0a0a0f;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-family: Arial, sans-serif;
      }

      /* The card */
      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 32px;
        width: 320px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        text-align: center;
      }

      /* Avatar circle */
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #6366f1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        color: white;
        margin: 0 auto 16px;
      }

      .card h2 {
        color: #f8fafc;
        margin-bottom: 4px;
      }

      .card p {
        color: #94a3b8;
        font-size: 14px;
        margin-bottom: 20px;
      }

      /* Skills list */
      .skills {
        display: flex;
        gap: 8px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .skill {
        background: rgba(99,102,241,0.15);
        border: 1px solid rgba(99,102,241,0.3);
        color: #a78bfa;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
      }

    </style>
  </head>
  <body>

    <div class="card">
      <div class="avatar">K</div>
      <h2>Kofi Mensah</h2>
      <p>Frontend Developer · Accra, Ghana</p>
      <div class="skills">
        <span class="skill">HTML</span>
        <span class="skill">CSS</span>
        <span class="skill">JavaScript</span>
      </div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What is the correct order of the box model from inside to outside?", options: ["Margin → Border → Padding → Content", "Content → Padding → Border → Margin", "Padding → Content → Margin → Border", "Border → Content → Padding → Margin"], answer: 1 },
          { q: "What does box-sizing: border-box do?", options: ["Adds a box shadow", "Makes padding and border included in width", "Creates a visible border", "Centers the element"], answer: 1 },
          { q: "Which property adds space inside an element?", options: ["margin", "spacing", "padding", "border"], answer: 2 },
          { q: "How do you center a block element horizontally with CSS?", options: ["text-align: center", "margin: 0 auto with a set width", "padding: auto", "align: center"], answer: 1 },
        ],
      },
    },
    {
      order: 9,
      title: "CSS Flexbox",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Flexbox is a layout system that makes it easy to arrange elements in a row or column and control exactly how they are aligned and spaced. Before flexbox, developers used floats and positioning hacks that were fragile and hard to understand. Flexbox changed everything.

To activate flexbox, you add display: flex to a parent element. That parent becomes the flex container. Its direct children become flex items. The children are now arranged in a row by default.

The main axis is the primary direction of layout. By default it runs horizontally — left to right. justify-content controls alignment along the main axis. flex-start puts items at the start, flex-end at the end, center in the middle, space-between puts equal space between items, and space-around adds space around each item.

The cross axis runs perpendicular to the main axis — vertically by default. align-items controls alignment along the cross axis. stretch makes items fill the full height of the container (default). center vertically centres them. flex-start and flex-end align to top or bottom.

flex-direction changes the main axis. row is horizontal (default). column makes it vertical — items stack on top of each other. This is how you build a sidebar layout or a vertical form.

The gap property adds space between flex items without using margin hacks. This is the cleanest way to space items.

Flex items can grow and shrink. The flex property shorthand controls this. flex: 1 tells an item to grow and fill available space. flex: 2 on one item and flex: 1 on another makes the first take twice the space.

Flexbox is used for navigation bars, card grids, centering content on screen, building sidebars, and almost any two-dimensional layout you can imagine.`,
        keyConcepts: [
          { code: "display: flex", description: "activates flexbox on the parent container" },
          { code: "flex-direction", description: "row (default) or column — sets the main axis" },
          { code: "justify-content", description: "aligns items along the main axis" },
          { code: "align-items", description: "aligns items along the cross axis" },
          { code: "gap", description: "space between flex items — cleaner than margin" },
          { code: "flex: 1", description: "makes an item grow to fill available space" },
        ],
        exerciseDescription: "Fix the layout below using flexbox. The navigation bar needs the logo on the left and links on the right. The card grid needs cards side by side with equal spacing. Change display: block to display: flex on the correct elements and add the right justify-content and align-items values.",
        hint: "For the nav: display flex + justify-content space-between + align-items center. For the cards: display flex + gap between cards",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Flexbox Layout</title>
    <style>

      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: Arial, sans-serif; background: #0a0a0f; color: #f8fafc; padding: 24px; }

      /* CHALLENGE 1: Make this a flex row with logo left, links right */
      .nav {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px 24px;
        margin-bottom: 24px;
        display: block; /* Change this to flex */
        /* Add justify-content and align-items here */
      }

      .nav-logo {
        font-weight: bold;
        font-size: 18px;
        color: #a78bfa;
      }

      .nav-links {
        display: flex;
        gap: 24px;
      }

      .nav-links a {
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
      }

      /* CHALLENGE 2: Make these cards sit side by side */
      .cards {
        display: block; /* Change this to flex */
        /* Add gap here */
      }

      .card {
        flex: 1;
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
        text-align: center;
        margin-bottom: 16px; /* Remove this once flex is working */
      }

      .card h3 { color: #6366f1; font-size: 20px; margin-bottom: 8px; }
      .card p { color: #94a3b8; font-size: 14px; }

    </style>
  </head>
  <body>

    <nav class="nav">
      <span class="nav-logo">CodePath</span>
      <div class="nav-links">
        <a href="#">Dashboard</a>
        <a href="#">Lessons</a>
        <a href="#">Profile</a>
      </div>
    </nav>

    <div class="cards">
      <div class="card">
        <h3>HTML</h3>
        <p>Structure and content</p>
      </div>
      <div class="card">
        <h3>CSS</h3>
        <p>Style and layout</p>
      </div>
      <div class="card">
        <h3>JavaScript</h3>
        <p>Logic and interaction</p>
      </div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "Which property activates flexbox on a container?", options: ["flex: true", "display: flex", "layout: flex", "position: flex"], answer: 1 },
          { q: "Which property aligns items along the main axis?", options: ["align-items", "flex-align", "justify-content", "content-align"], answer: 2 },
          { q: "What does flex-direction: column do?", options: ["Makes items go left to right", "Makes items stack vertically", "Makes items wrap to next line", "Centers all items"], answer: 1 },
          { q: "What does flex: 1 do on a flex item?", options: ["Sets the font size to 1px", "Makes the item grow to fill space", "Centers the item", "Adds 1px margin"], answer: 1 },
        ],
      },
    },
    {
      order: 10,
      title: "Building a Real Page",
      xpValue: 100,
      isFree: false,
      content: {
        concept: `You have reached the final lesson of the HTML & CSS Foundation track. Everything you have learned — HTML structure, headings, paragraphs, links, images, lists, forms, CSS selectors, the box model, and flexbox — comes together in this lesson to build something real.

The project is a developer profile page. This is one of the most important pages any developer can have. It is your digital handshake — the first thing a potential employer, client, or collaborator sees. A well-built profile page has landed many developers their first job.

A great developer profile has clear structure: your name and title at the top (this is your h1), a short bio that explains who you are and what you do, a skills section that shows what technologies you know, links to your GitHub and LinkedIn profiles, and a contact form so people can reach you.

The design should be clean and professional. Use a dark background with light text if you prefer a modern look, or light background with dark text for a classic look. Stick to a simple colour palette — one accent colour for buttons and highlights, neutral colours for everything else.

This page is your Project 1 submission. When you submit, the AI reviewer will check that you have included all the required elements, that your HTML is properly structured, and that your CSS makes the page look professional. If it does not pass, you get detailed feedback and can resubmit as many times as you need.

Once you pass, you earn the HTML & CSS Foundation certificate — a verifiable credential that proves you built a real project, not just watched videos.`,
        keyConcepts: [
          { code: "semantic HTML", description: "use the right tag for the right content" },
          { code: "CSS reset", description: "* { box-sizing: border-box; margin: 0; padding: 0; }" },
          { code: "responsive design", description: "max-width + padding makes pages look good on mobile" },
          { code: "colour palette", description: "pick 2-3 colours — one accent, one background, one text" },
          { code: "visual hierarchy", description: "large headings, medium subheadings, small body text" },
        ],
        exerciseDescription: "Build your complete developer profile page in the editor. Include: your name as h1, a short bio, a skills list, links to GitHub and LinkedIn, and a contact form. Style everything with CSS — background colour, font sizes, padding, and flexbox for layout. This is your submission for Project 1.",
        hint: "Start with HTML structure first, then add CSS. Get everything showing before you worry about making it look good.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Developer Profile</title>
    <style>

      /* ── Reset ── */
      * { box-sizing: border-box; margin: 0; padding: 0; }

      /* ── Base ── */
      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        line-height: 1.7;
      }

      /* ── Container ── */
      .container {
        max-width: 720px;
        margin: 0 auto;
        padding: 48px 24px;
      }

      /* ── Header section ── */
      .header {
        display: flex;
        align-items: center;
        gap: 24px;
        margin-bottom: 48px;
      }

      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #6366f1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 32px;
        font-weight: bold;
        flex-shrink: 0;
      }

      h1 {
        font-size: 32px;
        color: #f8fafc;
        margin-bottom: 4px;
      }

      .subtitle {
        color: #94a3b8;
        font-size: 16px;
      }

      /* ── Section ── */
      section {
        margin-bottom: 48px;
      }

      h2 {
        font-size: 20px;
        color: #a78bfa;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
      }

      p { color: #94a3b8; margin-bottom: 12px; }

      /* ── Skills ── */
      .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .skill {
        background: rgba(99,102,241,0.15);
        border: 1px solid rgba(99,102,241,0.3);
        color: #a78bfa;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 14px;
      }

      /* ── Links ── */
      .links { display: flex; gap: 16px; }

      .link-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: #f8fafc;
        padding: 10px 20px;
        border-radius: 8px;
        text-decoration: none;
        font-size: 14px;
      }

      /* ── Form ── */
      label {
        display: block;
        font-size: 12px;
        color: #94a3b8;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }

      input, textarea {
        width: 100%;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        padding: 12px;
        color: #f8fafc;
        font-size: 14px;
        margin-bottom: 16px;
        font-family: Arial, sans-serif;
      }

      button {
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 8px;
        padding: 12px 28px;
        font-size: 14px;
        cursor: pointer;
      }

    </style>
  </head>
  <body>
    <div class="container">

      <!-- Header -->
      <div class="header">
        <div class="avatar">K</div>
        <div>
          <h1>Kofi Mensah</h1>
          <p class="subtitle">Frontend Developer · Accra, Ghana</p>
        </div>
      </div>

      <!-- About -->
      <section>
        <h2>About Me</h2>
        <p>I am a frontend developer based in Accra, Ghana. I build websites and web applications using HTML, CSS, and JavaScript. I am passionate about creating digital products that solve real problems for people across Africa.</p>
        <p>Currently learning through CodePath and working toward my first freelance client.</p>
      </section>

      <!-- Skills -->
      <section>
        <h2>Skills</h2>
        <div class="skills">
          <span class="skill">HTML</span>
          <span class="skill">CSS</span>
          <span class="skill">Flexbox</span>
          <span class="skill">Responsive Design</span>
          <span class="skill">Git</span>
        </div>
      </section>

      <!-- Links -->
      <section>
        <h2>Find Me Online</h2>
        <div class="links">
          <a class="link-btn" href="https://github.com" target="_blank" rel="noopener">GitHub</a>
          <a class="link-btn" href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </section>

      <!-- Contact -->
      <section>
        <h2>Contact Me</h2>
        <form action="#" method="POST">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="Ama Owusu">

          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="ama@example.com">

          <label for="message">Message</label>
          <textarea id="message" name="message" rows="5" placeholder="I would like to work with you on..."></textarea>

          <button type="submit">Send Message</button>
        </form>
      </section>

    </div>
  </body>
</html>`,
        quiz: [
          { q: "What makes a certificate from CodePath credible?", options: ["It is accredited by government", "Students must build real projects to earn it", "It is free to get", "It has a gold stamp"], answer: 1 },
          { q: "What does max-width: 720px do on a container?", options: ["Sets the minimum width", "Prevents the container from growing wider than 720px", "Makes it exactly 720px always", "Hides content beyond 720px"], answer: 1 },
          { q: "Which CSS property makes a container's children line up in a row?", options: ["position: row", "flex-direction: horizontal", "display: flex", "layout: inline"], answer: 2 },
          { q: "What should you always add to external links for security?", options: ["type='external'", "rel='noopener'", "secure='true'", "target='safe'"], answer: 1 },
        ],
      },
    },
  ];

  await prisma.lesson.deleteMany({ where: { trackId: track.id } });

  for (const lesson of lessons) {
    await prisma.lesson.create({
      data: {
        ...lesson,
        trackId: track.id,
      },
    });
    console.log(`✅ Lesson ${lesson.order}: ${lesson.title}`);
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });