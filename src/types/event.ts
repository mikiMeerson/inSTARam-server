import { Document } from "mongoose"

export interface IEvent extends Document {
  name: string;
  type: 'flight' | 'integration' | 'industry'
  version: string;
  date: string;
  publisher: string;
  description: string;
  configuration: {
    aaaa: string;
    bbbb: string;
    cccc: string;
    dddd: string;
  }
  findings: string[];
}