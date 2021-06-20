import { dateToNumber, dateToYesterday } from "./date.js";

export function parseJHUCSSEProvinceDate(data, date) {
  const formatDate = (d) => {
    const [month, day, year] = d.split("/");
    return `${month}-${day}-${year + 2000}`;
  };

  const unformatDate = (d) => {
    const [month, day, year] = d.split("-");
    return `${month}/${day}/${year % 1000}`;
  };

  const todayDate = unformatDate(date);
  const yesterdayDate = unformatDate(dateToYesterday(date));

  const todayTotalCases = data.timeline.cases[todayDate];
  const todayTotalDeaths = data.timeline.deaths[todayDate];
  const todayTotalRecovered = data.timeline.recovered[todayDate];

  const EARLIEST_COVID_DATE = "1-22-2020";
  const hasValidYesterdayDate =
    dateToNumber(formatDate(date)) >= dateToNumber(EARLIEST_COVID_DATE);
  const yesterdayTotalCases = hasValidYesterdayDate
    ? data.timeline.cases[yesterdayDate]
    : 0;
  const yesterdayTotalDeaths = hasValidYesterdayDate
    ? data.timeline.deaths[yesterdayDate]
    : 0;
  const yesterdayTotalRecovered = hasValidYesterdayDate
    ? data.timeline.recovered[yesterdayDate]
    : 0;

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

export function parseJHUCSSEProvinceCumulative(data, startDate, endDate) {
  const formatDate = (d) => {
    const [month, day, year] = d.split("/");
    return `${month}-${day}-${parseInt(year) + 2000}`;
  };

  const interestedDates = Object.keys(data.timeline.cases)
    .filter(
      (date) =>
        dateToNumber(startDate) <= dateToNumber(formatDate(date)) &&
        dateToNumber(endDate) >= dateToNumber(formatDate(date))
    )
    .sort(
      (date1, date2) =>
        dateToNumber(formatDate(date1)) - dateToNumber(formatDate(date2))
    );

  console.log(interestedDates);

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

export function parseJHUCSSEProvinceDaily(data, startDate, endDate) {
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
  const allDates = Object.keys(data.timeline.cases);
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
    const casesTotalThisDay = data.timeline.cases[date];
    const casesTotalYesterday =
      prevDate === "" ? 0 : data.timeline.cases[prevDate];

    const newCasesToday = casesTotalThisDay - casesTotalYesterday;

    const deathsTotalThisDay = data.timeline.deaths[date];
    const deathsTotalYesterday =
      prevDate === "" ? 0 : data.timeline.deaths[prevDate];

    const newDeathsToday = deathsTotalThisDay - deathsTotalYesterday;

    const recoveredTotalThidDay = data.timeline.recovered[date];
    const recoveredTotalYesterday =
      prevDate === "" ? 0 : data.timeline.recovered[prevDate];

    const newRecoveredToday = recoveredTotalThidDay - recoveredTotalYesterday;

    const hyphenDateFullYear = formatDate(date);
    cases[hyphenDateFullYear] = newCasesToday;
    deaths[hyphenDateFullYear] = newDeathsToday;
    recovered[hyphenDateFullYear] = newRecoveredToday;
  });

  return { cases, deaths, recovered };
}

export function parseRAPSProvinceDate(data, date) {
  return {
    totalDoses: 0,
    todayDoses: 0,
  };
}

export function parseRAPSProvinceCumulative(data, startDate, endDate) {
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
  // const datesInterested = data.timeline
  //   .filter(({ date: d }) => dateInRange(d))
  //   .sort(({ date: date1 }, { date: date2 }) => {
  //     const a = dateToNumber(formatDate(date1));
  //     const b = dateToNumber(formatDate(date2));

  //     return a - b;
  //   });

  // datesInterested.forEach(({ total, date }) => {
  //   const hyphenDateFullYear = formatDate(date);
  //   cumulativeData[hyphenDateFullYear] = total;
  // });

  let cumulativeData = {};
  let curDate = endDate;
  let datesInterestedUnsorted = [];
  while (dateInRange(curDate)) {
    datesInterestedUnsorted.push(curDate);
    curDate = dateToYesterday(curDate);
  }
  const datesInterested = datesInterestedUnsorted.sort((date1, date2) => {
    const a = dateToNumber(date1);
    const b = dateToNumber(date2);

    return a - b;
  });
  datesInterested.forEach((date) => {
    cumulativeData[date] = 0;
  });
  return { dosesTotal: cumulativeData };
}

export function parseRAPSProvinceDaily(data, startDate, endDate) {
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
  // const datesInterested = data.timeline
  //   .filter(({ date: d }) => dateInRange(d))
  //   .sort(({ date: date1 }, { date: date2 }) => {
  //     const a = dateToNumber(formatDate(date1));
  //     const b = dateToNumber(formatDate(date2));

  //     return a - b;
  //   });

  // datesInterested.forEach(({ daily, date }) => {
  //   const hyphenDateFullYear = formatDate(date);
  //   dailyData[hyphenDateFullYear] = daily;
  // });

  let dailyData = {};
  let curDate = endDate;
  let datesInterestedUnsorted = [];
  while (dateInRange(curDate)) {
    datesInterestedUnsorted.push(curDate);
    curDate = dateToYesterday(curDate);
  }
  const datesInterested = datesInterestedUnsorted.sort((date1, date2) => {
    const a = dateToNumber(date1);
    const b = dateToNumber(date2);

    return a - b;
  });
  datesInterested.forEach((date) => {
    dailyData[date] = 0;
  });

  return { dosesDaily: dailyData };
}
