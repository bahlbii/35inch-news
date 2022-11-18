import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoaderAPI from './LoaderAPI';
import Navbar from './Navbar';

const AddNews = () => {

    let history = useHistory();

    //state for controlling login process
    const [news_body, setNews_body] = useState("");
    const [news_author, setNews_author] = useState("");

    //login function
    const addnews = async (e) => {
        e.preventDefault(); //prevent page from refreshing
        try {
            const response = await LoaderAPI.post(`/news/addNews`, { //toFix
                news_body,
                news_author
            });
            history.push("/news/addNews")

        } catch (err) {
            console.err(err);
        }
        history.push("/news");

    }
    const backToList = async (e) => {
        history.push("/news");
    }

    return (
        <><div>
            <Navbar />
        </div>
            <div className='container'>
                <div className="w-100 mt-5 mx-auto">
                    <div className="registration ">
                        <button type="submit"
                            onClick={backToList}
                            className="btn btn-primary">
                            Go back to news list
                        </button>
                        <form className='shadow-lg p-5 mb-5 bg-white rounded '>
                            <div className="form-group">
                                <label htmlFor="text">Write news here</label>
                                <textarea type="text"
                                    onChange={(e) => { setNews_body(e.target.value) }}
                                    className="form-control"
                                    id="inputBorders"
                                    aria-describedby="emailHelp"
                                    placeholder="Write your news here" />
                            </div>
                            <div>
                                <input type="email"
                                    onChange={(e) => { setNews_author(e.target.value) }}
                                    className="form-control"
                                    id="inputBorders"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter author name" />
                            </div>
                            <br />
                            <button type="submit"
                                onClick={addnews}
                                className="login_button btn btn-primary">
                                Submit News
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddNews