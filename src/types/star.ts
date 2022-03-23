import { Document } from "mongoose"
import { IActivity } from "./activity";
import { INote } from "./note";

export interface IStar extends Document {
  priority: number;
  severity: number;
  name: string;
  status: string;
  assignee: string;
  date: string;
  platform: string;
  block: string;
  publisher: string;
  event: string;
  resources: string[];
  desc: string;
  computer: string;
  notes: INote[];
  activity: IActivity[];
}