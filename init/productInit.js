const Product = require("../models/Product")
const mongoose = require("mongoose")

const uri = "mongodb+srv://sameh:sam123@cluster0.k9k3q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri,{useNewUrlParser : true},(err)=>{
    console.log(err ? err : "connecing to DB ...")
  })

const products = [
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 1",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 2",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 3",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 4",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 5",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
    new Product({
        imgPath: "/images/121693879_1038979166527315_2252605537107564935_n.jpg",
        productName: "product 6",
        information: {
            storageCapacity: 64,
            numberOfSim: "Dual SIM",
            cameraResolution: 16,
            displaySize: 6.5
        },
        price: 220
    }),
]

for (let i = 0; i < products.length; i++) {
    console.log(i)
    products[i].save((err, doc) => {
        console.log(err ? err : doc)
    })
}
