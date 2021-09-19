const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    imgPath: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    information: {
        required: true,
        type: {
            storageCapacity: Number,
            numberOfSim: String,
            cameraResolution: Number,
            displaySize: Number
        }
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product",productSchema)