
require('dotenv').config();

const varifToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[0];
        if (token === process.env.AUTH_TOKEN) { // compare with .env token
            console.log('token:' , process.env.AUTH_TOKEN);
            req.token = token;
            
            next();
        } else {
            res.status(403).json({ result: 'Invalid token' });
        }
    } else {
        res.status(401).json({ result: 'Token is required' });
    }
};


module.exports = varifToken;