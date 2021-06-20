import axios from "axios";
import { countriesCovid } from "../places/country.js";
import {
  isValidDate,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
  cleanDate,
} from "../utils/date.js";

import {
  parseJHUCSSECountryDate,
  parseJHUCSSECountryCumulative,
  parseJHUCSSECountryDaily,
  parseRAPSCountryDate,
  parseRAPSCountryCumulative,
  parseRAPSCountryDaily,
} from "../utils/parseCountry.js";

export function getCountries(req, reply) {
  const countries = Object.keys(countriesCovid);
  reply.code(200).send({ countries });
}

export async function getCountryDateCovidStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  if (dateReq !== undefined) {
    if (!isValidDate(dateReq)) {
      reply.code(400).send({
        message: `${dateReq} is an invalid date or is formatted incorrectly`,
      });
      return;
    }
  }
  let date;
  const yesterdayDate = dateToYesterday(getTodayDate());
  if (dateReq === undefined) {
    date = yesterdayDate;
  } else {
    date = cleanDate(dateReq);
  }
  // state and date are valid
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply
      .code(200)
      .send({ ...parseJHUCSSECountryDate(data, date), country, date });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get covid-19 data for ${country} on ${date}`,
    });
  }
}

export async function getCountryCumulativeCovidStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply.code(200).send({
      ...parseJHUCSSECountryCumulative(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get covid-19 cumulative data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDailyCovidStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply.code(200).send({
      ...parseJHUCSSECountryDaily(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get daily covid-19 data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDateVaccineStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 vaccine data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  if (dateReq !== undefined) {
    if (!isValidDate(dateReq, "vaccine")) {
      reply.code(400).send({
        message: `${dateReq} is an invalid date or is formatted incorrectly`,
      });
      return;
    }
  }
  let date;
  const yesterdayDate = dateToYesterday(getTodayDate());
  if (dateReq === undefined) {
    date = yesterdayDate;
  } else {
    date = cleanDate(dateReq);
  }
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    reply
      .code(200)
      .send({ ...parseRAPSCountryDate(data, date), country, date });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get covid-19 vaccine data for ${country} on ${date}`,
    });
  }
}

export async function getCountryCumulativeVaccineStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(
    start,
    end,
    "vaccine"
  );
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "12-1-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    reply.code(200).send({
      ...parseRAPSCountryCumulative(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get cumulative covid-19 vaccine data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDailyVaccineStatistics(req, reply) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(
    start,
    end,
    "vaccine"
  );
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "12-1-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    reply.code(200).send({
      ...parseRAPSCountryDaily(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get cumulative covid-19 vaccine data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}
