import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from '../../store.js';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import styled from 'styled-components';

import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import Movie from '../Movie/Movie';
import Error from '../Error/Error';

const Wrapper = styled.div`
    padding: 0 15px;
    margin-top: 15px;
    @media (min-width: 1024px) {
      margin: 0 auto;
      margin-top: 15px;
      max-width: 1024px;
    }
`;

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle/>
        <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Header/>
            <Wrapper>
              <Switch>
                    <Route exact path="/" component={MovieList}/> 
                    <Route exact path="/movie/:id" component={Movie}/> 
                    <Route component={Error} />
              </Switch>
            </Wrapper>
          </BrowserRouter>
        </Provider>
      </>
    );
  }
}

export default App;
