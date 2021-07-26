import { setupTestEnvironment } from "../setupTestEnvironment.js";
import { allValidProvinceTests } from "./valid.js";
import { allInvalidProvinceTests } from "./invalid.js";

const fastify = setupTestEnvironment();

allValidProvinceTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});

allInvalidProvinceTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});
