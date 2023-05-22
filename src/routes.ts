import { Router } from "express";
import {
  validateUser,
  signup,
  authenticate,
  listUsers,
  search,
  find,
} from "./controllers/users";
import {
  loadQuestions,
  questionValidate,
  createQuestion,
  show,
  listQuestions,
  listByTags,
  listByUser,
  removeQuestion,
} from "./controllers/questions";
import {
  loadAnswers,
  answerValidate,
  createAnswer,
  removeAnswer,
} from "./controllers/answers";
import { listPopulerTags, searchTags, listTags } from "./controllers/tags";
import { upvote, downvote, unvote } from "./controllers/votes";
import {
  loadComments,
  validate,
  createComment,
  removeComment,
} from "./controllers/comments";
import requireAuth from "./middlewares/requireAuth";
import questionAuth from "./middlewares/questionAuth";
import commentAuth from "./middlewares/commentAuth";
import answerAuth from "./middlewares/answerAuth";

const router = Router();

//authentication
router.post("/signup", validateUser, signup);
router.post("/authenticate", validateUser, authenticate);

//users
router.get("/users", listUsers);
router.get("/users/:search", search);
router.get("/user/:username", find);

//questions
router.param("question", loadQuestions);
router.post(
  "/questions",
  [requireAuth, questionValidate as any],
  createQuestion
);
router.get("/question/:question", show);
router.get("/question", listQuestions);
router.get("/questions/:tags", listByTags);
router.get("/question/user/:username", listByUser);
router.delete(
  "/question/:question",
  [requireAuth, questionAuth],
  removeQuestion
);

//tags
router.get("/tags/populertags", listPopulerTags);
router.get("/tags/:tag", searchTags);
router.get("/tags", listTags);

//answers
router.param("answer", loadAnswers);
router.post(
  "/answer/:question",
  [requireAuth, answerValidate as any],
  createAnswer
);
router.delete(
  "/answer/:question/:answer",
  [requireAuth, answerAuth],
  removeAnswer
);

//votes
router.get("/votes/upvote/:question/:answer?", requireAuth, upvote);
router.get("/votes/downvote/:question/:answer?", requireAuth, downvote);
router.get("/votes/unvote/:question/:answer?", requireAuth, unvote);

//comments
router.param("comment", loadComments);
router.post(
  "/comment/:question/:answer?",
  [requireAuth, validate as any],
  createComment
);
router.delete(
  "/comment/:question/:comment",
  [requireAuth, commentAuth],
  removeComment
);
router.delete(
  "/comment/:question/:answer/:comment",
  [requireAuth, commentAuth],
  removeComment
);

export default router;

