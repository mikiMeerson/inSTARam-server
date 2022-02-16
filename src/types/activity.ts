import { Document } from "mongoose"

export interface IActivity extends Document {
  starId: string;
  publisher: string;
  action: string;
  value?: string;
}