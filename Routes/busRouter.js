const express = require("express");
const busController = require("../controllers/busController.js");
const busRouter = express.Router();
const app = express();


busRouter.use("/bus", busController.getBuses);
busRouter.use("/trol", busController.getTrolls);
busRouter.use("/tram", busController.getTrams);
busRouter.use("/buses/:id", busController.getID);
app.use("/bus", busRouter);

module.exports = busRouter;