import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profileRouter from "./profile";
import memoriesRouter from "./memories";
import commentsRouter from "./comments";
import diaryRouter from "./diary";
import milestonesRouter from "./milestones";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profileRouter);
router.use(memoriesRouter);
router.use(commentsRouter);
router.use(diaryRouter);
router.use(milestonesRouter);
router.use(statsRouter);

export default router;
