import { Router } from "express"
import { getStars, addStar, updateStar, deleteStar, getStarById, addNote, removeNote } from "../controllers/stars"

const router: Router = Router()

router.get("/stars", getStars)

router.post("/stars", addStar)

router.put("/stars/:id", updateStar)

router.delete("/stars/:id", deleteStar)

router.get("/stars/:id", getStarById)

router.put("/add-note/:id", addNote)

router.put("/remove-note/:id", removeNote)

export default router