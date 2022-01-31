import { Document } from "mongoose"

export interface IUser extends Document {
    username: string;
    unit: string;
    password: string;
    roles: string[];
}