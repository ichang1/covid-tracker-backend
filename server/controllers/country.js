import axios from "axios";
import { countriesCovid } from "../places/country.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
} from "../utils/date.js";

import { parseJHUCSSECountryDate } from "../utils/parseCountry.js";

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
      message: `Cannot find Covid 19 data for ${country} or may be spelled incorrectly`,
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
    const apiRes = await axios.get(JHUCSSE_url);
    res
      .status(200)
      .json({ ...parseJHUCSSECountryDate(apiRes.data, date), country, date });
  } catch (_) {
    res.status(400).json({
      message: `Failed to get Covid-19 data for ${country} on ${date}`,
    });
  }
}

export function getCountryCumulativeCovidStatistics(req, res) {
  res.send("Country cumulative covid data");
}

export function getCountryDailyCovidStatistics(req, res) {
  res.send("Country daily covid data");
}

export function getCountryDateVaccineStatistics(req, res) {
  res.send("vaccine date stats for country");
}

export function getCountryCumulativeVaccineStatistics(req, res) {
  res.send("Country vaccine cumulative data");
}

export function getCountryDailyVaccineStatistics(req, res) {
  res.send("Country vaccine daily data");
}
