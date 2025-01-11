import express from "express";
import multer from "multer";
import { criteria_4_5_2_m1 } from "../../models/criteria_4_model/Criteria_4_Model.js";

const router = express.Router();
const upload = multer({dest: 'uploads/'});
// POST route to insert new document
router.post("/", upload.single('proof'), async (request, response) => {
  try {
    const newDocument = new criteria_4_5_2_m1({
      ...request.body,
      proof: request.file.path, // Save the file path to the database
    });
    const savedDocument = await newDocument.save();
    response.status(201).json(savedDocument);
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
});
// GET route to retrieve documents
router.get("/", async (request, response) => {
  try {
    const tables = await criteria_4_5_2_m1.find({});
    return response.status(200).json({
      count: tables.length,
      data: tables,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// PUT route to update a document by id
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updatedFields = request.body;
    console.log(request.body);

    const updatedRow = await criteria_4_5_2_m1.findByIdAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedRow) {
      return response.status(404).json({ message: "Table not found" });
    }

    return response.status(200).json({ message: "Table updated successfully good", data: updatedRow });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
