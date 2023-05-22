import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
  profilePhoto: string;
  created: Date;
}

const userSchema: any = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  profilePhoto: {
    type: String,
    default: function (this: any) {
      return `https://secure.gravatar.com/avatar/${this._id}?s=90&d=identicon`;
    },
  },
  created: { type: Date, default: Date.now },
});

userSchema.set("toJSON", { getters: true });
userSchema.options.toJSON.transform = (doc: any, ret: any) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

export default model("user", userSchema);
