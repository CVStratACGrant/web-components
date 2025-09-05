const {
    mantecaFieldLegend,
    mantecaNonResidentialData,
    mantecaResidentialData,
    mantecaIndustrialData,
} = require('./city-of-manteca-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('City of Manteca Bill Estimator Integration Tests', () => {
    let browser, page;

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser(false));
    });

    afterAll(async () => {
        await teardownBrowser(browser, true);
    });

    for (const mantecaNonResidentialDataBlock of mantecaNonResidentialData) {
        test('Non-Residential', async () => {
            await page.goto(`${serverUrl}/city-of-manteca-bill-estimator/index.html`);
            const result = await fillForm(page, mantecaNonResidentialDataBlock.formData, mantecaFieldLegend);
            expect(result).toBe(mantecaNonResidentialDataBlock.expected);
        });
    }

    for (const mantecaResidentialDataBlock of mantecaResidentialData) {
        test('Residential', async () => {
            await page.goto(`${serverUrl}/city-of-manteca-bill-estimator/index.html`);
            const result = await fillForm(page, mantecaResidentialDataBlock.formData, mantecaFieldLegend);
            expect(result).toBe(mantecaResidentialDataBlock.expected);
        });
    }

    for (const mantecaIndustrialDataBlock of mantecaIndustrialData) {
        test('Industrial', async () => {
            await page.goto(`${serverUrl}/city-of-manteca-bill-estimator/index.html`);
            const result = await fillForm(page, mantecaIndustrialDataBlock.formData, mantecaFieldLegend);
            expect(result).toBe(mantecaIndustrialDataBlock.expected);
        });
    }
});