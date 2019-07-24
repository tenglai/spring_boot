import * as React from 'react';
import { SearchBar as Search } from 'antd-mobile';
import './index.less';

interface IProps {
  placeholder: string;
  maxLength?: number;
  handleSearch?: (data: any) => void;
}

interface IState {
  //
}

class SearchBar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { placeholder, maxLength, handleSearch } = this.props;
    return <Search
      className="search_content"
      placeholder={placeholder}
      onSubmit={value => handleSearch && handleSearch(value)}
      maxLength={maxLength}
    />
  }
}

export default SearchBar;