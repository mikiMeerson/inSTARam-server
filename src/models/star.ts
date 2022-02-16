import { IStar } from "../types/star"
import { model, Schema } from "mongoose"

const starSchema: Schema = new Schema(
	{
		priority: {
			type: Number,
			required: true,
		},
		severity: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},

		status: {
			type: String,
			required: true,
		},
		assignee: {
			type: String,
			required: true,
		},
		version: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
		event: {
			type: String,
			required: true,
		},
		resources: {
			type: [String],
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		computer: String
	},
	{ timestamps: true }
)

export default model<IStar>("Star", starSchema)