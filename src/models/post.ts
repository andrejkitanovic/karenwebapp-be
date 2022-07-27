import { Schema, model, Document } from 'mongoose';
import { IComment } from './comment';

export interface IPost extends Document {
	user: string;
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
			enum: ['constant-complainer', 'the-negotiator', 'doesnt-pay', 'free-lunch-lady', 'discount-debbie'],
			required: true,
		},
		involved: {
			type: String,
			required: true,
		},
		opinion: {
			type: String,
			enum: ['disappointed', 'mad', 'shocked'],
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
