import { IEvent } from "../types/event"
import { model, Schema } from "mongoose"

const weaponConfigSchema: Schema = new Schema(
	{
		sta: {
			type: String,
			required: true,
		},
		weapon: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

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
			weapons: [weaponConfigSchema],
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