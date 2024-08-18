import { Router } from "express";
import { addtodo, deletetodo, fetchAlltodo, fetchtodo, updatetodo } from "../controllers/todoController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const router = Router();

router.post("/add",authenticate,addtodo);
router.get("/one/:id",fetchtodo);
router.get("/all",authenticate,fetchAlltodo);
router.patch("/update/:id",authenticate,updatetodo);
router.delete("/delete/:id",authenticate,authorize,deletetodo)

export default router;