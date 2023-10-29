const db = require("../config/connection");
const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const { ObjectId } = require("mongodb");

module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data);
        });
    });
  },

  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let userCheck = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });

      if (userCheck) {
        bcrypt.compare(userData.password, userCheck.password).then((status) => {
          if (status) {
            console.log("password success");
            response.status = true;
            response.user = userCheck;
            resolve(response);
          } else {
            console.log("password not match");
            resolve({ status: false, logginErr: "Invalid Password" });
          }
        });
      } else {
        console.log("login failed");
        resolve({ status: false, logginErr: "Invalid Email" });
      }
    });
  },

  getUserDetails: () => {
    return new Promise(async (resolve, reject) => {
      let allUsers = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray();
      resolve(allUsers);
    });
  },

  deleteUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: ObjectId(userId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  editUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(userId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  updateUser: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: ObjectId(data.id) },
          {
            $set: {
              Name: data.Name,
              email: data.email,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },

  addUser: (NewUserData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(NewUserData)
        .then((response) => {
          resolve();
        });
    });
  },
};
