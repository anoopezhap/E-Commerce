const express = require("express");
const productController = require("../controllers/productController");
const userController = require("./../controllers/userController");
const router = express.Router();

router.get("/", userController.verifyToken, productController.getAllProducts);

router.post(
  "/checkout",
  userController.verifyToken,
  productController.checkout
);

router.get(
  "/purchased-items/:customerID",
  userController.verifyToken,
  productController.purchasedItems
);

module.exports = router;
