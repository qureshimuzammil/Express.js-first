
const Product = require('../models/ProductModel')
const Variation = require('../models/productVariation')
const User = require('../models/User')
const basicAuth = require('basic-auth');
const multer = require('multer');



const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.filename + "-" + Date.now() + ".jpg")
        }
    })
}).single("image");


const uploadVideo = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/videos")
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
}).single('video')  // it is param 


const multipleImages = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/images")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).array('images')


function handleImageUpload(req, res, next) {
    multipleImages(req, res, function (err) {
        // if (err instanceof multer.MulterError) {
        //     return res.status(500).json({ message: err.message });
        // } else if (err) {
        //     return res.status(500).json({ message: err.message });
        // }

        // Extract paths of uploaded images from req.files and pass them to imageUpload function
        const imagePaths = req.files.map(file => file.path);
        // imageUpload(imagePaths); // Call your imageUpload function here with imagePaths

        res.status(200).json({ message: 'Images uploaded successfully' , path : imagePaths });
    });
}


const imageupload = (req, res) => {
    if (req.file) {
        // Get the file path
        const imagePath = req.file.path;

        // Print the image path
        // console.log("Image path:", imagePath);

        // You can use imagePath in your response or perform other operations
        res.json({ result: "image upload", imagePath });
    } else {
        res.status(400).json({ error: "No image uploaded" });
    }
}

const authenticate = (req, res, next) => {
    const credentials = basicAuth(req);

    if (!credentials || !authenticateUser(credentials.name, credentials.pass)) {
        res.set('WWW-Authenticate', 'Basic realm="Authorization Required"');
        return res.status(401).send('Unauthorized');
    }

    return next();
};

const authenticateUser = async (username, password) => {
    // Replace this with your actual authentication logic (e.g., querying the database)
    // Example using a User model:
    const user = await User.findOne({ username });

    return user && user.password === password; // Example, check if username and password match
};

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
    authenticate,
    getAllProducts,
    // getProductById,
    createProductwithVariation,
    getProductwithVariations,
    imageupload,
    upload,
    uploadVideo,
    multipleImages,
    handleImageUpload
    
};