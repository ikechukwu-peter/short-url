import * as dotenv from "dotenv";
dotenv.config();

export const configs = {
  PORT: process.env.PORT as unknown as number,
  MONGODB_URI: process.env.MONGODB_URI as string,
};
