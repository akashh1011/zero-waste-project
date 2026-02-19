import {Zero} from "../models/assignmentModel.js";

const KARMA_RATES = {
  "plastic": 10,
  "paper": 5,
  "metal": 15,
  "organic": 2
}
const createWasteEntry = async (req,res) =>{
  const {userId, wasteType, weightInKg, location} = req.body;
  try {
    const calculatedCoins = KARMA_RATES[wasteType] * weightInKg;

    const entry = await Zero.create({
      userId,
      wasteType,
      weightInKg,
      location
    })

    res.status(201).json({
      data:entry,
      calculatedCoins: calculatedCoins,
      message: "Waste entry created successfully"
    })
    
    
  } catch (error) {
    console.error("Error creating waste entry:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }

}

export default createWasteEntry;