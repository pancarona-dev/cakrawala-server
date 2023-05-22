import { Response, NextFunction } from "express";

const commentAuth = (req: any, res: Response, next: NextFunction) => {
  if (req.comment.author._id.equals(req.user.id) || req.user.role === "admin")
    return next();
  res.status(401).end();
};

export default commentAuth;
