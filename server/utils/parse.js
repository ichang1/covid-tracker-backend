import { dateToNumber, dateToYesterday } from "./date.js";

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

export function parseJHUCSSEStateCumulative(data, startDate, endDate) {
  const formatDate = (date) => {
    const [month, day, year] = date.split("/");
    return `${month}-${day}-${parseInt(year) + 2000}`;
  };
  const dateInRange = (d) => {
    const date = formatDate(d);
    return (
      dateToNumber(date) >= dateToNumber(startDate) &&
      dateToNumber(date) <= dateToNumber(endDate)
    );
  };
  const allDates = Object.keys(data[0].timeline.cases);
  const datesInterested = allDates
    .filter((date) => dateInRange(date))
    .sort((date1, date2) => {
      const a = dateToNumber(formatDate(date1));
      const b = dateToNumber(formatDate(date2));

      return a - b;
    });

  let cases = {};
  let deaths = {};
  let recovered = {};

  datesInterested.forEach((date) => {
    const totalCasesThisDay = data.reduce(
      (acc, curCounty) => acc + curCounty.timeline.cases[date],
      0
    );

    const totalDeathsThisDay = data.reduce(
      (acc, curCounty) => acc + curCounty.timeline.deaths[date],
      0
    );
    const totalRecoveredThisDay = 0;

    const hyphenDateFullYear = formatDate(date);
    cases[hyphenDateFullYear] = totalCasesThisDay;
    deaths[hyphenDateFullYear] = totalDeathsThisDay;
    recovered[hyphenDateFullYear] = totalRecoveredThisDay;
  });
  return { cases, deaths, recovered };
}
