import { Router } from "express"
import { getNotes, addNote, updateNote, deleteNote, getNoteById } from "../controllers/notes"

const router: Router = Router()

router.get("/:id", getNotes)

router.get("/notes/:starId", getNotes)

router.post("/add-note", addNote)

router.put("/edit-note/:id", updateNote)

router.delete("/delete-note/:id", deleteNote)

router.get("/note/:id", getNoteById)

export default router