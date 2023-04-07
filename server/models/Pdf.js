import { Schema, model } from "mongoose";

const pdfSchema = new Schema({
  subject : String,
  link : String,
  date : String
},{ timestamps: true})

const Pdf = model('Pdf', pdfSchema);

export default Pdf;