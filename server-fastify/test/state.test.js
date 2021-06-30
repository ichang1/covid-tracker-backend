import { setupTestEnvironment } from "./setupTestEnvironment.js";
import { stateTests } from "./state.js";

const fastify = setupTestEnvironment();

stateTests.forEach(({ description, url, method, expectCode }) => {
  test(description, async () => {
    const res = await fastify.inject({
      url,
      method,
    });
    expect(res.statusCode).toEqual(expectCode);
  });
});
