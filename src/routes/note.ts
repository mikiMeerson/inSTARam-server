import { Router } from "express"
import { getNotes, addNote, updateNote, deleteNote, getNoteById } from "../controllers/notes"

const router: Router = Router()

/**
 * ! Dor Review
 * This is confusing, why are there two endpoints for GET
 * with star id? I guess one is for starId that you generate,
 * the other for an ID that MongoDB generated?
 * A more readable approach in my opinion is a single GET /notes
 * with a query parameter called ID, and choose a single ID with which
 * getting a star will be possible.
 * If you still want to enable retrieving a star using two IDs we need to
 * think of a better naming here since this one is confusing.
 * This applies to activity router as well.
 */
router.get("/note/:id", getNotes)

router.get("/notes/:starId", getNotes)

router.post("/add-note", addNote)

router.put("/edit-note/:id", updateNote)

router.delete("/delete-note/:id", deleteNote)

// ! Dor Review
// This is the same endpoint as the one defined first here,
// probably by mistake.
router.get("/note/:id", getNoteById)

export default router