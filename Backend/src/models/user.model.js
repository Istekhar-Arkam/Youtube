import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"; //
import bcrypt from "bcrypt"; // Help you to hashed your password

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Encryption → means to convert normal language into a machine code. 

// Use Bcrypt → When you just need to verify input against stored data (like passwords).

// you cannot just directly do encrypt you need to use mongoose hooks

//line : 60 ,before saving data Encrypt password with the help of pre hook

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // This if line is for only change my password when user change not in every changes like profile photo or any other update
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//custom method
// Bcrypt library is used to hash your password and also check your password

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT is a bearer token (whoever give the token, i will share the data)

// Access Token = 1. its a short lived.
// 2."Entry pass" to access protected resources.
// Refresh Token = 1. its a long lived.
// 2 . "Pass renewal card" that lets you obtain a new entry pass without logging in again.

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);

// Access token : if you have access token you can login and access the data but it is short lived ,if the login session is expired for security reason,here comes the refresh token,who is stored in the database and also in the cookie,if the access token is expired then you can use refresh token to get new access token without login again.