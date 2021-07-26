import {
  GET,
  statusCodes,
  routeTypes,
  placeTypes,
  generateValidPlaceTests,
  generateValidPlaceErrorTests,
} from "../utils.js";

import { statesCovid } from "../../places/states.js";

const states = Object.keys(statesCovid).slice(10, 11);

const validStateTests = [
  {
    description: "Get all states to query covid-19 stats",
    url: "/covid-19/state",
    method: GET,
    expectCode: statusCodes.GET,
  },
  {
    description: "Get all states to query covid-19 vaccine stats",
    url: "/vaccine/state",
    method: GET,
    expectCode: statusCodes.GET,
  },
];

const validStateCovidTests = states.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateValidPlaceTests(
      stateName,
      placeTypes.STATE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validStateVaccineTests = states.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateValidPlaceTests(stateName, placeTypes.STATE, routeTypes.VACCINE),
  ],
  []
);

const validStateCovidErrorTests = states.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      stateName,
      placeTypes.STATE,
      routeTypes.COVID_19
    ),
  ],
  []
);

const validStateVaccineErrorTests = states.reduce(
  (tests, stateName) => [
    ...tests,
    ...generateValidPlaceErrorTests(
      stateName,
      placeTypes.STATE,
      routeTypes.VACCINE
    ),
  ],
  []
);

export const allValidStateTests = [
  ...validStateTests,
  ...validStateCovidTests,
  ...validStateVaccineTests,
  ...validStateCovidErrorTests,
  ...validStateVaccineErrorTests,
];

// 70 extra tests per state. Initial amount is 2 tests.

// console.log(allValidStateTests);
