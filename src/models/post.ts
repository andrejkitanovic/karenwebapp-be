import { Schema, model, Document } from 'mongoose';
import { IComment } from './comment';

export enum PostCategoryEnum {
	CONSTANT_COMPLAINER = 'constant-complainer',
	THE_NEGOTIATOR = 'the-negotiator',
	DOESNT_PAY = 'doesnt-pay',
	FREE_LUNCH_LADY = 'free-lunch-lady',
	DISCOUNT_DEBBIE = 'discount-debbie',
}

enum PostOpinionEnum {
	DISAPPOINTED = 'disappointed',
	MAD = 'mad',
	SHOCKED = 'shocked',
}

export interface IPost extends Document {
	user: string;
	category: PostCategoryEnum;
	involved: string;
	opinion: string;
	content: string;
	votes: {
		up: string[];
		down: string[];
	};
	comments: IComment[];
}

const postSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
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
		votes: {
			up: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
			down: [
				{
					type: Schema.Types.ObjectId,
					ref: 'User',
				},
			],
		},
		comments: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Comment',
			},
		],
	},
	{ timestamps: true }
);

const objectModel = model<IPost>('Post', postSchema);
export default objectModel;
