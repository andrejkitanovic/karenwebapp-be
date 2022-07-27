import { Schema, model, Document } from 'mongoose';

export interface INotification extends Document {
	user: string;
	content: string;
}

const notificationSchema: Schema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		target: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		type: {
			type: String,
			enum: ['comment'],
			required: true,
		},
	},
	{ timestamps: true }
);

const objectModel = model<INotification>('Notification', notificationSchema);
export default objectModel;
