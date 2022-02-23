import express, { Express } from "express";

import bodyParser from "body-parser";
import cors from "cors";

import starRoutes from "./routes/star";
import noteRoutes from "./routes/note";
import activityRoutes from "./routes/activity";
import userRoutes from "./routes/user";

import { mongooseConnection } from "./";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(starRoutes);
app.use(noteRoutes);
app.use(activityRoutes);
app.use(userRoutes);

mongooseConnection()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
