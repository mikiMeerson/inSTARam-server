import { IUser } from "../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            required: false,
        }
    },
    { timestamps: true }
)

export default model<IUser>("User", userSchema)