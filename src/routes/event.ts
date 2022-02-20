import { Router } from "express"
import { getEvents, addEvent, updateEvent, deleteEvent } from "../controllers/events"

const router: Router = Router()

router.get("/events", getEvents)

router.post("/events", addEvent)

router.put("/events/:id", updateEvent)

router.delete("/events/:id", deleteEvent)

export default router