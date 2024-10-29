import { Express } from "express";
import { Pool } from "pg";

import del from "./superheroes/[id]/delete";
import getOne from "./superheroes/[id]/get";
import put from "./superheroes/[id]/put";
import getAll from "./superheroes/get";
import post from "./superheroes/post";

export default function setupApi(app: Express, pool: Pool) {
  del(app, pool);
  getOne(app, pool);
  put(app, pool);
  getAll(app, pool);
  post(app, pool);
}
