const express = require("express");


const Projects = require("../data/helpers/projectModel");

const router = express.Router();

// read All project
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get(req.params.id);
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the project"
    });
  }
});

//actions
router.get("/:id/actions", validateProjectId, async (req, res) => {
     try{
       const project = await Projects.get(req.params.id)
       res.status(200).json(project);
     }catch (err) {
      res.status(500).json({ message: `Failed to process request` });
    }
});

//read By ID
router.get("/:id",validateProjectId,  async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: `Failed to process request` });
  }
});

// Delete
router.delete("/:id",validateProjectId, async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: "The project has been removed" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

// Update
router.put("/:id", validateProjectId, async (req, res) => {
  try {
    const actionUpdated = await Actions.update(req.params.id, req.body);
    res.status(200).json(actionUpdated);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the project"
    });
  }
});

//Create 
router.post("/",  async (req, res) => {
    try {
      const project = await Projects.insert(req.body);
  
      if (!project || Object.keys(action).length < 1 || req.body.description.length > 128 ){
        return res.status(400).json({ message: "Unable to insert project." });
      }
      else if (req.body.description.length < 128) {
          res.status(200).json(project);
        }
    } catch (err) {
      res.status(500).json({ message: "Error inserting project." });
    }
  });

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: `Action not Found Invalid ID` });
    }
  } catch (err) {
    res.status(500).json({ message: `Failed to process request` });
  }
}

module.exports = router;
