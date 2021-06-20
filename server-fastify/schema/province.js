export const getProvinceOpts = {
  schema: {
    response: {
      200: {
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
          "province",
        ],
        properties: {
          totalCases: { type: "integer" },
          todayCases: { type: "integer" },
          totalDeaths: { type: "integer" },
          todayDeaths: { type: "integer" },
          totalRecovered: { type: "integer" },
          todayRecovered: { type: "integer" },
          date: { type: "string" },
          province: { type: "string" },
        },
      },
    },
  },
};

export const getCovidProvinceCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: [
          "cases",
          "deaths",
          "recovered",
          "province",
          "startDate",
          "endDate",
        ],
        properties: {
          cases: { type: "object", additionalProperties: true },
          deaths: { type: "object", additionalProperties: true },
          recovered: { type: "object", additionalProperties: true },
          province: { type: "string", additionalProperties: true },
          startDate: { type: "string", additionalProperties: true },
          endDate: { type: "string", additionalProperties: true },
        },
      },
    },
  },
};

export const getVaccineProvinceDateStatOpts = {
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

export const getVaccineProvinceCumulativeOrDailyStatOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        required: ["doses", "province", "startDate", "endDate"],
        properties: {
          doses: { type: "object", additionalProperties: true },
          province: { type: "string" },
          startDate: { type: "string" },
          endDate: { type: "string" },
        },
      },
    },
  },
};
