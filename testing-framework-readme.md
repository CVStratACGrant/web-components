

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

### Testing & Configuration Notes

**Rule of thumb:**

* **Live Server Plugin** → prefix with `./`
* **Puppeteer** → prefix with `/<directory-name>/`
* **Live** → use the full GitHub Pages URL

#### 1. Errors from mismatched conditions

When a single condition in the test data doesn’t align with the form logic, Puppeteer may hang with no error in the console or logs. For example:

```js
{
  expected: 272.39,
  formData: [
    { name: 'bill-estimator-type-menu', value: 'Irrigation' },
    { name: 'backflow-device-testing', value: 'Backflow Device Testing - 1 1/2", and 2"' },
    { name: 'base-charge', value: '169.26' },
    { name: 'meter-size', value: 'not-sure' },
    { name: 'tier-1-billing-units-water-usage', value: '5' },
    { name: 'current-billing-units-water-usage', value: '25' },
    { name: 'current-billing-units-total-water-budget', value: '5' },
    { name: 'dedicated-fire-line-included', value: 'false' }, // set to false
    { name: 'dedicated-fire-line-charge', value: '60.00' },   // but a value is still provided
    { name: 'current-billing-cycle-days', value: '30' },
    { name: 'customer-class', value: '' },
  ],
}
```
In this case, `dedicated-fire-line-included` is `"false"`, which hides the corresponding charge input. However, the test still attempts to fill it, leaving a hidden `required` field with a value. The browser blocks form submission through native validation, but this error is silent — the test just hangs and eventually times out. Always ensure that conditional inputs are only populated when their controlling field is set appropriately.


```js
{
  expected: 189.94,
  formData: [
    { name: 'bill-estimator-type-menu', value: 'Irrigation' },
    { name: 'backflow-device-testing', value: 'Backflow Device Testing - 5/8", 3/4", 1"' },
    { name: 'base-charge', value: '52.90' },
    { name: 'meter-size', value: 'not-sure' },
    { name: 'tier-1-billing-units-water-usage', value: '41' },
    { name: 'current-billing-units-water-usage', value: '62' },
    { name: 'current-billing-units-total-water-budget', value: '43' },
    { name: 'dedicated-fire-line-included', value: 'false' },
    { name: 'current-billing-cycle-days', value: '28' }, // not a field for this bill estimator type
  ],
},
```
In this case, the bill estimator type is set to `Irrigation` which does not trigger the `current-billing-cycle-days` field. However, because it is included in the object, the automation attempts to trigger it and consequently the browser silently fails resulting in the form hanging and the test breaking. Fields that would not accessible to automation during a particular workflow should not be included in the object.


```js
const ontarioNonSingleFamilyResidentialFieldLegend = {
  'bill-estimator-type-menu': fieldTypes.option,
  'billing-cycle-start': fieldTypes.date,
  'billing-cycle-end': fieldTypes.date,
  'current-ccf-usages': fieldTypes.multiText,
  'sewer-base-charges': fieldTypes.multiText,
  'meter-types-and-sizes': fieldTypes.multiOption,
  'inland-empire-utilities-agency-charges': fieldTypes.multiText,
  'stormwater-base-charges': fieldTypes.multiText,
  'waste-bin-types-and-sizes': fieldTypes.multiOption,
  'weekly-pickups': fieldTypes.multiText,
  'scouting-service-included': fieldTypes.option,
  'scouting-service-charge': fieldTypes.conditionalText,
  'dedicated-fire-line-included': fieldTypes.option,
  'dedicated-fire-line-sizes': fieldTypes.conditionalMultiOption,
}

const ontarioSingleFamilyResidentialFieldLegend = {
  'bill-estimator-type-menu': fieldTypes.option,
  'billing-cycle-start': fieldTypes.date,
  'billing-cycle-end': fieldTypes.date,
  'current-ccf-usages': fieldTypes.text,
  'sewer-base-charges': fieldTypes.text,
  'meter-types-and-sizes': fieldTypes.option,
  'inland-empire-utilities-agency-charges': fieldTypes.text,
  'stormwater-base-charges': fieldTypes.text,
  'waste-bin-types-and-sizes': fieldTypes.option,
  'weekly-pickups': fieldTypes.text,
  'scouting-service-included': fieldTypes.option,
  'scouting-service-charge': fieldTypes.conditionalText,
  'dedicated-fire-line-included': fieldTypes.option,
  'dedicated-fire-line-sizes': fieldTypes.conditionalOption,
}

const triggerSelectors = {
  'dedicated-fire-line-sizes': '[data-field-name="dedicated-fire-line-sizes"][data-action="append"]',
  'meter-types-and-sizes': '[data-field-name="meter-types-and-sizes"][data-action="append"]',
  'sewer-base-charges': '[data-field-name="sewer-base-charges"][data-action="append"]',
  'stormwater-base-charges': '[data-field-name="stormwater-base-charges"][data-action="append"]',
  'waste-bin-types-and-sizes': '[data-field-name="waste-bin-types-and-sizes"][data-action="append"]',
}
```
Legends are used by the automation to treat each field appropriately. Grouped multi-fields (e.g., `multiText`, `multiOption`) have a `triggerSelector` that must be clicked the appropriate amount of times to reveal all the necessary fields of that type. Several multi-field types can map to the same trigger selector which is derived from the form. Conditional fields (e.g., `conditionalOption`,  `conditionalText`) are triggered by another field in the form and are thus all grouped together and run after the unconditional fields. Legends allow for tests to be agnostic of test object field order. So long as the legend is accurate, developers can order the fields however they want.
---

#### 2. Local vs Live script paths

Because the estimator is bundled as a web component, the `<script>` paths need to be changed depending on the environment:

**HTML Example**

```html
<!-- Local Live Server Plugin -->
<script src="script.js" type="module"></script>

<!-- Local Puppeteer Testing -->
<script src="indio-water-authority-bill-estimator/script.js" type="module"></script>

<!-- Live -->
<script src="https://cvstratacgrant.github.io/web-components/indio-water-authority-bill-estimator/script.js" type="module"></script>
```

**Component Example (connectedCallback excerpt)**

```js
async connectedCallback() {
  try {
    // Live Server Plugin
    // await this.loadScript('./water-core.js');

    // Puppeteer
    // await this.loadScript('indio-water-authority-bill-estimator/water-core.js');

    // Live
    await this.loadScript('https://cvstratacgrant.github.io/web-components/indio-water-authority-bill-estimator/water-core.js');
  } catch (error) {
    console.error('Failed to load scripts:', error);
  }
}
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