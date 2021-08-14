import fastify from "fastify";
import { app } from "./app.js";

async function start(server) {
  server.register(app);
  const PORT = process.env.PORT || 4000;
  const HOST = process.env.HOST || "::";

  try {
    await server.listen(PORT, HOST);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

const server = fastify({ logger: false });
start(server);
