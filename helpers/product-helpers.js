const collection = require("../config/collection");
const { PRODUCT_COLLECTION } = require("../config/collection");
const db = require("../config/connection");
const objectId = require("mongodb").ObjectId;

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("products")
      .insertOne(product)
      .then((data) => {
        callback(data.insertedId);
      });
  },
  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await 
      db.get()
        .collection(PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },

  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(PRODUCT_COLLECTION)
        .deleteOne({ _id: objectId(productId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  getProductDetails: (prodID) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: objectId(prodID) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  updateProduct: (prodDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: objectId(prodDetails.id) },
          {
            $set:{
              Name: prodDetails.Name,
              description: prodDetails.description,
              price: prodDetails.price,
            }
          }
        )
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
