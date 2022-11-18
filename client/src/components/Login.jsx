import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Landing from './Landing';
import LoaderAPI from './LoaderAPI';
import Navbar from './Navbar';

const Login = () => {

  let history = useHistory();

  //state for controlling login process
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  //Message for user
  const [messageForUser, setMessageForUser] = useState("");

  //login function
  const login = async (e) => {
    e.preventDefault(); //prevent page from refreshing
    try {
      const response = await LoaderAPI.post(`/login`, {
        username: usernameLogin,
        password: passwordLogin
      });
      console.log(`signedin: ${response.data.user}`);
      history.push("/news")

    } catch (err) {
      //set the message to be presented to user
      setMessageForUser("Incorrect username or password.");
    }
    
  
  }
  //take user to regsiter page function
  const register = async () => {
    history.push("/register")
  }

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="w-50 p-5 mx-auto align-items-center">
        <div className="registration p-5">
          <form className='shadow-lg p-5 mb-5 bg-white rounded '>
            <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email"
              onChange={(e) => { setUsernameLogin(e.target.value) }}
              className="form-control"
              id="inputBorders"
              aria-describedby="emailHelp"
              placeholder="Enter email" />

          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"
              onChange={(e) => { setPasswordLogin(e.target.value) }}
              className="form-control"
              id="inputBorders"
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