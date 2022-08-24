import { Document, Schema, model } from "mongoose";

export interface IVerificationCode extends Document {
  assigned: string;
  code: string;
}

const verificationCodeSchema: Schema = new Schema(
  {
    assigned: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: () => {
        const random4DigitNumber = Math.floor(1000 + Math.random() * 9000);
        return JSON.stringify(random4DigitNumber);
      },
    },
  },
  { timestamps: true }
);

const objectModel = model<IVerificationCode>(
  "Verification Code",
  verificationCodeSchema
);
export default objectModel;
