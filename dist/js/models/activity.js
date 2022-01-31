"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Activitieschema = new mongoose_1.Schema({
    starId: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: false,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Activity", Activitieschema);
