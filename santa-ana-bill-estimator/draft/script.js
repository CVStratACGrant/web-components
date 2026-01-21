import { RATES, FISCAL_YEARS } from "./const.js";

window.lastCalculatedResults = {};
window.activeYear = FISCAL_YEARS[0];
window.currentResult = null;
window.currentMultiFamilyUnits = 1;

const CLASS_KEY_MAP = {
    "Single Family": "singleFamily",
    "Multi-Family": "multiFamily",
    "Multi Family": "multiFamily",
    "Non-Residential": "nonResidential",
};

function calculateYearlyBill(
    meterSize,
    potableUsage,
    recycledUsage,
    includeFireLine,
    includeFOG,
    fiscalYear
) {
    let commodityItems = [];
    let totalCommodity = 0;
    let fixedItems = [];
    let totalFixed = 0;

    const retailFixedCharge = (RATES.retailFixed[fiscalYear] || {})[meterSize] || 0;
    if (retailFixedCharge > 0) {
        totalFixed += retailFixedCharge;
        fixedItems.push({
            name: "Retail Fixed (Water Readiness)",
            amount: retailFixedCharge,
            isFixed: true,
            order: 1,
        });
    }

    const sewerFixedCharge = (RATES.sewerFixed[fiscalYear] || {})[meterSize] || 0;
    if (sewerFixedCharge > 0) {
        totalFixed += sewerFixedCharge;
        fixedItems.push({
            name: "Sewer Fixed",
            amount: sewerFixedCharge,
            isFixed: true,
            order: 4,
        });
    }

    if (includeFireLine) {
        const fireFixedCharge = (RATES.fireFixed[fiscalYear] || {})[meterSize] || 0;
        if (fireFixedCharge > 0) {
            totalFixed += fireFixedCharge;
            fixedItems.push({
                name: "Fire Line Fixed",
                amount: fireFixedCharge,
                isFixed: true,
                order: 6,
            });
        }
    }

    if (includeFOG) {
        const fogCharge = RATES.fogCharges[fiscalYear] || 0;
        if (fogCharge > 0) {
            totalFixed += fogCharge;
            fixedItems.push({
                name: "FOG Charge (Fats, Oils, Grease)",
                amount: fogCharge,
                isFixed: true,
                order: 7,
            });
        }
    }

    const commodityRates = RATES.commodityRates[fiscalYear];
    const tier1Allocation = RATES.tier1Allocations[meterSize] || 0;

    let potableUsageCost = 0;
    let tier1VolumeUsed = Math.min(potableUsage, tier1Allocation);
    let tier2VolumeUsed = Math.max(0, potableUsage - tier1Allocation);

    if (potableUsage > 0) {
        if (tier1VolumeUsed > 0) {
            const cost = tier1VolumeUsed * commodityRates["Tier 1"];
            potableUsageCost += cost;
            commodityItems.push({
                name: "Potable Tier 1 Usage",
                description: `${tier1VolumeUsed} ccf @ $${commodityRates["Tier 1"].toFixed(2)}/ccf`,
                amount: cost,
                isFixed: false,
                order: 2,
            });
        }
        if (tier2VolumeUsed > 0) {
            const cost = tier2VolumeUsed * commodityRates["Tier 2"];
            potableUsageCost += cost;
            commodityItems.push({
                name: "Potable Tier 2 Usage",
                description: `${tier2VolumeUsed.toFixed(1)} ccf @ $${commodityRates["Tier 2"].toFixed(2)}/ccf`,
                amount: cost,
                isFixed: false,
                order: 3,
            });
        }
    }

    totalCommodity += potableUsageCost;

    let recycledUsageCost = 0;
    if (recycledUsage > 0) {
        recycledUsageCost = recycledUsage * commodityRates["Recycled"];
        totalCommodity += recycledUsageCost;
        commodityItems.push({
            name: "Recycled Water Usage",
            description: `${recycledUsage} ccf @ $${commodityRates["Recycled"].toFixed(2)}/ccf`,
            amount: recycledUsageCost,
            isFixed: false,
            order: 5,
        });
    }

    const totalBill = totalFixed + totalCommodity;
    const breakdown = { fixed: fixedItems, commodity: commodityItems };

    return {
        totalBill,
        totalFixed,
        totalCommodity,
        breakdown,
        tier1Allocation,
    };
}

function calculateCurrentBill(
    meterSize,
    potableUsage,
    recycledUsage,
    includeFOG,
    customerClass,
    multiFamilyUnits = 1
) {
    const classKey = CLASS_KEY_MAP[customerClass] || "singleFamily";
    const isMultiFamily = classKey === "multiFamily";

    const retailFixedBi = RATES.currentRetailFixed[meterSize] || 0;

    const sewerFixedTable =
        (RATES.currentSewerFixed && RATES.currentSewerFixed[classKey]) ||
        RATES.currentSewerFixed.singleFamily ||
        {};
    const sewerFixedBi = sewerFixedTable[meterSize] || 0;

    const fogBi = includeFOG ? (RATES.currentFogCharge || 0) : 0;

    const retailFixedMonthly = retailFixedBi / 2;
    const sewerFixedMonthly = sewerFixedBi / 2;
    const fogMonthly = fogBi / 2;

    let fixedItems = [];
    let totalFixed = 0;

    if (retailFixedMonthly > 0) {
        totalFixed += retailFixedMonthly;
        fixedItems.push({
            name: "Retail Fixed (Current Water)",
            amount: retailFixedMonthly,
            isFixed: true,
            order: 1,
        });
    }

    if (sewerFixedMonthly > 0) {
        totalFixed += sewerFixedMonthly;
        fixedItems.push({
            name: "Sewer Fixed (Current)",
            amount: sewerFixedMonthly,
            isFixed: true,
            order: 4,
        });
    }

    if (fogMonthly > 0) {
        totalFixed += fogMonthly;
        fixedItems.push({
            name: "FOG Charge (Current)",
            amount: fogMonthly,
            isFixed: true,
            order: 7,
        });
    }

    const commodityRates = RATES.currentCommodityRates || {};

    const tier1AllocationsByClass =
        (RATES.currentTier1Allocations &&
            RATES.currentTier1Allocations[classKey]) ||
        RATES.currentTier1Allocations.singleFamily ||
        {};

    let tier1AllocBaseBi = tier1AllocationsByClass[meterSize] || 0;
    let tier1AllocBi = tier1AllocBaseBi;
    
    if (isMultiFamily && multiFamilyUnits > 0) {
        const baseUnitAllocation = 17; 
        tier1AllocBi = baseUnitAllocation * multiFamilyUnits;
    }

    const tier1Allocation = tier1AllocBi / 2;

    const tier1Vol = Math.min(potableUsage, tier1Allocation);
    const tier2Vol = Math.max(0, potableUsage - tier1Allocation);

    let commodityItems = [];
    let totalCommodity = 0;

    const t1Rate = commodityRates["Tier 1"] || 0;
    const t2Rate = commodityRates["Tier 2"] || 0;
    const recycledRate = commodityRates["Recycled"] || 0;

    if (tier1Vol > 0) {
        const cost = tier1Vol * t1Rate;
        totalCommodity += cost;
        commodityItems.push({
            name: "Potable Tier 1 (Current)",
            description: `${tier1Vol.toFixed(1)} ccf @ $${t1Rate.toFixed(2)}/ccf`,
            amount: cost,
            isFixed: false,
            order: 2,
        });
    }

    if (tier2Vol > 0) {
        const cost = tier2Vol * t2Rate;
        totalCommodity += cost;
        commodityItems.push({
            name: "Potable Tier 2 (Current)",
            description: `${tier2Vol.toFixed(1)} ccf @ $${t2Rate.toFixed(2)}/ccf`,
            amount: cost,
            isFixed: false,
            order: 3,
        });
    }

    if (recycledUsage > 0) {
        const recycledUsageCost = recycledUsage * recycledRate;
        totalCommodity += recycledUsageCost;
        commodityItems.push({
            name: "Recycled Water (Current)",
            description: `${recycledUsage} ccf @ $${recycledRate.toFixed(2)}/ccf`,
            amount: recycledUsageCost,
            isFixed: false,
            order: 5,
        });
    }

    const totalBill = totalFixed + totalCommodity;

    return {
        totalBill,
        totalFixed,
        totalCommodity,
        breakdown: {
            fixed: fixedItems,
            commodity: commodityItems,
        },
        tier1Allocation,
    };
}

window.calculateBill = function (initialYear = window.activeYear) {
    const meterSize = document.getElementById("meterSize").value;
    const potableUsage =
        parseFloat(document.getElementById("potableUsage").value) || 0;
    const recycledUsage =
        parseFloat(document.getElementById("recycledUsage").value) || 0;
    const includeFireLine = document.getElementById("fireLine").checked;
    const includeFOG = document.getElementById("fogCharge").checked;

    const customerClassEl = document.getElementById("customerClass");
    const customerClass = customerClassEl ? customerClassEl.value : "Single Family";
    
    let multiFamilyUnits = 1;
    if (customerClass.toLowerCase().includes("multi")) {
        multiFamilyUnits =
            parseFloat(document.getElementById("multiFamilyUnits")?.value) || 1;
    }
    window.currentMultiFamilyUnits = multiFamilyUnits;

    const cleanMeterSize = meterSize.split("(")[0].trim();

    for (const year of FISCAL_YEARS) {
        window.lastCalculatedResults[year] = calculateYearlyBill(
            cleanMeterSize,
            potableUsage,
            recycledUsage,
            includeFireLine,
            includeFOG,
            year
        );
    }

    window.currentResult = calculateCurrentBill(
        cleanMeterSize,
        potableUsage,
        recycledUsage,
        includeFOG,
        customerClass,
        multiFamilyUnits
    );

    renderYearTabs();
    const displayYear =
        window.activeYear === "Current" || FISCAL_YEARS.includes(window.activeYear)
            ? window.activeYear
            : FISCAL_YEARS[0];

    showDetailedBreakdown(displayYear);
};

function renderYearTabs() {
    const yearTabsEl = document.getElementById("yearTabs");
    yearTabsEl.innerHTML = "";

    if (window.currentResult) {
        const isActive = window.activeYear === "Current";

        const currentTab = document.createElement("div");
        currentTab.className = `tab${isActive ? " active" : ""}`;
        currentTab.setAttribute("onclick", `showDetailedBreakdown('Current')`);

        currentTab.innerHTML = `
            <div class="tab-year">Current</div>
            <div class="tab-amount">
                ${window.currentResult.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="tab-period">/month</span>
            </div>
        `;
        yearTabsEl.appendChild(currentTab);
    }

    FISCAL_YEARS.forEach((year) => {
        const result = window.lastCalculatedResults[year];
        const isActive = year === window.activeYear;

        const tabHtml = document.createElement("div");
        tabHtml.className = `tab${isActive ? " active" : ""}`;
        tabHtml.setAttribute("onclick", `showDetailedBreakdown('${year}')`);

        tabHtml.innerHTML = `
            <div class="tab-year">${year}</div>
            <div class="tab-amount">
                ${result.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="tab-period">/month</span>
            </div>
        `;
        yearTabsEl.appendChild(tabHtml);
    });
}

window.showDetailedBreakdown = function (year) {
    window.activeYear = year;

    const detailedResultsEl = document.getElementById("detailedResults");
    const inputSummaryEl = document.getElementById("inputSummary");
    const totalSectionEl = document.getElementById("totalSection");

    const isCurrent = year === "Current";
    const result = isCurrent ? window.currentResult : window.lastCalculatedResults[year];

    if (!result) return;

    const meterSize = document
        .getElementById("meterSize")
        .value.split("(")[0]
        .trim();
    const potableUsage = document.getElementById("potableUsage").value;
    const recycledUsage = document.getElementById("recycledUsage").value;
    const includeFireLine = document.getElementById("fireLine").checked;
    const includeFOG = document.getElementById("fogCharge").checked;

    const customerClassEl = document.getElementById("customerClass");
    const customerClass = customerClassEl ? customerClassEl.value : "Single Family";
    
    const multiFamilyUnits = window.currentMultiFamilyUnits || 1;

    const unitDisplay = customerClass.includes("Multi-Family") 
        ? `(# Units: ${multiFamilyUnits})` 
        : '';
        
    const customerClassStatus = isCurrent 
        ? `<span>${customerClass} ${unitDisplay}</span>` 
        : `<span class="status-negative">Not Applicable</span>`;

    inputSummaryEl.innerHTML = `
        <p class="summary-title">
            Estimate for: <span id="currentYearDisplay">${isCurrent ? "Current Rates" : year}</span>
        </p>
        <p class="summary-details">
            Customer Class: ${customerClassStatus} |
            Based on Meter: <span id="currentMeterDisplay">${meterSize}</span> | 
            Potable Usage: <span id="currentPotableUsageDisplay">${potableUsage}</span> ccf | 
            Recycled Usage: <span id="currentRecycledUsageDisplay">${recycledUsage}</span> ccf
        </p>
        <p class="summary-charges">
            Additional Charges: 
            <span id="fireLineStatus" class="${includeFireLine ? "status-positive" : "status-negative"}">
                ${includeFireLine ? "w/ Fire Line" : "No Fire Line"}
            </span>, 
            <span id="fogChargeStatus" class="${includeFOG ? "status-positive" : "status-negative"}">
                ${includeFOG ? "w/ FOG Charge" : "No FOG Charge"}
            </span>
        </p>
    `;
    
    let totalHtml = `
        <div class="total-container">
            <p class="total-label">TOTAL</p>
            <p id="totalBillAmount" class="total-amount">
                ${result.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="total-period">/month</span>
            </p>
        </div>
    `;

    totalSectionEl.innerHTML = totalHtml;

    const allItems = [
        ...result.breakdown.fixed,
        ...result.breakdown.commodity,
    ].sort((a, b) => a.order - b.order);

    const tier1Allocation = result.tier1Allocation || 0;

    let breakdownHtml = `
        <h3 class="section-header">Charge Details</h3>
        
        <div class="allocation-box">
            <p class="allocation-title">
                Potable Tier 1 Allocation: <span>${tier1Allocation.toFixed(1)} ccf</span> ${isCurrent && customerClass.includes("Multi-Family") ? `(Based on 8.5 ccf/unit for ${multiFamilyUnits} units)` : `for ${meterSize} meter.`}
            </p>
            <p class="allocation-details">
                This is the usage threshold for the lower Tier 1 rate. Any potable usage over <b>
                ${tier1Allocation.toFixed(1)} ccf </b> is charged at the higher Tier 2 rate.
            </p>
        </div>

        <div class="table-container">
            <table class="breakdown-table">
                <thead class="table-header">
                    <tr>
                        <th>Charge Item</th>
                        <th>Details</th>
                        <th>Monthly Cost</th>
                    </tr>
                </thead>
                <tbody class="table-body">
    `;

    allItems.forEach((item) => {
        const description = item.description || (item.isFixed ? "Fixed Monthly Charge" : "");
        
        breakdownHtml += `
            <tr class="table-row">
                <td class="table-cell item-name">
                    <span class="mobile-label">Charge Item</span>
                    ${item.name}
                </td>
                <td class="table-cell item-details">
                    <span class="mobile-label details-label">Details</span>
                    ${description}
                </td>
                <td class="table-cell item-amount">
                    <span class="mobile-label">Monthly Cost</span>
                    ${item.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </td>
            </tr>
        `;
    });

    breakdownHtml += `
                </tbody>
            </table>
        </div>
    `;

    detailedResultsEl.innerHTML = breakdownHtml;

    renderYearTabs();
};