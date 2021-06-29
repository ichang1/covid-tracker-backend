import { setupTestEnvironment } from "./setupTestEnvironment.js";

const fastify = setupTestEnvironment();

test("Get covid states", async () => {
  const res = await fastify.inject({
    url: "/covid-19/state",
    method: "GET",
  });

  console.warn(res.json());
});
