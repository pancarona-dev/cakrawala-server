import { Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export async function loadAnswers(
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) {
  try {
    const answer = await req.question.answers.id(id);
    if (!answer) return res.status(404).json({ message: "Answer not found." });
    req.answer = answer;
  } catch (error: any) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid answer id." });
    return next(error);
  }
  next();
}

export async function createAnswer(
  req: any,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { id } = req.user;
    const { text } = req.body;
    const question = await req.question.addAnswer(id, text);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
}

export async function removeAnswer(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const { answer } = req.params;
    const question = await req.question.removeAnswer(answer);
    res.json(question);
  } catch (error) {
    next(error);
  }
}

export const answerValidate = [
  body("text")
    .exists()
    .trim()
    .withMessage("is required")
    .notEmpty()
    .withMessage("cannot be blank")
    .isLength({ min: 30 })
    .withMessage("must be at least 30 characters long")
    .isLength({ max: 30000 })
    .withMessage("must be at most 30000 characters long"),
];
