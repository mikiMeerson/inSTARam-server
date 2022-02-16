import { Document } from "mongoose"

export interface IStar extends Document {
  priority: number;
  severity: number;
  name: string;
  status: string;
  assignee: string;
  date: string;
  version: string;
  publisher: string;
  event: string;
  resources: string[];
  desc: string;
  computer?: string;
}