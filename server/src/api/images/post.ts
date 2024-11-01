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

      const blob = bucket.file(req.file.originalname);

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
        await blob.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
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
