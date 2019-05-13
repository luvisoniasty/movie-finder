import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../../store.js';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Header/>
          <Switch>
                <Route exact path="/" component={MovieList}/> 
                <Route exact path="/movie/:id" component={Movie}/> 
                <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
