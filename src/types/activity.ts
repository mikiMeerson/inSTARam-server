import { Document } from "mongoose"

export interface IActivity extends Document {
  publisher: string;
  action: string;
  value?: string;
}