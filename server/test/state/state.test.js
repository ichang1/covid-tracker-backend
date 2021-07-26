import { setupTestEnvironment } from "../setupTestEnvironment.js";
import { allValidStateTests } from "./valid.js";
import { allInvalidStateTests } from "./invalid.js";

const fastify = setupTestEnvironment();

allValidStateTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});

allInvalidStateTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});
