import fastify from "fastify";
import fastifyCors from "fastify-cors";

import { stateCovidRoutes, stateVaccineRoutes } from "./routes/state.js";

const app = fastify({ logger: true });

app.register(fastifyCors, {
  origin: "*",
});

const routes = [
  { route: stateCovidRoutes, prefix: "covid-19" },
  { route: stateVaccineRoutes, prefix: "vaccine" },
];

routes.forEach(({ route, prefix }) => {
  app.register(route, { prefix });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await app.listen(PORT);
  } catch (err) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
