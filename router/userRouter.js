import { Router } from "express";
import { registerUser, deleteUser, getOneUser, getAllUser, updateUser, loginUser, logoutUser } from "../controllers/userController.js";
import { authenticate,authorize} from "../middlewares/auth.js";

const router = Router();

router.post("/add",registerUser);
router.delete("/delete/:id",authenticate,authorize,deleteUser);
router.get("/one/:id",getOneUser);
router.get("/all",getAllUser);
router.patch("/update/:id",authenticate,updateUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);

export default router;