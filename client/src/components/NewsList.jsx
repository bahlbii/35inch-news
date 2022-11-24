import React, { useEffect, useContext } from 'react';
import LoaderAPI from "./LoaderAPI";
import { NewsContext } from '../context/NewsContext';
import { useHistory } from "react-router-dom";

import NavbarSecondary from './NavbarSecondary';
import './style.css'
import { useState } from 'react';

const NewsList = () => {

    let history = useHistory();

    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");

    const { news, setNews } = useContext(NewsContext);
    const [filterBy, setFilterBy] = useState(null);

    useEffect(() => {
        if (getUsername == null || getPassword == null) {
            history.push("/");
        }
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.get("/news", [
                    filterBy
                ]);
                setNews(response.data.data.news);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchData();
    });

    //handle a click news Edit
    const handleEditButton = (news_id) => {
        history.push(`/news/${news_id}`);
    }
    //add news button
    const goToAddNews = async () => {
        history.push('/news/addNews')
    }
    //delete news button
    const handleDeleteNews = async (news_id) => {
        const id = news_id;
        try {
            /* eslint-disable no-unused-vars */
            const response = await LoaderAPI.delete(`/news/${news_id}`, {
                id
            });
            /* eslint-disable no-unused-vars */
        } catch (err) {
            console.err(err);
        }
        history.push('/news')
    }

    return (
        <>
            <div>
                <NavbarSecondary />
            </div>
            <div className='container'>
                <div className='mb-2'>
                    <button
                        type="submit"
                        onClick={goToAddNews}
                        className="btn btn-primary float-right"
                    >
                        Add News
                    </button>
                </div>
            </div>
            <div className='container'>

                <div className="form-outline w-50 mb-4">
                    <label className="filterByText form-className" htmlFor="textAreaExample6">
                        Filter by Category
                    </label>
                    <select
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="inputBorders custom-select"
                    >
                        <option value="General" className='option1'>General</option>
                        <option value="Tech">Tech</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Cuisine">Cuisine</option>
                        <option value="Politics">Politics</option>
                    </select>
                </div>

            </div>
            <div className='container'>
                <hr></hr>
                <div className="row">
                    {news && news.map((news) => {
                        return (
                            <div className="col-lg-6 mb-4" key={news.news}>
                                <div className="card">
                                    <div className='card-header'>
                                        <p className='cardHeaderAuthor'>
                                            Author: {news.news_author}
                                        </p>
                                        <span><p className="cardHeaderCategory">
                                            Category: {news.news_category}
                                        </p></span>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">{news.news_title}</h3>
                                        <p className="card-text">
                                            {news.news_body}
                                        </p>


                                        <button className="cardEditButtons btn btn-primary me-3"
                                            onClick={() => handleEditButton(news.news_id)}>
                                            Edit
                                        </button>

                                        <button className="cardEditButtons btn btn-primary me-3"
                                            onClick={() => handleDeleteNews(news.news_id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>


        </>
    )
}

export default NewsList;