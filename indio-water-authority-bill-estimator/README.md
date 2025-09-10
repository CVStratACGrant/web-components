[Live](https://www.indio.org/departments/indio-water-authority/rates/)
[Live Source](https://billestimator.org/indio-water-authority/)
["Indio Water Authority Bill Estimator" in Dropbox](https://www.dropbox.com/scl/fo/pdyw4r657jffbryxdv24t/AC3CoN5_rDdjtwwRXviT0VE?rlkey=y8z9j6l1t5m4glwdod4avdci1&st=qt7v4e97&dl=0)

# Overview

## Functionality

### Residential
#### User's Information
- Total usage: billing unit = CCF/HCF = centum/hundred cubic feet = 748 gallons
- Meter size (one of the following): 5/8", 3/4", 1", 1 1/2", 2", 3", 4", 6", 8" – 12"
- Household size
#### Budget and Tiers
- Total Water Budget = Tier 1 (Indoor) + Tier 2 (Outdoor)
- **Tier 1 (Indoor) Water Budget**
    - (Household Size * Daily per Person Water Allowance * Billing Cycle Days) / Gallons in a Billing Unit
    - Household Size: members living in the house
    - Daily per Person Water Allowance: daily allotment of gallons per person, fixed at 62.5 gallons
    - Billing Cycle Days: length of the current bill period
    - Gallons in a Billing Unit: 748 gallons, normalizes budget to hundred cubic feet
    - **Charge**: Standard Rate * HCF Usage
- **Tier 2 (Outdoor) Water Budget**
    - (minimum((LA * 0.45), 6000) * (ETo/12/100 * PF)) / IE
    - **Landscape Area minimum((LA * 0.45), 6000)**
        - Unit in square feet
        - Multiplied by 0.45: calculation is based on 45% of the irrigated lot size
        - Minimum between 45% of the irrigated lot size and 6000: 6000 square feet is the cap
    - **Evapotranspiration (ET = ETo/12/100 * PF)**
        - Water lost to atmosphere due to evaporation (soil surface) and transpiration (plants)
        - Reference Evapotranspiration (ETo)
            - Unit in inches: divided by 12 so that the measurement is in feet
            - After unit is converted to feet: divided by 100 so that it can be normalized to units of one hundred cubit feet
            - Evapotranspiration from a reference crop
                - Reference crop is typically a well-watered grass grown under standard conditions
                - Turf grass is the reference crop in California
                - Measurements collected daily from CIMIS Station 200 in Indio
        - Plant Factor (PF) or Crop Factor/Coefficient (Kc)
            - Factor that estimates the amount of water needed for a plant in relation to a reference crop
        - This usually does not show up by itself on bills
        - ETo and PF usually do not show up individually on bills, they are calculated behind the scenes
    - **Irrigation Efficiency**
        - Decimal between 0 and 1 which measures the efficacy of plant irrigation relative to total water applied
        - Water used by plants (i.e., beneficial water) / total water applied
    - **Charge**: Standard Rate * HCF Usage
- **Tier 3 (Inefficient)**
    - Total Water Budget < Tier 3 <= (Total Water Budget * 2.00)
    - **Charge**: (Standard Rate * HCF Usage) + (Drought Penalty * HCF Usage)
- **Tier 4 (Excessive)**
    - (Total Water Budget * 2.00) < Tier 4 <= (Total Water Budget * 4.00)
    - **Charge**: (Standard Rate * HCF Usage) + (Drought Penalty * HCF Usage)
- **Tier 5 (Wasteful)**
    - (Total Water Budget * 4.00) < Tier 5
    - **Charge**: (Standard Rate * HCF Usage) + (Drought Penalty * HCF Usage)
#### Total Charge
- Fixed Charge [Year Rate at the Given Meter Size] * Variable Charge [Tiered Charges] * Private Fire Charge [Year Rate at the Given Meter Size]

### Commercial and Non-Residential
#### User's Information
- Total usage for the past three years
- Meter size (one of the following): 5/8", 3/4", 1", 1 1/2", 2", 3", 4", 6", 8" – 12"
- Tier 1 CCF water usage from the bill is used as the Tier 1 budget. Users have to input their total water budget. This approach results in accurate calculations because the Tier 1 usage on the bill is always either equal to or less than the actual Tier 1 budget.
    - If Tier 1 usage is less than the actual Tier 1 budget, then no water will be charged at higher-tier rates—only Tier 1 will apply, ensuring accuracy.
    - If Tier 1 usage matches the actual Tier 1 budget, then any additional usage will be  correctly allocated to Tier 2 and beyond. This is because exceeding the Tier 1 budget naturally results in Tier 1 usage being equal to the Tier 1 budget, allowing the remaining  usage to be accurately calculated for all tiers. For instance, Tier 2 can be determined by subtracting the Tier 1 budget from the total budget.

## Site Integration
This site uses the CMS Granicus. The goal was to integrate the bill estimator code without linking an external resource to host it. However, due to the limitations of Granicus, the estimator was built on a WordPress site hosted by WP Engine, using Code Block elements, and then embedded into Indio.org.

