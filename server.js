const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/ProductModel')
const productController = require('./controllers/productController')
const userController = require('./controllers/UserController')
const variationController = require('./controllers/variationsController')
const mailsend = require('./controllers/Mailer')
const app = express()

app.use(express.json())


//mail api
app.get('/sendMail', mailsend.sendMail)

//user Api
app.post('/user', userController.createUser)
app.get('/user/:id', userController.getUsersbyId)
app.post('/userlogin', userController.Login);
app.post('/profile', userController.varifToken, userController.profile);

//using prodct controllers API
app.get('/probyController', productController.getAllProducts)
app.post('/imageupload', productController.upload, productController.imageupload)
app.post('/videoUpload', productController.uploadVideo, productController.imageupload)
app.post('/multipleImage', productController.multipleImages, productController.handleImageUpload)

app.get('/authApi', productController.authenticate, productController.getAllProducts)

app.post('/productWithVar', productController.createProductwithVariation)

app.get('/productWithVariation/:Id', productController.getProductwithVariations)

//route
app.get('/', (req, res) => {
    res.send('Hello Node API')
})

// variations api
app.post('/variations', variationController.createVariation);
app.post('/variationArray', variationController.variationInArray);

app.get('/blog', (req, res) => {
    res.send('Hello Muzammil Qureshi , My Name is Muzammil')
})

app.get('/product', async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})


app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({ status: 200, data: product })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//api for update 
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(400).json({ message: `cannot find id : ${id}` })
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json({ status: 200, msg: 'update success', data: updatedProduct })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(400).json({ message: `cannot find id : ${id}` })
        }
        res.status(200).json({ status: 200, msg: 'Delete success', data: product })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

mongoose.set("strictQuery", false)
mongoose.
    connect('mongodb+srv://admin:Admin123456@devtaminapi.huvghpd.mongodb.net/Node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to My MongoDB');
        app.listen(3000, () => {
            console.log(`Node API app is running on port 3000`);
        })
    }).catch((error) => {
        console.log('big error', error);
    })