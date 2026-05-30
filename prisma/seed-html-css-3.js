const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding HTML & CSS lessons 19-30...");

  const track = await prisma.track.findUnique({ where: { slug: "html-css" } });
  if (!track) { console.error("Track not found"); return; }

  const lessons = [
    {
      order: 19,
      title: "CSS Pseudo-elements",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Pseudo-elements let you style specific parts of an element or insert content before and after an element without adding extra HTML. They are written with two colons — ::before and ::after.

The ::before pseudo-element inserts content before the element's actual content. The ::after pseudo-element inserts content after it. Both require the content property — even if it is empty quotes. Without content, the pseudo-element does not appear.

Pseudo-elements are powerful for decorative effects that do not belong in HTML. Quotation marks around a blockquote. Decorative lines beside a heading. Badges and labels on cards. Icons before list items. All without touching the HTML structure.

The content property can hold text, an empty string, a URL for images, or a counter value. When set to an empty string with position absolute, pseudo-elements become purely decorative shapes you position freely.

::first-line styles only the first line of a paragraph — however many words fit before wrapping. ::first-letter styles just the first character — used for drop caps in editorial design.

Pseudo-elements are part of the element they belong to. They inherit styles from their parent. They can be positioned absolutely relative to a parent with position relative. They can be any size, colour, or shape.

Combined with transitions, pseudo-elements create impressive hover effects — underline animations, fill effects, corner decorations — all in CSS alone with no JavaScript.`,
        keyConcepts: [
          { code: "::before", description: "inserts content before the element's content" },
          { code: "::after", description: "inserts content after the element's content" },
          { code: "content: ''", description: "required property — even empty string is needed" },
          { code: "::first-line", description: "styles only the first line of text" },
          { code: "::first-letter", description: "styles only the first character" },
          { code: "position: absolute", description: "positions pseudo-element relative to parent" },
        ],
        exerciseDescription: "Use pseudo-elements to add decorative effects without extra HTML. Add decorative lines beside headings using ::before and ::after. Create an animated underline on links. Add quotation marks to a testimonial. Build a badge using ::after on a card.",
        hint: "For a line beside a heading: use display: flex on the heading, then ::before and ::after with flex: 1, height: 1px, background colour, and margin for spacing.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Pseudo-elements</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 48px 24px;
        max-width: 680px;
        margin: 0 auto;
      }

      /* ── Heading with decorative lines ── */
      .decorated-heading {
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 20px;
        color: #a78bfa;
        margin-bottom: 32px;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 14px;
      }

      .decorated-heading::before,
      .decorated-heading::after {
        content: '';
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(167,139,250,0.4));
      }

      .decorated-heading::after {
        background: linear-gradient(90deg, rgba(167,139,250,0.4), transparent);
      }

      /* ── Animated underline link ── */
      .animated-link {
        color: #6366f1;
        text-decoration: none;
        position: relative;
        font-size: 16px;
        display: inline-block;
        margin-bottom: 32px;
      }

      .animated-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #6366f1;
        transition: width 0.3s ease;
      }

      .animated-link:hover::after {
        width: 100%;
      }

      /* ── Testimonial with quotes ── */
      .testimonial {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 32px;
        position: relative;
        margin-bottom: 32px;
      }

      .testimonial::before {
        content: '"';
        position: absolute;
        top: -16px;
        left: 20px;
        font-size: 80px;
        color: #6366f1;
        font-family: Georgia, serif;
        line-height: 1;
        opacity: 0.6;
      }

      .testimonial p {
        color: #94a3b8;
        font-size: 15px;
        line-height: 1.7;
        font-style: italic;
        margin-bottom: 16px;
      }

      .testimonial-author {
        color: #f8fafc;
        font-size: 14px;
        font-weight: 600;
      }

      /* ── Card with badge ── */
      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
        position: relative;
        margin-bottom: 32px;
      }

      .card.new::after {
        content: 'NEW';
        position: absolute;
        top: 12px;
        right: 12px;
        background: #10b981;
        color: white;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        padding: 3px 8px;
        border-radius: 4px;
      }

      .card.pro::after {
        content: 'PRO';
        position: absolute;
        top: 12px;
        right: 12px;
        background: #6366f1;
        color: white;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        padding: 3px 8px;
        border-radius: 4px;
      }

      .card h3 { font-size: 16px; margin-bottom: 8px; }
      .card p { color: #94a3b8; font-size: 14px; }

      /* ── Drop cap ── */
      .article-text::first-letter {
        font-size: 48px;
        font-weight: bold;
        float: left;
        line-height: 0.8;
        margin-right: 8px;
        color: #a78bfa;
        font-family: Georgia, serif;
      }

      .article-text {
        color: #94a3b8;
        font-size: 15px;
        line-height: 1.7;
      }

    </style>
  </head>
  <body>

    <div class="decorated-heading">CSS Pseudo-elements</div>

    <a href="#" class="animated-link">Hover over me to see the animated underline</a>

    <div class="testimonial">
      <p>CodePath transformed how I think about web development. The lessons are practical, the projects are real, and the certificate helped me land my first client in Accra.</p>
      <div class="testimonial-author">Tsetse Benedicta Norvienyo — Frontend Developer</div>
    </div>

    <div class="card new">
      <h3>CSS Animations</h3>
      <p>Learn how to create smooth, performant animations using only CSS keyframes and transitions.</p>
    </div>

    <div class="card pro">
      <h3>Flask Web Development</h3>
      <p>Build full web applications with Python Flask, SQLite database, and Jinja2 templates.</p>
    </div>

    <div class="decorated-heading">Article</div>

    <p class="article-text">Ghana's technology sector is experiencing unprecedented growth. More young Ghanaians are learning to code than ever before, and platforms like CodePath are making world-class education accessible to students who previously had no affordable options.</p>

  </body>
</html>`,
        quiz: [
          { q: "What property is required for ::before and ::after to show?", options: ["display", "content", "position", "visibility"], answer: 1 },
          { q: "What does ::first-letter do?", options: ["Styles the first word", "Styles the first character of text", "Styles the first line", "Styles the first element"], answer: 1 },
          { q: "How do you position a pseudo-element freely inside its parent?", options: ["position: relative on pseudo-element", "position: absolute on pseudo-element with position: relative on parent", "float: left on pseudo-element", "display: flex on pseudo-element"], answer: 1 },
          { q: "What is the main benefit of pseudo-elements?", options: ["Faster loading", "Add decorative content without extra HTML", "Better browser support", "Easier JavaScript access"], answer: 1 },
        ],
      },
    },
    {
      order: 20,
      title: "CSS Positioning",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `CSS positioning controls exactly where elements appear on the page. The position property has five values, each with different behaviour.

Static is the default. Elements flow in the normal document order. Top, left, right, and bottom have no effect.

Relative positions the element relative to where it would normally be. The element stays in the document flow — other elements still see it in its original position. Top: 20px moves it 20px down from its natural position.

Absolute removes the element from document flow completely. Other elements ignore it and flow as if it does not exist. It positions relative to its nearest ancestor with a non-static position. This is why you often add position: relative to a parent container.

Fixed positions relative to the viewport — the browser window. It stays in place as you scroll. Sticky navigation bars, floating buttons, and cookie banners use fixed positioning.

Sticky is a hybrid. The element scrolls normally until it reaches a threshold, then sticks in place. Position: sticky top: 0 makes an element stick to the top of the viewport when scrolled to that point. Navigation bars that stick on scroll use sticky.

The z-index property controls stacking order when elements overlap. Higher z-index appears on top. Z-index only works on positioned elements — those with relative, absolute, fixed, or sticky.

Real use case: dropdown menus use absolute positioning. Modal overlays use fixed positioning. Sticky navigation uses sticky. Tooltips and badges use absolute positioning relative to their parent.`,
        keyConcepts: [
          { code: "position: static", description: "default — normal document flow" },
          { code: "position: relative", description: "offset from normal position, stays in flow" },
          { code: "position: absolute", description: "removed from flow, relative to positioned parent" },
          { code: "position: fixed", description: "relative to viewport, stays on scroll" },
          { code: "position: sticky", description: "scrolls then sticks at threshold" },
          { code: "z-index", description: "stacking order — higher number appears on top" },
        ],
        exerciseDescription: "Build a page demonstrating all five positioning types. Create a sticky header, an absolutely positioned badge on a card, a fixed scroll-to-top button, and a tooltip that appears on hover using absolute positioning.",
        hint: "For absolute positioning to work relative to a specific parent, that parent needs position: relative. Without it, the absolute element positions relative to the nearest positioned ancestor — often the body.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Positioning</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
      }

      /* ── Sticky header ── */
      .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(15,15,26,0.95);
        backdrop-filter: blur(8px);
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo { font-weight: bold; color: #a78bfa; }

      nav a {
        color: #94a3b8;
        text-decoration: none;
        margin-left: 24px;
        font-size: 14px;
      }

      /* ── Content ── */
      .content {
        max-width: 700px;
        margin: 0 auto;
        padding: 40px 24px 120px;
      }

      h2 { font-size: 20px; margin-bottom: 20px; color: #a78bfa; }
      p { color: #94a3b8; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }

      /* ── Card with absolute badge ── */
      .card-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 32px;
        width: 100%;
      }

      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
      }

      .card h3 { font-size: 16px; margin-bottom: 8px; }

      /* Absolutely positioned badge */
      .badge {
        position: absolute;
        top: -10px;
        right: 16px;
        background: #6366f1;
        color: white;
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 20px;
        letter-spacing: 0.06em;
      }

      /* ── Tooltip ── */
      .tooltip-wrapper {
        position: relative;
        display: inline-block;
        margin-bottom: 32px;
      }

      .tooltip-btn {
        background: #6366f1;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
      }

      .tooltip {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: #1e1e3a;
        color: #f8fafc;
        font-size: 13px;
        padding: 8px 14px;
        border-radius: 8px;
        white-space: nowrap;
        border: 1px solid rgba(255,255,255,0.1);
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;
      }

      .tooltip-wrapper:hover .tooltip {
        opacity: 1;
      }

      /* ── Relative offset example ── */
      .relative-demo {
        background: rgba(99,102,241,0.1);
        border: 1px solid rgba(99,102,241,0.2);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 32px;
        font-size: 14px;
        color: #94a3b8;
      }

      .offset-box {
        display: inline-block;
        background: #6366f1;
        color: white;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        position: relative;
        top: 8px;
        left: 16px;
      }

      /* ── Fixed scroll button ── */
      .scroll-top {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(99,102,241,0.4);
        z-index: 200;
      }

    </style>
  </head>
  <body>

    <!-- STICKY: stays at top when scrolling -->
    <header class="site-header">
      <div class="logo">CodePath</div>
      <nav>
        <a href="#">Tracks</a>
        <a href="#">Projects</a>
        <a href="#">Pro</a>
      </nav>
    </header>

    <div class="content">

      <h2>CSS Positioning Demo</h2>

      <!-- ABSOLUTE: badge positioned on card -->
      <div class="card-wrapper">
        <div class="badge">MOST POPULAR</div>
        <div class="card">
          <h3>Python Fundamentals</h3>
          <p style="color:#94a3b8;font-size:14px">Learn Python from scratch with real Ghanaian examples and projects.</p>
        </div>
      </div>

      <!-- RELATIVE: offset from normal position -->
      <div class="relative-demo">
        Normal text here, and this
        <span class="offset-box">offset box</span>
        is shifted 8px down and 16px right from where it would normally sit.
      </div>

      <!-- TOOLTIP: absolute positioned relative to wrapper -->
      <div>
        <div class="tooltip-wrapper">
          <button class="tooltip-btn">Hover for tooltip</button>
          <div class="tooltip">This tooltip uses absolute positioning!</div>
        </div>
      </div>

      <p style="margin-top:24px">Scroll down to see the sticky header stay in place and the fixed button remain in the corner.</p>
      <p>The header uses position: sticky. The scroll button uses position: fixed. The badge uses position: absolute. The offset text uses position: relative.</p>

    </div>

    <!-- FIXED: always visible in corner -->
    <button class="scroll-top" onclick="window.scrollTo(0,0)">↑</button>

  </body>
</html>`,
        quiz: [
          { q: "Which position removes an element from document flow?", options: ["relative", "static", "absolute", "sticky"], answer: 2 },
          { q: "What does position: fixed do?", options: ["Fixes element in document flow", "Positions relative to viewport and stays on scroll", "Fixes element to its parent", "Prevents element from moving"], answer: 1 },
          { q: "For absolute positioning to work relative to a parent, what does the parent need?", options: ["display: flex", "overflow: hidden", "position: relative", "z-index: 1"], answer: 2 },
          { q: "What is the difference between fixed and sticky?", options: ["No difference", "Fixed is always in place, sticky scrolls then sticks at threshold", "Sticky is always in place, fixed scrolls", "Fixed works on mobile, sticky does not"], answer: 1 },
        ],
      },
    },
    {
      order: 21,
      title: "Project 2 — Responsive Business Landing Page",
      xpValue: 150,
      isFree: false,
      content: {
        concept: `This is your second project checkpoint. You have now learned 20 lessons covering HTML structure, CSS styling, Flexbox, Grid, responsive design, animations, pseudo-elements, and positioning. It is time to build something real and submit it for review.

The project is a responsive landing page for a fictional Ghanaian business of your choice. It could be a restaurant, a tech startup, a fashion brand, a delivery service, or anything you are interested in.

Your page must be fully responsive — it should look great on both mobile and desktop. Use CSS Grid or Flexbox for the layout. Use media queries for different screen sizes. Use CSS variables for your colour palette. Use transitions and hover effects to make it feel polished.

Required sections:
A navigation bar that is sticky on scroll. A hero section with a headline, subheadline, and call to action button. A features or services section with at least three items in a grid. A testimonial or social proof section. A contact section with a form. A footer with links and copyright.

Your code should be clean and well-commented. Use semantic HTML elements — header, nav, main, section, article, footer. Give meaningful class names. Avoid inline styles.

This project will be reviewed by AI. The reviewer checks for: responsive layout, semantic HTML, CSS variables, hover effects, a working form, clean code structure, and overall visual quality.

After this project, you unlock the advanced lessons covering CSS architecture, performance, accessibility, and the final project.`,
        keyConcepts: [
          { code: "responsive layout", description: "works on mobile and desktop with media queries" },
          { code: "semantic HTML", description: "header, nav, main, section, footer — correct elements" },
          { code: "CSS variables", description: "all colours and spacing defined as variables" },
          { code: "sticky navigation", description: "position: sticky keeps nav visible on scroll" },
          { code: "hover effects", description: "transitions on buttons, cards, and links" },
          { code: "clean code", description: "comments, meaningful names, no inline styles" },
        ],
        exerciseDescription: "Build a complete responsive landing page for a Ghanaian business. The starter code below is a template — replace all content with your chosen business. Change the colours, text, and sections to match your brand. Make it yours.",
        hint: "Pick a real business concept you care about. Your enthusiasm for the subject will make the page better. Change everything — colours, fonts, content, layout — to match your vision.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Accra Bites — Fresh Ghanaian Food Delivered</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      /* ── Design Tokens ── */
      :root {
        --primary: #e34f26;
        --primary-dark: #c0421f;
        --accent: #fcd34d;
        --bg: #0a0a0a;
        --bg-card: #141414;
        --text: #f8fafc;
        --text-muted: #94a3b8;
        --border: rgba(255,255,255,0.08);
        --radius: 12px;
        --max-width: 1100px;
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
        background: rgba(10,10,10,0.95);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border);
        padding: 0 24px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo {
        font-size: 20px;
        font-weight: bold;
        color: var(--primary);
      }

      .nav-logo span { color: var(--accent); }

      .nav-links { display: flex; align-items: center; gap: 8px; }

      .nav-links a {
        color: var(--text-muted);
        text-decoration: none;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 14px;
        transition: color 0.2s;
      }

      .nav-links a:hover { color: var(--text); }

      .nav-cta {
        background: var(--primary) !important;
        color: white !important;
        transition: background 0.2s !important;
      }

      .nav-cta:hover { background: var(--primary-dark) !important; }

      /* ── Sections ── */
      section { padding: 80px 24px; }
      .container { max-width: var(--max-width); margin: 0 auto; }

      .section-tag {
        font-size: 12px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--primary);
        margin-bottom: 12px;
        display: block;
      }

      .section-title {
        font-size: clamp(24px, 3vw, 36px);
        margin-bottom: 48px;
        font-weight: 700;
      }

      /* ── Hero ── */
      .hero {
        padding: 100px 24px;
        text-align: center;
        background: radial-gradient(ellipse at center, rgba(227,79,38,0.08) 0%, transparent 70%);
      }

      .hero h1 {
        font-size: clamp(36px, 6vw, 64px);
        line-height: 1.15;
        margin-bottom: 20px;
        font-weight: 800;
      }

      .hero h1 span { color: var(--primary); }

      .hero p {
        font-size: 18px;
        color: var(--text-muted);
        max-width: 520px;
        margin: 0 auto 36px;
      }

      .btn-primary {
        background: var(--primary);
        color: white;
        padding: 16px 32px;
        border-radius: var(--radius);
        border: none;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        transition: background 0.2s, transform 0.1s;
      }

      .btn-primary:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
      }

      .hero-stats {
        display: flex;
        justify-content: center;
        gap: 48px;
        margin-top: 56px;
        flex-wrap: wrap;
      }

      .stat { text-align: center; }
      .stat-value { font-size: 28px; font-weight: 800; color: var(--primary); }
      .stat-label { font-size: 13px; color: var(--text-muted); }

      /* ── Menu/Features Grid ── */
      .menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 20px;
      }

      .menu-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 24px;
        transition: transform 0.2s, box-shadow 0.2s;
        cursor: pointer;
      }

      .menu-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.4);
        border-color: rgba(227,79,38,0.3);
      }

      .menu-icon { font-size: 36px; margin-bottom: 14px; display: block; }
      .menu-card h3 { font-size: 17px; margin-bottom: 8px; }
      .menu-card p { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; }
      .menu-price { font-size: 18px; font-weight: 700; color: var(--primary); }

      /* ── Testimonials ── */
      .testimonials-section { background: var(--bg-card); }

      .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
      }

      .testimonial-card {
        background: var(--bg);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 24px;
      }

      .stars { color: var(--accent); font-size: 16px; margin-bottom: 12px; }
      .testimonial-text { font-size: 14px; color: var(--text-muted); margin-bottom: 16px; font-style: italic; line-height: 1.7; }
      .testimonial-author { font-size: 14px; font-weight: 600; }
      .testimonial-location { font-size: 12px; color: var(--text-muted); }

      /* ── Contact ── */
      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        align-items: start;
      }

      .contact-info h3 { font-size: 20px; margin-bottom: 16px; }
      .contact-info p { color: var(--text-muted); font-size: 15px; margin-bottom: 24px; }

      .contact-detail {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
        color: var(--text-muted);
        font-size: 14px;
      }

      label {
        display: block;
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      input, textarea, select {
        width: 100%;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 12px;
        color: var(--text);
        font-size: 14px;
        margin-bottom: 16px;
        font-family: Arial, sans-serif;
        transition: border-color 0.2s;
      }

      input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: var(--primary);
      }

      /* ── Footer ── */
      footer {
        background: var(--bg-card);
        border-top: 1px solid var(--border);
        padding: 32px 24px;
        text-align: center;
      }

      footer p { color: var(--text-muted); font-size: 13px; }
      footer a { color: var(--primary); text-decoration: none; }

      /* ── Responsive ── */
      @media (max-width: 768px) {
        .nav-links { display: none; }
        .contact-grid { grid-template-columns: 1fr; }
        .hero-stats { gap: 24px; }
        section { padding: 56px 20px; }
      }

    </style>
  </head>
  <body>

    <nav>
      <div class="nav-logo">Accra<span>Bites</span></div>
      <div class="nav-links">
        <a href="#menu">Menu</a>
        <a href="#testimonials">Reviews</a>
        <a href="#contact">Contact</a>
        <a href="#contact" class="nav-cta">Order Now</a>
      </div>
    </nav>

    <main>

      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <h1>Fresh Ghanaian Food<br><span>Delivered to You</span></h1>
          <p>Authentic jollof rice, waakye, banku and more — delivered hot to your door anywhere in Accra. Order in minutes, eat in 30.</p>
          <a href="#menu" class="btn-primary">View Our Menu →</a>
          <div class="hero-stats">
            <div class="stat">
              <div class="stat-value">500+</div>
              <div class="stat-label">Happy Customers</div>
            </div>
            <div class="stat">
              <div class="stat-value">30min</div>
              <div class="stat-label">Average Delivery</div>
            </div>
            <div class="stat">
              <div class="stat-value">4.9★</div>
              <div class="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Menu -->
      <section id="menu">
        <div class="container">
          <span class="section-tag">// Our Menu</span>
          <h2 class="section-title">Ghanaian Favourites</h2>
          <div class="menu-grid">
            <div class="menu-card">
              <span class="menu-icon">🍚</span>
              <h3>Jollof Rice</h3>
              <p>Our signature smoky jollof served with your choice of chicken, beef, or fish.</p>
              <div class="menu-price">GHS 35</div>
            </div>
            <div class="menu-card">
              <span class="menu-icon">🫘</span>
              <h3>Waakye Special</h3>
              <p>Rice and beans with spaghetti, wele, egg, and our house stew.</p>
              <div class="menu-price">GHS 28</div>
            </div>
            <div class="menu-card">
              <span class="menu-icon">🐟</span>
              <h3>Banku and Tilapia</h3>
              <p>Hand-rolled banku with grilled whole tilapia and pepper sauce.</p>
              <div class="menu-price">GHS 55</div>
            </div>
            <div class="menu-card">
              <span class="menu-icon">🍗</span>
              <h3>Kelewele</h3>
              <p>Spiced fried plantain — perfect as a snack or side dish.</p>
              <div class="menu-price">GHS 15</div>
            </div>
            <div class="menu-card">
              <span class="menu-icon">🥜</span>
              <h3>Groundnut Soup</h3>
              <p>Rich peanut soup with fufu — made fresh every morning.</p>
              <div class="menu-price">GHS 45</div>
            </div>
            <div class="menu-card">
              <span class="menu-icon">🧃</span>
              <h3>Fresh Sobolo</h3>
              <p>Chilled hibiscus drink with ginger and cloves. Refreshing and natural.</p>
              <div class="menu-price">GHS 10</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials-section" id="testimonials">
        <div class="container">
          <span class="section-tag">// What People Say</span>
          <h2 class="section-title">Customer Reviews</h2>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">The jollof rice tastes exactly like my grandmother's. Fast delivery and still hot when it arrived. Will definitely order again.</p>
              <div class="testimonial-author">Kofi Mensah</div>
              <div class="testimonial-location">East Legon, Accra</div>
            </div>
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">Finally a delivery service that gets Ghanaian food right. The waakye special is incredible. Ordered three times this week!</p>
              <div class="testimonial-author">Abena Asante</div>
              <div class="testimonial-location">Labone, Accra</div>
            </div>
            <div class="testimonial-card">
              <div class="stars">★★★★★</div>
              <p class="testimonial-text">My office orders AccraBites every Friday. 15 people, all different orders, delivered together and perfectly packaged. Impressive.</p>
              <div class="testimonial-author">Kwame Boateng</div>
              <div class="testimonial-location">Airport City, Accra</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact">
        <div class="container">
          <span class="section-tag">// Get In Touch</span>
          <h2 class="section-title">Order or Contact Us</h2>
          <div class="contact-grid">
            <div class="contact-info">
              <h3>We Deliver Across Accra</h3>
              <p>Order online or call us directly. We deliver 7 days a week from 7am to 10pm. Minimum order GHS 25. Free delivery on orders over GHS 80.</p>
              <div class="contact-detail">📍 123 Oxford Street, Osu, Accra</div>
              <div class="contact-detail">📞 +233 24 000 0000</div>
              <div class="contact-detail">📧 hello@accrabites.com</div>
              <div class="contact-detail">⏰ 7am – 10pm Daily</div>
            </div>
            <div>
              <label for="name">Your Name</label>
              <input type="text" id="name" placeholder="Ama Owusu">

              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="+233 24 000 0000">

              <label for="address">Delivery Address</label>
              <input type="text" id="address" placeholder="East Legon, Accra">

              <label for="order">Your Order</label>
              <textarea id="order" rows="4" placeholder="Jollof rice x2, Banku x1, Sobolo x2..."></textarea>

              <button class="btn-primary" style="width:100%">Place Order →</button>
            </div>
          </div>
        </div>
      </section>

    </main>

    <footer>
      <p>© 2024 AccraBites · Accra, Ghana · <a href="#">Terms</a> · <a href="#">Privacy</a> · Made with ❤️ in Ghana</p>
    </footer>

  </body>
</html>`,
        quiz: [
          { q: "What makes a landing page 'responsive'?", options: ["It loads fast", "It looks good on all screen sizes using media queries", "It has animations", "It uses JavaScript"], answer: 1 },
          { q: "Why use CSS variables in a large project?", options: ["They load faster", "Change once and update everywhere", "They work in all browsers", "They reduce file size"], answer: 1 },
          { q: "Which semantic element wraps the main content of a page?", options: ["<div>", "<content>", "<main>", "<body>"], answer: 2 },
          { q: "What does backdrop-filter: blur() do on a sticky nav?", options: ["Makes nav transparent", "Blurs content behind the nav for a frosted glass effect", "Blurs the nav itself", "Removes the nav background"], answer: 1 },
        ],
      },
    },
    {
      order: 22,
      title: "Advanced CSS Animations",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Advanced CSS animations go beyond simple transitions. They create loading states, page transitions, interactive feedback, and delightful micro-interactions that make products feel polished and professional.

The animation-delay property lets you stagger animations. By giving each card in a grid a slightly different delay, they appear to cascade in one after another instead of all at once. This draws the eye and feels intentional.

The animation-fill-mode property controls what happens before and after an animation. forwards keeps the final state — essential for entrance animations where you do not want the element to snap back to its starting state.

Complex animations use multiple keyframes with percentage values. 0% is the start, 100% is the end, and you can add as many intermediate steps as needed — 25%, 50%, 75%. Each step can change multiple properties.

The will-change property hints to the browser that an element will be animated, allowing it to optimise rendering in advance. Use it sparingly — only on elements you know will animate.

SVG animations using CSS keyframes are powerful. SVG paths, circles, and rectangles can all be animated. The stroke-dasharray and stroke-dashoffset trick draws paths progressively — used in loading indicators and progress rings.

CSS variables in animations let you create parameterised animations. Define --delay or --duration as a variable on each element and reference it in the animation shorthand. This lets you control staggering and timing from HTML or JavaScript.

Reduced motion is an accessibility concern. Some users experience motion sickness from animations. The prefers-reduced-motion media query lets you disable or reduce animations for those users. Always respect this setting in production code.`,
        keyConcepts: [
          { code: "animation-delay: 0.2s", description: "waits before starting the animation" },
          { code: "animation-fill-mode: forwards", description: "keeps final state after animation ends" },
          { code: "animation-stagger", description: "different delays on each element for cascade effect" },
          { code: "will-change: transform", description: "hints browser to optimise for animation" },
          { code: "@media (prefers-reduced-motion)", description: "disables animations for sensitive users" },
          { code: "stroke-dashoffset", description: "animates SVG path drawing progressively" },
        ],
        exerciseDescription: "Build an animated dashboard with staggered card entrances, a progress ring using SVG animation, a skeleton loading state, and a smooth page reveal. Use animation-fill-mode: forwards and staggered delays to make the cards cascade in.",
        hint: "For staggered animations, give each card a custom delay: card:nth-child(1) { animation-delay: 0.1s } card:nth-child(2) { animation-delay: 0.2s } and so on.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Advanced CSS Animations</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 32px 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      h2 {
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin-bottom: 20px;
        margin-top: 40px;
      }

      /* ── Staggered card entrance ── */
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 40px;
      }

      .stat-card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        opacity: 0;
        animation: fadeSlideUp 0.5s ease forwards;
      }

      .stat-card:nth-child(1) { animation-delay: 0.1s; }
      .stat-card:nth-child(2) { animation-delay: 0.25s; }
      .stat-card:nth-child(3) { animation-delay: 0.4s; }

      .stat-value { font-size: 28px; font-weight: 800; color: #a78bfa; }
      .stat-label { font-size: 12px; color: #475569; margin-top: 4px; text-transform: uppercase; }

      /* ── SVG Progress ring ── */
      .ring-container {
        display: flex;
        gap: 32px;
        align-items: center;
        margin-bottom: 40px;
      }

      .progress-ring { position: relative; width: 100px; height: 100px; }

      .ring-bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 8; }

      .ring-fill {
        fill: none;
        stroke-width: 8;
        stroke-linecap: round;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: stroke-dashoffset 1.5s ease;
      }

      .ring-text {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: 800;
      }

      .ring-sublabel { font-size: 10px; color: #475569; }

      /* ── Skeleton loading ── */
      @keyframes shimmer {
        0% { background-position: -400px 0; }
        100% { background-position: 400px 0; }
      }

      .skeleton {
        background: linear-gradient(90deg, #0f0f1a 25%, #1a1a2e 50%, #0f0f1a 75%);
        background-size: 800px 100%;
        animation: shimmer 1.5s infinite;
        border-radius: 6px;
      }

      .skeleton-card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 12px;
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .skeleton-avatar {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .skeleton-lines { flex: 1; }
      .skeleton-line { height: 12px; margin-bottom: 8px; }
      .skeleton-line.short { width: 60%; }

      /* ── Pulse animation ── */
      @keyframes pulse-ring {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(1.4); opacity: 0; }
      }

      .pulse-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 16px;
      }

      .pulse-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #10b981;
        position: relative;
      }

      .pulse-dot::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        background: #10b981;
        animation: pulse-ring 1.5s ease infinite;
      }

      /* ── Reduced motion ── */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

    </style>
  </head>
  <body>

    <h2>Staggered Card Entrance</h2>
    <div class="card-grid">
      <div class="stat-card">
        <div class="stat-value">550</div>
        <div class="stat-label">XP Earned</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">18</div>
        <div class="stat-label">Lessons</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3🔥</div>
        <div class="stat-label">Day Streak</div>
      </div>
    </div>

    <h2>SVG Progress Rings</h2>
    <div class="ring-container">

      <!-- 72% ring -->
      <div>
        <div class="progress-ring">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle class="ring-bg" cx="50" cy="50" r="42"/>
            <circle class="ring-fill" cx="50" cy="50" r="42"
              stroke="#6366f1"
              stroke-dasharray="263.9"
              stroke-dashoffset="73.9"/>
          </svg>
          <div class="ring-text">
            <span>72%</span>
            <span class="ring-sublabel">HTML/CSS</span>
          </div>
        </div>
      </div>

      <!-- 45% ring -->
      <div>
        <div class="progress-ring">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle class="ring-bg" cx="50" cy="50" r="42"/>
            <circle class="ring-fill" cx="50" cy="50" r="42"
              stroke="#10b981"
              stroke-dasharray="263.9"
              stroke-dashoffset="145.1"/>
          </svg>
          <div class="ring-text">
            <span>45%</span>
            <span class="ring-sublabel">Python</span>
          </div>
        </div>
      </div>

    </div>

    <h2>Skeleton Loading State</h2>
    <div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton-lines">
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>
      <div class="skeleton-card">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton-lines">
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>
    </div>

    <h2 style="margin-top:40px">Live Status Indicator</h2>
    <div class="pulse-wrapper">
      <div class="pulse-dot"></div>
      <span style="font-size:14px;color:#94a3b8">AI Tutor is online and ready</span>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What does animation-fill-mode: forwards do?", options: ["Plays animation forward", "Keeps the final animation state after it ends", "Starts animation immediately", "Loops the animation forward"], answer: 1 },
          { q: "How do you create a staggered cascade effect with CSS animations?", options: ["Use animation-speed on each element", "Give each element a different animation-delay", "Use JavaScript timers", "Use animation-iteration-count"], answer: 1 },
          { q: "Why should you respect prefers-reduced-motion?", options: ["It improves performance", "Some users experience motion sickness from animations", "It is required by browsers", "It makes animations faster"], answer: 1 },
          { q: "What does will-change: transform tell the browser?", options: ["The element cannot be transformed", "To pre-optimise the element for upcoming animation", "The element will transform immediately", "To disable GPU rendering"], answer: 1 },
        ],
      },
    },
    {
      order: 23,
      title: "CSS Filters and Visual Effects",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `CSS filters apply visual effects to elements — similar to photo editing tools but controlled entirely with CSS. They can make images grayscale, add blur, adjust brightness and contrast, apply colour overlays, and create Instagram-like effects.

The filter property takes one or more filter functions. blur() adds gaussian blur — the amount in pixels. brightness() makes elements lighter or darker — 0 is black, 1 is unchanged, 2 is twice as bright. contrast() adjusts contrast. grayscale() removes colour. saturate() boosts or reduces colour intensity. sepia() adds a warm brown tone.

Multiple filters combine in a single filter declaration, separated by spaces. The order matters — they apply left to right.

Hover effects with filter create polished image interactions. Start with grayscale(100%) and transition to grayscale(0%) on hover. The image fades from black and white to full colour — a classic portfolio effect.

The backdrop-filter property applies filters to what is behind an element, not the element itself. backdrop-filter: blur(12px) creates a frosted glass effect on overlays and navigation bars. It requires the element to have some transparency — a background with rgba or a background-color with opacity less than 1.

CSS blend modes control how elements blend with what is behind them. The mix-blend-mode property works like layer blend modes in Photoshop. multiply, screen, overlay, and difference are the most commonly used. Text with mix-blend-mode: difference creates an inversion effect against complex backgrounds.

The clip-path property clips an element to a custom shape — circle, polygon, or SVG path. Combined with hover transitions, clip-path creates reveal animations.`,
        keyConcepts: [
          { code: "filter: blur(4px)", description: "blurs the element" },
          { code: "filter: grayscale(100%)", description: "removes all colour from the element" },
          { code: "filter: brightness(1.2)", description: "makes element 20% brighter" },
          { code: "backdrop-filter: blur(12px)", description: "blurs content behind the element" },
          { code: "mix-blend-mode", description: "controls how element blends with background" },
          { code: "clip-path", description: "clips element to a custom shape" },
        ],
        exerciseDescription: "Build a photo gallery with CSS filter effects. Each image card should start as grayscale and transition to full colour on hover. Create a frosted glass overlay card. Apply blend modes to create a text overlay effect on an image background.",
        hint: "For the frosted glass effect: background: rgba(15,15,26,0.6) combined with backdrop-filter: blur(12px) and a border of rgba(255,255,255,0.1).",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Filters and Visual Effects</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 32px 24px;
      }

      h2 {
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin-bottom: 20px;
        margin-top: 40px;
      }

      /* ── Grayscale hover gallery ── */
      .gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        margin-bottom: 40px;
      }

      .gallery-item {
        height: 160px;
        border-radius: 12px;
        overflow: hidden;
        position: relative;
        cursor: pointer;
      }

      .gallery-bg {
        width: 100%;
        height: 100%;
        transition: filter 0.4s ease, transform 0.4s ease;
        filter: grayscale(100%) brightness(0.8);
      }

      .gallery-item:nth-child(1) .gallery-bg {
        background: linear-gradient(135deg, #667eea, #764ba2);
      }

      .gallery-item:nth-child(2) .gallery-bg {
        background: linear-gradient(135deg, #f093fb, #f5576c);
      }

      .gallery-item:nth-child(3) .gallery-bg {
        background: linear-gradient(135deg, #4facfe, #00f2fe);
      }

      .gallery-item:hover .gallery-bg {
        filter: grayscale(0%) brightness(1);
        transform: scale(1.05);
      }

      .gallery-label {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        font-size: 13px;
        font-weight: 600;
      }

      /* ── Filter controls ── */
      .filter-demo {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 40px;
      }

      .filter-box {
        width: 120px;
        height: 80px;
        border-radius: 10px;
        background: linear-gradient(135deg, #6366f1, #a78bfa);
        display: flex;
        align-items: flex-end;
        padding: 8px;
        font-size: 11px;
        color: white;
        font-weight: 600;
      }

      .blur { filter: blur(3px); }
      .bright { filter: brightness(1.5); }
      .gray { filter: grayscale(100%); }
      .sepia { filter: sepia(100%); }
      .saturate { filter: saturate(2); }
      .contrast { filter: contrast(2); }

      /* ── Frosted glass card ── */
      .frosted-wrapper {
        position: relative;
        height: 200px;
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 40px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      }

      .frosted-card {
        position: absolute;
        inset: 16px;
        background: rgba(10,10,15,0.5);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 12px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .frosted-card h3 { font-size: 20px; margin-bottom: 8px; }
      .frosted-card p { font-size: 14px; color: rgba(255,255,255,0.7); }

      /* ── Clip path ── */
      .clip-demo {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }

      .clip-shape {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #6366f1, #a78bfa);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: 600;
        transition: clip-path 0.4s ease;
      }

      .clip-circle { clip-path: circle(50%); }
      .clip-diamond { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
      .clip-triangle { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
      .clip-hexagon { clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); }

      .clip-shape:hover { clip-path: circle(50%); }

    </style>
  </head>
  <body>

    <h2>Grayscale Hover Gallery</h2>
    <p style="color:#94a3b8;font-size:14px;margin-bottom:16px">Hover over each card to reveal colour</p>
    <div class="gallery">
      <div class="gallery-item">
        <div class="gallery-bg"></div>
        <div class="gallery-label">Purple Gradient</div>
      </div>
      <div class="gallery-item">
        <div class="gallery-bg"></div>
        <div class="gallery-label">Pink Gradient</div>
      </div>
      <div class="gallery-item">
        <div class="gallery-bg"></div>
        <div class="gallery-label">Blue Gradient</div>
      </div>
    </div>

    <h2>CSS Filter Functions</h2>
    <div class="filter-demo">
      <div class="filter-box">Normal</div>
      <div class="filter-box blur">blur(3px)</div>
      <div class="filter-box bright">brightness(1.5)</div>
      <div class="filter-box gray">grayscale</div>
      <div class="filter-box sepia">sepia</div>
      <div class="filter-box saturate">saturate(2)</div>
      <div class="filter-box contrast">contrast(2)</div>
    </div>

    <h2>Frosted Glass Effect</h2>
    <div class="frosted-wrapper">
      <div class="frosted-card">
        <h3>Frosted Glass</h3>
        <p>backdrop-filter: blur(12px) creates this effect. The gradient behind shows through the blurred, semi-transparent overlay.</p>
      </div>
    </div>

    <h2>Clip Path Shapes</h2>
    <p style="color:#94a3b8;font-size:14px;margin-bottom:16px">Hover to see them morph into circles</p>
    <div class="clip-demo">
      <div class="clip-shape clip-circle">circle</div>
      <div class="clip-shape clip-diamond">diamond</div>
      <div class="clip-shape clip-triangle">triangle</div>
      <div class="clip-shape clip-hexagon">hexagon</div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What does filter: grayscale(100%) do?", options: ["Adds a grey border", "Removes all colour from the element", "Makes the element transparent", "Blurs the element"], answer: 1 },
          { q: "What is the difference between filter and backdrop-filter?", options: ["No difference", "filter applies to the element, backdrop-filter applies to what is behind it", "backdrop-filter is faster", "filter only works on images"], answer: 1 },
          { q: "What does clip-path do?", options: ["Copies the element", "Clips the element to a custom shape", "Adds a clipping border", "Hides overflow"], answer: 1 },
          { q: "What does filter: blur(4px) do?", options: ["Moves element 4px", "Adds 4px border", "Applies gaussian blur", "Reduces opacity"], answer: 2 },
        ],
      },
    },
    {
      order: 24,
      title: "CSS Architecture and BEM",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `As projects grow, CSS becomes hard to manage. Styles conflict. Class names are confusing. Making a change in one place breaks something somewhere else. CSS architecture solves this with conventions that make CSS predictable, scalable, and maintainable.

BEM stands for Block Element Modifier. It is a naming convention that makes CSS self-documenting. A block is a standalone component — button, card, nav. An element is a part of a block — button__text, card__title. A modifier is a variation — button--primary, card--featured.

The double underscore separates block from element. The double dash separates block or element from modifier. This looks verbose but the benefits are enormous — you can read a class name and immediately understand where it belongs and what it does.

BEM prevents the most common CSS problem: specificity wars. When you use only classes — no IDs, no element selectors in combinations — all your selectors have the same specificity. The last rule wins. Everything is predictable.

SMACSS — Scalable and Modular Architecture for CSS — organises CSS into five categories: Base (resets, defaults), Layout (page structure), Module (reusable components), State (interactive states like is-active), and Theme (visual variations).

The ITCSS — Inverted Triangle CSS — orders CSS from most general to most specific: Settings, Tools, Generic, Elements, Objects, Components, Utilities. This ensures more specific styles always override more general ones without fighting specificity.

CSS custom properties combined with BEM create component systems. Define a component's variables at the block level and use them in elements. Override variables on modifiers to create variations without duplicating code.

In real teams, CSS architecture is not optional. Without it, a 10,000-line stylesheet becomes unmaintainable in months. With it, three developers can work on CSS simultaneously without conflicts.`,
        keyConcepts: [
          { code: ".block__element", description: "BEM element — part of a block, double underscore" },
          { code: ".block--modifier", description: "BEM modifier — variation of a block, double dash" },
          { code: ".card__title", description: "title element inside a card block" },
          { code: ".btn--primary", description: "primary variation of the button block" },
          { code: "is-active", description: "SMACSS state class — describes current state" },
          { code: "specificity", description: "which CSS rule wins when multiple match" },
        ],
        exerciseDescription: "Refactor a messy component stylesheet to use BEM naming. Build a card component, a button component, and a navigation component all using proper BEM class names. Show both a default and a modifier variation of each component.",
        hint: "Start by identifying the blocks — what are the standalone components? Then identify the elements within each block. Finally add modifiers for variations. Never style elements like .card h3 — always use .card__title.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Architecture and BEM</title>
    <style>
      /* ── Base Reset ── */
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 32px 24px;
        max-width: 800px;
        margin: 0 auto;
      }

      /* ─────────────────────────────────
         BLOCK: .card
         A standalone card component
      ───────────────────────────────── */

      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      /* MODIFIER: .card--featured */
      .card--featured {
        border-color: rgba(99,102,241,0.4);
        background: rgba(99,102,241,0.06);
      }

      /* MODIFIER: .card--danger */
      .card--danger {
        border-color: rgba(239,68,68,0.4);
        background: rgba(239,68,68,0.06);
      }

      /* ELEMENT: .card__header */
      .card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      /* ELEMENT: .card__title */
      .card__title {
        font-size: 16px;
        font-weight: 600;
        color: #f8fafc;
      }

      /* ELEMENT: .card__badge */
      .card__badge {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.08em;
        padding: 3px 8px;
        border-radius: 4px;
        background: rgba(99,102,241,0.2);
        color: #a78bfa;
      }

      /* MODIFIER: .card__badge--new */
      .card__badge--new {
        background: rgba(16,185,129,0.2);
        color: #10b981;
      }

      /* MODIFIER: .card__badge--pro */
      .card__badge--pro {
        background: rgba(245,158,11,0.2);
        color: #f59e0b;
      }

      /* ELEMENT: .card__body */
      .card__body {
        color: #94a3b8;
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      /* ELEMENT: .card__footer */
      .card__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        border-top: 1px solid rgba(255,255,255,0.06);
      }

      /* ELEMENT: .card__meta */
      .card__meta {
        font-size: 12px;
        color: #475569;
      }

      /* ─────────────────────────────────
         BLOCK: .btn
         A standalone button component
      ───────────────────────────────── */

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid transparent;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        text-decoration: none;
      }

      /* MODIFIER: .btn--primary */
      .btn--primary {
        background: #6366f1;
        color: white;
        border-color: #6366f1;
      }

      .btn--primary:hover { background: #4f46e5; }

      /* MODIFIER: .btn--secondary */
      .btn--secondary {
        background: transparent;
        color: #94a3b8;
        border-color: rgba(255,255,255,0.1);
      }

      .btn--secondary:hover {
        border-color: rgba(255,255,255,0.3);
        color: #f8fafc;
      }

      /* MODIFIER: .btn--danger */
      .btn--danger {
        background: rgba(239,68,68,0.1);
        color: #ef4444;
        border-color: rgba(239,68,68,0.3);
      }

      /* MODIFIER: .btn--sm */
      .btn--sm { padding: 5px 10px; font-size: 11px; }

      /* ─────────────────────────────────
         BLOCK: .nav
         Navigation component
      ───────────────────────────────── */

      .nav {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 24px;
        flex-wrap: wrap;
      }

      .nav__logo {
        font-weight: bold;
        color: #a78bfa;
        margin-right: auto;
        font-size: 16px;
      }

      .nav__item {
        color: #94a3b8;
        text-decoration: none;
        font-size: 14px;
        padding: 6px 12px;
        border-radius: 6px;
        transition: all 0.15s;
      }

      .nav__item:hover { color: #f8fafc; background: rgba(255,255,255,0.05); }

      /* MODIFIER: .nav__item--active */
      .nav__item--active {
        color: #f8fafc;
        background: rgba(99,102,241,0.15);
      }

      h3 {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin: 24px 0 12px;
      }

    </style>
  </head>
  <body>

    <!-- BEM Navigation -->
    <h3>Block: .nav</h3>
    <nav class="nav">
      <span class="nav__logo">CodePath</span>
      <a href="#" class="nav__item nav__item--active">Dashboard</a>
      <a href="#" class="nav__item">Lessons</a>
      <a href="#" class="nav__item">Projects</a>
    </nav>

    <!-- BEM Cards -->
    <h3>Block: .card with modifiers</h3>

    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Default Card</h2>
        <span class="card__badge">LESSON</span>
      </div>
      <p class="card__body">This is the default card block. Notice how every class name tells you exactly what it is and where it belongs.</p>
      <div class="card__footer">
        <span class="card__meta">Lesson 24 · 50 XP</span>
        <button class="btn btn--primary btn--sm">Start →</button>
      </div>
    </div>

    <div class="card card--featured">
      <div class="card__header">
        <h2 class="card__title">Featured Card</h2>
        <span class="card__badge card__badge--pro">PRO</span>
      </div>
      <p class="card__body">The card--featured modifier changes the border and background. Same structure, different visual treatment.</p>
      <div class="card__footer">
        <span class="card__meta">Advanced · 75 XP</span>
        <button class="btn btn--secondary btn--sm">Preview</button>
      </div>
    </div>

    <!-- BEM Buttons -->
    <h3>Block: .btn with modifiers</h3>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn--primary">Primary</button>
      <button class="btn btn--secondary">Secondary</button>
      <button class="btn btn--danger">Delete</button>
      <button class="btn btn--primary btn--sm">Small Primary</button>
      <button class="btn btn--secondary btn--sm">Small Secondary</button>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "In BEM, what does the double underscore (__) represent?", options: ["A modifier", "An element inside a block", "A block variation", "A state class"], answer: 1 },
          { q: "In BEM, what does the double dash (--) represent?", options: ["An element", "A block", "A modifier or variation", "A state"], answer: 2 },
          { q: "What problem does BEM solve?", options: ["Slow CSS loading", "Naming conflicts and unpredictable specificity", "Browser compatibility", "Animation performance"], answer: 1 },
          { q: "Which of these is correct BEM naming?", options: [".card .title", ".card-title", ".card__title", "#card-title"], answer: 2 },
        ],
      },
    },
    {
      order: 25,
      title: "Web Accessibility",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Accessibility means building websites that work for everyone — including people who use screen readers, keyboard navigation, or have visual, motor, or cognitive impairments. In Ghana, where disabilities affect millions of people, accessible websites are not just ethical — they are a business advantage.

The Web Content Accessibility Guidelines — WCAG — define four principles: Perceivable, Operable, Understandable, and Robust. WCAG 2.1 has three conformance levels — A, AA, and AAA. Level AA is the standard for most websites.

Semantic HTML is the foundation of accessibility. Screen readers rely on HTML structure to understand and navigate content. Using header, nav, main, section, article, and footer gives screen reader users the ability to jump between sections.

ARIA — Accessible Rich Internet Applications — is a set of attributes that supplement HTML semantics for complex interactive components. aria-label provides a text description for elements without visible labels. aria-hidden hides decorative elements from screen readers. role defines the semantic role of an element.

Keyboard accessibility means every interactive element can be reached and used with just the keyboard. Tab moves between focusable elements. Enter activates buttons and links. Arrow keys navigate within components. Never remove the focus outline without providing an alternative.

Colour contrast is critical for users with low vision. The WCAG AA standard requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Tools like the Chrome DevTools contrast checker or WebAIM's contrast checker verify compliance.

Alternative text for images is not optional. Every meaningful image needs an alt attribute describing what it shows. Decorative images get an empty alt="" so screen readers skip them.

Forms need clear labels — not just placeholders. Placeholders disappear when typing begins and have poor contrast. Labels persist and connect clearly to their inputs via the for and id attributes.`,
        keyConcepts: [
          { code: "aria-label", description: "provides text description for screen readers" },
          { code: "aria-hidden='true'", description: "hides decorative element from screen readers" },
          { code: "role='button'", description: "defines semantic role of non-button elements" },
          { code: "alt='description'", description: "text alternative for images" },
          { code: "focus outline", description: "visual indicator of keyboard focus — never remove" },
          { code: "tab-index", description: "controls keyboard focus order" },
        ],
        exerciseDescription: "Audit and fix an inaccessible page. Add proper ARIA labels to icon buttons, fix colour contrast on muted text, add alt text to images, ensure all interactive elements are keyboard accessible, and add skip navigation link. Test by tabbing through the page.",
        hint: "For icon-only buttons, always add aria-label: <button aria-label='Close menu'>✕</button>. The label replaces the visual content for screen readers.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Accessible CodePath</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        line-height: 1.7;
      }

      /* ── Skip link ── */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #6366f1;
        color: white;
        padding: 8px 16px;
        border-radius: 0 0 8px 0;
        text-decoration: none;
        font-size: 14px;
        z-index: 1000;
        transition: top 0.2s;
      }

      .skip-link:focus { top: 0; }

      /* ── Navigation ── */
      nav {
        background: #0f0f1a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo { font-weight: bold; color: #a78bfa; font-size: 18px; }

      .nav-links { display: flex; gap: 8px; }

      .nav-links a {
        color: #94a3b8;
        text-decoration: none;
        padding: 8px 14px;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.15s;
      }

      /* Good focus styles — visible, not removed */
      .nav-links a:focus,
      button:focus,
      input:focus,
      textarea:focus {
        outline: 2px solid #6366f1;
        outline-offset: 2px;
      }

      .nav-links a:hover { color: #f8fafc; background: rgba(255,255,255,0.05); }

      /* ── Main content ── */
      main {
        max-width: 720px;
        margin: 0 auto;
        padding: 40px 24px;
      }

      /* ── Accessible card ── */
      .card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 20px;
        position: relative;
      }

      .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
      }

      .card h2 { font-size: 17px; color: #f8fafc; }

      /* Good contrast — not muted too much */
      .card p { font-size: 14px; color: #94a3b8; line-height: 1.7; margin-bottom: 16px; }

      /* Icon button with aria-label */
      .icon-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #94a3b8;
        flex-shrink: 0;
        transition: all 0.15s;
      }

      .icon-btn:hover { background: rgba(255,255,255,0.1); color: #f8fafc; }

      /* ── Accessible form ── */
      .form-group { margin-bottom: 20px; }

      label {
        display: block;
        font-size: 14px;
        color: #f8fafc;
        margin-bottom: 6px;
        font-weight: 500;
      }

      .required { color: #ef4444; margin-left: 2px; }

      input, textarea {
        width: 100%;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px;
        padding: 12px;
        color: #f8fafc;
        font-size: 14px;
        font-family: Arial, sans-serif;
        transition: border-color 0.2s;
      }

      input:focus, textarea:focus {
        border-color: #6366f1;
      }

      /* Visible error state */
      input[aria-invalid='true'] {
        border-color: #ef4444;
      }

      .error-msg {
        color: #ef4444;
        font-size: 12px;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .hint-text {
        color: #94a3b8;
        font-size: 12px;
        margin-top: 6px;
      }

      .btn {
        background: #6366f1;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s;
      }

      .btn:hover { background: #4f46e5; }

      /* ── Progress indicator ── */
      .progress-section { margin-bottom: 32px; }

      .progress-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
        color: #f8fafc;
      }

      .progress-bar {
        height: 8px;
        background: rgba(255,255,255,0.08);
        border-radius: 4px;
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: #6366f1;
        border-radius: 4px;
        width: 60%;
      }

    </style>
  </head>
  <body>

    <!-- Skip navigation link — first interactive element -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Semantic navigation with ARIA -->
    <nav aria-label="Main navigation">
      <div class="nav-logo">
        <a href="/" style="color:inherit;text-decoration:none">CodePath</a>
      </div>
      <div class="nav-links" role="list">
        <a href="#" role="listitem">Tracks</a>
        <a href="#" role="listitem">Projects</a>
        <a href="#" role="listitem" aria-current="page">Dashboard</a>
      </div>
    </nav>

    <!-- Main content with ID for skip link -->
    <main id="main-content" tabindex="-1">

      <!-- Progress with ARIA -->
      <section aria-labelledby="progress-heading" class="progress-section">
        <h2 id="progress-heading" style="font-size:18px;margin-bottom:16px">Your Progress</h2>
        <div class="progress-label">
          <span>HTML & CSS Foundation</span>
          <span aria-label="60 percent complete">60%</span>
        </div>
        <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" aria-label="HTML and CSS course progress">
          <div class="progress-fill"></div>
        </div>
      </section>

      <!-- Card with accessible icon buttons -->
      <div class="card" role="article" aria-labelledby="lesson-title">
        <div class="card-header">
          <div>
            <h2 id="lesson-title">Lesson 25 — Web Accessibility</h2>
            <p>Learn to build websites that work for everyone, including users with disabilities.</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="icon-btn" aria-label="Bookmark this lesson">🔖</button>
            <button class="icon-btn" aria-label="Share this lesson">🔗</button>
          </div>
        </div>
        <div style="display:flex;gap:10px">
          <button class="btn">Continue Lesson</button>
        </div>
      </div>

      <!-- Accessible form -->
      <section aria-labelledby="form-heading">
        <h2 id="form-heading" style="font-size:18px;margin-bottom:20px">Contact Support</h2>

        <div class="form-group">
          <label for="name">
            Full Name <span class="required" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autocomplete="name"
            placeholder="Kofi Mensah"
            aria-required="true"
            aria-describedby="name-hint"
          >
          <p class="hint-text" id="name-hint">Enter your first and last name</p>
        </div>

        <div class="form-group">
          <label for="email">
            Email Address <span class="required" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autocomplete="email"
            placeholder="kofi@example.com"
            aria-required="true"
            aria-invalid="true"
            aria-describedby="email-error"
          >
          <p class="error-msg" id="email-error" role="alert">
            ⚠ Please enter a valid email address
          </p>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Describe your issue..."
            aria-describedby="message-hint"
          ></textarea>
          <p class="hint-text" id="message-hint">Minimum 20 characters</p>
        </div>

        <button class="btn" type="submit">Send Message</button>
      </section>

    </main>

  </body>
</html>`,
        quiz: [
          { q: "What does aria-label do?", options: ["Adds a visual label", "Provides a text description for screen readers", "Hides the element", "Adds a tooltip"], answer: 1 },
          { q: "Why should you never remove the focus outline?", options: ["It looks bad", "Keyboard users need it to know which element is focused", "It slows the page", "It conflicts with CSS"], answer: 1 },
          { q: "What is the WCAG minimum contrast ratio for normal text?", options: ["2:1", "3:1", "4.5:1", "7:1"], answer: 2 },
          { q: "What alt text should a decorative image have?", options: ["'decorative'", "'image'", "No alt attribute", "Empty alt=''"], answer: 3 },
        ],
      },
    },
    {
      order: 26,
      title: "CSS Performance and Optimization",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Performance is a feature. A website that loads in 1 second on a slow Ghanaian mobile network converts and retains users. The same site loading in 5 seconds loses most of them before they see the content.

CSS performance has two dimensions: how fast the CSS file downloads, and how fast the browser applies it. Both matter.

File size: Avoid duplicating styles. Use shorthand properties — margin: 8px 16px instead of margin-top, margin-right, margin-bottom, margin-left separately. Remove unused CSS — tools like PurgeCSS scan your HTML and remove any classes not found.

Critical CSS: The browser blocks rendering until it downloads and parses CSS. For fast initial paint, inline the CSS needed for above-the-fold content directly in a style tag in the head. Load the rest of the stylesheet asynchronously.

Render performance: The browser recalculates layout when you change properties that affect size or position — width, height, margin, padding, top, left. This is expensive. Prefer transform and opacity which use the GPU and do not trigger layout recalculation.

Avoid layout thrashing: Reading then writing CSS properties in JavaScript causes the browser to recalculate layout for every write. Batch reads together and batch writes together.

CSS containment: The contain property tells the browser that an element's subtree is independent. contain: layout means changes inside this element cannot affect elements outside it. This allows the browser to skip large parts of the document when recalculating.

Font loading: Custom fonts are a common performance bottleneck. Use font-display: swap so text shows immediately in a system font while the custom font loads. Subset fonts to include only the characters you need.

Images: Use appropriate formats. JPEG for photos. PNG for images needing transparency. WebP for everything when browser support allows — it is 25-34% smaller than JPEG. Always specify width and height on images to prevent layout shift.`,
        keyConcepts: [
          { code: "transform and opacity", description: "animate these — they use GPU and skip layout" },
          { code: "font-display: swap", description: "shows text immediately while font loads" },
          { code: "contain: layout", description: "isolates element from layout recalculation" },
          { code: "will-change: transform", description: "hints browser to pre-optimise for animation" },
          { code: "critical CSS", description: "inline styles needed for above-fold content" },
          { code: "prefers-reduced-motion", description: "disables animations for sensitive users" },
        ],
        exerciseDescription: "Audit and optimise a poorly performing page. Identify CSS that triggers layout, replace with transform-based alternatives. Add font-display: swap to font loading. Inline critical CSS. Add contain properties to independent components. Measure the improvement.",
        hint: "The key rule: never animate width, height, top, left, margin, or padding. Always use transform: translateX/Y/scale instead. They accomplish the same visual result but skip the expensive layout step.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>CSS Performance</title>

    <!--
      CRITICAL CSS — inlined for immediate render
      Only styles needed for above-the-fold content
    -->
    <style>
      /* Critical: body, nav, hero */
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
      }

      /* Nav is above fold — critical */
      nav {
        background: #0f0f1a;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo { font-weight: bold; color: #a78bfa; }

      /* Hero is above fold — critical */
      .hero {
        padding: 80px 24px;
        text-align: center;
        max-width: 700px;
        margin: 0 auto;
      }

      .hero h1 { font-size: 40px; margin-bottom: 16px; }
      .hero p { color: #94a3b8; font-size: 17px; }
    </style>

    <!--
      NON-CRITICAL CSS — loaded async (below fold content)
      In production, this would be a separate file loaded with
      <link rel="preload" as="style"> and onload swap
    -->
    <style>
      /* Cards — below fold */
      .content { max-width: 800px; margin: 0 auto; padding: 40px 24px; }

      h2 {
        font-size: 13px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin: 32px 0 16px;
      }

      /* ── GOOD: GPU-accelerated animation ── */
      .good-animation {
        background: #0f0f1a;
        border: 1px solid rgba(99,102,241,0.3);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 12px;
        cursor: pointer;
        /* transform does NOT trigger layout */
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .good-animation:hover {
        transform: translateY(-4px);  /* GPU — fast */
        box-shadow: 0 12px 32px rgba(0,0,0,0.4);  /* GPU — fast */
      }

      /* ── BAD: layout-triggering animation ── */
      .bad-animation {
        background: #0f0f1a;
        border: 1px solid rgba(239,68,68,0.3);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 12px;
        cursor: pointer;
        transition: margin-top 0.2s ease, padding 0.2s ease;
      }

      .bad-animation:hover {
        margin-top: -4px;  /* Triggers layout — slow */
        padding: 24px;     /* Triggers layout — slow */
      }

      .card-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 8px;
        display: block;
      }

      .good .card-label { color: #10b981; }
      .bad .card-label { color: #ef4444; }

      .card-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
      .card-desc { font-size: 13px; color: #94a3b8; }

      /* ── contain property demo ── */
      .contained {
        contain: layout style;
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 12px;
      }

      /* ── Font loading ── */
      .font-demo {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
        font-size: 14px;
        color: #94a3b8;
        line-height: 1.7;
      }

      code {
        background: rgba(255,255,255,0.06);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 12px;
        color: #a78bfa;
      }

      /* ── Checklist ── */
      .checklist { list-style: none; }
      .checklist li {
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        font-size: 14px;
        color: #94a3b8;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .check { color: #10b981; font-size: 16px; }
      .cross { color: #ef4444; font-size: 16px; }
    </style>
  </head>
  <body>

    <nav>
      <div class="nav-logo">CodePath</div>
      <span style="font-size:13px;color:#94a3b8">Performance Lesson</span>
    </nav>

    <section class="hero">
      <h1>CSS Performance</h1>
      <p>Fast websites retain users. Slow websites lose them. Learn the rules that separate 1-second pages from 5-second pages.</p>
    </section>

    <div class="content">

      <h2>Animation Performance</h2>
      <p style="font-size:14px;color:#94a3b8;margin-bottom:16px">Hover both cards. The green one uses GPU. The red one triggers layout recalculation on every frame.</p>

      <div class="good-animation good">
        <span class="card-label">✅ Good — GPU Accelerated</span>
        <div class="card-title">transform: translateY(-4px)</div>
        <div class="card-desc">Uses transform — runs on GPU. Does not trigger layout. Smooth at 60fps even on mobile.</div>
      </div>

      <div class="bad-animation bad">
        <span class="card-label">❌ Bad — Triggers Layout</span>
        <div class="card-title">margin-top: -4px</div>
        <div class="card-desc">Uses margin — triggers full layout recalculation. Forces browser to recalculate positions of every element on the page.</div>
      </div>

      <h2>CSS Containment</h2>
      <div class="contained">
        <div class="card-title">contain: layout style</div>
        <div class="card-desc">This element is isolated. Changes inside it cannot affect elements outside. The browser skips this subtree when recalculating the rest of the page. Essential for complex components like virtual scroll lists.</div>
      </div>

      <h2>Performance Checklist</h2>
      <ul class="checklist">
        <li><span class="check">✓</span> Animate only transform and opacity</li>
        <li><span class="check">✓</span> Use font-display: swap for web fonts</li>
        <li><span class="check">✓</span> Inline critical above-fold CSS</li>
        <li><span class="check">✓</span> Add width and height to all images</li>
        <li><span class="check">✓</span> Use CSS variables to avoid duplication</li>
        <li><span class="cross">✗</span> Never animate margin, padding, width, height</li>
        <li><span class="cross">✗</span> Never use @import in CSS files</li>
        <li><span class="cross">✗</span> Never load fonts that are not used</li>
      </ul>

      <h2>Font Loading</h2>
      <div class="font-demo">
        Always add <code>font-display: swap</code> to your @font-face declarations. Without it, text is invisible while the font downloads — called FOIT (Flash of Invisible Text). With swap, text shows immediately in a fallback font, then swaps when the custom font arrives — called FOUT (Flash of Unstyled Text). FOUT is far better than FOIT for users on slow connections.
      </div>

    </div>

  </body>
</html>`,
        quiz: [
          { q: "Which CSS properties should you animate for best performance?", options: ["width and height", "margin and padding", "transform and opacity", "background and color"], answer: 2 },
          { q: "What does font-display: swap do?", options: ["Swaps fonts between pages", "Shows text in fallback font while custom font loads", "Removes the font", "Downloads two fonts at once"], answer: 1 },
          { q: "What does contain: layout tell the browser?", options: ["The element cannot be laid out", "Changes inside cannot affect elements outside", "The element is fixed position", "The layout is complete"], answer: 1 },
          { q: "What is critical CSS?", options: ["CSS that causes errors", "CSS needed for above-fold content, inlined for fast render", "The most important CSS file", "CSS that must be loaded last"], answer: 1 },
        ],
      },
    },
    {
      order: 27,
      title: "Advanced CSS Grid",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Advanced CSS Grid goes beyond basic column definitions to create complex, magazine-style layouts that were impossible before Grid. Named grid areas, auto-placement algorithms, and subgrid enable designs that previously required extensive JavaScript or complex float-based hacks.

Named grid areas let you define layout visually in CSS using the grid-template-areas property. You draw the layout as ASCII art — each string represents a row, each word represents a named area. An element assigned to a named area spans exactly that space. This makes complex layouts readable and maintainable.

The auto-placement algorithm places items automatically when you do not explicitly position them. grid-auto-flow: dense fills in gaps caused by items with different sizes. This is how Pinterest-style masonry-like layouts are built.

The minmax() function sets minimum and maximum sizes for tracks. grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) creates responsive grids that change column count automatically based on available space — no media queries needed.

Subgrid allows nested grids to align with the parent grid. Without subgrid, nested elements break out of the parent grid's alignment. With subgrid, a child grid can inherit the parent's column or row tracks.

Grid lines can be named for easier placement. Instead of grid-column: 3 / 5, you can use grid-column: sidebar-start / main-end with named lines.

The gap property works differently from margins — it only applies between tracks, not on outer edges. This eliminates the half-margin hack that was common with float-based grids.

Dense packing with grid-auto-flow: dense is powerful but changes visual order — items may appear in a different order than their DOM order, which can confuse keyboard and screen reader users. Use it carefully.`,
        keyConcepts: [
          { code: "grid-template-areas", description: "defines layout with named regions visually" },
          { code: "grid-area: header", description: "places element in the named grid area" },
          { code: "grid-auto-flow: dense", description: "fills gaps by pulling items forward" },
          { code: "subgrid", description: "nested grid inherits parent grid tracks" },
          { code: "auto-fill vs auto-fit", description: "auto-fill keeps empty columns, auto-fit collapses them" },
          { code: "minmax(200px, 1fr)", description: "track is minimum 200px but grows to fill space" },
        ],
        exerciseDescription: "Build a magazine-style article layout using named grid areas. The layout should have a header, featured image area, article body, sidebar, and footer — all positioned using grid-template-areas. Add a responsive card grid that uses auto-fill to change columns without media queries.",
        hint: "In grid-template-areas, use a period (.) to represent an empty cell. Each string must have the same number of columns. Every named area must form a rectangle.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Advanced CSS Grid</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        padding: 24px;
      }

      /* ── Named Grid Areas Layout ── */
      .magazine {
        max-width: 1000px;
        margin: 0 auto 48px;
        display: grid;
        grid-template-columns: 1fr 280px;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas:
          "header  header"
          "feature feature"
          "article sidebar"
          "footer  footer";
        gap: 16px;
      }

      /* Place elements in named areas */
      .mag-header  { grid-area: header; }
      .mag-feature { grid-area: feature; }
      .mag-article { grid-area: article; }
      .mag-sidebar { grid-area: sidebar; }
      .mag-footer  { grid-area: footer; }

      /* Style each area */
      .mag-header {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .mag-header h1 { font-size: 20px; color: #a78bfa; }
      .mag-header p { font-size: 13px; color: #475569; }

      .mag-feature {
        height: 220px;
        background: linear-gradient(135deg, #1a1a35, #0f0f2a);
        border: 1px solid rgba(99,102,241,0.2);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .mag-feature::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at center, rgba(99,102,241,0.15), transparent);
      }

      .mag-feature h2 {
        font-size: 28px;
        text-align: center;
        z-index: 1;
        line-height: 1.3;
      }

      .mag-article {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 24px;
      }

      .mag-article p {
        color: #94a3b8;
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 16px;
      }

      .mag-sidebar {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
      }

      .sidebar-item {
        padding: 12px 0;
        border-bottom: 1px solid rgba(255,255,255,0.06);
        font-size: 13px;
        color: #94a3b8;
      }

      .sidebar-item strong { display: block; color: #f8fafc; margin-bottom: 4px; }

      .mag-footer {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #475569;
      }

      /* ── Auto-responsive card grid ── */
      h2 {
        font-size: 14px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #475569;
        margin-bottom: 16px;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
      }

      .auto-grid {
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        /* auto-fill: creates as many columns as fit at minimum 200px */
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }

      .auto-card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 12px;
        padding: 20px;
      }

      /* Wide card spans 2 columns */
      .auto-card.wide {
        grid-column: span 2;
        background: rgba(99,102,241,0.06);
        border-color: rgba(99,102,241,0.2);
      }

      .auto-card h3 { font-size: 14px; margin-bottom: 8px; }
      .auto-card p { font-size: 13px; color: #94a3b8; }

      /* ── Responsive: stack on mobile ── */
      @media (max-width: 640px) {
        .magazine {
          grid-template-columns: 1fr;
          grid-template-areas:
            "header"
            "feature"
            "article"
            "sidebar"
            "footer";
        }
      }

    </style>
  </head>
  <body>

    <!-- Named Grid Areas -->
    <div class="magazine">

      <header class="mag-header">
        <div>
          <h1>Ghana Tech Weekly</h1>
          <p>Your weekly roundup of Ghanaian technology news</p>
        </div>
        <div style="font-size:13px;color:#6366f1">Issue #47</div>
      </header>

      <div class="mag-feature">
        <h2>Ghana's Coding<br>Renaissance</h2>
      </div>

      <article class="mag-article">
        <p>More Ghanaian students are learning to code than at any point in history. Platforms designed specifically for the African context — with local examples, local pricing, and local community — are making software development accessible to a generation that previously had no affordable pathway.</p>
        <p>The rise of mobile-first education has been particularly impactful. Students in Kumasi, Tamale, and Cape Coast now have access to the same quality of instruction as students in Accra — provided they have a smartphone and an internet connection.</p>
        <p>Industry observers note that the quality of Ghanaian graduates entering the technology sector has improved significantly. Companies report shorter onboarding times and stronger fundamentals among recent hires.</p>
      </article>

      <aside class="mag-sidebar">
        <div class="sidebar-item">
          <strong>This Week</strong>
          CodePath launches Python track
        </div>
        <div class="sidebar-item">
          <strong>In Numbers</strong>
          500+ students enrolled in Q1
        </div>
        <div class="sidebar-item">
          <strong>Quote</strong>
          "Ghana will produce 10,000 engineers by 2030"
        </div>
      </aside>

      <footer class="mag-footer">
        <span>© 2024 Ghana Tech Weekly</span>
        <span>Accra, Ghana</span>
      </footer>

    </div>

    <!-- Auto-responsive grid -->
    <h2>Auto-responsive Grid — resize window to see columns change</h2>
    <div class="auto-grid">
      <div class="auto-card wide">
        <h3>🌐 HTML & CSS Foundation</h3>
        <p>30 lessons — build professional websites with modern CSS</p>
      </div>
      <div class="auto-card">
        <h3>🐍 Python</h3>
        <p>30 lessons — scripting and automation</p>
      </div>
      <div class="auto-card">
        <h3>⚡ JavaScript</h3>
        <p>30 lessons — interactive web apps</p>
      </div>
      <div class="auto-card">
        <h3>🗂️ Full Stack</h3>
        <p>20 lessons — complete applications</p>
      </div>
    </div>

  </body>
</html>`,
        quiz: [
          { q: "What does grid-template-areas do?", options: ["Sets grid column sizes", "Defines layout using named regions", "Creates auto-responsive columns", "Sets gap between grid items"], answer: 1 },
          { q: "What is the difference between auto-fill and auto-fit?", options: ["No difference", "auto-fill keeps empty column space, auto-fit collapses empty columns", "auto-fit is faster", "auto-fill creates more columns"], answer: 1 },
          { q: "How do you make an element span 2 columns in grid?", options: ["width: 2", "grid-span: 2", "grid-column: span 2", "colspan: 2"], answer: 2 },
          { q: "What does a period (.) represent in grid-template-areas?", options: ["A named area called dot", "An empty cell with no area", "A separator between areas", "A full-width area"], answer: 1 },
        ],
      },
    },
    {
      order: 28,
      title: "Advanced Forms and Validation",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Forms are where users interact most intensely with your website. A poorly designed form loses customers. A well-designed form guides users to success. Advanced form design combines HTML validation, CSS feedback, and thoughtful UX.

HTML5 validation attributes let the browser handle basic validation without JavaScript. required makes a field mandatory. minlength and maxlength control character counts. pattern accepts a regex for custom validation. type="email" validates email format. type="tel" for phone numbers. min and max for numeric ranges.

The :valid and :invalid pseudo-classes let you style fields based on their validation state. A useful pattern is to only show error styles after the user has interacted with the field — use the :user-invalid pseudo-class in modern browsers, or JavaScript to add a touched class.

Custom validation messages use the setCustomValidity() JavaScript method. This overrides the browser's default error message with your own text.

Multi-step forms break long forms into pages. Users see progress, the form feels less overwhelming, and completion rates improve. Each step should be a separate section that shows and hides based on current step state.

Field grouping with fieldset and legend improves semantic structure and accessibility. A fieldset groups related fields. The legend provides a caption.

Floating labels — where the label starts as a placeholder inside the field and floats above when the user starts typing — are a popular modern pattern. They save space while keeping labels always visible.

Input masking formats input as the user types — phone numbers, credit cards, dates. This reduces errors and guides users to the correct format.

Form design for Ghana specifically: mobile money fields should accept 10-digit numbers starting with 0. Ghana Card numbers follow a specific format. Addresses in Ghana are GPS-based so consider accepting Ghana Post GPS codes.`,
        keyConcepts: [
          { code: "required", description: "makes field mandatory — browser validates before submit" },
          { code: "pattern='[0-9]{10}'", description: "regex pattern the input must match" },
          { code: ":valid and :invalid", description: "pseudo-classes for styling validation states" },
          { code: "fieldset and legend", description: "groups related fields with a caption" },
          { code: "autocomplete", description: "hints browser for auto-fill options" },
          { code: "inputmode", description: "hints mobile keyboard type to show" },
        ],
        exerciseDescription: "Build a complete mobile money payment form with proper validation. Include: phone number with Ghana format validation, amount field with min/max, PIN field, and a confirmation step. Style validation states with green success and red error indicators.",
        hint: "For the Ghana phone pattern: pattern='0[0-9]{9}' matches 10 digits starting with 0. Add inputmode='numeric' to show the numeric keyboard on mobile.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Advanced Form Validation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }

      body {
        font-family: Arial, sans-serif;
        background: #0a0a0f;
        color: #f8fafc;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .form-card {
        background: #0f0f1a;
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 16px;
        padding: 32px;
        width: 100%;
        max-width: 420px;
      }

      .form-header { margin-bottom: 28px; text-align: center; }
      .form-header h1 { font-size: 22px; margin-bottom: 6px; }
      .form-header p { font-size: 14px; color: #94a3b8; }

      /* ── Progress steps ── */
      .steps {
        display: flex;
        align-items: center;
        margin-bottom: 28px;
        gap: 0;
      }

      .step {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .step-circle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255,255,255,0.06);
        border: 1px solid rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
        color: #475569;
        flex-shrink: 0;
      }

      .step.active .step-circle {
        background: #6366f1;
        border-color: #6366f1;
        color: white;
      }

      .step.done .step-circle {
        background: #10b981;
        border-color: #10b981;
        color: white;
      }

      .step-label { font-size: 12px; color: #475569; }
      .step.active .step-label { color: #f8fafc; }

      .step-line {
        flex: 1;
        height: 1px;
        background: rgba(255,255,255,0.08);
        margin: 0 8px;
      }

      /* ── Form fields ── */
      .form-group { margin-bottom: 20px; }

      label {
        display: block;
        font-size: 13px;
        color: #f8fafc;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .input-wrapper { position: relative; }

      input {
        width: 100%;
        background: rgba(255,255,255,0.05);
        border: 1.5px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 12px 40px 12px 14px;
        color: #f8fafc;
        font-size: 15px;
        font-family: Arial, sans-serif;
        transition: border-color 0.2s;
        outline: none;
      }

      input:focus {
        border-color: #6366f1;
      }

      /* Valid state */
      input:not(:placeholder-shown):valid {
        border-color: #10b981;
      }

      /* Invalid state — only after interaction */
      input.touched:invalid {
        border-color: #ef4444;
      }

      .input-icon {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s;
      }

      .valid-icon { color: #10b981; }
      .invalid-icon { color: #ef4444; }

      input:not(:placeholder-shown):valid ~ .valid-icon { opacity: 1; }
      input.touched:invalid ~ .valid-icon { opacity: 0; }
      input.touched:invalid ~ .invalid-icon { opacity: 1; }

      .hint {
        font-size: 12px;
        color: #475569;
        margin-top: 6px;
      }

      .error {
        font-size: 12px;
        color: #ef4444;
        margin-top: 6px;
        display: none;
      }

      input.touched:invalid ~ .error { display: block; }
      input.touched:invalid ~ .hint { display: none; }

      /* ── Amount display ── */
      .amount-display {
        text-align: center;
        padding: 16px;
        background: rgba(99,102,241,0.08);
        border: 1px solid rgba(99,102,241,0.2);
        border-radius: 10px;
        margin-bottom: 20px;
      }

      .amount-label { font-size: 12px; color: #94a3b8; margin-bottom: 4px; }
      .amount-value { font-size: 28px; font-weight: 800; color: #a78bfa; }

      /* ── Button ── */
      .btn {
        width: 100%;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 14px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
        margin-top: 8px;
      }

      .btn:hover { background: #4f46e5; }

      .btn:disabled {
        background: rgba(99,102,241,0.3);
        cursor: not-allowed;
      }

      /* PIN field */
      .pin-input {
        letter-spacing: 0.3em;
        font-family: monospace;
        text-align: center;
        font-size: 24px;
      }

    </style>
  </head>
  <body>

    <div class="form-card">

      <div class="form-header">
        <div style="font-size:32px;margin-bottom:12px">📱</div>
        <h1>Mobile Money</h1>
        <p>Send money securely with MTN Mobile Money</p>
      </div>

      <!-- Progress steps -->
      <div class="steps">
        <div class="step done">
          <div class="step-circle">✓</div>
          <div class="step-label">Login</div>
        </div>
        <div class="step-line"></div>
        <div class="step active">
          <div class="step-circle">2</div>
          <div class="step-label">Send</div>
        </div>
        <div class="step-line"></div>
        <div class="step">
          <div class="step-circle">3</div>
          <div class="step-label">Confirm</div>
        </div>
      </div>

      <form novalidate>

        <!-- Recipient phone -->
        <div class="form-group">
          <label for="phone">Recipient Phone Number</label>
          <div class="input-wrapper">
            <input
              type="tel"
              id="phone"
              placeholder="0241234567"
              pattern="0[0-9]{9}"
              inputmode="numeric"
              required
              maxlength="10"
              autocomplete="tel"
              oninput="this.classList.add('touched')"
            >
            <span class="input-icon valid-icon">✓</span>
            <span class="input-icon invalid-icon">✕</span>
          </div>
          <p class="hint">10 digits starting with 0 — e.g. 0241234567</p>
          <p class="error">Please enter a valid Ghana phone number</p>
        </div>

        <!-- Amount -->
        <div class="form-group">
          <label for="amount">Amount (GHS)</label>
          <div class="input-wrapper">
            <input
              type="number"
              id="amount"
              placeholder="0.00"
              min="1"
              max="5000"
              step="0.01"
              required
              inputmode="decimal"
              oninput="updateAmount(this.value); this.classList.add('touched')"
            >
            <span class="input-icon valid-icon">✓</span>
            <span class="input-icon invalid-icon">✕</span>
          </div>
          <p class="hint">Minimum GHS 1 · Maximum GHS 5,000</p>
          <p class="error">Amount must be between GHS 1 and GHS 5,000</p>
        </div>

        <!-- Amount preview -->
        <div class="amount-display">
          <div class="amount-label">You are sending</div>
          <div class="amount-value" id="amount-preview">GHS 0.00</div>
        </div>

        <!-- PIN -->
        <div class="form-group">
          <label for="pin">Your PIN</label>
          <div class="input-wrapper">
            <input
              type="password"
              id="pin"
              class="pin-input"
              placeholder="••••"
              pattern="[0-9]{4}"
              maxlength="4"
              inputmode="numeric"
              required
              oninput="this.classList.add('touched')"
            >
          </div>
          <p class="hint">4-digit Mobile Money PIN</p>
          <p class="error">PIN must be exactly 4 digits</p>
        </div>

        <button class="btn" type="submit">Send Money →</button>

      </form>

    </div>

    <script>
      function updateAmount(val) {
        const num = parseFloat(val) || 0;
        document.getElementById('amount-preview').textContent = 'GHS ' + num.toFixed(2);
      }

      document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input');
        let valid = true;
        inputs.forEach(input => {
          input.classList.add('touched');
          if (!input.checkValidity()) valid = false;
        });
        if (valid) alert('Payment submitted successfully!');
      });
    </script>

  </body>
</html>`,
        quiz: [
          { q: "What does the pattern attribute do on an input?", options: ["Sets the placeholder text", "Validates input against a regex pattern", "Sets the input type", "Limits characters"], answer: 1 },
          { q: "What does inputmode='numeric' do on mobile?", options: ["Only accepts numbers", "Shows the numeric keyboard on mobile", "Validates as a number", "Formats the number automatically"], answer: 1 },
          { q: "What is the :invalid pseudo-class?", options: ["Styles disabled inputs", "Styles inputs that fail HTML validation", "Styles required inputs", "Styles focused inputs"], answer: 1 },
          { q: "What HTML elements group related form fields?", options: ["group and label", "fieldset and legend", "section and header", "div and span"], answer: 1 },
        ],
      },
    },
    {
      order: 29,
      title: "CSS in Modern Workflows",
      xpValue: 50,
      isFree: false,
      content: {
        concept: `Modern web development teams use tools that extend what plain CSS can do. Understanding these tools — even if you do not use all of them — makes you a more employable and effective developer.

Sass — Syntactically Awesome Stylesheets — adds features to CSS: variables (before CSS custom properties existed), nesting, mixins, and functions. Sass files compile to regular CSS. The SCSS syntax looks like CSS with extra features, making it easy to learn.

PostCSS is a tool that transforms CSS through JavaScript plugins. Autoprefixer is a PostCSS plugin that automatically adds vendor prefixes — you write standard CSS and Autoprefixer adds -webkit-, -moz-, and -ms- prefixes where needed. This means you never write prefixes manually.

CSS Modules scope class names to the component file that imports them. Two components can both have a class called .title without conflicts — CSS Modules generates unique class names automatically. This solves the global scope problem of plain CSS without needing strict naming conventions.

Tailwind CSS is a utility-first framework. Instead of writing custom CSS classes, you apply utility classes directly in HTML — font-bold, text-purple-600, mt-4, flex, items-center. This speeds up development but produces verbose HTML. Tailwind purges unused utilities for production.

CSS-in-JS libraries like styled-components and Emotion let you write CSS inside JavaScript files. Styles are scoped automatically, can use JavaScript variables, and update when component state changes. They are popular in React applications.

Design tokens are the foundation of design systems. They are named values that represent design decisions — colour palettes, spacing scales, typography scales, border radii. Defined once, tokens flow through the entire codebase. When the design changes, update the token.

Component libraries like shadcn/ui, MUI, and Chakra provide pre-built accessible components. They save time but require learning the library's conventions. For custom brand experiences, building your own components with plain CSS or Tailwind gives more control.`,
        keyConcepts: [
          { code: "Sass/SCSS", description: "CSS preprocessor with nesting, variables, mixins" },
          { code: "PostCSS", description: "transforms CSS through JavaScript plugins" },
          { code: "Autoprefixer", description: "automatically adds vendor prefixes" },
          { code: "CSS Modules", description: "scopes class names to the component file" },
          { code: "Tailwind CSS", description: "utility-first CSS framework" },
          { code: "design tokens", description: "named values for design decisions — colours, spacing" },
        ],
        exerciseDescription: "Build a component using Tailwind-style utility classes implemented in plain CSS. Create utility classes for common patterns — spacing, typography, colours, flexbox — and compose them in HTML. Then rebuild the same component using BEM to compare the approaches.",
        hint: "The key insight with utility CSS: instead of writing .button { background: blue; padding: 8px 16px } you write classes bg-blue px-4 py-2 and apply them to the element. Each class does one thing.",
        exercise: `<!DOCTYPE html>
<html>
  <head>
    <title>Modern CSS Workflows</title>
    <style>
      /* ─────────────────────────────────────────
         UTILITY CSS SYSTEM
         Like Tailwind but built from scratch
         Each class does exactly ONE thing
      ───────────────────────────────────────── */

      * { box-sizing: border-box; margin: 0; padding: 0; }

      body { font-family: Arial, sans-serif; background: #0a0a0f; }

      /* Layout */
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      .flex-1 { flex: 1; }
      .flex-wrap { flex-wrap: wrap; }
      .grid { display: grid; }
      .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
      .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
      .min-h-screen { min-height: 100vh; }
      .w-full { width: 100%; }
      .max-w-sm { max-width: 420px; }
      .max-w-4xl { max-width: 900px; }
      .mx-auto { margin-left: auto; margin-right: auto; }

      /* Spacing */
      .p-4 { padding: 16px; }
      .p-6 { padding: 24px; }
      .p-8 { padding: 32px; }
      .px-4 { padding-left: 16px; padding-right: 16px; }
      .px-6 { padding-left: 24px; padding-right: 24px; }
      .py-2 { padding-top: 8px; padding-bottom: 8px; }
      .py-4 { padding-top: 16px; padding-bottom: 16px; }
      .py-12 { padding-top: 48px; padding-bottom: 48px; }
      .py-20 { padding-top: 80px; padding-bottom: 80px; }
      .mt-1 { margin-top: 4px; }
      .mt-2 { margin-top: 8px; }
      .mt-4 { margin-top: 16px; }
      .mt-6 { margin-top: 24px; }
      .mb-1 { margin-bottom: 4px; }
      .mb-2 { margin-bottom: 8px; }
      .mb-4 { margin-bottom: 16px; }
      .mb-6 { margin-bottom: 24px; }
      .mb-8 { margin-bottom: 32px; }
      .gap-2 { gap: 8px; }
      .gap-3 { gap: 12px; }
      .gap-4 { gap: 16px; }
      .gap-6 { gap: 24px; }

      /* Typography */
      .text-xs { font-size: 11px; }
      .text-sm { font-size: 13px; }
      .text-base { font-size: 15px; }
      .text-lg { font-size: 18px; }
      .text-xl { font-size: 20px; }
      .text-2xl { font-size: 24px; }
      .text-3xl { font-size: 30px; }
      .text-4xl { font-size: 36px; }
      .font-medium { font-weight: 500; }
      .font-semibold { font-weight: 600; }
      .font-bold { font-weight: 700; }
      .font-extrabold { font-weight: 800; }
      .leading-tight { line-height: 1.25; }
      .leading-relaxed { line-height: 1.7; }
      .tracking-wide { letter-spacing: 0.05em; }
      .tracking-widest { letter-spacing: 0.12em; }
      .uppercase { text-transform: uppercase; }
      .text-center { text-align: center; }

      /* Colours */
      .text-white { color: #f8fafc; }
      .text-muted { color: #94a3b8; }
      .text-faint { color: #475569; }
      .text-purple { color: #a78bfa; }
      .text-indigo { color: #6366f1; }
      .text-green { color: #10b981; }
      .text-yellow { color: #f59e0b; }
      .text-red { color: #ef4444; }

      .bg-dark { background: #0a0a0f; }
      .bg-card { background: #0f0f1a; }
      .bg-indigo { background: #6366f1; }
      .bg-indigo-dim { background: rgba(99,102,241,0.1); }
      .bg-green-dim { background: rgba(16,185,129,0.1); }

      /* Borders */
      .border { border: 1px solid rgba(255,255,255,0.08); }
      .border-indigo { border: 1px solid rgba(99,102,241,0.3); }
      .border-green { border: 1px solid rgba(16,185,129,0.3); }
      .rounded { border-radius: 8px; }
      .rounded-lg { border-radius: 12px; }
      .rounded-xl { border-radius: 16px; }
      .rounded-full { border-radius: 9999px; }

      /* Effects */
      .transition { transition: all 0.2s ease; }
      .cursor-pointer { cursor: pointer; }
      .opacity-60 { opacity: 0.6; }

      /* Interactive */
      .hover-lift:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.4); }
      .hover-bright:hover { filter: brightness(1.1); }

      /* Divider */
      .divider { border-top: 1px solid rgba(255,255,255,0.06); }

    </style>
  </head>
  <body class="bg-dark min-h-screen">

    <!-- Header — composed from utility classes -->
    <nav class="bg-card border flex items-center justify-between px-6 py-4">
      <span class="font-bold text-xl text-purple">CodePath</span>
      <div class="flex gap-4">
        <a href="#" class="text-sm text-muted transition hover-bright cursor-pointer">Tracks</a>
        <a href="#" class="text-sm text-muted transition hover-bright cursor-pointer">Projects</a>
        <span class="bg-indigo text-white text-xs font-semibold px-4 py-2 rounded cursor-pointer">Pro</span>
      </div>
    </nav>

    <!-- Hero -->
    <section class="py-20 text-center">
      <div class="max-w-4xl mx-auto px-4">
        <span class="text-xs uppercase tracking-widest text-indigo mb-4 flex justify-center">// Utility CSS Demo</span>
        <h1 class="text-4xl font-extrabold text-white leading-tight mb-4">
          Compose UIs from<br>Utility Classes
        </h1>
        <p class="text-base text-muted leading-relaxed max-w-sm mx-auto mb-8">
          Each class does one thing. Compose them together to build anything.
        </p>
        <div class="flex justify-center gap-3">
          <button class="bg-indigo text-white font-semibold text-sm px-6 py-2 rounded transition hover-bright cursor-pointer">
            Get Started →
          </button>
          <button class="border text-muted font-semibold text-sm px-6 py-2 rounded transition hover-bright cursor-pointer">
            Learn More
          </button>
        </div>
      </div>
    </section>

    <!-- Cards grid -->
    <section class="max-w-4xl mx-auto px-4 pb-20">
      <div class="grid grid-cols-3 gap-4">

        <div class="bg-card border border-indigo bg-indigo-dim rounded-xl p-6 transition hover-lift cursor-pointer">
          <div class="text-2xl mb-4">🌐</div>
          <h3 class="font-semibold text-white mb-2">HTML & CSS</h3>
          <p class="text-sm text-muted leading-relaxed">30 lessons · Build professional websites</p>
          <div class="flex items-center gap-2 mt-4">
            <span class="text-xs text-green font-semibold">Active</span>
            <span class="text-xs text-faint">· Lesson 29/30</span>
          </div>
        </div>

        <div class="bg-card border rounded-xl p-6 transition hover-lift cursor-pointer">
          <div class="text-2xl mb-4">🐍</div>
          <h3 class="font-semibold text-white mb-2">Python</h3>
          <p class="text-sm text-muted leading-relaxed">30 lessons · Automation and web apps</p>
          <div class="flex items-center gap-2 mt-4">
            <span class="text-xs text-yellow font-semibold">In Progress</span>
            <span class="text-xs text-faint">· Lesson 18/30</span>
          </div>
        </div>

        <div class="bg-card border rounded-xl p-6 opacity-60 cursor-pointer">
          <div class="text-2xl mb-4">⚡</div>
          <h3 class="font-semibold text-white mb-2">JavaScript</h3>
          <p class="text-sm text-muted leading-relaxed">30 lessons · Interactive web apps</p>
          <div class="flex items-center gap-2 mt-4">
            <span class="text-xs text-indigo font-semibold uppercase tracking-wide text-xs">Pro Only</span>
          </div>
        </div>

      </div>
    </section>

  </body>
</html>`,
        quiz: [
          { q: "What is utility-first CSS?", options: ["CSS that loads fast", "Small single-purpose classes composed in HTML", "CSS without any classes", "CSS that uses variables"], answer: 1 },
          { q: "What does Autoprefixer do?", options: ["Adds vendor prefixes automatically", "Removes unused CSS", "Minifies CSS", "Validates CSS"], answer: 0 },
          { q: "What problem do CSS Modules solve?", options: ["Slow CSS loading", "Global class name conflicts", "Missing browser support", "Complex selectors"], answer: 1 },
          { q: "What are design tokens?", options: ["CSS comments", "Named values representing design decisions like colours and spacing", "HTML data attributes", "JavaScript constants"], answer: 1 },
        ],
      },
    },
    {
      order: 30,
      title: "Project 3 — Full Multi-Page Website",
      xpValue: 200,
      isFree: false,
      content: {
        concept: `This is your final project for the HTML and CSS Foundation track. You have completed 29 lessons covering every major aspect of modern HTML and CSS. Now you build a complete, multi-page website that demonstrates all of it.

The project is a full website for a Ghanaian business, organisation, or portfolio. It must have at least 4 pages: Home, About, Services or Work, and Contact. All pages must share a consistent navigation and footer. The design must be responsive, accessible, performant, and polished.

Technical requirements: Semantic HTML5 throughout. CSS custom properties for the design system. Responsive layout using Grid and Flexbox. No layout shifts — all images have width and height. Animations and transitions use only transform and opacity. Keyboard accessible — all interactive elements reachable with Tab. Proper ARIA labels on icon buttons. Correct colour contrast.

Design requirements: A consistent visual identity — same colour palette, typography, and spacing across all pages. Visual hierarchy — headings, body text, and captions clearly differentiated. Hover effects on all interactive elements. Loading states where appropriate.

Content requirements: Real content, not lorem ipsum. Write about a real business concept you care about. Use real Ghanaian context — names, places, prices in cedis.

This certificate proves you can build professional-grade websites. It shows an employer or client that you understand not just HTML and CSS syntax, but the reasoning behind professional web development practice.

After earning this certificate, you are ready for the JavaScript track, where you will bring your websites to life with interactivity — form validation, dynamic content, API calls, and single-page applications.`,
        keyConcepts: [
          { code: "multi-page website", description: "at least 4 pages with shared nav and footer" },
          { code: "design system", description: "consistent colours, typography, spacing across pages" },
          { code: "semantic HTML5", description: "correct elements for correct content throughout" },
          { code: "responsive design", description: "mobile-first, tested at multiple breakpoints" },
          { code: "accessibility", description: "keyboard navigable, ARIA labels, contrast compliant" },
          { code: "performance", description: "GPU-only animations, no layout shifts, fast fonts" },
        ],
        exerciseDescription: "Build your complete multi-page website. The starter below is the Home page of a fictional Ghanaian tech agency. Fork it to create the About, Services, and Contact pages. Replace all content with your chosen business. Submit the GitHub repository link when complete.",
        hint: "Plan before you build. Sketch the layout of each page. Define your colour palette and typography first. Build the shared components — nav and footer — once and reuse them. Get structure right before adding effects.",
        exercise: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Accra Digital — Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Accra Digital builds modern websites and apps for Ghanaian businesses.">
    <style>

      /* ════════════════════════════════════════════
         DESIGN SYSTEM
         Define everything here — used across all pages
      ════════════════════════════════════════════ */

      :root {
        /* Colours */
        --color-primary:    #6366f1;
        --color-primary-dk: #4f46e5;
        --color-accent:     #a78bfa;
        --color-success:    #10b981;
        --color-warning:    #f59e0b;

        /* Surfaces */
        --bg:               #0a0a0f;
        --bg-card:          #0f0f1a;
        --bg-raised:        #161b22;

        /* Text */
        --text:             #f8fafc;
        --text-muted:       #94a3b8;
        --text-faint:       #475569;

        /* Borders */
        --border:           rgba(255,255,255,0.08);
        --border-strong:    rgba(255,255,255,0.15);

        /* Spacing scale */
        --space-1:  4px;
        --space-2:  8px;
        --space-3:  16px;
        --space-4:  24px;
        --space-5:  32px;
        --space-6:  48px;
        --space-7:  64px;
        --space-8:  96px;

        /* Typography */
        --text-xs:   11px;
        --text-sm:   13px;
        --text-base: 15px;
        --text-lg:   18px;
        --text-xl:   22px;
        --text-2xl:  28px;
        --text-3xl:  36px;
        --text-4xl:  48px;

        /* Radii */
        --radius-sm: 8px;
        --radius-md: 12px;
        --radius-lg: 16px;
        --radius-xl: 24px;

        /* Transitions */
        --transition: all 0.2s ease;
      }

      /* ════════════════════════════════════════════
         BASE RESET
      ════════════════════════════════════════════ */

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: Arial, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.7;
        font-size: var(--text-base);
      }

      img { max-width: 100%; display: block; }
      a { color: inherit; text-decoration: none; }

      /* ════════════════════════════════════════════
         SHARED COMPONENTS — copy to all pages
      ════════════════════════════════════════════ */

      /* Skip link */
      .skip-link {
        position: absolute;
        top: -48px;
        left: var(--space-3);
        background: var(--color-primary);
        color: white;
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-sm);
        font-size: var(--text-sm);
        z-index: 999;
        transition: top 0.2s;
      }

      .skip-link:focus { top: var(--space-2); }

      /* Navigation */
      .site-nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(10,10,15,0.92);
        backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--border);
        height: 64px;
        display: flex;
        align-items: center;
        padding: 0 var(--space-4);
        justify-content: space-between;
        gap: var(--space-4);
      }

      .nav-logo {
        font-size: var(--text-xl);
        font-weight: 800;
        color: var(--text);
        letter-spacing: -0.5px;
        flex-shrink: 0;
      }

      .nav-logo span { color: var(--color-accent); }

      .nav-links {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }

      .nav-link {
        color: var(--text-muted);
        font-size: var(--text-sm);
        font-weight: 500;
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-sm);
        transition: var(--transition);
      }

      .nav-link:hover { color: var(--text); background: rgba(255,255,255,0.05); }
      .nav-link[aria-current="page"] { color: var(--text); }

      .nav-cta {
        background: var(--color-primary);
        color: white;
        font-size: var(--text-sm);
        font-weight: 600;
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-sm);
        transition: var(--transition);
      }

      .nav-cta:hover { background: var(--color-primary-dk); }

      /* Footer */
      .site-footer {
        background: var(--bg-card);
        border-top: 1px solid var(--border);
        padding: var(--space-8) var(--space-4) var(--space-5);
      }

      .footer-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        gap: var(--space-6);
        margin-bottom: var(--space-6);
      }

      .footer-brand h2 { font-size: var(--text-xl); font-weight: 800; margin-bottom: var(--space-3); }
      .footer-brand h2 span { color: var(--color-accent); }
      .footer-brand p { font-size: var(--text-sm); color: var(--text-muted); line-height: 1.7; max-width: 280px; }

      .footer-col h3 {
        font-size: var(--text-xs);
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-faint);
        margin-bottom: var(--space-3);
      }

      .footer-col a {
        display: block;
        font-size: var(--text-sm);
        color: var(--text-muted);
        margin-bottom: var(--space-2);
        transition: var(--transition);
      }

      .footer-col a:hover { color: var(--text); }

      .footer-bottom {
        max-width: 1100px;
        margin: 0 auto;
        padding-top: var(--space-4);
        border-top: 1px solid var(--border);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--text-xs);
        color: var(--text-faint);
        flex-wrap: wrap;
        gap: var(--space-2);
      }

      /* ════════════════════════════════════════════
         PAGE-SPECIFIC: HOME
      ════════════════════════════════════════════ */

      .container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 var(--space-4);
      }

      section { padding: var(--space-8) var(--space-4); }

      .section-tag {
        display: inline-block;
        font-size: var(--text-xs);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-primary);
        margin-bottom: var(--space-3);
      }

      .section-title {
        font-size: clamp(var(--text-2xl), 4vw, var(--text-3xl));
        font-weight: 700;
        margin-bottom: var(--space-4);
        line-height: 1.2;
      }

      .section-subtitle {
        font-size: var(--text-lg);
        color: var(--text-muted);
        max-width: 560px;
        margin-bottom: var(--space-6);
      }

      /* Hero */
      .hero {
        padding: var(--space-8) var(--space-4);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-6);
        align-items: center;
        max-width: 1100px;
        margin: 0 auto;
      }

      .hero-tag {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        background: rgba(99,102,241,0.1);
        border: 1px solid rgba(99,102,241,0.25);
        color: var(--color-accent);
        font-size: var(--text-xs);
        font-weight: 600;
        letter-spacing: 0.08em;
        padding: var(--space-1) var(--space-3);
        border-radius: 20px;
        margin-bottom: var(--space-4);
      }

      .hero h1 {
        font-size: clamp(32px, 5vw, 52px);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -1.5px;
        margin-bottom: var(--space-4);
      }

      .hero h1 em {
        font-style: normal;
        color: var(--color-accent);
      }

      .hero-desc {
        font-size: var(--text-lg);
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: var(--space-5);
        max-width: 480px;
      }

      .hero-buttons { display: flex; gap: var(--space-3); flex-wrap: wrap; }

      .btn-primary {
        background: var(--color-primary);
        color: white;
        font-size: var(--text-sm);
        font-weight: 700;
        padding: 14px var(--space-5);
        border-radius: var(--radius-md);
        border: none;
        cursor: pointer;
        transition: var(--transition);
        display: inline-block;
      }

      .btn-primary:hover { background: var(--color-primary-dk); transform: translateY(-2px); }

      .btn-ghost {
        background: transparent;
        color: var(--text-muted);
        font-size: var(--text-sm);
        font-weight: 600;
        padding: 14px var(--space-5);
        border-radius: var(--radius-md);
        border: 1px solid var(--border-strong);
        cursor: pointer;
        transition: var(--transition);
        display: inline-block;
      }

      .btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: var(--text); }

      /* Hero visual */
      .hero-visual {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-xl);
        padding: var(--space-5);
        position: relative;
        overflow: hidden;
      }

      .hero-visual::before {
        content: '';
        position: absolute;
        top: -40px; right: -40px;
        width: 200px; height: 200px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99,102,241,0.15), transparent);
        pointer-events: none;
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3);
        margin-bottom: var(--space-3);
      }

      .metric {
        background: var(--bg-raised);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: var(--space-4);
        text-align: center;
      }

      .metric-value {
        font-size: var(--text-2xl);
        font-weight: 800;
        color: var(--color-accent);
        display: block;
        margin-bottom: var(--space-1);
      }

      .metric-label {
        font-size: var(--text-xs);
        color: var(--text-faint);
        text-transform: uppercase;
        letter-spacing: 0.06em;
      }

      .recent-work {
        background: var(--bg-raised);
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        padding: var(--space-3) var(--space-4);
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .work-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-success); flex-shrink: 0; }
      .work-text { font-size: var(--text-sm); color: var(--text-muted); }
      .work-text strong { color: var(--text); }

      /* Services */
      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--space-4);
      }

      .service-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: var(--space-5);
        transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        cursor: pointer;
      }

      .service-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 48px rgba(0,0,0,0.5);
        border-color: rgba(99,102,241,0.3);
      }

      .service-icon {
        font-size: 32px;
        margin-bottom: var(--space-4);
        display: block;
      }

      .service-card h3 {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-2);
      }

      .service-card p {
        font-size: var(--text-sm);
        color: var(--text-muted);
        line-height: 1.7;
        margin-bottom: var(--space-4);
      }

      .service-link {
        font-size: var(--text-sm);
        color: var(--color-primary);
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        transition: gap 0.2s;
      }

      .service-card:hover .service-link { gap: var(--space-2); }

      /* Clients */
      .clients-section { background: var(--bg-card); }

      .clients-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--space-6);
        flex-wrap: wrap;
        opacity: 0.5;
      }

      .client-name {
        font-size: var(--text-lg);
        font-weight: 700;
        letter-spacing: -0.5px;
        color: var(--text-muted);
      }

      /* CTA */
      .cta-section {
        background: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(167,139,250,0.04));
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        text-align: center;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero { grid-template-columns: 1fr; }
        .hero-visual { display: none; }
        .footer-inner { grid-template-columns: 1fr 1fr; }
        .nav-links { display: none; }
      }

      @media (max-width: 480px) {
        .footer-inner { grid-template-columns: 1fr; }
        .metrics-grid { grid-template-columns: 1fr 1fr; }
      }

    </style>
  </head>
  <body>

    <a href="#main" class="skip-link">Skip to main content</a>

    <!-- Shared Navigation -->
    <nav class="site-nav" aria-label="Main navigation">
      <a href="index.html" class="nav-logo">Accra<span>Digital</span></a>
      <div class="nav-links">
        <a href="index.html" class="nav-link" aria-current="page">Home</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="services.html" class="nav-link">Services</a>
        <a href="contact.html" class="nav-link">Contact</a>
        <a href="contact.html" class="nav-cta">Get a Quote</a>
      </div>
    </nav>

    <main id="main">

      <!-- Hero -->
      <section aria-labelledby="hero-heading">
        <div class="hero">
          <div>
            <div class="hero-tag">🇬🇭 Based in Accra · Serving All of Ghana</div>
            <h1 id="hero-heading">
              We Build Digital<br>
              Products for <em>Ghana</em>
            </h1>
            <p class="hero-desc">
              Accra Digital creates websites, web apps, and digital experiences for Ghanaian businesses. From small enterprises to growing startups.
            </p>
            <div class="hero-buttons">
              <a href="services.html" class="btn-primary">See Our Work →</a>
              <a href="contact.html" class="btn-ghost">Get in Touch</a>
            </div>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="metrics-grid">
              <div class="metric">
                <span class="metric-value">48</span>
                <span class="metric-label">Projects Launched</span>
              </div>
              <div class="metric">
                <span class="metric-value">4.9★</span>
                <span class="metric-label">Client Rating</span>
              </div>
              <div class="metric">
                <span class="metric-value">3yr</span>
                <span class="metric-label">In Business</span>
              </div>
              <div class="metric">
                <span class="metric-value">100%</span>
                <span class="metric-label">Ghana-based</span>
              </div>
            </div>
            <div class="recent-work">
              <div class="work-dot"></div>
              <div class="work-text">Just launched <strong>AccraBites</strong> delivery platform</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Services -->
      <section aria-labelledby="services-heading">
        <div class="container">
          <span class="section-tag">// What We Do</span>
          <h2 class="section-title" id="services-heading">Digital Services for<br>Ghanaian Businesses</h2>
          <div class="services-grid">

            <div class="service-card">
              <span class="service-icon">🌐</span>
              <h3>Website Design</h3>
              <p>Fast, modern websites that work on every device. Built with clean HTML, CSS, and JavaScript. Optimised for Ghanaian mobile networks.</p>
              <span class="service-link">Learn more →</span>
            </div>

            <div class="service-card">
              <span class="service-icon">🛒</span>
              <h3>E-commerce</h3>
              <p>Online stores with Paystack integration for mobile money and cards. Manage inventory, orders, and customers from one dashboard.</p>
              <span class="service-link">Learn more →</span>
            </div>

            <div class="service-card">
              <span class="service-icon">📱</span>
              <h3>Web Applications</h3>
              <p>Custom web apps built with modern frameworks. Booking systems, management platforms, customer portals, and more.</p>
              <span class="service-link">Learn more →</span>
            </div>

            <div class="service-card">
              <span class="service-icon">🔍</span>
              <h3>SEO & Performance</h3>
              <p>Rank higher on Google and load faster on slow connections. Technical SEO, Core Web Vitals optimisation, and content strategy.</p>
              <span class="service-link">Learn more →</span>
            </div>

            <div class="service-card">
              <span class="service-icon">🎨</span>
              <h3>UI/UX Design</h3>
              <p>User interfaces that are beautiful and easy to use. Wireframes, prototypes, design systems, and handoff-ready files.</p>
              <span class="service-link">Learn more →</span>
            </div>

            <div class="service-card">
              <span class="service-icon">🔧</span>
              <h3>Maintenance & Support</h3>
              <p>Ongoing support for your website or app. Updates, security patches, performance monitoring, and feature additions.</p>
              <span class="service-link">Learn more →</span>
            </div>

          </div>
        </div>
      </section>

      <!-- Clients -->
      <section class="clients-section" aria-labelledby="clients-heading">
        <div class="container">
          <p style="text-align:center;font-size:13px;color:var(--text-faint);margin-bottom:32px;letter-spacing:0.08em;text-transform:uppercase" id="clients-heading">
            Trusted by Ghanaian businesses
          </p>
          <div class="clients-row" role="list" aria-label="Client companies">
            <span class="client-name" role="listitem">AccraBites</span>
            <span class="client-name" role="listitem">GoldCoast Tech</span>
            <span class="client-name" role="listitem">Kente Fashion</span>
            <span class="client-name" role="listitem">Volta Farms</span>
            <span class="client-name" role="listitem">Nkrumah Clinic</span>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section" aria-labelledby="cta-heading">
        <div class="container" style="text-align:center">
          <span class="section-tag">// Ready to Start?</span>
          <h2 class="section-title" id="cta-heading">Let's Build Something Great</h2>
          <p class="section-subtitle" style="margin:0 auto var(--space-6)">Tell us about your project. We respond within 24 hours with a free consultation and quote.</p>
          <a href="contact.html" class="btn-primary">Start a Project →</a>
        </div>
      </section>

    </main>

    <!-- Shared Footer -->
    <footer class="site-footer" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="footer-inner">
        <div class="footer-brand">
          <h2>Accra<span style="color:var(--color-accent)">Digital</span></h2>
          <p>Building digital products for Ghanaian businesses since 2021. Based in Osu, Accra.</p>
        </div>
        <div class="footer-col">
          <h3>Services</h3>
          <a href="services.html">Website Design</a>
          <a href="services.html">E-commerce</a>
          <a href="services.html">Web Apps</a>
          <a href="services.html">SEO</a>
        </div>
        <div class="footer-col">
          <h3>Company</h3>
          <a href="about.html">About Us</a>
          <a href="about.html">Our Team</a>
          <a href="contact.html">Contact</a>
          <a href="#">Blog</a>
        </div>
        <div class="footer-col">
          <h3>Contact</h3>
          <a href="mailto:hello@accradigital.com">hello@accradigital.com</a>
          <a href="tel:+233240000000">+233 24 000 0000</a>
          <a href="#">Osu, Accra</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 Accra Digital · Accra, Ghana</span>
        <div style="display:flex;gap:16px">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </div>
      </div>
    </footer>

    <style>
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        border: 0;
      }
    </style>

  </body>
</html>`,
        quiz: [
          { q: "How many pages minimum does the Project 3 website need?", options: ["2", "3", "4", "6"], answer: 2 },
          { q: "What makes a design system consistent across pages?", options: ["Using the same background colour", "CSS custom properties for colours, spacing, and typography", "Using the same font", "Having the same number of sections"], answer: 1 },
          { q: "What should you write in alt text for meaningful images?", options: ["The file name", "A description of what the image shows", "The image dimensions", "Nothing — leave it empty"], answer: 1 },
          { q: "What is the first thing to build when starting a multi-page site?", options: ["The contact form", "The footer", "The shared navigation and footer components", "The homepage hero"], answer: 2 },
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

  console.log("🎉 HTML & CSS lessons 19-30 seeded!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });