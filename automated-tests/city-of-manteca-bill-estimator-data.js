const fieldTypes = require('./utils/form-utils.js');

// legends
const mantecaResidentialFieldLegend = {
  'current-billing-units-water-usage': fieldTypes.text,
  'current-billing-cycle-days': fieldTypes.text,
  'household-size': fieldTypes.text,
  'landscape-area-square-feet': fieldTypes.text,
  'evapotranspiration': fieldTypes.text,
  'irrigation-efficiency': fieldTypes.text,
  'meter-size': fieldTypes.option,
  'dedicated-fire-line-included': fieldTypes.option,
};

const mantecaNonResidentialFieldLegend = {
  'current-billing-units-water-usage': fieldTypes.text,
  'current-billing-cycle-days': fieldTypes.text,
  'meter-size': fieldTypes.option,
  'dedicated-fire-line-included': fieldTypes.option,
};

const mantecaNonResidentialData = [
  { // Car Wash
    expected: 783.66,
    formData: [
      { name: 'current-billing-units-water-usage', value: '22900' },
      { name: 'current-billing-cycle-days', value: '34' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Commercial / Retail (Rite Aid)
    expected: 676.51,
    formData: [
      { name: 'current-billing-units-water-usage', value: '5470' },
      { name: 'current-billing-cycle-days', value: '35' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Hospital
    expected: 5118.70,
    formData: [
      { name: 'current-billing-units-water-usage', value: '61700' },
      { name: 'current-billing-cycle-days', value: '34' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Hotel / Motel (credit balance)
    expected: -474.50,
    formData: [
      { name: 'current-billing-units-water-usage', value: '47000' }, // large irrigation meter usage present
      { name: 'current-billing-cycle-days', value: '31' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Laundromat
    expected: 460.10,
    formData: [
      { name: 'current-billing-units-water-usage', value: '5090' },
      { name: 'current-billing-cycle-days', value: '29' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Market
    expected: 222.93,
    formData: [
      { name: 'current-billing-units-water-usage', value: '120' },
      { name: 'current-billing-cycle-days', value: '35' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Office / Light Industrial
    expected: 88.15,
    formData: [
      { name: 'current-billing-units-water-usage', value: '260' },
      { name: 'current-billing-cycle-days', value: '31' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Restaurant
    expected: 737.91,
    formData: [
      { name: 'current-billing-units-water-usage', value: '600' },
      { name: 'current-billing-cycle-days', value: '33' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Rooming houses – no water meter on bill; treat usage as 0, 30-day cycle from dates
    expected: 264.70,
    formData: [
      { name: 'current-billing-units-water-usage', value: '0' },
      { name: 'current-billing-cycle-days', value: '30' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // School – two meters; use total usage (3,470 + 4,450 = 7,920) and a 35-day cycle
    expected: 1822.11,
    formData: [
      { name: 'current-billing-units-water-usage', value: '7920' },
      { name: 'current-billing-cycle-days', value: '35' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Service stations
    expected: 112.52,
    formData: [
      { name: 'current-billing-units-water-usage', value: '1940' },
      { name: 'current-billing-cycle-days', value: '29' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
  { // Trailer park
    expected: 2621.25,
    formData: [
      { name: 'current-billing-units-water-usage', value: '14250' },
      { name: 'current-billing-cycle-days', value: '37' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
];

const mantecaResidentialData = [
  { // Residential & equivalents
    expected: 294.00,
    formData: [
      { name: 'current-billing-units-water-usage', value: '800' },
      { name: 'current-billing-cycle-days', value: '30' },
      { name: 'household-size', value: '3' },
      { name: 'landscape-area-square-feet', value: '0' },
      { name: 'evapotranspiration', value: '0' },
      { name: 'irrigation-efficiency', value: '0.7' },
      { name: 'dedicated-fire-line-included', value: 'false' },
    ],
  },
];

module.exports = {
  mantecaResidentialFieldLegend,
  mantecaNonResidentialFieldLegend,
  mantecaTriggerSelectors,
  mantecaNonResidentialData,
  mantecaResidentialData,
};
