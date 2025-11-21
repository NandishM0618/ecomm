const userModel = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendToken = require("../utils/generateToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//register user

exports.createUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password || !avatar) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  // Upload avatar to Cloudinary
  let myCloud;
  try {
    myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  } catch (error) {
    console.error("Cloudinary Upload Error: ", error);
  }

  if (!myCloud || !myCloud.public_id || !myCloud.secure_url) {
    console.error("Cloudinary Response Error: ", myCloud); // Log the Cloudinary response
    return next(new ErrorHandler("Invalid Cloudinary response", 500));
  }

  // Create user
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Send token
  sendToken(user, 201, res);
});

//login user

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter your valid email and password", 400)
    );
  }
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("User is not found with the email and password", 401)
    );
  }
  const idPasswordMatched = await user.comparePassword(password);
  if (!idPasswordMatched) {
    return next(
      new ErrorHandler("User is not found with the email and password", 401)
    );
  }
  sendToken(user, 200, res);
});

//log out user

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

//  Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get ResetPassword Token

  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Sucikathan Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // create token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("reset password url is invalid or has been expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password is not match with the new password", 400)
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// get users profile details

exports.userDetails = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//update user password

exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  const idPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!idPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password not matched each other", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

///update user profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.body.avatar && req.body.avatar !== "") {
      const user = await userModel.findById(req.user.id);
      if (user.avatar && user.avatar.public_id) {
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
      }

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error updating profile: ", error); // Log the error to the console
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

//Get all users.../Admin

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// get single users details  ---- admin

exports.getSingleUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User is not found with this Id", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// change your role ----admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  // we add cloud id later for avatar
  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// delete user  --- admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  if (!user) {
    return next(new ErrorHandler("User is not found with this Id", 400));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
