import { IStar } from "../types/star"
import { model, Schema } from "mongoose"

const noteSchema: Schema = new Schema(
	{
		note: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
		repliesTo: String,
	},
	{ timestamps: true }
);

const activitieschema: Schema = new Schema(
	{
		publisher: {
			type: String,
			required: true,
		},
		action: {
			type: String,
			required: true,
		},
		value: String
	},
	{ timestamps: true }
);

const starSchema: Schema = new Schema(
	{
		priority: {
			type: Number,
			required: true,
		},
		severity: {
			type: String,
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
		platform: {
			type: String,
			required: true,
		},
		block: {
			type: String,
			required: true,
		},
		phase: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
		contact: {
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
		computer: {
			type: String,
			required: true,
		},
		event: String,
		notes: {
			type: [noteSchema],
			required: true,
		},
		activity: {
			type: [activitieschema],
			required: true,
		}
	},
	{ timestamps: true }
)

export default model<IStar>("Star", starSchema)