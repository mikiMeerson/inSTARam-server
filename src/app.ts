import express, { Express, json, urlencoded } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";
import starRoutes from "./routes/star"
import userRoutes from "./routes/user"
import eventRoutes from "./routes/event";

const app: Express = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(starRoutes)
app.use(userRoutes)
app.use(eventRoutes)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/public/index.html'), (err) => 
    err && res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  )
});

export default app;
