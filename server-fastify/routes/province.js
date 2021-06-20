import {
  getProvinces,
  getProvinceDateCovidStatistics,
  getProvinceCumulativeCovidStatistics,
  getProvinceDailyCovidStatistics,
  getProvinceDateVaccineStatistics,
  getProvinceCumulativeVaccineStatistics,
  getProvinceDailyVaccineStatistics,
} from "../controllers/province.js";

import {
  getProvinceOpts,
  getCovidProvinceDateStatOpts,
  getCovidProvinceCumulativeOrDailyStatOpts,
  getVaccineProvinceDateStatOpts,
  getVaccineProvinceCumulativeOrDailyStatOpts,
} from "../schema/province.js";

export function provinceCovidRoutes(fastify, options, done) {
  fastify.get("/province", getProvinceOpts, getProvinces);

  fastify.get(
    "/province/:province/date",
    getCovidProvinceDateStatOpts,
    getProvinceDateCovidStatistics
  );

  fastify.get(
    "/province/:province/cumulative",
    getCovidProvinceCumulativeOrDailyStatOpts,
    getProvinceCumulativeCovidStatistics
  );

  fastify.get(
    "/province/:province/daily",
    getCovidProvinceCumulativeOrDailyStatOpts,
    getProvinceDailyCovidStatistics
  );

  done();
}

export function provinceVaccineRoutes(fastify, options, done) {
  fastify.get("/province", getProvinceOpts, getProvinces);

  fastify.get(
    "/province/:province/date",
    getVaccineProvinceDateStatOpts,
    getProvinceDateVaccineStatistics
  );

  fastify.get(
    "/province/:province/cumulative",
    getVaccineProvinceCumulativeOrDailyStatOpts,
    getProvinceCumulativeVaccineStatistics
  );

  fastify.get(
    "/province/:province/daily",
    getVaccineProvinceCumulativeOrDailyStatOpts,
    getProvinceDailyVaccineStatistics
  );

  done();
}
