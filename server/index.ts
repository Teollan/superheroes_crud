require("dotenv").config();

import express from "express";
import createPool from "./src/pool";
import setupMiddleware from "./src/middleware";
import setupApi from "./src/api/api";
import startServer from "./src/start";

createPool().then((pool) => {
  const app = express();

  setupMiddleware(app);
  setupApi(app, pool);

  startServer(app);
});
