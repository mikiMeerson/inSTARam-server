import { Router } from "express"
import { getUsers, addUser, updateUser, deleteUser, signIn } from "../controllers/users"

const router: Router = Router()

router.get("/:id", getUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.post("/signin", signIn)

export default router