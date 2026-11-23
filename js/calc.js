(function (root) {
  "use strict";

  var PRODUCTS = {
    personal: { name: "Personal loan", min: 50000, max: 4000000, step: 10000, amount: 500000, minMonths: 12, maxMonths: 60, months: 60, minRate: 10.5, maxRate: 24, rate: 12, foir: 0.4 },
    business: { name: "Business loan", min: 200000, max: 20000000, step: 50000, amount: 1500000, minMonths: 12, maxMonths: 84, months: 36, minRate: 12, maxRate: 24, rate: 16, foir: 0.4 },
    lap: { name: "Loan against property", min: 500000, max: 50000000, step: 100000, amount: 2500000, minMonths: 36, maxMonths: 180, months: 120, minRate: 9, maxRate: 16, rate: 11, foir: 0.5 },
    home: { name: "Home loan", min: 500000, max: 50000000, step: 100000, amount: 3500000, minMonths: 60, maxMonths: 360, months: 240, minRate: 8.4, maxRate: 12.5, rate: 9.25, foir: 0.5 },
    ecommerce: { name: "E-commerce loan", min: 100000, max: 5000000, step: 25000, amount: 800000, minMonths: 6, maxMonths: 36, months: 12, minRate: 14, maxRate: 26, rate: 18, foir: 0.4 },
    car: { name: "Car loan", min: 100000, max: 5000000, step: 10000, amount: 800000, minMonths: 12, maxMonths: 84, months: 60, minRate: 8.75, maxRate: 16, rate: 10.5, foir: 0.45 }
  };

  var ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  var tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function formatINR(n) {
    var value = Math.round(Number(n) || 0);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(value);
  }

  function formatRate(n) {
    var rounded = Math.round(Number(n) * 100) / 100;
    return rounded.toLocaleString("en-IN", { maximumFractionDigits: 2 }) + "%";
  }

  function formatTenure(months) {
    var y = Math.floor(months / 12);
    var m = months % 12;
    var parts = [];
    if (y) parts.push(y + " year" + (y > 1 ? "s" : ""));
    if (m) parts.push(m + " month" + (m > 1 ? "s" : ""));
    return parts.join(" ") || "0 months";
  }

  function twoDigits(n) {
    if (n < 20) return ones[n];
    var ten = Math.floor(n / 10);
    var one = n % 10;
    return tens[ten] + (one ? " " + ones[one] : "");
  }

  function chunk(n) {
    var out = "";
    if (n > 99) {
      out += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n) out += " ";
    }
    if (n) out += twoDigits(n);
    return out;
  }

  function rupeesInWords(amount) {
    var n = Math.round(Math.abs(Number(amount) || 0));
    if (!n) return "Zero rupees";
    var crore = Math.floor(n / 10000000);
    n %= 10000000;
    var lakh = Math.floor(n / 100000);
    n %= 100000;
    var thousand = Math.floor(n / 1000);
    var rest = n % 1000;
    var parts = [];
    if (crore) parts.push(chunk(crore) + " crore");
    if (lakh) parts.push(chunk(lakh) + " lakh");
    if (thousand) parts.push(chunk(thousand) + " thousand");
    if (rest) parts.push(chunk(rest));
    var phrase = parts.join(" ") + " rupees";
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  }

  function emiAmount(principal, annual, months) {
    if (months <= 0) return 0;
    var r = annual / 12 / 100;
    if (!r) return principal / months;
    var pow = Math.pow(1 + r, months);
    return (principal * r * pow) / (pow - 1);
  }

  function principalFromEmi(emi, annual, months) {
    if (emi <= 0 || months <= 0) return 0;
    var r = annual / 12 / 100;
    if (!r) return emi * months;
    var pow = Math.pow(1 + r, months);
    return (emi * (pow - 1)) / (r * pow);
  }

  function buildSchedule(principal, annual, months, extra) {
    var balance = Math.round(principal);
    var monthlyRate = annual / 12 / 100;
    var emiRounded = Math.round(emiAmount(principal, annual, months));
    var extraPay = Math.max(0, Math.round(extra || 0));
    var limit = extraPay > 0 ? 720 : months;
    var rows = [];
    var guard = 0;
    while (balance > 0 && rows.length < limit && guard < 800) {
      guard += 1;
      var interest = Math.round(balance * monthlyRate);
      var month = rows.length + 1;
      var principalPart;
      if (extraPay <= 0 && month === months) {
        principalPart = balance;
      } else {
        principalPart = emiRounded - interest + extraPay;
        if (principalPart > balance) principalPart = balance;
        if (principalPart < 0) principalPart = 0;
      }
      balance -= principalPart;
      if (balance < 0) balance = 0;
      rows.push({
        month: month,
        emi: principalPart + interest,
        principal: principalPart,
        interest: interest,
        balance: balance
      });
    }
    var interestTotal = rows.reduce(function (sum, row) { return sum + row.interest; }, 0);
    var payTotal = rows.reduce(function (sum, row) { return sum + row.emi; }, 0);
    return { emi: emiRounded, rows: rows, interestTotal: interestTotal, payTotal: payTotal };
  }

  function yearly(rows) {
    var groups = [];
    for (var i = 0; i < rows.length; i += 12) {
      var slice = rows.slice(i, i + 12);
      groups.push({
        year: groups.length + 1,
        paid: slice.reduce(function (s, r) { return s + r.emi; }, 0),
        principal: slice.reduce(function (s, r) { return s + r.principal; }, 0),
        interest: slice.reduce(function (s, r) { return s + r.interest; }, 0),
        balance: slice[slice.length - 1].balance
      });
    }
    return groups;
  }

  function fillRange(input) {
    var min = Number(input.min);
    var max = Number(input.max);
    var pct = max === min ? 0 : ((Number(input.value) - min) / (max - min)) * 100;
    input.style.setProperty("--pct", pct + "%");
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      var area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      resolve();
    });
  }

  function downloadCsv(filename, text) {
    var blob = new Blob([text], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function mount(node) {
    if (!node) return;
    var mode = node.getAttribute("data-mode") === "full" ? "full" : "compact";
    var locked = node.getAttribute("data-lock") === "true";
    var useQuery = node.getAttribute("data-query") === "true";
    var params = useQuery ? new URLSearchParams(window.location.search) : new URLSearchParams();
    var productKey = node.getAttribute("data-product") || params.get("product") || "personal";
    if (!PRODUCTS[productKey]) productKey = "personal";

    node.innerHTML = template(mode, locked);
    var product = PRODUCTS[productKey];
    var state = {
      productKey: productKey,
      amount: clamp(numberOr(params.get("amount"), product.amount), product.min, product.max),
      months: clamp(numberOr(params.get("months"), product.months), product.minMonths, product.maxMonths),
      rate: clamp(numberOr(params.get("rate"), product.rate), product.minRate, product.maxRate),
      compare: clamp(product.rate + 2, product.minRate, product.maxRate),
      extra: 0,
      monthly: false
    };

    var productSelect = node.querySelector("[data-product-select]");
    var amountRange = node.querySelector("[data-amount-range]");
    var amountInput = node.querySelector("[data-amount-input]");
    var monthRange = node.querySelector("[data-month-range]");
    var monthInput = node.querySelector("[data-month-input]");
    var rateRange = node.querySelector("[data-rate-range]");
    var rateInput = node.querySelector("[data-rate-input]");
    var compareRange = node.querySelector("[data-compare-range]");
    var extraInput = node.querySelector("[data-extra]");
    var tableButton = node.querySelector("[data-table-toggle]");
    var tableHost = node.querySelector("[data-table]");
    var timer = 0;

    if (productSelect) {
      productSelect.innerHTML = Object.keys(PRODUCTS).map(function (key) {
        return '<option value="' + key + '">' + PRODUCTS[key].name + "</option>";
      }).join("");
      productSelect.value = productKey;
      productSelect.addEventListener("change", function () {
        productKey = productSelect.value;
        state.productKey = productKey;
        var next = PRODUCTS[productKey];
        state.amount = next.amount;
        state.months = next.months;
        state.rate = next.rate;
        state.compare = clamp(next.rate + 2, next.minRate, next.maxRate);
        render(true);
      });
    }

    amountRange.addEventListener("input", function () {
      state.amount = Number(amountRange.value);
      render(false);
    });
    amountInput.addEventListener("change", function () {
      var next = PRODUCTS[state.productKey];
      state.amount = clamp(Number(amountInput.value) || next.min, next.min, next.max);
      render(true);
    });
    monthRange.addEventListener("input", function () {
      state.months = Number(monthRange.value);
      render(false);
    });
    monthInput.addEventListener("change", function () {
      var next = PRODUCTS[state.productKey];
      state.months = clamp(Math.round(Number(monthInput.value) || next.minMonths), next.minMonths, next.maxMonths);
      render(true);
    });
    rateRange.addEventListener("input", function () {
      state.rate = Number(rateRange.value);
      render(false);
    });
    rateInput.addEventListener("change", function () {
      var next = PRODUCTS[state.productKey];
      state.rate = clamp(Number(rateInput.value) || next.minRate, next.minRate, next.maxRate);
      render(true);
    });
    if (compareRange) {
      compareRange.addEventListener("input", function () {
        state.compare = Number(compareRange.value);
        render(false);
      });
    }
    if (extraInput) {
      extraInput.addEventListener("input", function () {
        state.extra = Math.max(0, Number(extraInput.value) || 0);
        render(false);
      });
    }
    if (tableButton) {
      tableButton.addEventListener("click", function () {
        state.monthly = !state.monthly;
        render(true);
      });
    }
    var copyButton = node.querySelector("[data-copy]");
    if (copyButton) {
      copyButton.addEventListener("click", function () {
        copyText(summaryText()).then(function () {
          var old = copyButton.textContent;
          copyButton.textContent = "Copied";
          setTimeout(function () { copyButton.textContent = old; }, 1600);
        });
      });
    }
    var csvButton = node.querySelector("[data-csv]");
    if (csvButton) csvButton.addEventListener("click", function () { downloadCsv("prime-solution-emi.csv", csvText()); });
    var printButton = node.querySelector("[data-print]");
    if (printButton) printButton.addEventListener("click", function () { window.print(); });

    render(true);

    function numberOr(value, fallback) {
      if (value === null || value === undefined || value === "") return fallback;
      var n = Number(value);
      return Number.isFinite(n) ? n : fallback;
    }

    function render(rebuildTable) {
      var current = PRODUCTS[state.productKey];
      state.amount = clamp(state.amount, current.min, current.max);
      state.months = clamp(state.months, current.minMonths, current.maxMonths);
      state.rate = clamp(state.rate, current.minRate, current.maxRate);
      amountRange.min = current.min;
      amountRange.max = current.max;
      amountRange.step = current.step;
      amountRange.value = state.amount;
      amountInput.value = Math.round(state.amount);
      monthRange.min = current.minMonths;
      monthRange.max = current.maxMonths;
      monthRange.value = state.months;
      if (monthInput) monthInput.value = state.months;
      rateRange.min = current.minRate;
      rateRange.max = current.maxRate;
      rateRange.step = 0.05;
      rateRange.value = state.rate;
      rateInput.value = Math.round(state.rate * 100) / 100;
      fillRange(amountRange);
      fillRange(monthRange);
      fillRange(rateRange);
      node.querySelector("[data-amount-out]").textContent = formatINR(state.amount);
      node.querySelector("[data-month-out]").textContent = formatTenure(state.months);
      node.querySelector("[data-rate-out]").textContent = formatRate(state.rate);
      node.querySelector("[data-words]").textContent = rupeesInWords(state.amount);

      var schedule = buildSchedule(state.amount, state.rate, state.months, 0);
      node.querySelector("[data-emi]").textContent = formatINR(schedule.emi);
      node.querySelector("[data-interest]").textContent = formatINR(schedule.interestTotal);
      node.querySelector("[data-total]").textContent = formatINR(schedule.payTotal);
      var share = schedule.payTotal ? (state.amount / schedule.payTotal) * 100 : 0;
      node.querySelector("[data-bar]").style.setProperty("--p", share + "%");
      var heavy = node.querySelector("[data-heavy]");
      if (heavy) {
        heavy.hidden = !(schedule.interestTotal > state.amount);
      }
      var query = "product=" + encodeURIComponent(state.productKey) + "&amount=" + Math.round(state.amount) + "&months=" + state.months + "&rate=" + state.rate;
      var apply = node.querySelector("[data-apply]");
      if (apply) apply.href = "apply.html?loan=" + encodeURIComponent(state.productKey) + "&amount=" + Math.round(state.amount) + "&months=" + state.months + "&rate=" + state.rate;
      var full = node.querySelector("[data-full]");
      if (full) full.href = "calculator.html?" + query;
      var name = node.querySelector("[data-loan-name]");
      if (name) name.textContent = current.name;

      if (mode === "full") {
        var compareSchedule = buildSchedule(state.amount, state.compare, state.months, 0);
        compareRange.min = current.minRate;
        compareRange.max = current.maxRate;
        compareRange.value = clamp(state.compare, current.minRate, current.maxRate);
        state.compare = Number(compareRange.value);
        fillRange(compareRange);
        node.querySelector("[data-compare-out]").textContent = formatRate(state.compare);
        node.querySelector("[data-emi-b]").textContent = formatINR(compareSchedule.emi);
        var diff = compareSchedule.emi - schedule.emi;
        var diffTotal = compareSchedule.payTotal - schedule.payTotal;
        var compareText = node.querySelector("[data-compare-text]");
        if (Math.abs(diff) < 1) {
          compareText.textContent = "Both rates land on the same monthly EMI at this rounding.";
        } else if (diff > 0) {
          compareText.textContent = "The second rate costs " + formatINR(diff) + " more each month, about " + formatINR(diffTotal) + " more over the tenure.";
        } else {
          compareText.textContent = "The second rate saves " + formatINR(Math.abs(diff)) + " each month, about " + formatINR(Math.abs(diffTotal)) + " over the tenure.";
        }
        var prepaid = buildSchedule(state.amount, state.rate, state.months, state.extra);
        var prepayText = node.querySelector("[data-prepay-text]");
        if (state.extra > 0 && prepaid.rows.length) {
          var saved = schedule.interestTotal - prepaid.interestTotal;
          prepayText.textContent = "Paying " + formatINR(state.extra) + " extra each month could close the loan in " + formatTenure(prepaid.rows.length) + " instead of " + formatTenure(schedule.rows.length) + ". Interest could be about " + formatINR(Math.max(0, saved)) + " lower. A lender may have a lock-in or a part-payment fee, so check the sanction letter.";
        } else {
          prepayText.textContent = "Add an extra monthly amount to see how much sooner the loan could close.";
        }
        if (node.querySelector("[data-donut]")) drawDonut(node.querySelector("[data-donut]"), state.amount, schedule.interestTotal);
        if (rebuildTable) {
          paintTable(schedule);
        } else {
          clearTimeout(timer);
          timer = setTimeout(function () { paintTable(buildSchedule(state.amount, state.rate, state.months, 0)); }, 80);
        }
      }
    }

    function paintTable(schedule) {
      if (!tableHost) return;
      tableButton.textContent = state.monthly ? "Show yearly summary" : "Show every month";
      var rows = state.monthly ? schedule.rows : yearly(schedule.rows);
      var head = state.monthly
        ? "<tr><th scope='col'>Month</th><th scope='col'>Payment</th><th scope='col'>Principal</th><th scope='col'>Interest</th><th scope='col'>Balance</th></tr>"
        : "<tr><th scope='col'>Year</th><th scope='col'>Paid</th><th scope='col'>Principal</th><th scope='col'>Interest</th><th scope='col'>Balance</th></tr>";
      var body = rows.map(function (row) {
        if (state.monthly) {
          return "<tr><td>" + row.month + "</td><td>" + formatINR(row.emi) + "</td><td>" + formatINR(row.principal) + "</td><td>" + formatINR(row.interest) + "</td><td>" + formatINR(row.balance) + "</td></tr>";
        }
        return "<tr><td>" + row.year + "</td><td>" + formatINR(row.paid) + "</td><td>" + formatINR(row.principal) + "</td><td>" + formatINR(row.interest) + "</td><td>" + formatINR(row.balance) + "</td></tr>";
      }).join("");
      tableHost.innerHTML = "<div class='schedule-scroll'><table><thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>";
    }

    function summaryText() {
      var current = PRODUCTS[state.productKey];
      var schedule = buildSchedule(state.amount, state.rate, state.months, 0);
      return [
        "Prime Solution EMI estimate",
        "Loan: " + current.name,
        "Amount: " + formatINR(state.amount),
        "Tenure: " + formatTenure(state.months),
        "Interest: " + formatRate(state.rate) + " p.a.",
        "EMI: " + formatINR(schedule.emi),
        "Total interest: " + formatINR(schedule.interestTotal),
        "Total payment: " + formatINR(schedule.payTotal),
        "This is an estimate, not a loan offer.",
        "Prime Solution, Katari Hill Road, Gaya, Bihar 823001",
        "9031565062"
      ].join("\n");
    }

    function csvText() {
      var schedule = buildSchedule(state.amount, state.rate, state.months, 0);
      var lines = [
        "Prime Solution EMI estimate",
        "Loan," + PRODUCTS[state.productKey].name,
        "Amount," + Math.round(state.amount),
        "Months," + state.months,
        "Annual rate percent," + state.rate,
        "EMI," + schedule.emi,
        "Month,Payment,Principal,Interest,Balance"
      ];
      schedule.rows.forEach(function (row) {
        lines.push([row.month, row.emi, row.principal, row.interest, row.balance].join(","));
      });
      return lines.join("\n");
    }
  }

  function drawDonut(canvas, principal, interest) {
    var dpr = window.devicePixelRatio || 1;
    var size = 132;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    var total = principal + interest || 1;
    var start = -Math.PI / 2;
    var sweep = (principal / total) * Math.PI * 2;
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.strokeStyle = "#0c2f6b";
    ctx.arc(66, 66, 50, start, start + sweep);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "#e3a31a";
    ctx.arc(66, 66, 50, start + sweep, start + Math.PI * 2);
    ctx.stroke();
  }

  function template(mode, locked) {
    var uid = "c" + (seed += 1);
    function fid(name) { return uid + "-" + name; }
    var productField = locked
      ? "<p class='calc-kicker'>Estimate for</p><p data-loan-name style='font-weight:800;color:#0c2f6b;margin-top:0'></p>"
      : "<div class='control'><label for='" + fid("product") + "'>Loan</label><select id='" + fid("product") + "' data-product-select></select></div>";
    var fullBits = "";
    if (mode === "full") {
      fullBits = "<div class='calc-extra'><div class='grid-2'><section><h3>Same loan, two rates</h3><p class='hint'>Use this when two lenders have quoted you. The amount and tenure stay the same.</p><div class='control'><div class='control-top'><label for='" + fid("compare") + "'>Second rate</label><output data-compare-out></output></div><input id='" + fid("compare") + "' data-compare-range type='range' min='8' max='24' step='0.05'></div><p><strong data-emi-b></strong> a month</p><p data-compare-text></p></section><section><h3>If you pay extra each month</h3><p class='hint'>A simple part-payment test. It is not a lender's rule.</p><div class='field'><label for='" + fid("extra") + "'>Extra principal each month</label><input id='" + fid("extra") + "' data-extra type='number' min='0' step='500' value='0' inputmode='numeric'></div><p data-prepay-text></p></section></div><div class='actions no-print' style='margin:16px 0'><button class='btn btn-ghost btn-small' type='button' data-table-toggle>Show every month</button><button class='btn btn-ghost btn-small' type='button' data-csv>Download schedule</button><button class='btn btn-ghost btn-small' type='button' data-print>Print</button></div><div data-table></div></div>";
    }
    return "<div class='calc-card" + (mode === "full" ? " is-full" : "") + "'><div class='print-only'><h2>Prime Solution EMI estimate</h2><p>Katari Hill Road, Gaya, Bihar 823001 · 9031565062</p></div><div class='calc-form'><p class='calc-kicker'>EMI calculator</p><h2 style='font-size:1.55rem'>Work out the monthly payment</h2>" + productField +
      "<div class='control'><div class='control-top'><label for='" + fid("amount") + "'>Loan amount</label><output id='" + fid("amount-out") + "' data-amount-out></output></div><input id='" + fid("amount") + "' data-amount-range type='range' autocomplete='off'><div class='control-row'><input class='inline-input' data-amount-input type='number' inputmode='numeric' autocomplete='off' aria-label='Loan amount in rupees'><p class='words' data-words></p></div></div>" +
      "<div class='control'><div class='control-top'><label for='" + fid("months") + "'>Tenure</label><output data-month-out></output></div><input id='" + fid("months") + "' data-month-range type='range' step='1'><div class='control-row'><input class='inline-input' data-month-input type='number' min='1' step='1' inputmode='numeric' aria-label='Tenure in months'></div></div>" +
      "<div class='control'><div class='control-top'><label for='" + fid("rate") + "'>Interest rate per year</label><output data-rate-out></output></div><input id='" + fid("rate") + "' data-rate-range type='range'><div class='control-row'><input class='inline-input' data-rate-input type='number' min='0' step='0.05' inputmode='decimal' autocomplete='off' aria-label='Interest rate percent per year'></div><p class='hint'>If a lender has already quoted a rate, type that. Otherwise this is only a sample.</p></div></div>" +
      "<div class='calc-result'><p class='calc-kicker'>Monthly EMI</p><p class='emi-value' aria-live='polite'><span data-emi></span><span class='unit'>/ month</span></p><div class='result-grid'><div><span>Total interest</span><strong data-interest></strong></div><div><span>Total payment</span><strong data-total></strong></div></div><div class='bar' data-bar aria-hidden='true'><span class='bar-p'></span></div><p class='legend'><span><i class='swatch navy'></i>Principal</span><span><i class='swatch gold'></i>Interest</span></p>" +
      (mode === "full" ? "<div class='donut-wrap'><canvas data-donut width='132' height='132' aria-hidden='true'></canvas><p class='hint'>Navy is the amount borrowed. Gold is the interest over the full tenure.</p></div>" : "") +
      "<p class='warn' data-heavy hidden>Interest over the full tenure is higher than the amount borrowed. A shorter tenure, a lower rate, or a secured loan can change that.</p><div class='actions no-print'><a class='btn btn-gold' data-apply href='apply.html'>Enquire with this EMI</a>" +
      (mode === "full" ? "" : "<a class='btn btn-ghost' data-full href='calculator.html'>Full schedule</a>") +
      "<button class='btn btn-ghost' type='button' data-copy>Copy result</button></div><p class='hint'>Processing fee, insurance, and GST are not included. The bank or NBFC decides the real rate and whether the loan is approved.</p></div>" + fullBits + "</div>";
  }

  var seed = 0;

  root.PrimeCalc = {
    PRODUCTS: PRODUCTS,
    formatINR: formatINR,
    formatTenure: formatTenure,
    formatRate: formatRate,
    emiAmount: emiAmount,
    principalFromEmi: principalFromEmi,
    buildSchedule: buildSchedule,
    rupeesInWords: rupeesInWords,
    mount: mount
  };
})(typeof window !== "undefined" ? window : globalThis);
