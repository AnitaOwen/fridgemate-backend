const express = require("express");

const fridges = express.Router();
const { getAllFridgesByUserId, getOneFridge } = require("../queries/fridges")

//INDEX
fridges.get('/:user_id', async (req,res) => {
    // http://localhost:3003/api/fridges/1
    const { user_id } = req.params
    if(!user_id) res.status(400).json({ error: "User ID is required." })
    const allFridges = await getAllFridgesByUserId(user_id);

    if(allFridges[0]){
        res.status(200).json(allFridges);
    } else {
        res.status(500).json({ error: "User not found."})
    }
});

//SHOW
fridges.get('/:user_id/:fridge_id', async (req, res) => {
    const { user_id, fridge_id } = req.params

    const oneFridge = await getOneFridge(fridge_id, user_id)
    if(oneFridge) {
        res.status(200).json(oneFridge)
    } else {
        res.status(418).json({ error: 'Fridge not found'})
    }

})


module.exports = fridges