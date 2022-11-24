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

  //get userEmail and password from the request body of the register api call
  const userName = req.body["userNameRegister"];
  const userEmail = req.body["userEmailRegister"];
  const password = req.body["passwordRegister"];

  //create necessary tables at first
  let sqlUsersTable = 'CREATE TABLE IF NOT EXISTS users (user_id SERIAL NOT NULL PRIMARY KEY, userName VARCHAR(50) NOT NULL, userEmail VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);';
  const createUsersTable = await db.query(sqlUsersTable, null);

  //create necessary tables at first
  let sqlNewsTable = 'CREATE TABLE IF NOT EXISTS news_table (news_id SERIAL NOT NULL PRIMARY KEY, news_title TEXT NOT NULL, news_body TEXT NOT NULL, news_author VARCHAR(50) NOT NULL, news_category VARCHAR(8) NOT NULL);';
  const createNewsTable = await db.query(sqlNewsTable, null);

  //send userEmail and password as a query parameters
  const regUser = await db.query("INSERT INTO users ( userName, userEmail, password) VALUES ($1, $2, $3)", [
    userName, userEmail, password
  ])

  res.send("success")
});

//Post Route to login
app.post("/api/login", async (req, res) => {
  //get userEmail and password from the request body of the login api call
  const usercred = req.body.userEmail;
  const password = req.body.password;

  try {
    // login page
    let sqlLogin = 'SELECT * FROM users WHERE (useremail = $1 OR username = $1) AND password = $2;'
    const loginUser = await db.query(sqlLogin, [
      usercred, password]);

    if (loginUser.rowCount === 1) {
      res.status(200).json({
        status: "success",
        data: {
          user: loginUser.rows[0],
        },
      });
      console.log(loginUser.rows[0])
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

    // const totalNews = await db.query("SELECT * FROM news_table WHERE news_category = 'Tech' ORDER BY news_id DESC");
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
    console.log(aNews.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ROUTE: get a user with id
app.post("/api/user", async (req, res) => {
  try {
    const username = req.body.username;

    const aUser = await db.query("SELECT * FROM users WHERE username = $1",[
      username
    ]);
    res.status(200).json({
      status: "success",
      data: {
        user: aUser.rows[0]
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//POST ROUTE: add a news
app.post("/api/news/addNews", async (req, res) => {

  const news_title = req.body["news_title"];
  const news_author = req.body["news_author"];
  const news_body = req.body["news_body"];
  const news_category = req.body["news_category"];

  try {
    const addedNews = await db.query(
      "INSERT INTO news_table (news_title, news_body, news_author, news_category) VALUES ($1, $2, $3, $4);",
      [news_title, news_body, news_author, news_category]
    );

    res.status(201).json({
      status: "success",
      data: {
        addedNews: addedNews.rows[0],
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

// // get filtered news
// app.get("/api/news/sthsth")
// const totalNews = await db.query("SELECT * FROM news_table WHERE news_category = $1 ORDER BY news_id DESC", [
//   req.body.filter
// ]);

//POST ROUTE: add a update to a news 

app.post("/api/news/:id/editNews", async (req, res) => {
  try {
    const updateNews = await db.query(
      "UPDATE news_table SET news_title = $1, news_body = $2, news_author = $3, news_category = $4 WHERE news_id = $5 RETURNING *;",
      [req.body.news_title, req.body.news_body, req.body.news_author, req.body.news_category, req.body.news_id]
    )

    res.status(201).json({
      status: "success",
      data: {
        updatedNews: updateNews.rows[0],
      },
    });
    console.log(`updatedNews: ${updateNews.rows[0]}`);
  } catch (err) {
    console.log(err);
  }
});

//POST ROUTE: update user profile 
// app.post("/api/news/editUser", async (req, res) => {
//   try {
//     const updateNews = await db.query(
//       "UPDATE users SET username = $1, password = $2 WHERE user_id = $3 RETURNING *;",
//       [req.body.username, req.body.password, req.body.user_id]
//     )

//     res.status(201).json({
//       status: "success",
//       data: {
//         updatedNews: updateNews.rows[0],
//       },
//     });
//     console.log(`updatedNews: ${updateNews.rows[0]}`);
//   } catch (err) {
//     console.log(err);
//   }
// });

// use .env file to get the default port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});