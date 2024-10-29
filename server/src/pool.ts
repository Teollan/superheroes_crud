import { Pool } from "pg";

const url = process.env.DATABASE_URL;

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS superheroes (
      id SERIAL PRIMARY KEY,
      nickname VARCHAR(50),
      real_name VARCHAR(100),
      origin_description TEXT,
      superpowers TEXT[],
      catch_phrase VARCHAR(255),
      images TEXT[]
    );
  `;

export default async function createPool() {
  const pool = new Pool({
    connectionString: url,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await pool.query(createTableQuery);
  } catch (err) {
    console.error("Error creating superheroes table:", err);
  }

  return pool;
}
