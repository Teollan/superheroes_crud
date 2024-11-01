require("dotenv").config();

import express from "express";
import createPool from "./src/pool";
import setupMiddleware from "./src/middleware";
import setupApi from "./src/api/api";
import startServer from "./src/start";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import path from "path";

const app = express();

const storage = new Storage({
  projectId: "molten-aurora-440401-h9",
  keyFilename: "service-account.json",
});

const bucketName = "superheroes-crud-test";
const bucket = storage.bucket(bucketName);

const upload = multer({ storage: multer.memoryStorage() });

createPool().then((pool) => {
  setupMiddleware(app);

  setupApi(app, pool, upload, bucket);

  startServer(app);
});
