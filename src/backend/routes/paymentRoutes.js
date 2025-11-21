const express = require("express");
const {
  Payment,
  sendStripeApiKey,
} = require("../controllers/paymentController.js");
const { isAuthenticatedUser } = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, Payment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
