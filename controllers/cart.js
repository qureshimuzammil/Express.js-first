const Cart = require('../models/Cart');


const addCart = async(req,res)=>{
    try{
        // const {product_id , customer_id , variation_id , item_qty , item_price , total_price} = req.body;
        const cart = await Cart.create(req.body);
        res.json({ status: 200, cart:cart });
    }catch(error){
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}

const getCart = async(req , res)=>{
    const cartData = await Cart.find();
    res.json({ data: cartData });
}

module.exports = {
    addCart,
    getCart
}