import axios from "axios";
import querystring from "querystring";
import { statesCovid } from "../utils/statesCovid.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
} from "../utils/date.js";
import { parseWorldometers, parseJHUCSSEState } from "../utils/parse.js";

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
  const todayDate = getTodayDate();
  const yesterdayDate = dateToYesterday(todayDate);
  if (date === todayDate) {
    try {
      const apiRes = await axios.get(worldometers_url);
      res.status(200).json(parseWorldometers(apiRes.data));
    } catch (_) {
      res.status(400).json({
        message: `Failed to get Covid-19 data for ${state} on ${date}`,
      });
    }
  } else if (date === yesterdayDate) {
    try {
      const apiRes = await axios.get(`${worldometers_url}?yesterday=true`);
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
}

export function getStateCumulativeStatistics(req, res) {
  res.send("cumulative statistics");
}

export function getStateDailyStatistics(req, res) {
  res.send("daily statistics");
}
