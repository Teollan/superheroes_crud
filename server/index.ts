require("dotenv").config();

import express from "express";
import createPool from "./src/pool";
import setupMiddleware from "./src/middleware";
import setupApi from "./src/api/api";
import startServer from "./src/start";
import multer from "multer";
import { Storage } from "@google-cloud/storage";

const app = express();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!);
const storage = new Storage({ credentials: serviceAccount });
const bucket = storage.bucket(process.env.BUCKET_NAME!);

const upload = multer({ storage: multer.memoryStorage() });

createPool().then((pool) => {
  setupMiddleware(app);

  setupApi(app, pool, upload, bucket);

  startServer(app);
});
