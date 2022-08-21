import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import i18n from 'helpers/i18n';
import User, { Roles } from 'models/user';
import Company from 'models/company';
import { adminPermissions } from 'helpers/permissions';
import { createVerificationCode } from './verificationCode';
import { sendEmailVerification, sendEmailWelcome } from 'utils/mailer';

export const getMe: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		const me = await User.findById(id).select('+pinnedPosts');

		if (me) {
			me.permissions = adminPermissions;
		}

		res.json({
			data: me,
		});
	} catch (err) {
		next(err);
	}
};

export const postLogin: RequestHandler = async (req, res, next) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });

		const token = jwt.sign({ id: user?._id }, process.env.DECODE_KEY || '', {
			// expiresIn: "1h",
		});

		res.json({
			token,
			message: i18n.__('CONTROLLER.AUTH.POST_LOGIN.LOGGED_IN'),
		});
	} catch (err) {
		next(err);
	}
};

export const postRegisterVerification: RequestHandler = async (req, res, next) => {
	try {
		const { email } = req.body;
		const code = await createVerificationCode(email);

		await sendEmailVerification({ email, code });

		res.json({
			// message: i18n.__('CONTROLLER.AUTH.POST_REGISTER.REGISTERED'),
		});
	} catch (err) {
		next(err);
	}
};

export const postRegister: RequestHandler = async (req, res, next) => {
	try {
		const { role, name, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			password: hashedPassword,
			role,
			name,
			email,
		});

		if (role === Roles.BUSINESS) {
			const { companyName, companyType, companyEmail } = req.body;
			await Company.create({
				user: user._id,
				name: companyName,
				type: companyType,
				email: companyEmail,
			});
		}

		const token = jwt.sign({ id: user._id }, process.env.DECODE_KEY || '', {
			// expiresIn: "1h",
		});

		await sendEmailWelcome({ email });

		res.json({
			token,
			message: i18n.__('CONTROLLER.AUTH.POST_REGISTER.REGISTERED'),
		});
	} catch (err) {
		next(err);
	}
};

export const putMe: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;
		const { name } = req.body;

		await User.findByIdAndUpdate(id, {
			name,
		});

		res.json({
			message: i18n.__('CONTROLLER.AUTH.PUT_ME.UPDATED'),
		});
	} catch (err) {
		next(err);
	}
};
