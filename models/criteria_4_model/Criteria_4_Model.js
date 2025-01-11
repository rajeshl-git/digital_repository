import mongoose from "mongoose";


const tableCriteria_4 = mongoose.Schema(
  {
    item_no:{
      type: Number,
      required: true,
    },
    
    division:{
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
  }
)

export const criteria_4_list = mongoose.model('criteria_4_list',tableCriteria_4,'criteria_4_list');


const tableSchema4_1_1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      CAY_21_22:{
        type: Number,
        
      },
      CAYm1_20_21:{
        type: Number,
      },
      CAYm2_19_20:{
        type: Number,
      },
      CAYm3_18_19:{
        type: Number,
      },
      CAYm4_17_18:{
        type: Number,
      },
      CAYm5_16_17:{
        type: Number,
      },
      CAYm6_15_16:{
        type: Number,
      },
    }
  )

  export const criteria_4_1_1 = mongoose.model('criteria_4_1_1',tableSchema4_1_1);
  
  const tableSchema4_1_2 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      N:{
        type:Number,
      },
      N1:{
        type:Number,
      },
      ratio:{
        type:Number,
      },
      edit:{
        type:String,
      },
      update:{
        type:String,
      }
    }
  )

  export const criteria_4_1_2 = mongoose.model('criteria_4_1_2',tableSchema4_1_2,'criteria_4_1_2');

  const tableSchema4_2_1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      LYG_2017_2018:{
        type:Number,
      },
      LYGm1_2016_2017:{
        type:Number,
      },
      LYGm2_2015_2016:{
        type:Number,
      }
    }
  )

  export const criteria_4_2_1 = mongoose.model('criteria_4_2_1',tableSchema4_2_1,'criteria_4_2_1');

  const tableSchema4_2_2 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      LYG_2017_2018:{
        type:Number,
      },
      LYGm1_2016_2017:{
        type:Number,
      },
      LYGm2_2015_2016:{
        type:Number,
      }
    }
  )

  export const criteria_4_2_2 = mongoose.model('criteria_4_2_2',tableSchema4_2_2,'criteria_4_2_2');


  const tableSchema_4_3_1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      CAYm3_18_19:{
        type:Number,
      },
      LYG_17_18:{
        type:Number,
      },
      LYGm1_16_17:{
        type:Number,
      }
    }
  )

  export const criteria_4_3_1 = mongoose.model('criteria_4_3_1',tableSchema_4_3_1,'criteria_4_3_1')
  const tableSchema_4_4_1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      
      CAYm2_19_20:{
        type:Number,
      },
      
       CAYm3_18_19:{
        type:Number,
      },
      
       LYG_17_18:{
        type:Number,
      }
    }
  )

  export const criteria_4_4_1 = mongoose.model('criteria_4_4_1',tableSchema_4_4_1,'criteria_4_4_1')

  const tableSchema_4_5_1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      item_name:{
        type: String,
        required: true,
      },
      
      LYG_17_18:{
        type:Number,
      },
      
       LYGm1_16_17:{
        type:Number,
      },
      
      LYGm2_15_16:{
        type:Number,
      }
    }
  )

  export const criteria_4_5_1 = mongoose.model('criteria_4_5_1',tableSchema_4_5_1,'criteria_4_5_1')

  const tableSchema_4_5_2_m1 = mongoose.Schema(
    {
      criteria_name:{
        type: String,
        required: true,
      },
      division_name:{
        type: String,
        required: true,
      },
      item_no:{
        type: Number,
        required: true,
      },
      student_name:{
        type: String,
        required: true,
      },
      
      enrollment_no:{
        type:Number,
      },
      
       company_name:{
        type:String,
      },
      
      appointment_reference_no:{
        type:String,
      },
      proof:{
        type:String,
      }
    }
  )

  export const criteria_4_5_2_m1 = mongoose.model('criteria_4_5_2_m1',tableSchema_4_5_2_m1,'criteria_4_5_2_m1')




  


