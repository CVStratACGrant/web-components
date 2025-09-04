const {
  singleFamilyResidentialData,
  singleFamilyResidentialFieldLegend,
  nonSingleFamilyResidentialData,
  nonSingleFamilyResidentialFieldLegend,
} = require('./city-of-ontario-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('Integration Tests', () => {
    let browser, page;

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser());
    });

    afterAll(async () => {
        await teardownBrowser(browser);
    });

    for (const nonSingleFamilyResidentialDataBlock of nonSingleFamilyResidentialData) {
        test('Non-Single-Family Residential', async () => {
            await page.goto(`${serverUrl}/city-of-ontario-bill-estimator/index.html`);
            const result = await fillForm(page, nonSingleFamilyResidentialDataBlock.formData, nonSingleFamilyResidentialFieldLegend);
            expect(result).toBe(nonSingleFamilyResidentialDataBlock.expected);
        });
    }

    for (const singleFamilyResidentialDataBlock of singleFamilyResidentialData) {
        test('Single-Family Residential', async () => {
            await page.goto(`${serverUrl}/city-of-ontario-bill-estimator/index.html`);
            const result = await fillForm(page, singleFamilyResidentialDataBlock.formData, singleFamilyResidentialFieldLegend);
            expect(result).toBe(singleFamilyResidentialDataBlock.expected);
        });
    }
});
