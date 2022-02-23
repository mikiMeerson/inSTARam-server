import jwt from "jsonwebtoken";
import { tokenSecret } from "../";

export const createJWT = (
  username: string,
  userId: string,
  duration: number
) => {
  const payload = {
    username,
    userId,
    duration,
  };
  return jwt.sign(payload, tokenSecret, {
    expiresIn: duration,
  });
};
