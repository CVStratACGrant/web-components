import { RATES, FISCAL_YEARS } from "./const.js";

/* ===============================
   Web Component
================================ */
class BillEstimator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Component state
    this.lastCalculatedResults = {};
    this.activeYear = FISCAL_YEARS[0];
    this.currentResult = null;
    this.currentMultiFamilyUnits = 1;
  }

  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  /* ===============================
     Render HTML + Styles
  ================================ */
  render() {
    this.shadowRoot.innerHTML = `
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>

      <style>
        :host {
          font-family: Inter, sans-serif;
          display: block;
        }

        :root {
          --dark-text-color: #183e63;
          --primary-color: #183e63;
        }

        .card {
          box-shadow: 0 10px 15px -3px rgba(0,0,0,.1);
          border: 1px solid #E5E7EB;
        }

        .input-style {
          padding: .75rem;
          border: 1px solid #D1D5DB;
          border-radius: .375rem;
        }

        .tab {
          padding: .5rem .75rem;
          cursor: pointer;
          font-weight: 600;
          border: 1px solid #E5E7EB;
        }

        .tab.active {
          background: #f0f6ff;
          color: var(--dark-text-color);
        }

        .status-positive { color: #10B981; }
        .status-negative { color: #EF4444; }
      </style>

      <div class="space-y-8 p-4">
        <div class="card bg-white p-6 rounded-xl">
          <h2 class="text-xl font-bold mb-4">Input Parameters</h2>

          <label class="block mb-1">Customer Class</label>
          <select id="customerClass" class="input-style w-full">
            <option>Single Family</option>
            <option>Multi-Family</option>
            <option>Non-Residential</option>
          </select>

          <div id="multiFamilyUnitsDiv" class="hidden mt-4">
            <label class="block mb-1">Number of Dwelling Units</label>
            <input id="multiFamilyUnits" type="number" min="2" value="2" class="input-style w-full">
          </div>

          <label class="block mt-4 mb-1">Meter Size</label>
          <select id="meterSize" class="input-style w-full">
            <option>5/8" X 3/4"</option>
            <option>3/4"</option>
            <option>1"</option>
          </select>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label>Potable Usage (ccf)</label>
              <input id="potableUsage" type="number" value="20" class="input-style w-full">
            </div>
            <div>
              <label>Recycled Usage (ccf)</label>
              <input id="recycledUsage" type="number" value="0" class="input-style w-full">
            </div>
          </div>

          <div class="mt-4">
            <label class="flex items-center gap-2">
              <input id="fireLine" type="checkbox"> Fire Line
            </label>
            <label class="flex items-center gap-2 mt-2">
              <input id="fogCharge" type="checkbox"> FOG Charge
            </label>
          </div>

          <button id="calculateButton"
            class="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold">
            Calculate Bill Estimate
          </button>
        </div>

        <div>
          <div id="yearTabs" class="flex gap-2 mb-2"></div>
          <div class="card bg-white p-6 rounded-xl">
            <div id="inputSummary"></div>
            <div id="detailedResults" class="mt-4"></div>
            <div id="totalSection" class="mt-6"></div>
          </div>
        </div>
      </div>
    `;
  }

  /* ===============================
     Event Wiring
  ================================ */
  bindEvents() {
    const $ = (id) => this.shadowRoot.getElementById(id);

    $("customerClass").addEventListener("change", () => {
      const isMulti = $("customerClass").value.includes("Multi");
      $("multiFamilyUnitsDiv").classList.toggle("hidden", !isMulti);
    });

    $("calculateButton").addEventListener("click", () => this.calculateBill());
  }

  /* ===============================
     Calculation Entrypoint
  ================================ */
  calculateBill() {
    const $ = (id) => this.shadowRoot.getElementById(id);

    const meterSize = $("meterSize").value.split("(")[0].trim();
    const potableUsage = +$("potableUsage").value || 0;
    const recycledUsage = +$("recycledUsage").value || 0;
    const includeFireLine = $("fireLine").checked;
    const includeFOG = $("fogCharge").checked;
    const customerClass = $("customerClass").value;

    let units = 1;
    if (customerClass.includes("Multi")) {
      units = +$("multiFamilyUnits").value || 2;
    }
    this.currentMultiFamilyUnits = units;

    for (const year of FISCAL_YEARS) {
      this.lastCalculatedResults[year] =
        calculateYearlyBill(
          meterSize,
          potableUsage,
          recycledUsage,
          includeFireLine,
          includeFOG,
          year
        );
    }

    this.currentResult =
      calculateCurrentBill(
        meterSize,
        potableUsage,
        recycledUsage,
        includeFOG,
        customerClass,
        units
      );

    this.renderYearTabs();
    this.showDetailedBreakdown("Current");
  }

  /* ===============================
     Tabs + Rendering
  ================================ */
  renderYearTabs() {
    const tabs = this.shadowRoot.getElementById("yearTabs");
    tabs.innerHTML = "";

    if (this.currentResult) {
      tabs.appendChild(this.makeTab("Current", this.currentResult.totalBill));
    }

    FISCAL_YEARS.forEach((y) => {
      tabs.appendChild(
        this.makeTab(y, this.lastCalculatedResults[y].totalBill)
      );
    });
  }

  makeTab(label, amount) {
    const tab = document.createElement("div");
    tab.className = `tab ${this.activeYear === label ? "active" : ""}`;
    tab.innerHTML = `
      <div>${label}</div>
      <div class="font-bold">$${amount.toFixed(2)}</div>
    `;
    tab.onclick = () => this.showDetailedBreakdown(label);
    return tab;
  }

  showDetailedBreakdown(year) {
    this.activeYear = year;
    const result =
      year === "Current"
        ? this.currentResult
        : this.lastCalculatedResults[year];

    this.shadowRoot.getElementById("totalSection").innerHTML = `
      <div class="text-xl font-bold">
        Total: $${result.totalBill.toFixed(2)} / month
      </div>
    `;

    this.renderYearTabs();
  }
}

/* ===============================
   Register Element
================================ */
customElements.define("bill-estimator", BillEstimator);
