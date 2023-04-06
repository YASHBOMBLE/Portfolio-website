import {Schema, model} from "mongoose"

const pdfSchema = new Schema({
    subject: String,
    link: String,
})

const Pdf = model("Pdf", pdfSchema)

export default Pdf