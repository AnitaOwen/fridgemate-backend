const express = require("express");

const fridges = express.Router();
const itemsController = require('./itemsController.js')

const { 
    getAllFridgesByUserId, 
    getOneFridge, 
    createFridge, 
    deleteFridge,
    updateFridge
} = require("../queries/fridges")

fridges.use("/:user_id/:fridge_id/items", itemsController)

//INDEX http://localhost:3003/api/fridges/1
fridges.get('/:user_id', async (req,res) => {
    const { user_id } = req.params
    if(!user_id) res.status(400).json({ error: "User ID is required." })
    const allFridges = await getAllFridgesByUserId(user_id);

    if(allFridges[0]){
        res.status(200).json(allFridges);
    } else {
        res.status(500).json({ error: "User not found."})
    }
});

//SHOW http://localhost:3003/api/fridges/1/2
fridges.get('/:user_id/:fridge_id', async (req, res) => {
    const { user_id, fridge_id } = req.params

    const oneFridge = await getOneFridge(fridge_id, user_id)
    if(oneFridge) {
        res.status(200).json(oneFridge)
    } else {
        res.status(418).json({ error: 'Fridge not found'})
    }

})

// CREATE http://localhost:3003/api/fridges/1
fridges.post("/:user_id",  async (req, res) => {
    const { user_id } = req.params;
    // console.log(req.body, user_id)
    const newFridge = await createFridge({ ...req.body, user_id });
  
    if (newFridge.id) {
      res.status(200).json(newFridge);
    } else {
      res.status(500).json({ error: "Failed to add new fridge." });
    }
  });

//  DELETE http://localhost:3003/api/fridges/1/2
fridges.delete("/user_id/:fridge_id", async (req, res) => {
    const { user_id, fridge_id } = req.params;
  
    const deletedFridge = await deleteFridge(fridge_id, user_id);
  
    if (deletedFridge) {
      res.status(200).json(deletedFridge);
    } else {
      res.status(404).json({ error: "Fridge not found" });
    }
  });

// UPDATE http://localhost:3003/api/fridges/1/2
fridges.put("/user_id/:fridge_id", async (req, res) => {
    const { user_id, fridge_id } = req.params;
    const updatedFridge = await updateFridge({
      fridge_id,
      ...req.body,
      user_id,
    });
    if (updatedFridge.id) {
      res.status(200).json(updatedFridge);
    } else {
      res.status(404).json({ error: "Fridge not found" });
    }
  });

module.exports = fridges