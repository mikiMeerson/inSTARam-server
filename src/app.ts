import express, { Express } from "express";

import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import starRoutes from "./routes/star"
import userRoutes from "./routes/user"
import eventRoutes from "./routes/event"
import { mongooseConnection } from "./";



const app: Express = express()

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(starRoutes)
app.use(userRoutes)
app.use(eventRoutes)

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../front/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})



mongooseConnection()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
