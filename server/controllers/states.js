import axios from "axios";
import querystring from "querystring";
import { statesCovid } from "../utils/statesCovid.js";

export function getStates(req, res) {
  const us_states = { states: Object.keys(statesCovid) };
  res.status(201).json(us_states);
}

export async function getStateDateStatistics(req, res) {
  const EARLIEST_COVID_DATE = 1;
  const LATEST_COVID_DATE = 2;
  const { state, date } = req.params;
  if (!Object.keys(statesCovid).includes(state)) {
    res.status(401).json({ message: `Cannot find covid data for ${state}. ` });
  }
  const { url, api } = statesCovid[state];
  res.send("date statistics");
}

export function getStateCumulativeStatistics(req, res) {
  res.send("cumulative statistics");
}

export function getStateDailyStatistics(req, res) {
  res.send("daily statistics");
}
