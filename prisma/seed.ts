import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Track ──
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

  // ── Lessons ──
  const lessons = [
    {
      order: 1,
      title: "Introduction to HTML",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `HTML (HyperText Markup Language) is the backbone of every website you see on the internet. It gives structure and meaning to content.

Think of HTML like the skeleton of a building — it holds everything together and tells the browser what each piece of content is: a heading, a paragraph, a button, an image.

Every HTML document follows this basic structure:

- <!DOCTYPE html> — tells the browser this is an HTML5 document
- <html> — the root element that wraps everything
- <head> — contains metadata (title, fonts, styles)
- <body> — contains everything the user sees

HTML uses tags — keywords wrapped in angle brackets like <p> for paragraph and <h1> for heading. Most tags have an opening tag and a closing tag.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <!-- Add an h1 heading with your name -->
    <!-- Add a paragraph about why you want to learn coding -->

  </body>
</html>`,
        quiz: [
          { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "HyperText Modern Links", "Home Tool Markup Language"], answer: 0 },
          { q: "Which tag is used for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: 2 },
          { q: "What goes inside the <body> tag?", options: ["Metadata", "Fonts and styles", "Everything the user sees", "The page title"], answer: 2 },
        ],
      },
    },
    {
      order: 2,
      title: "HTML Headings and Paragraphs",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `HTML has six levels of headings, from h1 to h6. h1 is the most important and largest. h6 is the smallest. You should only have one h1 per page — it tells search engines what the page is about.

Paragraphs are created with the <p> tag. Every paragraph is a block of text with space above and below it.

- <h1> — main page heading
- <h2> — section heading
- <h3> — subsection heading
- <p> — paragraph of text
- <br> — line break (no closing tag needed)

Good structure matters. A well-structured page is easier for both users and search engines to understand. In Ghana, where mobile data costs money, a clean and fast page makes a real difference.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My Profile</title>
  </head>
  <body>
    <!-- Create a page about yourself -->
    <!-- Use h1 for your name -->
    <!-- Use h2 for "About Me" and "My Goals" sections -->
    <!-- Use p tags for your content -->

  </body>
</html>`,
        quiz: [
          { q: "How many h1 tags should a page have?", options: ["As many as needed", "Only one", "At least three", "Two"], answer: 1 },
          { q: "Which tag creates a paragraph?", options: ["<text>", "<para>", "<p>", "<pg>"], answer: 2 },
          { q: "What does <br> do?", options: ["Bold text", "Line break", "New paragraph", "Border"], answer: 1 },
        ],
      },
    },
    {
      order: 3,
      title: "Links and Images",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `Links and images make the web interactive and visual. Without them, every page would just be plain text.

Links use the <a> tag with an href attribute pointing to the destination URL. The text between the tags is what users click.

Images use the <img> tag with a src attribute pointing to the image file. Always add an alt attribute describing the image — this helps visually impaired users and improves SEO.

- <a href="url">Link text</a> — creates a clickable link
- <a href="url" target="_blank"> — opens link in new tab
- <img src="image.jpg" alt="description"> — displays an image
- Images are self-closing — no closing tag needed

Think about local context: if you are building a site for a Ghanaian business, you would link to their social media pages and show photos of their products.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Links and Images</title>
  </head>
  <body>
    <h1>My Favourite Websites</h1>

    <!-- Create 3 links to websites you use -->
    <!-- Add an image from the web using a URL -->
    <!-- Make sure to add alt text to your image -->

  </body>
</html>`,
        quiz: [
          { q: "Which attribute defines where a link goes?", options: ["src", "href", "link", "url"], answer: 1 },
          { q: "What does target='_blank' do?", options: ["Opens in same tab", "Opens in new tab", "Downloads the file", "Closes the tab"], answer: 1 },
          { q: "Why should you add alt text to images?", options: ["To make them bigger", "For accessibility and SEO", "To add a border", "It is required by law"], answer: 1 },
        ],
      },
    },
    {
      order: 4,
      title: "Lists in HTML",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Lists are everywhere on the web — navigation menus, product features, step-by-step instructions. HTML has two main types of lists.

Unordered lists use bullet points. Ordered lists use numbers. Both use <li> for each list item.

- <ul> — unordered list (bullet points)
- <ol> — ordered list (numbered)
- <li> — list item (used inside both ul and ol)
- Lists can be nested — a list inside a list

Real world example: A menu for a Ghanaian restaurant would use an unordered list for food categories and an ordered list for a recipe's steps.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Lists</title>
  </head>
  <body>
    <h1>My Favourite Foods</h1>
    <!-- Create an unordered list of 5 Ghanaian foods -->

    <h2>How to Make Jollof Rice</h2>
    <!-- Create an ordered list with at least 5 steps -->

  </body>
</html>`,
        quiz: [
          { q: "Which tag creates an unordered list?", options: ["<ol>", "<list>", "<ul>", "<li>"], answer: 2 },
          { q: "Which tag is used for each item in a list?", options: ["<item>", "<li>", "<list>", "<bullet>"], answer: 1 },
          { q: "What type of list would you use for a recipe's steps?", options: ["Unordered list", "Ordered list", "Description list", "Any list"], answer: 1 },
        ],
      },
    },
    {
      order: 5,
      title: "HTML Forms",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Forms are how websites collect information from users — login forms, sign up forms, contact forms, payment forms. Every app you use has forms.

The <form> tag wraps all the form elements. The action attribute tells the form where to send the data. The method attribute is usually GET or POST.

- <input type="text"> — single line text field
- <input type="email"> — email field with validation
- <input type="password"> — password field (hides text)
- <input type="checkbox"> — checkbox
- <textarea> — multi-line text area
- <button type="submit"> — submit button
- <label> — label for an input field

Always use <label> with your inputs — it improves accessibility and makes forms easier to use on mobile. In Ghana where most users are on phones, this matters a lot.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Contact Form</title>
  </head>
  <body>
    <h1>Contact Us</h1>
    <!-- Build a contact form with: -->
    <!-- Name field (text) -->
    <!-- Email field (email) -->
    <!-- Message field (textarea) -->
    <!-- Submit button -->
    <!-- Use label tags for each field -->

  </body>
</html>`,
        quiz: [
          { q: "Which input type hides the text as you type?", options: ["hidden", "secret", "password", "private"], answer: 2 },
          { q: "What tag is used for a multi-line text input?", options: ["<input>", "<textbox>", "<multiline>", "<textarea>"], answer: 3 },
          { q: "Why should you use label tags with inputs?", options: ["To make them bigger", "For styling only", "For accessibility and usability", "They are required"], answer: 2 },
        ],
      },
    },
    {
      order: 6,
      title: "Introduction to CSS",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `CSS (Cascading Style Sheets) is what makes websites look good. HTML gives structure. CSS gives style — colours, fonts, spacing, layouts.

You can add CSS in three ways. Inline styles go directly on an element. Internal styles go in a <style> tag in the <head>. External stylesheets are separate .css files linked to your HTML. External is the best approach for real projects.

CSS works by selecting elements and applying rules to them:

- selector { property: value; }
- color — text colour
- background-color — background colour
- font-size — text size
- font-family — font type
- padding — space inside an element
- margin — space outside an element

Think of CSS like the paint and decoration of a building. Without it, the building (HTML) is just plain concrete.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>My Styled Page</title>
    <style>
      /* Style the body with a background colour */
      /* Style the h1 with a colour and font size */
      /* Add padding to the paragraphs */
      /* Give the page a max-width and center it */

      body {

      }

      h1 {

      }

      p {

      }
    </style>
  </head>
  <body>
    <h1>Welcome to My Page</h1>
    <p>This page is styled with CSS.</p>
    <p>CSS makes everything look better.</p>
  </body>
</html>`,
        quiz: [
          { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style System", "Coded Style Sheets"], answer: 1 },
          { q: "Which CSS property changes text colour?", options: ["text-color", "font-color", "color", "foreground"], answer: 2 },
          { q: "What is the best way to add CSS to a real project?", options: ["Inline styles", "Style tag in head", "External stylesheet", "JavaScript"], answer: 2 },
        ],
      },
    },
    {
      order: 7,
      title: "CSS Selectors and Properties",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `CSS selectors let you target specific elements on your page. The more specific your selector, the more control you have over your styles.

The three main selectors are element selectors, class selectors, and ID selectors.

- p { } — targets all paragraph elements
- .classname { } — targets elements with that class
- #idname { } — targets the element with that ID
- Classes start with a dot, IDs start with a hash
- You can add multiple classes to one element
- IDs should be unique — only one per page

Common properties to know:

- width and height — size of elements
- border — adds a border around elements
- border-radius — rounds the corners
- text-align — aligns text left, center, or right
- font-weight — bold or normal text`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Selectors</title>
    <style>
      /* Style all paragraphs to have grey text */

      /* Create a class called 'highlight' with a yellow background */

      /* Create an ID called 'main-title' with large purple text */

    </style>
  </head>
  <body>
    <h1 id="main-title">CodePath Ghana</h1>
    <p>This is a normal paragraph.</p>
    <p class="highlight">This paragraph is highlighted.</p>
    <p>Another normal paragraph.</p>
  </body>
</html>`,
        quiz: [
          { q: "How do you select an element by class in CSS?", options: ["#classname", ".classname", "*classname", "@classname"], answer: 1 },
          { q: "How do you select an element by ID in CSS?", options: [".idname", "*idname", "#idname", "@idname"], answer: 2 },
          { q: "Which property rounds the corners of an element?", options: ["corner-radius", "round-border", "border-radius", "border-round"], answer: 2 },
        ],
      },
    },
    {
      order: 8,
      title: "The CSS Box Model",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Every element on a webpage is a box. Understanding the CSS box model is one of the most important skills in web development. It explains how spacing works around every element.

The box model has four parts from inside to outside:

- Content — the actual text or image inside the element
- Padding — space between the content and the border
- Border — the line around the element
- Margin — space between this element and other elements

Think of it like packaging: the content is the product, padding is the bubble wrap, border is the box, and margin is the space on the shelf between boxes.

Key properties:

- padding: 10px — same on all sides
- padding: 10px 20px — top/bottom, left/right
- margin: 0 auto — centers a block element horizontally
- box-sizing: border-box — makes sizing more predictable`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Box Model</title>
    <style>
      .card {
        /* Add: width, background-color, border, padding, margin */
        /* Try: border-radius to round the corners */
        /* Try: box-shadow for a shadow effect */

      }
    </style>
  </head>
  <body>
    <div class="card">
      <h2>Kofi Mensah</h2>
      <p>Full Stack Developer</p>
      <p>Accra, Ghana</p>
    </div>
  </body>
</html>`,
        quiz: [
          { q: "What is the order of the box model from inside to outside?", options: ["Margin, Border, Padding, Content", "Content, Padding, Border, Margin", "Padding, Content, Margin, Border", "Border, Content, Padding, Margin"], answer: 1 },
          { q: "Which property adds space inside an element?", options: ["margin", "spacing", "padding", "border"], answer: 2 },
          { q: "How do you center a block element horizontally?", options: ["text-align: center", "margin: 0 auto", "padding: auto", "align: center"], answer: 1 },
        ],
      },
    },
    {
      order: 9,
      title: "CSS Flexbox",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Flexbox is a CSS layout system that makes it easy to align and distribute elements in a row or column. Before flexbox, centering elements was surprisingly difficult. Now it takes one line.

To use flexbox, add display: flex to the parent container. The children automatically become flex items.

Key flexbox properties on the parent:

- display: flex — activates flexbox
- flex-direction: row — items side by side (default)
- flex-direction: column — items stacked vertically
- justify-content: center — centers items horizontally
- justify-content: space-between — spreads items out
- align-items: center — centers items vertically
- gap: 16px — space between items

Flexbox is used everywhere — navigation bars, card grids, centering content on screen. Almost every modern website uses it.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Flexbox Layout</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: sans-serif; padding: 20px; }

      .nav {
        /* Make this a flexbox row */
        /* Space between the logo and links */
        /* Align items vertically in center */
        background: #1a1a2e;
        padding: 16px 24px;
        border-radius: 8px;
        margin-bottom: 24px;
      }

      .cards {
        /* Make this a flexbox row */
        /* Add a gap between cards */

      }

      .card {
        flex: 1;
        background: #f8f9fa;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <nav class="nav">
      <span style="color:white;font-weight:bold">CodePath</span>
      <span style="color:#94a3b8">Dashboard · Lessons · Profile</span>
    </nav>
    <div class="cards">
      <div class="card"><h3>HTML</h3><p>Structure</p></div>
      <div class="card"><h3>CSS</h3><p>Style</p></div>
      <div class="card"><h3>JS</h3><p>Logic</p></div>
    </div>
  </body>
</html>`,
        quiz: [
          { q: "Which property activates flexbox on a container?", options: ["flex: true", "display: flex", "layout: flex", "position: flex"], answer: 1 },
          { q: "Which property spaces flex items evenly?", options: ["align-items: space", "justify-content: space-between", "flex: even", "gap: auto"], answer: 1 },
          { q: "Which property stacks flex items vertically?", options: ["flex-direction: vertical", "flex-direction: column", "flex-flow: down", "align: column"], answer: 1 },
        ],
      },
    },
    {
      order: 10,
      title: "Building a Real Page",
      xpValue: 100,
      isFree: false,
      content: {
        concept: `You have now learned the core building blocks of HTML and CSS. In this lesson you will put everything together to build a real webpage — a profile page for a Ghanaian developer.

This is what you have learned so far:

- HTML structure — DOCTYPE, html, head, body
- Headings and paragraphs — h1 to h6, p
- Links and images — a, img
- Lists — ul, ol, li
- Forms — form, input, textarea, button
- CSS basics — selectors, properties, values
- CSS box model — content, padding, border, margin
- Flexbox — display flex, justify-content, align-items

A good developer page has:
- Your name and title as the heading
- A short bio paragraph
- Your skills as a list
- Links to your GitHub and LinkedIn
- A contact form
- Clean, consistent styling

This is your Project 1 checkpoint. After completing this lesson you will submit your developer profile page for AI review.`,
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Developer Profile</title>
    <style>
      /* Your styles here */
      /* Use everything you have learned */
      /* Make it look professional */

      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: sans-serif;
        background: #f8f9fa;
        color: #1a1a2e;
        padding: 40px 20px;
        max-width: 700px;
        margin: 0 auto;
      }

    </style>
  </head>
  <body>
    <!-- Build your complete developer profile page -->
    <!-- Include: name, bio, skills list, links, contact form -->
    <!-- Style everything with CSS -->

  </body>
</html>`,
        quiz: [
          { q: "Which CSS property controls space between flex items?", options: ["spacing", "gap", "margin-between", "flex-gap"], answer: 1 },
          { q: "What does max-width do?", options: ["Sets minimum width", "Prevents element from growing beyond a size", "Makes element full width", "Hides overflow"], answer: 1 },
          { q: "What is the purpose of box-sizing: border-box?", options: ["Adds a box shadow", "Makes padding included in width calculation", "Creates a border", "Centers the box"], answer: 1 },
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