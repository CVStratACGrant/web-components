import puppeteer from 'puppeteer';
import { 
  fieldTypes, 
  singleFamilyResidentialData, 
  singleFamilyResidentialFieldLegend, 
  nonSingleFamilyResidentialData, 
  nonSingleFamilyResidentialFieldLegend 
} from './data.js';

describe('Integration Tests', () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            timeout: 20000,
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 30000)); // uncomment to see the test window for longer
        await browser.close();
    });

    const clearFieldText = async (page, fieldHandle) => {
        await fieldHandle.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
    }

    const fillFields = async (page, formData, legend) => {
        for (const { name, value, triggerSelector } of formData) {
            const fieldType = legend[name];
            const fieldSelector = `[name="${name}"]`;
            const fieldHandle = await page.$(fieldSelector);

            if (triggerSelector && Array.isArray(value)) {
                for (let i = 1; i < value.length; i++) {
                    await page.click(triggerSelector);
                }
            }

            switch (fieldType) {
                case fieldTypes.date:
                    const [year, month, day] = value.split('-');
                    const typeableDate = `${month}${day}${year}`;
                    await fieldHandle.type(typeableDate);
                    break;

                case fieldTypes.text:
                case fieldTypes.conditionalText:
                    await clearFieldText(page, fieldHandle);
                    await fieldHandle.type(value);
                    break;

                case fieldTypes.option:
                case fieldTypes.conditionalOption:
                    await fieldHandle.select(value);
                    break;

                case fieldTypes.multiText:
                    const textFields = await page.$$(fieldSelector);
                    for (let i = 0; i < textFields.length; i++) {
                        await clearFieldText(page, textFields[i]);
                        await textFields[i].type(value[i]);
                    }
                    break;

                case fieldTypes.multiOption:
                case fieldTypes.conditionalMultiOption:
                    const selects = await page.$$(fieldSelector);
                    for (let i = 0; i < selects.length; i++) {
                        await selects[i].select(value[i]);
                    }
                    break;

                default:
                    throw new Error(`Unknown field type for ${name}`);
            }
        }
    }

    const fillForm = async (page, formData, legend) => {
        const normalFields = [];
        const conditionalFields = [];

        for (const formDataItem of formData) {
            if (!legend[formDataItem.name].includes('conditional')) normalFields.push(formDataItem);
            else conditionalFields.push(formDataItem);  
        }

        await fillFields(page, normalFields, legend);
        await new Promise(resolve => setTimeout(resolve, 200));
        await fillFields(page, conditionalFields, legend);
        await page.click('[type="submit"]');

        return await page.$eval('table > tbody > tr > td', (element) => +element.innerText.replace(/[$,]/g, ''));
    };

    for (const nonSingleFamilyResidentialDataBlock of nonSingleFamilyResidentialData) {
        test('Non-Single-Family Residential', async () => {
            await page.goto('http://127.0.0.1:5500/city-of-ontario-bill-estimator/index.html');
            const result = await fillForm(page, nonSingleFamilyResidentialDataBlock.formData, nonSingleFamilyResidentialFieldLegend);
            expect(result).toBe(nonSingleFamilyResidentialDataBlock.expected);
        });
    }

    // for (const singleFamilyResidentialDataBlock of singleFamilyResidentialData) {
    //     test('Single-Family Residential', async () => {
    //         await page.goto('http://127.0.0.1:5500/city-of-ontario-bill-estimator/index.html');
    //         const result = await fillForm(page, singleFamilyResidentialDataBlock.formData, singleFamilyResidentialFieldLegend);
    //         expect(result).toBe(singleFamilyResidentialDataBlock.expected);
    //     });
    // }
});
