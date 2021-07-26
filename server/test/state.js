import {
  GET,
  ERROR,
  statusCodes,
  routeTypes,
  placeTypes,
  generateValidPlaceTests,
  generateValidPlaceErrorTests,
} from "./utils.js";

import { statesCovid } from "../places/states.js";

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

const validStateCovidTests = Object.keys(statesCovid).reduce(
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

const validStateVaccineTests = Object.keys(statesCovid).reduce(
  (tests, stateName) => [
    ...tests,
    ...generateValidPlaceTests(stateName, placeTypes.STATE, routeTypes.VACCINE),
  ],
  []
);

const validStateCovidErrorTests = Object.keys(statesCovid).reduce(
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

const validStateVaccineErrorTests = Object.keys(statesCovid).reduce(
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

export const stateTests = [
  ...validStateCovidTests,
  ...validStateVaccineTests,
  ...validStateCovidErrorTests,
  ...validStateVaccineErrorTests,
];
