import express from "express";
import {PORT, mongodbURL} from "./config.js";
import mongoose from "mongoose";

import Criteria_4_1_1_Routes from "./routes/criteria_4_routes/Criteria_4_1_1_Routes.js";
import Criteria_4_1_2_Routes from "./routes/criteria_4_routes/Criteria_4_1_2_Routes.js";
import Criteria_4_2_1_Routes from "./routes/criteria_4_routes/Criteria_4_2_1Routes.js";
import Criteria_4_2_2_Routes from "./routes/criteria_4_routes/Criteria_4_2_2Routes.js";
import Criteria_4_3_1_Routes from "./routes/criteria_4_routes/Criteria_4_3_1_Routes.js";
import Criteria_4_4_1_Routes from "./routes/criteria_4_routes/Criteria_4_4_1_Routes.js";
import Criteria_4_5_1_Routes from "./routes/criteria_4_routes/Criteria_4_5_1_Routes.js";
import Index_Routes from "./routes/index_routes/Index_Routes.js";
import Criteria_4_List from "./routes/criteria_4_routes/Criteria_4_List_Routes.js";
import Criteria_4_5_2_m1_Routes from  "./routes/criteria_4_routes/Criteria_4_5_2_m1_Routes.js";

import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());


app.use('/criterias',Index_Routes);
app.use('/criteria_4_1_1', Criteria_4_1_1_Routes);
app.use('/criteria_4_1_2',Criteria_4_1_2_Routes);
app.use('/criteria_4_2_1',Criteria_4_2_1_Routes);
app.use('/criteria_4_2_2',Criteria_4_2_2_Routes);
app.use('/criteria_4_3_1',Criteria_4_3_1_Routes);
app.use('/criteria_4_4_1',Criteria_4_4_1_Routes);
app.use('/criteria_4_5_1',Criteria_4_5_1_Routes);
app.use('/criteria_4_5_2_m1',Criteria_4_5_2_m1_Routes);
app.use('/criteria_4_list',Criteria_4_List);




Criteria_4_1_2_Routes

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

