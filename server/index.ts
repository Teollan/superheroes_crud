require("dotenv").config();

import express from "express";
import createPool from "./src/pool";
import setupMiddleware from "./src/middleware";
import setupApi from "./src/api/api";
import startServer from "./src/start";
import multer from "multer";
import { Storage } from "@google-cloud/storage";

const app = express();

// Yea, I know it is a security risk...
const storage = new Storage({
  keyFilename: "./molten-aurora-440401-h9-820d6024c337.json",
});

const bucketName = "superheroes-crud-test";
const bucket = storage.bucket(bucketName);

const upload = multer({ storage: multer.memoryStorage() });

createPool().then((pool) => {
  setupMiddleware(app);

  setupApi(app, pool, upload, bucket);

  startServer(app);
});
