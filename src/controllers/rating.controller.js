import { Store } from "../models/store.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const submitRating = asyncHandler(async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    const store = await Store.findById(storeId);
    const existing = store.ratings.find((r) => r.userId === userId);

    if (existing) {
      existing.rating = rating;
    } else {
      store.ratings.push({ userId, rating });
    }

    await store.save();

    return res.status(200).json(new ApiResponse(200, "Rating submitted"));
  } catch (error) {
    console.log("Error User Rating Submit failed:", error);
    throw new ApiError(500, "Error User Rating Submit failed");
  }
});

const getUserRating = asyncHandler(async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await Store.findById(storeId);
    const rating = store.ratings.find((r) => r.userId === req.user.id);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { rating: rating ? rating.rating : null },
          "Get User Rating Successfully"
        )
      );
  } catch (error) {
    console.log("Get User Rating failed:", error);
    throw new ApiError(500, "Get User Rating failed");
  }
});

const updateRating = asyncHandler(async (req, res) => {
  try {
    const { score } = req.body;
    const rating = await Rating.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { score },
      { new: true }
    );
    res.json(rating);
    return res
      .status(200)
      .json(new ApiResponse(200, { rating }, "Updated Rating Successfully"));
  } catch (error) {
    console.log("Updating User Rating failed:", error);
    throw new ApiError(500, "Updating User Rating failed");
  }
});

export { submitRating, getUserRating, updateRating };
