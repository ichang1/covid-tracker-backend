import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";

import { stateCovidRoutes, stateVaccineRoutes } from "./routes/state.js";
import {
  provinceCovidRoutes,
  provinceVaccineRoutes,
} from "./routes/province.js";
import { countryCovidRoutes, countryVaccineRoutes } from "./routes/country.js";
import { swaggerSchema } from "./schema/swagger.js";

export function app(fastify, options, done) {
  fastify.register(fastifyCors, {
    origin: "*",
  });

  fastify.register(fastifySwagger, swaggerSchema);

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
    fastify.register(route, { prefix });
  });

  done();
}
