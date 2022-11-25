import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoaderAPI from "../LoaderAPI";
import NavbarSecondary from "../navbar/NavbarSecondary";

const UserProfile = () => {

    let history = useHistory();

    const getUsername = localStorage.getItem("username");
    const [loggedIn_username, setLoggedIn_username] = useState(() => getUsername);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    //get user info
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.post("/profile", {
                    username: getUsername,
                });

                setLoggedIn_username(response.data.data.user.username);
                setFirstname(response.data.data.user.useremail);
                setLastname(response.data.data.user.password);

            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    });

    const backToList = async () => {
        history.push("/news");
    }
    const updateProfile = async () => {

    }

    return (
        <>
            <div>
                <NavbarSecondary />
            </div>

            <div className='container'>
                <div className="w-100 mt-5 mx-auto">
                    <button type="submit"
                        onClick={backToList}
                        className="btnProfile btn btn-primary"
                    >
                        Go to news list
                    </button>
                    <div className="profilePic">
                        <div className="profileForm">
                            <form className='shadow-lg p-5 mb-5 bg-white rounded '>
                                <div className=" form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6"> Username </label>
                                    <input className="inputBorders form-control"
                                        rows="1"
                                        value={loggedIn_username}
                                        onChange={(e) => { setLoggedIn_username(e.target.value) }}
                                        placeholder="username" />
                                </div>

                                <div className="userFirstName form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6"> First name  </label>
                                    <input className="inputBorders form-control"
                                        rows="1"
                                        value={firstname}
                                        onChange={(e) => { setFirstname(e.target.value) }}
                                        placeholder="Firstname" />
                                </div>

                                <div className="userLastName form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6"> Last name </label>
                                    <textarea className="inputBorders form-control"
                                        id=""
                                        rows="1"
                                        value={lastname}
                                        onChange={(e) => { setLastname(e.target.value) }}
                                        placeholder="Lastname"
                                    >
                                    </textarea>
                                </div>
                                <br />
                                <button type="submit"
                                    onClick={updateProfile}
                                    className="login_button btn btn-primary">
                                    Save changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default UserProfile;

