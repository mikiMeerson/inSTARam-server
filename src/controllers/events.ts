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
      | "publisher"
      | "type"
      | "assignee"
      | "block"
      | "platform"
      | "dates"
      | "reason"
      | "team" 
      | "callSign"
      | "areas"
      | "duration"
      | "generalSummary"
      | "goals"
      | "dataSources"
      | "configuration"
      | "description"
      | "findings"
      | "notes"
      | "conclusions"
    >;

    const event: IEvent = new Event({
      name: body.name,
      publisher: body.publisher,
      type: body.type,
      assignee: body.assignee,
      block: body.block,
      platform: body.platform,
      dates: body.dates,
      reason: body.reason,
      team: body.team,
      callSign: body.callSign,
      areas: body.areas,
      duration: body.duration,
      generalSummary: body.generalSummary,
      goals: body.goals,
      dataSources: body.dataSources,
      configuration: body.configuration,
      description: body.description,
      findings: body.findings,
      notes: body.notes,
      conclusions: body.conclusions,
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

export const getEventById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getEvent: IEvent | null = await Event.findById(req.params.id);
    const allEvents: IEvent[] = await Event.find();
    res.status(StatusCodes.OK).json({
      message: "Event found",
      event: getEvent,
      events: allEvents,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: "could not find event" });
  }
};
