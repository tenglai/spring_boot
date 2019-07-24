import * as React from 'react';
import { Toast } from 'antd-mobile';
import HeaderBar from 'apps/homePage/components/HeaderBar';
import SearchBar from 'apps/homePage/components/SearchBar';
import Banner from 'apps/homePage/components/Banner';
import CaseList from 'apps/homePage/components/CaseList';
import AskAndAnswer from 'apps/homePage/components/AskAndAnswer';
import './index.less';

interface IProps {
  //
}

interface IState {
  //
}

class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  handleSearch = (val: string) => {
    Toast.info('暂无数据', 1);
  }

  public render() {
    return (
      <div className="home_content">
        <HeaderBar title={'首页'} />
        <div className="home_content_inner">
          <SearchBar placeholder={'请输入关键字'} handleSearch={this.handleSearch} />
          <Banner />
          <CaseList />
          <AskAndAnswer />
        </div>
      </div>
    );
  }
}

export default Home;