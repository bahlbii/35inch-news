import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import TweetsLoaderAPI from "../components/LoaderAPI";
import Reviews from "../components/Ratings";
import AddReview from "../components/RateTweet";

const TweetDetailPage = () => {
  const { id } = useParams();
  const { selectedNews, setSelectedNews } = useContext(
    NewsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TweetsLoaderAPI.get(`/news/${id}`);
        setSelectedNews(response.data.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedNews && (
        <>
          <div>
            <div className="card" >
              <div className="card-body">
                <h6 className="card-subtitle mb-2 ">#{selectedNews.tweet.news_id} details</h6>
                <hr></hr>
                <h4 className=" text-primary " >{selectedNews.tweet.text}</h4>
                <hr></hr>

                <table className="table w-auto">
                  <tbody>
                    <tr>
                      <th scope="row">Tweeted At</th>
                      <td><h6><span className="text-muted">{selectedNews.tweet.created_at}</span></h6></td>
                    </tr>
                    <tr>
                      <th scope="row">Twitter ID</th>
                      <td><h6><span className="text-secondary">{selectedNews.tweet.id}</span></h6></td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="text-center">
            <hr></hr>
            <strong>Share your thoughts about the tweet!</strong>
            <hr></hr>

            <div>
              <AddReview />
            </div>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedNews.t_reviews} />
          </div>

        </>
      )}
    </div>
  )
};

export default TweetDetailPage;