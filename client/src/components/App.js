import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Error404 from '../errors/Error404';
import UnexpectedError from '../errors/ErrorUnexpected';

import '../styles.css';
import AppMenu from './AppMenu';
import Support from './Support';
import Home from './Home';
import Contact from './Contact';
import Tasks from './Tasks';
import AddTask from './AddTask';
import EditTask from './EditTask';

function App() {
  return (
    <AppMenu>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route path="/contact" render={(props) => <Contact {...props} />} />
        <Route path="/tasks" render={(props) => <Tasks {...props} />} />
        <Route
          path="/organisations/:orgid"
          render={(props) => <Tasks {...props} />}
        />
        <Route path="/addtask" render={(props) => <AddTask {...props} />} />
        <Route
          path="/edittask/:id"
          render={(props) => <EditTask {...props} />}
        />
        <Route path="/support" component={Support} />
        <Route path="/unexpectederror" component={UnexpectedError} />
        <Route component={Error404} />
      </Switch>
    </AppMenu>
  );
}

export default App;
