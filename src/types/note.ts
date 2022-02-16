import { Document } from "mongoose"

export interface INote extends Document {
  starId: string;
  note: string;
  publisher: string;
  repliesTo?: string;
}