import { Document } from "mongoose"

export interface IEvent extends Document {
  _id: string;
  name: string;
  publisher: string;
  type: string;
  assignee: string;
  block: string;
  platform: string;
  dates: Date[];
  reason?: string;
  team?: string;
  callSign?: string;
  areas?: string;
  duration?: string;
  generalSummary?: string[];
  goals?: string[];
  dataSources?: string[];
  configuration?: {
    weapons: {
      '2L': string;
      '2': string;
      '2R': string;
      'LCFT': string;
      '5': string;
      'RCFT': string;
      '8L': string;
      '8': string;
      '8R': string;
    },
    versions: {
      AAA: string;
      BBB: string;
      CCC: string;
      DDD: string;
    },
  },
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}