import mongoose, { connect } from "mongoose";
import { configs } from "./../../config";
import { mainLogger } from "./../../logger";

mongoose.set("strictQuery", true);

connect(configs.MONGODB_URI)
  .then(() => mainLogger.info("DB connected successfully"))
  .catch(() => mainLogger.error("DB failed to connect"));

// if you want to explicitly call this your self
// export const startDB = async (): Promise<void> => {
//   connect(process.env.MONGODB_URI as string)
//     .then(() => mainLogger.info("DB connected successfully"))
//     .catch(() => mainLogger.error("DB failed to connect"));
// };
