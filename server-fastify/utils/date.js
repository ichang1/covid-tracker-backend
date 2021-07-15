/**
 *  converts a date into an integer for comparison
 * @param {String} date M-DD-YYYY
 * @returns integer in the form of <YYYY><MM><DD>
 */
export function dateToNumber(date) {
  // Ex: 1-7-2020 -> 20200107
  // Ex: 10-11-2020 -> 20201011
  const [month, day, year] = date.split("-").map((int) => parseInt(int));
  const monthString = parseInt(month) < 10 ? `0${month}` : `${month}`;
  const dayString = parseInt(day) < 10 ? `0${day}` : `${day}`;
  return parseInt(`${year}${monthString}${dayString}`);
}

/**
 *  function checks whether a date is valid for the api
 * @param {String} date M-D-YYYY
 * @returns boolean of whether date is valid date for api
 */
export function isValidDate(date, type = "covid") {
  if (date.split("-").length !== 3) {
    return false;
  }
  const [month, day, year] = date.split("-");
  // check if string version of month is valid
  if (!stringIsInteger(month)) {
    return false;
  }
  // check if string version of day is valid
  if (!stringIsInteger(day)) {
    return false;
  }
  // check if string version of year is valid
  if (!stringIsInteger(year)) {
    return false;
  }
  // check if valid month
  if (parseInt(month) < 1 || parseInt(month) > 12) {
    return false;
  }

  //check if valid day
  if (parseInt(day) < 1) {
    return false;
  }
  if (parseInt(month) % 2 == 1) {
    if (parseInt(day) > 31) {
      return false;
    }
  } else {
    if (parseInt(month) == 2) {
      if (parseInt(year) % 4 == 0) {
        // leap year
        if (parseInt(day) > 29) {
          return false;
        }
      } else {
        // not leap year
        if (parseInt(day) > 28) {
          return false;
        }
      }
    } else {
      if (parseInt(day) > 30) {
        return false;
      }
    }
  }
  if (parseInt(year) < 0) {
    return false;
  }
  // date should be a valid date
  const yesterdayDate = dateToYesterday(getTodayDate());
  const LATEST_DATE = yesterdayDate;
  let EARLIEST_DATE;
  if (type === "vaccine") {
    EARLIEST_DATE = "12-1-2020";
  } else {
    EARLIEST_DATE = "1-22-2020";
  }
  //check if date is too early or too late
  if (
    dateToNumber(date) < dateToNumber(EARLIEST_DATE) ||
    dateToNumber(date) > dateToNumber(LATEST_DATE)
  ) {
    return false;
  }
  return true;
}

/**
 *
 * @param {String} date M-DD-YYYY
 * @returns yesterday's date with same format
 */
export function dateToYesterday(date) {
  const [monthString, dayString, yearString] = date.split("-");
  const month = parseInt(monthString);
  const day = parseInt(dayString);
  const year = parseInt(yearString);
  if (day !== 1) {
    return `${month}-${day - 1}-${year}`;
  }
  // day == 1
  if (month === 1) {
    return `${12}-${31}-${year - 1}`;
  }
  // day == 1 and month > 1
  if (month === 3) {
    if (year % 4 === 0) {
      // leap year
      return `${2}-${29}-${year}`;
    } else {
      // leap year
      return `${2}-${28}-${year}`;
    }
  }
  // day == 1 and month > 1 and month != 3
  if (month % 2 === 0) {
    return `${month - 1}-${31}-${year}`;
  }
  // day == 1 and month > 1 and month != 3 and odd month
  return `${month - 1}-${30}-${year}`;
}

export function validateDateRange(start, end, type = "covid") {
  if (start !== undefined) {
    // if a start date was given, validate it
    if (!isValidDate(start, type)) {
      return {
        dateRangeIsValid: false,
        message: `${start} is an invalid start date or is formatted incorrectly`,
      };
    }
  }
  if (end !== undefined) {
    // if an end date was given, validate it
    if (!isValidDate(end, type)) {
      return {
        dateRangeIsValid: false,
        message: `${end} is an invalid end date or is formatted incorrectly`,
      };
    }
  }
  // both dates are valid dates
  if (start !== undefined && end !== undefined) {
    if (dateToNumber(start) > dateToNumber(end)) {
      return {
        dateRangeIsValid: false,
        message: `${start} to ${end} is an invalid date range`,
      };
    }
  }
  return {
    dateRangeIsValid: true,
  };
}

/**
 *  function gets today's date as M-DD-YYYY
 */
export function getTodayDate() {
  const today = new Date();
  const todayDate = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;
  return todayDate;
}

function stringIsInteger(string) {
  const digits = "0123456789".split("");

  return string.split("").every((char) => digits.includes(char));
}

export function cleanDate(date) {
  const [month, day, year] = date.split("-").map((intStr) => parseInt(intStr));
  return `${month}-${day}-${year}`;
}

export function randomDateFromRange(minDate, maxDate) {
  const [minDateMonth, minDateDay, minDateYear] = minDate.split("-");
  const [maxDateMonth, maxDateDay, maxDateYear] = maxDate.split("-");
  const randYear = randIntRange(minDateYear, maxDateYear);

  let randMonth;
  if (randYear === minDateYear) {
    randMonth = randIntRange(minDate, 12);
  } else if (randYear === maxDateYear) {
    randMonth = randIntRange(1, maxDateYear);
  } else {
    randMonth = randIntRange(1, 12);
  }

  let randDay;
  if (randMonth === 2) {
    //feburary
    if (randMonth === minDateMonth && randYear === minDateYear) {
      randDay = randIntRange(minDateDay, 28 + 1 * (randYear % 4 === 0));
    } else if (randMonth === maxDateMonth && randYear === maxDateYear) {
      randDay = randIntRange(1, maxDateDay);
    } else {
      randDay = randIntRange(1, 28 + 1 * (randYear % 4 === 0));
    }
  } else {
    if (randMonth === minDateMonth && randYear === minDateYear) {
      randDay = randIntRange(minDateDay, 30 + 1 * (randMonth % 2 === 1));
    } else if (randMonth === maxDateMonth && randYear === maxDateYear) {
      randDay = randIntRange(1, maxDateDay);
    } else {
      randDay = randIntRange(1, 30 + 1 * (randMonth % 2 === 1));
    }
  }
  return `${randMonth}-${randDay}-${randYear}`;
}

export function randomDateRangeFromRange(minDate, maxDate) {
  const startDate = randomDateFromRange(minDate, maxDate);
  const endDate = randomDateFromRange(startDate, maxDate);
  return { startDate, endDate };
}

function randIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
