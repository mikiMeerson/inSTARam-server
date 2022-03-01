import { Router } from "express"
import { getStars, addStar, updateStar, deleteStar, getStarById, addNote, removeNote, addActivity } from "../controllers/stars"

const router: Router = Router()

router.get("/stars", getStars)

router.post("/stars", addStar)

router.put("/stars/:id", updateStar)

router.delete("/stars/:id", deleteStar)

router.get("/stars/:id", getStarById)

router.put("/add-note/:id", addNote)

router.put("/remove-note/:id", removeNote)

router.put("/add-activity/:id", addActivity)

export default router