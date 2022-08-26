// import { stripeCreateCustomer } from "controllers/stripe";
import { PermissionsType } from "helpers/permissions";
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
  address?: {
    line: string;
    state: string;
    zip: string;
    location: { lat: string; lng: string };
  };
  phone?: string;
  // Company
  companyAdministrator?: string;
  companyType?: string;
  // Payment
  stripeId?: string;

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
      location: {
        lat: {
          type: String,
        },
        lng: {
          type: String,
        },
      },
    },
    phone: {
      type: String,
    },
    // BUSINESS
    companyAdministrator: {
      type: String,
    },
    companyType: {
      type: String,
    },
    // PAYMENTS
    stripeId: {
      type: String,
    },
  },
  { timestamps: true }
);

// userSchema.pre("validate", async function (next) {
//   this.stripeId = await stripeCreateCustomer(this);
//   next();
// });
const objectModel = model<IUser>("User", userSchema);
export default objectModel;
