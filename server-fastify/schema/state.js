export const getStateOpts = {
  schema: {
    tags: ["US state Covid-19 and vaccine"],
    response: {
      200: {
        description: "Status OK",
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
    tags: ["US state Covid-19 and vaccine"],
    params: {
      state: { type: "string", description: "State name" },
    },
    querystring: {
      date: {
        type: "string",
        description: "Date later than or equal to January 22, 2020",
      },
    },
    response: {
      200: {
        description: "Status OK",
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
          date: { type: "string", example: "MM-DD-YYYY" },
          state: { type: "string" },
        },
      },
    },
  },
};

export const getCovidStateCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["US state Covid-19 and vaccine"],
    params: {
      state: { type: "string", description: "State name" },
    },
    querystring: {
      startDate: {
        type: "string",
        description: "Date later than or equal to January 22, 2020",
      },
      endDate: {
        type: "string",
        description: "End date",
      },
    },
    response: {
      200: {
        description: "Status OK",
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
          cases: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          deaths: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          recovered: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          state: { type: "string" },
          startDate: { type: "string", example: "MM-DD-YYYY" },
          endDate: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineStateDateStatOpts = {
  schema: {
    tags: ["US state Covid-19 and vaccine"],
    params: {
      state: { type: "string", description: "State name" },
    },
    querystring: {
      date: {
        type: "string",
        description: "Date later than or equal to December 1, 2020",
      },
    },
    response: {
      200: {
        description: "Status OK",
        type: "object",
        required: ["totalDoses", "todayDoses", "date", "state"],
        properties: {
          totalDoses: { type: "integer" },
          todayDoses: { type: "integer" },
          state: { type: "string" },
          date: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineStateCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["US state Covid-19 and vaccine"],
    params: {
      state: { type: "string", description: "State name" },
    },
    querystring: {
      startDate: {
        type: "string",
        description: "Date later than or equal to December 1, 2020",
      },
      endDate: {
        type: "string",
        description: "End date",
      },
    },
    response: {
      200: {
        description: "Status OK",
        type: "object",
        required: ["doses", "state", "startDate", "endDate"],
        properties: {
          doses: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          state: { type: "string" },
          startDate: { type: "string", example: "MM-DD-YYYY" },
          endDate: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};
