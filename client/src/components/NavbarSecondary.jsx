import React from 'react'
import './style.css'
import { useHistory, useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarSecondary() {

    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");

    const { user_id } = useParams();

    let history = useHistory();
    // const toLogin = async () => {
    //     history.push("/login")
    // }
    const toUserProfile = async (e) => {
        history.push(`/user/:${user_id}`)
    }
    const toSignOut = async () => {
        localStorage.clear();
        window.location.href = '/';
    }

    const myLogoClick = async () => {
        history.push("/news");
    }

    return (
        <div className="container w-1">
            <div className="pb-1 w-100">

                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <div className='myLogo'
                            onClick={myLogoClick}>
                            <img className="navbar-brand"
                                alt='logo'
                                src="https://35inch.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_white.fc4d54d0.png&w=256&q=75"
                            />
                        </div>
                        <div className="d-flex align-items-center">

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {getUsername}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/user"
                                        variant="success"
                                        onClick={() => toUserProfile(user_id)} >
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        variant="success"
                                        onClick={toSignOut} >
                                        Sign Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default NavbarSecondary;