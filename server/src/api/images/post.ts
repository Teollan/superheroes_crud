import { Express } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../../lib/codes";
import { Multer } from "multer";
import { Bucket } from "@google-cloud/storage";

export default function setup(app: Express, upload: Multer, bucket: Bucket) {
  app.post("/api/images", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        res.status(BAD_REQUEST).send({ error: "No file uploaded." });

        return;
      }

      const blob = bucket.file(`${Date.now()}_${req.file.originalname}`);

      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      blobStream.on("error", (error) => {
        res.status(INTERNAL_SERVER_ERROR).send({
          error: `Failed to upload file to GCS. Reason: ${error.message}`,
        });
      });

      blobStream.on("finish", async () => {
        const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${blob.name}`;
        res.status(OK).send({ url: publicUrl });
      });

      blobStream.end(req.file.buffer);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: "Unexpected error occurred" });
    }
  });
}
