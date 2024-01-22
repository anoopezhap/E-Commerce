const Product = require("./../models/productmodel");
const User = require("./../models/usermodel");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    res.status(400).json({ type: "Something happend" });
  }
};

exports.checkout = async (req, res) => {
  const { customerID, cartItems } = req.body;

  //console.log(req.body);

  // console.log("customerID", customerID);
  // console.log("cartItems", cartItems);

  //cartItems = {id1:5,id2:50,id6:3)}

  try {
    //get the user and update the product purchsed and the available money
    // get the product list and update the stock quantity
    const user = await User.findById(customerID);

    // console.log("user", user);

    //getting the list of product ids in the cart
    const productIDs = Object.keys(cartItems);

    // console.log("productids", productIDs);

    const products = await Product.find({ _id: { $in: productIDs } });

    // console.log("products", products);

    if (!user) {
      console.log("No User");
      return res.status(400).json({ type: "The user is not found" });
    }

    if (products.length !== productIDs.length) {
      console.log("no product found");
      return res.status(400).json({ type: "No Product found" });
    }

    let totalPrice = 0;

    for (let id in cartItems) {
      const product = products.find((product) => String(product._id) === id);

      if (!product) {
        return res.status(400).json({ type: "No product found" });
      }

      if (product.stockQuantity < cartItems[id]) {
        return res.status(400).json({ type: "product out of stock" });
      }

      totalPrice = totalPrice + product.price * cartItems[id];
    }

    if (user.availableMoney < totalPrice) {
      return res
        .status(400)
        .json({ type: "There is not enough money for finish the purchase" });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productIDs);

    await user.save();
    await Product.updateMany(
      { _id: { $in: productIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    return res.json({ purchasedItems: user.purchasedItems });
  } catch (err) {
    console.log("error", err);
    res.status(400).json(err);
  }
};

exports.purchasedItems = async (req, res) => {
  const { customerID } = req.params;

  try {
    const user = await User.findById(customerID);

    if (!user) {
      res.status(400).json({ type: "Please login to continue" });
    }

    const products = await Product.find({ _id: { $in: user.purchasedItems } });

    res.json({ products });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};
