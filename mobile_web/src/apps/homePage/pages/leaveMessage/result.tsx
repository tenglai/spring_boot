import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Result as ResultComp, Icon, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import './index.less';

interface IProps extends RouteComponentProps<any> {
  //
}

interface IState {
  //
}

class Result extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div className="result_content">
      <ResultComp
        img={<Icon type="check-circle" className="spe" style={{ fill: '#1F90E6' }} />}
        title="留言提交成功"
        message="所提交内容已收到,我司会尽快安排专业人员与您联系"
      />
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onClick={() => this.props.history.push('/homePage/home')}>返回首页</Button>
      </WingBlank>
    </div>
  }
}

export default withRouter(Result);