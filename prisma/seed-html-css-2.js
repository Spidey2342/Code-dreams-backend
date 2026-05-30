const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding HTML & CSS lessons 11-18...");

  const track = await prisma.track.findUnique({ where: { slug: "html-css" } });
  if (!track) { console.error("Track not found"); return; }

  const lessons = [
    {
      order: 11,
      title: "CSS Transitions and Hover Effects",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `CSS transitions let you animate changes between two states smoothly. Without transitions, changes happen instantly — a button colour change, a box growing larger, an element moving. With transitions, the change happens gradually over a set duration.

The transition property goes on the element you want to animate. It takes four values: the property to animate, the duration, the timing function, and the delay.

The most common use is on hover effects. When a user hovers over a button, the background colour changes. Without transition it snaps. With transition: background-color 0.3s ease it fades smoothly.

You can transition almost any CSS property that has numeric values — colour, size, position, opacity, border-radius. Properties like display cannot be transitioned.

The timing function controls the acceleration. ease starts slow, speeds up, then slows down at the end — the most natural feeling. linear moves at constant speed. ease-in starts slow then speeds up. ease-out starts fast then slows down.

Transform is one of the most powerful properties to transition. translateX and translateY move elements. scale makes them bigger or smaller. rotate spins them. These run on the GPU so they are smooth even on mobile.

Hover effects make interfaces feel alive and responsive. They give users feedback that elements are interactive. Every button, link, and card on a professional website has a hover effect.`,
        keyConcepts: [
          { code: "transition: all 0.3s ease", description: "animates all property changes over 0.3 seconds" },
          { code: "transition: color 0.2s", description: "only animates the color property" },
          { code: "transform: translateY(-4px)", description: "moves element 4px upward" },
          { code: "transform: scale(1.05)", description: "makes element 5% larger" },
          { code: ":hover", description: "applies styles when mouse is over the element" },
          { code: "opacity", description: "controls transparency — 0 is invisible, 1 is fully visible" },
        ],
        exerciseDescription: "Build a card component with hover effects. The card should lift up when hovered, the button should change colour smoothly, and an overlay should fade in over the image. Use transition on every interactive element.",
        hint: "Add transition to the base state, not the hover state. The transition property tells the browser how to animate the change both ways.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Transitions and Hover Effects</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        gap: 24px;
        flex-wrap: wrap;
        padding: 24px;
      }

      /* Card with lift effect */
      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 16px;
        padding: 24px;
        width: 260px;
        /* Add transition here */
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
      }

      .card:hover {
        /* Lift the card up */
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
      }

      .card h3 {
        color: #f8fafc;
        margin-bottom: 8px;
        font-size: 18px;
      }

      .card p {
        color: #94a3b8;
        font-size: 14px;
        margin-bottom: 20px;
        line-height: 1.6;
      }

      /* Button with colour transition */
      .btn {
        display: inline-block;
        background: #6366f1;
        color: white;
        padding: 10px 20px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        /* Add transition here */
        transition: background 0.2s ease, transform 0.1s ease;
        width: 100%;
      }

      .btn:hover {
        background: #4f46e5;
        transform: scale(0.98);
      }

      /* Fade in effect */
      .fade-box {
        width: 260px;
        height: 160px;
        background: linear-gradient(135deg, #6366f1, #a78bfa);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      .fade-box span {
        color: white;
        font-size: 18px;
        font-weight: bold;
        z-index: 1;
      }

      .fade-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        /* Start invisible */
        opacity: 0;
        transition: opacity 0.3s ease;
        border-radius: 16px;
      }

      .fade-box:hover .fade-overlay {
        opacity: 1;
      }

    </style>
  </head>
  <body>

    <!-- Card with lift on hover -->
    <div class="card">
      <h3>Kofi Mensah</h3>
      <p>Frontend Developer based in Accra, Ghana. Building for Africa.</p>
      <button class="btn">View Profile</button>
    </div>

    <!-- Fade overlay on hover -->
    <div class="fade-box">
      <span>Hover over me</span>
      <div class="fade-overlay">Click to view ✨</div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "Where should you put the transition property?", options: ["On the :hover selector", "On the base element style", "In the body tag", "On the parent element"], answer: 1 },
          { q: "What does transform: translateY(-8px) do?", options: ["Moves element 8px to the right", "Moves element 8px upward", "Rotates element 8 degrees", "Makes element 8% smaller"], answer: 1 },
          { q: "Which timing function feels most natural?", options: ["linear", "ease-in", "ease", "step-start"], answer: 2 },
          { q: "What does opacity: 0 do?", options: ["Deletes the element", "Makes element invisible but still takes space", "Removes element from layout", "Makes element transparent to clicks"], answer: 1 },
        ],
      },
    },
    {
      order: 12,
      title: "CSS Grid Layout",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `CSS Grid is a two-dimensional layout system. While Flexbox works in one direction — either a row or a column — Grid works in both directions simultaneously. This makes it perfect for building full page layouts, card grids, and complex UI structures.

To activate Grid, add display: grid to a container. Then define your columns with grid-template-columns and your rows with grid-template-rows.

The repeat() function saves you from writing the same value multiple times. repeat(3, 1fr) creates three equal columns. The fr unit stands for fraction — it divides available space proportionally. 1fr 2fr 1fr creates three columns where the middle one is twice as wide as the others.

The gap property adds space between grid cells — both rows and columns. You can set them separately with row-gap and column-gap.

Grid items can span multiple columns or rows using grid-column and grid-row. grid-column: 1 / 3 makes an item start at column line 1 and end at column line 3 — spanning two columns.

The auto-fill and auto-fit keywords create responsive grids without media queries. repeat(auto-fill, minmax(250px, 1fr)) creates as many columns as fit, each at least 250px wide. When the screen shrinks, columns wrap automatically.

Grid areas let you name sections of your layout and place items by name — like a blueprint. This makes complex layouts readable and maintainable.

Grid is what replaced all the old float-based layout hacks. Every modern dashboard, news site, and e-commerce grid is built with CSS Grid.`,
        keyConcepts: [
          { code: "display: grid", description: "activates CSS Grid on the container" },
          { code: "grid-template-columns", description: "defines the number and size of columns" },
          { code: "repeat(3, 1fr)", description: "creates 3 equal columns using fraction units" },
          { code: "gap: 16px", description: "space between all grid cells" },
          { code: "grid-column: 1 / 3", description: "makes item span from column line 1 to 3" },
          { code: "minmax(250px, 1fr)", description: "column is at least 250px but grows to fill space" },
        ],
        exerciseDescription: "Build a dashboard layout using CSS Grid. Create a header that spans the full width, a sidebar on the left, a main content area, and a footer. Then build a card grid below that automatically wraps based on screen size.",
        hint: "For a full-width header: grid-column: 1 / -1 spans from the first line to the last line regardless of how many columns you have.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Grid Layout</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        min-height: 100vh;
        padding: 16px;
      }

      /* ── Main dashboard grid ── */
      .dashboard {
        display: grid;
        grid-template-columns: 220px 1fr;
        grid-template-rows: 60px 1fr 50px;
        gap: 12px;
        height: calc(100vh - 32px);
      }

      /* Header spans both columns */
      .header {
        grid-column: 1 / -1;
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-weight: bold;
        font-size: 18px;
        color: #a78bfa;
      }

      .sidebar {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px;
      }

      .sidebar p {
        color: #94a3b8;
        font-size: 13px;
        margin-bottom: 12px;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
      }

      .sidebar p:hover { background: rgba(255,255,255,0.05); }

      .main {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
        overflow-y: auto;
      }

      /* Footer spans both columns */
      .footer {
        grid-column: 1 / -1;
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #475569;
        font-size: 13px;
      }

      /* ── Card grid inside main ── */
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 12px;
        margin-top: 16px;
      }

      .stat-card {
        background: rgba(99,102,241,0.1);
        border: 1px solid rgba(99,102,241,0.2);
        border-radius: 10px;
        padding: 16px;
        text-align: center;
      }

      .stat-card .value {
        font-size: 24px;
        font-weight: bold;
        color: #a78bfa;
        margin-bottom: 4px;
      }

      .stat-card .label {
        font-size: 11px;
        color: #475569;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      /* Wide card spanning 2 columns */
      .wide-card {
        grid-column: span 2;
        background: rgba(16,185,129,0.08);
        border: 1px solid rgba(16,185,129,0.2);
        border-radius: 10px;
        padding: 16px;
        color: #10b981;
        font-size: 14px;
      }

    </style>
  </head>
  <body>

    <div class="dashboard">
      <div class="header">📊 CodePath Dashboard</div>

      <div class="sidebar">
        <p>📖 Lessons</p>
        <p>🏆 Projects</p>
        <p>🎓 Certificates</p>
        <p>⚙ Settings</p>
      </div>

      <div class="main">
        <h2 style="margin-bottom:8px">Welcome back, Kofi</h2>
        <p style="color:#94a3b8;font-size:14px;margin-bottom:16px">Here is your progress this week.</p>

        <div class="card-grid">
          <div class="stat-card">
            <div class="value">550</div>
            <div class="label">XP Earned</div>
          </div>
          <div class="stat-card">
            <div class="value">12</div>
            <div class="label">Lessons</div>
          </div>
          <div class="wide-card">
            ✅ You completed 2 lessons today. Keep it up!
          </div>
          <div class="stat-card">
            <div class="value">3🔥</div>
            <div class="label">Day Streak</div>
          </div>
          <div class="stat-card">
            <div class="value">#2</div>
            <div class="label">Rank</div>
          </div>
        </div>
      </div>

      <div class="footer">CodePath Ghana © 2024</div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What does display: grid do?", options: ["Makes all children flex items", "Creates a two-dimensional grid layout", "Hides the element", "Makes element full width"], answer: 1 },
          { q: "What does 1fr mean in CSS Grid?", options: ["1 pixel fraction", "One fixed column", "One fraction of available space", "First row"], answer: 2 },
          { q: "What does grid-column: 1 / -1 do?", options: ["Hides the first column", "Makes item span all columns", "Creates a new column", "Removes the item from grid"], answer: 1 },
          { q: "Which creates a responsive grid without media queries?", options: ["repeat(3, 1fr)", "grid-auto-flow: dense", "repeat(auto-fill, minmax(250px, 1fr))", "grid-template: auto"], answer: 2 },
        ],
      },
    },
    {
      order: 13,
      title: "Responsive Design and Media Queries",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `Responsive design means your website looks good on every screen size — from a small phone to a large desktop monitor. In Ghana where most internet access is on mobile, responsive design is not optional. It is the difference between a usable site and an unusable one.

Media queries are the tool that makes responsive design possible. They apply CSS rules only when certain conditions are met — like when the screen is narrower than 768 pixels.

The syntax is: @media (max-width: 768px) followed by a block of CSS. The rules inside only apply when the screen is 768px wide or less.

The mobile-first approach writes base styles for mobile, then uses min-width media queries to add styles for larger screens. This is the modern standard because most users are on mobile and it results in cleaner, faster code.

Common breakpoints: 480px for small phones, 768px for tablets, 1024px for laptops, 1280px for desktops. You do not need to use all of these — use breakpoints where your design breaks, not arbitrary numbers.

The viewport meta tag is essential. Without it, mobile browsers zoom out to show the full desktop page. Add this to every HTML page: meta name viewport content width=device-width initial-scale=1.

Fluid typography uses clamp() to scale font sizes smoothly between a minimum and maximum. Percentage widths and max-width work together to create fluid layouts. Images should have max-width 100% so they never overflow their container.

The rem unit scales relative to the root font size. If the user has increased their browser font size for accessibility, rem-based sizes respect that. Pixel sizes do not.`,
        keyConcepts: [
          { code: "@media (max-width: 768px)", description: "applies styles only on screens 768px or narrower" },
          { code: "@media (min-width: 1024px)", description: "applies styles only on screens 1024px or wider" },
          { code: "viewport meta tag", description: "tells mobile browsers not to zoom out" },
          { code: "max-width: 100%", description: "prevents images from overflowing their container" },
          { code: "clamp(1rem, 2.5vw, 2rem)", description: "fluid value between a min and max" },
          { code: "mobile-first", description: "write base styles for mobile, add desktop styles with min-width" },
        ],
        exerciseDescription: "Build a responsive navigation and hero section. On mobile the nav links should stack vertically and the hero text should be smaller. On desktop they should be side by side. Use media queries to control the layout at each breakpoint.",
        hint: "Start by building the mobile layout first, then add @media (min-width: 768px) to override styles for larger screens.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Responsive Design</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
      }

      /* ── Navigation ── */
      nav {
        background: #0f0f1a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 16px 24px;
      }

      .nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .nav-logo {
        font-weight: bold;
        font-size: 20px;
        color: #a78bfa;
      }

      .nav-links {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .nav-links a {
        color: #94a3b8;
        text-decoration: none;
        font-size: 15px;
        padding: 8px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      /* ── Hero ── */
      .hero {
        padding: 48px 24px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero h1 {
        font-size: 28px;
        line-height: 1.2;
        margin-bottom: 16px;
        color: #f8fafc;
      }

      .hero p {
        font-size: 15px;
        color: #94a3b8;
        line-height: 1.7;
        margin-bottom: 24px;
        max-width: 480px;
      }

      .hero-btn {
        background: #6366f1;
        color: white;
        padding: 14px 28px;
        border-radius: 8px;
        border: none;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        display: inline-block;
      }

      /* ── Tablet and up ── */
      @media (min-width: 768px) {
        .nav-inner {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }

        .nav-links {
          flex-direction: row;
          gap: 32px;
        }

        .nav-links a {
          border-bottom: none;
          padding: 0;
        }

        .hero h1 {
          font-size: 42px;
        }

        .hero p {
          font-size: 17px;
        }
      }

      /* ── Desktop ── */
      @media (min-width: 1024px) {
        .hero {
          padding: 80px 24px;
        }

        .hero h1 {
          font-size: 56px;
        }
      }

    </style>
  </head>
  <body>

    <nav>
      <div class="nav-inner">
        <div class="nav-logo">CodePath</div>
        <div class="nav-links">
          <a href="#">Tracks</a>
          <a href="#">Projects</a>
          <a href="#">Pricing</a>
          <a href="#">Login</a>
        </div>
      </div>
    </nav>

    <div class="hero">
      <h1>Learn to Code<br>Built for Ghana</h1>
      <p>Master HTML, CSS, Python and JavaScript through interactive lessons designed for Ghanaian students and professionals.</p>
      <button class="hero-btn">Start Learning Free →</button>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What does @media (max-width: 768px) mean?", options: ["Apply styles on screens wider than 768px", "Apply styles on screens 768px or narrower", "Hide element at 768px", "Set width to 768px"], answer: 1 },
          { q: "What is mobile-first design?", options: ["Designing only for mobile", "Writing mobile styles first, then adding desktop styles", "Making a mobile app", "Using mobile fonts"], answer: 1 },
          { q: "What does the viewport meta tag do?", options: ["Sets the page title", "Prevents mobile browsers from zooming out", "Adds a meta description", "Sets the favicon"], answer: 1 },
          { q: "How do you prevent an image from overflowing its container?", options: ["width: 100%", "max-width: 100%", "overflow: hidden on image", "display: block"], answer: 1 },
        ],
      },
    },
    {
      order: 14,
      title: "CSS Variables and Custom Properties",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `CSS variables — officially called custom properties — let you store values in named variables and reuse them throughout your stylesheet. They solve a huge problem: when you have the same colour or spacing value repeated 50 times and need to change it, you change the variable once instead of finding and replacing 50 instances.

You define a CSS variable by starting its name with two dashes. The convention is to define all your variables on the :root selector so they are available everywhere on the page. :root is the highest-level element — effectively the same as html but with higher specificity.

To use a variable, wrap its name in var(). You can also provide a fallback value as a second argument — if the variable is not defined, the fallback is used.

CSS variables are live — if you change a variable with JavaScript, all elements using that variable update instantly. This is how dark mode is implemented on most modern websites. Change a handful of colour variables and the entire page switches theme.

Variables can reference other variables. Your --color-primary might be used in --button-background and --link-color. Change --color-primary and everything updates automatically.

Variables are also scoped. A variable defined on a specific element only applies to that element and its children. This lets you create component-specific themes.

Spacing scales are a common use of variables. Define --space-1 through --space-8 with values like 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px. Using these consistently creates visual rhythm throughout your design.`,
        keyConcepts: [
          { code: "--color-primary: #6366f1", description: "defines a CSS variable on :root" },
          { code: "var(--color-primary)", description: "uses a CSS variable value" },
          { code: "var(--color, #fallback)", description: "uses variable with fallback if undefined" },
          { code: ":root { }", description: "highest level selector — variables defined here are global" },
          { code: "color-scheme", description: "tells browser which colour schemes the page supports" },
        ],
        exerciseDescription: "Refactor a styled page to use CSS variables. Define all colours, spacing, and border-radius values as variables on :root. Then create a dark mode by changing just the variables. Add a button that toggles between light and dark mode using JavaScript to swap a class.",
        hint: "For the dark mode toggle, add a class to the body element and define different variable values for that class. JavaScript just adds or removes the class.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Variables</title>
    <style>
      /* ── Design tokens as CSS variables ── */
      :root {
        --bg-primary: #0a0a0f;
        --bg-secondary: #0f0f1a;
        --bg-card: #161b22;
        --text-primary: #f8fafc;
        --text-secondary: #94a3b8;
        --text-muted: #475569;
        --color-accent: #6366f1;
        --color-accent-hover: #4f46e5;
        --color-success: #10b981;
        --border-color: rgba(255,255,255,0.08);
        --border-radius: 12px;
        --space-1: 4px;
        --space-2: 8px;
        --space-3: 16px;
        --space-4: 24px;
        --space-5: 32px;
      }

      /* Light mode variables */
      .light-mode {
        --bg-primary: #f8fafc;
        --bg-secondary: #ffffff;
        --bg-card: #f1f5f9;
        --text-primary: #0f172a;
        --text-secondary: #475569;
        --text-muted: #94a3b8;
        --border-color: rgba(0,0,0,0.1);
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: var(--bg-primary);
        color: var(--text-primary);
        min-height: 100vh;
        padding: var(--space-5);
        transition: background 0.3s, color 0.3s;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-5);
      }

      h1 { font-size: 28px; color: var(--text-primary); }

      .toggle-btn {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        padding: var(--space-2) var(--space-3);
        border-radius: var(--border-radius);
        cursor: pointer;
        font-size: 13px;
        transition: all 0.2s;
      }

      .card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        padding: var(--space-4);
        margin-bottom: var(--space-3);
      }

      .card h3 {
        color: var(--text-primary);
        margin-bottom: var(--space-2);
        font-size: 16px;
      }

      .card p {
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: var(--space-3);
      }

      .btn {
        background: var(--color-accent);
        color: white;
        border: none;
        padding: var(--space-2) var(--space-3);
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: background 0.2s;
      }

      .btn:hover { background: var(--color-accent-hover); }

      .tag {
        display: inline-block;
        background: rgba(99,102,241,0.15);
        color: var(--color-accent);
        border: 1px solid rgba(99,102,241,0.3);
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 11px;
        margin-right: var(--space-1);
        margin-bottom: var(--space-2);
      }

    </style>
  </head>
  <body>

    <div class="container">
      <div class="header">
        <h1>CSS Variables</h1>
        <button class="toggle-btn" onclick="document.body.classList.toggle('light-mode')">
          Toggle Light/Dark
        </button>
      </div>

      <div class="card">
        <h3>What are CSS Variables?</h3>
        <div>
          <span class="tag">Custom Properties</span>
          <span class="tag">Design Tokens</span>
          <span class="tag">Theming</span>
        </div>
        <p>CSS variables let you define values once and reuse them everywhere. Change a variable and every element using it updates automatically.</p>
        <button class="btn">Learn More</button>
      </div>

      <div class="card">
        <h3>Why Use Them?</h3>
        <p>Instead of repeating the same colour 50 times, define it as --color-primary once. When your client wants to change the brand colour, you update one line.</p>
        <button class="btn">View Example</button>
      </div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "How do you define a CSS variable?", options: ["$variable: value", "--variable: value", "@variable: value", "var-variable: value"], answer: 1 },
          { q: "Where should global CSS variables be defined?", options: ["In the body selector", "In the :root selector", "In the html selector", "In a separate file"], answer: 1 },
          { q: "How do you use a CSS variable?", options: ["$(--variable)", "var(--variable)", "@var(variable)", "--variable"], answer: 1 },
          { q: "What is the main benefit of CSS variables?", options: ["Faster loading", "Change once, update everywhere", "Better browser support", "Smaller file size"], answer: 1 },
        ],
      },
    },
    {
      order: 15,
      title: "HTML Tables",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `HTML tables display data in rows and columns. They are the right tool for tabular data — results, schedules, comparisons, pricing tiers, financial data. They are not for layout — use Flexbox or Grid for that.

A table is built from several elements working together. The table tag wraps everything. thead contains the header row. tbody contains the data rows. tfoot contains summary rows at the bottom.

Inside these sections, tr creates a row. th creates a header cell — bold and centered by default. td creates a data cell.

Cells can span multiple columns using colspan or multiple rows using rowspan. colspan="2" makes a cell take up two columns. rowspan="3" makes a cell take up three rows.

Tables need CSS to look good. By default they have no borders and use browser default spacing. Add border-collapse: collapse to the table to merge double borders into single lines. Add padding to th and td for breathing room.

The zebra striping pattern — alternating row colours — makes tables much easier to read. Use tr:nth-child(even) to style every other row.

Tables on mobile are a challenge — wide tables overflow their containers. The fix is to wrap the table in a div with overflow-x: auto. This lets users scroll horizontally on small screens without breaking the layout.

Real use case: a results table showing student grades, a schedule for a Ghana Premier League match day, a pricing comparison for mobile data plans.`,
        keyConcepts: [
          { code: "<table>", description: "the container for all table content" },
          { code: "<thead> <tbody> <tfoot>", description: "semantic sections of a table" },
          { code: "<tr>", description: "table row — contains th or td cells" },
          { code: "<th>", description: "header cell — bold and centered by default" },
          { code: "<td>", description: "data cell — regular table content" },
          { code: "colspan='2'", description: "makes a cell span 2 columns" },
          { code: "border-collapse: collapse", description: "merges double borders into single lines" },
        ],
        exerciseDescription: "Build a styled student results table for a Ghanaian university. Include columns for student name, course, score, grade, and status. Use thead and tbody correctly. Style with zebra striping, hover effects, and colour-coded status badges. Make it scroll horizontally on mobile.",
        hint: "For coloured status badges: use a span with a class inside the td. Target .pass and .fail with different background colours.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Student Results Table</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 24px;
      }

      h1 {
        font-size: 22px;
        margin-bottom: 6px;
        color: #f8fafc;
      }

      p { color: #94a3b8; font-size: 14px; margin-bottom: 20px; }

      /* Scroll wrapper for mobile */
      .table-wrapper {
        overflow-x: auto;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.08);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        min-width: 600px;
      }

      thead {
        background: #0f0f1a;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      th {
        padding: 12px 16px;
        text-align: left;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
      }

      tbody tr {
        border-bottom: 1px solid rgba(255,255,255,0.04);
        transition: background 0.15s;
      }

      tbody tr:hover {
        background: rgba(255,255,255,0.03);
      }

      tbody tr:nth-child(even) {
        background: rgba(255,255,255,0.02);
      }

      td {
        padding: 12px 16px;
        font-size: 14px;
        color: #94a3b8;
      }

      td:first-child { color: #f8fafc; font-weight: 500; }

      .score { font-family: monospace; color: #a78bfa; }

      .grade {
        font-weight: 700;
        color: #f8fafc;
      }

      .badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.04em;
      }

      .pass {
        background: rgba(16,185,129,0.15);
        color: #10b981;
        border: 1px solid rgba(16,185,129,0.3);
      }

      .fail {
        background: rgba(239,68,68,0.15);
        color: #ef4444;
        border: 1px solid rgba(239,68,68,0.3);
      }

      tfoot td {
        padding: 12px 16px;
        font-size: 13px;
        color: #475569;
        background: #0f0f1a;
        border-top: 1px solid rgba(255,255,255,0.08);
      }

    </style>
  </head>
  <body>

    <h1>Semester Results — CS 101</h1>
    <p>University of Ghana · First Semester 2024</p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course</th>
            <th>Score</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kofi Mensah</td>
            <td>Intro to Programming</td>
            <td class="score">82%</td>
            <td class="grade">B+</td>
            <td><span class="badge pass">PASS</span></td>
          </tr>
          <tr>
            <td>Abena Asante</td>
            <td>Intro to Programming</td>
            <td class="score">91%</td>
            <td class="grade">A</td>
            <td><span class="badge pass">PASS</span></td>
          </tr>
          <tr>
            <td>Kwame Boateng</td>
            <td>Intro to Programming</td>
            <td class="score">45%</td>
            <td class="grade">F</td>
            <td><span class="badge fail">FAIL</span></td>
          </tr>
          <tr>
            <td>Efua Owusu</td>
            <td>Intro to Programming</td>
            <td class="score">76%</td>
            <td class="grade">B</td>
            <td><span class="badge pass">PASS</span></td>
          </tr>
          <tr>
            <td>Yaw Darko</td>
            <td>Intro to Programming</td>
            <td class="score">88%</td>
            <td class="grade">A</td>
            <td><span class="badge pass">PASS</span></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">5 students · Class average: 76.4% · Pass rate: 80%</td>
          </tr>
        </tfoot>
      </table>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "Which tag creates a table header cell?", options: ["<td>", "<tr>", "<th>", "<head>"], answer: 2 },
          { q: "What does border-collapse: collapse do?", options: ["Removes all borders", "Merges double borders into single lines", "Collapses the table", "Hides the border"], answer: 1 },
          { q: "How do you make a cell span 3 columns?", options: ["width='3'", "span='3'", "colspan='3'", "columns='3'"], answer: 2 },
          { q: "How do you make a table scroll horizontally on mobile?", options: ["Add overflow: scroll to table", "Wrap in div with overflow-x: auto", "Set table width to 100vw", "Use position: absolute"], answer: 1 },
        ],
      },
    },
    {
      order: 16,
      title: "Semantic HTML",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `Semantic HTML means using the right HTML element for the right content. Instead of using div for everything, you use elements whose names describe their purpose — header, nav, main, article, section, aside, footer.

This matters for three reasons. Screen readers use semantic elements to help visually impaired users navigate pages. Search engines use them to understand page structure and rank content better. And developers reading your code understand the layout immediately without needing to read every class name.

The header element goes at the top of a page or section. It typically contains the logo, site name, and main navigation. There can be one main page header and additional headers inside article elements.

The nav element wraps navigation links. A page can have multiple nav elements — a main nav in the header and a secondary nav in the footer.

The main element wraps the primary content of the page. There should only be one main per page. It tells screen readers where to jump to skip the navigation.

Article is for self-contained content that could exist independently — a blog post, a news article, a product card. Section groups related content with a heading. Aside is for content tangentially related to the main content — a sidebar, related links, pull quotes.

Footer goes at the bottom of a page or section and typically contains copyright, links, and contact information.

Div and span are non-semantic — use them only when no semantic element fits. A div for a visual container that has no special meaning is fine. But replacing header with div just because it looks the same is wrong.`,
        keyConcepts: [
          { code: "<header>", description: "top of page or section — logo, nav, title" },
          { code: "<nav>", description: "navigation links — main menu or footer links" },
          { code: "<main>", description: "primary content — only one per page" },
          { code: "<article>", description: "self-contained content — blog post, card, story" },
          { code: "<section>", description: "groups related content with a heading" },
          { code: "<aside>", description: "sidebar or supplementary content" },
          { code: "<footer>", description: "bottom of page or section — copyright, links" },
        ],
        exerciseDescription: "Rebuild a news article page using only semantic HTML elements. Use header for the site header, nav for navigation, main for the article content, aside for related articles, and footer for the page footer. No div should be used where a semantic element fits.",
        hint: "An article element can contain its own header and footer. Use section inside article to group the introduction, body, and conclusion separately.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Ghana Tech News</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Georgia, serif;
        background: #0a0a0f;
        color: #f8fafc;
        line-height: 1.7;
      }

      /* Site header */
      header {
        background: #0f0f1a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      header h1 {
        font-size: 22px;
        color: #a78bfa;
        font-family: Arial, sans-serif;
      }

      /* Navigation */
      nav a {
        color: #94a3b8;
        text-decoration: none;
        margin-left: 24px;
        font-family: Arial, sans-serif;
        font-size: 14px;
      }

      nav a:hover { color: #f8fafc; }

      /* Page layout */
      .page-layout {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 24px;
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 32px;
      }

      /* Article */
      article header {
        background: transparent;
        border: none;
        padding: 0;
        display: block;
        margin-bottom: 24px;
      }

      article header h2 {
        font-size: 28px;
        color: #f8fafc;
        line-height: 1.3;
        margin-bottom: 12px;
      }

      .meta {
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: #475569;
      }

      section { margin-bottom: 24px; }

      section h3 {
        font-size: 18px;
        color: #a78bfa;
        margin-bottom: 12px;
        font-family: Arial, sans-serif;
      }

      p { color: #94a3b8; margin-bottom: 16px; font-size: 15px; }

      /* Aside */
      aside {
        border-left: 1px solid rgba(255,255,255,0.08);
        padding-left: 24px;
      }

      aside h4 {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin-bottom: 16px;
        font-family: Arial, sans-serif;
      }

      .related-item {
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }

      .related-item a {
        color: #f8fafc;
        text-decoration: none;
        font-size: 14px;
        font-family: Arial, sans-serif;
        line-height: 1.4;
      }

      .related-item span {
        display: block;
        font-size: 12px;
        color: #475569;
        margin-top: 4px;
        font-family: Arial, sans-serif;
      }

      /* Footer */
      footer {
        background: #0f0f1a;
        border-top: 1px solid rgba(255,255,255,0.08);
        padding: 24px;
        text-align: center;
        font-family: Arial, sans-serif;
        font-size: 13px;
        color: #475569;
      }

    </style>
  </head>
  <body>

    <header>
      <h1>Ghana Tech News</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Tech</a>
        <a href="#">Business</a>
        <a href="#">Education</a>
      </nav>
    </header>

    <div class="page-layout">

      <main>
        <article>
          <header>
            <h2>Ghana's Tech Ecosystem Grows as More Students Learn to Code</h2>
            <p class="meta">By Ama Owusu · May 30, 2024 · 4 min read</p>
          </header>

          <section>
            <h3>The Rise of Coding Education</h3>
            <p>Ghana's technology sector is experiencing rapid growth, with more young Ghanaians than ever pursuing careers in software development. Platforms like CodePath are making world-class coding education accessible to students across the country.</p>
            <p>University students who once had to rely on outdated textbooks can now learn HTML, CSS, Python, and JavaScript through interactive platforms that run entirely in the browser.</p>
          </section>

          <section>
            <h3>What This Means for Ghana</h3>
            <p>As more Ghanaians gain software development skills, local businesses benefit from a growing pool of technical talent. Startups can hire locally, reducing their reliance on expensive international contractors.</p>
            <p>The economic impact extends beyond individual developers. Every website built, every automation script written, every app launched creates value in the local economy.</p>
          </section>

          <footer>
            <p style="font-size:13px;font-family:Arial,sans-serif">
              Tags: <a href="#" style="color:#6366f1">Education</a> · <a href="#" style="color:#6366f1">Technology</a> · <a href="#" style="color:#6366f1">Ghana</a>
            </p>
          </footer>
        </article>
      </main>

      <aside>
        <h4>Related Articles</h4>
        <div class="related-item">
          <a href="#">Accra Becomes West Africa's Top Tech Hub</a>
          <span>3 days ago</span>
        </div>
        <div class="related-item">
          <a href="#">5 Ghanaian Apps That Changed How We Pay</a>
          <span>1 week ago</span>
        </div>
        <div class="related-item">
          <a href="#">How to Get Your First Tech Job in Ghana</a>
          <span>2 weeks ago</span>
        </div>
      </aside>

    </div>

    <footer>
      <p>© 2024 Ghana Tech News · Accra, Ghana · All rights reserved</p>
    </footer>

  </body>
</html>`,
        quiz: [
          { q: "Why use semantic HTML instead of divs for everything?", options: ["It loads faster", "It helps screen readers, SEO, and code readability", "It uses less code", "It looks better"], answer: 1 },
          { q: "How many main elements should a page have?", options: ["As many as needed", "Two — one for desktop, one for mobile", "Only one", "One per section"], answer: 2 },
          { q: "Which element is best for a blog post or news article?", options: ["<section>", "<div>", "<content>", "<article>"], answer: 3 },
          { q: "What is the aside element used for?", options: ["The main content", "The page header", "Supplementary or sidebar content", "Navigation links"], answer: 2 },
        ],
      },
    },
    {
      order: 17,
      title: "CSS Animations",
      xpValue: 50,
      isFree: true,
      content: {
        concept: `CSS animations let you create complex, multi-step animations without JavaScript. While transitions animate between two states, animations can have multiple steps, loop indefinitely, and run automatically without any user interaction.

Animations are defined using the @keyframes rule. You give the animation a name, then define what happens at different percentages of the animation duration. from and to are shortcuts for 0% and 100%.

The animation property on an element connects it to a keyframe and sets the duration, timing, delay, iteration count, and direction.

animation-iteration-count: infinite makes it loop forever. alternate makes it play forwards then backwards, creating a smooth back-and-forth effect.

animation-fill-mode controls what happens before and after the animation. forwards keeps the final state after the animation ends. backwards applies the first keyframe before the delay period.

The animation-play-state property lets you pause and resume animations with JavaScript — useful for pausing animations when the user is not looking at them.

Performant animations only animate transform and opacity. These properties run on the GPU and do not cause the browser to recalculate layout. Avoid animating width, height, margin, padding, or top/left — these are expensive and cause jank on mobile.

Loading spinners, progress bars, pulsing notification badges, skeleton screens, and celebration confetti are all built with CSS animations. Used correctly, they make interfaces feel alive. Used incorrectly, they distract and annoy.`,
        keyConcepts: [
          { code: "@keyframes name { }", description: "defines the animation steps" },
          { code: "animation: name 1s ease infinite", description: "applies animation to an element" },
          { code: "animation-iteration-count: infinite", description: "loops the animation forever" },
          { code: "animation-direction: alternate", description: "plays forward then backward" },
          { code: "animation-fill-mode: forwards", description: "keeps final state after animation ends" },
          { code: "transform and opacity", description: "the only properties to animate for performance" },
        ],
        exerciseDescription: "Build an animated loading screen and notification badge. Create a spinning loader using border-radius and border. Create a pulsing badge that draws attention. Create a slide-in card animation. All animations should use only transform and opacity for performance.",
        hint: "For a spinner: make a circle with border, make one side of the border transparent, then rotate it with @keyframes. The trick is border: 3px solid transparent then border-top-color: #6366f1.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Animations</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        gap: 48px;
        padding: 24px;
      }

      h2 {
        font-size: 14px;
        color: #475569;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 16px;
        text-align: center;
      }

      /* ── Spinner ── */
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      .spinner {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        border: 3px solid rgba(99,102,241,0.2);
        border-top-color: #6366f1;
        animation: spin 0.8s linear infinite;
      }

      /* ── Pulse badge ── */
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }

      .badge-wrapper {
        position: relative;
        display: inline-block;
      }

      .avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #a78bfa);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
      }

      .notification-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ef4444;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        animation: pulse 1.5s ease infinite;
        border: 2px solid #0a0a0f;
      }

      /* ── Slide in cards ── */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(24px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px 24px;
        width: 280px;
        animation: slideIn 0.4s ease forwards;
        opacity: 0;
      }

      .card:nth-child(1) { animation-delay: 0.1s; }
      .card:nth-child(2) { animation-delay: 0.25s; }
      .card:nth-child(3) { animation-delay: 0.4s; }

      .card h3 { font-size: 15px; margin-bottom: 6px; }
      .card p { font-size: 13px; color: #94a3b8; }

      /* ── Progress bar ── */
      @keyframes grow {
        from { width: 0%; }
        to { width: 72%; }
      }

      .progress-track {
        width: 280px;
        height: 8px;
        background: rgba(255,255,255,0.08);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #6366f1, #a78bfa);
        border-radius: 4px;
        animation: grow 1.5s ease forwards;
        animation-delay: 0.5s;
        width: 0%;
      }

    </style>
  </head>
  <body>

    <div>
      <h2>Loading Spinner</h2>
      <div style="display:flex;justify-content:center">
        <div class="spinner"></div>
      </div>
    </div>

    <div>
      <h2>Notification Badge</h2>
      <div style="display:flex;justify-content:center">
        <div class="badge-wrapper">
          <div class="avatar">K</div>
          <div class="notification-badge">3</div>
        </div>
      </div>
    </div>

    <div>
      <h2>Slide In Cards</h2>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="card">
          <h3>HTML & CSS Foundation</h3>
          <p>Lesson 17 of 30 complete</p>
        </div>
        <div class="card">
          <h3>Python Fundamentals</h3>
          <p>Lesson 8 of 30 complete</p>
        </div>
        <div class="card">
          <h3>JavaScript Mastery</h3>
          <p>Coming soon — Pro only</p>
        </div>
      </div>
    </div>

    <div>
      <h2>Progress Bar</h2>
      <div class="progress-track">
        <div class="progress-fill"></div>
      </div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What is the difference between transitions and animations?", options: ["No difference", "Transitions need two states and user action; animations can have multiple steps and run automatically", "Animations are faster", "Transitions use JavaScript"], answer: 1 },
          { q: "Which properties should you animate for best performance?", options: ["width and height", "margin and padding", "transform and opacity", "color and background"], answer: 2 },
          { q: "What does animation-iteration-count: infinite do?", options: ["Plays once", "Plays twice", "Loops forever", "Pauses the animation"], answer: 2 },
          { q: "What does @keyframes define?", options: ["When to start the animation", "The steps and states of an animation", "The element to animate", "The animation speed"], answer: 1 },
        ],
      },
    },
    {
      order: 18,
      title: "Building a Complete Landing Page",
      xpValue: 75,
      isFree: true,
      content: {
        concept: `A landing page is a single focused webpage designed to get visitors to take one specific action — sign up, buy, download, or contact. Every major product you use has a landing page. Building one well requires combining everything you have learned so far.

A professional landing page has a clear structure. The hero section at the top communicates what the product is and why it matters in under 5 seconds. Below that, a features or benefits section explains the value in more detail. Social proof — testimonials, logos, numbers — builds trust. A pricing section handles the money conversation. A final call to action closes the deal.

Navigation should be sticky — staying visible as the user scrolls. This keeps the primary action button always accessible.

Visual hierarchy guides the eye. The most important element — usually the main headline — should be the largest. Supporting text is smaller. Buttons are high contrast. White space separates sections and creates breathing room.

Colour psychology matters. Ghana's flag colours — red, gold, green — carry meaning to Ghanaian users. Purple and indigo feel premium and technical. Orange and yellow feel energetic. Blue feels trustworthy. Choose intentionally.

Performance matters on mobile networks. Keep images small, avoid unnecessary animations, and minimise the CSS. A landing page that loads in 2 seconds on a slow connection converts better than a beautiful one that takes 8 seconds.

This lesson is your final free lesson. After this, you unlock Pro content — advanced tracks, AI tutor, and your certificate. The skills you have built here are the foundation for everything that comes next.`,
        keyConcepts: [
          { code: "position: sticky", description: "keeps element visible while scrolling" },
          { code: "scroll-behavior: smooth", description: "adds smooth scrolling to anchor links" },
          { code: "visual hierarchy", description: "size and contrast guide the user's eye" },
          { code: "call to action", description: "the primary button users should click" },
          { code: "above the fold", description: "content visible without scrolling" },
          { code: "social proof", description: "testimonials and numbers that build trust" },
        ],
        exerciseDescription: "Build a complete landing page for CodePath Ghana. Include a sticky navigation, hero section with headline and CTA button, features section with a 3-column grid, a testimonial, and a footer. Use everything you have learned — Grid, Flexbox, variables, transitions, and semantic HTML.",
        hint: "Start with HTML structure using semantic elements, then add CSS section by section. Get the layout right before adding colours and effects.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>CodePath Ghana — Learn to Code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      :root {
        --color-accent: #6366f1;
        --color-accent-dark: #4f46e5;
        --color-success: #10b981;
        --bg: #0a0a0f;
        --bg-card: #0f0f1a;
        --text: #f8fafc;
        --text-muted: #94a3b8;
        --border: rgba(255,255,255,0.08);
        --radius: 12px;
      }

      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: Arial, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.7;
      }

      /* ── Sticky Nav ── */
      nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(10,10,15,0.9);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
        padding: 0 24px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo {
        font-size: 18px;
        font-weight: bold;
        color: #a78bfa;
      }

      .nav-links { display: flex; align-items: center; gap: 24px; }

      .nav-links a {
        color: var(--text-muted);
        text-decoration: none;
        font-size: 14px;
        transition: color 0.2s;
      }

      .nav-links a:hover { color: var(--text); }

      .nav-cta {
        background: var(--color-accent);
        color: white !important;
        padding: 8px 18px;
        border-radius: 8px;
        transition: background 0.2s !important;
      }

      .nav-cta:hover { background: var(--color-accent-dark) !important; color: white !important; }

      /* ── Hero ── */
      .hero {
        max-width: 800px;
        margin: 0 auto;
        padding: 96px 24px;
        text-align: center;
      }

      .hero-badge {
        display: inline-block;
        background: rgba(99,102,241,0.15);
        border: 1px solid rgba(99,102,241,0.3);
        color: #a78bfa;
        padding: 4px 16px;
        border-radius: 20px;
        font-size: 13px;
        margin-bottom: 24px;
      }

      .hero h1 {
        font-size: clamp(32px, 5vw, 56px);
        line-height: 1.15;
        margin-bottom: 20px;
        font-weight: 800;
      }

      .hero h1 span { color: #a78bfa; }

      .hero p {
        font-size: 18px;
        color: var(--text-muted);
        max-width: 520px;
        margin: 0 auto 36px;
      }

      .hero-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

      .btn-primary {
        background: var(--color-accent);
        color: white;
        padding: 14px 28px;
        border-radius: var(--radius);
        border: none;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
        text-decoration: none;
      }

      .btn-primary:hover { background: var(--color-accent-dark); transform: translateY(-2px); }

      .btn-secondary {
        background: transparent;
        color: var(--text);
        padding: 14px 28px;
        border-radius: var(--radius);
        border: 1px solid var(--border);
        font-size: 15px;
        cursor: pointer;
        transition: border-color 0.2s;
        text-decoration: none;
      }

      .btn-secondary:hover { border-color: rgba(255,255,255,0.3); }

      /* ── Stats ── */
      .stats {
        display: flex;
        justify-content: center;
        gap: 48px;
        padding: 32px 24px;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        flex-wrap: wrap;
      }

      .stat-item { text-align: center; }
      .stat-value { font-size: 28px; font-weight: 800; color: var(--text); }
      .stat-label { font-size: 13px; color: var(--text-muted); }

      /* ── Features ── */
      .features {
        max-width: 1100px;
        margin: 0 auto;
        padding: 80px 24px;
      }

      .section-label {
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin-bottom: 12px;
        text-align: center;
      }

      .section-title {
        font-size: clamp(24px, 3vw, 36px);
        text-align: center;
        margin-bottom: 48px;
        font-weight: 700;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }

      .feature-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 24px;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      }

      .feature-icon {
        font-size: 28px;
        margin-bottom: 14px;
        display: block;
      }

      .feature-card h3 { font-size: 16px; margin-bottom: 8px; }
      .feature-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

      /* ── Testimonial ── */
      .testimonial {
        background: var(--bg-card);
        border: 1px solid var(--border);
        max-width: 600px;
        margin: 0 auto 80px;
        border-radius: var(--radius);
        padding: 32px;
        text-align: center;
      }

      .testimonial p {
        font-size: 17px;
        color: var(--text);
        margin-bottom: 20px;
        font-style: italic;
        line-height: 1.7;
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }

      .author-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #a78bfa);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 16px;
      }

      .author-name { font-weight: 600; font-size: 14px; }
      .author-role { font-size: 12px; color: var(--text-muted); }

      /* ── CTA ── */
      .cta-section {
        background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(167,139,250,0.05));
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        padding: 80px 24px;
        text-align: center;
      }

      .cta-section h2 { font-size: 32px; margin-bottom: 16px; }
      .cta-section p { font-size: 16px; color: var(--text-muted); margin-bottom: 32px; }

      /* ── Footer ── */
      footer {
        padding: 32px 24px;
        text-align: center;
        color: var(--text-muted);
        font-size: 13px;
        border-top: 1px solid var(--border);
      }

    </style>
  </head>
  <body>

    <nav>
      <div class="nav-logo">CodePath</div>
      <div class="nav-links">
        <a href="#features">Tracks</a>
        <a href="#testimonial">Stories</a>
        <a href="#cta" class="nav-cta">Start Free</a>
      </div>
    </nav>

    <main>
      <section class="hero">
        <div class="hero-badge">🇬🇭 Built for Ghana</div>
        <h1>Learn to Code.<br><span>Build for Africa.</span></h1>
        <p>Master HTML, CSS, Python and JavaScript through interactive lessons. Earn verifiable certificates. Get hired.</p>
        <div class="hero-buttons">
          <a href="#cta" class="btn-primary">Start Learning Free →</a>
          <a href="#features" class="btn-secondary">See All Tracks</a>
        </div>
      </section>

      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">500+</div>
          <div class="stat-label">Students Learning</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">60</div>
          <div class="stat-label">Free Lessons</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">GHS 80</div>
          <div class="stat-label">Per Month</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">6</div>
          <div class="stat-label">Certificates</div>
        </div>
      </div>

      <section class="features" id="features">
        <p class="section-label">// What you will learn</p>
        <h2 class="section-title">Everything You Need to Build</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">🌐</span>
            <h3>HTML & CSS Foundation</h3>
            <p>Build beautiful websites from scratch. Learn semantic markup, responsive design, and modern CSS.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🐍</span>
            <h3>Python Fundamentals</h3>
            <p>Learn programming from scratch with real Ghanaian examples. Build scripts, automation, and APIs.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>JavaScript Mastery</h3>
            <p>Make your websites interactive. DOM manipulation, APIs, and modern ES6+ JavaScript.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🤖</span>
            <h3>AI Tutor</h3>
            <p>Stuck at 2am before your exam? Ask the AI tutor anything about your lesson. Available 24/7.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🎓</span>
            <h3>Verified Certificates</h3>
            <p>Every certificate has a unique verification URL. Share with employers and graduate schools.</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🏆</span>
            <h3>Real Projects</h3>
            <p>Build actual things. A developer profile page. A grade tracker. A currency converter. A web app.</p>
          </div>
        </div>
      </section>

      <section class="testimonial" id="testimonial">
        <p>"I completed the HTML and CSS track in two weeks. The lessons are clear, the projects are real, and the certificate helped me land my first freelance client in Accra."</p>
        <div class="testimonial-author">
          <div class="author-avatar">T</div>
          <div>
            <div class="author-name">Tsetse Benedicta Norvienyo</div>
            <div class="author-role">Frontend Developer · Accra, Ghana</div>
          </div>
        </div>
      </section>

      <section class="cta-section" id="cta">
        <h2>Ready to Start?</h2>
        <p>Join hundreds of Ghanaian students already learning on CodePath. Your first 18 lessons are completely free.</p>
        <a href="/signup" class="btn-primary">Create Free Account →</a>
      </section>
    </main>

    <footer>
      <p>© 2024 CodePath Ghana · Accra, Ghana · <a href="/terms" style="color:#6366f1">Terms</a> · <a href="/privacy" style="color:#6366f1">Privacy</a></p>
    </footer>

  </body>
</html>`,
        quiz: [
          { q: "What is a landing page designed to do?", options: ["Show all company information", "Get visitors to take one specific action", "Display a portfolio", "Show a blog"], answer: 1 },
          { q: "What does position: sticky do to a navigation bar?", options: ["Fixes it to the top permanently", "Keeps it visible as the user scrolls", "Hides it on mobile", "Makes it transparent"], answer: 1 },
          { q: "What is above the fold?", options: ["Content in the footer", "Content visible without scrolling", "Content that is hidden", "The navigation bar only"], answer: 1 },
          { q: "Why does performance matter on a landing page?", options: ["It looks better", "Faster pages convert more users especially on slow mobile connections", "It helps with animations", "It reduces server costs"], answer: 1 },
        ],
      },
    },
  ];

// Delete existing lessons 11-18 for this track then recreate
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

  console.log("🎉 HTML & CSS lessons 11-18 seeded!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });