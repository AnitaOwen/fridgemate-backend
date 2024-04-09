const express = require("express");

const {
    getAllItems,
    // getOneReview,
    // createReview,
    // deleteReview,
    // updateReview,
    // grabUserAndReview,
  } = require("../queries/items.js");

const { getOneFridge } = require("../queries/fridges.js");

const items = express.Router({ mergeParams: true });


// INDEX http://localhost:3003/api/fridges/1/2/items
items.get("/", async (req, res) => {
    const { user_id, fridge_id  } = req.params;
  
    const allItems = await getAllItems(fridge_id);
  
    const fridge = await getOneFridge(fridge_id, user_id);
  
    if (fridge.id) {
      res.status(200).json({ ...fridge, allItems });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  });

  module.exports = items;