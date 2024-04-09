// const fridges = require("../controllers/fridgesController.js");
const db = require("../db/dbConfig.js");

// INDEX 
const getAllItems = async (fridge_id) => {
    try {
      const allItems = await db.any(
        "SELECT * FROM items WHERE fridge_id=$1",
        fridge_id
      );
      return allItems;
    } catch (error) {
      return error;
    }
  };

//SHOW
const getOneItem = async (itemId) => {
    try {
      const oneItem = await db.one(`SELECT * FROM items WHERE id=$1`, itemId);
      return oneItem;
    } catch (error) {
      return error;
    }
  };
  

  module.exports = {
    getAllItems,
    getOneItem, 
    // deleteReview,
    // updateReview,
  };
  