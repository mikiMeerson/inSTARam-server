import { Router } from "express"
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, login } from "../controllers/users"

const router: Router = Router()

router.get("/all-users", getAllUsers)

router.get("/user/:id", getUserById)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.post("/login", login);

export default router