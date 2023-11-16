const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
// data pour l'exemple

router.get("/", stuffCtrl.getAllStuff);
// create a new record thing
router.post("/", stuffCtrl.createThing);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id", stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
