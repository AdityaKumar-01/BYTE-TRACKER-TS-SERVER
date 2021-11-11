require("dotenv").config();
export default {
  port: 9000,
  DB_URL: process.env.DB_URL,
  saltWorkFactor: process.env.SALT,
};
