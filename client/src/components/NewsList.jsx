import React, { useEffect, useContext } from 'react';
import LoaderAPI from "./LoaderAPI";
import { NewsContext } from '../context/NewsContext';
import { useHistory } from "react-router-dom";

import NavbarSecondary from './NavbarSecondary';
import './style.css'

const NewsList = () => {

    let history = useHistory();

    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");

    const { news, setNews } = useContext(NewsContext);

    useEffect(() => {
        if (getUsername == null || getPassword == null) {
            history.push("/");
        }
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.get("/news");
                setNews(response.data.data.news);
                console.log(`setNews: ${response.data.data}`);
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
                <table className="table"><thead><tr><th scope='col'></th></tr></thead></table>
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