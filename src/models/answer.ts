import { Schema, Document } from "mongoose";
import voteSchema from "./vote";
import commentSchema from "./comment";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  created: Date;
  text: string;
  score: number;
  votes: any;
  comments: any;
}

const answerSchema = new Schema<IAnswer>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  created: { type: Date, default: Date.now },
  text: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
});

answerSchema.set("toJSON", { getters: true });

answerSchema.methods = {
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
    return this;
  },

  addComment: function (author: any, body: any) {
    this.comments.push({ author, body });
    return this;
  },

  removeComment: function (id: any) {
    const comment = this.comments.id(id);
    if (!comment) throw new Error("Comment not found");
    comment.remove();
    return this;
  },
};

export default answerSchema;
