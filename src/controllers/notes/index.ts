import { Response, Request } from "express";
import { INote } from "../../types/note";
import Note from "../../models/note";

const getNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const notes: INote[] = await (await Note.find()).filter((n) => n.starId === req.starId);
    res.status(200).json({ notes });
  } catch (error) {
    throw error;
  }
};

const addNote = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
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
      .status(201)
      .json({ message: "Note added", note: newNote, notes: allNotes });
  } catch (error) {
    throw error;
  }
};

const updateNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateNote: INote | null = await Note.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allNotes: INote[] = await Note.find();
    res.status(200).json({
      message: "Note updated",
      note: updateNote,
      notes: allNotes,
    });
  } catch (error) {
    throw error;
  }
};

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedNote: INote | null = await Note.findByIdAndRemove(
      req.params.id
    );
    const allNotes: INote[] = await Note.find();
    res.status(200).json({
      message: "Note deleted",
      note: deletedNote,
      notes: allNotes,
    });
  } catch (error) {
    throw error;
  }
};

const getNoteById = async (req: Request, res: Response): Promise<void> => {
  try {
    const getNote: INote | null = await Note.findById(
      req.params.id
    );
    const allNotes: INote[] = await Note.find();
    res.status(200).json({
      message: "Note found",
      note: getNote,
      notes: allNotes,
    });
  } catch (error) {
    throw error;
  }
};

export { getNotes, addNote, updateNote, deleteNote, getNoteById };
