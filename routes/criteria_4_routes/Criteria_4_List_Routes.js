import express from "express";
import {criteria_4_list} from "../../models/criteria_4_model/Criteria_4_Model.js"

const router = express.Router();



  router.get("/", async (request, response) => {
    try {
      const tables = await criteria_4_list.find({});
      return response.status(200).json({
        count: tables.length,
        data: tables,
      });
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

 
  export default router;