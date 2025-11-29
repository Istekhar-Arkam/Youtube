import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export { registerUser };
