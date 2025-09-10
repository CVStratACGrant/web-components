const {
    indioFieldLegend,
    indioData,
} = require('./indio-water-authority-bill-estimator-data.js');
const { fillForm } = require('./utils/form-utils.js');
const { launchBrowser, teardownBrowser } = require('./utils/test-utils.js');

describe('Indio Water Authority Bill Estimator Integration Tests', () => {
    let browser, page;

    const resultSelector = 'table > tbody > tr > td';

    beforeAll(async () => {
        ({ browser, page, serverUrl } = await launchBrowser(false));
    });

    afterAll(async () => {
        await teardownBrowser(browser);
    });

    for (const indioDataBlock of indioData) {
        test('Non-Residential', async () => {
            page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));
            await page.goto(`${serverUrl}/indio-water-authority-bill-estimator/index.html`);
            const result = await fillForm(page, indioDataBlock.formData, indioFieldLegend, resultSelector);
            expect(result).toBe(indioDataBlock.expected);
        });
    }
});