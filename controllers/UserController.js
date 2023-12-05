const auth = require('basic-auth');
const User = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKe = 'secretKey'; //



const createUser = async (req, res) => {

    try {
        const { password, ...otherUserData } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const user = await User.create({ ...otherUserData, password: hashedPassword });
        // const user = await User.create(req.body) 
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

const getUsersbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const users = await User.findById(id);
        res.status(200).json({ status: 200, data: users });
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}



const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            // Successful login
            jwt.sign({ user }, secretKe, { expiresIn: "300s" }, (err, token) => {
                res.json({ message: 'Login successful', user, token });
            })
        } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle any potential errors
        res.status(500).json({ message: 'An error occurred' });
    }
}



const profile = async (req, res) => {
    jwt.verify(req.token, secretKe, (err, authData) => {
        if (err) {
            res.json({ reslt: "Invalid Token" })
        } else {
            res.json({ message: " Sccessed token", authData: authData })
        }
    })
}


const varifToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.json({ reslt: 'Token is required' })
    }
}

module.exports = {
    createUser,
    getUsersbyId,
    Login,
    profile,
    varifToken
}