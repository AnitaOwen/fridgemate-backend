const db = require("../db/dbConfig.js")

// INDEX
const getAllFridgesByUserId = async (userId) => {
    try {
        const allFridges = await db.any(`SELECT * FROM fridges WHERE fridges.user_id = $1`, userId);
        return allFridges
    } catch (error) {
        return error;
    }
};

// SHOW
const getOneFridge = async (fridgeId, userId) => {
    try {
        const oneFridge = await db.one(`SELECT fridges.* FROM fridges JOIN users ON fridges.user_id = users.id WHERE fridges.id = $1 AND users.id = $2`, [fridgeId, userId])
        return oneFridge
    } catch (error) {
        return error
    }
}

// CREATE
const createFridge = async (fridge) => {
    try {
      const newFridge = await db.one(
        "INSERT INTO fridges (location, notes, user_id) VALUES($1, $2, $3) RETURNING *",
        [
          fridge.location,
          fridge.notes, 
          fridge.user_id
        ]
      );
      return newFridge;
    } catch (error) {
      return error;
    }
  };

// DELETE 
const deleteFridge = async (fridgeId, userId) => {
    try {
      const deletedFridge = await db.one(
        "DELETE FROM fridges WHERE id = $1 RETURNING *",
        fridgeId
      );
      return deletedFridge;
    } catch (error) {
      return error;
    }
  };

// UPDATE 
const updateFridge = async (fridge) => {
    try {
      const updatedFridge = await db.one(
        "UPDATE fridges SET location=$1, notes=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
        [
          fridge.location,
          fridge.notes,
          fridge.fridge_id,
          fridge.user_id
        ]
      );
      return updatedFridge;
    } catch (error) {
      return error;
    }
  };
  


module.exports = { 
    getAllFridgesByUserId, 
    getOneFridge, 
    createFridge, 
    deleteFridge, 
    updateFridge
}