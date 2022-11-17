import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import LoaderAPI from "../components/LoaderAPI";
import Reviews from "../components/Ratings";
import AddReview from "../components/RateTweet";
import { useState } from "react";

const TweetDetailPage = () => {
  const { id } = useParams();
  const [updatedBody, setUpdatedBody] = useState("");
  const { selectedNews, setSelectedNews } = useContext(
    NewsContext
  );

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

    console.log("hello from submit edit")
    e.preventDefault(); //prevent page from refreshing
    try {
      const response = await LoaderAPI.post(`/news/${id}/editNews`, { //editNews toFix
        id,
        news_boody: updatedBody
      });
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
            <div className="card" >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">
                  {selectedNews.news.news_id} - click on news to edit.
                </h6>
                <hr></hr>
                <h4 className=" text-primary"
                  contentEditable="true"
                  onChange={e => setUpdatedBody(e.target.value)}
                >
                  {selectedNews.news.news_body}
                </h4>
                {/* <form className='shadow-lg p-5 mb-5 bg-white rounded '>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="text"
                      onChange={(e) => { setUpdatedBody(e.target.value) }}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email" />

                  </div>
                </form> */}
                <hr></hr>
                <button type="submit"
                  onClick={submitEdit}
                  className="btn btn-primary">
                  Submit Edit
                </button>

                {/* <table className="table w-auto">
                  <tbody>
                    <tr>
                      <th scope="row">Tweeted At</th>
                      <td><h6><span className="text-muted">
                        {selectedNews.tweet.created_at}
                      </span></h6></td>
                    </tr>
                    <tr>
                      <th scope="row">Twitter ID</th>
                      <td><h6><span className="text-secondary">{selectedNews.news_id}</span></h6></td>
                    </tr>

                  </tbody>
                </table> */}

              </div>
            </div>
          </div>

          {/* <div className="text-center">
            <hr></hr>
            <strong>Share your thoughts about the tweet!</strong>
            <hr></hr>

            <div>
              <AddReview />
            </div>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedNews.t_reviews} />
          </div> */}

        </>
      )}
    </div>
  )
};

export default TweetDetailPage;