import { Response, Request } from "express";
import { IStar } from "../../types/star";
import Star from "../../models/star";

const getStars = async (req: Request, res: Response): Promise<void> => {
  try {
    const stars: IStar[] = await Star.find();
    res.status(200).json({ stars });
  } catch (error) {
    throw error;
  }
};

const addStar = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
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
      publisher: 'miki',
      event: body.event,
      resources: [],
      desc: body.desc,
      computer: body.computer
    });

    const newStar: IStar = await star.save();
    const allStars: IStar[] = await Star.find();

    res
      .status(201)
      .json({ message: "Star added", star: newStar, stars: allStars });
  } catch (error) {
    throw error;
  }
};

const updateStar = async (req: Request, res: Response): Promise<void> => {
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
    res.status(200).json({
      message: "Star updated",
      star: updateStar,
      stars: allStars,
    });
  } catch (error) {
    throw error;
  }
};

const deleteStar = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedStar: IStar | null = await Star.findByIdAndRemove(
      req.params.id
    );
    const allStars: IStar[] = await Star.find();
    res.status(200).json({
      message: "Star deleted",
      star: deletedStar,
      stars: allStars,
    });
  } catch (error) {
    throw error;
  }
};

export { getStars, addStar, updateStar, deleteStar };
