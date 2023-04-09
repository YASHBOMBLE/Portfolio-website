import React, { useState, useEffect } from 'react'
import axios from 'axios'
import swal from 'sweetalert';

import { currentUser } from './../../util/currentUser'
import "./Login.css"
import { Link } from 'react-router-dom'
import Footer from '../../component/Footer/Footer';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const handleShow = () => {
    setShow(!show)
  }


  async function loginUser() {
    const response = await axios.post('/login', {
      email: email,
      password: password,
    })
    console.log(response.data)
    if (response.data.success) {
       
      await swal({
        title: "Success",
        text: response.data.message,
        icon: "success",
        button: "Aww yiss!",
      });
      localStorage.setItem('currentUser', JSON.stringify(response.data.data));
      window.location.href = "/"
    }
    else {
      await swal({
        title: "Error",
        text: response.data.message,
        icon: "error",
        button: "Try Again!",
      });
      setEmail("")
      setPassword("")
      localStorage.removeItem('currentUser');
    }
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <div class="container">
           <h2 className='login-page-text'>Login Here To continue</h2>
    
          </div>

        </div>
      </div>
      <hr />

      <div className='row m-1 size-form-container'>
        <div className='col-md-4'>

        </div>
        <div className='col-md-4'>
        <div className='login-form-container'>
              <div className='form-container main-form-container mt-3 '>
                <form>
                  <div className='form-title' >
                    Login
                    <hr />
                  </div>
                  <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='email' id='email' placeholder='Email' className='user-input'
                      value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  
                  <div>





                <label for="password">Password:</label>
                <div class="input-container">
                  <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className='user-input' placeholder=' Password' id="password" name="password" />
                  <i class="btn text-pass" onClick={handleShow}>{show ? "Hide" : "Show"}</i>
                </div>

             
              </div>

                  <div>
                    <hr />
                    <button type='button' className='login-button' onClick={loginUser}>Login</button>
                    <hr />
                    <span className='signup-form-link'>
                      <Link to='/signUp' className='link-signup ms-2' >Don't have account signup</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
</div>
          <div className='col-md-4'>
          

        </div>
 
      <br />
      <br />
      <Footer />
    </div>
  )
}

export default Login
