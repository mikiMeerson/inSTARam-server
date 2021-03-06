import e, { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { IStar } from "../types/star";
import Star from "../models/star";
import { INote } from "../types/note";
import { IActivity } from "../types/activity";

export const EDITABLE_ATTR_ACTIVITY: (keyof IStar)[] = [
  'status',
  'assignee',
  'computer',
];

export const ACTIVITY_INFO = [
  {
    name: 'status',
    action: 'שינת/ה את הסטטוס',
    isValue: true,
  },
  {
    name: 'assignee',
    action: 'שינת/ה את האחראי',
    isValue: true,
  },
  {
    name: 'resources',
    action: 'עדכנ/ה משאבים נדרשים',
    isValue: false,
  },
  {
    name: 'computer',
    action: 'שינת/ה את המערכת',
    isValue: true,
  },
];

export const getStars = async (req: Request, res: Response): Promise<void> => {
  try {
    const stars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({ stars });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "could not get stars" });
  }
};

export const getStarsByPlatform = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { platform },
    } = req;
    const stars: IStar[] = await (await Star.find()).filter((star) => star.platform === platform);
    res.status(StatusCodes.OK).json({ stars });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "could not get stars" });
  }
};

export const getStarsByEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { eventId },
    } = req;
    const stars: IStar[] = await (await Star.find()).filter((star) => star.event === eventId);
    res.status(StatusCodes.OK).json({ stars });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "could not get stars" });
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
      | "platform"
      | "block"
      | "phase"
      | "publisher"
      | "contact"
      | "resources"
      | "desc"
      | "computer"
      | "event"
      | "notes"
      | "activity"
    >;
  
    const star: IStar = new Star({
      priority: body.priority,
      severity: body.severity,
      name: body.name,
      status: body.status,
      assignee: body.assignee,
      platform: body.platform,
      block: body.block,
      phase: body.phase,
      publisher: body.publisher,
      contact: body.contact,
      event: body.event,
      resources: [],
      desc: body.desc,
      computer: body.computer,
      notes: [],
      activity: [],
    });

    star.activity.push({
      publisher: body.publisher,
      action: 'יצר/ה את הסטאר',
    } as IActivity);

    const newStar: IStar = await star.save();
    const allStars: IStar[] = await Star.find();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Star added", star: newStar, stars: allStars });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not create star" });
  }
};

export const updateStar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const originalStar: IStar | null = await Star.findById(id);
    if (originalStar) {
      body.notes = originalStar.notes;
      body.activity = originalStar.activity;

      EDITABLE_ATTR_ACTIVITY.forEach((attr) => {
        if ((originalStar[attr] !== body[attr])
          && !(originalStar[attr].includes(body[attr]) 
          && body[attr].includes(originalStar[attr]))) {
          const info = ACTIVITY_INFO.find((a) => a.name === attr);
          info && body.activity.push({
            publisher: body.publisher,
            action: info.action,
            value: info.isValue ? body[attr] : '',
          } as IActivity);    
        }
      });

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
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Could not find star'});
    }
    
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not update star" });
  }
};

export const deleteStar = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not delete star" });
  }
};

export const getStarById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getStar: IStar | null = await Star.findById(req.params.id);
    const allStars: IStar[] = await Star.find();
    res.status(StatusCodes.OK).json({
      message: "Star found",
      star: getStar,
      stars: allStars,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "could not find star" });
  }
};

const addActivity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const star: IStar | null = await Star.findById(id);
    if (star) {
      star.activity.push({
        publisher: body.publisher,
        action: body.action,
        value: body.value,
      } as IActivity);
      await star.save();
      const stars = await Star.find();
      
      res.status(StatusCodes.CREATED).json({
        message: "Activity added",
        star,
        stars,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND)
        .json({ message: "could not find star" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not add activity" });
  }
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const star: IStar | null = await Star.findById(id);
    if (star) {
      star.notes.push({
        note: body.note,
        publisher: body.publisher,
        repliesTo: body.repliesTo,
      } as INote);
      star.activity.push({
        publisher: body.publisher,
        action: 'הוסיפ/ה הערה חדשה',
      } as IActivity);

      await star.save();
      const stars = await Star.find();
      res.status(StatusCodes.CREATED).json({
        message: "Note added",
        star,
        stars,
      });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "could not find star" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not add note" });
  }
};

const deleteNotes = async (noteId: string, star: IStar): Promise<void> => {
  const replies = star.notes.filter((note) => note.id === noteId);
  replies.forEach(async (reply) => {
    await Star.findByIdAndUpdate(
      { _id: star._id },
      { $pull: { notes: { _id: reply._id } } }
    );
    deleteNotes(reply._id, star);
  });
};

export const removeNote = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    let star = await Star.findById(id);
    if (star) {
      await deleteNotes(body.noteId, star);
      await Star.findByIdAndUpdate(
        { _id: star._id },
        { $pull: { notes: { _id: body.noteId } } }
      );
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "could not find star" });
    }
    star = await Star.findById(id);
    const stars = await Star.find();
    res.status(StatusCodes.OK).json({
      message: "Note removed",
      star,
      stars,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "could not remove note" });
  }
};

export const prioritizeStar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const requestedStar: IStar | null = await Star.findById(id);
    if (requestedStar) {
      const starsByPlatform = await (await Star.find())
        .filter((star) => star.platform === requestedStar.platform)
        .sort((star1, star2) => star1.priority - star2.priority);

      if (body.newPri === 0) {
        // The star was moved from the prioritized list to the unprioritized list
        starsByPlatform
          .filter((star) => star.priority > requestedStar.priority)
          .forEach(async (star) => {
            star.priority = star.priority - 1;
            await Star.findByIdAndUpdate({ _id: star._id }, star);
          });
      } else if (requestedStar.priority === 0 && body.newPri !== 0) {
        // The star was moved from the unprioritized list to the prioritized list
        starsByPlatform
          .filter((star) => star.priority >= body.newPri )
          .forEach(async (star) => {
            star.priority = star.priority + 1;
            await Star.findByIdAndUpdate({ _id: star._id }, star);
          });
      } else if (requestedStar.priority > body.newPri) {
        // The star was moved up in the prioritized list
        starsByPlatform
          .filter((star) => star.priority >= body.newPri && star.priority < requestedStar.priority )
          .forEach(async (star) => {
            star.priority = star.priority + 1;
            await Star.findByIdAndUpdate({ _id: star._id }, star);
          });
      } else if (requestedStar.priority < body.newPri) {
        // The star was moved down in the prioritized list
        starsByPlatform
          .filter((star) => star.priority > requestedStar.priority && star.priority <= body.newPri )
          .forEach(async (star) => {
            star.priority = star.priority - 1;
            await Star.findByIdAndUpdate({ _id: star._id }, star);
          });
      }
      requestedStar.priority = body.newPri;
          await Star.findByIdAndUpdate({ _id: id }, requestedStar);
      
      const prioritizedStar: IStar | null = await Star.findById(id);
      const allStars: IStar[] = await Star.find();
      res.status(StatusCodes.OK).json({
        message: "Star was prioritized",
        star: prioritizedStar,
        stars: allStars,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Could not find requested star '});
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Could not prioritize star" });
  } 
};
