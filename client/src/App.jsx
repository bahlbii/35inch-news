import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewsEditPage from './routes/NewsEditPage';
import Home from './routes/Home';
import { NewsContextProvider } from './context/NewsContext';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from 'react-bootstrap/Navbar'
import AddNews from './components/AddNews';
import Landing from './components/Landing';

const App = () => {

    return (
        <NewsContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/news/addNews" component={AddNews} />
                        <Route exact path="/news" component={Home} />
                        <Route exact path="/news/:id" component={NewsEditPage} />
                    </Switch>
                </Router>
            </div>
        </NewsContextProvider>
    )
}

export default App;