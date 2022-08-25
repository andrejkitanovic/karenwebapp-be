import dayjs from "dayjs";
import VerificationCode from "models/verificationCode";

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

export const cronClearCodes = async () => {
  const clearVerificationCodes = await VerificationCode.deleteMany({
    createdAt: {
      $lt: dayjs().subtract(5, "minute"),
    },
  });

  console.log(
    `[CRON] Clear Verification Codes: Cleared ${clearVerificationCodes.deletedCount}`
  );
};
