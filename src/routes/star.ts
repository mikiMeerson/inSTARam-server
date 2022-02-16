import { Router } from "express"
import { getStars, addStar, updateStar, deleteStar, getStarById } from "../controllers/stars"

const router: Router = Router()

router.get("/", getStars)

router.get("/stars", getStars)

router.post("/stars", addStar)

router.put("/stars/:id", updateStar)

router.delete("/stars/:id", deleteStar)

router.get("/stars/:id", getStarById)

export default router