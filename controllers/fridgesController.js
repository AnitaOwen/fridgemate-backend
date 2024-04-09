const express = require("express");

const fridges = express.Router();
const { getAllFridgesByUserId } = require("../queries/fridges")

fridges.get('/', async (req,res) => {
    // http://localhost:3003/api/fridges?user=1
    const  userId  = req.query.user
    if(!userId) res.status(400).json({ error: "User ID is required." })
    const allFridges = await getAllFridgesByUserId(userId);

    if(allFridges[0]){
        res.status(200).json(allFridges);
    } else {
        res.status(500).json({ error: "User not found."})
    }
});

module.exports = fridges