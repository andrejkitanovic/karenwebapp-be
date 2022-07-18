// import nodeMailjet from 'node-mailjet';
// import { readFile } from 'helpers/readFile';
// import path from 'path';

// import Organisation from 'models/organisation';

// const mailjet = nodeMailjet.connect(process.env.MJ_APIKEY_PUBLIC ?? '', process.env.MJ_APIKEY_PRIVATE ?? '');
// const From = {
// 	Email: 'kitanovicandrej213@gmail.com',
// 	Name: 'Destiliraj | Obaveštenje',
// };
// const SubjectPrefix = 'Destiliraj |';

// export const sendEmailInvitation = async ({
// 	organisationId,
// 	userId,
// 	email,
// }: {
// 	organisationId: string;
// 	userId: string;
// 	email: string;
// }) => {
// 	try {
// 		const organisation = await Organisation.findById(organisationId);

// 		const html = await readFile({
// 			path: path.join(__dirname, './templates/invitation.jade'),
// 			context: {
// 				welcome_label: 'Dobrodosli!',
// 				description_label:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim',
// 				confirm_account_label: 'Confirm Account',
// 				additional_label:
// 					'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim',
// 				organisation_name: organisation?.name,
// 				user_id: userId,
// 			},
// 		});

// 		await mailjet.post('send', { version: 'v3.1' }).request({
// 			Messages: [
// 				{
// 					From,
// 					To: [
// 						{
// 							Email: email,
// 						},
// 					],
// 					Subject: `${SubjectPrefix} User Invitation`,
// 					HTMLPart: html,
// 				},
// 			],
// 		});

// 		return true;
// 	} catch (err) {
// 		throw new Error();
// 	}
// };
