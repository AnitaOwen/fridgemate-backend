const express = require("express");

const {
    getAllItems,
    getOneItem,
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

// SHOW http://localhost:3003/api/fridges/1/2/items/13
items.get("/:item_id", async (req, res) => {
    const { user_id, fridge_id, item_id } = req.params;
  
    const item = await getOneItem(item_id);
  
    const fridge = await getOneFridge(fridge_id, user_id);
  
    if (item.fridge_id === fridge.id && item) {
      res.status(200).json({ ...fridge, item });
    } else {
      res.status(500).json({ error: "Item not found" });
    }
  });
  

  module.exports = items;