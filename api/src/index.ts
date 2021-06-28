import express from "express";
import { HOST, PORT } from "./config";

function main() {
  const app = express();

  app.get("/", (_, res) => res.send("Hello, world!"));

  app.listen(PORT, HOST, () =>
    console.log(`Listening on http://${HOST}:${PORT}/`)
  );
}

main();
