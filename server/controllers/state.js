import axios from "axios";
import { statesCovid } from "../places/states.js";
import {
  isValidDate,
  validateDateRange,
  cleanDate,
  getLatestCovidDate,
  getLatestVaccineDate,
  EARLIEST_COVID_DATE,
  EARLIEST_VACCINE_DATE,
} from "../utils/date.js";
import {
  parseJHUCSSEStateDate,
  parseJHUCSSEStateCumulative,
  parseJHUCSSEStateDaily,
  parseRAPSStateDate,
  parseRAPSStateCumulative,
  parseRAPSStateDaily,
} from "../utils/parseState.js";

export function getStates(_, reply) {
  const us_states = { states: Object.keys(statesCovid) };
  reply.code(200).send(us_states);
}

export async function getStateDateCovidStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${state} or may be spelled incorrectly`,
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
  if (dateReq === undefined) {
    date = await getLatestCovidDate();
  } else {
    date = cleanDate(dateReq);
  }
  // state and date are valid
  const { JHUCSSE_url } = statesCovid[state];
  try {
    const apireply = await axios.get(JHUCSSE_url);
    reply
      .code(200)
      .send({ ...parseJHUCSSEStateDate(apireply.data, date), date, state });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get covid-19 data for ${state} on ${date}`,
    });
  }
}

export async function getStateCumulativeCovidStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { start, end } = req.query;
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${state} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }
  // valid state, start and end date
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate =
    end === undefined ? await getLatestVaccineDate() : cleanDate(end);
  const { JHUCSSE_url } = statesCovid[state];
  let cumulativeData;
  try {
    const johnHopkinsApireply = await axios.get(JHUCSSE_url);
    cumulativeData = parseJHUCSSEStateCumulative(
      johnHopkinsApireply.data,
      startDate,
      endDate
    );
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get cumulative covid-19 data for ${state} from ${startDate} to ${endDate}`,
    });
    return;
  }
  reply
    .code(200)
    .send({ ...cumulativeData, state, start: startDate, end: endDate });
}

export async function getStateDailyCovidStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { start, end } = req.query;
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${state} or may be spelled incorrectly`,
    });
    return;
  }
  const { dateRangeIsValid, message } = validateDateRange(start, end);
  if (!dateRangeIsValid) {
    reply.code(400).send({ message });
    return;
  }

  // valid state, start and end date
  const startDate =
    start === undefined ? EARLIEST_COVID_DATE : cleanDate(start);
  const endDate =
    end === undefined ? await getLatestCovidDate() : cleanDate(end);
  const { JHUCSSE_url } = statesCovid[state];
  let dailyData;
  try {
    const johnHopkinsApireply = await axios.get(JHUCSSE_url);
    dailyData = parseJHUCSSEStateDaily(
      johnHopkinsApireply.data,
      startDate,
      endDate
    );
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get daily covid-19 data for ${state} from ${startDate} to ${endDate}`,
    });
    return;
  }
  reply.code(200).send({ ...dailyData, state, start: startDate, end: endDate });
}

export async function getStateDateVaccineStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { date: dateReq } = req.query;
  // uppercase all the words in the state name Ex: new york -> New York
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());
  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 vaccine data for ${state} or may be spelled incorrectly`,
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
  if (dateReq === undefined) {
    date = await getLatestVaccineDate();
  } else {
    date = cleanDate(dateReq);
  }
  // state and date are valid
  const { vaccine: vaccine_url } = statesCovid[state];
  try {
    const apireply = await axios.get(vaccine_url);
    reply
      .code(200)
      .send({ ...parseRAPSStateDate(apireply.data, date), date, state });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get covid-19 vaccine data for ${state} on ${date}`,
    });
  }
  return;
}

export async function getStateCumulativeVaccineStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { start, end } = req.query;
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${state} or may be spelled incorrectly`,
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
  const startDate =
    start === undefined ? EARLIEST_VACCINE_DATE : cleanDate(start);
  const endDate =
    end === undefined ? await getLatestVaccineDate() : cleanDate(end);
  const { vaccine: vaccine_url } = statesCovid[state];
  try {
    const apireply = await axios.get(vaccine_url);
    reply.code(200).send({
      ...parseRAPSStateCumulative(apireply.data, startDate, endDate),
      state,
      start: startDate,
      end: endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get cumulative covid-19 vaccine data for ${state} from ${startDate} to ${endDate}`,
    });
  }
}

export async function getStateDailyVaccineStatistics(req, reply) {
  const { state: unformattedState } = req.params;
  const { start, end } = req.query;
  const state = unformattedState.replace(/\b\w/g, (l) => l.toUpperCase());

  if (!Object.keys(statesCovid).includes(state)) {
    reply.code(400).send({
      message: `Cannot find covid-19 data for ${state} or may be spelled incorrectly`,
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
  const startDate =
    start === undefined ? EARLIEST_VACCINE_DATE : cleanDate(start);
  const endDate =
    end === undefined ? await getLatestVaccineDate() : cleanDate(end);
  const { vaccine: vaccine_url } = statesCovid[state];
  try {
    const apireply = await axios.get(vaccine_url);
    reply.code(200).send({
      ...parseRAPSStateDaily(apireply.data, startDate, endDate),
      state,
      start: startDate,
      end: endDate,
    });
  } catch (_) {
    reply.code(400).send({
      message: `Failed to get daily covid-19 vaccine data for ${state} from ${startDate} to ${endDate}`,
    });
  }
}
