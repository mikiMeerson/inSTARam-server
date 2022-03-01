import { Document } from "mongoose"

export interface INote extends Document {
  note: string;
  publisher: string;
  repliesTo?: string;
}