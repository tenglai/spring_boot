import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { NavBar, Icon, List } from 'antd-mobile';
import Name from 'Images/about_us/name.png';
import Contact from 'Images/about_us/contact.png';
import Phone from 'Images/about_us/phone.png';
import Hotline from 'Images/about_us/hotline.png';
import Fax from 'Images/about_us/fax.png';
import Email from 'Images/about_us/email.png';
import Address from 'Images/about_us/address.png';
import './index.less';

const Item = List.Item;
const Brief = Item.Brief;

interface IProps extends RouteComponentProps<any> {
  //
}

interface IState {
  //
}

class About extends React.Component<IProps, IState> {
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
      >关于我们</NavBar>
      <List renderHeader={() => '详细信息'}>
        <Item align="top" thumb={Name} multipleLine>
          名称 <Brief>工业线缆行业资源平台</Brief>
        </Item>
        <Item align="top" thumb={Contact} multipleLine>
          联系人 <Brief>李先生</Brief>
        </Item>
        <Item align="top" thumb={Phone} multipleLine>
          电话 <Brief>0755-88888888</Brief>
        </Item>
        <Item align="top" thumb={Hotline} multipleLine>
          服务热线 <Brief>13666666666</Brief>
        </Item>
        <Item align="top" thumb={Fax} multipleLine>
          传真 <Brief>0755-88888888</Brief>
        </Item>
        <Item align="top" thumb={Email} multipleLine>
          E-mail <Brief>13666666666@139.com</Brief>
        </Item>
        <Item align="top" thumb={Address} multipleLine>
          地址 <Brief>深圳市宝安区沙井街道</Brief>
        </Item>
      </List>
    </div>
  }
}

export default withRouter(About);