import axios from "axios";
import { provincesCovid } from "../places/province.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
} from "../utils/date.js";
import {
  parseJHUCSSEProvinceDate,
  parseJHUCSSEProvinceCumulative,
  parseJHUCSSEProvinceDaily,
  parseRAPSProvinceDate,
  parseRAPSProvinceCumulative,
  parseRAPSProvinceDaily,
} from "../utils/parseProvince.js";

export function getProvinces(req, res) {
  const provinces = { provinces: Object.keys(provincesCovid) };
  res.status(200).json(provinces);
}

export async function getDateProvinceStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  if (dateReq !== undefined) {
    if (!isValidDate(dateReq)) {
      res.status(400).json({
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
    date = dateReq;
  }
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res
      .status(200)
      .json({ ...parseJHUCSSEProvinceDate(data, date), province, date });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get Covid-19 data for ${province} on ${date}`,
    });
  }
}

export async function getProvinceCumulativeCovidStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    res.status(400).json({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res.status(200).json({
      ...parseJHUCSSEProvinceCumulative(data, startDate, endDate),
      province,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get cumulative Covid-19 data for ${province} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getProvinceDailyCovidStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    res.status(400).json({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { JHUCSSE_url } = provincesCovid[province];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res.status(200).json({
      ...parseJHUCSSEProvinceDaily(data, startDate, endDate),
      province,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get daily Covid-19 data for ${province} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getProvinceDateVaccineStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${province} or may be spelled incorrectly`,
    });
    return;
  }
  if (dateReq !== undefined) {
    if (!isValidDate(dateReq, "vaccine")) {
      res.status(400).json({
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
    date = dateReq;
  }
  res.status(200).json({
    ...parseRAPSProvinceDate({}, date),
    province,
    date,
  });
}

export async function getProvinceCumulativeVaccineStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
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
    res.status(400).json({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_VACCINE_DATE = "12-1-2020";
  const LATEST_VACCINE_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_VACCINE_DATE : start;
  const endDate = end === undefined ? LATEST_VACCINE_DATE : end;
  res.status(200).json({
    ...parseRAPSProvinceCumulative({}, startDate, endDate),
    province,
    startDate,
    endDate,
  });
}

export async function getProvinceDailyVaccineStatistics(req, res) {
  const { province: unformattedProvince } = req.params;
  const { start, end } = req.query;
  const province = unformattedProvince.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(provincesCovid).includes(province)) {
    res.status(400).json({
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
    res.status(400).json({ message });
    return;
  }
  // valid state, start and end date
  const EARLIEST_VACCINE_DATE = "12-1-2020";
  const LATEST_VACCINE_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_VACCINE_DATE : start;
  const endDate = end === undefined ? LATEST_VACCINE_DATE : end;
  res.status(200).json({
    ...parseRAPSProvinceDaily({}, startDate, endDate),
    province,
    startDate,
    endDate,
  });
}
