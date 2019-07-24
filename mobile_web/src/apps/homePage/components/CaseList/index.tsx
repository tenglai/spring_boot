import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Grid } from 'antd-mobile';
import { case_list } from '../../../../assets/images/cases';
import './index.less';

interface IProps extends RouteComponentProps<any> {
  //
}

interface IState {
  //
}

class CaseList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div className="case_content">
      <div className="sub-title">产品列表</div>
      <Grid data={case_list}
        columnNum={3}
        renderItem={(dataItem: any) => (
          <div onClick={() => this.props.history.push('/homePage/home/detail')}>
            <img src={dataItem.img} style={{ width: '75px', height: '75px' }} alt="" />
            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
              <span>{dataItem.title}</span>
            </div>
          </div>
        )}
      />
    </div>
  }
}

export default withRouter(CaseList);