import { Response, Request } from "express";
import { IActivity } from "../types/activity";
import Activity from "../models/activity";

const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const activities: IActivity[] = await (
      await Activity.find()
    ).filter((a) => a.starId === req.params.starId);
    res.status(200).json({ activities });
  } catch (error) {
    throw error;
  }
};

const addActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IActivity,
      "starId" | "publisher" | "action" | "value"
    >;

    const activity: IActivity = new Activity({
      starId: body.starId,
      publisher: body.publisher,
      action: body.action,
      value: body.value,
    });

    const newActivity: IActivity = await activity.save();
    const allActivities: IActivity[] = await Activity.find();

    res.status(201).json({
      message: "Activity added",
      activity: newActivity,
      activities: allActivities,
    });
  } catch (error) {
    throw error;
  }
};

const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateActivity: IActivity | null = await Activity.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allActivities: IActivity[] = await Activity.find();
    res.status(200).json({
      message: "Activity updated",
      activity: updateActivity,
      activities: allActivities,
    });
  } catch (error) {
    throw error;
  }
};

const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedActivity: IActivity | null = await Activity.findByIdAndRemove(
      req.params.id
    );
    const allActivities: IActivity[] = await Activity.find();
    res.status(200).json({
      message: "Activity deleted",
      activity: deletedActivity,
      activities: allActivities,
    });
  } catch (error) {
    throw error;
  }
};

const getActivityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getActivity: IActivity | null = await Activity.findById(
      req.params.id
    );
    const allActivities: IActivity[] = await Activity.find();
    res.status(200).json({
      message: "Activity found",
      activity: getActivity,
      Activities: allActivities,
    });
  } catch (error) {
    throw error;
  }
};

export {
  getActivities,
  addActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
};
