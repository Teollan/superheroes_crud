import { Express } from "express";
import { CREATED, INTERNAL_SERVER_ERROR } from "../../lib/codes";
import { Error } from "../../lib/types";
import { Pool } from "pg";

export default function setup(app: Express, pool: Pool) {
  app.post("/api/superheroes", async (req, res) => {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO superheroes (nickname, real_name, origin_description, superpowers, catch_phrase, images)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
          images,
        ]
      );

      res.status(CREATED).json(result.rows[0]);
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
