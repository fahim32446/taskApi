import Product from "../models/Product.js";


export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        next(err);
    }
};


export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};



export const deleteProduct = async (req, res, next) => {

   
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        next(err);
    }
};


export const getProduct = async (req, res, next) => {
    
    try {
        const Products = await Product.findById(req.params.id);
        res.status(200).json(Products);
    } catch (err) {
        next(err);
    }
};



export const getProducts = async (req, res, next) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products);
    } catch (err) {
        next(err);
    }
};
