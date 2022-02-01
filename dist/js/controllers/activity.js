"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivityById = exports.deleteActivity = exports.updateActivity = exports.addActivity = exports.getActivities = void 0;
const activity_1 = __importDefault(require("../models/activity"));
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield (yield activity_1.default.find()).filter((a) => a.starId === req.params.starId);
        res.status(200).json({ activities });
    }
    catch (error) {
        throw error;
    }
});
exports.getActivities = getActivities;
const addActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const activity = new activity_1.default({
            starId: body.starId,
            publisher: body.publisher,
            action: body.action,
            value: body.value,
        });
        const newActivity = yield activity.save();
        const allActivities = yield activity_1.default.find();
        res.status(201).json({
            message: "Activity added",
            activity: newActivity,
            activities: allActivities,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.addActivity = addActivity;
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateActivity = yield activity_1.default.findByIdAndUpdate({ _id: id }, body);
        const allActivities = yield activity_1.default.find();
        res.status(200).json({
            message: "Activity updated",
            activity: updateActivity,
            activities: allActivities,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateActivity = updateActivity;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedActivity = yield activity_1.default.findByIdAndRemove(req.params.id);
        const allActivities = yield activity_1.default.find();
        res.status(200).json({
            message: "Activity deleted",
            activity: deletedActivity,
            activities: allActivities,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteActivity = deleteActivity;
const getActivityById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getActivity = yield activity_1.default.findById(req.params.id);
        const allActivities = yield activity_1.default.find();
        res.status(200).json({
            message: "Activity found",
            activity: getActivity,
            Activities: allActivities,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getActivityById = getActivityById;
