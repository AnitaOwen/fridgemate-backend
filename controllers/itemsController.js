const express = require("express");

const {
    getAllItems,
    getOneItem,
    createItem,
    deleteItem,
    updateItem,
    getCategoriesWithItems
  } = require("../queries/items.js");

const { getOneFridge } = require("../queries/fridges.js");

const items = express.Router({ mergeParams: true });


// INDEX http://localhost:3003/api/fridges/1/2/items
items.get("/", async (req, res) => {
    const { user_id, fridge_id  } = req.params;
  
    const items = await getAllItems(fridge_id);
  
    const fridge = await getOneFridge(fridge_id, user_id);
  
    if (fridge.id) {
      res.status(200).json({ ...fridge, items });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  });

  // items.get("/categories", async (req, res) => {
  //   const { user_id, fridge_id } = req.params
  //   const categoriesWithItems = await getCategoriesWithItems(fridge_id, user_id)
  // })

// SHOW http://localhost:3003/api/fridges/1/2/items/13
items.get("/:item_id", async (req, res) => {
    const { user_id, fridge_id, item_id } = req.params;
  
    const item = await getOneItem(item_id);
  
    const fridge = await getOneFridge(fridge_id, user_id);
  
    if (item && item.fridge_id === fridge.id) {
      res.status(200).json({ ...fridge, item });
    } else {
      res.status(500).json({ error: "Item not found" });
    }
  });

// CREATE http://localhost:3003/api/fridges/1/2/items
items.post("/", async (req, res) => {
    const { fridge_id } = req.params;
    const newItem = await createItem({ ...req.body, fridge_id });
  
    if (newItem.id) {
      res.status(200).json(newItem);
    } else {
      res.status(500).json({ error: "Failed to create new item." });
    }
  });

// DELETE http://localhost:3003/api/fridges/1/2/items/13
items.delete("/:item_id", async (req, res) => {
    const { item_id } = req.params;

    const deletedItem = await deleteItem(item_id);
  
    if (deletedItem.id) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });

// UPDATE http://localhost:3003/api/fridges/1/2/items/13
items.put("/:item_id", async (req, res) => {
    const { user_id, fridge_id, item_id } = req.params;
    const updatedItem = await updateItem({
      ...req.body,
      user_id,
      fridge_id,
      item_id
    });
    if (updatedItem.id) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  });

  module.exports = items;