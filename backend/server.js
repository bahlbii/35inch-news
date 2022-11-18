const dotenv = require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors") //nodejs library for cross-origin resource sharing
const db = require('./elephantsql'); //for elephant

//middleware
app.use(cors());
app.use(express.json());

//POST ROUTE to register user
app.post("/api/register", async (req, res) => {

  //get username and password from the request body of the register api call
  const username = req.body["usernameRegister"];
  const password = req.body["passwordRegister"];

  //create necessary tables at first
  let sqlUsersTable = 'CREATE TABLE IF NOT EXISTS users (user_id SERIAL NOT NULL PRIMARY KEY, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);';
  const createUsersTable = await db.query(sqlUsersTable, null);

  //create necessary tables at first
  let sqlNewsTable = 'CREATE TABLE IF NOT EXISTS news_table (news_id SERIAL NOT NULL PRIMARY KEY, news_body VARCHAR(50) NOT NULL, news_author VARCHAR(50) NOT NULL);';
  const createNewsTable = await db.query(sqlNewsTable, null);

  //send username and password as a query parameters
  const regUser = await db.query("INSERT INTO users ( username, password) VALUES ($1, $2)", [
    username, password
  ])

  res.send("success")
});

//Post Route to login
app.post("/api/login", async (req, res) => {
  //get username and password from the request body of the login api call
  const username = req.body.username;
  const password = req.body.password;

  try {
    // login page
    let sqlLogin = 'SELECT * FROM users WHERE username = $1 AND password = $2;'
    const loginUser = await db.query(sqlLogin, [
      username, password]);

    if (loginUser.rowCount === 1) {
      res.status(200).json({
        status: "success",
        data: {
          user: loginUser.rows[0].username
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
    const totalNews = await db.query("SELECT * FROM news_table ORDER BY news_id DESC");

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

//POST ROUTE: add a news
app.post("/api/news/addNews", async (req, res) => {

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

//DELETE ROUTe: delete a news
app.delete("/api/news/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const aNews = await db.query("DELETE FROM news_table WHERE news_id = $1", [
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

//POST ROUTE: add a rating to a news toFix
app.post("/api/news/:id/editNews", async (req, res) => {
  try {
    // const singleRating = await db.query(
    //   "INSERT INTO Ratings (news_id, news_body, news_author) VALUES ($1, $2, $3) RETURNING *;",
    //   [req.params.news_id, req.body.news_body, req.body.news_author]
    // );
    const updateNews = await db.query(
      "UPDATE news_table SET news_body = $1 WHERE news_id = $2 RETURNING *;",
      [req.body.news_body, req.params.id]
    )

    res.status(201).json({
      status: "success",
      data: {
        rating0: updateNews.rows[0],
      },
    });
    console.log(status);
  } catch (err) {
    console.log(err);
  }
});

// use .env file to get the default port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});