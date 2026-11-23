import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const WA = "https://wa.me/919031565062?text=" + encodeURIComponent("Hello Prime Solution, I want to enquire about a loan.");
const TEL = "tel:+919031565062";
const MAIL = "mailto:wasimrocks9031@gmail.com";

const loans = [
  ["personal", "personal-loan.html", "Personal loan", "Family expenses, without security"],
  ["business", "business-loan.html", "Business loan", "Stock, machinery, working capital"],
  ["lap", "lap-loan.html", "Loan against property", "A larger loan on a house or shop"],
  ["housing", "home-loan.html", "Home loan", "Buy, build, or transfer"],
  ["ecommerce", "ecommerce-loan.html", "E-commerce loan", "Inventory and ads for sellers"],
  ["car", "car-loan.html", "Car loan", "New and used cars"]
];

function header(active) {
  const loanOn = loans.some(([id]) => id === active);
  const link = (id, href, label) =>
    `<a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}</a>`;
  const menu = loans
    .map(([id, href, label, note]) => `<a href="${href}"${active === id ? ' aria-current="page"' : ""}>${label}<small>${note}</small></a>`)
    .join("");
  return `<a class="skip" href="#content">Skip to content</a>
<header class="site-header">
  <div class="topbar">
    <div class="wrap topbar-inner">
      <p>Katari Hill Road, Gaya, Bihar 823001</p>
      <p><a href="${TEL}">9031565062</a> · <a href="${MAIL}">wasimrocks9031@gmail.com</a></p>
    </div>
  </div>
  <div class="wrap nav-row">
    <a class="brand" href="index.html"><img src="assets/logo.jpg" width="1024" height="682" alt=""><span class="brand-name">Prime <em>Solution</em><small>Your Growth Our Mission</small></span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
    <nav id="site-nav" class="nav">
      <button class="nav-close" type="button">Close</button>
      ${link("home", "index.html", "Home")}
      <div class="has-sub">
        <button class="sub-toggle${loanOn ? " is-current" : ""}" type="button" aria-expanded="false" aria-haspopup="true">Loans</button>
        <div class="sub-panel"><div class="sub-panel-inner">${menu}</div></div>
      </div>
      ${link("calculator", "calculator.html", "Calculator")}
      ${link("about", "about.html", "About")}
      ${link("contact", "contact.html", "Contact")}
      <a class="btn btn-gold btn-small" href="apply.html"${active === "apply" ? ' aria-current="page"' : ""}>Enquire</a>
    </nav>
  </div>
</header>
<div class="nav-backdrop"></div>`;
}

function footer() {
  const loanLinks = loans.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("");
  return `<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="footer-logo" href="index.html"><img src="assets/logo.jpg" width="1024" height="682" alt="Prime Solution"></a>
      <p>Your Growth Our Mission. Loan, finance, and a straight answer from Katari Hill Road, Gaya.</p>
      <p><a href="${TEL}">9031565062</a><br><a href="${MAIL}">wasimrocks9031@gmail.com</a></p>
    </div>
    <div>
      <h2>Loans</h2>
      <ul>${loanLinks}</ul>
    </div>
    <div>
      <h2>Office</h2>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="calculator.html">EMI calculator</a></li>
        <li><a href="apply.html">Enquiry</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="grievance.html">Grievance</a></li>
      </ul>
    </div>
    <div>
      <h2>Legal</h2>
      <ul>
        <li><a href="privacy.html">Privacy</a></li>
        <li><a href="terms.html">Terms</a></li>
        <li><a href="disclosure.html">Disclosure</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-base">
    <p>© 2026 Prime Solution, Katari Hill Road, Gaya, Bihar 823001. Prime Solution helps you compare options and prepare an application. Sanction, interest, fees, and disbursal are decided by the bank, housing finance company, or NBFC. Figures on this website are estimates, not a loan offer.</p>
    <p>Photographs: Unsplash.</p>
  </div>
</footer>
<a class="wa-float" href="${WA}" aria-label="WhatsApp Prime Solution on 9031565062">
  <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path fill="#fff" d="M16 4C9.4 4 4 9.4 4 16c0 2.1.6 4.1 1.6 5.9L4 28l6.3-1.6A12 12 0 0 0 16 28c6.6 0 12-5.4 12-12S22.6 4 16 4zm6.7 16.4c-.3.8-1.6 1.5-2.2 1.6-.6.1-1.3.1-2.1-.1-.5-.2-1.1-.4-1.9-.7-3.3-1.4-5.5-4.8-5.6-5-.2-.2-1.3-1.8-1.3-3.4s.8-2.4 1.1-2.8c.3-.3.7-.4 1.1-.4h.8c.3 0 .6 0 .9.7.3.8 1.1 2.8 1.2 3 .1.2.2.5 0 .7-.1.3-.2.4-.4.7-.2.2-.4.5-.5.7-.2.2-.4.4-.2.7.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.2.8-.1.2-.2.9-1.1 1.2-1.5.3-.4.5-.3.8-.2.4.1 2.2 1 2.5 1.2.4.2.6.3.7.4.1.2.1.9-.2 1.7z"/></svg>
</a>
<nav class="dock" aria-label="Quick contact">
  <a href="${TEL}">Call</a>
  <a href="${WA}">WhatsApp</a>
  <a href="calculator.html">EMI</a>
</nav>
<script src="js/calc.js"></script>
<script src="js/main.js"></script>`;
}

function page({ file, title, description, active, body }) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#0c2f6b">
  <meta name="geo.region" content="IN-BR">
  <meta name="geo.placename" content="Gaya">
  <link rel="icon" href="assets/logo.jpg">
  <link rel="apple-touch-icon" href="assets/logo.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body data-page="${active}">
${header(active)}
<main id="content">
${body}
</main>
${footer()}
</body>
</html>
`;
  fs.writeFileSync(path.join(root, file), html);
}

function cta(text) {
  return `<section class="section bg-paper">
  <div class="wrap">
    <div class="cta-band">
      <div>
        <h2>${text}</h2>
        <p>Call or WhatsApp 9031565062. The office is on Katari Hill Road, Gaya, Bihar 823001.</p>
      </div>
      <div class="cta-actions">
        <a class="btn btn-gold" href="${WA}">WhatsApp</a>
        <a class="btn btn-ghost" href="${TEL}" style="border-color:#fff;color:#fff">Call</a>
      </div>
    </div>
  </div>
</section>`;
}

const icons = {
  personal: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19"/></svg>',
  business: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10h16v9H4zM8 10V7h8v3M10 14h4"/></svg>',
  lap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 5l8 6M6 10.5V19h12v-8.5M10 19v-5h4v5"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 4l8 7M7 10.5V19h10v-8.5"/></svg>',
  ecommerce: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h16v11H4zM4 12h16M8 8V6h8v2"/></svg>',
  car: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 16h14v3H5zM6 16l2-5h8l2 5"/><circle cx="8" cy="19" r="1.2"/><circle cx="16" cy="19" r="1.2"/></svg>'
};

const products = [
  ["personal", "personal-loan.html", "Personal loan", "A hospital bill, a wedding, fees, or a repair that should not wait for the next few salaries.", "₹50,000 – ₹40 lakh", "1 – 5 years"],
  ["business", "business-loan.html", "Business loan", "Stock, a machine, or working capital for a shop or firm in and around Gaya.", "₹2 lakh – ₹2 crore", "1 – 7 years"],
  ["lap", "lap-loan.html", "Loan against property", "A larger amount at a lower rate, with a residential or commercial property as security.", "₹5 lakh – ₹5 crore", "3 – 15 years"],
  ["home", "home-loan.html", "Home loan", "Buy, build, extend, or shift an existing home loan after comparing the full cost.", "₹5 lakh – ₹5 crore", "5 – 30 years"],
  ["ecommerce", "ecommerce-loan.html", "E-commerce loan", "Inventory or advertising money for a seller who can show marketplace payouts.", "₹1 lakh – ₹50 lakh", "6 – 36 months"],
  ["car", "car-loan.html", "Car loan", "A new or used car, with the vehicle usually hypothecated until the loan ends.", "₹1 lakh – ₹50 lakh", "1 – 7 years"]
];

function formFields(full) {
  const more = full
    ? `<div class="field"><label for="amount">Amount you have in mind (₹)</label><input id="amount" name="amount" type="number" min="0" step="1000" inputmode="numeric"></div>
      <div class="field"><label for="months">Tenure in months</label><input id="months" name="months" type="number" min="1" step="1" inputmode="numeric"></div>
      <div class="field"><label for="employment">Work</label><select id="employment" name="employment"><option value="">Select</option><option>Salaried</option><option>Self-employed</option><option>Business owner</option><option>Professional</option><option>Other</option></select></div>
      <div class="field"><label for="income">Monthly income (₹)</label><input id="income" name="income" type="number" min="0" step="1000" inputmode="numeric"></div>`
    : `<input type="hidden" name="amount" value=""><input type="hidden" name="months" value="">`;
  return `<form data-enquiry novalidate>
    <div class="form-success" data-success hidden>
      <h3>Review the message, then send it.</h3>
      <p>Nothing is stored on a Prime Solution server. WhatsApp or your email app opens so you can read the message first.</p>
      <p data-popup hidden>The new tab was blocked. Use the button below.</p>
      <div class="actions">
        <a class="btn btn-green" data-wa href="${WA}" target="_blank" rel="noopener">Open WhatsApp</a>
        <a class="btn btn-ghost" data-mail href="${MAIL}">Email instead</a>
      </div>
    </div>
    <div class="form-grid">
      <div class="field"><label for="name">Full name</label><input id="name" name="name" type="text" autocomplete="name" required></div>
      <div class="field"><label for="phone">Mobile / WhatsApp</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" required></div>
      <div class="field"><label for="email">Email, if you want a copy</label><input id="email" name="email" type="email" autocomplete="email"></div>
      <div class="field"><label for="city">City</label><input id="city" name="city" type="text" value="Gaya" autocomplete="address-level2"></div>
      <div class="field"><label for="loan">Loan</label>
        <select id="loan" name="loan" required>
          <option value="">Choose a loan</option>
          <option value="personal">Personal loan</option>
          <option value="business">Business loan</option>
          <option value="lap">Loan against property</option>
          <option value="home">Home loan</option>
          <option value="ecommerce">E-commerce loan</option>
          <option value="car">Car loan</option>
          <option value="notsure">Not sure yet</option>
        </select>
      </div>
      ${more}
      <div class="field full"><label for="message">What is the loan for?</label><textarea id="message" name="message"></textarea></div>
      <input class="hp" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="rate" value="">
      <div class="field full"><label class="consent"><input type="checkbox" name="consent" value="yes"> Prime Solution may reply on this number by call or WhatsApp about this enquiry.</label></div>
      <div class="field full"><button class="btn btn-gold" type="submit">Send on WhatsApp</button></div>
    </div>
  </form>`;
}

page({
  file: "index.html",
  title: "Personal, business, home and property loans in Gaya | Prime Solution",
  description: "Prime Solution on Katari Hill Road, Gaya helps you compare personal, business, home, LAP, car and e-commerce loans and calculate the EMI before you apply.",
  active: "home",
  body: `<section class="hero">
    <div class="wrap hero-layout">
      <div class="hero-copy">
        <p class="eyebrow">Loan desk · Katari Hill Road, Gaya</p>
        <h1>We match the loan to the purpose, then get the papers ready.</h1>
        <p class="lede">Prime Solution sits with families and shop owners in Gaya. We explain personal, business, home, property, car, and e-commerce loans in plain language, and we help you apply only when the file is complete.</p>
        <p class="hindi" lang="hi">काम साफ है: सही लोन चुनना, कागज़ तैयार करना, फिर बैंक या एनबीएफसी तक ले जाना।</p>
        <ul class="work-list">
          <li><strong>Choose the product</strong><span>A home or a property you already own is not the same as a personal loan.</span></li>
          <li><strong>Name the cost</strong><span>You see the EMI and the papers before anyone asks you to sign.</span></li>
          <li><strong>Walk in or message</strong><span>Office on Katari Hill Road, or WhatsApp 9031565062.</span></li>
        </ul>
        <div class="actions hero-actions">
          <a class="btn btn-navy" href="#loans">See the six loans</a>
          <a class="btn btn-gold" href="${WA}">WhatsApp the office</a>
          <a class="btn btn-ghost" href="${TEL}">Call 9031565062</a>
        </div>
      </div>
      <figure class="hero-mark">
        <img src="assets/logo.jpg" width="1024" height="682" alt="Prime Solution. Your Growth Our Mission. Loan, Finance, Success Together.">
      </figure>
    </div>
  </section>
  <section class="section tight bg-paper" style="padding-top:28px">
    <div class="wrap facts">
      <div><strong>6</strong><span>loan types, explained separately</span></div>
      <div><strong>823001</strong><span>office on Katari Hill Road</span></div>
      <div><strong>9031565062</strong><span>call and WhatsApp, same number</span></div>
      <div><strong>EMI</strong><span>worked out before you enquire</span></div>
    </div>
  </section>
  <section class="section bg-white" id="loans">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Loans</p>
        <h2>Pick the loan that matches the purpose</h2>
        <p>A personal loan and a loan against property can both raise money. They do not cost the same, and they do not ask for the same papers.</p>
      </div>
      <div class="grid-3">
        ${products.map(([key, href, name, text, amount, tenure]) => `<article class="product-card">
          <div class="icon-badge">${icons[key]}</div>
          <h3>${name}</h3>
          <p>${text}</p>
          <dl><div><dt>Amount guide</dt><dd>${amount}</dd></div><div><dt>Tenure guide</dt><dd>${tenure}</dd></div></dl>
          <a class="text-link" href="${href}">Open ${name.toLowerCase()}</a>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section bg-paper" id="process">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">How a visit works</p>
        <h2>Four steps, none of them a promise of instant money</h2>
        <p>The lender decides the approval. Our job is to make the choice and the file clear before that happens.</p>
      </div>
      <div class="steps">
        <article class="step"><b>1</b><h3>Tell us the need</h3><p>Amount, purpose, and whether you are salaried or running a business. A sentence is enough to start.</p></article>
        <article class="step"><b>2</b><h3>See the EMI</h3><p>We use the calculator with a sample rate, or with the rate a lender has already quoted you.</p></article>
        <article class="step"><b>3</b><h3>Sort the papers</h3><p>You get a list for that product, so the second trip is not only to collect a missing PAN copy.</p></article>
        <article class="step"><b>4</b><h3>Apply if it still fits</h3><p>The application goes to a bank, housing finance company, or NBFC. Their sanction letter is the offer.</p></article>
      </div>
    </div>
  </section>
  <section class="section bg-white" id="rates">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Rate guide</p>
        <h2>Indicative bands, not a quote</h2>
        <p>Use these to see which product is in the right neighbourhood. Type a real quote into the calculator when you have one.</p>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th scope="col">Loan</th><th scope="col">Amount guide</th><th scope="col">Tenure guide</th><th scope="col">Indicative rate per year</th></tr></thead>
          <tbody>
            <tr><td>Personal loan</td><td>₹50,000 – ₹40 lakh</td><td>12 – 60 months</td><td>10.50% – 24%</td></tr>
            <tr><td>Business loan</td><td>₹2 lakh – ₹2 crore</td><td>12 – 84 months</td><td>12% – 24%</td></tr>
            <tr><td>Loan against property</td><td>₹5 lakh – ₹5 crore</td><td>3 – 15 years</td><td>9% – 16%</td></tr>
            <tr><td>Home loan</td><td>₹5 lakh – ₹5 crore</td><td>5 – 30 years</td><td>8.40% – 12.50%</td></tr>
            <tr><td>E-commerce loan</td><td>₹1 lakh – ₹50 lakh</td><td>6 – 36 months</td><td>14% – 26%</td></tr>
            <tr><td>Car loan</td><td>₹1 lakh – ₹50 lakh</td><td>12 – 84 months</td><td>8.75% – 16%</td></tr>
          </tbody>
        </table>
      </div>
      <p class="disclaimer">Bands for discussion in 2026. Your offer can sit outside them. Processing fees are extra and belong to the lender.</p>
    </div>
  </section>
  <section class="section bg-paper" id="eligibility">
    <div class="wrap layout-2">
      <div>
        <p class="eyebrow">A cautious guide</p>
        <h2>How much EMI the income can hold</h2>
        <p>This does not approve a loan and it does not look at your credit report. It only asks whether a new EMI still fits inside a careful share of monthly income.</p>
        <ul class="ticks">
          <li>Salaried estimates use a slightly higher share than self-employed ones.</li>
          <li>EMIs you already pay are subtracted first.</li>
          <li>The sample rate is the one set for that product in the calculator.</li>
        </ul>
      </div>
      <form class="tool-card" data-eligibility novalidate>
        <div class="field"><label for="elig-loan">Loan</label>
          <select id="elig-loan" name="loan">
            <option value="personal">Personal loan</option>
            <option value="business">Business loan</option>
            <option value="lap">Loan against property</option>
            <option value="home">Home loan</option>
            <option value="ecommerce">E-commerce loan</option>
            <option value="car">Car loan</option>
          </select>
        </div>
        <div class="field"><label for="elig-work">Work</label>
          <select id="elig-work" name="employment">
            <option value="salaried">Salaried</option>
            <option value="self">Self-employed or business</option>
          </select>
        </div>
        <div class="grid-2">
          <div class="field"><label for="elig-income">Monthly income (₹)</label><input id="elig-income" name="income" type="number" min="0" step="1000" inputmode="numeric"></div>
          <div class="field"><label for="elig-emi">EMIs you already pay (₹)</label><input id="elig-emi" name="emi" type="number" min="0" step="500" value="0" inputmode="numeric"></div>
        </div>
        <div class="field"><label for="elig-age">Age, optional</label><input id="elig-age" name="age" type="number" min="18" max="80" inputmode="numeric"></div>
        <button class="btn btn-navy" type="submit">Update estimate</button>
        <div class="elig-result is-empty" data-elig-result><p>Enter monthly income to see an indicative figure.</p></div>
      </form>
    </div>
  </section>
  <section class="section bg-white" id="documents">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Papers</p>
        <h2>Tick what you already have</h2>
        <p>The ticks stay in this browser, so you can see the gaps before you come to Katari Hill Road.</p>
      </div>
      <div data-docs="personal" data-docs-switch="true"></div>
    </div>
  </section>
  <section class="section bg-paper" id="calculator">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Calculator</p>
        <h2>Work out an EMI when you are ready</h2>
        <p>Use a sample rate, or the rate a lender already quoted. The figure is an estimate, not an offer. The full schedule is on the calculator page.</p>
      </div>
      <div data-calculator data-mode="compact">
        <noscript><p class="note">The calculator needs JavaScript. WhatsApp 9031565062 and we will work out the EMI with you.</p></noscript>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="wrap media-row">
      <div class="media-copy">
        <p class="eyebrow">Why the office</p>
        <h2>A desk in Gaya, not a form that pretends to approve you</h2>
        <ul class="ticks">
          <li>You can sit and ask the question you would not type into a website.</li>
          <li>Six products are in one place, so a personal loan is not suggested when a property loan would cost less.</li>
          <li>The EMI is visible before you share a document.</li>
          <li>People from nearby towns can enquire on WhatsApp and visit when the papers are ready.</li>
        </ul>
        <p><a class="text-link" href="about.html">Read how Prime Solution works</a></p>
      </div>
      <figure class="media-photo">
        <div class="photo-frame"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=900&q=70" alt="People reviewing papers together at a table" width="1200" height="900"></div>
        <figcaption class="caption">An illustration of a loan discussion, not a photograph of the Gaya office.</figcaption>
      </figure>
    </div>
  </section>
  <section class="section bg-paper" id="faq">
    <div class="wrap">
      <div class="section-head">
        <p class="eyebrow">Questions</p>
        <h2>Before you call</h2>
      </div>
      <details class="faq"><summary>Do you give the loan yourself?</summary><p>Prime Solution is a loan desk in Gaya. We help you understand the product and prepare an application. The bank, housing finance company, or NBFC decides the rate, the charges, and the approval.</p></details>
      <details class="faq"><summary>Will this website reduce my credit score?</summary><p>No. The calculator and the eligibility guide run in your browser. They do not call a credit bureau. A lender may check your credit when you actually apply.</p></details>
      <details class="faq"><summary>Which loan should I open first?</summary><p>Match it to the purpose. A home, or a property you already own, usually supports a larger amount at a lower rate. A personal loan needs no collateral, and the rate is often higher. If you are unsure, send the purpose on WhatsApp.</p></details>
      <details class="faq"><summary>What does the EMI include?</summary><p>Principal and interest only. A processing fee, insurance, or GST is extra. Those charges, if any, should be written in the lender's sanction letter.</p></details>
      <details class="faq"><summary>Do I pay Prime Solution?</summary><p>If any fee is payable by you, it is explained before you agree. Interest and processing charges on the loan itself belong to the lender. Prime Solution may receive a fee from a lender after a loan is disbursed.</p></details>
      <details class="faq"><summary>What should I never send?</summary><p>Do not send a card number, OTP, ATM PIN, or net-banking password. A genuine loan enquiry does not need them.</p></details>
    </div>
  </section>
  ${cta("Bring the amount, or just the question.")}
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Prime Solution",
    "slogan": "Your Growth Our Mission",
    "telephone": "+919031565062",
    "email": "wasimrocks9031@gmail.com",
    "image": "assets/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Katari Hill Road",
      "addressLocality": "Gaya",
      "addressRegion": "Bihar",
      "postalCode": "823001",
      "addressCountry": "IN"
    },
    "areaServed": "Gaya, Bihar"
  }
  </script>`
});

const loanPages = [
  {
    file: "personal-loan.html",
    active: "personal",
    key: "personal",
    title: "Personal loan in Gaya | Prime Solution",
    description: "Personal loan guidance in Gaya for medical bills, weddings, fees and other family expenses, with an EMI calculator and a paper list.",
    name: "Personal loan",
    tag: "Usually unsecured",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=70",
    alt: "A person working through figures on paper with a calculator",
    lede: "For a cost that belongs to the household: treatment, a wedding, college fees, travel, or a repair. You are not asked to mortgage the house for a smaller need.",
    amount: "₹50,000 – ₹40 lakh",
    tenure: "12 – 60 months",
    rate: "10.50% – 24% a year",
    story: "<p>A personal loan is borrowed on income and credit history. Because there is usually no collateral, the rate sits above a home loan or a loan against property. That can still be the right product when the amount is moderate and you want a simpler file.</p><p>Say the purpose in plain words. A lender uses it, and so do we, to check that a personal loan is cleaner than a business or property loan.</p>",
    points: ["Most lenders look for an age roughly between 21 and 60, steady income, and a credit history they can read.", "Salaried applicants are usually asked for salary slips. Self-employed applicants are usually asked for income tax returns.", "The money is not tied to a shop invoice, but the EMI still has to fit beside the EMIs you already pay.", "We do not promise same-day credit. The lender's timeline is the one that counts."],
    compare: "If you own a house and the amount is large, also open the <a href='lap-loan.html'>loan against property</a>. The EMI is often lower.",
    faqs: [
      ["Is a personal loan secured?", "Usually no. That is why the rate is often higher than a home loan or a loan against property."],
      ["Can it cover a wedding or a hospital bill?", "Yes. Those are common reasons. Name the purpose when you enquire so the file matches the need."],
      ["What decides the amount?", "The guide on this page is ₹50,000 to ₹40 lakh. The lender sets the real limit from income, existing EMIs, and credit history."]
    ]
  },
  {
    file: "business-loan.html",
    active: "business",
    key: "business",
    title: "Business loan in Gaya | Prime Solution",
    description: "Business loan guidance for shops and firms in Gaya: working capital, stock and machinery, with EMI estimates and the papers lenders usually ask for.",
    name: "Business loan",
    tag: "For the business, not the household",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=70",
    alt: "The inside of a shop, used here to illustrate a business loan",
    lede: "For stock before the season, a machine, a shop repair, or the gap between paying a supplier and getting paid yourself.",
    amount: "₹2 lakh – ₹2 crore",
    tenure: "12 – 84 months",
    rate: "12% – 24% a year",
    story: "<p>A small unsecured business limit and a larger loan backed by property are not the same product. The first is quicker to explain. The second can carry a lower rate and a bigger amount, and it takes longer because the property is checked.</p><p>GST helps when you have it. It is not the only paper a lender ever accepts. Income tax returns and a year of bank statements do a lot of the work.</p>",
    points: ["The purpose should be the business. Household spending belongs on a personal loan.", "Bring a simple note of what you will buy or pay.", "A lender may ask for GST returns, two or three years of income tax returns, and about twelve months of bank statements.", "If the shop premises are rented, say so at the start."],
    compare: "A <a href='lap-loan.html'>loan against property</a> can fund a bigger plan when an unsecured business loan is too small.",
    faqs: [
      ["I do not have GST. Can I still ask?", "Tell us what you do have. Some lenders want GST. Others start from income tax returns and bank statements. We will not point you at a product that needs a paper you cannot produce."],
      ["Can I use a business loan for a family expense?", "Use a personal loan for that. Mixing the two makes the file harder and can break the lender's purpose clause."],
      ["How fast is a decision?", "A small unsecured limit is usually faster than a loan that needs a property valuation. We will say which one matches the amount before you collect papers."]
    ]
  },
  {
    file: "lap-loan.html",
    active: "lap",
    key: "lap",
    title: "Loan against property in Gaya | Prime Solution",
    description: "Loan against property guidance in Gaya for owners who need a larger amount, with EMI estimates, title papers, and a clear note on mortgage.",
    name: "Loan against property",
    tag: "Secured on a house or shop you already own",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=70",
    alt: "A small house model with keys, illustrating a property-backed loan",
    lede: "You borrow against a residential or commercial property and, in a typical mortgage, keep using it. The loan can fund business, education, medical costs, or the closing of a more expensive loan.",
    amount: "₹5 lakh – ₹5 crore",
    tenure: "3 – 15 years",
    rate: "9% – 16% a year",
    story: "<p>This is often the cheaper way to raise a large amount, because the property is security. It is not the fastest. A lender orders a valuation and a legal check of the title. A missing link in the chain of papers stops the file, so we look at that before talking about a sanction date.</p><p>If the property is in a parent's name, that owner usually has to join the loan. Bring the ownership papers to the first conversation.</p>",
    points: ["The property should have a title the lender's lawyer can follow.", "You can usually continue to live in or use the property while it is mortgaged.", "You cannot sell it until the loan is closed or the lender agrees.", "The rate is often lower than a personal loan. The file is heavier."],
    compare: "If you are buying the house rather than borrowing on one you already own, use the <a href='home-loan.html'>home loan</a> page.",
    faqs: [
      ["Can I keep living in the house?", "In a typical loan against property, yes. The mortgage restricts a sale. It does not, by itself, ask you to move out."],
      ["What if the title is unclear?", "Fix the paper before an application. A valuation cannot repair a broken chain of ownership."],
      ["Is the whole property value given as a loan?", "No. Lenders fund a portion of the valuation, not the entire market story. The income still has to carry the EMI."]
    ]
  },
  {
    file: "home-loan.html",
    active: "housing",
    key: "home",
    title: "Home loan in Gaya | Prime Solution",
    description: "Home loan guidance in Gaya for purchase, construction, extension and balance transfer, with an EMI calculator and the papers to carry.",
    name: "Home loan",
    tag: "Purchase, construction, extension, balance transfer",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=70",
    alt: "A house exterior, illustrating a home loan",
    lede: "For the house itself: buying one, building on your land, adding a floor, or moving an existing home loan when the full cost of leaving is actually lower.",
    amount: "₹5 lakh – ₹5 crore",
    tenure: "5 – 30 years",
    rate: "8.40% – 12.50% a year",
    story: "<p>A home loan is usually the longest tenure and the lowest rate of the six products on this site. The property you are buying or building is the security. Construction loans are commonly released in stages against the progress of the work, not as one cheque on day one.</p><p>A balance transfer needs a cold comparison. Put the new EMI next to the charges for closing the old loan and any processing fee on the new one. A lower rate card is not automatically a lower cost.</p>",
    points: ["Keep the agreement, allotment letter, or construction estimate with the income papers.", "Stamp duty and registration are often outside the loan amount. Confirm that before you count the money.", "A co-applicant with income can change the eligible amount.", "Your own contribution, if the lender asks for one, should be traceable in the bank."],
    compare: "If the house is already yours and the money is for something else, the closer product is a <a href='lap-loan.html'>loan against property</a>.",
    faqs: [
      ["Can you finance the stamp duty?", "Many lenders do not. Ask before you treat registration money as part of the loan."],
      ["I am building on my own plot.", "That can be a construction loan, released in stages. Bring the land papers and a cost estimate."],
      ["Is a balance transfer always worth it?", "Only when the saving beats the cost of moving. We compare the total, not the headline rate alone."]
    ]
  },
  {
    file: "ecommerce-loan.html",
    active: "ecommerce",
    key: "ecommerce",
    title: "E-commerce loan in Gaya | Prime Solution",
    description: "E-commerce loan guidance for marketplace sellers who need inventory or advertising money, based on payouts, GST and bank credits.",
    name: "E-commerce loan",
    tag: "For sellers, on seller numbers",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=70",
    alt: "Parcels ready for dispatch, illustrating an e-commerce loan",
    lede: "For a person selling on Amazon, Flipkart, Meesho, or a similar marketplace who needs money for stock or ads before the next settlement cycle.",
    amount: "₹1 lakh – ₹50 lakh",
    tenure: "6 – 36 months",
    rate: "14% – 26% a year",
    story: "<p>This is a business facility. A lender reads marketplace settlements, returns, and the bank account that receives the payouts. A personal story about a festival does less work than the last few months of seller reports.</p><p>High returns or cancellations can reduce the amount or end the conversation. Bring the report rather than a rounded guess.</p>",
    points: ["Download settlement or payout statements before the meeting.", "GST helps when the seller account is registered.", "The tenure is usually shorter than a shop loan.", "Use the money for stock or advertising that the numbers can support."],
    compare: "If a physical shop is the real business and the marketplace is only a side channel, start with a <a href='business-loan.html'>business loan</a>.",
    faqs: [
      ["I sell on more than one app. Does that count?", "Yes. Bring payouts from each account, and the bank statements where the money lands."],
      ["Is this a personal loan for online shopping?", "No. It is for the seller's business. Shopping on EMI is a different product, from the shop or the card issuer."],
      ["What if my returns are high?", "Say so. A lender may cut the amount. Hiding the report does not improve the file."]
    ]
  },
  {
    file: "car-loan.html",
    active: "car",
    key: "car",
    title: "Car loan in Gaya | Prime Solution",
    description: "New and used car loan guidance in Gaya, with EMI comparison, down payment, and the papers for invoice or RC.",
    name: "Car loan",
    tag: "New and used cars",
    img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=70",
    alt: "A car on the road, illustrating a car loan",
    lede: "For a specific vehicle. The car is usually hypothecated to the lender until you close the loan, and a down payment is normal.",
    amount: "₹1 lakh – ₹50 lakh",
    tenure: "12 – 84 months",
    rate: "8.75% – 16% a year",
    story: "<p>A new car starts from the proforma invoice. A used car needs the registration certificate, insurance, seller details, and often a valuation. The loan amount is linked to the vehicle value, not only to your income, though the income still has to carry the EMI.</p><p>Dealership rate cards can hide a fee or a compulsory add-on. Compare the total you will pay, then decide.</p>",
    points: ["Decide the on-road price and the amount you will put in yourself.", "A personal loan can also fund a car, usually at a higher rate. Run both EMIs.", "The lender's name is commonly noted on the RC until the loan ends.", "Insurance has to stay valid. Some lenders package it. Ask what is included."],
    compare: "Put the same amount into the <a href='personal-loan.html'>personal loan</a> calculator. Keep the option with the lower total payment, after fees.",
    faqs: [
      ["Do you arrange both new and used cars?", "We help with the loan on both. The used-car file needs the RC and a value the lender will accept."],
      ["Is the full on-road price financed?", "Often you pay a margin. The exact share depends on the lender and whether the car is new or used."],
      ["Who owns the car during the loan?", "You use it. The lender usually holds a hypothecation on the registration until the last EMI."]
    ]
  }
];

for (const loan of loanPages) {
  page({
    file: loan.file,
    title: loan.title,
    description: loan.description,
    active: loan.active,
    body: `<section class="page-hero">
      <div class="wrap">
        <p class="breadcrumb"><a href="index.html">Home</a> / ${loan.name}</p>
        <div class="layout-2">
          <div>
            <p class="tag">${loan.tag}</p>
            <h1>${loan.name}</h1>
            <p class="lede">${loan.lede}</p>
            <div class="actions">
              <a class="btn btn-gold" href="apply.html?loan=${loan.key}">Enquire about this loan</a>
              <a class="btn btn-ghost" href="calculator.html?product=${loan.key}">Open full calculator</a>
            </div>
          </div>
          <figure class="photo-frame">
            <img src="${loan.img}" alt="${loan.alt}" width="1400" height="875">
          </figure>
        </div>
      </div>
    </section>
    <section class="section bg-paper">
      <div class="wrap layout-2">
        <div>
          <h2>When this loan fits</h2>
          ${loan.story}
          <h2>A sensible range</h2>
          <div class="table-wrap">
            <table>
              <tbody>
                <tr><th scope="row">Amount guide</th><td>${loan.amount}</td></tr>
                <tr><th scope="row">Tenure guide</th><td>${loan.tenure}</td></tr>
                <tr><th scope="row">Indicative rate</th><td>${loan.rate}</td></tr>
              </tbody>
            </table>
          </div>
          <p class="disclaimer">These bands are for a conversation. They are not a quote. A lender can offer a rate outside them.</p>
          <h2>Before you apply</h2>
          <ul class="ticks">${loan.points.map((item) => `<li>${item}</li>`).join("")}</ul>
          <p class="note"><strong>Also compare: </strong>${loan.compare}</p>
        </div>
        <div data-calculator data-mode="compact" data-product="${loan.key}" data-lock="true">
          <noscript><p class="note">Turn on JavaScript for the calculator, or WhatsApp 9031565062.</p></noscript>
        </div>
      </div>
    </section>
    <section class="section bg-white">
      <div class="wrap grid-2">
        <div>
          <h2>Papers to keep ready</h2>
          <div data-docs="${loan.key}"></div>
        </div>
        <div>
          <h2>Questions on this loan</h2>
          ${loan.faqs.map(([q, a]) => `<details class="faq"><summary>${q}</summary><p>${a}</p></details>`).join("")}
        </div>
      </div>
    </section>
    ${cta("Ask about a " + loan.name.toLowerCase() + " with the numbers you already have.")}`
  });
}

page({
  file: "calculator.html",
  title: "EMI calculator | Prime Solution, Gaya",
  description: "Calculate a reducing-balance EMI, compare two interest rates, test an extra monthly payment, and download the schedule. Prime Solution, Gaya.",
  active: "calculator",
  body: `<section class="page-hero">
    <div class="wrap">
      <p class="breadcrumb"><a href="index.html">Home</a> / EMI calculator</p>
      <h1>EMI calculator</h1>
      <p class="lede">A reducing-balance calculator. Early months contain more interest. Later months contain more principal. ₹5,00,000 at 12% a year for 60 months comes to about ₹11,122 a month before anyone adds a fee.</p>
    </div>
  </section>
  <section class="section bg-paper" style="padding-top:10px">
    <div class="wrap">
      <div data-calculator data-mode="full" data-query="true">
        <noscript><p class="note">JavaScript runs this calculator. Call 9031565062 if you would rather do it together.</p></noscript>
      </div>
      <div class="prose" style="margin-top:28px">
        <h2>How to read the result</h2>
        <p>The monthly figure is principal plus interest, rounded to the nearest rupee. The last instalment is adjusted so the balance ends at zero. A processing fee, insurance, or GST is not inside that number.</p>
        <p>Use the second rate when two lenders have quoted you. Use the extra-payment box only as a guide. Some loans allow part-payment after a lock-in, and some charge for it. The sanction letter is the rule.</p>
        <p><a class="btn btn-gold" href="apply.html">Send these numbers to the office</a></p>
      </div>
    </div>
  </section>`
});

page({
  file: "about.html",
  title: "About Prime Solution | Loan desk in Gaya",
  description: "Prime Solution is a loan and finance desk on Katari Hill Road, Gaya, Bihar 823001. Your Growth Our Mission.",
  active: "about",
  body: `<section class="page-hero">
    <div class="wrap layout-2">
      <div>
        <p class="breadcrumb"><a href="index.html">Home</a> / About</p>
        <p class="eyebrow">Your Growth Our Mission</p>
        <h1>A loan desk on Katari Hill Road.</h1>
        <p class="lede">People come to Prime Solution when a bank form is unclear, a property paper is missing one link, or a shop needs stock before the season. The work is to name the right product and the right papers.</p>
      </div>
      <img src="assets/logo.jpg" width="1024" height="682" alt="Prime Solution logo. Your Growth Our Mission. Loan, Finance, Success Together.">
    </div>
  </section>
  <section class="section bg-paper">
    <div class="wrap grid-2">
      <div>
        <h2>What we do</h2>
        <ul class="ticks">
          <li>Listen to the purpose before naming a product.</li>
          <li>Work out the EMI with you, including a second rate if you already have two quotes.</li>
          <li>List the papers for a personal, business, home, property, car, or e-commerce loan.</li>
          <li>Help you prepare an application to a bank, housing finance company, or NBFC.</li>
        </ul>
      </div>
      <div>
        <h2>What we are not</h2>
        <ul class="ticks">
          <li>We are not the lender, and this website cannot approve a loan.</li>
          <li>We do not show a fake sanction, a fake customer count, or a registration number we do not hold.</li>
          <li>We do not ask for your card number, OTP, ATM PIN, or net-banking password.</li>
          <li>A phone call that demands any of those is not from this office.</li>
        </ul>
      </div>
    </div>
  </section>
  <section class="section bg-white">
    <div class="wrap layout-2">
      <div>
        <h2>Company details</h2>
        <div class="table-wrap">
          <table>
            <tbody>
              <tr><th scope="row">Name</th><td>Prime Solution</td></tr>
              <tr><th scope="row">Line</th><td>Your Growth Our Mission</td></tr>
              <tr><th scope="row">Work</th><td>Loan and finance guidance</td></tr>
              <tr><th scope="row">Office</th><td>Katari Hill Road, Gaya, Bihar 823001</td></tr>
              <tr><th scope="row">Phone</th><td><a href="${TEL}">9031565062</a></td></tr>
              <tr><th scope="row">WhatsApp</th><td><a href="${WA}">9031565062</a></td></tr>
              <tr><th scope="row">Email</th><td><a href="${MAIL}">wasimrocks9031@gmail.com</a></td></tr>
            </tbody>
          </table>
        </div>
        <p class="disclaimer">Call or WhatsApp before you visit if you want a fixed time. Families from nearby towns can start on WhatsApp and come when the papers are ready.</p>
      </div>
      <figure>
        <div class="photo-frame"><img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=70" alt="A discussion over documents at a table" width="1400" height="933"></div>
        <figcaption class="caption">Illustration only. This is not a photograph of the office.</figcaption>
      </figure>
    </div>
  </section>
  ${cta("The useful first message is the purpose and the amount.")}`
});

page({
  file: "contact.html",
  title: "Contact Prime Solution | Katari Hill Road, Gaya",
  description: "Call, WhatsApp or email Prime Solution at Katari Hill Road, Gaya, Bihar 823001. Phone and WhatsApp 9031565062.",
  active: "contact",
  body: `<section class="page-hero">
    <div class="wrap">
      <p class="breadcrumb"><a href="index.html">Home</a> / Contact</p>
      <h1>Contact the Gaya office</h1>
      <p class="lede">Phone and WhatsApp are the same number. Use the form if you want the enquiry written out before it is sent.</p>
    </div>
  </section>
  <section class="section bg-paper" style="padding-top:12px">
    <div class="wrap grid-2">
      <div class="grid-2">
        <article class="info-card"><h3>Call</h3><p><a href="${TEL}">9031565062</a></p></article>
        <article class="info-card"><h3>WhatsApp</h3><p><a href="${WA}">9031565062</a></p></article>
        <article class="info-card"><h3>Email</h3><p><a href="${MAIL}">wasimrocks9031@gmail.com</a></p></article>
        <article class="info-card"><h3>Office</h3><p>Katari Hill Road, Gaya, Bihar 823001</p><p><a href="https://www.google.com/maps/search/?api=1&query=Katari+Hill+Road+Gaya+Bihar+823001" target="_blank" rel="noopener">Open directions</a></p></article>
      </div>
      <div class="map-frame">
        <iframe title="Map of Katari Hill Road, Gaya, Bihar 823001" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=Katari%20Hill%20Road%2C%20Gaya%2C%20Bihar%20823001&z=16&output=embed"></iframe>
      </div>
      <div class="card" style="grid-column:1 / -1">
        <h2>Send an enquiry</h2>
        ${formFields(false)}
      </div>
    </div>
  </section>`
});

page({
  file: "apply.html",
  title: "Loan enquiry | Prime Solution, Gaya",
  description: "Send a loan enquiry to Prime Solution on WhatsApp 9031565062. Personal, business, home, LAP, car and e-commerce loans.",
  active: "apply",
  body: `<section class="page-hero">
    <div class="wrap">
      <p class="breadcrumb"><a href="index.html">Home</a> / Enquiry</p>
      <h1>Tell us the loan, the amount, and the purpose.</h1>
      <p class="lede">The form opens WhatsApp so you can read every line before it is sent. If WhatsApp is inconvenient, the same text can go by email.</p>
    </div>
  </section>
  <section class="section bg-paper" style="padding-top:12px">
    <div class="wrap grid-2">
      <div class="card">
        <h2>Enquiry</h2>
        ${formFields(true)}
        <p class="hint">Do not include passwords, card numbers, or OTPs.</p>
      </div>
      <div>
        <h2>What happens next</h2>
        <ul class="ticks">
          <li>You send the message yourself from WhatsApp or email.</li>
          <li>We reply on 9031565062 or by email if you left one.</li>
          <li>If a lender is a fit, we tell you the papers for that product.</li>
          <li>Approval, rate, and fees remain the lender's decision.</li>
        </ul>
        <h2>Papers</h2>
        <div data-docs="personal" data-docs-switch="true"></div>
      </div>
    </div>
  </section>`
});

function legal(file, active, title, description, blocks) {
  const inner = blocks
    .map((block, index) => (index === 0 ? "" : "<h2>" + block.h + "</h2>") + block.p)
    .join("");
  page({
    file,
    title,
    description,
    active,
    body: `<section class="section bg-white"><div class="wrap prose"><p class="breadcrumb"><a href="index.html">Home</a> / ${title.split("|")[0].trim()}</p><h1>${blocks[0].h}</h1>${inner}</div></section>`
  });
}

legal("privacy.html", "privacy", "Privacy | Prime Solution", "How the Prime Solution website handles an enquiry. The form opens WhatsApp or email on your device.", [
  { h: "Privacy", p: "<p>This page explains what this website does with your details. It is written for the site as it works today: static pages, a calculator in your browser, and an enquiry that you send yourself.</p>" },
  { h: "What you can type", p: "<p>The enquiry form asks for your name, mobile number, and loan details, and optionally an email, city, income, and a short note. Those fields are used only to write the message.</p>" },
  { h: "Where the message goes", p: "<p>Pressing send opens WhatsApp or your email app. You can edit or cancel the message there. This website does not keep an application database and does not run a credit-bureau check.</p>" },
  { h: "What stays on your phone or computer", p: "<p>The document checklist stores ticks in this browser's local storage so you can see missing papers. Clearing the browser data removes them. The calculator does not save a profile.</p>" },
  { h: "What not to send", p: "<p>Do not send card numbers, OTPs, ATM PINs, or net-banking passwords. We do not need them to talk about a loan.</p>" },
  { h: "Other services the pages load", p: "<p>Fonts are requested from Google Fonts. Photographs are requested from Unsplash. The contact page loads a Google map of Katari Hill Road. Those providers receive the technical data a browser normally sends with a file request.</p>" },
  { h: "Talk to the office", p: "<p>For a message you already sent, call 9031565062, WhatsApp the same number, or email wasimrocks9031@gmail.com. The office is on Katari Hill Road, Gaya, Bihar 823001.</p>" }
]);

legal("terms.html", "terms", "Terms | Prime Solution", "Terms for using the Prime Solution website. Estimates are not a loan offer.", [
  { h: "Terms", p: "<p>By using this website you can read about loans and send an enquiry. That use does not create a loan agreement.</p>" },
  { h: "Not an offer", p: "<p>Rates, amounts, and tenures are indicative bands for discussion. The EMI is an estimate. A bank, housing finance company, or NBFC decides whether to lend, at what rate, and with what fees.</p>" },
  { h: "Your information", p: "<p>If you apply to a lender, the information you give must be true. Prime Solution is not responsible for an application that hides an existing loan or a document.</p>" },
  { h: "Fees", p: "<p>Interest, processing fees, and other loan charges are the lender's, and they belong in the lender's documents. If Prime Solution would charge you a fee, that fee is explained before you agree. Prime Solution may receive a fee from a lender after a loan is disbursed.</p>" },
  { h: "No promise of approval or speed", p: "<p>Nothing on this website promises that a loan will be approved, or that money will arrive in a fixed number of minutes or days.</p>" },
  { h: "The lender's agreement", p: "<p>Once a loan is sanctioned, the lender's agreement controls repayment, part-payment, foreclosure, and security. Read it before you sign.</p>" }
]);

legal("grievance.html", "grievance", "Grievance | Prime Solution", "How to raise a complaint with Prime Solution in Gaya, and when the lender's own desk must handle it.", [
  { h: "Grievance", p: "<p>If something about this office went wrong, write to wasimrocks9031@gmail.com or call 9031565062. You can also visit Katari Hill Road, Gaya, Bihar 823001.</p>" },
  { h: "What to include", p: "<p>Your name, phone number, the loan you discussed, the date, and what happened. A short message is enough. Do not include passwords or OTPs.</p>" },
  { h: "How we reply", p: "<p>We reply on the same phone number or email. This page does not promise a fixed number of hours. If you do not hear back, call the office number again and say it is a grievance.</p>" },
  { h: "When the lender has to answer", p: "<p>A rejected application, a charge on a loan account, or a change to an EMI after sanction is the lender's decision. Their grievance channel is the one that can change it. We will help you see where that complaint should go.</p>" }
]);

legal("disclosure.html", "disclosure", "Disclosure | Prime Solution", "What Prime Solution is, how the EMI is calculated, and why the rates on this site are not a sanction.", [
  { h: "Disclosure", p: "<p>Prime Solution, Katari Hill Road, Gaya, Bihar 823001, is a loan and finance desk. Phone and WhatsApp: 9031565062. Email: wasimrocks9031@gmail.com. The line under the name is Your Growth Our Mission.</p>" },
  { h: "Role", p: "<p>We explain personal, business, home, loan against property, car, and e-commerce loans, and we help prepare applications. We are not shown here as a bank or as an NBFC, and this website does not publish a registration number.</p>" },
  { h: "Calculator", p: "<p>The EMI uses a reducing balance. The monthly interest rate is the yearly rate divided by 12. The standard EMI formula is applied, the payment is rounded to the nearest rupee, and the last instalment is adjusted so the balance finishes at zero. Part-payment results are a guide, not a lender's rule.</p>" },
  { h: "Rates", p: "<p>The rate bands on the home page are broad market ranges for a conversation in 2026. They are not a sanction and not a promise that a named bank will match them.</p>" },
  { h: "Credit checks", p: "<p>Using this website does not enquire with a credit bureau. A lender may do that later, with the consent their process requires.</p>" }
]);

page({
  file: "404.html",
  title: "Page not found | Prime Solution",
  description: "This page is not on the Prime Solution website. Go back to the Gaya loan desk.",
  active: "",
  body: `<section class="page-hero"><div class="wrap"><h1>This page is not on the site.</h1><p class="lede">The calculator, the six loans, and the office number are on the home page.</p><p><a class="btn btn-gold" href="index.html">Back to Prime Solution</a></p></div></section>`
});

console.log("pages written");
