const mongoose = require('mongoose');

const productVariation = mongoose.Schema(
    {
        variation_label: {
            type: String
        },
        variation_mrp: {
            type: String
        },
        product_id: {
            type: String
        },
        lenght: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Variation = mongoose.model('Variation', productVariation);

module.exports = Variation;