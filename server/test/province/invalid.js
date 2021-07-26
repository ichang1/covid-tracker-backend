import {
  routeTypes,
  placeTypes,
  generateInvalidPlaceErrorTests,
} from "../utils.js";

const invalidProvinces = ["abc", "California", "Malaysia"];

const invalidProvinceCovidErrorTests = invalidProvinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const invalidProvinceVaccineErrorTests = invalidProvinces.reduce(
  (tests, provinceName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      provinceName,
      placeTypes.PROVINCE,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allInvalidProvinceTests = [
  ...invalidProvinceCovidErrorTests,
  ...invalidProvinceVaccineErrorTests,
];

// console.log(allInvalidStateTests);
