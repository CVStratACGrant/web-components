const {
    picoFieldLegend,
    picoData,
} = require('./pico-water-district-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('Pico Water District Bill Estimator Integration Tests', () => {
    let browser, page;

    const resultSelector = 'div#calculation-result-div';

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser());
    });

    afterAll(async () => {
        await teardownBrowser(browser);
    });

    for (const picoDataBlock of picoData) {
        test('All Customer Types', async () => {
            await page.goto(`${serverUrl}/pico-water-district-bill-estimator/index.html`);
            const result = await fillForm(page, picoDataBlock.formData, picoFieldLegend, resultSelector, false);
            expect(result).toBe(picoDataBlock.expected);
        });
    }
});