import pkg from 'pg';
const { Pool } = pkg;

// Configure the database connection
const pool = new Pool({
  user: process.env.PGUSER || "mustafashikora",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "tirth_olympics",
  password: process.env.PGPASSWORD || "Shikora@123",
  port: process.env.PGPORT || 5432,
});

export default pool;
