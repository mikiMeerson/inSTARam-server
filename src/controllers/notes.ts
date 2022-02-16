import { Response, Request } from "express";
import { StatusCodes } from 'http-status-codes';
import { INote } from "../types/note";
import Note from "../models/note";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: INote[] = await (await Note.find()).filter((n) => n.starId === req.params.starId);
    res.status(StatusCodes.OK).json({ notes });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: 'could not get notes' });
  }
};

export const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      INote,
      | "starId"
      | "note"
      | "publisher"
      | "repliesTo"
    >;

    const note: INote = new Note({
      starId: body.starId,
      note: body.note,
      publisher: body.publisher,
      repliesTo: body.repliesTo
    });

    const newNote: INote = await note.save();
    const allNotes: INote[] = await Note.find();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Note added", note: newNote, notes: allNotes });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not create note' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { params: { id }, body} = req;
    const updateNote: INote | null = await Note.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allNotes: INote[] = await Note.find();
    res.status(StatusCodes.OK).json({
      message: "Note updated",
      note: updateNote,
      notes: allNotes,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not update note' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedNote: INote | null = await Note.findByIdAndRemove(
      req.params.id
    );
    const allNotes: INote[] = await Note.find();
    res.status(StatusCodes.OK).json({
      message: "Note deleted",
      note: deletedNote,
      notes: allNotes,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'could not delete note' });
  }
};