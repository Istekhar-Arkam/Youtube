import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "Channel not found");
  }
  const channel = await User.aggregate([
    {
      $match: {
        _id: req.user._id,
      },
    },

    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $addFields: {
        totalSubscribers: {
          $size: "$subscribers",
        },
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videos",
      },
    },
    {
      $addFields: {
        totalVideos: {
          $size: "$videos",
        },
        totalViews: {
          $sum: {
            $map: {
              input: "$videos",
              as: "video",
              in: "$$video.views",
            },
          },
        },
        totalLikes: {
          $sum: {
            $map: {
              input: "$videos",
              as: "video",
              in: "$$video.likes",
            },
          },
        },
      },
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        avatar: 1,
        totalSubscribers: 1,
        totalVideos: 1,
        totalViews: 1,
        totalLikes: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new ApiError(404, "No details fetched");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "Channel profile fetched successfully")
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "Channel not found");
  }
  const videos = await Video.aggregate([
    {
      $match: {
        owner: req.user._id,
        isPublished: true,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        videoFile: 1,
        thumbnail: 1,
        title: 1,
        description: 1,
        duration: 1,
        views: 1,
      },
    },
  ]);
  if (!videos.length) {
    throw new ApiError(404, "Videos not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "All videos fetched for this channel"));
});

export { getChannelStats, getChannelVideos };
