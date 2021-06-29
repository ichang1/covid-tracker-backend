import fastify from "fastify";
import { app } from "./app.js";

async function start(server, port = null) {
  server.register(app);
  const PORT = process.env.PORT || port || 4000;

  try {
    await server.listen(PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

const server = fastify({ logger: true });
start(server);
