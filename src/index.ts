import express from "express";
import dotenv from "dotenv";
import connect from './utils/connect.util';
import log from './utils/logger.util';

import routes from './routes';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.listen(PORT, async () => {
  log.info(`TS server up and running at localhost port ${PORT}`);
  await connect();
  routes(app);
});
