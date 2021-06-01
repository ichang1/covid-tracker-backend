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

export function parseJHUCSSEStateDate(data, date) {
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

export function parseJHUCSSEStateDaily(data, startDate, endDate) {
  const formatDate = (date) => {
    const [month, day, year] = date.split("/");
    return `${month}-${day}-${parseInt(year) + 2000}`;
  };
  const unformatDate = (date) => {
    const [month, day, year] = date.split("-");
    return `${month}/${day}/${parseInt(year) - 2000}`;
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
  let prevDate;
  const EARLIEST_COVID_DATE = "1/22/20";
  datesInterested.forEach((date, idx) => {
    if (idx > 0) {
      prevDate = datesInterested[idx - 1];
    } else {
      // idx == 0
      if (date === EARLIEST_COVID_DATE) {
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
        countyTodayTotalCases - countyYesterdayTotalCases;
      return acc + countyTodayNewCases;
    }, 0);

    const newDeathsThisDay = data.reduce((acc, curCounty) => {
      const countyYesterdayTotalDeaths =
        prevDate === "" ? 0 : curCounty.timeline.deaths[prevDate];
      const countyTodayTotalDeaths = curCounty.timeline.deaths[date];
      const countyTodayNewDeaths =
        countyTodayTotalDeaths - countyYesterdayTotalDeaths;
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
  const [month, day, year] = date.split("-");
  const newDate = [month, day, year % 1000].join("/");
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
  const datesInterested = data.timeline
    .filter(({ date: d }) => dateInRange(d))
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
  return { dosesTotal: cumulativeData };
}

export function parseRAPSStateDaily(data, startDate, endDate) {
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
  const datesInterested = data.timeline
    .filter(({ date: d }) => dateInRange(d))
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
  return { dosesDaily: dailyData };
}
