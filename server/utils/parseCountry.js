import { dateToNumber, dateToYesterday } from "./date.js";

export function parseJHUCSSECountryDate(data, date) {
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
    dateToNumber(formatDate(date)) > dateToNumber(EARLIEST_COVID_DATE);
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

export function parseJHUCSSECountryCumulative(data, startDate, endDate) {
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
