import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");
const app = express();

app.use(express.json());
app.use(deserializeUser); //checks if jwt token is in the req or not. if there then res.local.user = decoded jwt else, continue

app.listen(port, async () => {
  logger.info(`app is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
