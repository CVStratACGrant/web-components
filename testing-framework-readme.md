

## New Testing Framework

### Individual Projects
```shell
cd tests
npm test main.test.js
```

### All Projects
```shell
npm test
```


## Old Testing Framework for Bill Estimators
```html
<button id="test-functions-button">Test</button>
```

```js
/**
 ********************* TESTING *********************
*/
 
const testCases = [
  { /** CUSTOM: NOT DERIVED FROM A SAMPLE BILL */
    expected: 1201.13,
    customerGroup: 'Non-Residential',
    customerClass: 'Industrial',
    multiInputTriggerFieldNames: [['dedicated-fire-line-included', 'true']],
    formData: {
      'billing-cycle-start': '2025-03-18',
      'billing-cycle-end': '2025-04-16',
      'current-ccf-usages': '15',
      'sewer-base-charges': '21.15',
      'meter-types-and-sizes': 'Water|3"',
      'inland-empire-utilities-agency-charges': '27.11',
      'stormwater-base-charges': '7.30',
      'waste-bin-types-and-sizes': ['Recycling|1.5 YD', 'Organics|32 Gal', 'Refuse|4 YD', 'Refuse|4 YD'],
      'weekly-pickups': ['1', '1', '1', '2'],
      'scouting-service-included': 'false',
      'scouting-service-charge': '',
      'dedicated-fire-line-included': 'true',
      'dedicated-fire-line-sizes': ['Private Fire Line|2"', 'Private Fire Line|6"'],
    }
  },
];

async function runAllSimulations() {
  const results = [];

  for (const [i, testCase] of testCases.entries()) {
    console.log(`🔄 Running Test Case #${i + 1}`);

    /** 🧹 Step 0: Clear leftover dynamic fields from previous test */
    Object.entries(testCase.formData).forEach(([key, value]) => {
      const allFields = document.querySelectorAll(`[name="${key}"]`);
      if (allFields.length > 1) {
        const removeButtons = document.querySelectorAll(`button[data-action=""][data-field-name="${key}"]`);
        for (let i = allFields.length - 1; i > 0; i--) {
          removeButtons[i - 1]?.click();
        }
      }
    });

    customerData.customerGroup = testCase.customerGroup;
    customerData.customerClass = testCase.customerClass;
    billEstimatorTypeMenu.value = testCase.customerClass;
    const multiInputTriggerFieldNames = testCase.multiInputTriggerFieldNames;
    handleFormFields();

    /** Step 1: Conditionally displayed multi inputs need to have their 
     * accompanying element selected before the append buttons are clicked
     */
    if (Array.isArray(multiInputTriggerFieldNames)) {
      multiInputTriggerFieldNames.forEach(([multiInputTriggerFieldName, value]) => {
        const multiInputTrigger = document.querySelector(`[name="${multiInputTriggerFieldName}"]`);
        if (!multiInputTrigger) return;

        if (multiInputTrigger.tagName === "SELECT") {
          multiInputTrigger.value = value;
          multiInputTrigger.dispatchEvent(new Event("change", { bubbles: true }));
        } else if (multiInputTrigger.type === "checkbox" || multiInputTrigger.type === "radio") {
          multiInputTrigger.checked = multiInputTrigger.value == value;
          multiInputTrigger.dispatchEvent(new Event("change", { bubbles: true }));
          multiInputTrigger.dispatchEvent(new Event("click", { bubbles: true }));
        } else {
          multiInputTrigger.value = String(value);
          multiInputTrigger.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    }

    // Step 2: Add dynamic inputs if needed
    Object.entries(testCase.formData).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 1) {
        const addButton = document.querySelector(`button[data-action="append"][data-field-name="${key}"]`);
        if (!addButton) return;
        
        const existingFields = document.querySelectorAll(`[name="${key}"]`);
        const needed = value.length - existingFields.length;
        
        for (let i = 0; i < needed; i++) {
          addButton.click();
        }
      }
    });

    // Step 3: Assign values to all inputs
    Object.entries(testCase.formData).forEach(([key, value]) => {
      const elements = document.querySelectorAll(`[name="${key}"], #${key}`);
      elements.forEach((el, idx) => {
        const val = Array.isArray(value) ? value[idx] : value;
        if (el.tagName === "SELECT") el.value = val;
        else if (el.type === "checkbox" || el.type === "radio") el.checked = el.value == val;
        else el.value = String(val);
      });
    });

    // Submit the form and wait
    const form = document.querySelector("form");
    if (form) {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      await new Promise(r => setTimeout(r, 300));
    }

    // Parse and compare result
    const resultEl = document.querySelector("tbody tr td");
    const actualText = resultEl?.textContent?.trim()?.replace(/[^0-9.]/g, '') || "";
    const actual = parseFloat(actualText);
    const match = Math.abs(actual - testCase.expected) < 0.01;

    results.push({
      case: `${i + 1}: ${testCase.customerClass}`,
      expected: testCase.expected,
      actual,
      match
    });
  }

  console.table(results);
}

// **Button Click Event to Run Simulation**
const testFunctionsButton = document.getElementById('test-functions-button');
testFunctionsButton.addEventListener('click', runAllSimulations);
```