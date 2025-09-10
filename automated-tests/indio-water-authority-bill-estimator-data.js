const { fieldTypes } = require('./utils/form-utils.js');

const indioFieldLegend = {
  'bill-estimator-type-menu': fieldTypes.option,
  'customer-class': fieldTypes.option,
  'current-billing-cycle-days': fieldTypes.text,
  'dwelling-units': fieldTypes.conditionalText,
  'meter-size': fieldTypes.option,
  'base-charge': fieldTypes.conditionalText,
  'tier-1-billing-units-water-usage': fieldTypes.text,
  'current-billing-units-water-usage': fieldTypes.text,
  'current-billing-units-total-water-budget': fieldTypes.text,
  'dedicated-fire-line-included': fieldTypes.option,
  'dedicated-fire-line-charge': fieldTypes.conditionalText,
  'backflow-device-testing': fieldTypes.option,
};

const indioData = [
  {
    expected: 85.00,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Non-Residential' },
      { name: 'meter-size', value: '3/4"' },

      { name: 'tier-1-billing-units-water-usage', value: '0' },
      { name: 'current-billing-units-water-usage', value: '6' },
      { name: 'current-billing-units-total-water-budget', value: '0' },

      { name: 'dedicated-fire-line-included', value: 'true' },
      { name: 'dedicated-fire-line-charge', value: '25.00' },
      { name: 'backflow-device-testing', value: 'Backflow Device Testing - 6" and Over' },
    ],
  },
  {
    expected: 272.39,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Non-Residential' },
      { name: 'meter-size', value: '3/4"' },

      { name: 'tier-1-billing-units-water-usage', value: '5' },
      { name: 'current-billing-units-water-usage', value: '25' },
      { name: 'current-billing-units-total-water-budget', value: '5' },

      { name: 'dedicated-fire-line-included', value: 'false' },
      { name: 'backflow-device-testing', value: '' },
    ],
  },
  {
    expected: 415.28,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Non-Residential' },
      { name: 'meter-size', value: '1"' },

      { name: 'tier-1-billing-units-water-usage', value: '77' },
      { name: 'current-billing-units-water-usage', value: '166' },
      { name: 'current-billing-units-total-water-budget', value: '77' },

      { name: 'dedicated-fire-line-included', value: 'true' },
      { name: 'dedicated-fire-line-charge', value: '25.00' },
      { name: 'backflow-device-testing', value: 'Backflow Device Testing - 6" and Over' },
    ],
  },
];

module.exports = {
    indioFieldLegend,
    indioData,
};