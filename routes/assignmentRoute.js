import express from "express";
import  validateWasteEntry from "../validations/assignmentValidation.js";
import createWasteEntry from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/upload", validateWasteEntry, createWasteEntry);

export default router;