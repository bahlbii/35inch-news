import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NewsContextProvider } from './context/NewsContext';
import Register from './components/Register';
import Login from './components/Login';
import AddNews from './components/AddNews';
import Landing from './components/Landing';
import EditNews from './components/EditNews';
import NewsList from './components/NewsList';
import UserProfile from './components/UserProfile';

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