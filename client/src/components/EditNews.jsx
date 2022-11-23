import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { NewsContext } from "../context/NewsContext";
import LoaderAPI from "./LoaderAPI";
import NavbarSecondary from "./NavbarSecondary";

const EditNews = (e) => {

  let history = useHistory();

  const { id } = useParams();
  const { selectedNews, setSelectedNews } = useContext(NewsContext);

  const [updatedBody, setUpdatedBody] = useState(() => selectedNews);
  const [updatedTitle, setUpdatedTitle] = useState(() => selectedNews);
  const [updatedAuthor, setUpdatedAuthor] = useState(() => selectedNews);
  const [updatedCategory, setUpdatedCategory] = useState(() => selectedNews)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await LoaderAPI.get(`/news/${id}`);
        setSelectedNews(response.data.data);

        setUpdatedTitle(response.data.data.news.news_title);
        setUpdatedBody(response.data.data.news.news_body);
        setUpdatedAuthor(response.data.data.news.news_author);
        setUpdatedCategory(response.data.data.news.news_category);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, setSelectedNews]);

  const submitEdit = async (e) => {
    e.preventDefault();
    try {

      // eslint-disable-next-line no-unused-vars
      const response = await LoaderAPI.post(`/news/${id}/editNews`, {
        news_id: id,
        news_title: updatedTitle,
        news_body: updatedBody,
        news_author: updatedAuthor,
        news_category: updatedCategory
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
            <NavbarSecondary />
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
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="textAreaExample6">
                    Title
                  </label>
                  <textarea className="form-control"
                    id="inputBorders"
                    rows="1"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}></textarea>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="textAreaExample6"> News </label>
                  <textarea className="form-control"
                    id="inputBorders"
                    rows="3"
                    value={updatedBody}
                    onChange={(e) => setUpdatedBody(e.target.value)}></textarea>
                </div>

                <div className="newsAuthorTextArea form-outline mb-4">
                  <label className="form-label" htmlFor="textAreaExample6">Author </label>
                  <input className="form-control"
                    id="inputBorders"
                    rows="1"
                    value={updatedAuthor}
                    onChange={(e) => setUpdatedAuthor(e.target.value)}/>
                </div>

                <div class="newsCategoryTextarea form-outline w-50 mb-4">
                  <label class="form-label" htmlFor="textAreaExample6">
                    Category
                  </label>
                  <select
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                    className="inputBorders custom-select"
                  >
                    <option value="General">General</option>
                    <option value="Tech">Tech</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Cuisine">Cuisine</option>
                    <option value="Politics">Politics</option>
                  </select>
                </div>

                <button type="submit"
                  onClick={submitEdit}
                  className="login_button btn btn-primary"
                >
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

export default EditNews;