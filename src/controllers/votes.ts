import { Response } from "express";

export const upvote = async (req: any, res: Response) => {
  const { id } = req.user;
  if (req.answer) {
    req.answer.vote(id, 1);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, 1);
  return res.json(question);
};

export const downvote = async (req: any, res: Response) => {
  const { id } = req.user;
  if (req.answer) {
    req.answer.vote(id, -1);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, -1);
  return res.json(question);
};

export const unvote = async (req: any, res: Response) => {
  const { id } = req.user;
  if (req.answer) {
    req.answer.vote(id, 0);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, 0);
  return res.json(question);
};
