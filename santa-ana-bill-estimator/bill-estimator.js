// --- RATE DATA STRUCTURE ---
const RATES = {
    // --- CURRENT RATES (BI-MONTHLY) ---

    currentRetailFixed: {
        "5/8\" X 3/4\"": 48.62,
        "3/4\"": 72.94,
        "1\"": 121.56,
        "1 1/2\"": 243.10,
        "2\"": 388.96,
        "3\"": 850.88,
        "4\"": 1531.56,
        "6\"": 3160.36,
        "8\"": 5834.50
    },

    // Sewer fixed charge by customer class (BI-MONTHLY)
    currentSewerFixed: {
        // Single Family column
        singleFamily: {
            "5/8\" X 3/4\"": 15.24,
            "3/4\"": 21.58,
            "1\"": 34.24,
            "1 1/2\"": 65.90,
            "2\"": 103.88,
            "3\"": 224.16,
            "4\"": 401.46,
            "6\"": 825.68,
            "8\"": 1522.16,
            "10\"": 2408.60
        },
        // Multi-Family column
        multiFamily: {
            "5/8\" X 3/4\"": 22.82,
            "3/4\"": 32.98,
            "1\"": 53.24,
            "1 1/2\"": 103.88,
            "2\"": 164.68,
            "3\"": 357.14,
            "4\"": 640.82,
            "6\"": 1319.56,
            "8\"": 2433.92,
            "10\"": 3852.24
        },
        // Non-Residential column
        nonResidential: {
            "5/8\" X 3/4\"": 25.38,
            "3/4\"": 36.78,
            "1\"": 59.58,
            "1 1/2\"": 116.52,
            "2\"": 184.92,
            "3\"": 401.46,
            "4\"": 720.58,
            "6\"": 1484.16,
            "8\"": 2737.88,
            "10\"": 4333.42
        }
    },

    // Commodity charges per CCF (BI-MONTHLY structure, but rates are per CCF)
    currentCommodityRates: {
        // Potable
        "Tier 1": 2.60,
        "Tier 2": 5.87,
        // Recycled
        "Recycled": 2.55
    },

    // Tier 1 allocation by class and meter size (BI-MONTHLY CCF)
    currentTier1Allocations: {
        // Single Family column
        singleFamily: {
            "5/8\" X 3/4\"": 21,
            "3/4\"": 32,
            "1\"": 52,
            "1 1/2\"": 105,
            "2\"": 168,
            "3\"": 368,
            "4\"": 662,
            "6\"": 1365,
            "8\"": 2520
            // No 10" value provided in the source table
        },
        // Non-Residential column
        nonResidential: {
            "5/8\" X 3/4\"": 62,
            "3/4\"": 93,
            "1\"": 155,
            "1 1/2\"": 310,
            "2\"": 496,
            "3\"": 1085,
            "4\"": 1953,
            "6\"": 4030,
            "8\"": 7440
        },
        multiFamily: {
            "5/8\" X 3/4\"": 17
        }
    },
    currentFogCharge: 111.32,

        
        // --- Proposed Rates (All Monthly) ---

        // MONTHLY: Proposed Water Rate Structure (Tier 1 CCF Allocation)
        tier1Allocations: {
            "5/8\" X 3/4\"": 21,
            "3/4\"": 32,
            "1\"": 53,
            "1 1/2\"": 105,
            "2\"": 168,
            "3\"": 396,
            "4\"": 663,
            "6\"": 1369,
            "8\"": 2527,
            "10\"": 2527,
            "12\"": 2527 
        },

        // MONTHLY: Proposed Retail Fixed Charges
        retailFixed: {
            "FY 2026": { 
                "5/8\" X 3/4\"": 26.71, 
                "3/4\"": 39.10, 
                "1\"": 63.87, 
                "1 1/2\"": 125.81, 
                "2\"": 200.14, 
                "3\"": 435.50, 
                "4\"": 782.36, 
                "6\"": 1612.34, 
                "8\"": 2974.99, 
                "10\"": 5204.78 
            },
            "FY 2027": { 
                "5/8\" X 3/4\"": 29.11, 
                "3/4\"": 42.62, 
                "1\"": 69.62, 
                "1 1/2\"": 137.13, 
                "2\"": 218.15, 
                "3\"": 474.70, 
                "4\"": 852.77, 
                "6\"": 1757.45, 
                "8\"": 3242.74, 
                "10\"": 5673.21 
            },
            "FY 2028": { 
                "5/8\" X 3/4\"": 31.73, 
                "3/4\"": 46.46, 
                "1\"": 75.89, 
                "1 1/2\"": 149.47, 
                "2\"": 237.78, 
                "3\"": 517.42, 
                "4\"": 929.52, 
                "6\"": 1915.62, 
                "8\"": 3534.59, 
                "10\"": 6183.80 
            },
            "FY 2029": { 
                "5/8\" X 3/4\"": 34.59, 
                "3/4\"": 50.64, 
                "1\"": 82.72, 
                "1 1/2\"": 162.92, 
                "2\"": 259.18, 
                "3\"": 563.99, 
                "4\"": 1013.18, 
                "6\"": 2088.03, 
                "8\"": 3852.70, 
                "10\"": 6740.34 
            },
            "FY 2030": { 
                "5/8\" X 3/4\"": 37.36, 
                "3/4\"": 54.69, 
                "1\"": 89.34, 
                "1 1/2\"": 175.95, 
                "2\"": 279.91, 
                "3\"": 609.11, 
                "4\"": 1094.23, 
                "6\"": 2255.07, 
                "8\"": 4160.92, 
                "10\"": 7279.57 
            }
        },

        // MONTHLY: Proposed Commodity Charges per CCF
        commodityRates: {
            "FY 2026": { 
                "Tier 1": 3.16, 
                "Tier 2": 5.12, 
                "Recycled": 3.60 
            },
            "FY 2027": { 
                "Tier 1": 3.44, 
                "Tier 2": 5.58, 
                "Recycled": 3.92 
            },
            "FY 2028": { 
                "Tier 1": 3.75, 
                "Tier 2": 6.08, 
                "Recycled": 4.27 
            },
            "FY 2029": { 
                "Tier 1": 4.09, 
                "Tier 2": 6.63, 
                "Recycled": 4.65 
            },
            "FY 2030": { 
                "Tier 1": 4.42, 
                "Tier 2": 7.16, 
                "Recycled": 5.02 
            }
        },

        // MONTHLY: Proposed Sewer Fixed Charges
        sewerFixed: {
            "FY 2026": { 
                "5/8\" X 3/4\"": 10.56, 
                "3/4\"": 10.56, 
                "1\"": 16.47, 
                "1 1/2\"": 36.16, 
                "2\"": 79.49, 
                "3\"": 280.39, 
                "4\"": 494.09, 
                "6\"": 1088.89, 
                "8\"": 1088.89, 
                "10\"": 1088.89 
            },
            "FY 2027": { 
                "5/8\" X 3/4\"": 11.98, 
                "3/4\"": 11.98, 
                "1\"": 18.69, 
                "1 1/2\"": 41.04, 
                "2\"": 90.22, 
                "3\"": 318.24, 
                "4\"": 560.79, 
                "6\"": 1235.89, 
                "8\"": 1235.89, 
                "10\"": 1235.89 
            },
            "FY 2028": { 
                "5/8\" X 3/4\"": 13.18, 
                "3/4\"": 13.18, 
                "1\"": 20.56, 
                "1 1/2\"": 45.14, 
                "2\"": 99.24, 
                "3\"": 350.06, 
                "4\"": 616.87, 
                "6\"": 1359.48, 
                "8\"": 1359.48, 
                "10\"": 1359.48
            },
            "FY 2029": { 
                "5/8\" X 3/4\"": 14.5, 
                "3/4\"": 14.5, 
                "1\"": 22.62, 
                "1 1/2\"": 49.65, 
                "2\"": 109.16, 
                "3\"": 385.07, 
                "4\"": 678.56, 
                "6\"": 1495.43, 
                "8\"": 1495.43, 
                "10\"": 1495.43 
            },
            "FY 2030": { 
                "5/8\" X 3/4\"": 15.95, 
                "3/4\"": 15.95, 
                "1\"": 24.88, 
                "1 1/2\"": 54.62, 
                "2\"": 120.08, 
                "3\"": 423.58, 
                "4\"": 746.42, 
                "6\"": 1644.97, 
                "8\"": 1644.97, 
                "10\"": 1644.97
            }
        },
        
        // Fire Line Fixed Charges
        fireFixed: {
            "FY 2026": { 
                "2\"": 3.90, 
                "3\"": 7.63, 
                "4\"": 14.07, 
                "6\"": 37.20, 
                "8\"": 77.08, 
                "10\"": 137.08, 
                "12\"": 220.23 
            },
            "FY 2027": { 
                "2\"": 4.25, 
                "3\"": 8.32, 
                "4\"": 15.34, 
                "6\"": 40.55, 
                "8\"": 84.02, 
                "10\"": 149.42, 
                "12\"": 240.05 
            },
            "FY 2028": { 
                "2\"": 4.63, 
                "3\"": 9.07, 
                "4\"": 16.72, 
                "6\"": 44.20, 
                "8\"": 91.58, 
                "10\"": 162.87, 
                "12\"": 261.65 
            },
            "FY 2029": { 
                "2\"": 5.05, 
                "3\"": 9.89, 
                "4\"": 18.22, 
                "6\"": 48.18, 
                "8\"": 99.82, 
                "10\"": 177.53, 
                "12\"": 285.20 
            },
            "FY 2030": { 
                "2\"": 5.45, 
                "3\"": 10.68, 
                "4\"": 19.68, 
                "6\"": 52.03, 
                "8\"": 107.81, 
                "10\"": 191.73, 
                "12\"": 308.02 
            }
        },

        // MONTHLY: Proposed FOG Charges
        fogCharges: {
            "FY 2026": 88.28, 
            "FY 2027": 100.2, 
            "FY 2028": 110.22, 
            "FY 2029": 121.24, 
            "FY 2030": 133.36
        }
};

const FISCAL_YEARS = ["FY 2026", "FY 2027", "FY 2028", "FY 2029", "FY 2030"];

class WaterRateCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.RATES = RATES;
        this.FISCAL_YEARS = FISCAL_YEARS;
        
        // Internal state
        this.lastCalculatedResults = {};
        this.activeYear = null;
        this.currentResult = null;
        this.currentMultiFamilyUnits = 1;
        
        this.CLASS_KEY_MAP = {
            "Single Family": "singleFamily",
            "Multi-Family": "multiFamily",
            "Multi Family": "multiFamily",
            "Non-Residential": "nonResidential",
        };
    }
    
    // Lifecycle callback
    connectedCallback() {
        // You'll need to pass RATES and FISCAL_YEARS as properties or attributes
        if (!this.RATES || !this.FISCAL_YEARS) {
            console.error('RATES and FISCAL_YEARS must be provided to water-rate-calculator');
            return;
        }
        
        this.activeYear = this.FISCAL_YEARS[0];
        this.render();
        this.attachEventListeners();
    }
    
    // Setters for data
    set ratesData(data) {
        this.RATES = data;
    }
    
    set fiscalYears(years) {
        this.FISCAL_YEARS = years;
    }
    
    render() {
        this.shadowRoot.innerHTML = `
            ${this.getStyles()}
            ${this.getTemplate()}
        `;
    }
    
    getStyles() {
        return `
            <style>
                :host {
                    display: block;
                }
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                .calculator-container {
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                
                .card {
                    background-color: white;
                    padding: 1.5rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    border: 1px solid #E5E7EB;
                }
                
                @media (min-width: 640px) {
                    .card {
                        padding: 2rem;
                    }
                }
                
                .section-header {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #183e63;
                    border-bottom: 1px solid #E5E7EB;
                    padding-bottom: 0.5rem;
                    margin-bottom: 1rem;
                }
                
                .form-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .customer-class-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                @media (min-width: 1024px) {
                    .customer-class-container {
                        flex-direction: row;
                        gap: 1rem;
                    }
                    
                    .customer-class-container > div {
                        flex: 1;
                    }
                }
                
                .form-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .form-label {
                    display: block;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    margin-bottom: 0.25rem;
                }
                
                .input-style {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #D1D5DB;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                    font-size: 1rem;
                    background-color: white;
                    font-family: inherit;
                }
                
                .input-style:focus {
                    outline: none;
                    border-color: #183e63;
                    box-shadow: 0 0 0 2px rgba(24, 62, 99, 0.2);
                }
                
                .input-hint {
                    font-size: 0.75rem;
                    color: #6B7280;
                    margin-top: 0.25rem;
                }
                
                .usage-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                @media (min-width: 1024px) {
                    .usage-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                }
                
                .additional-charges {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding-top: 0.5rem;
                    border-top: 1px solid #E5E7EB;
                }
                
                .additional-charges-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                }
                
                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .checkbox-input {
                    height: 1rem;
                    width: 1rem;
                    cursor: pointer;
                }
                
                .checkbox-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    cursor: pointer;
                }
                
                .calculate-button {
                    width: 100%;
                    margin-top: 2rem;
                    padding: 0.75rem 1rem;
                    background-color: #3B82F6;
                    color: white;
                    font-weight: 700;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.2s;
                    border: none;
                    cursor: pointer;
                    font-size: 1rem;
                    font-family: inherit;
                }
                
                .calculate-button:hover {
                    background-color: #2563EB;
                }
                
                #yearTabs {
                    display: flex;
                    flex-direction: column;
                    background-color: white;
                    border-bottom: 1px solid #E5E7EB;
                    border-radius: 0.75rem 0.75rem 0 0;
                    overflow: hidden;
                }
                
                @media (min-width: 640px) {
                    #yearTabs {
                        flex-direction: row;
                        justify-content: flex-start;
                        border: none;
                    }
                }
                
                .tab {
                    flex: 1;
                    text-align: center;
                    padding: 0.5rem 0.75rem;
                    cursor: pointer;
                    transition: background-color 0.2s, color 0.2s;
                    border-bottom: 3px solid transparent;
                    font-weight: 600;
                    color: #6B7280;
                    border: 0.5px solid #E5E7EB;
                }
                
                @media (min-width: 768px) {
                    .tab {
                        border-radius: 0.75rem 0.75rem 0 0;
                        border: 1px solid #E5E7EB;
                    }
                }
                
                .tab:hover {
                    background-color: #F3F4F6;
                }
                
                .tab.active {
                    color: #183e63;
                    border-color: #BFDBFE;
                    background-color: #EFF6FF;
                }
                
                .tab-year {
                    font-size: 0.875rem;
                }
                
                .tab-amount {
                    font-size: 1.125rem;
                    font-weight: 800;
                }
                
                .tab-period {
                    font-size: 0.875rem;
                    font-weight: 400;
                }
                
                .results-card {
                    border-top: none;
                    border-radius: 0 0 0.75rem 0.75rem;
                }
                
                .input-summary {
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background-color: #F9FAFB;
                    border-radius: 0.5rem;
                    border: 1px solid #E5E7EB;
                }
                
                .summary-title {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #183e63;
                }
                
                .summary-details {
                    font-size: 0.75rem;
                    color: #374151;
                }
                
                .summary-charges {
                    font-size: 0.75rem;
                    color: #374151;
                    margin-top: 0.25rem;
                }
                
                .status-positive {
                    color: #10B981;
                    font-weight: 500;
                }
                
                .status-negative {
                    color: #EF4444;
                    font-weight: 500;
                }
                
                .detailed-results {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .no-results-message {
                    text-align: center;
                    color: #6B7280;
                }
                
                .allocation-box {
                    margin-bottom: 1.5rem;
                    padding: 0.75rem;
                    background-color: #EFF6FF;
                    border-radius: 0.5rem;
                    border: 1px solid #BFDBFE;
                }
                
                .allocation-title {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #183e63;
                }
                
                .allocation-details {
                    font-size: 0.75rem;
                    color: #374151;
                    margin-top: 0.25rem;
                }
                
                .table-container {
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
                    overflow-x: auto;
                    border-bottom: 1px solid #E5E7EB;
                    border-radius: 0.5rem;
                }
                
                .breakdown-table {
                    width: 100%;
                    border-collapse: collapse;
                    background-color: white;
                }
                
                .table-header {
                    background-color: #F9FAFB;
                    display: none;
                }
                
                @media (min-width: 640px) {
                    .table-header {
                        display: table-header-group;
                    }
                }
                
                .table-header th {
                    padding: 0.75rem 1.5rem;
                    text-align: left;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #6B7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .table-header th:last-child {
                    text-align: right;
                }
                
                .table-body {
                    background-color: white;
                }
                
                .table-row {
                    display: flex;
                    flex-direction: column;
                    border-top: 1px solid #E5E7EB;
                    padding: 1rem;
                }
                
                @media (min-width: 640px) {
                    .table-row {
                        display: table-row;
                        border-top: none;
                        padding: 0;
                    }
                }
                
                .table-cell {
                    display: block;
                    font-size: 0.875rem;
                }
                
                @media (min-width: 640px) {
                    .table-cell {
                        display: table-cell;
                        padding: 1rem 1.5rem;
                    }
                }
                
                .table-cell.item-name {
                    color: #1F2937;
                }
                
                .table-cell.item-details {
                    color: #6B7280;
                }
                
                .table-cell.item-amount {
                    text-align: right;
                    font-weight: 700;
                    font-size: 1.125rem;
                    margin-top: 0.5rem;
                }
                
                @media (min-width: 640px) {
                    .table-cell.item-amount {
                        font-weight: 400;
                        font-size: 0.875rem;
                        color: #1F2937;
                        margin-top: 0;
                    }
                }
                
                .mobile-label {
                    display: block;
                    font-weight: 700;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    color: #6B7280;
                    margin-bottom: 0.125rem;
                }
                
                @media (min-width: 640px) {
                    .mobile-label {
                        display: none;
                    }
                }
                
                .mobile-label.details-label {
                    margin-top: 0.5rem;
                }
                
                .total-section {
                    margin-top: 1.5rem;
                }
                
                .total-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #F9FAFB;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    border: 2px solid #E5E7EB;
                }
                
                .total-label {
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: #183e63;
                }
                
                .total-amount {
                    font-size: 1.875rem;
                    font-weight: 800;
                    color: #183e63;
                }
                
                .total-period {
                    font-size: 1.125rem;
                }
                
                .hidden {
                    display: none;
                }
                
                .note-text {
                    color: hotpink;
                }
            </style>
        `;
    }
    
    getTemplate() {
        return `
            <div class="calculator-container">
                <div>
                    <div class="card">
                        <h2 class="section-header">Input Parameters</h2>
                        <div class="form-section">
                            <p class="note-text">Note explaining that customer class no longer applies anymore?</p>

                            <div id="customerClassContainer" class="customer-class-container">
                                <div class="form-group">
                                    <label for="customerClass" class="form-label">
                                        Customer Class
                                    </label>
                                    <select id="customerClass" class="input-style">
                                        <option value="Single Family" selected>Single Family</option>
                                        <option value="Multi-Family">Multi-Family</option>
                                        <option value="Non-Residential">Non-Residential</option>
                                    </select>
                                </div>
                                
                                <div id="multiFamilyUnitsDiv" class="form-group hidden">
                                    <label for="multiFamilyUnits" class="form-label">
                                        Number of Dwelling Units
                                    </label>
                                    <input type="number" id="multiFamilyUnits" value="2" min="2" step="1" class="input-style">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="meterSize" class="form-label">Meter Size</label>
                                <select id="meterSize" class="input-style">
                                    <option value="5/8&quot; X 3/4&quot;" selected>5/8" X 3/4"</option>
                                    <option value="3/4&quot;">3/4"</option>
                                    <option value="1&quot;">1"</option>
                                    <option value="1 1/2&quot;">1 1/2"</option>
                                    <option value="2&quot;">2"</option>
                                    <option value="3&quot;">3"</option>
                                    <option value="4&quot;">4"</option>
                                    <option value="6&quot;">6"</option>
                                    <option value="8&quot;">8"</option>
                                    <option value="10&quot;">10"</option>
                                    <option value="12&quot;">12"</option>
                                </select>
                            </div>

                            <div class="usage-grid">
                                <div class="form-group">
                                    <label for="potableUsage" class="form-label">Potable Usage (ccf)</label>
                                    <input type="number" id="potableUsage" value="20" min="0" step="1" class="input-style">
                                    <p class="input-hint">ccf = 100 cubic feet</p>
                                </div>

                                <div class="form-group">
                                    <label for="recycledUsage" class="form-label">Recycled Usage (ccf)</label>
                                    <input type="number" id="recycledUsage" value="0" min="0" step="1" class="input-style">
                                </div>
                            </div>

                            <div class="additional-charges">
                                <p class="additional-charges-label">Additional Charges:</p>
                                <div class="checkbox-group">
                                    <input type="checkbox" id="fireLine" class="checkbox-input">
                                    <label for="fireLine" class="checkbox-label">Include Fire Line</label>
                                </div>
                                
                                <div class="checkbox-group">
                                    <input type="checkbox" id="fogCharge" class="checkbox-input">
                                    <label for="fogCharge" class="checkbox-label">Include FOG Charge</label>
                                </div>
                            </div>
                        </div>

                        <button id="calculateButton" class="calculate-button">
                            Calculate Bill Estimate
                        </button>
                    </div>
                </div>

                <div>
                    <div id="yearTabs"></div>

                    <div class="card results-card">
                        <div id="inputSummary" class="input-summary"></div>

                        <div id="detailedResults" class="detailed-results">
                            <p class="no-results-message">Press 'Calculate Bill Estimate' to see the detailed breakdown.</p>
                        </div>
                        
                        <div id="totalSection" class="total-section"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    attachEventListeners() {
        const shadow = this.shadowRoot;
        
        // Customer class change
        const customerClassSelect = shadow.getElementById('customerClass');
        customerClassSelect.addEventListener('change', () => this.toggleUnitsVisibility());
        
        // Calculate button
        const calculateButton = shadow.getElementById('calculateButton');
        calculateButton.addEventListener('click', () => this.calculateBill());
        
        // Initial visibility check
        this.toggleUnitsVisibility();
    }
    
    toggleUnitsVisibility() {
        const shadow = this.shadowRoot;
        const customerClassSelect = shadow.getElementById('customerClass');
        const unitsDiv = shadow.getElementById('multiFamilyUnitsDiv');
        
        if (customerClassSelect.value === 'Multi-Family' || customerClassSelect.value === 'Multi Family') {
            unitsDiv.classList.remove('hidden');
            const unitsInput = shadow.getElementById('multiFamilyUnits');
            if (parseInt(unitsInput.value) < 2) {
                unitsInput.value = 2;
            }
        } else {
            unitsDiv.classList.add('hidden');
        }
    }
    
    calculateYearlyBill(meterSize, potableUsage, recycledUsage, includeFireLine, includeFOG, fiscalYear) {
        let commodityItems = [];
        let totalCommodity = 0;
        let fixedItems = [];
        let totalFixed = 0;

        const retailFixedCharge = (this.RATES.retailFixed[fiscalYear] || {})[meterSize] || 0;
        if (retailFixedCharge > 0) {
            totalFixed += retailFixedCharge;
            fixedItems.push({
                name: "Retail Fixed (Water Readiness)",
                amount: retailFixedCharge,
                isFixed: true,
                order: 1,
            });
        }

        const sewerFixedCharge = (this.RATES.sewerFixed[fiscalYear] || {})[meterSize] || 0;
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
            const fireFixedCharge = (this.RATES.fireFixed[fiscalYear] || {})[meterSize] || 0;
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
            const fogCharge = this.RATES.fogCharges[fiscalYear] || 0;
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

        const commodityRates = this.RATES.commodityRates[fiscalYear];
        const tier1Allocation = this.RATES.tier1Allocations[meterSize] || 0;

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
    
    calculateCurrentBill(meterSize, potableUsage, recycledUsage, includeFOG, customerClass, multiFamilyUnits = 1) {
        const classKey = this.CLASS_KEY_MAP[customerClass] || "singleFamily";
        const isMultiFamily = classKey === "multiFamily";

        const retailFixedBi = this.RATES.currentRetailFixed[meterSize] || 0;

        const sewerFixedTable =
            (this.RATES.currentSewerFixed && this.RATES.currentSewerFixed[classKey]) ||
            this.RATES.currentSewerFixed.singleFamily ||
            {};
        const sewerFixedBi = sewerFixedTable[meterSize] || 0;

        const fogBi = includeFOG ? (this.RATES.currentFogCharge || 0) : 0;

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

        const commodityRates = this.RATES.currentCommodityRates || {};

        const tier1AllocationsByClass =
            (this.RATES.currentTier1Allocations &&
                this.RATES.currentTier1Allocations[classKey]) ||
            this.RATES.currentTier1Allocations.singleFamily ||
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
    
    calculateBill(initialYear = this.activeYear) {
        const shadow = this.shadowRoot;
        
        const meterSize = shadow.getElementById("meterSize").value;
        const potableUsage = parseFloat(shadow.getElementById("potableUsage").value) || 0;
        const recycledUsage = parseFloat(shadow.getElementById("recycledUsage").value) || 0;
        const includeFireLine = shadow.getElementById("fireLine").checked;
        const includeFOG = shadow.getElementById("fogCharge").checked;

        const customerClassEl = shadow.getElementById("customerClass");
        const customerClass = customerClassEl ? customerClassEl.value : "Single Family";
        
        let multiFamilyUnits = 1;
        if (customerClass.toLowerCase().includes("multi")) {
            multiFamilyUnits = parseFloat(shadow.getElementById("multiFamilyUnits")?.value) || 1;
        }
        this.currentMultiFamilyUnits = multiFamilyUnits;

        const cleanMeterSize = meterSize.split("(")[0].trim();

        for (const year of this.FISCAL_YEARS) {
            this.lastCalculatedResults[year] = this.calculateYearlyBill(
                cleanMeterSize,
                potableUsage,
                recycledUsage,
                includeFireLine,
                includeFOG,
                year
            );
        }

        this.currentResult = this.calculateCurrentBill(
            cleanMeterSize,
            potableUsage,
            recycledUsage,
            includeFOG,
            customerClass,
            multiFamilyUnits
        );

        this.renderYearTabs();
        const displayYear =
            this.activeYear === "Current" || this.FISCAL_YEARS.includes(this.activeYear)
                ? this.activeYear
                : this.FISCAL_YEARS[0];

        this.showDetailedBreakdown(displayYear);
    }
    
    renderYearTabs() {
        const shadow = this.shadowRoot;
        const yearTabsEl = shadow.getElementById("yearTabs");
        yearTabsEl.innerHTML = "";

        if (this.currentResult) {
            const isActive = this.activeYear === "Current";

            const currentTab = document.createElement("div");
            currentTab.className = `tab${isActive ? " active" : ""}`;
            currentTab.addEventListener('click', () => this.showDetailedBreakdown('Current'));

            currentTab.innerHTML = `
                <div class="tab-year">Current</div>
                <div class="tab-amount">
                    ${this.currentResult.totalBill.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                    <span class="tab-period">/month</span>
                </div>
            `;
            yearTabsEl.appendChild(currentTab);
        }

        this.FISCAL_YEARS.forEach((year) => {
            const result = this.lastCalculatedResults[year];
            const isActive = year === this.activeYear;

            const tabHtml = document.createElement("div");
            tabHtml.className = `tab${isActive ? " active" : ""}`;
            tabHtml.addEventListener('click', () => this.showDetailedBreakdown(year));

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
    
    showDetailedBreakdown(year) {
        this.activeYear = year;
        
        const shadow = this.shadowRoot;
        const detailedResultsEl = shadow.getElementById("detailedResults");
        const inputSummaryEl = shadow.getElementById("inputSummary");
        const totalSectionEl = shadow.getElementById("totalSection");

        const isCurrent = year === "Current";
        const result = isCurrent ? this.currentResult : this.lastCalculatedResults[year];

        if (!result) return;

        const meterSize = shadow.getElementById("meterSize").value.split("(")[0].trim();
        const potableUsage = shadow.getElementById("potableUsage").value;
        const recycledUsage = shadow.getElementById("recycledUsage").value;
        const includeFireLine = shadow.getElementById("fireLine").checked;
        const includeFOG = shadow.getElementById("fogCharge").checked;

        const customerClassEl = shadow.getElementById("customerClass");
        const customerClass = customerClassEl ? customerClassEl.value : "Single Family";
        
        const multiFamilyUnits = this.currentMultiFamilyUnits || 1;

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

        this.renderYearTabs();
    }
}

// Define the custom element
customElements.define('water-rate-calculator', WaterRateCalculator);