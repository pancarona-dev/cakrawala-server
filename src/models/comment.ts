import { Schema, Document } from "mongoose";

export interface IVote extends Document {
  author: Schema.Types.ObjectId;
  body: string;
  created: Date;
}

const commentSchema: any = new Schema<IVote>({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  body: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

commentSchema.set("toJSON", { getters: true });
commentSchema.options.toJSON.transform = (doc: any, ret: any) => {
  const obj = { ...ret };
  delete obj._id;
  return obj;
};

// export default mongoose.model('Comment', commentSchema);
export default commentSchema;
