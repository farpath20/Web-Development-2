import React from 'react';
import logo from './img/tvm-header-logo.png';
import './App.css';
import characterList from './components/characterList';
import characters from './components/characters';
import comicsList from './components/comicList';
import comics from './components/comic';
import seriesList from './components/seriesList';
import series from './components/series';
import Home from './components/Home';
import errorPage from './components/errorPage';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>
            Welcome to the React.js TV Maze API Example
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/characters/page/0'>
            Characters
          </Link>
          <Link className='showlink' to='/comics/page/0'>
            Comic
          </Link>
          <Link className='showlink' to='/series/page/0'>
            Series
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Switch>
          <Route exact path='/' component={Home} />
					<Route exact path='/characters/page/:pagenum' component={characterList} />
					<Route exact path='/characters/:id' component={characters} />
          <Route exact path='/series/page/:pagenum' component={seriesList} />
					<Route exact path='/series/:id' component={series} />
          <Route exact path='/comics/page/:pagenum' component={comicsList} />
					<Route exact path='/comics/:id' component={comics} />
          <Route component={errorPage} />
          </Switch>

        </div>
      </div>
    </Router>
  );
};

export default App;
