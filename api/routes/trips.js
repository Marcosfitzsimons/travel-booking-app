import express from "express";
import { createTrip, deleteTrip, getTrip, getTrips, getTripSeats, updateTrip } from "../controllers/trip.js";
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createTrip)

// UPDATE
router.put("/:id", verifyAdmin, updateTrip)

// DELETE
router.delete("/:id", verifyAdmin, deleteTrip)

// GET
router.get("/:id", getTrip)
router.get("/seat/:id", getTripSeats)

// GET ALL
router.get("/", getTrips)

export default router;