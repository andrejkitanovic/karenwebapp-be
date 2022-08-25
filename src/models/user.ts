import { PermissionsType } from "helpers/permissions";
import Company, { ICompany } from "models/company";
import { Document, Schema, model } from "mongoose";

export enum Roles {
  ADMIN = "admin",
  BUSINESS = "business",
  PARTICIPANT = "participant",
}
export type RoleType = `${Roles}`;

export interface IUser extends Document {
  role: RoleType;
  permissions: PermissionsType[];
  confirmed: boolean;
  email: string;
  password: string;
  name: string;
  followers: string[];
  following: string[];
  pinnedPosts: string[];

  withCompany: () => void;
}

const userSchema: Schema = new Schema(
  {
    role: {
      type: String,
      enum: Roles,
      required: true,
    },
    permissions: [{ type: String }],
    confirmed: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
    },
    name: {
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
  },
  { timestamps: true }
);

userSchema.methods.withCompany = async function () {
  if (this.role === Roles.BUSINESS) {
    const company = (await Company.findOne({ user: this._id })) as ICompany;
    this.name = company.name;
  }
};
const objectModel = model<IUser>("User", userSchema);
export default objectModel;
