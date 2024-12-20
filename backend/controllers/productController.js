import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// function for add product
const addProduct = async (req, res) => {
    try {
        const {
            name, description,
            price, category,
            subCategory, sizes,
            bestseller
        } = req.body

        if (!name || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "Name, price, and category are required fields"
            });
        }

        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter(item => item);

        if (!images.length) {
            return res.status(400).json({
                success: false,
                message: "At least one product image is required"
            });
        }

        try {
            const imagesUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                        quality: 'auto',
                        folder: 'products'
                    });
                    return result.secure_url;
                })
            );

            // 4. Create product data object
            const productData = {
                name: name.trim(),
                description: description?.trim(),
                category: category.trim(),
                price: Number(price),
                subCategory: subCategory?.trim(),
                bestseller: bestseller === "true",
                sizes: sizes ? JSON.parse(sizes) : [],
                image: imagesUrl,
                date: Date.now()
            };

            if (isNaN(productData.price) || productData.price <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Price must be a positive number"
                });
            }

            const product = new productModel(productData);
            await product.save();

            return res.status(201).json({
                success: true,
                message: "Product added successfully",
                productId: product._id
            });

        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.status(500).json({
                success: false,
                message: "Error uploading images"
            });
        }

    } catch (error) {
        console.error('Add product error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error adding product"
        });
    }
};

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({
            success:true,
            products
        })
    } catch (error) {
        console.error('List product error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error listing product"
        });
    }
}

// function for removeing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message: "Product Removed"
        })
    } catch (error) {
        console.error('Delete product error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error listing product"
        });
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId)
        res.json({
            success: true,
            product
        })
    } catch (error) {
        console.error('Get product error:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error get product"
        });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct }