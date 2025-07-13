import { Store } from "../models/store.model.js";
import { Rating } from "../models/rating.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createStore = asyncHandler(async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();

    return res
      .status(200)
      .json(new ApiResponse(200, { store }, "Store Created successfully"));
  } catch (error) {
    console.log("Create Store failed:", error);
    throw new ApiError(500, "Create Store failed");
  }
});

const getAllStores = asyncHandler(async (req, res) => {
  try {
    const { name, address } = req.query;
    const query = {};
    if (name) query.name = new RegExp(name, "i");
    if (address) query.address = new RegExp(address, "i");

    const stores = await Store.find(query);
    res.json(stores);
    return res
      .status(200)
      .json(new ApiResponse(200, { stores }, "Get Store successfully"));
  } catch (error) {
    console.log("Get Store failed:", error);
    throw new ApiError(500, "Get Store failed");
  }
});

const getStoreRatings = asyncHandler(async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { rating: store.ratings },
          "Get Store  successfully"
        )
      );
  } catch (error) {
    console.log("Get Store rating failed:", error);
    throw new ApiError(500, "Get Store rating failed");
  }
});

const getAverageRating = asyncHandler(async (req, res) => {
  try {
    const ratings = await Rating.find({ store: req.params.id });
    const avg = ratings.reduce((a, r) => a + r.score, 0) / ratings.length;

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { average: avg || 0 },
          "Get average rating successfully"
        )
      );
  } catch (error) {
    console.log("Get average rating failed:", error);
    throw new ApiError(500, "Get average rating failed");
  }
});

export { getAverageRating, createStore, getStoreRatings, getAllStores };
