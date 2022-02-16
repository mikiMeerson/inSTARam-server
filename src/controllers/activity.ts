import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { IActivity } from "../types/activity";
import Activity from "../models/activity";

export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const activities: IActivity[] = (await Activity.find())
      .filter((a) => a.starId === req.params.starId);
    res.status(StatusCodes.OK).json({ activities });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not get activities' });
  }
};

export const addActivity = async (req: Request, res: Response): Promise<void> => {
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

    res.status(StatusCodes.CREATED).json({
      message: "Activity added",
      activity: newActivity,
      activities: allActivities,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not add activity' })
  }
};

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
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
    res.status(StatusCodes.OK).json({
      message: "Activity updated",
      activity: updateActivity,
      activities: allActivities,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not update activity' })
  }
};

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedActivity: IActivity | null = await Activity.findByIdAndRemove(req.params.id);
    const allActivities: IActivity[] = await Activity.find();
    res.status(StatusCodes.OK).json({
      message: "Activity deleted",
      activity: deletedActivity,
      activities: allActivities,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not delete activity' })
  }
};

export const getActivityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getActivity: IActivity | null = await Activity.findById(req.params.id);
    const allActivities: IActivity[] = await Activity.find();
    res.status(StatusCodes.OK).json({
      message: "Activity found",
      activity: getActivity,
      Activities: allActivities,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not find activity' })
  }
};