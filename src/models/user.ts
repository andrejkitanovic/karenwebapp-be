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
	email: string;
	password: string;
	name: string;
	confirmed: boolean;
}

const userSchema: Schema = new Schema({
	role: {
		type: String,
		enum: Roles,
		required: true,
	},
	permissions: [{ type: String }],
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
	confirmed: {
		type: Boolean,
		default: false,
	},
});

const objectModel = model<IUser>('User', userSchema);
export default objectModel;
