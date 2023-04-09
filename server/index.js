import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as EmailValidator from 'email-validator';
import validator from 'validator';
dotenv.config();

import path from 'path';
const __dirname = path.resolve();
import User from './models/User.js';
import Pdf from './models/Pdf.js';
import PdfLink from './models/Pdf.js';



const app = express();
app.use(express.json());




const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
})

// api routes starts here

//API for Signup Form Validation
app.post('/validate',async(req,res)=>{
    const { fname,lname, phone, email, password, role } = req.body;
//Name VAlidation
    if(!validator.isAlpha(fname) || !validator.isAlpha(lname))
    {
        return res.json({
            success: false,
            message: "Name is in String"
        })
    }
   
    
    
    //password validation

    if(!validator.isStrongPassword(password))
    {
        return res.json({
            success: false,
            message: "Password Contains letters A-Z a-z 0-9 or Special Symbol (minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1)"
        })
    }
    
    //Email validation
    if (!EmailValidator.validate(email)) {
        return res.json({
            success: false,
            message: "Enter Valid Email"
        })
    }
    
    
//Phone number Validation
    if(validator.isAlpha(phone))
    {
        return res.json({
            success: false,
            message: "Mobile number Must be in Digit"
        })
    }
   

    if (phone.length < 10 || phone.length >= 11) {
        return res.json({
            success: false,
            message: "Mobile No Must be 10 Digit"
        })
    }

    res.json({
        success: true,
        message: "User created successfully"
    })
})

app.post('/signup', async (req, res) => {
    const { fname,lname, phone, email, password, role } = req.body;


   
    // validation to check if all fields are filled starts here
    const emptyFields = [];

    if (!fname) emptyFields.push('fname');
    if (!lname) emptyFields.push('lname');
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
        fname: fname,
        lname: lname,
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

app.post('/forgetPassword',async(req,res)=>{
    const {email,password} = req.body

    const existingUser = await User.findOne({ email: email });
if(existingUser){
   /* const update = await User.updateOne({password : existingUser.password},{$setpassword: password})
    if 
    (update){
    return res.json({
        success : true,
        message : "success",
        data : existingUser
        })
        }
        else{
            return res.json({
                success : false,
                message : "Error"
            })
        }
        */
        res.json({
            success : true,
            message : "success",
            data : existingUser.password
            })
}
else{
    return res.json({
        success : false,
        message : "User Not Found"
    })
}
    
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    if (!EmailValidator.validate(email)) {
        return res.json({
            success: false,
            message: "Enter Valid Email"
        })
    }

    if(!validator.isStrongPassword(password))
    {
        return res.json({
            success: false,
            message: "Enter Valid Password"
        })
    }

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and password are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password });

    if (existingUser) {
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid email or password"
        })
    }
})
app.post('/pdfentry', async (req, res) => {
    const { subject, link } = req.body;

    const pdf = new Pdf({
        subject: subject,
        link: link
    })

    const savedPdf = await pdf.save();

    res.json({
        success: true,
        message: "pdf Saved successfully",
        data: savedPdf
    })
})

app.get("/pdflink", async (req, res) => {
    const pdf = await Pdf.find()

    res.json({
        success: true,
        message: "Pdf fetched successfully",
        data: pdf
    })
})
app.get("/pdfsearch", async(req, res)=>{
    const {subject} = req.query;

    const pdfItems = await Pdf.find({
        subject: {$regex: subject, $options: 'i'}
    })

    res.json({
        success: true,
        message: "Data fetched successfully",
        data: pdfItems
    })
})
app.get("/allItems", async(req, res)=>{
    const pdfItems = await Pdf.find()

    res.json({
        success: true,
        message: "Items fetched successfully",
        data: pdfItems
    })
})

app.post("/createpdf", async(req, res)=>{
    const {subject,link,date} = req.body;
   
    if(!validator.isURL(link))
    {
        return(
            res.json({
                success: false,
                message: "Pdf created unsuccessfully",
                
            })
        )
    }
    
    

    const pdf = new Pdf({
        subject : subject,
        link : link,
        date: date
    })

    const savedPdf = await pdf.save();

    res.json({
        success: true,
        message: "Pdf created successfully",
        data: savedPdf
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