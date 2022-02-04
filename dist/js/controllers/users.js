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
exports.login = exports.deleteUser = exports.updateUser = exports.addUser = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        res.status(200).json({ message: "hi", users: users });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const existingUser = yield (yield user_1.default.find()).filter((u) => u.username === body.username)[0];
        user_1.default.findOne({ username: body.username }).then((user) => {
            if (user) {
                return res.status(409).json({ message: "User already exists" });
            }
            else {
                const user = new user_1.default({
                    username: body.username,
                    password: body.password,
                    name: body.name,
                    unit: body.unit,
                    roles: [],
                });
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(body.password, salt, function (err, hash) {
                        if (err)
                            throw err;
                        user.password = hash;
                        user
                            .save()
                            .then((response) => {
                            res.status(200).json({
                                success: true,
                                result: response,
                            });
                        })
                            .catch((err) => {
                            res.status(500).json({
                                message: err,
                            });
                        });
                    });
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({
            errors: [{ error: "Something went wrong" }],
        });
    }
});
exports.addUser = addUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateUser = yield user_1.default.findByIdAndUpdate({ _id: id }, body);
        const allUsers = yield user_1.default.find();
        res.status(200).json({
            message: "User updated",
            user: updateUser,
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndRemove(req.params.id);
        const allUsers = yield user_1.default.find();
        res.status(200).json({
            message: "User deleted",
            user: deletedUser,
            users: allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        user_1.default.findOne({ username: username }).then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "Wrong username or password",
                });
            }
            else {
                bcrypt
                    .compare(password, user.password)
                    .then((isMatch) => {
                    if (!isMatch) {
                        return res
                            .status(400)
                            .json({ message: "Wrong username or password" });
                    }
                    let access_token = createJWT(user.username, user._id, 3600);
                    jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
                        if (err) {
                            res.status(500).json({ erros: err });
                        }
                        if (decoded) {
                            return res.status(200).json({
                                success: true,
                                token: access_token,
                                message: user,
                            });
                        }
                    });
                })
                    .catch((err) => {
                    res.status(500).json({ erros: err });
                });
            }
        });
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
