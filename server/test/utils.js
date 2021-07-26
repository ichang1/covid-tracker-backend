import {
  randomDateFromRange,
  randomDateRangeFromRange,
  getTodayDate,
  dateToYesterday,
} from "../utils/date.js";

export const GET = "GET";
export const ERROR = "ERROR";
export const statusCodes = {
  GET: 200,
  ERROR: 400,
};
export const placeTypes = {
  STATE: "state",
  COUNTRY: "country",
  PROVINCE: "province",
};

export const routeTypes = {
  COVID_19: "covid-19",
  VACCINE: "vaccine",
};

const COVID_START_DATE = "1-22-2020";
const VACCINE_START_DATE = "12-1-2020";

const routeTypeStartDate = {
  "covid-19": COVID_START_DATE,
  vaccine: VACCINE_START_DATE,
};

const LATEST_DATE = dateToYesterday(getTodayDate());

function getRandomDateRangeAsQuery(minDate, maxDate) {
  const { startDate, endDate } = randomDateRangeFromRange(minDate, maxDate);
  return `start=${startDate}&end=${endDate}`;
}

export function generateValidPlaceTests(place, placeType, routeType) {
  const placeValidDateTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for ${place} with no date`,
      url: `/${routeType}/${placeType}/${place}/date`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for ${place} with date`,
      url: `/${routeType}/${placeType}/${place}/date?date=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
  ];

  const placeValidCumulativeTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with no start date and no end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with only start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with only end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with start date and end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?${getRandomDateRangeAsQuery(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
  ];

  const placeValidDailyTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with no start date and no end date`,
      url: `/${routeType}/${placeType}/${place}/daily`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with start date and end date`,
      url: `/${routeType}/${placeType}/${place}/daily?${getRandomDateRangeAsQuery(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.GET,
    },
  ];

  return [
    ...placeValidDateTests,
    ...placeValidCumulativeTests,
    ...placeValidDailyTests,
  ];
}

export function generateValidPlaceErrorTests(place, placeType, routeType) {
  const placeErrorDateTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for ${place} with invalid date`,
      url: `/${routeType}/${placeType}/${place}/date?date=1-1-2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for ${place} with wrong format date`,
      url: `/${routeType}/${placeType}/${place}/date?date=10/1/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  const placeErrorCumulativeTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with only invalid start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with only wrong format start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1/22/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with no start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with only wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=1/22/2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with invalid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with wrong format start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with valid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2020&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with invalid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with wrong format date and start invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with valid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2020&end=1-22-adsf`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with invalid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-sdgg`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for ${place} with wrong format start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-!@#$`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  const placeErrorDailyTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only invalid start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only wrong format start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1/22/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with only wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=1/22/2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with invalid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with wrong format start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with valid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with invalid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with wrong format start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with valid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-adsf`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with invalid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=1-22-sdgg`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for ${place} with wrong format start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=1-22-!@#$`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  return [
    ...placeErrorDateTests,
    ...placeErrorCumulativeTests,
    ...placeErrorDailyTests,
  ];
}

export function generateInvalidPlaceErrorTests(
  place = "abc",
  placeType,
  routeType
) {
  const errorDateTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for invalid ${placeType}, ${place}`,
      url: `/${routeType}/${placeType}/${place}/date`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for invalid ${placeType}, ${place}, with invalid date`,
      url: `/${routeType}/${placeType}/${place}/date?date=1-1-2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for invalid ${placeType}, ${place}, with valid date`,
      url: `/${routeType}/${placeType}/${place}/date?date=3-1-2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }date stats for invalid ${placeType}, ${place}, with wrong format date`,
      url: `/${routeType}/${placeType}/${place}/date?date=3/1/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  const errorCumulativeTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}`,
      url: `/${routeType}/${placeType}/${place}/cumulative`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only valid start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only invalid start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only wrong format start date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1/22/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=12-22-2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with only wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?end=1/22/2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with valid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?${getRandomDateRangeAsQuery(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with invalid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with wrong format start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with valid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with invalid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with wrong format start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with valid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-adsf`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }umulative stats for invalid ${placeType}, ${place}, with invalid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-2019&end=1-22-sdgg`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }cumulative stats for invalid ${placeType}, ${place}, with wrong format start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/cumulative?start=1-22-safd&end=1-22-!@#$`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  const errorDailyTests = [
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}`,
      url: `/${routeType}/${placeType}/${place}/daily`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only valid start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only invalid start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only wrong format start date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1/22/2020`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with only wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?end=1/22/2021`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with valid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?${getRandomDateRangeAsQuery(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with invalid start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with wrong format start date and valid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with valid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with invalid start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with wrong format start date and invalid end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=1-22-9999`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with valid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=${randomDateFromRange(
        routeTypeStartDate[routeType],
        LATEST_DATE
      )}&end=1-22-adsf`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with invalid start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-2019&end=1-22-sdgg`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
    {
      description: `Get covid-19 ${
        routeType === routeTypes.VACCINE ? "vaccine " : ""
      }daily stats for invalid ${placeType}, ${place}, with wrong format start date and wrong format end date`,
      url: `/${routeType}/${placeType}/${place}/daily?start=1-22-safd&end=1-22-!@#$`,
      method: GET,
      expectCode: statusCodes.ERROR,
    },
  ];

  return [...errorDateTests, ...errorCumulativeTests, ...errorDailyTests];
}
