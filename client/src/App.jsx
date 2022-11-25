import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NewsContextProvider } from './contextProvider/NewsContext';
import Register from './components/user/Register';
import Login from './components/user/Login';
import UserProfile from './components/user/UserProfile';
import AddNews from './components/news/AddNews';
import Landing from './components/Landing';
import EditNews from './components/news/EditNews';
import NewsList from './components/news/NewsList';

const App = () => {

    return (
        <NewsContextProvider>
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={ Landing } />
                        <Route exact path="/login" component={ Login } />
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/news" component={ NewsList } />
                        <Route exact path="/news/addNews" component={ AddNews } />
                        <Route exact path="/news/:id" component={ EditNews } />
                        <Route exact path="/user" component={ UserProfile } />
                    </Switch>
                </Router>
            </div>
        </NewsContextProvider>
    )
}

export default App;