const express = require("express");

const Actions = require("../data/helpers/actionModel");


const router = express.Router();

// read All actions
router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the actions"
    });
  }
});

//read By ID
router.get("/:id", validateActionId, async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ message: `Failed to process request` });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The action has been removed" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Update
router.put("/:id", validateActionId, async (req, res) => {
  try {
    const actionUpdated = await Actions.update(req.params.id, req.body);
    res.status(200).json(actionUpdated);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the user"
    });
  }
});

//Create 
router.post("/",  async (req, res) => {
    try {
      const action = await Actions.insert(req.body);
  
      if (!action || Object.keys(action).length < 1 || req.body.description.length > 128 ){
        return res.status(400).json({ message: "Unable to insert action." });
      }
      else if (req.body.description.length < 128) {
          res.status(200).json(action);
        }
    } catch (err) {
      res.status(500).json({ message: "Error inserting action." });
    }
  });

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);
    if (!action || Object.keys(action).length < 1) {
      res.status(404).json({ message: `Action not Found Invalid ID` });
    } else {
        req.action = action;
        next();
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to process request` });
  }
  
}

module.exports = router;
