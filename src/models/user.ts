import { Schema, model, Document } from 'mongoose';
import { PermissionsType } from 'helpers/permissions';

export enum Roles {
	ADMIN = 'admin',
	BUSINESS = 'business',
	PARTICIPANT = 'participant',
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
}

const userSchema: Schema = new Schema({
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
			ref: 'User',
		},
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	pinnedPosts: {
		type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
		select: false,
	},
});

const objectModel = model<IUser>('User', userSchema);
export default objectModel;
