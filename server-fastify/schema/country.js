export const getCountryOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["countries"],
        properties: {
          countries: {
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

export const getCovidCountryDateStatOpts = {
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
          "country",
        ],
        properties: {
          totalCases: { type: "integer" },
          todayCases: { type: "integer" },
          totalDeaths: { type: "integer" },
          todayDeaths: { type: "integer" },
          totalRecovered: { type: "integer" },
          todayRecovered: { type: "integer" },
          date: { type: "string" },
          country: { type: "string" },
        },
      },
    },
  },
};

export const getCovidCountryCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: [
          "cases",
          "deaths",
          "recovered",
          "country",
          "startDate",
          "endDate",
        ],
        properties: {
          cases: { type: "object", additionalProperties: true },
          deaths: { type: "object", additionalProperties: true },
          recovered: { type: "object", additionalProperties: true },
          country: { type: "string", additionalProperties: true },
          startDate: { type: "string", additionalProperties: true },
          endDate: { type: "string", additionalProperties: true },
        },
      },
    },
  },
};

export const getVaccineCountryDateStatOpts = {
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

export const getVaccineCountryCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["doses", "country", "startDate", "endDate"],
        properties: {
          doses: { type: "object", additionalProperties: true },
          country: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
        },
      },
    },
  },
};
