const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const { verifyJWT, createAndSendJWT } = require("../utils/jwt");

const signUp = catchAsync(async (req, res, next) => {
  const user = await User.create({
    email: req.body.email,
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  });

  if (!user) {
    return next(
      new AppError("Please enter all the necessary information.", 400)
    );
  }
  createAndSendJWT(user, res, 201);
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //Check for email and password
  if (!email || !password)
    return next(new AppError("Please enter both email and password", 400));

  //Find the email
  const user = await User.findOne({ email }).select(
    "-socialLinks -accountInfo -bio -blogs -googleAuth -role -__v"
  );

  //Verify password and email
  if (!user || !(await user.checkPassword(req.body.password, user.password))) {
    return next(new AppError("Incorrect email or password.", 400));
  }
  createAndSendJWT(user, res, 200);
});

//To check if user is logged in for react pages.
const isLoggedIn = catchAsync(async (req, res, next) => {
  //Check if we created a bearer token
  if (req.cookies.jwt) {
    token = req.cookies.jwt;

    //Verify the token
    const user = verifyJWT(req.cookies.jwt).payload;

    //Find the user from the users model
    const currentUser = await User.findById(user.id);
    if (!currentUser) {
      return next();
    }

    //There is a logged in user
    res.locals.user = currentUser;
    return next();
  }
  next();
});

const protectAccess = catchAsync(async (req, res, next) => {
  let token = "";

  //Check if we created a bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError("Please login!", 401));
  }

  //Verify the JWT
  const user = verifyJWT(token).payload;

  //Find the user from the users model
  const currentUser = await User.findById(user.id);
  if (!currentUser) {
    return next(new AppError("The user does not exist.", 401));
  }

  //Add the user to req
  req.user = currentUser;
  next();
});

const verifyRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Access failed for this URL!!", 400));
    next();
  };

module.exports = { signUp, logIn, protectAccess, verifyRoles, isLoggedIn };
