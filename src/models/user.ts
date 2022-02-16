import { IUser } from "../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
	{
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		unit: {
			type: String,
			required: true,
		},
		roles: [String]
	},
	{ timestamps: true }
)

export default model<IUser>("User", userSchema)