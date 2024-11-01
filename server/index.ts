require("dotenv").config();

import express from "express";
import createPool from "./src/pool";
import setupMiddleware from "./src/middleware";
import setupApi from "./src/api/api";
import startServer from "./src/start";
import multer from "multer";
import { Storage } from "@google-cloud/storage";

// dummy for commit
const app = express();

const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!);
const storage = new Storage({ credentials: serviceAccount });

const bucketName = "superheroes-crud-test";
const bucket = storage.bucket(bucketName);

const upload = multer({ storage: multer.memoryStorage() });

createPool().then((pool) => {
  setupMiddleware(app);

  setupApi(app, pool, upload, bucket);

  startServer(app);
});
