import { Schema, model, Document } from "mongoose";

export interface IComment extends Document {
  user: string;
  post?: string;
  content: string;
  replies: IComment[];
}

const commentSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const objectModel = model<IComment>("Comment", commentSchema);
export default objectModel;
