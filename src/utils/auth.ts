const jwt = require("jsonwebtoken");

exports.createJWT = (username: string, userId: string, duration: number) => {
   const payload = {
      username,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};