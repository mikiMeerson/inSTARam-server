import mongoose from "mongoose";

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tlorz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
console.log(uri);

export const mongooseConnection = () => {
  try {
    return mongoose.connect(uri);
  } catch (error) {
    throw error;
  }
};

export const tokenSecret = process.env.TOKEN_SECRET as string;
