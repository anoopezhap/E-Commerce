const express = require("express");
const productController = require("../controllers/productController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.get("/", userController.verifyToken, productController.getAllProducts);

router.get("/checkout", userController.verifyToken);
module.exports = router;
