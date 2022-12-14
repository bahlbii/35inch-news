import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import LoaderAPI from "../LoaderAPI";
import { NewsContext } from '../NewsContext';
import NavbarSecondary from '../navbar/NavbarSecondary';
import '../../css/style.css'

const NewsList = () => {

    let history = useHistory();

    const getUsername = localStorage.getItem("username");
    const getPassword = localStorage.getItem("password");

    const { news, setNews } = useContext(NewsContext);

    //filter setter
    const [filterBy, setFilterBy] = useState("");

    useEffect(() => {
        if (getUsername == null || getPassword == null) {
            history.push("/");
        }
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.get("/news");
                setNews(response.data.data.news);
            } catch (err) {
                console.error(err.message);
            }
        }
        fetchData();
    }, []);

    //apply filter
    const handleFilterSelection = async (e) => {
        try {

            //select category
            setFilterBy(e.target.value);
        } catch (err) {
            console.error(err.message);
        }
    }

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

            {/* filter by category selection*/}
            <div className='container'>
                <div className="filterByText form-outline w-50 mb-4">
                    <label className="form-className" htmlFor="textAreaExample6">
                        Filter by Category
                    </label>
                    <select
                        onChange={handleFilterSelection}
                        className="inputBorders custom-select"
                    >
                        <option value="" >All</option>
                        <option value="General">General</option>
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
                    {news && news.filter(news => news.news_category.includes(filterBy)).map((news) => {
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
                                                {news.news_body.slice(0, 200)}
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