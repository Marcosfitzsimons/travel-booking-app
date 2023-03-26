import express from "express";
import { createTrip, deleteTrip, getTrip, getTrips, updateTrip } from "../controllers/trip.js";
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js'

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createTrip)

// UPDATE
router.put("/:id", verifyUser, updateTrip)

// DELETE
router.delete("/:id", verifyAdmin, deleteTrip)

// GET
router.get("/:id", getTrip)

// GET ALL
router.get("/", getTrips)

export default router;