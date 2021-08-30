import React from 'react';
import * as ReactDOM from 'react-dom';
import 'bootswatch/dist/sketchy/bootstrap.min.css';
import './styles.scss';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import rootReducer from './redux/reducers/rootReducer';
import App from './app';
import AdminCategoryContainer from './components/admin__category-container/admin__category-container';
import AdminWordsContainer from './components/admin__words-container/admin_words-container';

const history = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];
const store = createStore(rootReducer(history),
  composeWithDevTools(applyMiddleware(...middleware)));
export type RootState = ReturnType<typeof store.getState>
ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => { return (<App/>); }} key={1}/>
        <Route exact path="/category" render={() => { return (<AdminCategoryContainer/>); }} key={2}/>
        <Route path="/category/words" render={() => { return (<AdminWordsContainer/>); }} key={3}/>
        <Route path="/words/" render={() => <Redirect to="/category"/>} key={4}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
