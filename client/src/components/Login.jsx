import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoaderAPI from './LoaderAPI';
import Navbar from './NavbarMain';

const Login = () => {
  //local storage
  const usernameRef = useRef();
  const passwordRef = useRef();

  let history = useHistory();

  //state for controlling login process
  const [userEmailLogin, setuserEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  //Message for user
  const [messageForUser, setMessageForUser] = useState("");

  //login function
  const login = async (e) => {
    e.preventDefault(); //prevent page from refreshing
    try {
      const response = await LoaderAPI.post(`/login`, {
        userEmail: userEmailLogin,
        password: passwordLogin
      });

      localStorage.setItem("username", `${response.data.data.user.username}`);
      localStorage.setItem("password", `${response.data.data.user.password}`);

      history.push("/news")

    } catch (err) {
      //set the message to be presented to user
      setMessageForUser("Incorrect userEmail or password.");
    }
  }
  //take user to regsiter page 
  const register = async () => {
    history.push("/register")
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="w-50 p-5 mx-auto align-items-center">
        <div className="registration p-5">
          <form className='shadow-lg p-5 mb-5 bg-white rounded '>
            <div className="form-group">
              <label htmlFor="email">Email or username</label>
              <input type="email"
                ref={usernameRef}
                onChange={(e) => { setuserEmailLogin(e.target.value) }}
                className=" inputBorders form-control"
                placeholder="Enter username or email" />

            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password"
                ref={passwordRef}
                onChange={(e) => { setPasswordLogin(e.target.value) }}
                className="inputBorders form-control"
                placeholder="Password" />
            </div>
            <div><h5>{messageForUser}</h5></div>
            <button type="submit"
              onClick={login}
              className="login_button btn btn-primary">
              Login
            </button>

            <hr></hr>
            <h6>Don't have an account? click here</h6>
            <hr />

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

export default Login