import { Response, NextFunction } from "express";
import Question from "../models/question";
import User from "../models/user";
import { body, validationResult } from "express-validator";

export const loadQuestions = async (
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const question = await Question.findById(id);
    if (!question)
      return res.status(404).json({ message: "Question not found." });
    req.question = question;
  } catch (error: any) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid question id." });
    return next(error);
  }
  next();
};

export const createQuestion = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  try {
    const { title, tags, text } = req.body;
    const author = req.user.id;
    const question = await Question.create({
      title,
      author,
      tags,
      text,
    });
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.question;
    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate("answers");
    res.json(question);
  } catch (error) {
    next(error);
  }
};

export const listQuestions = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sortType = "-score" } = req.body;
    const questions = await Question.find().sort(sortType);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

export const listByTags = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sortType = "-score", tags } = req.params;
    const questions = await Question.find({ tags: { $all: tags } }).sort(
      sortType
    );
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

export const listByUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const { sortType = "-created" } = req.body;
    const author: any = await User.findOne({ username });
    const questions = await Question.find({ author: author.id })
      .sort(sortType)
      .limit(10);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

export const removeQuestion = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    await req.question.remove();
    res.json({ message: "Your question successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export const loadComment = async (
  req: any,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const comment = await req.question.comments.id(id);
    if (!comment)
      return res.status(404).json({ message: "Comment not found." });
    req.comment = comment;
  } catch (error: any) {
    if (error.name === "CastError")
      return res.status(400).json({ message: "Invalid comment id." });
    return next(error);
  }
  next();
};

export const questionValidate = [
  body("title")
    .exists()
    .trim()
    .withMessage("is required")
    .notEmpty()
    .withMessage("cannot be blank")
    .isLength({ max: 180 })
    .withMessage("must be at most 180 characters long"),
  body("text")
    .exists()
    .trim()
    .withMessage("is required")
    .isLength({ min: 10 })
    .withMessage("must be at least 10 characters long")
    .isLength({ max: 5000 })
    .withMessage("must be at most 5000 characters long"),

  body("tags").exists().withMessage("is required"),
];
