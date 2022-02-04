import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"

import starRoutes from "./routes/star"
import noteRoutes from "./routes/note"
import activityRoutes from "./routes/activity"
import userRoutes from "./routes/user"

import bodyParser from "body-parser"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(starRoutes)
app.use(noteRoutes)
app.use(activityRoutes)
app.use(userRoutes)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tlorz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
console.log(uri);

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })