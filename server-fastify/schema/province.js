export const getProvinceOpts = {
  schema: {
    tags: ["Province Covid-19 and vaccine"],
    response: {
      200: {
        description: "Status OK",
        type: "object",
        required: ["provinces"],
        properties: {
          provinces: {
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

export const getCovidProvinceDateStatOpts = {
  schema: {
    tags: ["Province Covid-19 and vaccine"],
    params: {
      province: { type: "string", description: "Province name" },
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
          "province",
        ],
        properties: {
          totalCases: { type: "integer" },
          todayCases: { type: "integer" },
          totalDeaths: { type: "integer" },
          todayDeaths: { type: "integer" },
          totalRecovered: { type: "integer" },
          todayRecovered: { type: "integer" },
          date: { type: "string", example: "MM-DD-YYYY" },
          province: { type: "string" },
        },
      },
    },
  },
};

export const getCovidProvinceCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["Province Covid-19 and vaccine"],
    params: {
      province: { type: "string", description: "Province name" },
    },
    querystring: {
      start: {
        type: "string",
        description: "Date later than or equal to January 22, 2020",
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
        required: ["cases", "deaths", "recovered", "province", "start", "end"],
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
          province: { type: "string" },
          start: { type: "string", example: "MM-DD-YYYY" },
          end: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineProvinceDateStatOpts = {
  schema: {
    tags: ["Province Covid-19 and vaccine"],
    params: {
      province: { type: "string", description: "Province name" },
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
        required: ["totalDoses", "todayDoses", "province", "date"],
        properties: {
          totalDoses: { type: "integer" },
          todayDoses: { type: "integer" },
          province: { type: "string" },
          date: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};

export const getVaccineProvinceCumulativeOrDailyStatOpts = {
  schema: {
    tags: ["Province Covid-19 and vaccine"],
    params: {
      country: { type: "string", description: "Province name" },
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
        required: ["doses", "province", "start", "end"],
        properties: {
          doses: {
            type: "object",
            additionalProperties: true,
            example: { "MM-DD-YYYY": 0 },
          },
          province: { type: "string" },
          start: { type: "string", example: "MM-DD-YYYY" },
          end: { type: "string", example: "MM-DD-YYYY" },
        },
      },
    },
  },
};
