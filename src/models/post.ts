import { Document, Schema, model } from "mongoose";

import { IComment } from "./comment";

export enum PostCategoryEnum {
  GENERAL_CONVERSATION = "general-conversation",
  EMPLOYEE_INTERACTION = "employee-interaction",
  CUSTOMER_INTERACTION = "customer-interaction",
}

export enum PostInteractionEnum {
  POSITIVE_INTERACTION = "positive-interaction",
  NEGATIVE_INTERACTION = "negative-interaction",
  NEUTRAL_INTERACTION = "neutral-interaction",
}

export type AttachmentType = {
  path: string;
  type: string;
  name: string;
};

export interface IPost extends Document {
  user: string;
  content: string;
  address: {
    formatted: string;
    location: { lat: string; lng: string };
  };
  category: PostCategoryEnum;
  interaction?: PostInteractionEnum;
  industry?: string;
  companyType?: string;
  recommend: boolean;

  participant: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };

  // Additional
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
    category: {
      type: String,
      enum: PostCategoryEnum,
      required: true,
    },
    interaction: {
      type: String,
      enum: PostInteractionEnum,
    },
    industry: {
      type: String,
    },
    companyType: {
      type: String,
    },
    recommend: {
      type: Boolean,
    },

    participant: {
      name: {
        type: String,
      },
      address: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
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
