import { Response, NextFunction } from "express";

const answerAuth = (
  //   req: Request & { answer: any },
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (req.answer.author._id.equals(req.user.id) || req.user.role === "admin")
    return next();
  res.status(401).end();
};

export default answerAuth;
