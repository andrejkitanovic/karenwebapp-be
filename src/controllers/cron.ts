import cron from "node-schedule";

import { cronClearCodes } from "./verificationCode";

// cron.scheduleJob("* * * * *", FUNCTION); // Every minute [DEBUGER]
cron.scheduleJob("*/5 * * * *", cronClearCodes); // Every 5 minutes
