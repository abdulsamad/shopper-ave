const { Order } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "No order found in DB",
        });
      }

      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  const order = new Order(req.body.order);
  req.body.order.user = req.profile;

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to save your order in DB",
      });
    }

    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          err: "No orders found in DB",
        });
      }

      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          err: "Cannot update order status",
        });
      }

      res.json(order);
    },
  );
};
