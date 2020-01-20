import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import BasicLayout from "./layouts/BasicLayout";
import menu from './menu';

const App: React.FC = () => {
  return <HashRouter>
    <Switch>
      <Route path="*">
        <BasicLayout menu={menu} />
      </Route>
    </Switch>
  </HashRouter>;
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
