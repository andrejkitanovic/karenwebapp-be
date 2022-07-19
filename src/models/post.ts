import { Schema, model, Document } from 'mongoose';

export interface IPost extends Document {
	user: string;
	content: string;
	votes: {
		up: number;
		down: number;
	};
}

const postSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		votes: {
			up: {
				type: Number,
				default: 0,
			},
			down: {
				type: Number,
				default: 0,
			},
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
