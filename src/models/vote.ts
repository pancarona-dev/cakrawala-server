import { Schema, Document } from "mongoose";

export interface IVote extends Document {
  user: Schema.Types.ObjectId;
  vote: number;
}

const voteSchema = new Schema<IVote>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    vote: { type: Number, required: true },
  },
  { _id: false }
);

export default voteSchema;
