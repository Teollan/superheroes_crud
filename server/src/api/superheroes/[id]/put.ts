import { Express } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../../lib/codes";
import { Error } from "../../../lib/types";
import { Pool } from "pg";

export default function setup(app: Express, pool: Pool) {
  app.put("/api/superheroes/:id", async (req, res) => {
    const { id } = req.params;

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
        `UPDATE superheroes 
         SET nickname = $1, real_name = $2, origin_description = $3, superpowers = $4, catch_phrase = $5, images = $6 
         WHERE id = $7 RETURNING *`,
        [
          nickname,
          real_name,
          origin_description,
          superpowers,
          catch_phrase,
          images,
          id,
        ]
      );

      if (result.rows.length === 0) {
        res.status(NOT_FOUND).json({ error: "Superhero not found" });
      }

      res.status(OK).json(result.rows[0]);
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
