import {
  getStates,
  getStateDateCovidStatistics,
  getStateCumulativeCovidStatistics,
  getStateDailyCovidStatistics,
  getStateDateVaccineStatistics,
  getStateCumulativeVaccineStatistics,
  getStateDailyVaccineStatistics,
} from "../controllers/state.js";

import {
  getStateOpts,
  getCovidStateDateStatOpts,
  getCovidStateCumulativeOrDailyStatOpts,
  getVaccineStateDateStatOpts,
  getVaccineStateCumulativeOrDailyStatOpts,
} from "../schema/state.js";

export function stateCovidRoutes(fastify, options, done) {
  fastify.get("/state", getStateOpts, getStates);

  fastify.get(
    "/state/:state/date",
    getCovidStateDateStatOpts,
    getStateDateCovidStatistics
  );

  fastify.get(
    "/state/:state/cumulative",
    getCovidStateCumulativeOrDailyStatOpts,
    getStateCumulativeCovidStatistics
  );

  fastify.get(
    "/state/:state/daily",
    getCovidStateCumulativeOrDailyStatOpts,
    getStateDailyCovidStatistics
  );

  done();
}

export function stateVaccineRoutes(fastify, options, done) {
  fastify.get("/state", getStateOpts, getStates);

  fastify.get(
    "/state/:state/date",
    getVaccineStateDateStatOpts,
    getStateDateVaccineStatistics
  );

  fastify.get(
    "/state/:state/cumulative",
    getVaccineStateCumulativeOrDailyStatOpts,
    getStateCumulativeVaccineStatistics
  );

  fastify.get(
    "/state/:state/daily",
    getVaccineStateCumulativeOrDailyStatOpts,
    getStateDailyVaccineStatistics
  );

  done();
}
