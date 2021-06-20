export const getStateOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["states"],
        properties: {
          states: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

export const getCovidStateDateStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: [
          "totalCases",
          "todayCases",
          "totalDeaths",
          "todayDeaths",
          "totalRecovered",
          "todayRecovered",
          "date",
          "state",
        ],
        properties: {
          totalCases: { type: "integer" },
          todayCases: { type: "integer" },
          totalDeaths: { type: "integer" },
          todayDeaths: { type: "integer" },
          totalRecovered: { type: "integer" },
          todayRecovered: { type: "integer" },
          date: { type: "string" },
          state: { type: "string" },
        },
      },
    },
  },
};

export const getCovidStateCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: [
          "cases",
          "deaths",
          "recovered",
          "state",
          "startDate",
          "endDate",
        ],
        properties: {
          cases: { type: "object", additionalProperties: true },
          deaths: { type: "object", additionalProperties: true },
          recovered: { type: "object", additionalProperties: true },
          state: { type: "string", additionalProperties: true },
          startDate: { type: "string", additionalProperties: true },
          endDate: { type: "string", additionalProperties: true },
        },
      },
    },
  },
};

export const getVaccineStateDateStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["totalDoses", "todayDoses"],
        properties: {
          totalDoses: { type: "integer" },
          todayDoses: { type: "integer" },
        },
      },
    },
  },
};

export const getVaccineStateCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["doses", "state", "startDate", "endDate"],
        properties: {
          doses: { type: "object", additionalProperties: true },
          state: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
        },
      },
    },
  },
};
