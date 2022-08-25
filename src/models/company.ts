import { Document, Schema, model } from "mongoose";

export interface ICompany extends Document {
  user: string;
  name: string;
  type?: string;
  email: string;
  address?: {
    line: string;
    state: string;
    zip: string;
  };
  phone?: string;
  followers: string[];
  following: string[];
  pinnedPosts: string[];
}

const companySchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    line: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  phone: {
    type: String,
  },

  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  pinnedPosts: {
    type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    select: false,
  },
});

const objectModel = model<ICompany>("Company", companySchema);
export default objectModel;
