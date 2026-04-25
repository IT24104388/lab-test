const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true },
    idNumber: { type: String, required: true },
    faculty:  { type: String, required: true },
    year:     { type: Number, required: true },
    semester: { type: Number, required: true },
    subjects: { type: [String], required: true },

    // TODO: Add your phone number field here
    // phone: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
