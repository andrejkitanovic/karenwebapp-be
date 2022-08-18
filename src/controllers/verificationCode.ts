import VerificationCode from 'models/verificationCode';

export const verifyWithCode = async (assigned: string, code: string) => {
	return await VerificationCode.exists({ assigned, code });
};

export const createVerificationCode = async (assigned: string) => {
	await VerificationCode.deleteMany({ assigned });
	
	const verificationCode = await VerificationCode.create({
		assigned,
	});

	return verificationCode.code;
};
