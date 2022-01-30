"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Note", noteSchema);
