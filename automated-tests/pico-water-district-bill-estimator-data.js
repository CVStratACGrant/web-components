const { fieldTypes } = require('./utils/form-utils.js');

const picoFieldLegend = {
    'year-select-menu': fieldTypes.option,
    'meter-size-select-menu': fieldTypes.option,
    'ccf-billed-for-potable-water-input': fieldTypes.text,
    'recycled-water-service-select-menu': fieldTypes.option,
    'ccf-billed-for-recycled-water-input': fieldTypes.conditionalText,
    'private-fire-connection-select-menu': fieldTypes.option,
    'private-fire-connection-size-select-menu': fieldTypes.conditionalOption,
};

const picoData = [
    {
        expected: 65.87,
        formData: [
            { name: 'year-select-menu', value: '2024' },
            { name: 'meter-size-select-menu', value: '5/8-inch' },
            { name: 'ccf-billed-for-potable-water-input', value: '10' },
            { name: 'recycled-water-service-select-menu', value: 'false' },
            { name: 'private-fire-connection-select-menu', value: 'false' },
        ],
    },
    {
        expected: 176.05,
        formData: [
            { name: 'year-select-menu', value: '2025' },
            { name: 'meter-size-select-menu', value: '1-inch' },
            { name: 'ccf-billed-for-potable-water-input', value: '20' },
            { name: 'recycled-water-service-select-menu', value: 'true' },
            { name: 'ccf-billed-for-recycled-water-input', value: '5' },
            { name: 'private-fire-connection-select-menu', value: 'false' },
        ],
    },
    {
        expected: 2041.52,
        formData: [
            { name: 'year-select-menu', value: '2026' },
            { name: 'meter-size-select-menu', value: '6-inch' },
            { name: 'ccf-billed-for-potable-water-input', value: '100' },
            { name: 'recycled-water-service-select-menu', value: 'false' },
            { name: 'private-fire-connection-select-menu', value: 'true' },
            { name: 'private-fire-connection-size-select-menu', value: '4-inch' },
        ],
    },
];

module.exports = {
    picoFieldLegend,
    picoData
}