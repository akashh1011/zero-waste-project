import mongoose, {Schema} from "mongoose";

const zerowasteSchema = new Schema({
  userId:{
    type: String

  },
  wasteType:{
    type: String

  },
  weightInKg:{
    type: Number

  },
  location:{
    latitude:{
      type: Number
    },
    longitude:{
      type: Number
    }
  }
}, {timestamps: true})

export const Zero = mongoose.model("Zero", zerowasteSchema)