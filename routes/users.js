import express from 'express'
import { updateUser, deleteUser, getUsers } from "../controllers/user.js";
import { verifyToken, verifyAdmin, verifyEditor } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyToken, updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET ALL
router.get("/", verifyToken, getUsers);

export default router;