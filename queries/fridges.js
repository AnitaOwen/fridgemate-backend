const db = require("../db/dbConfig.js")

//Index
const getAllFridgesByUserId = async (userId) => {
    try {
        const allFridges = await db.any(`SELECT * FROM fridges WHERE fridges.user_id = $1`, userId);
        return allFridges
    } catch (error) {
        return error;
    }
};

//Show
const getOneFridge = async (fridgeId, userId) => {
    try {
        const oneFridge = await db.one(`SELECT fridges.* FROM fridges JOIN users ON fridges.user_id = users.id WHERE fridges.id = $1 AND users.id = $2`, [fridgeId, userId])
        return oneFridge
    } catch (error) {
        return error
    }
}

module.exports = {getAllFridgesByUserId, getOneFridge}