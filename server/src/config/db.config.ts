import mysql from "mysql2/promise";
import { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } from "./data.config";

const connection = mysql.createPool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

export default connection;