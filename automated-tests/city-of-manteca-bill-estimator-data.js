const { fieldTypes } = require('./utils/form-utils.js');

const mantecaFieldLegend = {
  'bill-estimator-type-menu': fieldTypes.option,
  'consumption-input': fieldTypes.text,
  'number-of-living-units-input': fieldTypes.text,
  'biological-oxygen-demand-input': fieldTypes.text,
  'nitrogen-input': fieldTypes.text,
  'total-suspended-solids-input': fieldTypes.text,
  'volume-input': fieldTypes.text,
};

const mantecaNonResidentialData = [
  {
    expected: 56.17,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Car Wash' },
      { name: 'consumption-input', value: '2290' },
    ],
  },
  {
    expected: 16.94,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Retail' },
      { name: 'consumption-input', value: '547' },
    ],
  },
  {
    expected: 201.7,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Hospital' },
      { name: 'consumption-input', value: '6170' },
    ],
  },
  {
    expected: 290.88,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Hotel (With Kitchen)' },
      { name: 'consumption-input', value: '4700' },
    ],
  },
  {
    expected: 12.49,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Laundromat' },
      { name: 'consumption-input', value: '509' },
    ],
  },
  {
    expected: 0.91,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Market' },
      { name: 'consumption-input', value: '12' },
    ],
  },
  {
    expected: 0.66,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Office' },
      { name: 'consumption-input', value: '26' },
    ],
  },
  {
    expected: 4.35,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Restaurant' },
      { name: 'consumption-input', value: '60' },
    ],
  },
  {
    expected: 259.80,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Residential (Two or More Living Units)' },
      { name: 'number-of-living-units-input', value: '6' },
    ],
  },
  {
    expected: 22.74,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'School' },
      { name: 'consumption-input', value: '792' },
    ],
  },
  {
    expected: 6.6,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Service Station' },
      { name: 'consumption-input', value: '194' },
    ],
  },
  {
    expected: 52.11,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Trailer Park' },
      { name: 'consumption-input', value: '1425' },
      { name: 'number-of-living-units-input', value: '72' },
    ],
  },
];

const mantecaResidentialData = [
  {
    expected: 43.3,
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Residential (Single Family Home)' },
    ],
  },
];

// ⬇️ Industrial (2024 industrial rates assumed)
const mantecaIndustrialData = [
  {
    expected: 2803.08, // your provided expected
    formData: [
      { name: 'bill-estimator-type-menu', value: 'Industrial' },
      { name: 'biological-oxygen-demand-input', value: '120' },
      { name: 'nitrogen-input', value: '44' },
      { name: 'total-suspended-solids-input', value: '130' },
      { name: 'volume-input', value: '1.25' },
    ],
  },
];

module.exports = {
  mantecaFieldLegend,
  mantecaNonResidentialData,
  mantecaResidentialData,
  mantecaIndustrialData,
};