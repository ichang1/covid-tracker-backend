import {
  dateToNumber,
  dateToYesterday,
  EARLIEST_COVID_DATE,
  EARLIEST_VACCINE_DATE,
  formatDate,
  unformatDate,
  dateInRange,
} from "./date.js";

export function parseJHUCSSECountryDate(data, date) {
  const todayDate = unformatDate(date);
  const yesterdayDate = unformatDate(dateToYesterday(date));

  const todayTotalCases = data.timeline.cases[todayDate];
  const todayTotalDeaths = data.timeline.deaths[todayDate];
  const todayTotalRecovered = data.timeline.recovered[todayDate];

  const yesterdayTotalCases =
    date === EARLIEST_COVID_DATE ? 0 : data.timeline.cases[yesterdayDate];
  const yesterdayTotalDeaths =
    date === EARLIEST_COVID_DATE ? 0 : data.timeline.deaths[yesterdayDate];
  const yesterdayTotalRecovered =
    date === EARLIEST_COVID_DATE ? 0 : data.timeline.recovered[yesterdayDate];

  const todayCases = todayTotalCases - yesterdayTotalCases;
  const todayDeaths = todayTotalDeaths - yesterdayTotalDeaths;
  const todayRecovered = todayTotalRecovered - yesterdayTotalRecovered;

  return {
    todayCases,
    todayDeaths,
    todayRecovered,
    totalCases: todayTotalCases,
    totalDeaths: todayTotalDeaths,
    totalRecovered: todayTotalRecovered,
  };
}

export function parseJHUCSSECountryCumulative(data, startDate, endDate) {
  const interestedDates = Object.keys(data.timeline.cases)
    .filter((date) => dateInRange(date, startDate, endDate))
    .sort(
      (date1, date2) =>
        dateToNumber(formatDate(date1)) - dateToNumber(formatDate(date2))
    );

  let cases = {};
  let deaths = {};
  let recovered = {};
  interestedDates.forEach((date) => {
    const hyphenDateFullYear = formatDate(date);
    cases[hyphenDateFullYear] = data.timeline.cases[date];
    deaths[hyphenDateFullYear] = data.timeline.deaths[date];
    recovered[hyphenDateFullYear] = data.timeline.recovered[date];
  });
  return { cases, deaths, recovered };
}

export function parseJHUCSSECountryDaily(data, startDate, endDate) {
  const datesInterested = Object.keys(data.timeline.cases)
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

  datesInterested.forEach((date, idx) => {
    if (idx > 0) {
      prevDate = datesInterested[idx - 1];
    } else {
      // idx == 0
      if (date === unformatDate(EARLIEST_COVID_DATE)) {
        // there is no earlier date
        prevDate = "";
      } else {
        // prevDate is outside of range of interested dates because it comes before the first date
        prevDate = unformatDate(dateToYesterday(formatDate(date)));
      }
    }
    const casesTotalThisDay = data.timeline.cases[date];
    const casesTotalYesterday =
      prevDate === "" ? 0 : data.timeline.cases[prevDate];

    const newCasesToday =
      casesTotalThisDay - casesTotalYesterday >= 0
        ? casesTotalThisDay - casesTotalYesterday
        : 0;

    const deathsTotalThisDay = data.timeline.deaths[date];
    const deathsTotalYesterday =
      prevDate === "" ? 0 : data.timeline.deaths[prevDate];

    const newDeathsToday =
      deathsTotalThisDay - deathsTotalYesterday >= 0
        ? deathsTotalThisDay - deathsTotalYesterday
        : 0;

    const recoveredTotalThidDay = data.timeline.recovered[date];
    const recoveredTotalYesterday =
      prevDate === "" ? 0 : data.timeline.recovered[prevDate];

    const newRecoveredToday =
      recoveredTotalThidDay - recoveredTotalYesterday >= 0
        ? recoveredTotalThidDay - recoveredTotalYesterday
        : 0;

    const hyphenDateFullYear = formatDate(date);
    cases[hyphenDateFullYear] = newCasesToday;
    deaths[hyphenDateFullYear] = newDeathsToday;
    recovered[hyphenDateFullYear] = newRecoveredToday;
  });

  return { cases, deaths, recovered };
}

export function parseRAPSCountryDate(data, date) {
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

export function parseRAPSCountryCumulative(data, startDate, endDate) {
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

export function parseRAPSCountryDaily(data, startDate, endDate) {
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
