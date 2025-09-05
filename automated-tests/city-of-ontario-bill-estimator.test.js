const {
  singleFamilyResidentialData: ontarioSingleFamilyResidentialData,
  ontarioSingleFamilyResidentialFieldLegend,
  ontarioNonSingleFamilyResidentialData,
  ontarioNonSingleFamilyResidentialFieldLegend,
} = require('./city-of-ontario-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('City of Ontario Bill Estimator Integration Tests', () => {
    let browser, page;

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser());
    });

    afterAll(async () => {
        await teardownBrowser(browser);
    });

    for (const nonSingleFamilyResidentialDataBlock of ontarioNonSingleFamilyResidentialData) {
        test('Non-Single-Family Residential', async () => {
            await page.goto(`${serverUrl}/city-of-ontario-bill-estimator/index.html`);
            const result = await fillForm(page, nonSingleFamilyResidentialDataBlock.formData, ontarioNonSingleFamilyResidentialFieldLegend);
            expect(result).toBe(nonSingleFamilyResidentialDataBlock.expected);
        });
    }

    for (const singleFamilyResidentialDataBlock of ontarioSingleFamilyResidentialData) {
        test('Single-Family Residential', async () => {
            await page.goto(`${serverUrl}/city-of-ontario-bill-estimator/index.html`);
            const result = await fillForm(page, singleFamilyResidentialDataBlock.formData, ontarioSingleFamilyResidentialFieldLegend);
            expect(result).toBe(singleFamilyResidentialDataBlock.expected);
        });
    }
});
