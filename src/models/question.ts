import { Schema, Document, model } from "mongoose";
import voteSchema from "./vote";
import commentSchema from "./comment";
import answerSchema from "./answer";

export interface IQuestion extends Document {
  author: Schema.Types.ObjectId;
  title: string;
  text: string;
  tags: string;
  score: any;
  votes: any;
  comments: any;
  answers: any;
  created: Date;
  views: number;
}

const questionSchema: any = new Schema<IQuestion>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: String, required: true }],
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
  answers: [answerSchema],
  created: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});
questionSchema.set("toJSON", { getters: true });

questionSchema.options.toJSON.transform = (doc: any, ret: any) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

questionSchema.methods = {
  vote: function (user: any, vote: any) {
    const existingVote = this.votes.find((v: any) => v.user._id.equals(user));

    if (existingVote) {
      // reset score
      this.score -= existingVote.vote;
      if (vote == 0) {
        // remove vote
        this.votes.pull(existingVote);
      } else {
        //change vote
        this.score += vote;
        existingVote.vote = vote;
      }
    } else if (vote !== 0) {
      // new vote
      this.score += vote;
      this.votes.push({ user, vote });
    }

    return this.save();
  },

  addComment: function (author: any, body: any) {
    this.comments.push({ author, body });
    return this.save();
  },

  removeComment: function (id: any) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error("Comment not found");
    comment.remove();
    return this.save();
  },

  addAnswer: function (author: any, text: any) {
    this.answers.push({ author, text });
    return this.save();
  },

  removeAnswer: function (id: any) {
    const answer = this.answers.id(id);
    if (!answer) throw new Error("Answer not found");
    answer.remove();
    return this.save();
  },
};

questionSchema.pre(/^find/, function (this: any) {
  this.populate("author")
    .populate("comments.author", "-role")
    .populate("answers.author", "-role")
    .populate("answers.comments.author", "-role");
});

questionSchema.pre("save", function (this: any, next: any) {
  this.wasNew = this.isNew;
  next();
});

questionSchema.post("save", function (this: any, doc: any, next: any) {
  if (this.wasNew) this.vote(this.author._id, 1);
  doc
    .populate("author")
    .populate("answers.author", "-role")
    .populate("comments.author", "-role")
    .populate("answers.comments.author", "-role")
    .execPopulate()
    .then(() => next());
});

export default model("Question", questionSchema);
