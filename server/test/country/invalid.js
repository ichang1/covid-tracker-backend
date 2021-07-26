import {
  routeTypes,
  placeTypes,
  generateInvalidPlaceErrorTests,
} from "../utils.js";

const invalidCountries = ["abc", "California", "Shandong"];

const invalidCountryCovidErrorTests = invalidCountries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.COVID_19
    ),
  ],
  []
);

const invalidCountryVaccineErrorTests = invalidCountries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allInvalidCountryTests = [
  ...invalidCountryCovidErrorTests,
  ...invalidCountryVaccineErrorTests,
];

// console.log(allInvalidStateTests);
