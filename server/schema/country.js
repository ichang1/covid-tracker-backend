export const getCountryOpts = {
  schema: {
    tags: ["Country Covid-19 and vaccine"],
    response: {
      200: {
        description: "Status OK",
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
    tags: ["Country Covid-19 and vaccine"],
    params: {
      country: { type: "string", description: "Country name" },
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
          "country",
        ],
        properties: {
          totalCases: { type: "integer" },
          todayCases: { type: "integer" },
          totalDeaths: { type: "integer" },
          todayDeaths: { type: "integer" },
          totalRecovered: { type: "integer" },
          todayRecovered: { type: "integer" },
          date: { type: "string", example: "MM-DD-YYYY" },
          country: { type: "string" },
        },
      },
    },
  },
};

export const getCovidCountryCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["Country Covid-19 and vaccine"],
    params: {
      country: { type: "string", description: "Country name" },
    },
    querystring: {
      start: {
        type: "string",
        description: "Date later than or equal to January 22, 2020",
      },
      end: { type: "string", description: "End Date " },
    },
    response: {
      200: {
        description: "Status OK",
        type: "object",
        required: ["cases", "deaths", "recovered", "country", "start", "end"],
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
          country: { type: "string" },
          start: { type: "string", example: "MM-DD-YYYY" },
          end: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineCountryDateStatOpts = {
  schema: {
    tags: ["Country Covid-19 and vaccine"],
    params: {
      country: { type: "string", description: "Country name" },
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
        required: ["totalDoses", "todayDoses", "country", "date"],
        properties: {
          totalDoses: { type: "integer" },
          todayDoses: { type: "integer" },
          country: { type: "string" },
          date: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineCountryCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["Country Covid-19 and vaccine"],
    params: {
      country: { type: "string", description: "Country name" },
    },
    querystring: {
      start: {
        type: "string",
        description: "Date later than or equal to December 1, 2020",
      },
      end: {
        type: "string",
        description: "End date",
      },
    },
    response: {
      200: {
        description: "Status OK",
        type: "object",
        required: ["doses", "country", "start", "end"],
        properties: {
          doses: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          country: { type: "string" },
          start: { type: "string", example: "MM-DD-YYYY" },
          end: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};
