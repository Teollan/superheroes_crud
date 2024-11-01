import { Express } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../lib/codes";
import { Error } from "../../lib/types";
import { Pool } from "pg";

export default function setup(app: Express, pool: Pool) {
  app.get("/api/superheroes", async (req, res) => {
    const { page = "1", perpage = "5" } = req.query;

    try {
      const count = await pool.query(
        "SELECT COUNT(*) AS count FROM superheroes"
      );

      const result = await pool.query(
        "SELECT * FROM superheroes ORDER BY id LIMIT $2 OFFSET ($1 - 1) * $2",
        [page, perpage]
      );

      res.status(OK).json({
        info: {
          page: Number(page),
          perpage: Number(perpage),
          total: Number(count.rows[0].count),
        },
        results: result.rows,
      });
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
