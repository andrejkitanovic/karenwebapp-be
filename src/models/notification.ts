import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  user: string;
  target: string;
  type: string;
  opened: boolean;
}

const notificationSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["comment"],
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const objectModel = model<INotification>("Notification", notificationSchema);
export default objectModel;
