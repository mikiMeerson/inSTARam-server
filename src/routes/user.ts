import { Router } from "express"
import { getAllUsers, addUser, updateUser, deleteUser, login } from "../controllers/users"

const router: Router = Router()

router.use("/all-users", getAllUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.post("/login", login);

export default router