import {
  GET,
  statusCodes,
  routeTypes,
  placeTypes,
  generateValidPlaceTests,
  generateValidPlaceErrorTests,
} from "../utils.js";

import { countriesCovid } from "../../places/country.js";

const countries = Object.keys(countriesCovid).slice(20, 21);

const validCountryTests = [
  {
    description: "Get all countries to query covid-19 stats",
    url: "/covid-19/country",
    method: GET,
    expectCode: statusCodes.GET,
  },
  {
    description: "Get all countries to query covid-19 vaccine stats",
    url: "/vaccine/country",
    method: GET,
    expectCode: statusCodes.GET,
  },
];

const validCountryCovidTests = countries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateValidPlaceTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validCountryVaccineTests = countries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateValidPlaceTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.VACCINE
    ),
  ],
  []
);

const validCountryCovidErrorTests = countries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validCountryVaccineErrorTests = countries.reduce(
  (tests, countryName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      countryName,
      placeTypes.COUNTRY,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allValidCountryTests = [
  ...validCountryTests,
  ...validCountryCovidTests,
  ...validCountryVaccineTests,
  ...validCountryCovidErrorTests,
  ...validCountryVaccineErrorTests,
];

// 70 extra tests per country. Initial amount is 2 tests.
