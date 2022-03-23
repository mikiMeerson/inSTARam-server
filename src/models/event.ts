import { IEvent } from "../types/event"
import { model, Schema } from "mongoose"

const eventSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
        type: {
            type: String,
            required: true,
        },
		assignee: {
			type: String,
			required: true,
		},
		block: {
			type: String,
			required: true,
		},
		platform: {
			type: String,
			required: true,
		},
		dates: {
			type: [Date],
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
		reason: String,
		team: String,
		callSign: String,
		areas: String,
		duration: String,
		generalSummary: [String],
		goals: [String],
		dataSources: [String],
        configuration: {
			weapons: {
				'2L': {
					type: String,
					required: true,
				},
				'2': {
					type: String,
					required: true,
				},
				'2R': {
					type: String,
					required: true,
				},
				'LCFT': {
					type: String,
					required: true,
				},
				'5': {
					type: String,
					required: true,
				},
				'RCFT': {
					type: String,
					required: true,
				},
				'8L': {
					type: String,
					required: true,
				},
				'8': {
					type: String,
					required: true,
				},
				'8R': {
					type: String,
					required: true,
				},
			},
            versions: {
				AAA: {
                	type: String,
                	required: true,
				},
				BBB: {
					type: String,
					required: true,
				},
				CCC: {
					type: String,
					required: true,
				},
				DDD: {
					type: String,
					required: true,
				},
			}
        },
		description: [String],
		findings: [String],
		notes: [String],
		conclusions: [String],
	},
	{ timestamps: true }
)

export default model<IEvent>("Event", eventSchema)