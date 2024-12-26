const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const paysController = require("../controller/paysController");

//fonction 1 (getAll on va la traiter dans le paysController.js du dossier controller)
router.get("/getAll", paysController.getAll);

//fonction 2 (getById on va la traiter dans le paysController.js du dossier controller)
router.get("/getById/:id", paysController.getbyid);

//fonction 3 (addPays on va la traiter dans le paysController.js du dossier controller)
router.post("/addPays", validate, paysController.add);

// fonction 4 (deletePays - handled in paysController.js)
router.delete("/deletePays/:id", paysController.remove);

// fonction 5 (updatePays - handled in paysController.js)
router.put("/updatePays/:id", paysController.update);

module.exports = router;
