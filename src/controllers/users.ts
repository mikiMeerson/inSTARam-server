import { Response, Request } from "express";
import { IUser } from "../types/user";
import User from "../models/user";

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
      | "username"
      | "password"
      | "name"
      | "unit"
      | "roles"
    >;

    const user: IUser = new User({
      username: body.username,
      password: body.password,
      name: body.name,
      unit: body.unit,
      roles: [],
    });

    const newUser: IUser = await user.save();
    const allUsers: IUser[] = await User.find();

    res
      .status(201)
      .json({ message: "User added", user: newUser, users: allUsers });
  } catch (error) {
    throw error;
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

const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: IUser | null = await (await User.find()).filter(
      (u) => u.username === req.params.username
    )[0];
    const allUsers: IUser[] = await User.find();

    res.status(200).json({
      message: "User found",
      user: user,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const user: IUser | null = await (await User.find()).filter(
      (u) => u.username === username && u.password === password
    )[0];

    const allUsers: IUser[] = await User.find();

    res.status(200).json({
      message: "User found",
      user: user,
      users: allUsers,
    });
  } catch (error) {
    throw error;
  }
};

export { getUsers, addUser, updateUser, deleteUser, getUser, login };
