const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create a new Pool instance for PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Create (POST) - Add a new superhero
app.post("/api/superheroes", async (req, res) => {
  try {
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = req.body;

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
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (GET) - Get all superheroes
app.get("/api/superheroes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM superheroes");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read (GET) - Get a single superhero by ID
app.get("/api/superheroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM superheroes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Superhero not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update (PUT) - Update a superhero
app.put("/api/superheroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nickname,
      real_name,
      origin_description,
      superpowers,
      catch_phrase,
      images,
    } = req.body;
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
      return res.status(404).json({ error: "Superhero not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete (DELETE) - Remove a superhero
app.delete("/api/superheroes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM superheroes WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Superhero not found" });
    }
    res.json({ message: "Superhero deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
