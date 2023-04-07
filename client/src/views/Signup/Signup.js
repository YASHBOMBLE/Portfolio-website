import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { currentUser } from './../../util/currentUser.js';
import "./Signup.css"
import signupImg from "./../../images/signupImg.svg";

function Signup() {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')


   
      


  async function signupUser() {
   
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




  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
        <div class="wrapper">
  <p class="target">
   
        Enter Valid Details To Continue.
        &nbsp;&nbsp;
            Password Contains :
            
              
                A-Z
                a-z
               0-9
                One Special Symbol


                </p>
</div>
         
       
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 main-info-container'>
          <div className='info-container'>
          
          </div>
          <br />
          <div className='main-container-signup-img mt-5 m-1'>
            <div className='container '>
            <img src={signupImg} className = "img-fluid signup-img-size"/>
            </div>

          </div>




        </div>

        <div className='col-md-6'>
          <div className='form-container'>

            <div className='form-title'>
              Signup
            </div>
            <hr />
            <form>
              <div>
                <label htmlFor='name'>First Name: </label>
                <input type='text' id='name' placeholder='Enter First Name' className='user-input'
                  value={fname} onChange={(e) => setFname(e.target.value)} />
              </div>
              <div>
                <label htmlFor='name'>Last Name: </label>
                <input type='text' id='name' placeholder='Enter Last Name' className='user-input'
                  value={lname} onChange={(e) => setLname(e.target.value)} />
              </div>

              <div>
                <label htmlFor='email'>Email: </label>
                <input type='email' id='email' placeholder='Enter Email' className='user-input'
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div>
                <label htmlFor='phone'>Phone: </label>
                <input type='text' id='phone' placeholder='Enter Phone' className='user-input'
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>
                <label htmlFor='password'>Password: </label>
                <input type='password' id='password' placeholder='Enter Password' className='user-input'
                  value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div>
                <button type='button' className='signup-button' onClick={signupUser }>Signup</button>

              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
