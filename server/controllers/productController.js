import {v2 as cloudinary} from "cloudinary"
import Product from "../models/Product.js"

export const addProduct=async(req,res)=>{
    try {
        // Validate files exist
        if (!req.files || req.files.length === 0) {
            return res.json({success:false,message:"No images provided"})
        }

        let productData=JSON.parse(req.body.productData)
        const images=req.files
        
        // Upload images to cloudinary
        let imagesUrl= await Promise.all(
            images.map(async (item)=>{
                let result =await cloudinary.uploader.upload(item.path,
                    {resource_type: 'image'});
                    return result.secure_url
            })
        )
        
        // Create product with uploaded images
        await Product.create({
            ...productData,
            image:imagesUrl
        })

        return res.json({success:true,message:"Product Added"})
    } catch (error) {
        console.error('Add Product Error:', error);
        return res.status(500).json({success:false,message:error.message})
    }
}

export const productList=async(req,res)=>{
    try {
        const products=await Product.find({})
        return res.json({success:true,products})
    } catch (error) {
        console.error('Product List Error:', error);
        return res.status(500).json({success:false,message:error.message})
    }
}

export const productById=async(req,res)=>{
    try {
        const {id}=req.body
        const product =await Product.findById(id)
        return res.json({success:true,product})
    } catch (error) {
        console.error('Product By ID Error:', error);
        return res.status(500).json({success:false,message:error.message})
    }
}

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        return res.json({ success: true, message: "Stock Updated" });
    } catch (error) {
        console.error('Change Stock Error:', error);
        return res.status(500).json({success:false,message:error.message})
    }
}