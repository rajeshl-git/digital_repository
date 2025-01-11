import express from "express";
import {criteria_4_2_2} from "../../models/criteria_4_model/Criteria_4_Model.js";

const router = express.Router();



  router.get("/", async (request, response) => {
    try {
      const tables = await criteria_4_2_2.find({});
      return response.status(200).json({
        count: tables.length,
        data: tables,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

 
 

  router.put("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const updatedFields = request.body;
      console.log(request.body);
  
      const updatedRow = await criteria_4_2_2.findByIdAndUpdate(
        { _id: id },
        { $set: updatedFields }, // Update all fields in the updatedFields object
        { new: true } // Return the updated document
      );
  
      if (!updatedRow) {
        return response.status(404).json({ message: "Table not found" });
      }
  
      return response.status(200).json({ message: "Table updated successfully", data: updatedRow });
    } catch (error) {
      console.error(error);
      response.status(500).send({ message: error.message });
    }
  });
  export default router;