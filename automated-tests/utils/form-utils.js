const fieldTypes = {
    conditionalMultiOption: 'conditionalMultiOption',
    conditionalOption: 'conditionalOption',
    conditionalText: 'conditionalText',
    date: 'date',
    multiOption: 'multiOption',
    multiText:'multiText',
    option: 'option',
    text: 'text',
}

const clearFieldText = async (page, fieldHandle) => {
    await fieldHandle.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
}

const fillFields = async (page, formData, legend) => {
    const visited = new Set();

    for (const { name, value, triggerSelector } of formData) {
        const fieldType = legend[name];
        const fieldSelector = `[name="${name}"]`;
        const fieldHandle = await page.waitForSelector(fieldSelector, { visible: true });

        if (triggerSelector && !visited.has(triggerSelector) && Array.isArray(value)) {
            for (let i = 1; i < value.length; i++) {
                await page.click(triggerSelector);
            }
            visited.add(triggerSelector);
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

const fillForm = async (page, formData, legend, resultSelector, clickSubmit = true) => {
    const normalFields = [];
    const conditionalFields = [];

    
    for (const formDataItem of formData) {
        if (!legend[formDataItem.name].includes('conditional')) normalFields.push(formDataItem);
        else conditionalFields.push(formDataItem);  
    }
    
    await fillFields(page, normalFields, legend);
    await new Promise(resolve => setTimeout(resolve, 200));
    await fillFields(page, conditionalFields, legend);
    if (clickSubmit) await page.click('[type="submit"]');

    return await page.$eval(resultSelector, (element) => +element.innerText.replace(/[$,]/g, ''));
}

module.exports = {
    clearFieldText,
    fieldTypes,
    fillFields,
    fillForm,
}