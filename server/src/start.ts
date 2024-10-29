import { Express } from "express";

const PORT = process.env.PORT || 5000;

export default function startServer(app: Express) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
