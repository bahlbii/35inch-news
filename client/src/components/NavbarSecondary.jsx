import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarSecondary() {

    const getEmail = localStorage.getItem("email");
    const getPassword = localStorage.getItem("password");

    let history = useHistory();
    const toLogin = async () => {
        history.push("/login")
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
                            {/* <button type="button"
                                className="btn btn-link px-3 me-2"
                                onClick={toLogin}
                            >
                                User: {getEmail}
                            </button> */}
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {getEmail}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1"
                                    onClick={toSignOut} >
                                    Sign Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <button type="button"
                                className="btn btn-primary me-3"
                                onClick={toSignOut}
                            >
                                Sign Out
                            </button> */}

                        </div>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default NavbarSecondary;