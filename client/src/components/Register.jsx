import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoaderAPI from './LoaderAPI';
import Navbar from './NavbarMain';

const Register = () => {

  let history = useHistory();

  //state for controlling registration process
  const [userNameRegister, setUserNameRegister] = useState("");
  const [userEmailRegister, setUserEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");

  //registration help
  const [messageForUser, setMessageForUser] = useState("");


  //registration function
  const register = async (e) => {
    e.preventDefault(); //prevent page from refreshing
    try {

      //regex expression to check if emain input is correct
      const validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      if (userEmailRegister.match(validRegex) && passwordRegister !== '') {
        // eslint-disable-next-line no-unused-vars
        const response = await LoaderAPI.post(`/register`, {
          userNameRegister,
          userEmailRegister,
          passwordRegister
        });

        history.push("/login")
      }
      else {
        setMessageForUser("Error. Email or password invalid.");
      }
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <><div>
      <Navbar />
    </div>
      <div className="w-50 p-5 mx-auto align-items-center">
        <div className="registration p-5">
          <form className='shadow-lg p-5 mb-5 bg-white rounded '>

          <div className="form-group">
              <label htmlFor="email">Username</label>
              <input type="email"
                onChange={(e) => { setUserNameRegister(e.target.value) }}
                className="inputBorders form-control"
                placeholder="Enter username" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email"
                onChange={(e) => { setUserEmailRegister(e.target.value) }}
                className="inputBorders form-control"
                placeholder="Enter email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                onChange={(e) => { setPasswordRegister(e.target.value) }}
                className="inputBorders form-control"
                placeholder="Password" />
            </div>

            <div><h5>{messageForUser}</h5></div>
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