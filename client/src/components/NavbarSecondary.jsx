import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';


function NavbarSecondary() {

    let history = useHistory();

    const getUsername = localStorage.getItem("username");

    // go to user profile
    const toUserProfile = async (e) => {
        history.push(`/user`)
    }

    //sign out
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

                                <Dropdown.Menu style={{ margin: 0 }}>
                                    <Dropdown.Item
                                        variant="success"
                                        onClick={() => toUserProfile(getUsername)} >
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