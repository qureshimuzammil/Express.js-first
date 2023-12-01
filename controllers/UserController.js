const User = require('../models/User');
const crypto = require('crypto');



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



module.exports = {
    createUser,
    getUsersbyId
}