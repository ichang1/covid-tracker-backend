import {
  dateToNumber,
  dateToYesterday,
  EARLIEST_COVID_DATE,
  EARLIEST_VACCINE_DATE,
  formatDate,
  unformatDate,
  dateInRange,
} from "./date.js";

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

export function parseJHUCSSEStateDate(data, date) {
  const todayDate = unformatDate(date);
  const yesterdayDate = unformatDate(dateToYesterday(date));

  const casesTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.cases[todayDate],
    0
  );
  const yesterdayCasesTotal =
    todayDate === unformatDate(EARLIEST_COVID_DATE)
      ? 0
      : data.reduce(
          (acc, arrCur) => acc + arrCur.timeline.cases[yesterdayDate],
          0
        );
  const todayNewCases = casesTotal - yesterdayCasesTotal;
  const deathsTotal = data.reduce(
    (acc, arrCur) => acc + arrCur.timeline.deaths[todayDate],
    0
  );
  const yesterdayDeathsTotal =
    todayDate === unformatDate(EARLIEST_COVID_DATE)
      ? 0
      : data.reduce(
          (acc, arrCur) => acc + arrCur.timeline.deaths[yesterdayDate],
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
  const allDates = Object.keys(data[0].timeline.cases);
  const datesInterested = allDates
    .filter((date) => dateInRange(date, startDate, endDate))
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

export function parseJHUCSSEStateDaily(data, startDate, endDate) {
  const allDates = Object.keys(data[0].timeline.cases);
  const datesInterested = allDates
    .filter((date) => dateInRange(date, startDate, endDate))
    .sort((date1, date2) => {
      const a = dateToNumber(formatDate(date1));
      const b = dateToNumber(formatDate(date2));

      return a - b;
    });

  let cases = {};
  let deaths = {};
  let recovered = {};
  let prevDate;
  const earliest_covid_date = unformatDate(EARLIEST_COVID_DATE);
  datesInterested.forEach((date, idx) => {
    if (idx > 0) {
      prevDate = datesInterested[idx - 1];
    } else {
      // idx == 0
      if (date === earliest_covid_date) {
        // there is no earlier date
        prevDate = "";
      } else {
        // prevDate is outside of range of interested dates because it comes before the first date
        prevDate = unformatDate(dateToYesterday(formatDate(date)));
      }
    }

    const newCasesThisDay = data.reduce((acc, curCounty) => {
      const countyYesterdayTotalCases =
        prevDate === "" ? 0 : curCounty.timeline.cases[prevDate];
      const countyTodayTotalCases = curCounty.timeline.cases[date];
      const countyTodayNewCases =
        countyTodayTotalCases - countyYesterdayTotalCases >= 0
          ? countyTodayTotalCases - countyYesterdayTotalCases
          : 0;
      return acc + countyTodayNewCases;
    }, 0);

    const newDeathsThisDay = data.reduce((acc, curCounty) => {
      const countyYesterdayTotalDeaths =
        prevDate === "" ? 0 : curCounty.timeline.deaths[prevDate];
      const countyTodayTotalDeaths = curCounty.timeline.deaths[date];
      const countyTodayNewDeaths =
        countyTodayTotalDeaths - countyYesterdayTotalDeaths >= 0
          ? countyTodayTotalDeaths - countyYesterdayTotalDeaths
          : 0;
      return acc + countyTodayNewDeaths;
    }, 0);

    const newRecoveredThisDay = 0;

    const hyphenDateFullYear = formatDate(date);
    cases[hyphenDateFullYear] = newCasesThisDay;
    deaths[hyphenDateFullYear] = newDeathsThisDay;
    recovered[hyphenDateFullYear] = newRecoveredThisDay;
  });
  return { cases, deaths, recovered };
}

export function parseRAPSStateDate(data, date) {
  const newDate = unformatDate(date);
  const filteredDateStats = data.timeline.filter(
    ({ date: d }) => d === newDate
  );
  if (filteredDateStats.length === 0) {
    return { totalDoses: 0, todayDoes: 0 };
  }
  const { total: totalDoses, daily: todayDoses } = filteredDateStats[0];
  return { totalDoses, todayDoses };
}

export function parseRAPSStateCumulative(data, startDate, endDate) {
  const datesInterested = data.timeline
    .filter(({ date: d }) => dateInRange(d, startDate, endDate))
    .sort(({ date: date1 }, { date: date2 }) => {
      const a = dateToNumber(formatDate(date1));
      const b = dateToNumber(formatDate(date2));

      return a - b;
    });
  let cumulativeData = {};
  datesInterested.forEach(({ total, date }) => {
    const hyphenDateFullYear = formatDate(date);
    cumulativeData[hyphenDateFullYear] = total;
  });
  return { doses: cumulativeData };
}

export function parseRAPSStateDaily(data, startDate, endDate) {
  const datesInterested = data.timeline
    .filter(({ date: d }) => dateInRange(d, startDate, endDate))
    .sort(({ date: date1 }, { date: date2 }) => {
      const a = dateToNumber(formatDate(date1));
      const b = dateToNumber(formatDate(date2));

      return a - b;
    });
  let dailyData = {};
  datesInterested.forEach(({ daily, date }) => {
    const hyphenDateFullYear = formatDate(date);
    dailyData[hyphenDateFullYear] = daily;
  });
  return { doses: dailyData };
}
