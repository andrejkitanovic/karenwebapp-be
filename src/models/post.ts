import { Document, Schema, model } from "mongoose";

import { IComment } from "./comment";

export enum PostCategoryEnum {
  CONSTANT_COMPLAINER = "constant-complainer",
  THE_NEGOTIATOR = "the-negotiator",
  DOESNT_PAY = "doesnt-pay",
  FREE_LUNCH_LADY = "free-lunch-lady",
  DISCOUNT_DEBBIE = "discount-debbie",
}

enum PostOpinionEnum {
  DISAPPOINTED = "disappointed",
  MAD = "mad",
  SHOCKED = "shocked",
}

export type AttachmentType = {
  path: string;
  type: string;
  name: string;
};

export interface IPost extends Document {
  user: string;
  category: PostCategoryEnum;
  involved: string;
  opinion: string;
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
    involved: {
      type: String,
      required: true,
    },
    opinion: {
      type: String,
      enum: PostOpinionEnum,
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
