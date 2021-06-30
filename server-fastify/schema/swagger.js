export const swaggerSchema = {
  exposeRoute: true,
  routePrefix: "/",
  swagger: {
    openapi: "3.0.0",
    info: {
      title: "covid-tracker-api Docs",
      version: "0.1.0",
      description:
        "This is an api that parses Covid-19 data from the disease.sh api into a common format",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    tags: [
      {
        name: "US state Covid-19 and vaccine",
        description: "Get Covid-19 related statistics for US states",
      },
      {
        name: "Province Covid-19 and vaccine",
        description: "Get Covid-19 related statistics for provinces",
      },
      {
        name: "Country Covid-19 and vaccine",
        description: "Get Covid-19 related statistics for countries",
      },
    ],
    produces: ["application/json"],
  },
};
