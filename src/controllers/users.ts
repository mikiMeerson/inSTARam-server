import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { IUser } from "../types/user";
import User from "../models/user";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] | null = await User.find();
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not get users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getUser: IUser | null = await User.findById(req.params.id);
    const allUsers: IUser[] = await User.find();
    res.status(StatusCodes.OK).json({
      message: "User found",
      user: getUser,
      users: allUsers,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not find user' });
  }
};

export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IUser,
      "username" | "password" | "name" | "unit" | "role"
    >;

    User.findOne({ username: body.username }).then((user) => {
      if (user) {
        return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });
      } else {
        const user: IUser = new User({
          username: body.username,
          password: body.password,
          name: body.name,
          unit: body.unit,
          role: 'viewer',
        });

        bcrypt.genSalt(10, function (err: any, salt: any) {
          bcrypt.hash(body.password, salt, function (err: any, hash: string) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(StatusCodes.CREATED).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  message: err,
                });
              });
          });
        });
      }
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: [{ error: "Something went wrong" }],
    });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    console.log(id);
    console.log(body);
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allUsers: IUser[] = await User.find();

    console.log(updateUser);
    res.status(StatusCodes.OK).json({
      message: "User updated",
      user: updateUser,
      users: allUsers,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    );
    const allUsers: IUser[] = await User.find();
    res.status(StatusCodes.OK).json({
      message: "User deleted",
      user: deletedUser,
      users: allUsers,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not delete user' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Wrong username or password",
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch: boolean) => {
            if (!isMatch) {
              return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "Wrong username or password" });
            }
            let access_token = createJWT(user.username, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err: any, decoded: any) => {
                if (err) {
                  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erros: err });
                }
                if (decoded) {
                  return res.status(StatusCodes.OK).json({
                    success: true,
                    token: access_token,
                    message: user,
                  });
                }
              }
            );
          })
          .catch((err: any) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ erros: err });
          });
      }
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not login' });
  }
}