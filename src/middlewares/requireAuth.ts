import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import config from "../config";

const requireAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication invalid." });
  }

  try {
    const decodedToken = jwt.verify(token.slice(7), config.jwt.secret, {
      algorithms: ["HS256"],
      // expiresIn: config.jwt.expiry,
    });

    //   const payload = {
    //     sub: 'user_id',
    //     exp: Math.floor(Date.now() / 1000) + (60 * 60)
    // };
    // const secret = 'YOUR_SECRET_HERE';
    // const token = jwt.sign(payload, secret);

    req.user = decodedToken;
    next();
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export default requireAuth;
