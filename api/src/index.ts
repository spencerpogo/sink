import express from "express";

function main() {
  const app = express();

  app.get("/", (_, res) => res.send("Hello, world!"));

  app.listen(8080, () => console.log("Listening"));
}

main();
