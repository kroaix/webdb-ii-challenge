const express = require("express");

const db = require("../data/db-config.js");

router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cars = await db("cars");
    res.status(200).json({ success: true, cars });
  } catch {
    res.status(500).json({ success: false, error: "Problem with request." });
  }
});

router.post("/", validateBody, async (req, res) => {
  try {
    const car = await db("cars").insert(req.body);
    res.status(201).json({ success: true, car });
  } catch {
    res.status(500).json({ success: false, error: "Problem with request." });
  }
});

router.put("/:id", validateID, validateBody, async (req, res) => {
  const { id } = req.params;
  try {
    const car = await db("cars")
      .where({ id })
      .update(req.body);
    res.status(200).json({ success: true, car })
  } catch {
    res.status(500).json({ success: false, error: "Problem with request." });
  }
});

router.delete('/:id', validateID, async (req, res) => {
  const { id } = req.params;
  try {
    await db("cars")
      .where({ id })
      .del(req.body);
    res.status(200).json({
      success: true,
      message: `Car ${id} was successfully deleted`
    });
  } catch {
    res.status(500).json({ success: false, error: "Problem with request." });
  }
})

async function validateID(req, res, next) {
  const { id } = req.params;
  try {
    const cars = await db("cars")
      .where({ id })
      .update(req.body);
    if (cars > 0) {
      req.cars = cars;
      next();
    } else {
      res.status(404).json({
        success: false,
        error: `The car with id of ${id} does not exist.`
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      error: "Problem with request."
    });
  }
}

async function validateBody(req, res, next) {
  const { VIN, make, model, mileage } = req.body;
  try {
    if (Object.entries(req.body).length === 0) {
      res.status(400).json({ success: false, error: "Body data not found." });
    } else if (!VIN || !make || !model || !mileage) {
      res.status(400).json({
        success: false,
        error: "VIN, make, model and mileage are required."
      });
    } else {
      next();
    }
  } catch {
    res.status(500).json({
      success: false,
      error: "Problem with request."
    });
  }
}

module.exports = router;
