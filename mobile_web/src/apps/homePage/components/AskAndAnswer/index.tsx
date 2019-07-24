import * as React from 'react';
import { Accordion, List } from 'antd-mobile';
import './index.less';

interface IProps {
  //
}

interface IState {
  //
}

class AskAndAnswer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  onChange = (key: any) => {
    console.log(key);
  }

  public render() {
    return <div className="askAndAnswer_content">
      <div className="sub-title">问答</div>
      <Accordion accordion openAnimation={{}} className="my-accordion" onChange={this.onChange}>
        <Accordion.Panel header="为什么加盟?">
          <List className="my-list">
            <List.Item>理由 1</List.Item>
            <List.Item>理由 2</List.Item>
            <List.Item>理由 3</List.Item>
          </List>
        </Accordion.Panel>
        <Accordion.Panel header="有哪些优势?" className="pad">
          优点 1
        </Accordion.Panel>
      </Accordion>
    </div>
  }
}

export default AskAndAnswer;