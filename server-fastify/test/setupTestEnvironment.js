import fastify from "fastify";
import { app } from "../app";

export function setupTestEnvironment() {
  const server = fastify();
  beforeAll(async () => {
    server.register(app);
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  return server;
}
