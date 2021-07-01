import { GET, ERROR, statusCodes } from "./utils";

const stateValidStateTests = [
  {
    description: "Get all states to query covid-19 stats",
    url: "/covid-19/state",
    method: GET,
    expectCode: statusCodes[GET],
  },
];

const stateValidDateTests = [
  {
    description: "Get covid-19 date stats for valid state and no date given",
    url: "/covid-19/state/california/date",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description: "Get covid-19 date stats for valid state and date given",
    url: "/covid-19/state/maine/date?date=4-4-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
];

const stateValidCumulativeTests = [
  {
    description: "Get covid-19 cumulative stats for valid state",
    url: "/covid-19/state/maine/cumulative",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and only start date",
    url: "/covid-19/state/maine/cumulative?start=1-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and only end date",
    url: "/covid-19/state/maine/cumulative?end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and only end date",
    url: "/covid-19/state/maine/cumulative?end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and start and end date",
    url: "/covid-19/state/maine/cumulative?start=1-22-2020&end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
];

const stateValidDailyTests = [
  {
    description: "Get covid-19 daily stats for valid state",
    url: "/covid-19/state/maine/daily",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description: "Get covid-19 daily stats for valid state and only start date",
    url: "/covid-19/state/maine/daily?start=1-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description: "Get covid-19 daily stats for valid state and only end date",
    url: "/covid-19/state/maine/daily?end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description: "Get covid-19 daily stats for valid state and only end date",
    url: "/covid-19/state/maine/daily?end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
  {
    description:
      "Get covid-19 daily stats for valid state and start and end date",
    url: "/covid-19/state/maine/daily?start=1-22-2020&end=12-22-2020",
    method: GET,
    expectCode: statusCodes[GET],
  },
];

const stateErrorDateTests = [
  {
    description: "Get covid-19 date stats for invalid state",
    url: "/covid-19/state/abc/date",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description: "Get covid-19 date stats for invalid state and invalid date",
    url: "/covid-19/state/abc/date?date=1-1-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description: "Get covid-19 date stats for invalid state and valid date",
    url: "/covid-19/state/abc/date?date=3-1-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 date stats for invalid state and wrong format date",
    url: "/covid-19/state/abc/date?date=3/1/2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description: "Get covid-19 date stats for valid state and invalid date",
    url: "/covid-19/state/maine/date?date=1-1-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 date stats for valid state and wrong format date",
    url: "/covid-19/state/maine/date?date=10/1/2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
];

const stateErrorCumulativeTests = [
  {
    description:
      "Get covid-19 cumulative stats for invalid state and no start and no end",
    url: "/covid-19/state/abc/cumulative",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and valid start no end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and invalid start no end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2019",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and wrong format start no end",
    url: "/covid-19/state/abc/cumulative?start=1/22/2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and no start valid end",
    url: "/covid-19/state/abc/cumulative?end=12-22-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and no start invalid end",
    url: "/covid-19/state/abc/cumulative?end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and no start wrong format end",
    url: "/covid-19/state/abc/cumulative?end=1/22/2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and valid start valid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2020&end=1-22-2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and invalid start valid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2019&end=1-22-2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and wrong format start valid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-safd&end=1-22-2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and valid start invalid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2020&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and invalid start invalid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2019&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and wrong format start invalid end",
    url: "/covid-19/state/abc/cumulative?start=1-22-safd&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and valid start wrong format end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2020&end=1-22-adsf",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and invalid start wrong format end",
    url: "/covid-19/state/abc/cumulative?start=1-22-2019&end=1-22-sdgg",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for invalid state and wrong format start wrong format end",
    url: "/covid-19/state/abc/cumulative?start=1-22-safd&end=1-22-!@#$",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and valid start no end",
    url: "/covid-19/state/boston/cumulative?start=1-22-2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and invalid start no end",
    url: "/covid-19/state/maine/cumulative?start=1-22-2019",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and wrong format start no end",
    url: "/covid-19/state/texas/cumulative?start=1/22/2020",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and no start invalid end",
    url: "/covid-19/state/michigan/cumulative?end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and no start wrong format end",
    url: "/covid-19/state/alabama/cumulative?end=1/22/2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and invalid start valid end",
    url: "/covid-19/state/washington/cumulative?start=1-22-2019&end=1-22-2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and wrong format start valid end",
    url: "/covid-19/state/nebraska/cumulative?start=1-22-safd&end=1-22-2021",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and valid start invalid end",
    url: "/covid-19/state/florida/cumulative?start=1-22-2020&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and invalid start invalid end",
    url: "/covid-19/state/vermont/cumulative?start=1-22-2019&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and wrong format start invalid end",
    url: "/covid-19/state/virginia/cumulative?start=1-22-safd&end=1-22-9999",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and valid start wrong format end",
    url: "/covid-19/state/nevada/cumulative?start=1-22-2020&end=1-22-adsf",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and invalid start wrong format end",
    url: "/covid-19/state/idaho/cumulative?start=1-22-2019&end=1-22-sdgg",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
  {
    description:
      "Get covid-19 cumulative stats for valid state and wrong format start wrong format end",
    url: "/covid-19/state/wisconsin/cumulative?start=1-22-safd&end=1-22-!@#$",
    method: GET,
    expectCode: statusCodes[ERROR],
  },
];

export const stateTests = [
  ...stateValidStateTests,
  ...stateValidDateTests,
  ...stateValidCumulativeTests,
  ...stateValidDailyTests,
  ...stateErrorDateTests,
  ...stateErrorCumulativeTests,
];
