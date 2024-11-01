import { Express } from "express";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../../../lib/codes";
import { Error } from "../../../lib/types";
import { Pool } from "pg";
import { Bucket } from "@google-cloud/storage";

export default function setup(app: Express, pool: Pool, bucket: Bucket) {
  app.delete("/api/superheroes/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const result = await pool.query(
        "DELETE FROM superheroes WHERE id = $1 RETURNING *",
        [id]
      );

      if (!result.rowCount) {
        res.status(NOT_FOUND).json({ message: "Superhero not found" });
      }

      const deleted = result.rows[0];

      await Promise.all(
        deleted.images.map((image: string) => {
          const fileName = image.split(`${bucket.name}/`)[1];

          return bucket.file(fileName).delete();
        })
      );

      res.status(OK).json(deleted);
    } catch (e) {
      const error = e as Error;

      res.status(INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  });
}
