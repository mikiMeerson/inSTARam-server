import { Router } from "express";
import {
  getActivities,
  addActivity,
  deleteActivity,
} from "../controllers/activity";

const router: Router = Router();

router.get("/activities/:starId", getActivities);

router.post("/activities", addActivity);

router.delete("/activities/:id", deleteActivity);

export default router;
