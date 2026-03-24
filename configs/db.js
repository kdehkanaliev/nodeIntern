import { Pool } from "pg";

const pool = new Pool({
  user: "macbookair",
  host: "localhost",
  database: "homework",
  password: "",
  port: 5432,
});

export default pool;
