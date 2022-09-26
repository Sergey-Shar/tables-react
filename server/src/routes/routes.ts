"use strict";
const Router = require("express");
const router = new Router();
const controler = require("../controller/controller");

router.get("/table", controler.getTableData);
router.get("/table/sorting/:field/:order", controler.sortTable);
router.get("/table/filter/:column/:operator/:search", controler.filterTable);

module.exports = router;
