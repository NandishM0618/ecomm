const {
  createOrder,
  getSingleOrder,
  getAllOrder,
  getAllOrderByAdmin,
  deleteOrder,
  updateAdminOrder,
} = require("../controllers/orderController.js");
const express = require("express");
const {
  isAuthenticatedUser,
  authorizedRole,
} = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getAllOrder);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllOrderByAdmin);
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), updateAdminOrder);

module.exports = router;
