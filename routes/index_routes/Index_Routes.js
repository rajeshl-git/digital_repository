import express from "express";
import {criterias} from "../../models/index_model/Index_model.js";

const router = express.Router();



  router.get("/", async (request, response) => {
    try {
      const tables = await criterias.find({});
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