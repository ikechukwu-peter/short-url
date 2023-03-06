import { Router } from "express";

const authRouter = Router();

authRouter.post("/login");
authRouter.get("/authenticated/:token");

export { authRouter };
