import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import LoaderAPI from "../components/LoaderAPI";
import Navbar from "../components/Navbar";

const NewsEditPage = (e) => {

  let history = useHistory();

  const { id, news_body } = useParams();
  const { selectedNews, setSelectedNews } = useContext(NewsContext);
  const [updatedBody, setUpdatedBody] = useState(() => selectedNews);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LoaderAPI.get(`/news/${id}`);
        setSelectedNews(response.data.data);
        setUpdatedBody(response.data.data.news.news_body);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setSelectedNews]);

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoaderAPI.post(`/news/${id}/editNews`, {
        id,
        news_body: updatedBody,
      });

      
      history.push("/news")
    } catch (err) {
      console.error(err.message);
    }
  }
  //send user to homepage of news list
  const backToList = async (e) => {
    history.push("/news");
  }
  return (
    <div>
      {selectedNews && (
        <>
          <div>
            <Navbar />
          </div>
          <div className="container">
            <div>
              <button type="submit"
                onClick={backToList}
                className="goBackToNewsList btn btn-primary">
                Go back to news list
              </button>
            </div>
            <div className="card" >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">
                  {selectedNews.news.news_id} - click on news to edit.
                </h6>
                <hr></hr>

                <input type="text"
                  value={updatedBody}
                  onChange={(e) => setUpdatedBody(e.target.value)} />

                <hr></hr>

                <button type="submit"
                  onClick={submitEdit}
                  className="login_button btn btn-primary">
                  Submit Edit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
};

export default NewsEditPage;