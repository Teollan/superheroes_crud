import { Express } from "express";
import { Pool } from "pg";
import { Multer } from "multer";
import { Bucket } from "@google-cloud/storage";

import del from "./superheroes/[id]/delete";
import getOne from "./superheroes/[id]/get";
import put from "./superheroes/[id]/put";
import getAll from "./superheroes/get";
import post from "./superheroes/post";
import uploadImage from "./images/post";
import deleteImage from "./images/delete";

export default function setupApi(
  app: Express,
  pool: Pool,
  multer: Multer,
  bucket: Bucket
) {
  del(app, pool);
  getOne(app, pool);
  put(app, pool);
  getAll(app, pool);
  post(app, pool);

  uploadImage(app, multer, bucket);
  deleteImage(app, bucket);
}
