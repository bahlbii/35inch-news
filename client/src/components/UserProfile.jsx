import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import LoaderAPI from "./LoaderAPI";
import NavbarSecondary from "./NavbarSecondary";

const UserProfile = (e) => {

    let history = useHistory();

    const { id } = useParams();

    //context for which user login
    const { user, setUser } = useContext(NewsContext);

    const [firstName, setFirstName] = useState(() => user);
    const [lastName, setLastName] = useState(() => user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.get(`/user/${id}`);
                setUser(response.data.data);
                setFirstName(response.data.data.user.username);
                setLastName(response.data.data.user.useremail)

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    });

    //send user to homepage of news list
    const backToList = async (e) => {
        history.push("/news");
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
                        className="btn btn-primary"
                    >
                        Go to news list
                    </button>
                    <div className="profilePic">
                        <img src="./demo-images/1homepage.png" alt="profile" />
                        <div className="profileForm">
                            <form className='shadow-lg p-5 mb-5 bg-white rounded '>
                                <div className="userFirstName form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6"> First name </label>
                                    <input className="inputBorders form-control"
                                        rows="1"
                                        value={firstName}
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                        placeholder="First name" />
                                </div>

                                <div className="userLastName form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6">
                                        Last name
                                    </label>
                                    <input className="inputBorders form-control"
                                        rows="1"
                                        value={lastName}
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        placeholder="Last name" />
                                </div>

                                <div className="newsAuthorTextArea form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6">
                                        Author
                                    </label>
                                    <textarea className="inputBorders form-control"
                                        id=""
                                        rows="1"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                        placeholder="Enter author's name"
                                    >
                                    </textarea>
                                </div>

                                <div className="newsCategoryTextarea form-outline mb-4">
                                    <label className="form-label" htmlFor="textAreaExample6">
                                        Category
                                    </label>
                                    <select
                                        // value={rating_category2}
                                        // onChange={(e) => { setNews_category(e.target.value) }}
                                        className="inputBorders custom-select"
                                    >
                                        <option value="General" >General</option>
                                        <option value="Tech">Tech</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Cuisine">Cuisine</option>
                                        <option value="Politics">Politics</option>
                                    </select>
                                </div>
                                <br />
                                <button type="submit"
                                    // onClick={addnews}
                                    className="login_button btn btn-primary">
                                    Save changes
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* <div className="registration ">
                        <button type="submit"
                            onClick={backToList}
                            className="btn btn-primary">
                            {"Go to news list"}
                        </button>
                        <form className='shadow-lg p-5 mb-5 bg-white rounded '>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="textAreaExample6">
                                    Title
                                </label>
                                <textarea className="inputBorders form-control"
                                    rows="1"
                                    // onChange={(e) => { setNews_title(e.target.value) }}
                                    placeholder="Enter news title"
                                >
                                </textarea>
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="textAreaExample6">
                                    News
                                </label>
                                <textarea className="inputBorders form-control"
                                    rows="4"
                                    // onChange={(e) => { setNews_body(e.target.value) }}
                                    placeholder="Write your news here"
                                >
                                </textarea>
                            </div>
                            <div className="newsAuthorTextArea form-outline mb-4">
                                <label className="form-label" htmlFor="textAreaExample6">
                                    Author
                                </label>
                                <textarea className="inputBorders form-control"
                                    id=""
                                    rows="1"
                                    // onChange={(e) => { setNews_author(e.target.value) }}
                                    placeholder="Enter author's name"
                                >
                                </textarea>
                            </div>

                            <div className="newsCategoryTextarea form-outline mb-4">
                                <label className="form-label" htmlFor="textAreaExample6">
                                    Category
                                </label>
                                <select
                                    // value={rating_category2}
                                    // onChange={(e) => { setNews_category(e.target.value) }}
                                    className="inputBorders custom-select"
                                >
                                    <option value="General" >General</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Cuisine">Cuisine</option>
                                    <option value="Politics">Politics</option>
                                </select>
                            </div>
                            <br />
                            <button type="submit"
                                // onClick={addnews}
                                className="login_button btn btn-primary">
                                Submit News
                            </button>
                        </form>
                    </div> */}
                </div>
            </div>
        </>
    )
};

export default UserProfile;

