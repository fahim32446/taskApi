import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct, getProduct } from "../controllers/product.js";

import { verifyToken, verifyAdmin, verifyEditor } from "../utils/verifyToken.js";


const router = express.Router();


//CREATE
router.post("/", verifyToken, createProduct);


//UPDATE
router.put("/:id", verifyToken, updateProduct);

//DELETE
router.delete("/:id", verifyAdmin, deleteProduct);

//GET 
router.get("/:id", getProduct);

//GETS ALL
router.get("/", getProducts);


export default router;