import { Document, Schema, model } from "mongoose";

import { IComment } from "./comment";

export enum PostCategoryEnum {
  POSITIVE_CUSTOMER_INTERACTION = "positive-customer-interaction",
  NEGATIVE_CUSTOMER_INTERACTION = "negative-customer-interaction",
  NEUTRAL_CUSTOMER_INTERACTION = "neutral-customer-interaction",
}

export type AttachmentType = {
  path: string;
  type: string;
  name: string;
};

export interface IPost extends Document {
  user: string;
  category: PostCategoryEnum;
  content: string;
  address: {
    formatted: string;
    location: { lat: string; lng: string };
  };
  votes: {
    up: string[];
    down: string[];
  };
  comments: IComment[];
  attachments: AttachmentType[];
}

const postSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: PostCategoryEnum,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    address: {
      formatted: {
        type: String,
      },
      location: {
        lat: {
          type: String,
        },
        lng: {
          type: String,
        },
      },
    },
    votes: {
      up: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      down: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    attachments: [
      {
        path: {
          type: String,
        },
        type: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const objectModel = model<IPost>("Post", postSchema);
export default objectModel;
