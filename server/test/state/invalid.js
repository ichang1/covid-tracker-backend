import {
  routeTypes,
  placeTypes,
  generateInvalidPlaceErrorTests,
} from "../utils.js";

const invalidStates = ["abc", "China", "Shandong"];

const invalidStateCovidErrorTests = invalidStates.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      stateName,
      placeTypes.STATE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const invalidStateVaccineErrorTests = invalidStates.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateInvalidPlaceErrorTests(
      stateName,
      placeTypes.STATE,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allInvalidStateTests = [
  ...invalidStateCovidErrorTests,
  ...invalidStateVaccineErrorTests,
];

// console.log(allInvalidStateTests);
