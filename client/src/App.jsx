import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TweetDetailPage from './routes/TweetDetailPage';
import Home from './routes/Home';
import { NewsContextProvider } from './context/NewsContext';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from 'react-bootstrap/Navbar'
import AddNews from './components/AddNews';

const App = () => {
    return (
        <NewsContextProvider>
            <div className="container">
                <div className="pb-5 mb-5   ">
                    <Navbar bg="dark" variant="dark" className="fixed-top">

                        <Navbar.Brand className="display-1 mx-auto ">

                            35INCH NEWS

                        </Navbar.Brand>
                    </Navbar>
                </div>
                {/* <hr></hr><hr></hr> */}
                <Router>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/addNews" component={AddNews} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/news" component={Home} />
                        <Route exact path="/news/:id" component={TweetDetailPage} />
                    </Switch>
                </Router>
            </div>
        </NewsContextProvider>
    )
}

export default App;