import {
  getCountries,
  getCountryDateCovidStatistics,
  getCountryCumulativeCovidStatistics,
  getCountryDailyCovidStatistics,
  getCountryDateVaccineStatistics,
  getCountryCumulativeVaccineStatistics,
  getCountryDailyVaccineStatistics,
} from "../controllers/country.js";

import {
  getCountryOpts,
  getCovidCountryDateStatOpts,
  getCovidCountryCumulativeOrDailyStatOpts,
  getVaccineCountryDateStatOpts,
  getVaccineCountryCumulativeOrDailyStatOpts,
} from "../schema/country.js";

export function countryCovidRoutes(fastify, options, done) {
  fastify.get("/country", getCountryOpts, getCountries);

  fastify.get(
    "/country/:country/date",
    getCovidCountryDateStatOpts,
    getCountryDateCovidStatistics
  );

  fastify.get(
    "/country/:country/cumulative",
    getCovidCountryCumulativeOrDailyStatOpts,
    getCountryCumulativeCovidStatistics
  );

  fastify.get(
    "/country/:country/daily",
    getCovidCountryCumulativeOrDailyStatOpts,
    getCountryDailyCovidStatistics
  );

  done();
}

export function countryVaccineRoutes(fastify, options, done) {
  fastify.get("/country", getCountryOpts, getCountries);

  fastify.get(
    "/country/:country/date",
    getVaccineCountryDateStatOpts,
    getCountryDateVaccineStatistics
  );

  fastify.get(
    "/country/:country/cumulative",
    getVaccineCountryCumulativeOrDailyStatOpts,
    getCountryCumulativeVaccineStatistics
  );

  fastify.get(
    "/country/:country/daily",
    getVaccineCountryCumulativeOrDailyStatOpts,
    getCountryDailyVaccineStatistics
  );

  done();
}
