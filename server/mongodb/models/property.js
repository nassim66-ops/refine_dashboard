import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  photo: { type: String },
  creator: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const propertyModal = mongoose.model("Property", PropertySchema);

export default propertyModal;
