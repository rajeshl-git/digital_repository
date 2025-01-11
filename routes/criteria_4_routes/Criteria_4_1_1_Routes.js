import express from "express";
import {criteria_4_1_1,} from "../../models/criteria_4_model/Criteria_4_Model.js";

const router = express.Router();

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await criteria_4_1_1.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const updatedFields = request.body;
    console.log(request.body);

    const updatedRow = await criteria_4_1_1.findByIdAndUpdate(
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
  router.get("/", async (request, response) => {
    try {
      const tables = await criteria_4_1_1.find({});
      return response.status(200).json({
        count: tables.length,
        data: tables,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

  router.post('/', async (request, response) => {
    try {
      if (
        !request.body.criteria_name ||
        !request.body.division_name ||
        !request.body.item_no
      ) {
        return response.status(400).send({
          message: 'Send all required fields: title, author, publishYear',
        });
      }
      const newBook = {
        criteria_name:request.body.criteria_name,
        division_name:request.body.division_name,
        item_no:request.body.item_no,
        item_name:request.body.item_name,
        CAY_21_22:request.body.CAY_21_22,        
        CAYm1_20_21:request.body.CAYm1_20_21,
        CAYm2_19_20:request.body.CAYm2_19_20,
        CAYm3_18_19:request.body.CAYm3_18_19,
        CAYm4_17_18:request.body.CAYm4_17_18,
        CAYm5_16_17:request.body.CAYm5_16_17,
        CAYm6_15_16:request.body.CAYm6_15_16,
        


      };
  
      const book = await criteria_4_1_1.create(newBook);
  
      return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  export default router;