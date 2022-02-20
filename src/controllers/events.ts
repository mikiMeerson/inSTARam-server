import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { IEvent } from "../types/event";
import Event from "../models/event";

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const events: IEvent[] = await Event.find();
    res.status(StatusCodes.OK).json({ events });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not get events' });
  }
};

export const addEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      IEvent,
      | "name"
      | "type"
      | "version"
      | "date"
      | "publisher"
      | "description"
      | "configuration"
      | "findings"
    >;

    const event: IEvent = new Event({
      name: body.name,
      type: body.type,
      version: body.version,
      date: body.date,
      publisher: body.publisher,
      description: body.description,
      configuration: body.configuration,
      findings: body.findings
    });

    const newEvent: IEvent = await event.save();
    const allEvents: IEvent[] = await Event.find();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Event added", event: newEvent, events: allEvents });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not create event' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params: { id }, body} = req;
    const updateEvent: IEvent | null = await Event.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allEvents: IEvent[] = await Event.find();
    res.status(StatusCodes.OK).json({
      message: "Event updated",
      event: updateEvent,
      events: allEvents,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not update event' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedEvent: IEvent | null = await Event.findByIdAndRemove(
      req.params.id
    );
    const allEvents: IEvent[] = await Event.find();
    res.status(StatusCodes.OK).json({
      message: "Event deleted",
      event: deletedEvent,
      events: allEvents,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not delete event' });
  }
};