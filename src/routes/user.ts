import { Router } from "express"
import { getAllUsers, addUser, updateUser, deleteUser, login } from "../controllers/users"

const router: Router = Router()

// ! Dor Review
// GET /users is the convention I think.
// This way you can also allow an optional query parameter of a name, id, etc.
// to get a specific user in the same endpoint, which is convenient for API users.
router.get("/all-users", getAllUsers)

router.post("/add-user", addUser)

router.put("/edit-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

router.post("/login", login);

export default router