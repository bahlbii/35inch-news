import React, { useEffect, useContext } from 'react';
import LoaderAPI from "./LoaderAPI";
import { NewsContext } from '../context/NewsContext';
import { useHistory } from "react-router-dom";

const NewsList = (props) => {
    const { news, setNews } = useContext(NewsContext);
    let history = useHistory();

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

    //handle a click on tweet row
    const handleEdit = (news_id) => {
        history.push(`/news/${news_id}`);
    }
    //add news button
    const goToAddNews = async (e) => {
        history.push('/addNews')
    }

    return (
        <div className='list-group'>
            <div className='mb-2'>
                <button
                    type="submit"
                    onClick={goToAddNews}
                    className="btn btn-primary float-right"
                >
                    Add News
                </button>
            </div>
            <table className="table table-bordered table-hover table-striped table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>news_id</th>
                        <th scope='col' className="w-75">news_body</th>
                        <th scope='col' className="w-auto">news_author</th>
                        <th scope='col' className="w-auto">Edit</th>
                        <th scope='col' className="w-auto">Delete</th>
                    </tr>
                </thead>
                <tbody >

                    {news && news.map(tweet => {
                        return (
                            <tr >
                                <td>{tweet.news_id}</td>
                                <td>{tweet.news_body}</td>
                                <td>{tweet.news_author}</td>
                                <td><button className="btn btn-warning" onClick={() => handleEdit(tweet.news_id)}>Edit</button></td>
                                <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default NewsList;