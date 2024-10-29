import express, { Express } from "express";
import cors from "cors";

export default function setupMiddleware(app: Express) {
  app.use(cors());
  app.use(express.json());
}
