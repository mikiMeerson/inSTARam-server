import { Router } from "express"
import { getNotes, addNote, updateNote, deleteNote } from "../controllers/notes"

const router: Router = Router()

router.get("/notes/:starId", getNotes)

router.post("/notes", addNote)

router.put("/notes/:id", updateNote)

router.delete("/notes/:id", deleteNote)

export default router