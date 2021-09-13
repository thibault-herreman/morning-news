import React from 'react';
// react-rooter
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';
// composants
import ScreenHome from './ScreenHome';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
// redux
import articleWishlist from './reducers/article';
import token from './reducers/token';
import selectedLang from './reducers/selectedLang';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({articleWishlist, token, selectedLang}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route component={ScreenHome} path="/" exact />
          <Route component={ScreenSource} path="/screensource" exact />
          <Route component={ScreenArticlesBySource} path="/screenarticlesbysource/:id" exact />
          <Route component={ScreenMyArticles} path="/screenmyarticles" exact />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
