import axios from "axios";
import { statesCovid } from "../utils/statesCovid.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
} from "../utils/date.js";
import {
  parseWorldometers,
  parseJHUCSSEState,
  parseJHUCSSEStateCumulative,
} from "../utils/parse.js";

export function getStates(req, res) {
  const us_states = { states: Object.keys(statesCovid) };
  res.status(200).json(us_states);
}

export async function getStateDateStatistics(req, res) {
  const { state: unformattedState, date } = req.params;
  // uppercase all the words in the state name Ex: new york -> New York
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(statesCovid).includes(state)) {
    res.status(400).json({
      message: `Cannot find covid data for ${state} or may be spelled incorrectly`,
    });
    return;
  }
  if (!isValidDate(date)) {
    res.status(400).json({
      message: `${date} is an invalid date or is formatted incorrectly`,
    });
    return;
  }

  // state and date are valid
  const { worldometers_url, JHUCSSE_url } = statesCovid[state];
  const yesterdayDate = dateToYesterday(getTodayDate());
  if (date === yesterdayDate) {
    try {
      const apiRes = await axios.get(worldometers_url);
      res.status(200).send(parseWorldometers(apiRes.data));
    } catch (_) {
      res.status(400).json({
        message: `Failed to get Covid-19 data for ${state} on ${date}`,
      });
    }
  } else {
    try {
      const apiRes = await axios.get(JHUCSSE_url);
      res.status(200).json(parseJHUCSSEState(apiRes.data, date));
    } catch (_) {
      res.status(400).json({
        message: `Failed to get Covid-19 data for ${state} on ${date}`,
      });
    }
  }
  return;
}

export async function getStateCumulativeStatistics(req, res) {
  const { state: unformattedState } = req.params;
  const { start, end } = req.query;
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(statesCovid).includes(state)) {
    res.status(400).json({
      message: `Cannot find covid data for ${state} or may be spelled incorrectly`,
    });
    return;
  }
  if (start !== undefined) {
    // if a start date was given, validate it
    if (!isValidDate(start)) {
      res.status(400).json({
        message: `${start} is an invalid start date or is formatted incorrectly`,
      });
      return;
    }
  }
  if (end !== undefined) {
    // if an end date wsa given, validate it
    if (!isValidDate(end)) {
      res.status(400).json({
        message: `${end} is an invalid end date or is formatted incorrectly`,
      });
      return;
    }
  }
  // valid state, start and end date
  const EARLIEST_COVID_DATE = "1-22-2020";
  const LATEST_COVID_DATE = dateToYesterday(getTodayDate());
  const startDate = start === undefined ? EARLIEST_COVID_DATE : start;
  const endDate = end === undefined ? LATEST_COVID_DATE : end;
  const { worldometers_url, JHUCSSE_url } = statesCovid[state];
  let cumulativeData;
  try {
    const johnHopkinsApiRes = await axios.get(JHUCSSE_url);
    cumulativeData = parseJHUCSSEStateCumulative(
      johnHopkinsApiRes.data,
      startDate,
      endDate
    );
  } catch (_) {
    res.status(400).json({
      message: `Failed to get cumulative Covid-19 data for ${state} from ${startDate} to ${endDate}`,
    });
    return;
  }
  if (
    endDate === LATEST_COVID_DATE &&
    !Object.keys(cumulativeData.cases).includes(endDate)
  ) {
    // api wants most data for most recent date, but data from john hopkins didn't have it because
    // it is updated at different
    // get it from worldometers api
    try {
      const worldometersApiRes = await axios.get(worldometers_url);
      const {
        totalCases: recentTotalCases,
        totalDeaths: recentTotalDeaths,
        totalRecovered: recentTotalRecovered,
      } = parseWorldometers(worldometersApiRes.data);
      // add to cumulative data obj
      cumulativeData.cases[endDate] = recentTotalCases;
      cumulativeData.deaths[endDate] = recentTotalDeaths;
      cumulativeData.recovered[endDate] = recentTotalRecovered;
    } catch (_) {
      res.status(400).json({
        message: `Failed to get cumulative Covid-19 data for ${state} on ${endDate}`,
      });
      return;
    }
  }
  res.status(200).json(cumulativeData);
}

export function getStateDailyStatistics(req, res) {
  res.send("daily statistics");
}
