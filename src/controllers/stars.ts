import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { IStar } from "../types/star";
import Star from "../models/star";

export const getStars = async (req: Request, res: Response): Promise<void> => {
  try {
    const stars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({ stars });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not get stars' });
  }
};

export const addStar = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IStar,
      | "priority"
      | "severity"
      | "name"
      | "status"
      | "assignee"
      | "date"
      | "version"
      | "publisher"
      | "event"
      | "resources"
      | "desc"
      | "computer"
    >;

    const star: IStar = new Star({
      priority: body.priority,
      severity: body.severity,
      name: body.name,
      status: body.status,
      assignee: body.assignee,
      version: body.version,
      publisher: body.publisher,
      event: body.event,
      resources: [],
      desc: body.desc,
      computer: body.computer,
    });

    const newStar: IStar = await star.save();
    const allStars: IStar[] = await Star.find();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Star added", star: newStar, stars: allStars });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not create star' });
  }
};

export const updateStar = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateStar: IStar | null = await Star.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allStars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({
      message: "Star updated",
      star: updateStar,
      stars: allStars,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not update star' });
  }
};

export const deleteStar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStar: IStar | null = await Star.findByIdAndRemove(
      req.params.id
    );
    const allStars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({
      message: "Star deleted",
      star: deletedStar,
      stars: allStars,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not delete star' });
  }
};

export const getStarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getStar: IStar | null = await Star.findById(req.params.id);
    const allStars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({
      message: "Star found",
      star: getStar,
      stars: allStars,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not find star' });
  }
};