const Variation = require('../models/productVariation')


const createVariation = async (req, res) => {
    const varData = await Variation.create(req.body);
    if (varData) {
        res.json({ status: 'success', data: varData })
    } else {
        res.json({ status: 'error', data: "Not created" })
    }
}

const variationInArray = async (req, res) => {

    try {
        const variationsData = req.body.variations;
        // Store each variation in the database
        for (const variation of variationsData) {
            const newVariation = new Variation({
                variation_label: variation.label,
                variation_mrp: variation.mrp,
                lenght: variation.length,
                product_id: variation.p_id
            });
            await newVariation.save();
        }

        res.status(201).json({ message: 'Variations stored successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    createVariation,
    variationInArray
}