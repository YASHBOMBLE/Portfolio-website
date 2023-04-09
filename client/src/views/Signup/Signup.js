import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { currentUser } from './../../util/currentUser.js';
import "./Signup.css"

import Footer from "./../../component/Footer/Footer.js"
import { Link, useFetcher } from 'react-router-dom';
import { generateOTP } from '../../util/generateOTP.js';
import Marquee from "react-fast-marquee";

function Signup() {


  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const myOTP = generateOTP();
  const [show, setShow] = useState(false)
  const handleShow = () => {
    setShow(!show)
  }

  async function sendMail() {
    localStorage.setItem('fname', JSON.stringify(fname));
    localStorage.setItem('lname', JSON.stringify(lname));
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('phone', JSON.stringify(phone));
    localStorage.setItem('password', JSON.stringify(password));
    localStorage.setItem('role', JSON.stringify(role));
    const response = await axios.post('/validate', {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      password: password,
      role: role
    })


    localStorage.setItem('otp', JSON.stringify(myOTP));
    const result = window.Email.send({
      SecureToken: process.env.REACT_APP_MAIL_KEY,
      To: email,
      From: "yashbomble2002@gmail.com",
      Subject: "Email Varification",
      Body: myOTP + " " + "Is your otp for email varification"
    });



    if (result) {
      console.log(response.data)
      if (response.data.success) {
        await swal({
          title: "Check Your Mail For Varification",
          text: "Varify Mail",
          icon: "success",
          button: "Continue",
        });

        window.location.href = '/Verifymail'

      }
      else {
        swal({
          title: "Error",
          text: response.data.message,
          icon: "error",
          button: "Try Again!",
        });

        setFname('')
        setLname('')
        setEmail('')
        setPhone('')
        setPassword('')
      }
    }

  }




  /*async function signupUser() {
   
    
    const response = await axios.post('/signup', {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
      password: password,
      role: role
    })
   
    console.log(response.data)
    if (response.data.success) {
      await swal({
        title: "Success",
        text: response.data.message,
        icon: "success",
        button: "Aww yiss!",
      });
      window.location.href = '/login'
    }
    else {
      swal({
        title: "Error",
        text: response.data.message,
        icon: "error",
        button: "Try Again!",
      });
      setFname('')
      setLname('')
      setEmail('')
      setPhone('')
      setPassword('')
    }
  }
*/



  return (
    <div> 
       
             <br></br>
            
             
            
      <div className='row'>
        <div className=' text-center col-md-12'>
        <Marquee speed={52} text="swetha" className='marquee-text text-center'><p class="marquee-tag-text">Enter Valid Details To Continue &nbsp;&nbsp;Password Contains : A-Z a-z 0-9 One Special Symbol </p> </Marquee>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>

        </div>
        <div className='col-md-4 main-info-container'>


          <div className='form-container'>

            <div className='form-title'>
              Signup
            </div>
            <hr />
            <form>
              <div>
                <label htmlFor='name'>First Name: </label>
                <input type='text' id='name' placeholder='First Name' className='user-input'
                  value={fname} onChange={(e) => setFname(e.target.value)} />
              </div>
              <div>
                <label htmlFor='name'>Last Name: </label>
                <input type='text' id='name' placeholder=' Last Name' className='user-input'
                  value={lname} onChange={(e) => setLname(e.target.value)} />
              </div>

              <div>
                <label htmlFor='email'>Email: </label>
                <input type='email' id='email' placeholder=' Email' className='user-input'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <label htmlFor='phone'>Phone: </label>
                <input type='text' id='phone' placeholder='Phone' className='user-input'
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>





                <label for="password">Password:</label>
                <div class="input-container">
                  <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='user-input' placeholder=' Password' id="password" name="password" />
                  <i class="btn text-pass" onClick={handleShow}>{show ? "Hide" : "Show"}</i>
                </div>

             
              </div>



              <div>
                <button type='button' className='signup-button' onClick={sendMail}>Signup &nbsp;<i class="fa-solid fa-user-plus"></i></button>

              </div>
              <hr />
              <span className=' login-link'>
                <Link to='/login' className='' >Already have an account Login</Link>
              </span>
            </form>

          </div>
        </div>

        <div className='col-md-4'>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
