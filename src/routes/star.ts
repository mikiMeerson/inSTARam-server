import { Router } from "express"
import { getStars, addStar, updateStar, deleteStar, getStarById } from "../controllers/stars"

const router: Router = Router()

router.get("/", getStars)

router.get("/stars", getStars)

router.post("/add-star", addStar)

router.put("/edit-star/:id", updateStar)

router.delete("/delete-star/:id", deleteStar)

router.get("/star/:id", getStarById)

export default router