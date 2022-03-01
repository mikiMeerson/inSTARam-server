import { Document } from "mongoose"

export interface IUser extends Document {
    username: string;
    password: string;
    name: string;
    unit: string;
    role: 'viewer' | 'editor' | 'admin';
    watchList: string[];
}