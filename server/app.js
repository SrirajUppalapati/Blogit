const express = require("express");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const { json } = require("body-parser");
const usersRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const ErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const blogRouter = require("./routes/blogRoute");
const searchRouter = require("./routes/searchRoute");
const commentRouter = require("./routes/commentRoute");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Global Middlewares
//Security for the HTTP headers
app.use(helmet());

//Log the http request
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Limit the number of requests from a same IP.
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many requests from one ip, please try again in 1 hour.",
});

app.use("/api/v1/users", limiter);

//Reading the data from body to request.body.
app.use(express.json());

app.use(cookieParser());

//Cleaning the request.body data - Data sanitization aganinst NOsql injection
app.use(mongoSanitize());

//Cleaning the request.body data - Data sanitization against HTML scripting
app.use(xss());

//Prevent multiples of a same parameter in a query
// app.use(hpp());

app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
});

// Route handlers
app.use("/api/v1/users", usersRouter);

app.use("/api/v1/blog", blogRouter);

app.use("/api/v1/search", searchRouter);

app.use("/api/v1/comment", commentRouter);
//Route error handler
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

// Global error handler
app.use(ErrorHandler);

module.exports = app;
