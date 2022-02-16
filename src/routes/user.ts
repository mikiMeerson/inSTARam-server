import { Router } from "express"
import { getAllUsers, getUserById, addUser, updateUser, deleteUser, login } from "../controllers/users"

const router: Router = Router()

router.get("/users", getAllUsers)

router.get("/users/:id", getUserById)

router.post("/register", addUser)

router.put("/users/:id", updateUser)

router.delete("/users/:id", deleteUser)

router.post("/login", login);

export default router