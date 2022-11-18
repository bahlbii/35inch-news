import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import LoaderAPI from "../components/LoaderAPI";
import Navbar from "../components/Navbar";

const NewsEditPage = (e) => {
  const { id, news_body } = useParams();
  const [updatedBody, setUpdatedBody] = useState("");
  const { selectedNews, setSelectedNews } = useContext(NewsContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LoaderAPI.get(`/news/${id}`);
        setSelectedNews(response.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const submitEdit = async (e) => {

    e.preventDefault(); //prevent page from refreshing
    try {
      const response = await LoaderAPI.post(`/news/${id}/editNews`, { //editNews toFix
        id,
        news_body: news_body,
      });

      console.log(`param id: ${id}`);
      console.log(`param body: ${updatedBody}`);

      window.location.reload(false); //refreshes the web page after task
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <div>
      {selectedNews && (
        <>
          <div>
            <Navbar />
          </div>
          <div className="container">
            <div className="card" >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">
                  {selectedNews.news.news_id} - click on news to edit.
                </h6>
                <hr></hr>

                <h4 className=" text-primary"
                  contentEditable="true"
                  onInput={e => setUpdatedBody(e.target.value)}
                >
                  {selectedNews.news.news_body}
                </h4>






                <hr></hr>
                <button type="submit"
                  onClick={submitEdit}
                  className="btn btn-primary">
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