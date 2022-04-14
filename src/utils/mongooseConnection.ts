import { connect } from 'mongoose';

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tlorz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export const mongooseConnection = () => {
    try {
      return connect(uri);
    } catch (error) {
      throw error;
    }
};
