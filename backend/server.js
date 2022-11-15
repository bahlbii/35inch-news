const dotenv = require("dotenv").config(); //environment library to use .env files
const express = require("express")
const app = express();
const cors = require("cors") //nodejs library for cross-origin resource sharing
const db = require("./db")
const { spawn } = require('child_process');

//middleware
app.use(cors());
app.use(express.json());

//POST ROUTE to register user
app.post("/api/register", async (req, res) => {

  const username = req.body["usernameRegister"];
  const password = req.body["passwordRegister"];

  const regUser = await db.query("INSERT INTO users ( username, password) VALUES ($1, $2)", [
    username, password
  ])

  res.send("success")
})

//Post Route to login
app.post("/api", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  try {
    const loginUser = await db.query("SELECT * FROM Users WHERE username = $1 AND password = $2", [
      username, password]);

    if (loginUser.rowCount === 1) {
      res.status(200).json({
        status: "success",
        data: {
          user: loginUser.rows[0]
        },
      });
    }
    else {
      res.status(404).json({
      });
    }


  } catch (err) {
    console.log(err.message)
  }

});

//GET ROUTE: get all news in the database
app.get("/api/news", async (req, res) => {
  try {
    const totalNews = await db.query("SELECT * FROM news_table ORDER BY news_id ASC");

    res.status(200).json({
      status: "success",
      results: totalNews.rows.length,
      data: {
        news: totalNews.rows,
      }
    })
  } catch (err) {
    console.error(err.message);
  }
});

//GET ROUTE: get a news with id
app.get("/api/news/:id", async (req, res) => {
  try {

    //get news data
    const { id } = req.params;
    const aNews = await db.query("SELECT * FROM news_table WHERE news_id = $1", [
      id
    ]);
    res.status(200).json({
      status: "success",
      data: {
        news: aNews.rows[0]
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//add a news /addNews
//POST ROUTE: add a rating to a news 
app.post("/api/addNews", async (req, res) => {

  const news_body = req.body["news_body"];
  const news_author = req.body["news_author"];
  try {
    const singleRating = await db.query(
      "INSERT INTO news_table (news_body, news_author) VALUES ($1, $2);",
      [news_body, news_author]
    );

    res.status(201).json({
      status: "success",
      data: {
        rating: singleRating.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//POST ROUTE: add a rating to a news toFix
app.post("/api/news/:id/rateTweet", async (req, res) => {
  try {
    const singleRating = await db.query(
      "INSERT INTO Ratings (news_id, news_body, news_author) VALUES ($1, $2, $3) RETURNING *;",
      [req.params.news_id, req.body.news_body, req.body.news_author]
    );

    res.status(201).json({
      status: "success",
      data: {
        rating: singleRating.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});