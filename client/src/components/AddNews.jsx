import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import LoaderAPI from './LoaderAPI';
import NavbarSecondary from './NavbarSecondary';

const AddNews = () => {

    let history = useHistory();

    //state for controlling login process
    const [news_title, setNews_title] = useState("");
    const [news_body, setNews_body] = useState("");
    const [news_author, setNews_author] = useState("");
    const [news_category, setNews_category] = useState(() => "Tech");

    //get state from form, send it to database as query
    const addnews = async (e) => {
        e.preventDefault(); //prevent page from refreshing
        try {
            const response = await LoaderAPI.post(`/news/addNews`, { //toFix
                news_title,
                news_body,
                news_author,
                news_category,
            });
            history.push("/news/addNews")

        } catch (err) {
            console.err(err);
        }
        history.push("/news");

    }
    //send user to homepage of news list
    const backToList = async (e) => {
        history.push("/news");
    }

    return (
        <><div>
            <NavbarSecondary />
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
                            <div class="form-outline mb-4">
                                <label class="form-label" for="textAreaExample6">
                                    Title
                                </label>
                                <textarea class="inputBorders form-control"
                                    rows="1"
                                    onChange={(e) => { setNews_title(e.target.value) }}
                                    placeholder="Enter news title"
                                >
                                </textarea>
                            </div>

                            <div class="form-outline mb-4">
                                <label class="form-label" for="textAreaExample6">
                                    News
                                </label>
                                <textarea class="inputBorders form-control"
                                    rows="4"
                                    onChange={(e) => { setNews_body(e.target.value) }}
                                    placeholder="Write your news here"
                                >
                                </textarea>
                            </div>
                            <div class="newsAuthorTextArea form-outline mb-4">
                                <label class="form-label" for="textAreaExample6">
                                    Author
                                </label>
                                <textarea class="inputBorders form-control"
                                    id=""
                                    rows="1"
                                    onChange={(e) => { setNews_author(e.target.value) }}
                                    placeholder="Enter author's name"
                                >
                                </textarea>
                            </div>

                            <div class="newsCategoryTextarea form-outline mb-4">
                                <label class="form-label" for="textAreaExample6">
                                    Category
                                </label>
                                <select
                                    // value={rating_category2}
                                    onChange={(e) => { setNews_category(e.target.value) }}
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