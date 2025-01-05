const mongoose = require('mongoose');

const cartSchema = mongoose.Schema(
    {
        product_id:{
            type:Number,
            require:true,
        },
        customer_id:{
            type:Number,
            require:true,
        },
        variation_id:{
            type:Number,
            require:true,
        },
        item_qty:{
            type:Number,
            require:true,
        },
        item_price:{
            type:Number,
            require:true,
        },
        total_price : {
            type:Number,
            require:true,
        }
    }
)


const Cart = mongoose.model('Cart' , cartSchema);

module.exports = Cart;