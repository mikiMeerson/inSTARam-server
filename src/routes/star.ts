import { Router } from "express"
import {
    getStars,
    getStarsByPlatform,
    getStarsByEvent,
    addStar,
    updateStar,
    deleteStar,
    getStarById,
    addNote,
    removeNote,
    prioritizeStar,
 } from "../controllers/stars"

const router: Router = Router()

router.get("/stars/", getStars)

router.get("/starsByPlatform/:platform", getStarsByPlatform)

router.get("/starsByEvent/:eventId", getStarsByEvent)

router.post("/stars", addStar)

router.put("/stars/:id", updateStar)

router.delete("/stars/:id", deleteStar)

router.get("/stars/:id", getStarById)

router.put("/add-note/:id", addNote)

router.put("/remove-note/:id", removeNote)

router.put("/prioritize-star/:id", prioritizeStar);
export default router