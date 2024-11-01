import { Express } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../lib/codes";
import { Error } from "../../lib/types";
import { Pool } from "pg";

export default function setup(app: Express, pool: Pool) {
  app.get("/api/superheroes", async (_, res) => {
    try {
      const result = await pool.query("SELECT * FROM superheroes ORDER BY id");

      res.status(OK).json(result.rows);
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
