import axios from "axios";
import { countriesCovid } from "../places/country.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
} from "../utils/date.js";

import {
  parseJHUCSSECountryDate,
  parseJHUCSSECountryCumulative,
  parseJHUCSSECountryDaily,
  parseRAPSCountryDate,
  parseRAPSCountryCumulative,
  parseRAPSCountryDaily,
} from "../utils/parseCountry.js";

export function getCountries(req, res) {
  const countries = Object.keys(countriesCovid);
  res.status(200).json({ countries });
}

export async function getCountryDateCovidStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
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
  // state and date are valid
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res
      .status(200)
      .json({ ...parseJHUCSSECountryDate(data, date), country, date });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get covid-19 data for ${country} on ${date}`,
    });
  }
}

export async function getCountryCumulativeCovidStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    res.status(400).json({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res.status(200).json({
      ...parseJHUCSSECountryCumulative(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get covid-19 cumulative data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDailyCovidStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
      message: `Cannot find covid-19 data for ${country} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    res.status(400).json({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { JHUCSSE_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(JHUCSSE_url);
    res.status(200).json({
      ...parseJHUCSSECountryDaily(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get daily covid-19 data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDateVaccineStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
      message: `Cannot find covid-19 vaccine data for ${country} or may be spelled incorrectly`,
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
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    res
      .status(200)
      .json({ ...parseRAPSCountryDate(data, date), country, date });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get covid-19 vaccine data for ${country} on ${date}`,
    });
  }
}

export async function getCountryCumulativeVaccineStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
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
    res.status(400).json({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    res.status(200).json({
      ...parseRAPSCountryCumulative(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get cumulative covid-19 vaccine data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getCountryDailyVaccineStatistics(req, res) {
  const { country: unformattedCountry } = req.params;
  const { start, end } = req.query;
  const country = unformattedCountry.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(countriesCovid).includes(country)) {
    res.status(400).json({
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
    res.status(400).json({ message });
    return;
  }
  // valid country, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { vaccine_url } = countriesCovid[country];
  try {
    const { data } = await axios.get(vaccine_url);
    res.status(200).json({
      ...parseRAPSCountryDaily(data, startDate, endDate),
      country,
      startDate,
      endDate,
    });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get cumulative covid-19 vaccine data for ${country} from ${startDate} to ${endDate}`,
    });
  }
}
