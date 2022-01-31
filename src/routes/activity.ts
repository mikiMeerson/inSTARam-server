import { Router } from "express";
import {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
} from "../controllers/activities";

const router: Router = Router();

router.get("/:id", getActivities);

router.get("/activities/:starId", getActivities);

router.post("/add-activity", addActivity);

router.put("/edit-activity/:id", updateActivity);

router.delete("/delete-activity/:id", deleteActivity);

router.get("/activity/:id", getActivityById);

export default router;
