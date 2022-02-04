import { Response, Request } from "express";
import { IUser } from "../types/user";
import User from "../models/user";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    throw error;
  }
};

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IUser,
      "username" | "password" | "name" | "unit" | "roles"
    >;

    const existingUser: IUser | null = await (
      await User.find()
    ).filter((u) => u.username === body.username)[0];

    User.findOne({ username: body.username }).then((user) => {
      if (user) {
        return res.status(409).json({ message: "User already exists" });
      } else {
        const user: IUser = new User({
          username: body.username,
          password: body.password,
          name: body.name,
          unit: body.unit,
          roles: [],
        });

        bcrypt.genSalt(10, function (err: any, salt: any) {
          bcrypt.hash(body.password, salt, function (err: any, hash: string) {
            if (err) throw err;
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
  } catch (error) {
    res.status(500).json({
      errors: [{ error: "Something went wrong" }],
    });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateUser: IUser | null = await User.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allUsers: IUser[] = await User.find();
    res.status(200).json({
      message: "User updated",
      user: updateUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser: IUser | null = await User.findByIdAndRemove(
      req.params.id
    );
    const allUsers: IUser[] = await User.find();
    res.status(200).json({
      message: "User deleted",
      user: deletedUser,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    User.findOne({ username: username }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "Wrong username or password",
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch: boolean) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ message: "Wrong username or password" });
            }
            let access_token = createJWT(user.username, user._id, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err: any, decoded: any) => {
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
              }
            );
          })
          .catch((err: any) => {
            res.status(500).json({ erros: err });
          });
      }
    });
  } catch (error) {
    throw error;
  }
};

export { getUsers, addUser, updateUser, deleteUser, login };
