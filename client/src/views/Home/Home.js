import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./Home.css"
import { currentUser } from './../../util/currentUser.js';
import user from "./../../images/user.png";
import Navbar from "./../../component/Navbar/Navbar.js"
import { loginRequired } from '../../util/LoginRequired';
import Footer from '../../component/Footer/Footer';
import swal from 'sweetalert';


function Home() {
    const [searchText, setSearchText] = useState('')
    const [currentItems, setAllItems] = useState([])
    useEffect(() => {
        loginRequired()
    }, [])

    async function fetchAllItems() {
        const response = await axios.get('/allFoodItems')
        setAllLinks(response.data.data)
    }
    async function fetchSpecificItems() {
        const response = await axios.get(`/pdfsearch?subject=${searchText}`)
        setAllLinks(response.data.data)
    }

    useEffect(() => {
        if (searchText.length > 0) {
            fetchSpecificItems()
        }
        else {
            fetchAllItems()
        }

    }, [searchText])

    const [currentlink, setAllLinks] = useState([])

    const [link, setLink] = useState('')
    async function fetchAllItems() {
        const response = await axios.get('/pdflink')
       
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

    async function addPdf()
    {
        const name = prompt("Enter Subject");
        const link = prompt("Pdf Link");

        let date = new Date();

        const response = axios.post('/createpdf',{
            subject : name,
            link : link,
            date : date.toDateString()
        })
        
        console.log(response)
        if(response.success == "true")
        {
            await swal({
                title: "Success",
                text: "Pdf Added",
                icon: "success",
                button: "OK!",
              });
        }
        

    }

    function adminView() {
        if (currentUser?.role == "Admin") {
            return (<>
                <div class="d-grid gap-2 logout-btn mt-2">
                    <button type="button" className='btn btn-primary' onClick={addPdf}><p className='logOut-text'>Add PDF Link</p><i class="fa-sharp fa-solid fa-plus"></i></button>

                </div>
            </>)
        }
    }




    return (
        <div>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='dash-main-container'>
                        <div className='dash-container'>
                            Dashboard
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>

                </div>
                <div className='header-container col-md-12'>

                    <img src={user} onClick={adminView()} className="user-img img-fluid" />
                    <span className='user-name'>&nbsp;Welcome &nbsp;</span><span className='user-name me-2'>{currentUser?.fname}</span>
                    <br />

                </div>
            </div>
            <hr />

            <div className='row'>
                <div className='col-md-6'>
                    <span className='text'>Search By Topic Here</span>
                </div>
                <div className='col-md-6'>
                    <div className='main-search-container'>
                        <div className='search-container'>
                            <input type="text" placeholder='Search By Subject ...' className='input-search'
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </div>

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
                                <th scope="col"  className='text-center'>Create At (day/mm/dd/yy)</th>
                            </tr>
                        </thead>
                        {

                            currentlink?.map((Item, index) => {

                                return (<>


                                    <tbody>
                                        <tr>
                                            <th scope="row">{i = i + 1}</th>
                                            <td>

                                                {Item.subject}</td>
                                            <td><div className='text-center'>
                                                <a target='_blank' href={Item.link}>
                                                    <button type="button" class=" btn-sm "><b><i class="far fa-file-alt"><i class="fa-solid fa-arrow-down-to-line"></i></i> Download</b></button>
                                                </a>
                                            </div></td>
<td  className='text-center'>{Item.date}</td>
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
            <span className='mt-2'>
                {adminView()}
            </span>
            <Footer />
        </div>
    )
}

export default Home
