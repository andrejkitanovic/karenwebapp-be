import path from "path";

import { readFile } from "helpers/readFile";
import nodeMailjet from "node-mailjet";

const mailjet = nodeMailjet.connect(
  process.env.MJ_APIKEY_PUBLIC ?? "",
  process.env.MJ_APIKEY_PRIVATE ?? ""
);
const From = {
  Email: "app@karenslists.net",
  Name: "KARENWEBAPP",
};
const SubjectPrefix = "KARENWEBAPP |";

export const sendEmailVerification = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  try {
    const html = await readFile({
      path: path.join(__dirname, "./templates/verificationCode.jade"),
      context: { code },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From,
          To: [
            {
              Email: email,
            },
          ],
          Subject: `${SubjectPrefix} Verification Code`,
          HTMLPart: html,
        },
      ],
    });

    return true;
  } catch (err) {
    throw new Error();
  }
};

export const sendEmailWelcome = async ({ email }: { email: string }) => {
  try {
    const html = await readFile({
      path: path.join(__dirname, "./templates/welcome.jade"),
      context: {},
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From,
          To: [
            {
              Email: email,
            },
          ],
          Subject: `${SubjectPrefix} Welcome`,
          HTMLPart: html,
        },
      ],
    });

    return true;
  } catch (err) {
    throw new Error();
  }
};

export const sendEmailResetPassword = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  try {
    const html = await readFile({
      path: path.join(__dirname, "./templates/resetPassword.jade"),
      context: { code },
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From,
          To: [
            {
              Email: email,
            },
          ],
          Subject: `${SubjectPrefix} Reset Password`,
          HTMLPart: html,
        },
      ],
    });

    return true;
  } catch (err) {
    throw new Error();
  }
};

export const sendEmailNotification = async ({ email }: { email: string }) => {
  try {
    const html = await readFile({
      path: path.join(__dirname, "./templates/notification.jade"),
      context: {},
    });

    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From,
          To: [
            {
              Email: email,
            },
          ],
          Subject: `${SubjectPrefix} Notification`,
          HTMLPart: html,
        },
      ],
    });

    return true;
  } catch (err) {
    console.log(err);
    throw new Error();
  }
};
