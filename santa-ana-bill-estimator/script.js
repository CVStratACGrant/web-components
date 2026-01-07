import { RATES, FISCAL_YEARS } from "./const.js";

window.lastCalculatedResults = {};
window.activeYear = FISCAL_YEARS[0]; // Default active year
window.currentResult = null; // Holds the CURRENT (bi-monthly) result, as monthly equivalent
window.currentMultiFamilyUnits = 1;

// Map UI customer class label to internal keys (for current sewer/tier tables)
const CLASS_KEY_MAP = {
    "Single Family": "singleFamily",
    "Multi-Family": "multiFamily",
    "Multi Family": "multiFamily", // be forgiving if HTML uses space instead of hyphen
    "Non-Residential": "nonResidential",
};

/**
 * Calculates the estimated monthly water bill for a single fiscal year (PROPOSED rates).
 * (Note: Does not currently use multiFamilyUnits in calculation.)
 */
function calculateYearlyBill(
    meterSize,
    potableUsage,
    recycledUsage,
    includeFireLine,
    includeFOG,
    fiscalYear
) {
    let commodityItems = []; // For Potable Tiers, Recycled
    let totalCommodity = 0;

    // --- FIXED CHARGES DETAILS ---
    let fixedItems = [];
    let totalFixed = 0;

    // Retail Fixed (Water Readiness)
    const retailFixedCharge = (RATES.retailFixed[fiscalYear] || {})[meterSize] || 0;
    if (retailFixedCharge > 0) {
        totalFixed += retailFixedCharge;
        fixedItems.push({
            name: "Retail Fixed (Water Readiness)",
            amount: retailFixedCharge,
            isFixed: true, // Marker for fixed charges
            order: 1, // Custom order for sorting
        });
    }

    // Sewer Fixed
    const sewerFixedCharge = (RATES.sewerFixed[fiscalYear] || {})[meterSize] || 0;
    if (sewerFixedCharge > 0) {
        totalFixed += sewerFixedCharge;
        fixedItems.push({
            name: "Sewer Fixed",
            amount: sewerFixedCharge,
            isFixed: true,
            order: 4, // Custom order for sorting
        });
    }

    // Fire Line Fixed (optional)
    if (includeFireLine) {
        const fireFixedCharge = (RATES.fireFixed[fiscalYear] || {})[meterSize] || 0;
        if (fireFixedCharge > 0) {
            totalFixed += fireFixedCharge;
            fixedItems.push({
                name: "Fire Line Fixed",
                amount: fireFixedCharge,
                isFixed: true,
                order: 6, // Custom order for sorting
            });
        }
    }

    // FOG Charge (optional)
    if (includeFOG) {
        const fogCharge = RATES.fogCharges[fiscalYear] || 0;
        if (fogCharge > 0) {
            totalFixed += fogCharge;
            fixedItems.push({
                name: "FOG Charge (Fats, Oils, Grease)",
                amount: fogCharge,
                isFixed: true,
                order: 7, // Custom order for sorting
            });
        }
    }

    // --- USAGE CHARGES (COMMODITY) ---
    const commodityRates = RATES.commodityRates[fiscalYear];
    const tier1Allocation = RATES.tier1Allocations[meterSize] || 0;

    // Potable Water Usage (Tiered)
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
                isFixed: false, // Marker for commodity charges
                order: 2, // Custom order for sorting
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
                order: 3, // Custom order for sorting
            });
        }
    }

    totalCommodity += potableUsageCost;

    // Recycled Water Usage
    let recycledUsageCost = 0;
    if (recycledUsage > 0) {
        recycledUsageCost = recycledUsage * commodityRates["Recycled"];
        totalCommodity += recycledUsageCost;
        commodityItems.push({
            name: "Recycled Water Usage",
            description: `${recycledUsage} ccf @ $${commodityRates["Recycled"].toFixed(2)}/ccf`,
            amount: recycledUsageCost,
            isFixed: false,
            order: 5, // Custom order for sorting
        });
    }

    // FINAL TOTAL
    const totalBill = totalFixed + totalCommodity;

    // Return structured breakdown
    const breakdown = { fixed: fixedItems, commodity: commodityItems };

    return {
        totalBill,
        totalFixed,
        totalCommodity,
        breakdown,
        tier1Allocation,
    };
}

/**
 * Calculates CURRENT bill based on bi-monthly current rate structure,
 * but returns a MONTHLY equivalent.
 * Uses multiFamilyUnits to scale the Tier 1 allocation for Multi-Family customers.
 */
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

    // --- FIXED CHARGES (BI-MONTHLY → MONTHLY) ---
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

    // --- COMMODITY CHARGES (MONTHLY) ---
    const commodityRates = RATES.currentCommodityRates || {};

    const tier1AllocationsByClass =
        (RATES.currentTier1Allocations &&
            RATES.currentTier1Allocations[classKey]) ||
        RATES.currentTier1Allocations.singleFamily ||
        {};

    // Determine the base bi-monthly allocation per unit/connection.
    let tier1AllocBaseBi = tier1AllocationsByClass[meterSize] || 0;

    // For Multi-Family: allocation is per dwelling unit → scale by # of units
    let tier1AllocBi = tier1AllocBaseBi;
    
    // Check if the customer class is Multi-Family and units are set
    if (isMultiFamily && multiFamilyUnits > 0) {
        // IMPLEMENT USER REQUEST: For Multi-Family, base allocation is fixed at 17 ccf per unit bi-monthly, regardless of meter size.
        const baseUnitAllocation = 17; 
        tier1AllocBi = baseUnitAllocation * multiFamilyUnits;
    }
    // For Single Family / Non-Residential, tier1AllocBi remains tier1AllocBaseBi (the meter-size allocation).

    // Convert BI-MONTHLY allocation to MONTHLY threshold
    const tier1Allocation = tier1AllocBi / 2;

    // Apply tiering to MONTHLY usage
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
        // Return MONTHLY tier 1 allocation for display
        tier1Allocation,
    };
}

/**
 * Main function to calculate the bill across all fiscal years AND current rates.
 * NOTE: This is intended to be called explicitly, e.g. from the Calculate button:
 * <button onclick="calculateBill()">Calculate</button>
 */
window.calculateBill = function (initialYear = window.activeYear) {
    // 1. Get Inputs
    const meterSize = document.getElementById("meterSize").value;
    const potableUsage =
        parseFloat(document.getElementById("potableUsage").value) || 0;
    const recycledUsage =
        parseFloat(document.getElementById("recycledUsage").value) || 0;
    const includeFireLine = document.getElementById("fireLine").checked;
    const includeFOG = document.getElementById("fogCharge").checked;

    const customerClassEl = document.getElementById("customerClass");
    const customerClass = customerClassEl ? customerClassEl.value : "Single Family";
    
    // GET # OF UNITS (for Multi-Family)
    let multiFamilyUnits = 1;
    if (customerClass.toLowerCase().includes("multi")) {
        multiFamilyUnits =
            parseFloat(document.getElementById("multiFamilyUnits")?.value) || 1;
    }
    // Store units globally so showDetailedBreakdown can display them
    window.currentMultiFamilyUnits = multiFamilyUnits;

    const cleanMeterSize = meterSize.split("(")[0].trim();

    // 2. Calculate PROPOSED bill for all fiscal years and store results
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

    // 3. Calculate CURRENT bill (bi-monthly → monthly equivalent)
    window.currentResult = calculateCurrentBill(
        cleanMeterSize,
        potableUsage,
        recycledUsage,
        includeFOG,
        customerClass,
        multiFamilyUnits
    );

    // 4. Render tabs and display the detailed breakdown for the active view
    renderYearTabs();
    const displayYear =
        window.activeYear === "Current" || FISCAL_YEARS.includes(window.activeYear)
            ? window.activeYear
            : FISCAL_YEARS[0];

    showDetailedBreakdown(displayYear);
};

/**
 * Renders the clickable tabs for CURRENT and all fiscal years.
 */
function renderYearTabs() {
    const yearTabsEl = document.getElementById("yearTabs");
    yearTabsEl.innerHTML = "";

    // --- CURRENT TAB (monthly equivalent of current bi-monthly rates) ---
    if (window.currentResult) {
        const isActive = window.activeYear === "Current";

        const currentTab = document.createElement("div");
        currentTab.className = `tab flex-1 text-center ${
            isActive ? "active" : ""
        }`;
        currentTab.setAttribute("onclick", `showDetailedBreakdown('Current')`);

        currentTab.innerHTML = `
            <div class="text-sm">Current</div>
            <div class="text-lg font-extrabold">
                ${window.currentResult.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="text-sm font-normal">/month</span>
            </div>
        `;
        yearTabsEl.appendChild(currentTab);
    }

    // --- PROPOSED FY TABS ---
    FISCAL_YEARS.forEach((year) => {
        const result = window.lastCalculatedResults[year];
        const isActive = year === window.activeYear;

        const tabHtml = document.createElement("div");
        tabHtml.className = `tab flex-1 text-center ${
            isActive ? "active" : ""
        }`;
        tabHtml.setAttribute("onclick", `showDetailedBreakdown('${year}')`);

        tabHtml.innerHTML = `
            <div class="text-sm">${year}</div>
            <div class="text-lg font-extrabold">
                ${result.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="text-sm font-normal">/month</span>
            </div>
        `;
        yearTabsEl.appendChild(tabHtml);
    });
}

/**
 * Renders the detailed cost breakdown for a selected view:
 * - "Current" (currentResult)
 * - any FY (window.lastCalculatedResults[year])
 */
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
    
    // Retrieve the stored units variable
    const multiFamilyUnits = window.currentMultiFamilyUnits || 1;

    // Build the unit display part if applicable
    const unitDisplay = customerClass.includes("Multi-Family") 
        ? `(# Units: ${multiFamilyUnits})` 
        : '';
        
    // --- Determine Customer Class display based on Current vs. FY ---
    const customerClassStatus = isCurrent 
        ? `<span>${customerClass} ${unitDisplay}</span>` 
        : `<span class="text-red-500 font-medium">Not Applicable</span>`;

    // --- UPDATE INPUT SUMMARY DISPLAY (HEADER) ---
    inputSummaryEl.innerHTML = `
        <p class="text-sm font-bold" style="color: var(--dark-text-color);">
            Estimate for: <span id="currentYearDisplay">${isCurrent ? "Current Rates" : year}</span>
        </p>
        <p class="text-xs text-gray-700">
            Customer Class: ${customerClassStatus} |
            Based on Meter: <span id="currentMeterDisplay">${meterSize}</span> | 
            Potable Usage: <span id="currentPotableUsageDisplay">${potableUsage}</span> ccf | 
            Recycled Usage: <span id="currentRecycledUsageDisplay">${recycledUsage}</span> ccf
        </p>
        <p class="text-xs text-gray-700 mt-1">
            Additional Charges: 
            <span id="fireLineStatus" class="font-medium ${includeFireLine ? "status-positive" : "status-negative"}">
                ${includeFireLine ? "w/ Fire Line" : "No Fire Line"}
            </span>, 
            <span id="fogChargeStatus" class="font-medium ${includeFOG ? "status-positive" : "status-negative"}">
                ${includeFOG ? "w/ FOG Charge" : "No FOG Charge"}
            </span>
        </p>
    `;
    
    // --- UPDATE TOTAL SECTION (BOTTOM) ---
    let totalHtml = `
        <div class="flex justify-between items-center bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <p class="text-lg font-bold" style="color: var(--dark-text-color);">TOTAL</p>
            <p id="totalBillAmount" class="text-3xl font-extrabold" style="color: var(--dark-text-color);">
                ${result.totalBill.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                })}
                <span class="text-lg">/month</span>
            </p>
        </div>
    `;


    totalSectionEl.innerHTML = totalHtml;

    // --- CONSOLIDATED BILL BREAKDOWN ---
    // Combine all line items and sort them by the custom 'order' property
    const allItems = [
        ...result.breakdown.fixed,
        ...result.breakdown.commodity,
    ].sort((a, b) => a.order - b.order);

    const tier1Allocation = result.tier1Allocation || 0;
    const tier2Allocation = result.tier2Allocation || 0;

    // Initial message/allocation box
    let breakdownHtml = `
        <h3 class="text-xl font-bold border-b pb-2 mb-4" style="color: var(--dark-text-color);">Charge Details</h3>
        
        <div class="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200 allocation-box">
            <p class="text-sm font-bold" style="color: var(--dark-text-color);">
                Potable Tier 1 Allocation: <span>${tier1Allocation.toFixed(1)} ccf</span> ${isCurrent && customerClass.includes("Multi-Family") ? `(Based on 8.5 ccf/unit for ${multiFamilyUnits} units)` : `for ${meterSize} meter.`}
            </p>
            <p class="text-xs text-gray-700 mt-1">
                This is the usage threshold for the lower Tier 1 rate. Any potable usage over <b>
                ${tier1Allocation.toFixed(1)} ccf </b> is charged at the higher Tier 2 rate.
            </p>
        </div>

        <div class="shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 hidden sm:table-header-group">
                    <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Charge Item
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Details
                        </th>
                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Monthly Cost
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
    `;

    allItems.forEach((item) => {
        const description = item.description || (item.isFixed ? "Fixed Monthly Charge" : "");
        
        // Use flex/col on mobile (default) and table-row on small/desktop (sm:+)
        breakdownHtml += `
            <tr class="flex flex-col sm:table-row border-t sm:border-t-0 p-4 sm:p-0">
                <td class="block sm:table-cell text-sm text-gray-900 sm:px-6 sm:py-4">
                    <span class="font-bold sm:hidden block text-xs uppercase text-gray-500 mb-0.5">Charge Item</span>
                    ${item.name}
                </td>
                <td class="block sm:table-cell text-sm text-gray-500 sm:px-6 sm:py-4">
                    <span class="font-bold sm:hidden block text-xs uppercase text-gray-500 mt-2 mb-0.5">Details</span>
                    ${description}
                </td>
                <td class="block sm:table-cell text-sm sm:px-6 sm:py-4 text-right font-bold sm:font-normal text-lg sm:text-gray-900 mt-2">
                    <span class="font-bold sm:hidden block text-xs uppercase text-gray-500 mb-0.5">Monthly Cost</span>
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

    // Re-render tabs to set the active state
    renderYearTabs();
};