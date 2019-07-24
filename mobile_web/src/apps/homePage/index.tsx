import * as React from 'react';
import {
  RouteComponentProps,
  Redirect,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import Home from './pages/home';
import HomeDetail from './pages/home/detail';
import Contact from './pages/contact';
import LeaveMessage from './pages/leaveMessage';
import Result from './pages/leaveMessage/result';
import About from './pages/about';

interface IProps extends RouteComponentProps {
  match: any;
}

class HomePage extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Redirect
          exact
          from={`${this.props.match.url}`}
          to={`${this.props.match.url}/home`}
        />
        <Route
          exact
          path={`${this.props.match.url}/home`}
          component={Home}
        />
        <Route
          path={`${this.props.match.url}/home/detail`}
          component={HomeDetail}
        />
        <Route
          path={`${this.props.match.url}/contact`}
          component={Contact}
        />
        <Route
          exact
          path={`${this.props.match.url}/leaveMessage`}
          component={LeaveMessage}
        />
        <Route
          path={`${this.props.match.url}/leaveMessage/result`}
          component={Result}
        />
        <Route
          path={`${this.props.match.url}/about`}
          component={About}
        />
      </Switch>
    );
  }
}

export default withRouter(HomePage);