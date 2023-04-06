import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Home.css"
import { currentUser } from './../../util/currentUser.js';
import user from "./../../images/user.png";
import Navbar from "./../../component/Navbar/Navbar.js"
import { loginRequired } from '../../util/LoginRequired';
import Footer from '../../component/Footer/Footer';

function Home() {

    useEffect(() => {
        loginRequired()
    }, [])

    const [currentlink, setAllLinks] = useState([])

    const [link, setLink] = useState('')
    async function fetchAllItems() {
        const response = await axios.get('/pdflink')
        console.log(response.data.data)
        setAllLinks(response.data.data)

    }
    useEffect(() => {

        fetchAllItems()

    }, [])

    let i = 0;
    async function logOut() {

        localStorage.removeItem('currentUser');
        window.location.href = '/login'
    }

    if (!currentUser) {
        window.location.href = '/login'
    }


    return (
        <div>
            <Navbar />
            <div className='row'>
                <div className='header-container col-md-12'>
                <img src={user} className="user-img img-fluid" />
                    <span className='user-name'>&nbsp;Welcome &nbsp;</span><span  className='user-name me-2'>{currentUser?.name}</span>
                </div>
            </div>
            <hr />

            <div className='row'>
                <div className='col-md-12'>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No</th>
                                <th scope="col">Topic</th>
                                <th scope="col" className='text-center'>Link</th>

                            </tr>
                        </thead>
                        {

                            currentlink?.map((Item, index) => {

                                return (<>


                                    <tbody>
                                        <tr>
                                            <th scope="row">{i = i + 1}</th>
                                            <td>{Item.subject}</td>
                                            <td><div className='text-center'>
                                                <a target='_blank' href={Item.link}>
                                                    <button type="button" class="btn-resume btn-sm "><b><i class="far fa-file-alt"></i> Download</b></button>
                                                </a>
                                            </div></td>

                                        </tr>


                                    </tbody>


                                </>)
                            })}
                    </table>

                </div>

            </div>
            <div class="d-grid gap-2 logout-btn">
                <button type="button" className='btn btn-primary' onClick={logOut}><p className='logOut-text'>Logout</p><i class="fa-solid fa-right-from-bracket"></i></button>

            </div>
            <Footer />
        </div>
    )
}

export default Home
