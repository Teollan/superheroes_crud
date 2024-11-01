import { Express } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../../lib/codes";
import { Bucket } from "@google-cloud/storage";

export default function setup(app: Express, bucket: Bucket) {
  app.delete("api/images", async (req, res) => {
    const { image } = req.body;

    try {
      const fileName = image.split(`${bucket.name}/`)[1];

      if (!fileName) {
        res.status(BAD_REQUEST).send({ error: "Invalid file URL" });

        return;
      }

      const file = bucket.file(fileName);

      await file.delete();
      res.status(OK).send({ message: "File deleted successfully" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: "Failed to delete file" });
    }
  });
}
