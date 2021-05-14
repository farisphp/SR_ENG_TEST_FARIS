import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import SignerIndex from './components/signer/Index';

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <Switch>
        <Route path={'/'} exact component={SignerIndex} />
      </Switch>
    );
  }
}
export default withRouter(App);