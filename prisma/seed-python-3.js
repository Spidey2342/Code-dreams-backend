const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Python lessons 19-30...");

  const track = await prisma.track.findUnique({ where: { slug: "python-fundamentals" } });
  if (!track) { console.error("Track not found"); return; }

  const lessons = [
    {
      order: 19,
      title: "Regular Expressions",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Regular expressions — regex — are patterns that match text. They are one of the most powerful tools in programming for searching, validating, and transforming text data.

Python's re module provides regex support. re.search() finds a pattern anywhere in a string. re.match() checks if the pattern matches at the start. re.findall() returns all matches as a list. re.sub() replaces matches with new text.

Patterns are built from special characters. A dot matches any character. Backslash d matches any digit. Backslash w matches any word character. Backslash s matches whitespace. A plus sign means one or more. An asterisk means zero or more. A question mark means zero or one.

Square brackets define a character class. [aeiou] matches any vowel. [0-9] matches any digit. [a-z] matches any lowercase letter.

Anchors fix position. A caret matches the start of a string. A dollar sign matches the end.

Groups with parentheses capture matched text. re.search(pattern, text).group(1) returns the first captured group.

Real use case in Ghana: validating phone numbers that start with 0 and have 10 digits. Extracting prices from text. Validating Ghana Card numbers. Finding email addresses in a document.`,
        keyConcepts: [
          { code: "import re", description: "imports the regular expressions module" },
          { code: "re.search(pattern, text)", description: "finds pattern anywhere in text" },
          { code: "re.findall(pattern, text)", description: "returns list of all matches" },
          { code: "re.sub(pattern, replacement, text)", description: "replaces matches with new text" },
          { code: "\\d", description: "matches any digit 0-9" },
          { code: "\\w+", description: "matches one or more word characters" },
        ],
        exerciseDescription: "Use regular expressions to validate and extract data from real Ghanaian text. Validate phone numbers, extract prices in cedis, find email addresses, and clean up messy data using re.sub().",
        hint: "For a Ghana phone number pattern: r'0[0-9]{9}' matches exactly 10 digits starting with 0. The r before the string makes it a raw string so backslashes are not interpreted.",
        exercise: `# Regular Expressions — Data Validation and Extraction

import re

# ── Phone number validation ──
def validate_ghana_phone(number):
    pattern = r'^0[0-9]{9}$'
    return bool(re.match(pattern, number))

phones = ["0244123456", "244123456", "024412345", "0201234567", "hello"]
print("Phone Validation:")
for phone in phones:
    valid = validate_ghana_phone(phone)
    print(f"  {phone}: {'VALID' if valid else 'INVALID'}")

# ── Extract prices from text ──
text = "Jollof rice costs GHS 35.00, Banku is GHS 28.50, and Kelewele is GHS 15"
prices = re.findall(r'GHS (\d+\.?\d*)', text)
print(f"\\nPrices found: {prices}")
total = sum(float(p) for p in prices)
print(f"Total: GHS {total:.2f}")

# ── Email extraction ──
email_text = "Contact us at info@codepath.com or support@codepath.gh for help. CEO: boss@company.com"
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', email_text)
print(f"\\nEmails found: {emails}")

# ── Clean up messy text ──
messy = "Phone:   024  412  3456   Name:  Kofi   Mensah"
clean = re.sub(r'\\s+', ' ', messy).strip()
print(f"\\nCleaned: {clean}")

# ── Extract Ghana Card number pattern ──
documents = [
    "ID: GHA-123456789-0",
    "Card: GHA-987654321-5",
    "No card here",
]

print("\\nGhana Card numbers:")
for doc in documents:
    match = re.search(r'GHA-[0-9]{9}-[0-9]', doc)
    if match:
        print(f"  Found: {match.group()}")
    else:
        print(f"  None in: {doc}")`,
        quiz: [
          { q: "What does re.findall() return?", options: ["The first match only", "True or False", "A list of all matches", "The number of matches"], answer: 2 },
          { q: "What does \\d match in a regex?", options: ["Any letter", "Any digit 0-9", "Any whitespace", "Any word character"], answer: 1 },
          { q: "Why use r'' raw strings for regex patterns?", options: ["They are faster", "Backslashes are not interpreted as escape characters", "They match more characters", "They are required by the re module"], answer: 1 },
          { q: "What does the ^ anchor do in a regex?", options: ["Matches the end of a string", "Matches any character", "Matches the start of a string", "Negates the pattern"], answer: 2 },
        ],
      },
    },
   {
      order: 20,
      title: "Working with CSV and JSON",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `CSV and JSON are the two most common data formats you will encounter in real Python work. APIs return JSON. Spreadsheets export CSV. Databases dump CSV. Configuration files use JSON. Mastering both is essential.

CSV — comma separated values — stores tabular data as plain text. Each line is a row. Values within a row are separated by commas. The first row is usually a header with column names.

Python's csv module handles CSV files properly. csv.reader() reads rows as lists. csv.DictReader() reads rows as dictionaries using the header row as keys — much more convenient. csv.writer() writes rows. csv.DictWriter() writes dictionaries.

JSON — JavaScript Object Notation — stores structured data as text. Python dictionaries map directly to JSON objects. Python lists map to JSON arrays. The json module converts between them.

json.dumps() converts a Python object to a JSON string. json.loads() parses a JSON string into a Python object. json.dump() writes JSON to a file. json.load() reads JSON from a file.

The indent parameter makes JSON human-readable. When working with real API data, JSON is often nested — navigate with chained bracket notation: data['results'][0]['name'].

Real use case: reading student grades from a CSV exported from an Excel spreadsheet, parsing API responses that return JSON, saving application configuration as JSON, converting between formats.`,
        keyConcepts: [
          { code: "csv.DictReader(f)", description: "reads CSV rows as dictionaries using header as keys" },
          { code: "csv.DictWriter(f, fieldnames)", description: "writes dictionaries as CSV rows" },
          { code: "json.loads(string)", description: "parses JSON string into Python object" },
          { code: "json.dumps(obj, indent=2)", description: "converts Python object to formatted JSON string" },
          { code: "json.load(f)", description: "reads JSON from a file object" },
          { code: "json.dump(obj, f)", description: "writes Python object as JSON to a file" },
        ],
        exerciseDescription: "Process student data in both CSV and JSON formats. Read a CSV of student grades, calculate statistics, then export the results as JSON. Parse a JSON API response and convert it to a formatted CSV report.",
        hint: "csv.DictReader automatically uses the first row as field names. Access each row like a dictionary: row['name'], row['score']. This is much cleaner than row[0], row[1].",
        exercise: `# Working with CSV and JSON

import csv
import json
import io

# ── Simulate CSV data (like reading from a file) ──
csv_data = """name,course,score,year
Kofi Mensah,Computer Science,82,2
Abena Asante,Computer Science,91,1
Kwame Boateng,Engineering,68,3
Efua Owusu,Mathematics,75,2
Yaw Darko,Computer Science,88,1
Akosua Frimpong,Engineering,55,4"""

# Read CSV using DictReader
reader = csv.DictReader(io.StringIO(csv_data))
students = list(reader)

print("Students loaded from CSV:")
for s in students:
    print(f"  {s['name']} — {s['course']} — {s['score']}%")

# Calculate statistics
scores = [int(s['score']) for s in students]
print(f"\\nClass average: {sum(scores)/len(scores):.1f}%")
print(f"Highest: {max(scores)}%")
print(f"Lowest: {min(scores)}%")

# ── Convert to JSON ──
results = []
for s in students:
    score = int(s['score'])
    grade = "A" if score >= 80 else "B" if score >= 70 else "C" if score >= 60 else "F"
    results.append({
        "name": s['name'],
        "course": s['course'],
        "score": score,
        "grade": grade,
        "year": int(s['year'])
    })

json_output = json.dumps({"students": results, "total": len(results)}, indent=2)
print("\\nJSON output:")
print(json_output)

# ── Parse JSON and filter ──
parsed = json.loads(json_output)
cs_students = [s for s in parsed['students'] if s['course'] == 'Computer Science']
print(f"\\nCS Students: {len(cs_students)}")
for s in cs_students:
    print(f"  {s['name']}: Grade {s['grade']}")

# ── Write results to CSV string ──
output = io.StringIO()
fieldnames = ['name', 'course', 'score', 'grade']
writer = csv.DictWriter(output, fieldnames=fieldnames, extrasaction='ignore')
writer.writeheader()
writer.writerows(results)
print("\\nCSV output:")
print(output.getvalue())`,
        quiz: [
          { q: "What does csv.DictReader do differently from csv.reader?", options: ["It reads faster", "It returns each row as a dictionary using headers as keys", "It handles JSON too", "It validates the data"], answer: 1 },
          { q: "What does json.dumps() do?", options: ["Saves JSON to a file", "Converts Python object to a JSON string", "Loads JSON from a string", "Deletes JSON data"], answer: 1 },
          { q: "What does the indent parameter in json.dumps() do?", options: ["Sets indentation for code", "Makes JSON output human-readable with spacing", "Limits the depth of nesting", "Sets the file encoding"], answer: 1 },
          { q: "Which is best for storing tabular data like a spreadsheet?", options: ["JSON", "CSV", "TXT", "XML"], answer: 1 },
        ],
      },
    },
    {
      order: 21,
      title: "Project 2 — File Organiser Script",
      xpValue: 150,
      isFree: false,
      content: {
        language: "python",
        concept: `This is your second Python project. You have learned dictionaries, file handling, error handling, modules, list comprehensions, OOP, APIs, regular expressions, and CSV/JSON. Now you build a real automation script.

The project is a file organiser — a Python script that scans a folder, reads files, categorises them by type or content, and generates a report. This is real automation that saves time in the real world.

A file organiser uses os.listdir() or os.scandir() to get all files in a directory. It checks each file's extension to determine type. It moves or copies files to organised subfolders. It generates a CSV or JSON report of what was done.

Extension mapping: .jpg, .png, .gif go to Images. .mp3, .wav go to Audio. .pdf, .docx go to Documents. .py, .js, .html go to Code. Everything else goes to Other.

The os.path module provides path manipulation: os.path.join() combines path parts correctly for any OS. os.path.exists() checks if a file exists. os.path.splitext() separates filename from extension.

shutil.move() moves a file. shutil.copy() copies it. os.makedirs() creates directories, including nested ones, with exist_ok=True to avoid errors if they already exist.

Good automation scripts are safe — they preview what they will do before doing it, ask for confirmation, and log every action. A script that moves files without logging leaves users unable to undo mistakes.

Submit your enhanced version with at least one extra feature: duplicate detection, file size reporting, or a summary email using smtplib.`,
        keyConcepts: [
          { code: "os.listdir(path)", description: "returns list of files and folders in a directory" },
          { code: "os.path.splitext(file)", description: "splits filename into name and extension" },
          { code: "os.makedirs(path, exist_ok=True)", description: "creates directory and all parents" },
          { code: "shutil.move(src, dst)", description: "moves a file to a new location" },
          { code: "os.path.join(dir, file)", description: "combines path parts for any OS" },
          { code: "os.path.getsize(path)", description: "returns file size in bytes" },
        ],
        exerciseDescription: "Build a complete file organiser. The starter code creates sample files, organises them by extension, and generates a report. Enhance it with duplicate detection using file hashes, a size summary, and error handling for permission issues.",
        hint: "Use os.path.splitext(filename)[1].lower() to get the lowercase extension. The [1] gets the extension part, and .lower() handles .JPG and .jpg as the same type.",
        exercise: `# File Organiser Script — Project 2

import os
import json
import hashlib
from datetime import datetime

# ── Configuration ──
CATEGORIES = {
    'Images':    ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'],
    'Documents': ['.pdf', '.docx', '.doc', '.txt', '.xlsx', '.pptx'],
    'Code':      ['.py', '.js', '.html', '.css', '.json', '.ts'],
    'Audio':     ['.mp3', '.wav', '.flac', '.aac'],
    'Video':     ['.mp4', '.mov', '.avi', '.mkv'],
    'Archives':  ['.zip', '.tar', '.gz', '.rar'],
}

# ── Helper functions ──

def get_category(filename):
    """Return category for a file based on its extension."""
    ext = os.path.splitext(filename)[1].lower()
    for category, extensions in CATEGORIES.items():
        if ext in extensions:
            return category
    return 'Other'


def format_size(bytes_size):
    """Convert bytes to human readable size."""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_size < 1024:
            return f"{bytes_size:.1f} {unit}"
        bytes_size /= 1024
    return f"{bytes_size:.1f} TB"


def get_file_hash(filepath):
    """Get MD5 hash of file for duplicate detection."""
    hasher = hashlib.md5()
    try:
        with open(filepath, 'rb') as f:
            hasher.update(f.read())
        return hasher.hexdigest()
    except IOError:
        return None


def scan_directory(path='.'):
    """Scan directory and return organised file info."""
    files_by_category = {}
    hashes_seen = {}
    duplicates = []
    total_size = 0

    try:
        all_files = [f for f in os.listdir(path)
                     if os.path.isfile(os.path.join(path, f))]
    except PermissionError:
        print(f"Permission denied: {path}")
        return {}, [], 0

    for filename in all_files:
        filepath = os.path.join(path, filename)
        category = get_category(filename)

        try:
            size = os.path.getsize(filepath)
            total_size += size
        except OSError:
            size = 0

        file_info = {
            'name': filename,
            'category': category,
            'size': size,
            'size_readable': format_size(size),
            'extension': os.path.splitext(filename)[1].lower() or 'none',
        }

        # Check for duplicates
        file_hash = get_file_hash(filepath)
        if file_hash:
            if file_hash in hashes_seen:
                duplicates.append({
                    'file': filename,
                    'duplicate_of': hashes_seen[file_hash]
                })
                file_info['is_duplicate'] = True
            else:
                hashes_seen[file_hash] = filename
                file_info['is_duplicate'] = False

        if category not in files_by_category:
            files_by_category[category] = []
        files_by_category[category].append(file_info)

    return files_by_category, duplicates, total_size


def generate_report(files_by_category, duplicates, total_size):
    """Generate and print an organiser report."""
    print("=" * 55)
    print("  FILE ORGANISER REPORT")
    print(f"  Generated: {datetime.now().strftime('%d %B %Y %H:%M')}")
    print("=" * 55)

    total_files = 0
    for category, files in sorted(files_by_category.items()):
        count = len(files)
        total_files += count
        cat_size = sum(f['size'] for f in files)
        print(f"\\n  {category} ({count} files — {format_size(cat_size)})")
        for f in files[:3]:  # Show first 3
            dup = " [DUPLICATE]" if f.get('is_duplicate') else ""
            print(f"    {f['name']:<30} {f['size_readable']:>10}{dup}")
        if len(files) > 3:
            print(f"    ... and {len(files) - 3} more")

    print("\\n" + "=" * 55)
    print(f"  Total: {total_files} files — {format_size(total_size)}")
    if duplicates:
        print(f"  Duplicates found: {len(duplicates)}")
        for d in duplicates:
            print(f"    {d['file']} is a copy of {d['duplicate_of']}")
    print("=" * 55)

    return {
        'total_files': total_files,
        'total_size': total_size,
        'categories': {k: len(v) for k, v in files_by_category.items()},
        'duplicates': len(duplicates),
        'generated': datetime.now().isoformat()
    }


# ── Run the organiser ──
print("Scanning current directory...\\n")
files_by_category, duplicates, total_size = scan_directory('.')
summary = generate_report(files_by_category, duplicates, total_size)

# Save summary as JSON
print("\\nSummary JSON:")
print(json.dumps(summary, indent=2))`,
        quiz: [
          { q: "What does os.path.splitext('file.py') return?", options: ["'file.py'", "('.py', 'file')", "('file', '.py')", "['file', 'py']"], answer: 2 },
          { q: "What does exist_ok=True do in os.makedirs()?", options: ["Creates files too", "Prevents error if directory already exists", "Overwrites existing directory", "Makes directory hidden"], answer: 1 },
          { q: "What is shutil.move() used for?", options: ["Moving data in memory", "Moving a file to a new location on disk", "Renaming variables", "Sorting file contents"], answer: 1 },
          { q: "Why generate a report before moving files?", options: ["It is faster", "So users can review and confirm before changes are made", "Python requires it", "To save memory"], answer: 1 },
        ],
      },
    },
    {
      order: 22,
      title: "Web Scraping",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Web scraping extracts data from websites automatically. It is how data journalists get news article data, how researchers collect prices, and how developers build datasets when no API exists.

Python's requests library fetches web pages. BeautifulSoup parses the HTML and lets you navigate and search the document tree. Together they form the standard scraping stack.

After fetching a page with requests.get(url), you pass the response text to BeautifulSoup with the html.parser. Then use find() to get the first matching element and find_all() to get all matches.

Select elements by tag name, CSS class, or ID. soup.find('h1') finds the first h1. soup.find_all('p', class_='article-text') finds all paragraphs with that class. soup.find(id='main-content') finds by ID.

Access element text with .text or .get_text(). Access attributes with element['href'] or element.get('href') safely.

Responsible scraping: always check robots.txt before scraping — it tells you what is allowed. Add delays between requests with time.sleep() to avoid overloading servers. Set a User-Agent header to identify your scraper. Do not scrape behind login walls or personal data.

In this lesson, since we cannot make HTTP requests in the Pyodide sandbox, we work with pre-fetched HTML. In a real Python environment, you would install requests and beautifulsoup4 with pip.

Real use case: scraping job listings, collecting prices from multiple vendors, building a news aggregator, monitoring website changes.`,
        keyConcepts: [
          { code: "requests.get(url)", description: "fetches a web page" },
          { code: "BeautifulSoup(html, 'html.parser')", description: "parses HTML for navigation" },
          { code: "soup.find('tag')", description: "finds first matching element" },
          { code: "soup.find_all('tag', class_='name')", description: "finds all matching elements" },
          { code: "element.text", description: "gets text content of an element" },
          { code: "element['href']", description: "gets attribute value of an element" },
        ],
        exerciseDescription: "Parse a sample HTML page representing a Ghanaian job board. Extract job titles, companies, salaries, and locations. Filter jobs by location and salary. Format the results as a clean report. Use BeautifulSoup navigation techniques.",
        hint: "When BeautifulSoup finds an element, you can chain further searches on it. parent_element.find('span', class_='salary') searches only within that parent.",
        exercise: `# Web Scraping with BeautifulSoup
# Note: In production use 'pip install requests beautifulsoup4'
# Here we simulate with pre-built HTML parsing logic

# Simulated HTML from a Ghanaian job board
sample_html = """
<div class="job-listing">
  <div class="job-card" data-id="1">
    <h2 class="job-title">Frontend Developer</h2>
    <span class="company">Tech Solutions Ghana</span>
    <span class="location">Accra, East Legon</span>
    <span class="salary">GHS 4,500 - 6,000/month</span>
    <span class="type">Full-time</span>
    <p class="description">Build modern web interfaces using React and CSS.</p>
  </div>
  <div class="job-card" data-id="2">
    <h2 class="job-title">Python Developer</h2>
    <span class="company">AfriTech Labs</span>
    <span class="location">Kumasi</span>
    <span class="salary">GHS 5,000 - 8,000/month</span>
    <span class="type">Full-time</span>
    <p class="description">Build APIs and automation scripts for fintech.</p>
  </div>
  <div class="job-card" data-id="3">
    <h2 class="job-title">UI/UX Designer</h2>
    <span class="company">Creative Hub Accra</span>
    <span class="location">Accra, Osu</span>
    <span class="salary">GHS 3,500 - 5,000/month</span>
    <span class="type">Contract</span>
    <p class="description">Design user interfaces for mobile apps.</p>
  </div>
  <div class="job-card" data-id="4">
    <h2 class="job-title">Data Analyst</h2>
    <span class="company">Ghana Statistical Service</span>
    <span class="location">Accra, Airport City</span>
    <span class="salary">GHS 6,000 - 9,000/month</span>
    <span class="type">Full-time</span>
    <p class="description">Analyse national data using Python and Excel.</p>
  </div>
</div>
"""

# Simple HTML parser (simulating BeautifulSoup)
import re

def extract_jobs(html):
    """Extract job listings from HTML."""
    jobs = []

    # Find all job cards using regex (simulating BeautifulSoup)
    card_pattern = r'<div class="job-card"[^>]*>(.*?)</div>\s*</div>'
    cards = re.findall(r'<div class="job-card".*?(?=<div class="job-card"|$)',
                       html, re.DOTALL)

    for card in cards:
        def get_field(field):
            match = re.search(f'<[^>]*class="{field}"[^>]*>(.*?)</', card)
            return match.group(1).strip() if match else 'N/A'

        job = {
            'title': get_field('job-title'),
            'company': get_field('company'),
            'location': get_field('location'),
            'salary': get_field('salary'),
            'type': get_field('type'),
            'description': get_field('description'),
        }

        # Extract salary numbers
        salary_match = re.search(r'GHS ([\d,]+)', job['salary'])
        if salary_match:
            min_sal = int(salary_match.group(1).replace(',', ''))
            job['min_salary'] = min_sal

        jobs.append(job)

    return jobs


def display_jobs(jobs, title="All Jobs"):
    print(f"\\n{'='*50}")
    print(f"  {title} ({len(jobs)} found)")
    print(f"{'='*50}")
    for job in jobs:
        print(f"\\n  {job['title']}")
        print(f"  Company:  {job['company']}")
        print(f"  Location: {job['location']}")
        print(f"  Salary:   {job['salary']}")
        print(f"  Type:     {job['type']}")


# Extract all jobs
all_jobs = extract_jobs(sample_html)
display_jobs(all_jobs, "All Jobs in Ghana")

# Filter Accra jobs
accra_jobs = [j for j in all_jobs if 'Accra' in j['location']]
display_jobs(accra_jobs, "Accra Jobs Only")

# High salary jobs (above GHS 5000)
high_salary = [j for j in all_jobs if j.get('min_salary', 0) >= 5000]
display_jobs(high_salary, "High Salary Jobs (GHS 5000+)")

print(f"\\nTotal jobs scraped: {len(all_jobs)}")
print(f"Average min salary: GHS {sum(j.get('min_salary',0) for j in all_jobs)/len(all_jobs):,.0f}")`,
        quiz: [
          { q: "What does BeautifulSoup do?", options: ["Fetches web pages", "Parses HTML for easy navigation", "Stores web data", "Sends HTTP requests"], answer: 1 },
          { q: "What does soup.find_all('p', class_='text') do?", options: ["Finds first p with class text", "Finds all p elements with class text", "Finds all elements with class text", "Counts p elements"], answer: 1 },
          { q: "How do you get the text content of an element?", options: ["element.content", "element.html", "element.text", "element.value"], answer: 2 },
          { q: "What should you check before scraping a website?", options: ["The website's colour scheme", "The robots.txt file for scraping permissions", "The server location", "The website's age"], answer: 1 },
        ],
      },
    },
    {
      order: 23,
      title: "Generators and Iterators",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Generators are functions that produce values one at a time instead of building a complete list in memory. They are essential for working with large datasets, infinite sequences, and memory-efficient pipelines.

A generator function uses yield instead of return. When called, it returns a generator object. Each time you iterate over it, the function runs until the next yield, pauses, and returns that value. The function's state is preserved between yields.

The key benefit: a generator that produces 1 million numbers uses almost no memory. A list of 1 million numbers uses significant memory. For processing large CSV files, log files, or database results, generators are the right tool.

Generator expressions look like list comprehensions but with parentheses: (x*2 for x in range(1000000)) creates a generator, not a list.

Python's itertools module provides powerful building blocks. islice() slices a generator. chain() combines multiple iterables. combinations() and permutations() generate combinations. groupby() groups consecutive elements.

The yield from syntax delegates to another generator, making it easy to compose generators.

Custom iterators implement the __iter__ and __next__ methods. __iter__ returns the iterator object itself. __next__ returns the next value or raises StopIteration when done.

Real use case: processing a 10GB log file line by line without loading it into memory. Streaming API results page by page. Generating an infinite sequence of IDs. Building a data processing pipeline where each step is a generator.`,
        keyConcepts: [
          { code: "yield value", description: "pauses function and returns value to caller" },
          { code: "def gen(): yield", description: "generator function — returns generator object" },
          { code: "(x for x in list)", description: "generator expression — lazy evaluation" },
          { code: "next(generator)", description: "gets next value from generator" },
          { code: "yield from iterable", description: "delegates to another generator or iterable" },
          { code: "itertools", description: "module with powerful iterator building blocks" },
        ],
        exerciseDescription: "Build a data processing pipeline using generators. Create generators that produce student records, filter by criteria, transform data, and calculate running statistics — all without loading everything into memory at once.",
        hint: "Chain generators together like pipes: filtered = filter_passing(all_students()) — each generator pulls from the previous one on demand. Nothing is computed until you consume the final generator.",
        exercise: `# Generators and Iterators

import itertools

# ── Basic generator ──
def count_up(start, end):
    """Generator that counts from start to end."""
    current = start
    while current <= end:
        yield current
        current += 1

print("Counting 1 to 5:")
for num in count_up(1, 5):
    print(f"  {num}", end=" ")
print()

# ── Student record generator ──
def student_records():
    """Simulates reading student records one at a time."""
    records = [
        {"name": "Kofi Mensah",     "score": 82, "course": "CS"},
        {"name": "Abena Asante",    "score": 91, "course": "CS"},
        {"name": "Kwame Boateng",   "score": 45, "course": "EE"},
        {"name": "Efua Owusu",      "score": 76, "course": "CS"},
        {"name": "Yaw Darko",       "score": 88, "course": "EE"},
        {"name": "Akosua Frimpong", "score": 53, "course": "CS"},
        {"name": "Kojo Adjei",      "score": 92, "course": "Math"},
        {"name": "Ama Owusu",       "score": 38, "course": "EE"},
    ]
    for record in records:
        yield record  # One at a time — memory efficient


# ── Pipeline generators ──
def filter_passing(records, threshold=50):
    """Yields only passing students."""
    for student in records:
        if student['score'] >= threshold:
            yield student


def add_grade(records):
    """Adds letter grade to each record."""
    for student in records:
        score = student['score']
        grade = "A" if score >= 80 else "B" if score >= 70 else "C"
        yield {**student, 'grade': grade}


def filter_course(records, course):
    """Yields only students in specified course."""
    for student in records:
        if student['course'] == course:
            yield student


# ── Build and consume the pipeline ──
print("\\nProcessing pipeline: all CS students who pass")
print("-" * 45)

pipeline = filter_course(
    add_grade(
        filter_passing(
            student_records()
        )
    ),
    course="CS"
)

for student in pipeline:
    print(f"  {student['name']:<20} {student['score']}%  Grade {student['grade']}")


# ── Running statistics with generator ──
def running_average(numbers):
    """Yields running average as numbers come in."""
    total = 0
    count = 0
    for num in numbers:
        total += num
        count += 1
        yield total / count


print("\\nRunning class average:")
scores = (s['score'] for s in student_records())  # Generator expression
for i, avg in enumerate(running_average(scores), 1):
    print(f"  After {i} students: {avg:.1f}%")


# ── itertools examples ──
print("\\nitertools.islice — first 3 passing students:")
passing = filter_passing(student_records())
first_three = list(itertools.islice(passing, 3))
for s in first_three:
    print(f"  {s['name']}: {s['score']}%")


# ── Infinite generator ──
def id_generator(prefix="STU"):
    """Generates infinite unique IDs."""
    num = 1
    while True:
        yield f"{prefix}-{num:04d}"
        num += 1

id_gen = id_generator()
print("\\nGenerated IDs:")
for _ in range(5):
    print(f"  {next(id_gen)}")`,
        quiz: [
          { q: "What keyword makes a function a generator?", options: ["return", "yield", "generate", "produce"], answer: 1 },
          { q: "What is the main advantage of generators over lists?", options: ["They are faster", "They use much less memory for large datasets", "They support more operations", "They are easier to write"], answer: 1 },
          { q: "What is a generator expression?", options: ["A list comprehension", "A lazy generator written like a list comprehension but with parentheses", "A function that returns a list", "A type of loop"], answer: 1 },
          { q: "What happens when a generator runs out of values?", options: ["It returns None", "It raises StopIteration", "It starts over", "It raises ValueError"], answer: 1 },
        ],
      },
    },
    {
      order: 24,
      title: "Decorators and Context Managers",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Decorators and context managers are two advanced Python features that make code cleaner and more expressive. You have already used them without knowing — @staticmethod is a decorator, and with open() is a context manager.

A decorator is a function that wraps another function to add behaviour. The @decorator syntax is shorthand for function = decorator(function). Decorators are used everywhere in Python frameworks — Flask uses @app.route() to register URL handlers, Django uses @login_required to protect views.

To write a decorator, you write a function that takes a function as input and returns a new function. The inner wrapper function calls the original function and can add behaviour before or after.

The functools.wraps decorator preserves the original function's name and docstring — always use it in your decorators.

Decorators with arguments need an extra layer of nesting — a function that takes the arguments and returns the actual decorator.

Context managers handle setup and teardown automatically. The with statement calls __enter__ when entering the block and __exit__ when leaving — even if an exception occurs. This guarantees cleanup.

You can write context managers using the contextlib.contextmanager decorator. Write a generator function with exactly one yield. Code before yield is the setup, code after yield is the teardown.

Real use case: a timing decorator measures how long a function takes. A retry decorator automatically retries failed API calls. A logging decorator records every function call. A database context manager opens and closes connections automatically.`,
        keyConcepts: [
          { code: "@decorator", description: "applies decorator to the function below it" },
          { code: "functools.wraps(func)", description: "preserves original function metadata" },
          { code: "def wrapper(*args, **kwargs):", description: "inner function that wraps the original" },
          { code: "with statement", description: "context manager — guarantees setup and teardown" },
          { code: "@contextmanager", description: "turns a generator into a context manager" },
          { code: "yield in context manager", description: "separates setup (before) from teardown (after)" },
        ],
        exerciseDescription: "Build practical decorators and context managers. Write a timing decorator, a retry decorator for unreliable functions, a logging decorator, and a timer context manager. Apply them to realistic scenarios.",
        hint: "Always use @functools.wraps(func) inside your decorator. Without it, the wrapped function loses its __name__ and __doc__ attributes, which breaks debugging and documentation tools.",
        exercise: `# Decorators and Context Managers

import functools
import time
import random
from contextlib import contextmanager

# ── Timing decorator ──
def timer(func):
    """Measures how long a function takes to run."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"  {func.__name__}() took {(end-start)*1000:.2f}ms")
        return result
    return wrapper


# ── Logging decorator ──
def log_call(func):
    """Logs every function call with arguments."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_str = ', '.join(str(a) for a in args)
        print(f"  CALL: {func.__name__}({args_str})")
        result = func(*args, **kwargs)
        print(f"  RETURN: {result}")
        return result
    return wrapper


# ── Retry decorator with arguments ──
def retry(max_attempts=3, delay=0.1):
    """Retries a function if it raises an exception."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Attempt {attempt} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator


# ── Apply decorators ──
@timer
def process_students(count):
    """Simulates processing student records."""
    total = sum(i * 2 for i in range(count))
    return total

@log_call
def calculate_grade(score):
    """Converts score to letter grade."""
    if score >= 80: return "A"
    elif score >= 70: return "B"
    elif score >= 60: return "C"
    else: return "F"

@retry(max_attempts=3, delay=0)
def unreliable_api_call(succeed_on_attempt=[0]):
    """Simulates an API that fails sometimes."""
    succeed_on_attempt[0] += 1
    if succeed_on_attempt[0] < 3:
        raise ConnectionError("API temporarily unavailable")
    return {"status": "success", "data": "Student records fetched"}


print("=== Timing Decorator ===")
result = process_students(100000)
print(f"  Result: {result}")

print("\\n=== Logging Decorator ===")
calculate_grade(85)
calculate_grade(62)

print("\\n=== Retry Decorator ===")
try:
    result = unreliable_api_call()
    print(f"  Success: {result}")
except Exception as e:
    print(f"  Final failure: {e}")


# ── Context managers ──
@contextmanager
def timer_context(label):
    """Context manager for timing code blocks."""
    print(f"  Starting: {label}")
    start = time.time()
    yield
    elapsed = (time.time() - start) * 1000
    print(f"  Finished: {label} ({elapsed:.2f}ms)")


@contextmanager
def managed_resource(name):
    """Simulates opening and closing a resource."""
    print(f"  Opening {name}")
    resource = {"name": name, "active": True}
    try:
        yield resource
    finally:
        resource["active"] = False
        print(f"  Closed {name}")


print("\\n=== Context Managers ===")

with timer_context("Grade calculation"):
    grades = [calculate_grade.__wrapped__(s) for s in range(40, 100, 5)]

with managed_resource("Database connection") as db:
    print(f"  Using: {db['name']} (active: {db['active']})")
    # Simulate database work
    print(f"  Query executed successfully")

print(f"  Connection active after with block: {db['active']}")`,
        quiz: [
          { q: "What does a decorator do?", options: ["Adds colour to output", "Wraps a function to add behaviour", "Renames a function", "Imports a module"], answer: 1 },
          { q: "What does @functools.wraps(func) do inside a decorator?", options: ["Speeds up the function", "Preserves the original function's name and docstring", "Makes the function run twice", "Validates the function arguments"], answer: 1 },
          { q: "What does the with statement guarantee?", options: ["The code runs faster", "Cleanup code in __exit__ always runs even if an exception occurs", "No exceptions can occur", "The function returns a value"], answer: 1 },
          { q: "What separates setup from teardown in a contextmanager generator?", options: ["return", "pass", "yield", "break"], answer: 2 },
        ],
      },
    },
    {
      order: 25,
      title: "Database with SQLite",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Databases store data permanently and let you query, filter, sort, and relate it efficiently. SQLite is a lightweight database that comes built into Python — no installation needed, no server required. It stores everything in a single file.

Python's sqlite3 module provides the interface. You connect with sqlite3.connect('database.db'). This creates the file if it does not exist. You get a cursor from the connection to execute SQL commands.

SQL — Structured Query Language — is the language databases speak. CREATE TABLE defines the structure. INSERT adds rows. SELECT retrieves rows. UPDATE modifies existing rows. DELETE removes rows. These four operations — Create, Read, Update, Delete — are called CRUD.

Always use parameterised queries — question marks as placeholders — never string formatting. cursor.execute("INSERT INTO students VALUES (?, ?, ?)", (name, score, course)) is safe. f"INSERT INTO students VALUES ('{name}'...)" is vulnerable to SQL injection attacks.

The fetchone() method returns one row. fetchall() returns all rows as a list of tuples. fetchmany(n) returns n rows.

Transactions: changes are not saved until you call connection.commit(). If something goes wrong, connection.rollback() undoes all changes since the last commit. The with statement handles this automatically.

Indexes speed up queries on large tables. CREATE INDEX idx_score ON students(score) makes queries filtering by score much faster.

Real use case: a student management system that stores records permanently, a small e-commerce site storing products and orders, a local inventory system for a shop in Accra, any application that needs to persist and query structured data.`,
        keyConcepts: [
          { code: "sqlite3.connect('db.sqlite')", description: "creates or opens a SQLite database file" },
          { code: "conn.cursor()", description: "creates a cursor for executing SQL" },
          { code: "cursor.execute(sql, params)", description: "runs SQL with parameterised values" },
          { code: "cursor.fetchall()", description: "returns all results as list of tuples" },
          { code: "conn.commit()", description: "saves all pending changes to disk" },
          { code: "?", description: "placeholder in parameterised queries — prevents SQL injection" },
        ],
        exerciseDescription: "Build a complete student database using SQLite. Create tables, insert records, query with filters, update grades, and generate reports. Use parameterised queries throughout. Add a search function and a statistics query.",
        hint: "Use context managers for database connections: with sqlite3.connect('students.db') as conn: — this auto-commits on success and auto-rolls back on error.",
        exercise: `# Database with SQLite — Student Management System

import sqlite3
import os

DB_FILE = "students.db"

# ── Database setup ──
def init_database():
    """Create tables if they don't exist."""
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id      INTEGER PRIMARY KEY AUTOINCREMENT,
                name    TEXT NOT NULL,
                course  TEXT NOT NULL,
                year    INTEGER,
                email   TEXT UNIQUE
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS grades (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id INTEGER REFERENCES students(id),
                subject    TEXT NOT NULL,
                score      INTEGER CHECK(score >= 0 AND score <= 100),
                semester   TEXT
            )
        """)
        conn.execute("CREATE INDEX IF NOT EXISTS idx_score ON grades(score)")
    print("Database initialised.")


# ── CRUD operations ──
def add_student(name, course, year, email):
    """Insert a new student."""
    with sqlite3.connect(DB_FILE) as conn:
        cursor = conn.execute(
            "INSERT INTO students (name, course, year, email) VALUES (?, ?, ?, ?)",
            (name, course, year, email)
        )
        return cursor.lastrowid


def add_grade(student_id, subject, score, semester="2024-1"):
    """Record a grade for a student."""
    with sqlite3.connect(DB_FILE) as conn:
        conn.execute(
            "INSERT INTO grades (student_id, subject, score, semester) VALUES (?, ?, ?, ?)",
            (student_id, subject, score, semester)
        )


def get_student_report(student_id):
    """Get full report for one student."""
    with sqlite3.connect(DB_FILE) as conn:
        conn.row_factory = sqlite3.Row
        student = conn.execute(
            "SELECT * FROM students WHERE id = ?", (student_id,)
        ).fetchone()

        if not student:
            return None

        grades = conn.execute(
            "SELECT subject, score FROM grades WHERE student_id = ? ORDER BY score DESC",
            (student_id,)
        ).fetchall()

        return dict(student), [dict(g) for g in grades]


def get_class_stats():
    """Get overall class statistics."""
    with sqlite3.connect(DB_FILE) as conn:
        conn.row_factory = sqlite3.Row
        stats = conn.execute("""
            SELECT
                s.name,
                s.course,
                ROUND(AVG(g.score), 1) as average,
                MAX(g.score) as highest,
                MIN(g.score) as lowest,
                COUNT(g.id) as num_grades
            FROM students s
            JOIN grades g ON s.id = g.student_id
            GROUP BY s.id
            ORDER BY average DESC
        """).fetchall()
        return [dict(row) for row in stats]


# ── Run the system ──
init_database()

# Insert students
print("\\nAdding students...")
students_data = [
    ("Kofi Mensah",     "Computer Science", 2, "kofi@ug.edu.gh"),
    ("Abena Asante",    "Computer Science", 1, "abena@ug.edu.gh"),
    ("Kwame Boateng",   "Engineering",      3, "kwame@ug.edu.gh"),
    ("Efua Owusu",      "Mathematics",      2, "efua@ug.edu.gh"),
]

ids = []
for name, course, year, email in students_data:
    sid = add_student(name, course, year, email)
    ids.append(sid)
    print(f"  Added: {name} (ID: {sid})")

# Add grades
grades_data = [
    (ids[0], [("Programming", 82), ("Maths", 78), ("Databases", 88)]),
    (ids[1], [("Programming", 91), ("Maths", 85), ("Databases", 93)]),
    (ids[2], [("Mechanics", 72), ("Calculus", 68), ("Physics", 75)]),
    (ids[3], [("Analysis", 88), ("Algebra", 92), ("Statistics", 85)]),
]

print("\\nRecording grades...")
for sid, subject_scores in grades_data:
    for subject, score in subject_scores:
        add_grade(sid, subject, score)

# Display individual report
print("\\nStudent Report — Kofi Mensah:")
student, grades = get_student_report(ids[0])
print(f"  Name: {student['name']}")
print(f"  Course: {student['course']}, Year {student['year']}")
for g in grades:
    print(f"  {g['subject']}: {g['score']}%")

# Class statistics
print("\\nClass Rankings:")
print(f"  {'Name':<20} {'Course':<18} {'Avg':>6} {'High':>5} {'Low':>5}")
print("  " + "-" * 55)
for row in get_class_stats():
    print(f"  {row['name']:<20} {row['course']:<18} {row['average']:>5}%  {row['highest']:>4}  {row['lowest']:>4}")

# Cleanup
os.remove(DB_FILE)
print("\\nDatabase cleaned up.")`,
        quiz: [
          { q: "Why use parameterised queries with ? instead of string formatting?", options: ["They are faster", "They prevent SQL injection attacks", "They use less memory", "They work on all databases"], answer: 1 },
          { q: "What does conn.commit() do?", options: ["Closes the database", "Saves all pending changes to disk", "Rolls back changes", "Creates a backup"], answer: 1 },
          { q: "What does cursor.fetchall() return?", options: ["The first row only", "The number of rows", "All rows as a list of tuples", "A dictionary of results"], answer: 2 },
          { q: "What does AUTOINCREMENT do on an INTEGER PRIMARY KEY?", options: ["Multiplies the ID", "Automatically assigns a unique increasing number", "Makes the field required", "Links to another table"], answer: 1 },
        ],
      },
    },
    {
      order: 26,
      title: "Flask Introduction",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Flask is a lightweight Python web framework. It lets you build web applications — websites and APIs — using Python. Companies like Pinterest and LinkedIn have used Flask for parts of their infrastructure.

A web framework handles the plumbing: receiving HTTP requests, routing them to the right code, and sending back responses. You focus on the logic, Flask handles the rest.

Installing Flask: pip install flask. Import it: from flask import Flask. Create an app: app = Flask(__name__). Define routes with @app.route() decorators. Run with app.run().

A route maps a URL path to a Python function. @app.route('/') maps the root URL to a function. @app.route('/students') maps /students. The function returns what the browser should receive — usually HTML or JSON.

Dynamic routes use angle brackets: @app.route('/student/<int:id>') captures the ID from the URL and passes it to the function as a parameter.

The request object contains incoming data. request.args.get('name') gets query parameters from the URL. request.json gets JSON data sent in the request body. request.form gets form submission data.

The jsonify function converts Python dictionaries to proper JSON responses with the correct content-type header.

In this lesson, since Pyodide cannot run a real web server, we simulate Flask routes and show the concepts. In a real environment, you run the Flask app and visit it in your browser.

Real use case: a REST API for a mobile app, a web dashboard for a school management system, a payment webhook handler, a simple website for a Ghanaian business.`,
        keyConcepts: [
          { code: "from flask import Flask", description: "imports the Flask class" },
          { code: "app = Flask(__name__)", description: "creates the Flask application" },
          { code: "@app.route('/path')", description: "registers a URL route" },
          { code: "return jsonify(data)", description: "returns JSON response" },
          { code: "request.args.get('key')", description: "gets URL query parameter" },
          { code: "app.run(debug=True)", description: "starts the development server" },
        ],
        exerciseDescription: "Build a simulated Flask student API. Define routes for listing students, getting one student, adding a student, and calculating class statistics. Show the Flask code structure and simulate the request/response cycle.",
        hint: "In a real Flask app, you would run this file and visit http://localhost:5000 in your browser. The @app.route() decorator is what Flask uses to know which function handles which URL.",
        exercise: `# Flask Introduction — Student API
# This shows Flask structure. In production:
# pip install flask
# python app.py
# Then visit http://localhost:5000

# ── Simulated Flask application ──

# In a real app this would be:
# from flask import Flask, jsonify, request
# app = Flask(__name__)

# We simulate the Flask behaviour here
class SimulatedFlask:
    def __init__(self):
        self.routes = {}
        self.students_db = [
            {"id": 1, "name": "Kofi Mensah",   "course": "CS",   "gpa": 3.5},
            {"id": 2, "name": "Abena Asante",  "course": "CS",   "gpa": 3.85},
            {"id": 3, "name": "Kwame Boateng", "course": "EE",   "gpa": 2.9},
            {"id": 4, "name": "Efua Owusu",    "course": "Math", "gpa": 3.7},
        ]

    def route(self, path, methods=["GET"]):
        def decorator(func):
            self.routes[path] = func
            return func
        return decorator

    def simulate_request(self, method, path, params=None, body=None):
        print(f"\\n{'='*45}")
        print(f"  {method} {path}")
        if params:
            print(f"  Params: {params}")
        if body:
            print(f"  Body: {body}")
        print(f"{'='*45}")

app = SimulatedFlask()

# ── Route definitions ──

@app.route('/')
def index():
    return {
        "message": "CodePath Student API",
        "version": "1.0",
        "endpoints": ["/students", "/students/<id>", "/students/stats"]
    }

@app.route('/students')
def get_students():
    """GET /students — returns all students."""
    return {
        "students": app.students_db,
        "total": len(app.students_db)
    }

@app.route('/students/<int:student_id>')
def get_student(student_id):
    """GET /students/1 — returns one student."""
    student = next(
        (s for s in app.students_db if s["id"] == student_id),
        None
    )
    if student:
        return {"student": student}
    return {"error": "Student not found"}, 404

@app.route('/students/stats')
def get_stats():
    """GET /students/stats — class statistics."""
    gpas = [s["gpa"] for s in app.students_db]
    return {
        "total_students": len(app.students_db),
        "average_gpa": round(sum(gpas) / len(gpas), 2),
        "highest_gpa": max(gpas),
        "lowest_gpa": min(gpas),
        "courses": list(set(s["course"] for s in app.students_db))
    }

@app.route('/students', methods=["POST"])
def add_student():
    """POST /students — adds a new student."""
    # In real Flask: data = request.json
    # Simulated new student:
    new_student = {"id": 5, "name": "Yaw Darko", "course": "CS", "gpa": 3.6}
    app.students_db.append(new_student)
    return {"message": "Student added", "student": new_student}, 201


# ── Simulate requests ──
import json

def simulate_and_display(method, path, handler, *args):
    app.simulate_request(method, path)
    result = handler(*args) if args else handler()
    if isinstance(result, tuple):
        response, status = result
    else:
        response, status = result, 200
    print(f"  Status: {status}")
    print(f"  Response:")
    print(json.dumps(response, indent=4))

simulate_and_display("GET", "/", index)
simulate_and_display("GET", "/students", get_students)
simulate_and_display("GET", "/students/2", get_student, 2)
simulate_and_display("GET", "/students/stats", get_stats)
simulate_and_display("POST", "/students", add_student)
simulate_and_display("GET", "/students/99", get_student, 99)

print("\\n" + "="*45)
print("  Real Flask app.py would look like:")
print("="*45)
print("""
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/students')
def get_students():
    return jsonify({"students": students_db})

@app.route('/students/<int:id>')
def get_student(id):
    student = find_student(id)
    if student:
        return jsonify(student)
    return jsonify({"error": "Not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
""")`,
        quiz: [
          { q: "What does @app.route('/students') do?", options: ["Creates a students variable", "Maps the /students URL to the function below it", "Imports a students module", "Creates a database table"], answer: 1 },
          { q: "What does jsonify() do in Flask?", options: ["Converts JSON to Python", "Creates a proper JSON HTTP response", "Validates JSON data", "Saves JSON to a file"], answer: 1 },
          { q: "How do you get a URL parameter like /students/<id>?", options: ["request.params('id')", "url.get('id')", "The id is passed as a function argument", "request.path['id']"], answer: 2 },
          { q: "What does app.run(debug=True) do?", options: ["Deploys to production", "Starts a development server with auto-reload", "Runs tests", "Enables logging"], answer: 1 },
        ],
      },
    },
    {
      order: 27,
      title: "Flask Routes and Templates",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Flask templates let you serve dynamic HTML pages. Instead of returning raw HTML strings from your routes, you use Jinja2 templates — HTML files with special syntax that Flask fills in with Python data.

The render_template() function takes a template filename and keyword arguments. The template receives those arguments as variables.

Jinja2 syntax is straightforward. Double curly braces render a variable: {{ student.name }}. Block tags with percent signs control flow: {% if %}, {% for %}, {% endif %}, {% endfor %}.

Template inheritance eliminates repetition. A base template defines the page structure — head, navigation, footer. Child templates extend the base and fill in the content blocks. This means navigation and footer are written once and inherited everywhere.

The {% extends 'base.html' %} tag makes a template extend another. The {% block content %} and {% endblock %} tags define replaceable sections. The child template overrides these blocks with its specific content.

The url_for() function generates URLs from route function names — url_for('get_student', id=1) generates /students/1. Using url_for() instead of hardcoded URLs means if you change a route path, all links update automatically.

Static files — CSS, JavaScript, images — live in a static folder. Flask serves them at /static/. Reference them in templates with url_for('static', filename='style.css').

Flash messages let you show one-time notifications — "Student added successfully" or "Invalid email" — that appear on the next page load and then disappear.

Real use case: a school management system with login, student list, grade entry, and report pages all sharing the same navigation and footer via template inheritance.`,
        keyConcepts: [
          { code: "render_template('page.html', data=data)", description: "renders an HTML template with data" },
          { code: "{{ variable }}", description: "Jinja2 — outputs variable value in template" },
          { code: "{% for item in list %}", description: "Jinja2 — loop in template" },
          { code: "{% extends 'base.html' %}", description: "template inherits from base" },
          { code: "{% block content %}", description: "defines replaceable section" },
          { code: "url_for('function_name')", description: "generates URL from route function name" },
        ],
        exerciseDescription: "Build a Flask student portal with template inheritance. Create a base template with navigation, a student list page, and a student detail page. Use Jinja2 loops and conditionals to render dynamic content. Show the complete template and route structure.",
        hint: "Template inheritance: the base template has {% block content %}{% endblock %}. Each page template has {% extends 'base.html' %} at the top and {% block content %}...your content...{% endblock %} for its content.",
        exercise: `# Flask Routes and Templates
# Showing the complete structure for a student portal

# ── Flask routes (app.py) ──
flask_app = '''
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Simulated database
students = [
    {"id": 1, "name": "Kofi Mensah",   "course": "Computer Science", "gpa": 3.5,  "year": 2},
    {"id": 2, "name": "Abena Asante",  "course": "Computer Science", "gpa": 3.85, "year": 1},
    {"id": 3, "name": "Kwame Boateng", "course": "Engineering",      "gpa": 2.9,  "year": 3},
]

@app.route('/')
def home():
    return render_template('home.html', title='CodePath Portal')

@app.route('/students')
def student_list():
    course_filter = request.args.get('course', '')
    filtered = [s for s in students if course_filter in s['course']] if course_filter else students
    return render_template('students.html',
        title='Students',
        students=filtered,
        filter=course_filter
    )

@app.route('/students/<int:student_id>')
def student_detail(student_id):
    student = next((s for s in students if s['id'] == student_id), None)
    if not student:
        return render_template('404.html'), 404
    return render_template('student_detail.html',
        title=student['name'],
        student=student
    )

if __name__ == '__main__':
    app.run(debug=True)
'''

# ── Templates ──

base_html = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ title }} — CodePath</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
    <nav>
        <a href="{{ url_for('home') }}" class="logo">CodePath</a>
        <div class="nav-links">
            <a href="{{ url_for('home') }}">Home</a>
            <a href="{{ url_for('student_list') }}">Students</a>
        </div>
    </nav>

    <main>
        {% block content %}{% endblock %}
    </main>

    <footer>
        <p>CodePath Ghana &copy; 2024</p>
    </footer>
</body>
</html>
'''

students_html = '''
{% extends 'base.html' %}

{% block content %}
<div class="container">
    <h1>All Students</h1>

    <!-- Filter form -->
    <form method="GET">
        <input type="text" name="course" value="{{ filter }}" placeholder="Filter by course">
        <button type="submit">Filter</button>
    </form>

    <!-- Students table -->
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>GPA</th>
                <th>Class</th>
            </tr>
        </thead>
        <tbody>
            {% for student in students %}
            <tr>
                <td>
                    <a href="{{ url_for('student_detail', student_id=student.id) }}">
                        {{ student.name }}
                    </a>
                </td>
                <td>{{ student.course }}</td>
                <td>Year {{ student.year }}</td>
                <td>{{ student.gpa }}</td>
                <td>
                    {% if student.gpa >= 3.6 %}
                        First Class
                    {% elif student.gpa >= 3.0 %}
                        Second Class Upper
                    {% else %}
                        Second Class Lower
                    {% endif %}
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>

    <p>Total: {{ students|length }} students</p>
</div>
{% endblock %}
'''

student_detail_html = '''
{% extends 'base.html' %}

{% block content %}
<div class="container">
    <a href="{{ url_for('student_list') }}">&larr; Back to students</a>

    <h1>{{ student.name }}</h1>

    <div class="detail-card">
        <p><strong>Course:</strong> {{ student.course }}</p>
        <p><strong>Year:</strong> Year {{ student.year }}</p>
        <p><strong>GPA:</strong> {{ student.gpa }} / 4.0</p>
        <p><strong>Classification:</strong>
            {% if student.gpa >= 3.6 %}
                🏆 First Class Honours
            {% elif student.gpa >= 3.0 %}
                Second Class Upper
            {% else %}
                Second Class Lower
            {% endif %}
        </p>
    </div>
</div>
{% endblock %}
'''

# ── Display the templates ──
print("=" * 50)
print("  FLASK STUDENT PORTAL STRUCTURE")
print("=" * 50)

print("\\n📁 Project structure:")
print("""
  student_portal/
  ├── app.py
  ├── static/
  │   └── style.css
  └── templates/
      ├── base.html        (shared nav + footer)
      ├── home.html
      ├── students.html    (list with filter)
      └── student_detail.html
""")

print("\\n📄 app.py — Routes:")
print(flask_app)

print("\\n📄 templates/base.html:")
print(base_html)

print("\\n📄 templates/students.html:")
print(students_html)`,
        quiz: [
          { q: "What does render_template() do?", options: ["Creates a new template", "Renders an HTML template file with provided data", "Validates HTML", "Compiles Python to HTML"], answer: 1 },
          { q: "What Jinja2 syntax outputs a variable?", options: ["<% variable %>", "${variable}", "{{ variable }}", "[[variable]]"], answer: 2 },
          { q: "What does {% extends 'base.html' %} do?", options: ["Imports base.html", "Makes the template inherit from base.html", "Creates a copy of base.html", "Links to base.html"], answer: 1 },
          { q: "What is url_for() used for?", options: ["Formatting URLs", "Generating URLs from route function names", "Validating URLs", "Redirecting users"], answer: 1 },
        ],
      },
    },
    {
      order: 28,
      title: "Flask with Database",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `Connecting Flask to a database is what makes web applications real. Without a database, all data lives in Python variables and disappears when the server restarts. With a database, data persists.

SQLAlchemy is the standard ORM — Object Relational Mapper — for Flask. It lets you define database tables as Python classes and interact with them using Python objects instead of raw SQL. Flask-SQLAlchemy is the Flask integration.

Define models as classes that inherit from db.Model. Each class attribute with db.Column() defines a database column. db.Integer, db.String, db.Float, db.Boolean, and db.DateTime are common column types.

Relationships between tables use db.relationship() on one model and db.ForeignKey() on the other. A one-to-many relationship — one student has many grades — uses a foreign key on the grades table pointing to the students table.

CRUD with SQLAlchemy: Create with db.session.add(obj) then db.session.commit(). Read with Model.query.all() or Model.query.filter_by(field=value).first(). Update by changing attributes then committing. Delete with db.session.delete(obj) then committing.

Database migrations track changes to your schema over time. Flask-Migrate manages this. When you add a column or change a type, you create a migration, Flask-Migrate generates the SQL, and you apply it without losing data.

In this lesson we simulate SQLAlchemy models to show the patterns. The real implementation requires pip install flask-sqlalchemy flask-migrate.

Real use case: a school management system where students, courses, and grades are stored in related tables. A blog where posts have many comments. An e-commerce site where orders have many items.`,
        keyConcepts: [
          { code: "class Student(db.Model):", description: "defines a database model as a Python class" },
          { code: "db.Column(db.String(100))", description: "defines a database column" },
          { code: "db.session.add(obj)", description: "stages an object for insertion" },
          { code: "db.session.commit()", description: "saves all staged changes to database" },
          { code: "Student.query.filter_by(course='CS')", description: "queries students by course" },
          { code: "db.ForeignKey('students.id')", description: "creates a foreign key relationship" },
        ],
        exerciseDescription: "Build a complete Flask + SQLAlchemy student management system. Define Student and Grade models with a relationship. Implement full CRUD — create, read, update, delete. Show how queries, filters, and relationships work in practice.",
        hint: "After defining your models, you need to create the tables: with app.app_context(): db.create_all(). This only needs to run once — it is safe to call multiple times as it skips existing tables.",
        exercise: `# Flask with Database — SQLAlchemy Student System
# Full implementation showing models, CRUD, and relationships

# ── Simulating SQLAlchemy patterns in pure Python ──
# In a real Flask app:
# pip install flask flask-sqlalchemy
# from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

# Simulated database storage
_students_table = {}
_grades_table = {}
_next_student_id = 1
_next_grade_id = 1


# ── Model definitions ──
# (In real Flask these inherit from db.Model)

class Student:
    """
    Real SQLAlchemy definition:

    class Student(db.Model):
        id      = db.Column(db.Integer, primary_key=True)
        name    = db.Column(db.String(100), nullable=False)
        course  = db.Column(db.String(50))
        email   = db.Column(db.String(120), unique=True)
        gpa     = db.Column(db.Float, default=0.0)
        created = db.Column(db.DateTime, default=datetime.utcnow)
        grades  = db.relationship('Grade', backref='student', lazy=True)
    """
    def __init__(self, name, course, email, gpa=0.0):
        global _next_student_id
        self.id = _next_student_id
        _next_student_id += 1
        self.name = name
        self.course = course
        self.email = email
        self.gpa = gpa
        self.created = datetime.now()

    def __repr__(self):
        return f"<Student {self.name}>"

    def save(self):
        _students_table[self.id] = self
        return self

    def delete(self):
        del _students_table[self.id]

    @classmethod
    def query_all(cls):
        return list(_students_table.values())

    @classmethod
    def query_filter(cls, **kwargs):
        results = list(_students_table.values())
        for key, value in kwargs.items():
            results = [s for s in results if getattr(s, key, None) == value]
        return results

    @classmethod
    def query_get(cls, id):
        return _students_table.get(id)


class Grade:
    """
    Real SQLAlchemy definition:

    class Grade(db.Model):
        id         = db.Column(db.Integer, primary_key=True)
        student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
        subject    = db.Column(db.String(50))
        score      = db.Column(db.Integer)
        semester   = db.Column(db.String(20))
    """
    def __init__(self, student_id, subject, score, semester="2024-1"):
        global _next_grade_id
        self.id = _next_grade_id
        _next_grade_id += 1
        self.student_id = student_id
        self.subject = subject
        self.score = score
        self.semester = semester

    def save(self):
        _grades_table[self.id] = self
        return self

    @classmethod
    def for_student(cls, student_id):
        return [g for g in _grades_table.values() if g.student_id == student_id]


# ── CRUD operations ──

print("=== CREATE ===")
s1 = Student("Kofi Mensah", "CS", "kofi@ug.edu.gh", 3.5).save()
s2 = Student("Abena Asante", "CS", "abena@ug.edu.gh", 3.85).save()
s3 = Student("Kwame Boateng", "EE", "kwame@ug.edu.gh", 2.9).save()
s4 = Student("Efua Owusu", "Math", "efua@ug.edu.gh", 3.7).save()

Grade(s1.id, "Programming", 82).save()
Grade(s1.id, "Databases", 88).save()
Grade(s2.id, "Programming", 91).save()
Grade(s2.id, "Databases", 93).save()

print(f"Created {len(Student.query_all())} students")
print(f"Created {len(_grades_table)} grades")

print("\\n=== READ ===")
all_students = Student.query_all()
for s in all_students:
    print(f"  {s.id}. {s.name} — {s.course} — GPA {s.gpa}")

print("\\n=== FILTER ===")
cs_students = Student.query_filter(course="CS")
print(f"CS students ({len(cs_students)}):")
for s in cs_students:
    grades = Grade.for_student(s.id)
    avg = sum(g.score for g in grades) / len(grades) if grades else 0
    print(f"  {s.name}: {len(grades)} grades, avg {avg:.0f}%")

print("\\n=== UPDATE ===")
kofi = Student.query_get(s1.id)
old_gpa = kofi.gpa
kofi.gpa = 3.65
kofi.save()
print(f"Updated {kofi.name} GPA: {old_gpa} → {kofi.gpa}")

print("\\n=== RELATIONSHIPS ===")
for student in Student.query_all()[:2]:
    grades = Grade.for_student(student.id)
    print(f"\\n  {student.name}'s grades:")
    for g in grades:
        print(f"    {g.subject}: {g.score}%")

print("\\n=== DELETE ===")
count_before = len(Student.query_all())
Student.query_get(s3.id).delete()
count_after = len(Student.query_all())
print(f"Deleted Kwame. Students: {count_before} → {count_after}")

print("\\n=== Real Flask + SQLAlchemy setup ===")
print("""
# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///students.db'
db = SQLAlchemy(app)

class Student(db.Model):
    id    = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(100))
    course = db.Column(db.String(50))

with app.app_context():
    db.create_all()  # Create tables
""")`,
        quiz: [
          { q: "What is an ORM?", options: ["A type of database", "A tool that maps Python classes to database tables", "A web framework", "A type of SQL query"], answer: 1 },
          { q: "What does db.session.commit() do?", options: ["Closes the database", "Saves all pending changes to the database", "Rolls back changes", "Creates a new session"], answer: 1 },
          { q: "What does db.ForeignKey('student.id') create?", options: ["A copy of the student table", "A link between tables", "A new student column", "A primary key"], answer: 1 },
          { q: "What is lazy=True in a relationship?", options: ["Makes queries slower", "Loads related data only when accessed, not automatically", "Creates a lazy copy", "Disables the relationship"], answer: 1 },
        ],
      },
    },
    {
      order: 29,
      title: "Building a REST API",
      xpValue: 50,
      isFree: false,
      content: {
        language: "python",
        concept: `A REST API — Representational State Transfer — is a web service that lets other applications communicate with your backend over HTTP. Mobile apps, frontend JavaScript, and third-party integrations all talk to REST APIs.

REST uses HTTP methods to indicate intent. GET retrieves data. POST creates new data. PUT or PATCH updates existing data. DELETE removes data.

Resources are the nouns in your API. /students is the students collection. /students/1 is a specific student. /students/1/grades is the grades for student 1.

Status codes communicate the result. 200 OK for successful GET. 201 Created for successful POST. 400 Bad Request for invalid input. 401 Unauthorized for missing authentication. 404 Not Found for missing resources. 500 Internal Server Error for server bugs.

Input validation is critical. Validate that required fields are present, that values are the right type, and that data meets business rules — before touching the database. Return clear 400 errors with specific messages.

Authentication protects your API. JWT — JSON Web Tokens — are the standard for REST APIs. The client logs in and receives a token. It includes that token in subsequent requests as a Bearer token in the Authorization header. The server validates the token on each request.

Rate limiting prevents abuse. An API that accepts unlimited requests can be overwhelmed. Flask-Limiter adds rate limiting with decorators.

CORS — Cross-Origin Resource Sharing — allows frontend JavaScript from a different domain to call your API. Flask-CORS handles this with a simple decorator.

Real use case: a mobile app for a Ghanaian school calls your Flask API to display student grades. A React dashboard calls your API to show charts. A WhatsApp bot calls your API to respond to student queries.`,
        keyConcepts: [
          { code: "GET /students", description: "retrieve all students" },
          { code: "POST /students", description: "create a new student" },
          { code: "PUT /students/1", description: "update student with id 1" },
          { code: "DELETE /students/1", description: "delete student with id 1" },
          { code: "status 201", description: "resource was created successfully" },
          { code: "Authorization: Bearer token", description: "JWT authentication header" },
        ],
        exerciseDescription: "Build a complete REST API for a student management system. Implement all CRUD endpoints with proper status codes, input validation, and error handling. Show the complete API contract with example requests and responses.",
        hint: "Always validate input before processing. Check required fields exist, types are correct, and values are in valid ranges. Return 400 with a specific message — not 500 — when validation fails.",
        exercise: `# Building a REST API — Complete Student API

import json
from datetime import datetime

# ── Simulated Flask REST API ──
# In production: pip install flask flask-jwt-extended flask-cors

class RESTAPISimulator:
    def __init__(self):
        self.students = {
            1: {"id": 1, "name": "Kofi Mensah",   "course": "CS",   "email": "kofi@ug.edu.gh",   "gpa": 3.5},
            2: {"id": 2, "name": "Abena Asante",  "course": "CS",   "email": "abena@ug.edu.gh",  "gpa": 3.85},
            3: {"id": 3, "name": "Kwame Boateng", "course": "EE",   "email": "kwame@ug.edu.gh",  "gpa": 2.9},
        }
        self.next_id = 4

    def validate_student(self, data):
        """Validates student data. Returns (is_valid, errors)."""
        errors = []
        required = ['name', 'course', 'email']

        for field in required:
            if not data.get(field):
                errors.append(f"'{field}' is required")

        if data.get('email') and '@' not in data['email']:
            errors.append("'email' must be a valid email address")

        if data.get('gpa') is not None:
            try:
                gpa = float(data['gpa'])
                if not (0.0 <= gpa <= 4.0):
                    errors.append("'gpa' must be between 0.0 and 4.0")
            except (TypeError, ValueError):
                errors.append("'gpa' must be a number")

        return len(errors) == 0, errors

    def respond(self, status, data):
        status_text = {200: "OK", 201: "Created", 400: "Bad Request",
                       404: "Not Found", 409: "Conflict", 500: "Server Error"}
        return {"status": status, "status_text": status_text.get(status, ""), "body": data}

    # ── GET /students ──
    def get_students(self, course=None, sort_by="name"):
        students = list(self.students.values())
        if course:
            students = [s for s in students if s['course'] == course]
        students.sort(key=lambda s: s.get(sort_by, ''))
        return self.respond(200, {"students": students, "total": len(students)})

    # ── GET /students/:id ──
    def get_student(self, student_id):
        student = self.students.get(student_id)
        if not student:
            return self.respond(404, {"error": f"Student {student_id} not found"})
        return self.respond(200, {"student": student})

    # ── POST /students ──
    def create_student(self, data):
        is_valid, errors = self.validate_student(data)
        if not is_valid:
            return self.respond(400, {"error": "Validation failed", "details": errors})

        # Check duplicate email
        existing_emails = [s['email'] for s in self.students.values()]
        if data['email'] in existing_emails:
            return self.respond(409, {"error": "Email already registered"})

        student = {
            "id": self.next_id,
            "name": data['name'],
            "course": data['course'],
            "email": data['email'],
            "gpa": float(data.get('gpa', 0.0)),
            "created": datetime.now().isoformat()
        }
        self.students[self.next_id] = student
        self.next_id += 1
        return self.respond(201, {"message": "Student created", "student": student})

    # ── PUT /students/:id ──
    def update_student(self, student_id, data):
        if student_id not in self.students:
            return self.respond(404, {"error": f"Student {student_id} not found"})

        student = self.students[student_id]
        updatable = ['name', 'course', 'gpa']
        for field in updatable:
            if field in data:
                student[field] = data[field]
        student['updated'] = datetime.now().isoformat()
        return self.respond(200, {"message": "Student updated", "student": student})

    # ── DELETE /students/:id ──
    def delete_student(self, student_id):
        if student_id not in self.students:
            return self.respond(404, {"error": f"Student {student_id} not found"})
        deleted = self.students.pop(student_id)
        return self.respond(200, {"message": f"Student '{deleted['name']}' deleted"})


# ── Simulate API calls ──
api = RESTAPISimulator()

def call(method, endpoint, data=None, params=None):
    print(f"\\n{'─'*50}")
    print(f"  {method} {endpoint}")
    if params: print(f"  Query: {params}")
    if data:   print(f"  Body: {json.dumps(data, indent=2)}")

def show(response):
    print(f"  ← {response['status']} {response['status_text']}")
    print(f"  {json.dumps(response['body'], indent=2)}")

# GET all students
call("GET", "/students")
show(api.get_students())

# GET with filter
call("GET", "/students?course=CS", params={"course": "CS"})
show(api.get_students(course="CS"))

# GET one student
call("GET", "/students/2")
show(api.get_student(2))

# POST — create student
call("POST", "/students", data={"name": "Efua Owusu", "course": "Math", "email": "efua@ug.edu.gh", "gpa": 3.7})
show(api.create_student({"name": "Efua Owusu", "course": "Math", "email": "efua@ug.edu.gh", "gpa": 3.7}))

# POST — validation error
call("POST", "/students", data={"name": "Bad Student", "gpa": 5.0})
show(api.create_student({"name": "Bad Student", "gpa": 5.0}))

# PUT — update
call("PUT", "/students/1", data={"gpa": 3.75})
show(api.update_student(1, {"gpa": 3.75}))

# DELETE
call("DELETE", "/students/3")
show(api.delete_student(3))

# GET after delete
call("GET", "/students/3")
show(api.get_student(3))`,
        quiz: [
          { q: "Which HTTP method is used to create a new resource?", options: ["GET", "PUT", "POST", "DELETE"], answer: 2 },
          { q: "What status code should a successful creation return?", options: ["200", "201", "204", "400"], answer: 1 },
          { q: "What status code means the client sent invalid data?", options: ["404", "500", "401", "400"], answer: 3 },
          { q: "What is JWT used for in a REST API?", options: ["Data formatting", "Authentication — verifying who the caller is", "Rate limiting", "Input validation"], answer: 1 },
        ],
      },
    },
    {
      order: 30,
      title: "Project 3 — Full Flask Web App",
      xpValue: 200,
      isFree: false,
      content: {
        language: "python",
        concept: `This is your final Python Fundamentals project. You have completed 29 lessons covering every core Python concept and the full Flask web development stack. Now you build a complete, deployable web application.

The project is a Student Portal — a full web application with user authentication, a database, and multiple pages. Students can register, log in, view their grades, and see their profile. Administrators can add grades and manage students.

Technical requirements: Flask application with SQLAlchemy database. User authentication with password hashing using werkzeug.security. Session management with Flask sessions. Template inheritance for all pages. RESTful API endpoints. Input validation on all forms. Error handling for all routes.

The database has at minimum three tables: users (id, username, email, password_hash, role), subjects (id, name, code), and grades (id, user_id, subject_id, score, semester).

Authentication: passwords are never stored in plain text. Use generate_password_hash() to hash passwords on registration. Use check_password_hash() to verify on login.

Routes to implement: GET / — home page. GET/POST /register — registration. GET/POST /login — login. GET /logout — logout. GET /dashboard — student dashboard (protected). GET /grades — student's grades (protected). POST /api/grades — add grade (admin only).

Deployment: deploy to Render.com or Railway.app with a Procfile that contains: web: gunicorn app:app. Set a SECRET_KEY environment variable.

After earning this certificate, you are a Python web developer. You can build real applications, deploy them to the internet, and charge clients in Ghana for your work.`,
        keyConcepts: [
          { code: "generate_password_hash(password)", description: "securely hashes a password" },
          { code: "check_password_hash(hash, password)", description: "verifies password against hash" },
          { code: "session['user_id'] = user.id", description: "stores user in session after login" },
          { code: "login_required decorator", description: "protects routes from unauthenticated access" },
          { code: "gunicorn app:app", description: "production WSGI server command" },
          { code: "DATABASE_URL", description: "environment variable for production database" },
        ],
        exerciseDescription: "Build the complete Student Portal. The starter code gives you the full application structure — models, routes, and templates. Run it locally, add your own features, then deploy to Render. Submit your live URL for the certificate.",
        hint: "Start by running the app locally: pip install flask flask-sqlalchemy werkzeug, then python app.py. Test every route before deploying. For deployment, add gunicorn to requirements.txt and create a Procfile.",
        exercise: `# Complete Flask Student Portal — Project 3
# Full production-ready application structure

# ── app.py ──
app_py = '''
import os
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///portal.db')
db = SQLAlchemy(app)


# ── Models ──

class User(db.Model):
    id            = db.Column(db.Integer, primary_key=True)
    name          = db.Column(db.String(100), nullable=False)
    email         = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    role          = db.Column(db.String(20), default='student')
    created       = db.Column(db.DateTime, default=datetime.utcnow)
    grades        = db.relationship('Grade', backref='student', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Subject(db.Model):
    id     = db.Column(db.Integer, primary_key=True)
    name   = db.Column(db.String(100), nullable=False)
    code   = db.Column(db.String(20), unique=True)
    grades = db.relationship('Grade', backref='subject', lazy=True)


class Grade(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'), nullable=False)
    score      = db.Column(db.Integer, nullable=False)
    semester   = db.Column(db.String(20), default='2024-1')
    recorded   = db.Column(db.DateTime, default=datetime.utcnow)


# ── Auth helpers ──

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login'))
        user = User.query.get(session['user_id'])
        if not user or user.role != 'admin':
            return jsonify({"error": "Admin access required"}), 403
        return f(*args, **kwargs)
    return decorated

def current_user():
    if 'user_id' in session:
        return User.query.get(session['user_id'])
    return None


# ── Routes ──

@app.route('/')
def home():
    return render_template('home.html', user=current_user())


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name     = request.form.get('name', '').strip()
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')

        errors = []
        if not name:     errors.append('Name is required')
        if not email:    errors.append('Email is required')
        if len(password) < 8: errors.append('Password must be at least 8 characters')
        if User.query.filter_by(email=email).first(): errors.append('Email already registered')

        if errors:
            return render_template('register.html', errors=errors, name=name, email=email)

        user = User(name=name, email=email)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        session['user_id'] = user.id
        return redirect(url_for('dashboard'))

    return render_template('register.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email    = request.form.get('email', '').strip().lower()
        password = request.form.get('password', '')
        user     = User.query.filter_by(email=email).first()

        if not user or not user.check_password(password):
            return render_template('login.html', error='Invalid email or password')

        session['user_id'] = user.id
        return redirect(url_for('dashboard'))

    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))


@app.route('/dashboard')
@login_required
def dashboard():
    user   = current_user()
    grades = Grade.query.filter_by(student_id=user.id).order_by(Grade.recorded.desc()).all()
    avg    = sum(g.score for g in grades) / len(grades) if grades else 0
    return render_template('dashboard.html', user=user, grades=grades, average=round(avg, 1))


# ── API endpoints ──

@app.route('/api/grades', methods=['POST'])
@admin_required
def add_grade():
    data = request.json
    required = ['student_id', 'subject_id', 'score']
    for field in required:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    if not (0 <= int(data['score']) <= 100):
        return jsonify({"error": "Score must be 0-100"}), 400

    grade = Grade(
        student_id=data['student_id'],
        subject_id=data['subject_id'],
        score=int(data['score']),
        semester=data.get('semester', '2024-1')
    )
    db.session.add(grade)
    db.session.commit()
    return jsonify({"message": "Grade recorded", "id": grade.id}), 201


@app.route('/api/students')
@admin_required
def api_students():
    students = User.query.filter_by(role='student').all()
    return jsonify({
        "students": [{"id": s.id, "name": s.name, "email": s.email} for s in students]
    })


# ── Initialise ──

with app.app_context():
    db.create_all()

    # Seed subjects if empty
    if not Subject.query.first():
        subjects = [
            Subject(name="Introduction to Programming", code="CS101"),
            Subject(name="Data Structures",             code="CS201"),
            Subject(name="Web Development",             code="CS301"),
        ]
        db.session.bulk_save_objects(subjects)
        db.session.commit()


if __name__ == '__main__':
    app.run(debug=True)
'''

# ── Display structure ──
print("=" * 55)
print("  STUDENT PORTAL — Project 3 Structure")
print("=" * 55)

print("""
student_portal/
├── app.py                  (main Flask application)
├── requirements.txt        (dependencies)
├── Procfile               (for deployment)
├── static/
│   └── style.css
└── templates/
    ├── base.html           (shared layout)
    ├── home.html
    ├── register.html
    ├── login.html
    └── dashboard.html
""")

print("requirements.txt:")
print("""
flask
flask-sqlalchemy
werkzeug
gunicorn
""")

print("Procfile (for Render deployment):")
print("web: gunicorn app:app\\n")

print("Key security features:")
features = [
    "Passwords hashed with werkzeug — never stored plain",
    "Session-based auth — user_id stored server-side",
    "login_required decorator protects all private routes",
    "admin_required decorator protects admin endpoints",
    "Input validation on all form submissions",
    "Parameterised SQLAlchemy queries — no SQL injection",
    "SECRET_KEY from environment variable in production",
]
for f in features:
    print(f"  ✅ {f}")

print("\\nTo run locally:")
print("  pip install flask flask-sqlalchemy werkzeug")
print("  python app.py")
print("  Visit http://localhost:5000")

print("\\nTo deploy to Render:")
print("  1. Push to GitHub")
print("  2. New Web Service on render.com")
print("  3. Set SECRET_KEY environment variable")
print("  4. Deploy — your app is live!")`,
        quiz: [
          { q: "Why hash passwords instead of storing them plain?", options: ["It makes them shorter", "If the database is breached, passwords cannot be recovered", "It is faster to compare", "It is required by Flask"], answer: 1 },
          { q: "What does the login_required decorator do?", options: ["Logs the user in automatically", "Redirects unauthenticated users to the login page", "Validates the login form", "Creates a session"], answer: 1 },
          { q: "What command runs a Flask app in production?", options: ["flask run", "python app.py", "gunicorn app:app", "npm start"], answer: 2 },
          { q: "Where should SECRET_KEY be stored in production?", options: ["In the code file", "In a comment", "In an environment variable", "In the database"], answer: 2 },
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

  console.log("🎉 Python lessons 19-30 seeded!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });