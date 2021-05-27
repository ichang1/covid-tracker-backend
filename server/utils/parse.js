import { dateToYesterday } from "./date.js";

export function parseWorldometers(data) {
  const { cases, todayCases, deaths, todayDeaths, recovered, todayRecovered } =
    data;
  return {
    totalCases: cases,
    todayCases,
    totaDdeaths: deaths,
    todayDeaths,
    totalRecovered: recovered,
    todayRecovered,
  };
}

export function parseJHUCSSEState(data, date) {
  const [month, day, year] = date.split("-");
  const newDate = [month, day, year % 1000].join("/");
  const [yesterdayMonth, yesterdayDay, yesterdayYear] =
    dateToYesterday(date).split("-");
  const newYesterdayDate = [
    yesterdayMonth,
    yesterdayDay,
    yesterdayYear % 1000,
  ].join("/");
  const casesTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.cases[newDate],
    0
  );
  const yesterdayCasesTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.cases[newYesterdayDate],
    0
  );
  const todayNewCases = casesTotal - yesterdayCasesTotal;
  const deathsTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.deaths[newDate],
    0
  );
  const yesterdayDeathsTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.deaths[newYesterdayDate],
    0
  );
  const todayNewDeaths = deathsTotal - yesterdayDeathsTotal;
  // John Hopkins doesn't actually report recovered.
  return {
    totalCases: casesTotal,
    todayCases: todayNewCases,
    totalDeaths: deathsTotal,
    todayDeaths: todayNewDeaths,
    totalRecovered: 0,
    todayRecovered: 0,
  };
}
