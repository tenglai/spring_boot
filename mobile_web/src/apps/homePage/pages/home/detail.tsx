import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import './index.less';

interface IProps extends RouteComponentProps<any> {
  //
}

interface IState {
  //
}

class Detail extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >详情</NavBar>
      <div>暂无数据</div>
    </div>
  }
}

export default withRouter(Detail);