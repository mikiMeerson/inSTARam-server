import { Router } from "express"
import { getStars, addStar, updateStar, deleteStar, getStarById } from "../controllers/stars"

const router: Router = Router()

router.get("/", getStars)

/**
 * ! Dor Review
 * I'd change all of the endpoints to be `/stars`.
 * I think that according to REST conventions its ok to do so,
 * since the request type (GET, POST, PUT, DELETE) will determine
 * what is done in the request.
 * If you have a resource called star, and a collection of stars, then
 * requests can be sent to a single endpoint `/stars` with the convention
 * described above.
 * This applies to all other routers as well (instead of copy-paste this comment
 * in every file).
 */
router.get("/stars", getStars)

router.post("/add-star", addStar)

router.put("/edit-star/:id", updateStar)

router.delete("/delete-star/:id", deleteStar)

router.get("/star/:id", getStarById)

export default router