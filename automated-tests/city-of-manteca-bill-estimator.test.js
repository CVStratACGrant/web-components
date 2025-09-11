const {
    mantecaFieldLegend,
    mantecaData,
} = require('./city-of-manteca-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('City of Manteca Bill Estimator Integration Tests', () => {
    let browser, page;

    const resultSelector = 'table > tbody > tr > td:nth-child(2)';

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser());
    });

    afterAll(async () => {
        await teardownBrowser(browser);
    });

    for (const mantecaDataBlock of mantecaData) {
        test('All Customer Types', async () => {
            await page.goto(`${serverUrl}/city-of-manteca-bill-estimator/index.html`);
            const result = await fillForm(page, mantecaDataBlock.formData, mantecaFieldLegend, resultSelector);
            expect(result).toBe(mantecaDataBlock.expected);
        });
    }
});