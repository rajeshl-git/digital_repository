import mongoose from "mongoose";

const index_schema = mongoose.Schema(
    {
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      open:{
        type:String,
      },
      completed:{
        type:String,
      },
      download:{
        type:String,
      }
    }
  )

  export const criterias = mongoose.model('index',index_schema);