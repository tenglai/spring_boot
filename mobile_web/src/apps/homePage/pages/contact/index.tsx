import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { NavBar, Icon, NoticeBar, Steps, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import stepFirst from 'Images/step_first.png';
import stepSecond from 'Images/step_second.png';
import stepThird from 'Images/step_third.png';
import './index.less';

const Step = Steps.Step;

interface IProps extends RouteComponentProps<any> {
  //
}

interface IState {
  marqueeProps: any;
}

class Contact extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      marqueeProps: {
        loop: true,
        style: { padding: '0 7.5px' }
      }
    };
  }

  public render() {
    const { marqueeProps } = this.state;
    return <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >联系我们</NavBar>
      <NoticeBar marqueeProps={marqueeProps}>
        通知: 预计“山竹”将于16日下午到夜间在台山到徐闻之间沿海地区登陆，受其影响，我市15日夜间起风力逐渐加大，16日将有狂风暴雨，平均风力将加大至9～10级，阵风11～13级，过程累积雨量有暴雨到大暴雨，局部特大暴雨。
      </NoticeBar>
      <WingBlank size="lg">
        <div className="sub-title">步骤</div>
        <Steps>
          <Step status="process" title="注册/登录帐号" icon={<img src={stepFirst} alt="" />} />
          <Step status="process" title="填写客户信息" icon={<img src={stepSecond} alt="" />} />
          <Step status="finish" title="等待回复" icon={<img src={stepThird} alt="" />} />
        </Steps>
        <WhiteSpace />
        <Button type="primary" onClick={() => this.props.history.push('/homePage/leaveMessage')}>留言</Button>
      </WingBlank>
    </div>
  }
}

export default withRouter(Contact);