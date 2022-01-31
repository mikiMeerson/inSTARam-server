import { INote } from "../types/note"
import { model, Schema } from "mongoose"

const noteSchema: Schema = new Schema(
    {
        starId: {
            type: String,
            required: true,
        },
        note: {
            type: String,
            required: true,
        },
        publisher: {
            type: String,
            required: true,
        },
        repliesTo: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
)

export default model<INote>("Note", noteSchema)