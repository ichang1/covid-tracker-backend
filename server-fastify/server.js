import fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";

import { stateCovidRoutes, stateVaccineRoutes } from "./routes/state.js";
import {
  provinceCovidRoutes,
  provinceVaccineRoutes,
} from "./routes/province.js";
import { countryCovidRoutes, countryVaccineRoutes } from "./routes/country.js";
import { swaggerSchema } from "./schema/swagger.js";

const server = fastify({ logger: true });

server.register(fastifyCors, {
  origin: "*",
});

server.register(fastifySwagger, swaggerSchema);

const routes = [
  {
    route: stateCovidRoutes,
    prefix: "covid-19",
  },
  { route: stateVaccineRoutes, prefix: "vaccine" },
  { route: provinceCovidRoutes, prefix: "covid-19" },
  { route: provinceVaccineRoutes, prefix: "vaccine" },
  { route: countryCovidRoutes, prefix: "covid-19" },
  { route: countryVaccineRoutes, prefix: "vaccine" },
];

routes.forEach(({ route, prefix }, i) => {
  server.register(route, { prefix, description: i });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();
