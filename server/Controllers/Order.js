const Order = require("../Models/Order");
const nodemailer = require("nodemailer");

exports.createOrder = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      city,
      state,
      zip,
      products,
      totalPrice,
    } = req.body;

    const order = new Order({
      firstname,
      lastname,
      email,
      city,
      state,
      zip,
      products,
      totalPrice,
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the order" });
  }
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
};

exports.confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId).populate("products.productId");

    if (!order) {
      return res.status(404).json("Order not found");
    }

    order.status = "Approved";
    await order.save();
    const emailBody = `
    <html>
      <head>
        <style>
         
        </style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      </head>
      <body>
        <h1>Your order has been approved</h1>
        <div>
          ${order.products
            .map(
              (product, idx) => `
          <div class="card rounded-3 mb-4" key="${idx}">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">${product.productId.name}</p>
               
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
  
                <input
                  id="form1"
                  name="quantity"
                  value="${product.quantity}"
                  type="number"
                  class="form-control form-control-sm"
                />
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">${product.total}</h5>
              </div>
            </div>
          </div>
        </div>
          `
            )
            .join("")}
        </div>
      </body>
    </html>
  `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.SENDR_EMAIL}`,
        pass: `${process.env.SENDR_PASS}`,
      },
    });

    const mailOptions = {
      from: `${process.env.SENDR_EMAIL}`,
      to: order.email,
      subject: "Order Confirmation",
      html: emailBody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json("Failed to send email");
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json(order);
      }
    });
  } catch (error) {
    res.status(501).json(error.message);
  }
};

exports.rejectOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json("Order not found");
    }
    order.status = "Rejected";
    await order.save();
    return res.status(200).json(order);
  } catch (error) {
    res.status(501).json(error.message);
  }
};
