import * as dotenv from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
// @ts-expect-error: there is no type for this package
import xssClean from "xss-clean";
import { mainLogger } from "./logger";

dotenv.config();

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many  requests. Please try again in about 10 minutes.",
});

const app: Application = express();

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "https://example.com",
//   optionsSuccessStatus: 2000,
// };

app.use(cors());

// set http headers
app.use(helmet());
// compress the node application
app.use(compression());
// serve as a limiter for accessing our api
app.use(apiLimiter);
// clean againt injections
app.use(xssClean());

app.get("/get/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: "The route you requested was not found." });
});

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const PORT = (process.env.PORT as unknown as number) || 5000;

app.listen(PORT, () => {
  mainLogger.info(`Server listening on port ${PORT}`);
});
