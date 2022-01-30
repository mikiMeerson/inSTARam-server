"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const starSchema = new mongoose_1.Schema({
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
    computer: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Star", starSchema);
