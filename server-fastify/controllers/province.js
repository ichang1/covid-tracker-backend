import axios from "axios";
import { provincesCovid } from "../places/province.js";
import {
  isValidDate,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
  cleanDate,
} from "../utils/date.js";
import {
  parseJHUCSSEProvinceDate,
  parseJHUCSSEProvinceCumulative,
  parseJHUCSSEProvinceDaily,
  parseRAPSProvinceDate,
  parseRAPSProvinceCumulative,
  parseRAPSProvinceDaily,
} from "../utils/parseProvince.js";

export function getProvinces(req, reply) {
  const provinces = { provinces: Object.keys(provincesCovid) };
  reply.code(200).send(provinces);
}

export async function getProvinceDateCovidStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
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
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply
      .code(200)
      .send({ ...parseJHUCSSEProvinceDate(data, date), province, date });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get Covid-19 data for ${province} on ${date}`,
    });
  }
}

export async function getProvinceCumulativeCovidStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply.code(200).send({
      ...parseJHUCSSEProvinceCumulative(data, startDate, endDate),
      province,
      start: startDate,
      end: endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get cumulative Covid-19 data for ${province} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getProvinceDailyCovidStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_COVID_DATE : cleanDate(end);
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    reply.code(200).send({
      ...parseJHUCSSEProvinceDaily(data, startDate, endDate),
      province,
      start: startDate,
      end: endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get daily Covid-19 data for ${province} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getProvinceDateVaccineStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
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
  reply.code(200).send({
    ...parseRAPSProvinceDate({}, date),
    province,
    date,
  });
}

export async function getProvinceCumulativeVaccineStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
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
  // valid state, start and end date
  const EARLIEST_VACCINE_DATE = "12-1-2020";
  const LATEST_VACCINE_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_VACCINE_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_VACCINE_DATE : cleanDate(end);
  reply.code(200).send({
    ...parseRAPSProvinceCumulative({}, startDate, endDate),
    province,
    start: startDate,
    end: endDate,
  });
}

export async function getProvinceDailyVaccineStatistics(req, reply) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
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
  // valid state, start and end date
  const EARLIEST_VACCINE_DATE = "12-1-2020";
  const LATEST_VACCINE_DATE = dateToYesterday(getTodayDate());
  const startDate =
    start === undefined ? EARLIEST_VACCINE_DATE : cleanDate(start);
  const endDate = end === undefined ? LATEST_VACCINE_DATE : cleanDate(end);
  reply.code(200).send({
    ...parseRAPSProvinceDaily({}, startDate, endDate),
    province,
    start: startDate,
    end: endDate,
  });
}
