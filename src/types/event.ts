import { Document } from "mongoose"

interface IWeaponConfig extends Document {
  sta: string;
  weapon: string;
};

interface IVersionConfig extends Document {
  comp: string;
  version: string;
};

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
  configuration: {
    weapons: IWeaponConfig[],
    versions: IVersionConfig[],
  },
  description?: string[];
  findings?: string[];
  notes?: string[];
  conclusions?: string[];
}