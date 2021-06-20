import {
  getStates,
  getStateDateCovidStatistics,
  getStateCumulativeCovidStatistics,
  getStateDailyCovidStatistics,
} from "../controllers/state.js";

export function stateCovidRoutes(fastify, options, done) {
  fastify.get("/state", getStates);

  fastify.get("/state/:state/date", getStateDateCovidStatistics);

  fastify.get("/state/:state/cumulative", getStateCumulativeCovidStatistics);

  fastify.get("/state/:state/daily", getStateDailyCovidStatistics);

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
