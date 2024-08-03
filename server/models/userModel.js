const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "You should enter a fullname."],
      minlength: [3, "fullname must be 3 letters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "You should enter a email."],
      lowercase: true,
      unique: true,
      validate: [
        validator.isEmail,
        "The entered data should be in email format.",
      ],
    },
    password: {
      type: String,
      required: [true, "You should enter a password."],
      minlength: [8, "Password must be 8 letters long"],
    },
    username: {
      type: String,
      unique: true,
      minlength: [3, "Username must be 3 letters long"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, "Title should be alphanumeric."],
    },
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
      trim: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    socialLinks: {
      youtube: {
        type: String,
        default: "",
        trim: true,
      },
      twitter: {
        type: String,
        default: "",
        trim: true,
      },
      github: {
        type: String,
        default: "",
        trim: true,
      },
      website: {
        type: String,
        default: "",
        trim: true,
      },
    },
    accountInfo: {
      totalPosts: {
        type: Number,
        default: 0,
      },
      totalReads: {
        type: Number,
        default: 0,
      },
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "blogs",
      default: [],
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Hash the password as soon as the user changes it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 15);
    next();
  } catch (error) {
    next(error);
  }
});

//Check the login apssword with hashed password
userSchema.methods.checkPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
