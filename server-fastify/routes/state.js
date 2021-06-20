import {
  getStates,
  getStateDateCovidStatistics,
  getStateCumulativeCovidStatistics,
  getStateDailyCovidStatistics,
} from "../controllers/state.js";

import {
  getCovidStateOpts,
  getCovidStateDateStatOpts,
  getCovidStateCumulativeOrDailyStatOpts,
} from "../schema/state.js";

export function stateCovidRoutes(fastify, options, done) {
  fastify.get("/state", getCovidStateOpts, getStates);

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
  fastify.get("/state", (req, reply) => {
    reply.send("states for covid vaccine route");
  });
  fastify.get("/state/:state/date", (req, reply) => {
    const { state } = req.params;
    reply.send(`${state} covid vaccine route`);
  });
  done();
}
