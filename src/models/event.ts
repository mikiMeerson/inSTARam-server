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
		version: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
		},
        description: {
			type: String,
			required: true,
		},
        configuration: {
            aaaa: {
                type: String,
                required: true,
            },
            bbbb: {
                type: String,
                required: true,
            },
            cccc: {
                type: String,
                required: true,
            },
            dddd: {
                type: String,
                required: true,
            },
        },
        findings: {
            type: [String],
            required: true,
        }
	},
	{ timestamps: true }
)

export default model<IEvent>("Event", eventSchema)