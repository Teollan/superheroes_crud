import { Express } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../../lib/codes";
import { Error } from "../../../lib/types";
import { Pool } from "pg";

export default function setup(app: Express, pool: Pool) {
  app.get("/api/superheroes/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM superheroes WHERE id = $1",
        [id]
      );

      if (!result.rowCount) {
        res.status(NOT_FOUND).json({ error: "Superhero not found" });
      }

      res.status(OK).json(result.rows[0]);
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
