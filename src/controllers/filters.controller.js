import { Store } from "../models/store.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const filterUsers = asyncHandler(async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const filter = {};

    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");
    if (address) filter.address = new RegExp(address, "i");
    if (role) filter.role = role;

    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter users", error });
  }
});

const filterStores = asyncHandler(async (req, res) => {
  try {
    const { name, email, address } = req.query;

    const filter = {};

    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");
    if (address) filter.address = new RegExp(address, "i");

    const stores = await Store.find(filter);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Failed to filter stores", error });
  }
});

const searchStores = asyncHandler(async (req, res) => {
  try {
    const { name, address } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (address) filter.address = new RegExp(address, "i");

    const stores = await Store.find(filter);
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error searching stores", error });
  }
});

export { searchStores, filterStores, filterUsers };
