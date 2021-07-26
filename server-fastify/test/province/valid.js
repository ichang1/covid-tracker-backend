import {
  GET,
  statusCodes,
  routeTypes,
  placeTypes,
  generateValidPlaceTests,
  generateValidPlaceErrorTests,
} from "../utils.js";

import { provincesCovid } from "../../places/province.js";

const provinces = Object.keys(provincesCovid).slice(23, 24);

const validProvinceTests = [
  {
    description: "Get all provinces to query covid-19 stats",
    url: "/covid-19/province",
    method: GET,
    expectCode: statusCodes.GET,
  },
  {
    description: "Get all provinces to query covid-19 vaccine stats",
    url: "/vaccine/province",
    method: GET,
    expectCode: statusCodes.GET,
  },
];

const validProvinceCovidTests = provinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateValidPlaceTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validProvinceVaccineTests = provinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateValidPlaceTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.VACCINE
    ),
  ],
  []
);

const validProvinceCovidErrorTests = provinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validProvinceVaccineErrorTests = provinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allValidProvinceTests = [
  ...validProvinceTests,
  ...validProvinceCovidTests,
  ...validProvinceVaccineTests,
  ...validProvinceCovidErrorTests,
  ...validProvinceVaccineErrorTests,
];

// 70 extra tests per province. Initial amount is 2 tests.
