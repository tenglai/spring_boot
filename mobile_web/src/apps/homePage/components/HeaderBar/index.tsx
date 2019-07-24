import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Popover, NavBar, Icon } from 'antd-mobile';
import ContactUs from 'Images/contact_us.png';
import AboutUs from 'Images/about_us.png';
import './index.less';

const Item: any = Popover.Item;

interface IProps extends RouteComponentProps<any> {
  title: string;
}

interface IState {
  visible: boolean;
  selected: string;
}

class HeaderBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      selected: ''
    };
  }

  onSelect = (opt: any) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };

  handleVisibleChange = (visible: boolean) => {
    this.setState({
      visible
    });
  };

  public render() {
    const { title } = this.props;
    return <NavBar
      mode="dark"
      rightContent={
        <Popover mask
          // overlayClassName="fortest"
          // overlayStyle={{ color: 'currentColor' }}
          visible={this.state.visible}
          overlay={[
            (<Item key="1" value="contact" icon={<img className="am-icon am-icon-xs" src={ContactUs} alt="" />} data-seed="logId">
              <span onClick={() => this.props.history.push('/homePage/contact')}>联系我们</span>
            </Item>),
            (<Item key="2" value="about" icon={<img className="am-icon am-icon-xs" src={AboutUs} alt="" />} data-seed="logId2">
              <span onClick={() => this.props.history.push('/homePage/about')}>关于我们</span>
            </Item>)
          ]}
          align={{
            overflow: { adjustY: 0, adjustX: 0 }
          }}
          onVisibleChange={this.handleVisibleChange}
          onSelect={this.onSelect}
        >
          <div style={{
            height: '100%',
            padding: '0 15px',
            marginRight: '-15px',
            display: 'flex',
            alignItems: 'center',
          }}
          >
            <Icon type="ellipsis" />
          </div>
        </Popover>
      }
    >
      {title}
    </NavBar>
  }
}

export default withRouter(HeaderBar);