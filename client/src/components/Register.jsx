import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoaderAPI from './LoaderAPI';
import Navbar from './NavbarMain';

const Register = () => {

  let history = useHistory();

  //state for controlling registration process
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");


  //registration function
  const register = async (e) => {
    e.preventDefault(); //prevent page from refreshing
    try {
      const response = await LoaderAPI.post(`/register`, {
        usernameRegister,
        passwordRegister
      });


    } catch (err) {
      console.error(err.message);
    }
    history.push("/login")
  }


  return (
    <><div>
      <Navbar />
    </div>
      <div className="w-50 p-5 mx-auto align-items-center">
        <div className="registration p-5">
          <form className='shadow-lg p-5 mb-5 bg-white rounded '>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email"
                onChange={(e) => { setUsernameRegister(e.target.value) }}
                className="form-control"
                id="inputBorders"
                aria-describedby="emailHelp"
                placeholder="Enter email" />

            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                onChange={(e) => { setPasswordRegister(e.target.value) }}
                className="form-control"
                id="inputBorders"
                placeholder="Password" />
            </div>

            <button type="submit"
              onClick={register}
              className="login_button btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
      </>

  )
}

export default Register;