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

// CREATE
const createItem = async (item) => {
    try {
      const newItem = await db.one(
        "INSERT INTO items (name, expiration_date, amount_paid, fridge_id, user_id, category) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [
          item.name,
          item.expiration_date,
          item.amount_paid,
          item.fridge_id,
          item.user_id,
          item.category
        ]
      );
      return newItem;
    } catch (error) {
      return error;
    }
  };

// DELETE
const deleteItem = async (itemId) => {
    try {
      const deletedItem = await db.one(
        "DELETE FROM items WHERE id = $1 RETURNING *",
        itemId
      );
      return deletedItem;
    } catch (error) {
      return error;
    }
  };

// UPDATE
const updateItem = async (item) => {
    try {
      const updatedItem = await db.one(
        "UPDATE items SET name=$1, expiration_date=$2, amount_paid=$3, fridge_id=$4, user_id=$5, category=$6 WHERE id=$7 RETURNING *",
        [
          item.name,
          item.expiration_date,
          item.amount_paid,
          item.fridge_id,
          item.user_id,
          item.category,
          item.item_id
        ]
      );
      return updatedItem;
    } catch (error) {
      return error;
    }
  };
  
  // CATEGORIES & ITEMS
  const getCategoriesWithItems = async (fridge_id, user_id) => {
    try {
      const categoriesWithItems = await db.any(
        "SELECT items.*, categories.id AS category_id, categories.name AS category_name FROM items LEFT JOIN categories ON items.category_id = categories.id WHERE items.fridge_id = $2 AND items.user_id = $1",
        [fridge_id, user_id]
      )
      return categoriesWithItems
    } catch (error) {
      return error
    }
  }


  module.exports = {
    getAllItems,
    getOneItem, 
    createItem,
    deleteItem,
    updateItem,
    getCategoriesWithItems
  };
  