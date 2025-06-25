const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contact: { type: String },
  logo: { type: String }, // Cloudinary or base64 if needed
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "OWNER" }, // Always OWNER for the registrant
});

module.exports = mongoose.model("Company", companySchema);
