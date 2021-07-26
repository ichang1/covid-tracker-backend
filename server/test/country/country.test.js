import { setupTestEnvironment } from "../setupTestEnvironment.js";
import { allValidCountryTests } from "./valid.js";
import { allInvalidCountryTests } from "./invalid.js";

const fastify = setupTestEnvironment();

allValidCountryTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});

allInvalidCountryTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});
