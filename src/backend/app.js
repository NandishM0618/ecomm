const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const ErrorHandler = require("./middlewares/errorMiddleware");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
    dotenv.config({
        path: path.resolve(__dirname, "config/.env"),
    });
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// Routes
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v2", product);
app.use("/api/v2", user);
app.use("/api/v2", order);
app.use("/api/v2", payment);

// Serve static files in production
// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }

// Error Handling Middleware
app.use(ErrorHandler);

module.exports = app;
