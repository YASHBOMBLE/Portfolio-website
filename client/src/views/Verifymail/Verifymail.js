import React, { useEffect, useState } from 'react'
import { generateOTP } from '../../util/generateOTP';
import "./Verifymail.css";
import swal from 'sweetalert';
import Footer from '../../component/Footer/Footer';
function Verifymail() {
    const [otp, setOtp] = useState('');
    const myOTP = JSON.parse(localStorage.getItem('otp'));
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')

    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')


    async function verifyOtp(otp) {
        /*setFname(localStorage.getItem('fname'))
        setLname(localStorage.getItem('lname'))
        setEmail(localStorage.getItem('email'))
        setPhone(localStorage.getItem('phone'))
        setPassword(localStorage.getItem('password'))
        setRole(localStorage.getItem('role'))
        */
        const otp1 = document.getElementById('name').value;
        if (otp1.length !== 4) {
            await swal({
                title: "Invalid Otp",
                text: "Otp Must Contain 4 Digit",
                icon: "warning",
                dangerMode: true,
            });
        }

        else {
            if (myOTP == otp1) {
                window.location.href = "/login";
                localStorage.removeItem('otp')

            }
            else {

                await swal({
                    title: "Invalid Otp",
                    text: "Enter Valid Otp",
                    icon: "warning",
                    dangerMode: true,
                });

            }
        }
    }


    return (
        <div>

<div className='row'>
    <div className='col-md-12'>
        <div className='text-center'>
         <h1>  Verify Gmail Account</h1> 
        </div>
    </div>

</div>
<hr />
            <div className='row'>
                <div className='col-md-4'>

                </div>
                <div className='containier col-md-4'>
                    <div className='center-container'>
                        <label htmlFor='name' className='otp-title'>Enter Otp </label> <br />
                        <span className='mb-3'>(Check Your Mail Id For Otp)</span>
                        <input type='text' id='name' placeholder='_ _ _ _' className='otp-input'
                        />
                        <br />
                        <button onClick={verifyOtp} className="verfiy-btn">Verify Otp</button>
                    </div>
                </div>
                <div className='col-md-4'>

                </div>

               

            </div>
            <Footer />
        </div>
    )
}

export default Verifymail
