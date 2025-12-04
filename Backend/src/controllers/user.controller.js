import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// here to generate token first find the user and then call the method to generate token from model
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    // this is how to send refreshToken in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // This is how the step to register user
  // Get user details from frontend
  // 1: Validation - not empty input(their should not be empty user name,should be right format of email)
  // 2: Check if user already exists : username or email
  // 3: check for image,check for avatar
  // 4: upload them to cloudinary,check avatar is uploaded or not
  // 5: create user object - create entry in db
  // 6: remove password and refresh token field from response
  // 7: check for user creation
  // 8: return response

  const { fullName, email, username, password } = req.body;
  // 1 : validation checking in each input is empty or not
  // first way

  //  if(fullName === "") {
  //   throw new ApiError(400,"Fullname is required")
  //  }

  // second way

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  // 2:  User will call in the behalf of user to mongodb
  //  i am the current user and find same user in database which is match to database user or email

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username is already existed");
  }

  // 3: Image handle : Check for image,check for avatar and here multer gives th access of file in body

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  // this code is used to check cover image is present or not uncomment if needed and comment line 47

  // let coverImageLocalPath;
  // if(req.files && Array.isArray (req.files.coverImage) && req.files.coverImage.length >0){
  //   coverImageLocalPath = req.files.coverImage[0].path;
  // }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  // 4.method to upload on cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // 5.entry in database

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // method to check whether user is made or not or an empty because what happen mongodb add an _id field in every single entry

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while Registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // 1.req body -> data
  // 2.username or email
  // 3. find user
  // 4.password check
  // 5. access and refresh  tokens
  // 6. send cookies

  // 1.req body -> data

  const { email, password, username } = req.body;

  // 2.username or email

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  // if you want any one from username or email then use below code

  // if(!username || !email){
  // throw new ApiError(400,"Username or email is required");
  // }

  // 3. find user

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // 4.password check
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Password is incorrect");
  }
  // 5. access and refresh  tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 6. send cookies

  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
