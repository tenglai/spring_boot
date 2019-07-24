import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { NavBar, Icon, InputItem, TextareaItem, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less';

interface IProps extends RouteComponentProps<any> {
  form: any;
}

interface IState {
  //
}

class LeaveMessage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      //
    };
  }

  handleSubmit = () => {
    this.props.form.validateFields((errors: any, values: any) => {
      if (!errors) {
        console.log(values);
      }
    });

    // this.props.history.push('/homePage/leaveMessage/result');
  }

  public render() {
    const { getFieldProps } = this.props.form;
    return <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => this.props.history.goBack()}
      >留言</NavBar>
      <InputItem
        {...getFieldProps('user', {
          rules: [{ required: true }]
        })}
        clear
        placeholder="请输入您的姓名"
      >姓名</InputItem>
      <InputItem
        {...getFieldProps('mobile', {
          rules: [{ required: true }]
        })}
        clear
        placeholder="请输入您的联系方式"
      >联系方式</InputItem>
      <InputItem
        {...getFieldProps('mail', {
          rules: [{ required: true }]
        })}
        clear
        placeholder="请输入您的邮箱"
      >邮箱</InputItem>
      <TextareaItem
        {...getFieldProps('message', {
          rules: [{ required: true }]
        })}
        title="留言"
        placeholder="请输入您的留言"
        rows={5}
        autoHeight
      />
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
      </WingBlank>
    </div>
  }
}

const LeaveMessageWrapper = createForm<IProps>()(LeaveMessage);

export default withRouter(LeaveMessageWrapper);