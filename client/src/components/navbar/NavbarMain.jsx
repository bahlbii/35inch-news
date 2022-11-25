import React from 'react'
import '../../css/style.css'
import { useHistory } from 'react-router-dom';

function Navbar() {


    let history = useHistory();
    const toLogin = async () => {
        history.push("/login")
    }
    const toRegister = async () => {
        history.push("/register")
    }

    const myLogoClick = async () => {
        history.push("/");
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
                            <button type="button"
                                className="btn btn-link px-3 me-2"
                                onClick={toLogin}
                            >
                                Login
                            </button>
                            <button type="button"
                                className="btn btn-primary me-3"
                                onClick={toRegister}
                            >
                                Sign up
                            </button>

                        </div>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default Navbar;