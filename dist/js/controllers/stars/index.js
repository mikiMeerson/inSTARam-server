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
exports.getStarById = exports.deleteStar = exports.updateStar = exports.addStar = exports.getStars = void 0;
const star_1 = __importDefault(require("../../models/star"));
const getStars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stars = yield star_1.default.find();
        res.status(200).json({ stars });
    }
    catch (error) {
        throw error;
    }
});
exports.getStars = getStars;
const addStar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const star = new star_1.default({
            priority: body.priority,
            severity: body.severity,
            name: body.name,
            status: body.status,
            assignee: body.assignee,
            version: body.version,
            publisher: 'miki',
            event: body.event,
            resources: [],
            desc: body.desc,
            computer: body.computer
        });
        const newStar = yield star.save();
        const allStars = yield star_1.default.find();
        res
            .status(201)
            .json({ message: "Star added", star: newStar, stars: allStars });
    }
    catch (error) {
        throw error;
    }
});
exports.addStar = addStar;
const updateStar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateStar = yield star_1.default.findByIdAndUpdate({ _id: id }, body);
        const allStars = yield star_1.default.find();
        res.status(200).json({
            message: "Star updated",
            star: updateStar,
            stars: allStars,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateStar = updateStar;
const deleteStar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStar = yield star_1.default.findByIdAndRemove(req.params.id);
        const allStars = yield star_1.default.find();
        res.status(200).json({
            message: "Star deleted",
            star: deletedStar,
            stars: allStars,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteStar = deleteStar;
const getStarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getStar = yield star_1.default.findById(req.params.id);
        const allStars = yield star_1.default.find();
        res.status(200).json({
            message: "Star found",
            star: getStar,
            stars: allStars,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.getStarById = getStarById;
