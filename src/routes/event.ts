import { Router } from "express"
import { getEvents, getEventsByPlatform, addEvent, updateEvent, deleteEvent, getEventById } from "../controllers/events"

const router: Router = Router()

router.get("/events", getEvents)

router.get("/events/:platform", getEventsByPlatform)

router.post("/events", addEvent)

router.put("/events/:id", updateEvent)

router.delete("/events/:id", deleteEvent)

router.get("/event/:id", getEventById)

export default router