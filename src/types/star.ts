import { Document } from "mongoose"
import { IActivity } from "./activity";
import { INote } from "./note";

export interface IStar extends Document {
  priority: number;
  severity: string;
  name: string;
  status: string;
  assignee: string;
  date: string;
  platform: string;
  block: string;
  publisher: string;
  contact: string;
  resources: string[];
  desc: string;
  computer: string;
  event?: string;
  notes: INote[];
  activity: IActivity[];
}