import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser, getUserById } from "../controllers/users"

const router: Router = Router()

router.get("/:id", getUsers)

router.get("/users/:starId", getUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.get("/user/:id", getUserById)

export default router