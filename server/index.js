import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

import path from 'path';
const __dirname = path.resolve();
import User from './models/User.js';
import Pdf from './models/Pdf.js';



const app = express();
app.use(express.json());




const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
})

// api routes starts here

app.post('/signup', async (req, res) => {
    const { name, phone, email, password, role } = req.body;

    // validation to check if all fields are filled starts here
    const emptyFields = [];

    if (!name) emptyFields.push('name');
    if (!phone) emptyFields.push('phone');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!role) emptyFields.push('role');

    if (emptyFields.length > 0) {
        return res.json({
            success: false,
            message: `${emptyFields.join(', ')} are required`
        })
    }
    // validation to check if all fields are filled ends here

    // validation to check if email already exists starts here
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already exists"
        })
    }
    // validation to check if email already exists ends here

    // validation to check if phone already exists starts here
    const existingUserPhone = await User.findOne({ phone: phone });
    if (existingUserPhone) {
        return res.json({
            success: false,
            message: "Phone already exists"
        })
    }
    // validation to check if phone already exists ends here

    const user = new User({
        name: name,
        phone: phone,
        email: email,
        password: password,
        role: role
    })

    const savedUser = await user.save();

    res.json({
        success: true,
        message: "User created successfully",
        data: savedUser
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password });

    if(existingUser){
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else
    {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})
app.post('/pdfentry',async(req,res)=>{
    const { subject,link } = req.body;

    const pdf = new Pdf({
        subject: subject,
        link : link
    })

    const savedPdf = await pdf.save();

    res.json({
        success: true,
        message: "pdf Saved successfully",
        data: savedPdf
    })
})

app.get("/pdflink", async(req, res)=>{
    const pdf = await Pdf.find()

    res.json({
        success: true,
        message: "Pdf fetched successfully",
        data: pdf
    })
})
// api routes ends here

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
  });



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})