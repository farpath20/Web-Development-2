import React from 'react';
import logo from './img/tvm-header-logo.png';
import './App.css';
import pokemonList from './components/pokemonList';
import pokemon from './components/pokemons';
import trainer from './components/trainer';
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
          </h1>
          <Link className='showlink' to='/'>
            Home
          </Link>
          <Link className='showlink' to='/trainers'>
            Trainers
          </Link>
          <Link className='showlink' to='/pokemon/page/1'>
            Pokemon
          </Link>
        </header>
        <br />
        <br />
        <div className='App-body'>
          <Switch>
          <Route exact path='/' component={Home} />
					<Route exact path='/pokemon/page/:pagenum' component={pokemonList} />
					<Route exact path='/pokemon/:id' component={pokemon} />
          <Route exact path='/trainer' component={trainer} />
          <Route component={errorPage} />
          </Switch>

        </div>
      </div>
    </Router>
  );
};

export default App;
