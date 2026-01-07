import { RATES, FISCAL_YEARS } from "./const.js";

class BillEstimator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Internal State
        this.lastCalculatedResults = {};
        this.activeYear = FISCAL_YEARS[0];
        this.currentResult = null;
        this.currentMultiFamilyUnits = 1;

        this.CLASS_KEY_MAP = {
            "Single Family": "singleFamily",
            "Multi-Family": "multiFamily",
            "Non-Residential": "nonResidential",
        };
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    // --- HTML & CSS STRUCTURE ---
    render() {
        this.shadowRoot.innerHTML = `
        <style>
            @import "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
            :host { display: block; --dark-text-color: #183e63; font-family: 'Inter', sans-serif; }
            .card { background: white; border: 1px solid #E5E7EB; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            .input-style { width: 100%; padding: 0.75rem; border: 1px solid #D1D5DB; border-radius: 0.375rem; background: white; margin-top: 0.25rem; }
            .tab { padding: 1rem; cursor: pointer; border: 1px solid #E5E7EB; flex: 1; text-align: center; transition: all 0.2s; }
            .tab.active { background-color: #f0f6ff; border-bottom: 3px solid var(--dark-text-color); font-weight: bold; }
            .status-positive { color: #10B981; }
            .status-negative { color: #EF4444; }
            .hidden { display: none; }
        </style>

        <div class="max-w-4xl mx-auto p-4 space-y-8">
            <div class="card p-6">
                <h2 class="text-xl font-bold border-b pb-2 mb-4" style="color: var(--dark-text-color);">Input Parameters</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-sm font-medium text-gray-700">Customer Class</label>
                        <select id="customerClass" class="input-style">
                            <option value="Single Family">Single Family</option>
                            <option value="Multi-Family">Multi-Family</option>
                            <option value="Non-Residential">Non-Residential</option>
                        </select>
                    </div>
                    <div id="multiFamilyUnitsDiv" class="hidden">
                        <label class="text-sm font-medium text-gray-700">Number of Units</label>
                        <input type="number" id="multiFamilyUnits" value="2" min="2" class="input-style">
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Meter Size</label>
                        <select id="meterSize" class="input-style">
                            <option value="5/8&quot; X 3/4&quot;">5/8" X 3/4"</option>
                            <option value="3/4&quot;">3/4"</option>
                            <option value="1&quot;">1"</option>
                            <option value="1 1/2&quot;">1 1/2"</option>
                            <option value="2&quot;">2"</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm font-medium text-gray-700">Potable Usage (ccf)</label>
                        <input type="number" id="potableUsage" value="20" class="input-style">
                    </div>
                </div>

                <div class="mt-4 pt-4 border-t space-y-2">
                    <div class="flex items-center space-x-2">
                        <input type="checkbox" id="fireLine" class="h-4 w-4">
                        <label for="fireLine" class="text-sm text-gray-700">Include Fire Line</label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input type="checkbox" id="fogCharge" class="h-4 w-4">
                        <label for="fogCharge" class="text-sm text-gray-700">Include FOG Charge</label>
                    </div>
                </div>

                <button id="calcBtn" class="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
                    Calculate Bill Estimate
                </button>
            </div>

            <div id="resultsWrapper" class="hidden">
                <div id="yearTabs" class="flex flex-wrap rounded-t-xl overflow-hidden bg-white"></div>
                <div class="card rounded-t-none p-6 border-t-0">
                    <div id="inputSummary" class="mb-6 p-4 bg-gray-50 rounded-lg border"></div>
                    <div id="detailedResults"></div>
                    <div id="totalSection" class="mt-6"></div>
                </div>
            </div>
        </div>
        `;
    }

    // --- EVENT LOGIC ---
    setupEventListeners() {
        const root = this.shadowRoot;
        root.getElementById('calcBtn').addEventListener('click', () => this.calculateBill());
        
        root.getElementById('customerClass').addEventListener('change', (e) => {
            const unitsDiv = root.getElementById('multiFamilyUnitsDiv');
            e.target.value === 'Multi-Family' ? unitsDiv.classList.remove('hidden') : unitsDiv.classList.add('hidden');
        });
    }

    // --- CALCULATION LOGIC ---
    calculateYearlyBill(meterSize, potableUsage, recycledUsage, includeFireLine, includeFOG, fiscalYear) {
        let commodityItems = [];
        let totalCommodity = 0;
        let fixedItems = [];
        let totalFixed = 0;

        const retailFixedCharge = (RATES.retailFixed[fiscalYear] || {})[meterSize] || 0;
        if (retailFixedCharge > 0) {
            totalFixed += retailFixedCharge;
            fixedItems.push({ name: "Retail Fixed", amount: retailFixedCharge, order: 1, isFixed: true });
        }

        const sewerFixedCharge = (RATES.sewerFixed[fiscalYear] || {})[meterSize] || 0;
        if (sewerFixedCharge > 0) {
            totalFixed += sewerFixedCharge;
            fixedItems.push({ name: "Sewer Fixed", amount: sewerFixedCharge, order: 4, isFixed: true });
        }

        const commodityRates = RATES.commodityRates[fiscalYear];
        const tier1Allocation = RATES.tier1Allocations[meterSize] || 0;
        
        let t1Vol = Math.min(potableUsage, tier1Allocation);
        let t2Vol = Math.max(0, potableUsage - tier1Allocation);

        if (t1Vol > 0) {
            const cost = t1Vol * commodityRates["Tier 1"];
            totalCommodity += cost;
            commodityItems.push({ name: "Potable Tier 1", description: `${t1Vol} ccf @ $${commodityRates["Tier 1"].toFixed(2)}`, amount: cost, order: 2 });
        }
        if (t2Vol > 0) {
            const cost = t2Vol * commodityRates["Tier 2"];
            totalCommodity += cost;
            commodityItems.push({ name: "Potable Tier 2", description: `${t2Vol.toFixed(1)} ccf @ $${commodityRates["Tier 2"].toFixed(2)}`, amount: cost, order: 3 });
        }

        return { totalBill: totalFixed + totalCommodity, breakdown: { fixed: fixedItems, commodity: commodityItems }, tier1Allocation };
    }

    calculateCurrentBill(meterSize, potableUsage, recycledUsage, includeFOG, customerClass, multiFamilyUnits) {
        const classKey = this.CLASS_KEY_MAP[customerClass] || "singleFamily";
        const isMultiFamily = classKey === "multiFamily";
        
        const retailFixedMonthly = (RATES.currentRetailFixed[meterSize] || 0) / 2;
        const tier1AllocBi = isMultiFamily ? (17 * multiFamilyUnits) : (RATES.currentTier1Allocations[classKey][meterSize] || 0);
        const tier1Allocation = tier1AllocBi / 2;

        const t1Vol = Math.min(potableUsage, tier1Allocation);
        const t2Vol = Math.max(0, potableUsage - tier1Allocation);
        const rates = RATES.currentCommodityRates;

        let totalCommodity = (t1Vol * rates["Tier 1"]) + (t2Vol * rates["Tier 2"]);
        
        return {
            totalBill: retailFixedMonthly + totalCommodity,
            tier1Allocation,
            breakdown: {
                fixed: [{ name: "Current Retail Fixed", amount: retailFixedMonthly, order: 1 }],
                commodity: [
                    { name: "Current Tier 1", amount: t1Vol * rates["Tier 1"], description: `${t1Vol.toFixed(1)} ccf`, order: 2 },
                    { name: "Current Tier 2", amount: t2Vol * rates["Tier 2"], description: `${t2Vol.toFixed(1)} ccf`, order: 3 }
                ]
            }
        };
    }

    calculateBill() {
        const root = this.shadowRoot;
        const meterSize = root.getElementById("meterSize").value;
        const potableUsage = parseFloat(root.getElementById("potableUsage").value) || 0;
        const customerClass = root.getElementById("customerClass").value;
        const units = parseFloat(root.getElementById("multiFamilyUnits").value) || 1;

        this.currentResult = this.calculateCurrentBill(meterSize, potableUsage, 0, false, customerClass, units);
        
        FISCAL_YEARS.forEach(year => {
            this.lastCalculatedResults[year] = this.calculateYearlyBill(meterSize, potableUsage, 0, false, false, year);
        });

        root.getElementById('resultsWrapper').classList.remove('hidden');
        this.renderYearTabs();
        this.showDetailedBreakdown(this.activeYear);
    }

    renderYearTabs() {
        const container = this.shadowRoot.getElementById('yearTabs');
        container.innerHTML = '';
        
        const years = ['Current', ...FISCAL_YEARS];
        years.forEach(year => {
            const data = year === 'Current' ? this.currentResult : this.lastCalculatedResults[year];
            const tab = document.createElement('div');
            tab.className = `tab ${this.activeYear === year ? 'active' : ''}`;
            tab.innerHTML = `<div class="text-xs">${year}</div><div class="font-bold">$${data.totalBill.toFixed(2)}</div>`;
            tab.onclick = () => { this.activeYear = year; this.renderYearTabs(); this.showDetailedBreakdown(year); };
            container.appendChild(tab);
        });
    }

    showDetailedBreakdown(year) {
        const root = this.shadowRoot;
        const data = year === 'Current' ? this.currentResult : this.lastCalculatedResults[year];
        const t1 = data.tier1Allocation;
        const usage = parseFloat(root.getElementById("potableUsage").value) || 0;

        root.getElementById('detailedResults').innerHTML = `
            <div class="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm font-bold">Tier 1 Allocation</p>
                        <p class="text-lg text-blue-700 font-bold">${t1.toFixed(1)} ccf</p>
                        <p class="text-xs text-gray-500">Usage used: ${Math.min(usage, t1).toFixed(1)} ccf</p>
                    </div>
                    <div>
                        <p class="text-sm font-bold">Tier 2 Starts At</p>
                        <p class="text-lg text-blue-700 font-bold">> ${t1.toFixed(1)} ccf</p>
                        <p class="text-xs text-gray-500">Usage used: ${Math.max(0, usage - t1).toFixed(1)} ccf</p>
                    </div>
                </div>
            </div>
            <table class="w-full text-left text-sm">
                <tr class="border-b bg-gray-50 text-gray-600 font-bold"><td class="p-2">Item</td><td class="p-2 text-right">Cost</td></tr>
                ${[...data.breakdown.fixed, ...data.breakdown.commodity].map(item => `
                    <tr class="border-b"><td class="p-2">${item.name}<br><span class="text-xs text-gray-400">${item.description || ''}</span></td>
                    <td class="p-2 text-right font-bold">$${item.amount.toFixed(2)}</td></tr>
                `).join('')}
            </table>
        `;
        
        root.getElementById('totalSection').innerHTML = `
            <div class="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg">
                <span class="font-bold">MONTHLY TOTAL</span>
                <span class="text-2xl font-black">$${data.totalBill.toFixed(2)}</span>
            </div>
        `;
    }
}

customElements.define('bill-estimator', BillEstimator);