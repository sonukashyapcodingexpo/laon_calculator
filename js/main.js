(function () {
  "use strict";

  var PHONE = "9031565062";
  var WA = "919031565062";
  var EMAIL = "wasimrocks9031@gmail.com";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }
  var backdrop = document.querySelector(".nav-backdrop");
  if (backdrop) backdrop.addEventListener("click", closeNav);
  var closer = document.querySelector(".nav-close");
  if (closer) closer.addEventListener("click", closeNav);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  var subToggle = document.querySelector(".sub-toggle");
  var subMenu = document.querySelector(".has-sub");
  if (subToggle && subMenu) {
    subToggle.addEventListener("click", function () {
      if (!window.matchMedia("(max-width: 980px)").matches) return;
      var open = subMenu.classList.toggle("is-open");
      subToggle.setAttribute("aria-expanded", String(open));
    });
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
  }

  var DOCS = {
    personal: {
      title: "Personal loan papers",
      groups: [
        ["For everyone", ["PAN card", "Aadhaar card", "A recent photograph", "Cancelled cheque or bank proof"]],
        ["If you are salaried", ["Salary slips for the last 3 months", "Salary account statement for the last 6 months", "Form 16 or employer ID, if asked"]],
        ["If you are self-employed", ["Income tax returns, usually 2 years", "Bank statement for the last 6 to 12 months", "GST, shop proof, or Udyam certificate if you have one"]]
      ]
    },
    business: {
      title: "Business loan papers",
      groups: [
        ["Identity", ["PAN card of the applicant and the business, as applicable", "Aadhaar card", "Partnership deed, GST, shop act, or Udyam proof"]],
        ["Money in the business", ["Bank statements for about 12 months", "Income tax returns, usually 2 or 3 years", "GST returns if the business is registered"]],
        ["If a lender asks for security", ["Property papers, only when the loan is secured", "A list of what the money will be used for"]]
      ]
    },
    lap: {
      title: "Loan against property papers",
      groups: [
        ["Property", ["Title papers and the chain of ownership", "Latest property tax or municipal receipt, if available", "Approved plan where the property has one"]],
        ["Income", ["Salary slips or income tax returns", "Bank statements for 6 to 12 months", "Existing loan statements, if any"]],
        ["Identity", ["PAN and Aadhaar of all owners who will sign", "Photographs"]]
      ]
    },
    home: {
      title: "Home loan papers",
      groups: [
        ["Property", ["Agreement to sell, allotment letter, or construction estimate", "Title papers of the property", "Receipt of the payment you have already made, if any"]],
        ["Income", ["Salary slips or income tax returns", "Bank statements for 6 months", "Form 16 for salaried applicants"]],
        ["Identity", ["PAN and Aadhaar", "Photographs", "Details of any home loan you want to transfer"]]
      ]
    },
    ecommerce: {
      title: "E-commerce loan papers",
      groups: [
        ["Seller account", ["Marketplace settlement or payout statements", "GST returns if you are registered", "A note of the stock or ads the loan is for"]],
        ["Banking", ["Bank statements showing marketplace credits", "Income tax returns if filed", "Cancelled cheque"]],
        ["Identity", ["PAN and Aadhaar", "Business proof", "Photograph"]]
      ]
    },
    car: {
      title: "Car loan papers",
      groups: [
        ["The car", ["Proforma invoice for a new car", "For a used car: RC, insurance, and seller details", "Your own contribution or down-payment plan"]],
        ["Income", ["Salary slips or income tax returns", "Bank statements for 6 months"]],
        ["Identity", ["PAN and Aadhaar", "Driving licence if the lender asks", "Photograph"]]
      ]
    }
  };

  function storage() {
    try {
      return JSON.parse(localStorage.getItem("prime-solution-docs") || "{}");
    } catch (error) {
      return {};
    }
  }

  function saveStorage(data) {
    localStorage.setItem("prime-solution-docs", JSON.stringify(data));
  }

  function slug(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function renderDocs(host) {
    var key = host.getAttribute("data-docs");
    if (!DOCS[key]) key = "personal";
    var pack = DOCS[key];
    var saved = storage();
    var switcher = host.getAttribute("data-docs-switch") === "true";
    host.innerHTML = "";

    if (switcher) {
      var bar = document.createElement("div");
      bar.className = "switcher";
      var label = document.createElement("label");
      label.setAttribute("for", "doc-switch");
      label.textContent = "Papers for";
      var select = document.createElement("select");
      select.id = "doc-switch";
      select.innerHTML = Object.keys(DOCS).map(function (id) {
        return "<option value='" + id + "'>" + DOCS[id].title + "</option>";
      }).join("");
      select.value = key;
      select.addEventListener("change", function () {
        host.setAttribute("data-docs", select.value);
        renderDocs(host);
      });
      bar.appendChild(label);
      bar.appendChild(select);
      host.appendChild(bar);
    }

    var head = document.createElement("div");
    head.className = "switcher";
    var count = document.createElement("p");
    count.className = "check-count";
    var clear = document.createElement("button");
    clear.type = "button";
    clear.className = "btn btn-ghost btn-small";
    clear.textContent = "Clear ticks";
    clear.addEventListener("click", function () {
      var data = storage();
      Object.keys(data).forEach(function (id) {
        if (id.indexOf(key + ":") === 0) delete data[id];
      });
      saveStorage(data);
      renderDocs(host);
    });
    head.appendChild(count);
    head.appendChild(clear);
    host.appendChild(head);

    var boxes = [];
    pack.groups.forEach(function (group) {
      var section = document.createElement("section");
      section.className = "doc-group";
      var title = document.createElement("h3");
      title.textContent = group[0];
      var list = document.createElement("ul");
      list.className = "doc-list";
      group[1].forEach(function (item) {
        var id = key + ":" + slug(item);
        var li = document.createElement("li");
        var itemLabel = document.createElement("label");
        var input = document.createElement("input");
        input.type = "checkbox";
        input.checked = Boolean(saved[id]);
        input.addEventListener("change", function () {
          var data = storage();
          data[id] = input.checked;
          saveStorage(data);
          updateCount();
        });
        var text = document.createElement("span");
        text.textContent = item;
        itemLabel.appendChild(input);
        itemLabel.appendChild(text);
        li.appendChild(itemLabel);
        list.appendChild(li);
        boxes.push(input);
      });
      section.appendChild(title);
      section.appendChild(list);
      host.appendChild(section);
    });

    var note = document.createElement("p");
    note.className = "hint";
    note.textContent = "Ticks stay in this browser only, so you can see what is still missing before you visit. A lender may ask for a paper that is not on this list.";
    host.appendChild(note);
    updateCount();

    function updateCount() {
      var done = boxes.filter(function (box) { return box.checked; }).length;
      count.textContent = done + " of " + boxes.length + " ticked";
    }
  }

  function mountEligibility(form) {
    var result = form.querySelector("[data-elig-result]");
    var fields = ["loan", "employment", "income", "emi", "age"];
    fields.forEach(function (name) {
      if (form.elements[name]) form.elements[name].addEventListener("input", paint);
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      paint();
    });
    paint();

    function paint() {
      var loan = form.elements.loan.value;
      var product = window.PrimeCalc.PRODUCTS[loan];
      var income = Number(form.elements.income.value);
      var existing = Number(form.elements.emi.value) || 0;
      var ageValue = form.elements.age.value;
      var age = ageValue === "" ? null : Number(ageValue);
      if (!income) {
        result.className = "elig-result is-empty";
        result.innerHTML = "<p>Enter monthly income to see an indicative figure. Nothing here checks your credit score.</p>";
        return;
      }
      var foir = form.elements.employment.value === "salaried" ? product.foir : Math.max(0.3, product.foir - 0.05);
      var room = income * foir - existing;
      var ageNote = "";
      if (age !== null && (age < 21 || age > 65)) {
        ageNote = " Age is outside the band many lenders prefer, about 21 to 65. Ask which product can still be considered.";
      }
      if (room <= 0) {
        result.className = "elig-result is-tight";
        result.innerHTML = "<p>The EMIs already entered use up a cautious share of this income. That is not an automatic no. A co-applicant, a longer tenure, or a secured loan can change the numbers. Bring the figures to the office." + ageNote + "</p>";
        return;
      }
      var amount = window.PrimeCalc.principalFromEmi(room, product.rate, product.months);
      amount = Math.min(amount, product.max);
      result.className = "elig-result";
      result.innerHTML = "<span>Indicative loan amount</span><strong>" + window.PrimeCalc.formatINR(amount) + "</strong><p>Room for a new EMI is about " + window.PrimeCalc.formatINR(room) + " a month. This uses " + Math.round(foir * 100) + "% of income, minus EMIs you already pay, at a sample rate of " + window.PrimeCalc.formatRate(product.rate) + " for " + window.PrimeCalc.formatTenure(product.months) + ". A lender will also look at credit history, documents, and, where the loan is secured, the property or vehicle." + ageNote + "</p>";
    }
  }

  function mountEnquiry(form) {
    var params = new URLSearchParams(window.location.search);
    ["loan", "amount", "months", "rate"].forEach(function (key) {
      if (form.elements[key] && params.get(key)) form.elements[key].value = params.get(key);
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (form.elements.company_website && form.elements.company_website.value) return;
      clearErrors(form);
      if (!validate(form)) return;
      var data = new FormData(form);
      var text = message(data);
      var wa = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
      var mail = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Loan enquiry for Prime Solution") + "&body=" + encodeURIComponent(text);
      var box = form.querySelector("[data-success]");
      box.hidden = false;
      box.querySelector("[data-wa]").href = wa;
      box.querySelector("[data-mail]").href = mail;
      var popup = window.open(wa, "_blank", "noopener");
      box.querySelector("[data-popup]").hidden = Boolean(popup);
      box.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function validate(form) {
    var ok = true;
    var name = form.elements.name;
    if (!name.value.trim() || name.value.trim().length < 2) {
      fail(name, "Enter your name.");
      ok = false;
    }
    var phone = form.elements.phone;
    var digits = phone.value.replace(/\D/g, "");
    if (digits.length === 12 && digits.indexOf("91") === 0) digits = digits.slice(2);
    if (digits.length === 11 && digits.indexOf("0") === 0) digits = digits.slice(1);
    if (!/^[6-9]\d{9}$/.test(digits)) {
      fail(phone, "Enter a 10-digit mobile number.");
      ok = false;
    } else {
      phone.value = digits;
    }
    var email = form.elements.email;
    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      fail(email, "Enter a valid email, or leave it blank.");
      ok = false;
    }
    var loan = form.elements.loan;
    if (loan && !loan.value) {
      fail(loan, "Choose a loan.");
      ok = false;
    }
    var consent = form.elements.consent;
    if (!consent.checked) {
      fail(consent, "Please confirm we can reply on this number.");
      ok = false;
    }
    if (!ok) {
      var first = form.querySelector("[aria-invalid='true']");
      if (first) first.focus();
    }
    return ok;
  }

  function fail(field, text) {
    field.setAttribute("aria-invalid", "true");
    var holder = field.closest(".field") || field.parentElement;
    var note = holder.querySelector(".field-error");
    if (!note) {
      note = document.createElement("p");
      note.className = "field-error";
      holder.appendChild(note);
    }
    note.hidden = false;
    note.textContent = text;
  }

  function clearErrors(form) {
    form.querySelectorAll("[aria-invalid]").forEach(function (field) {
      field.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field-error").forEach(function (note) {
      note.hidden = true;
      note.textContent = "";
    });
  }

  function message(data) {
    var labels = {
      personal: "Personal loan",
      business: "Business loan",
      lap: "Loan against property",
      home: "Home loan",
      ecommerce: "E-commerce loan",
      car: "Car loan",
      notsure: "Not sure yet"
    };
    var lines = [
      "Hello Prime Solution,",
      "I would like to enquire about a loan.",
      "",
      "Name: " + value(data, "name"),
      "Mobile: " + value(data, "phone"),
      "Email: " + (value(data, "email") || "—"),
      "City: " + (value(data, "city") || "Gaya"),
      "Loan: " + (labels[value(data, "loan")] || value(data, "loan")),
      "Amount: " + (value(data, "amount") ? "Rs " + value(data, "amount") : "—"),
      "Tenure in months: " + (value(data, "months") || "—")
    ];
    if (value(data, "rate")) lines.push("Rate used in the calculator: " + value(data, "rate") + "% p.a. (estimate only)");
    if (value(data, "employment")) lines.push("Work: " + value(data, "employment"));
    if (value(data, "income")) lines.push("Monthly income: Rs " + value(data, "income"));
    if (value(data, "message")) lines.push("", value(data, "message"));
    lines.push("", "Sent from the Prime Solution website.");
    return lines.join("\n");
  }

  function value(data, key) {
    return String(data.get(key) || "").trim();
  }

  document.querySelectorAll("[data-calculator]").forEach(function (node) {
    window.PrimeCalc.mount(node);
  });
  document.querySelectorAll("[data-docs]").forEach(renderDocs);
  var eligibility = document.querySelector("[data-eligibility]");
  if (eligibility) mountEligibility(eligibility);
  document.querySelectorAll("[data-enquiry]").forEach(mountEnquiry);
})();
