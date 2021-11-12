import dotenv from "dotenv";
dotenv.config();

export default {
  port: 9000,
  DBURL: process.env.DB_URL,
  saltWorkFactor: 10,
};
