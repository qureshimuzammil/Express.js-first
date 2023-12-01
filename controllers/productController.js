
const Product = require('../models/ProductModel')
const Variation = require('../models/productVariation')


let products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    // Add more sample products here
];

const getAllProducts = async (req, res) => {
    // res.send("First Controller")
    const product = await Product.find();
    res.json({ data: product });
};


const createProductwithVariation = async (req, res) => {
    const product = await Product.create(req.body);
    const id = product._id;

    const variationsData = req.body.variations;
    // Store each variation in the database
    for (const variation of variationsData) {
        const newVariation = new Variation({
            variation_label: variation.label,
            variation_mrp: variation.mrp,
            lenght: variation.length,
            product_id: id
        });
        await newVariation.save();
    }
    res.json({ status: 200, newid: id, product: product, variation: variationsData })
}


const getProductwithVariations = async (req, res) => {

    try {
        const { Id } = req.params;
        const product = await Product.findById(Id);

        if (product) {

            const varData = await Variation.find({ product_id: Id });                          

            res.status(201).json({ status: 'success', data: product, varData: varData });
        } else {
            res.status(404).json({ status: 'not found' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}





module.exports = {
    getAllProducts,
    // getProductById,
    createProductwithVariation,
    getProductwithVariations
};