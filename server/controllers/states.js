import axios from "axios";
import querystring from "querystring";

export function getStates(req, res) {
  res.send("List of states");
}

export function getStateDateStatistics(req, res) {
  res.send("date statistics");
}

export function getStateCumulativeStatistics(req, res) {
  res.send("cumulative statistics");
}

export function getStateDailyStatistics(req, res) {
  res.send("daily statistics");
}
