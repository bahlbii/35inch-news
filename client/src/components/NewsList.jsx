import React, { useEffect, useContext } from 'react';
import LoaderAPI from "./LoaderAPI";
import { NewsContext } from '../context/NewsContext';
import { useHistory, useParams } from "react-router-dom";
import Navbar from './Navbar';
import './style.css'

const NewsList = (props) => {
    const { news, setNews } = useContext(NewsContext);
    let history = useHistory();
    const {id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await LoaderAPI.get("/news");
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
    const handleAddNews = async (e) => {
        history.push('/news/addNews')
    }
    //delete news button
    const handleDeleteNews = async (news_id) => {
        const id = news_id;
        try {
            const response = await LoaderAPI.delete(`/news/${news_id}`, {
                id
            });

        } catch (err) {
            console.err(err);
        }
        history.push('/news')
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='list-group'>
                    <div className='mb-2'>
                        <button
                            type="submit"
                            onClick={handleAddNews}
                            className="btn btn-primary float-right"
                        >
                            Add News
                        </button>
                    </div>
                    <table className="table table-bordered table-hover table-striped table-dark">
                        <thead className='tableHeader'>
                            <tr className="tableHeader">
                                <th scope='col'>ID</th>
                                <th scope='col' className="w-75">News</th>
                                <th scope='col' className="w-auto">Author</th>
                                <th scope='col' className="w-auto"></th>
                                <th scope='col' className="w-auto"></th>
                            </tr>
                        </thead>
                        <tbody >

                            {news && news.map(news => {
                                return (
                                    <tr key={news.news}>
                                        <td>{news.news_id}</td>
                                        <td>{news.news_body}</td>
                                        <td>{news.news_author}</td>
                                        <td><button className="btn btn-link"
                                            onClick={() => handleEditButton(news.news_id)}
                                        >
                                            Edit
                                        </button>
                                        </td>
                                        <td><button className="btn btn-link"
                                            onClick={() => handleDeleteNews(news.news_id)}
                                        >
                                            Delete
                                        </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default NewsList;