const express = require("express");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
const AppError = require("./utils/appError");
const ErrorHandler = require("./controllers/errorController");
const winston = require("winston");

// Routers
const usersRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const searchRouter = require("./routes/searchRoute");
const commentRouter = require("./routes/commentRoute");
const profileRouter = require("./routes/profileRoute");
const notificationRouter = require("./routes/notificationRoute");

const app = express();

// Middleware: Security for HTTP headers
app.use(helmet());

// Rate Limiter: Limit the number of requests from the same IP
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use(limiter);

// CORS: Enable Cross-Origin Resource Sharing
app.use(cors());

// Body Parser: Read data from body into req.body with size limit
app.use(express.json({ limit: "10kb" }));

// Cookie Parser: Parse cookies from the HTTP Request
app.use(cookieParser());

// Data Sanitization: Against NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: ["filter", "sort"], // Allow these parameters to have multiple values
  })
);

// Compression: Compress all responses
app.use(compression());

// Static Files: Serve static files with caching
app.use(
  express.static(path.join(__dirname, "public"), { maxAge: "1d", etag: false })
);

// Logger: Only in development mode
app.use(morgan("combined"));

// Route Handlers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/notification", notificationRouter);

// Handle Unmatched Routes
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

// Global Error Handler
app.use(ErrorHandler);

// Logging: Production error logging
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

app.use((err, req, res, next) => {
  logger.error(err.message, { metadata: err });
  next(err);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  server.close(() => {
    console.log("Process terminated.");
  });
});

module.exports = app;
