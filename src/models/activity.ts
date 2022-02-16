import { IActivity } from "../types/activity";
import { model, Schema } from "mongoose";

const Activitieschema: Schema = new Schema(
  {
    starId: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    value: String
  },
  { timestamps: true }
);

export default model<IActivity>("Activity", Activitieschema);
