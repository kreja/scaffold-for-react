'use strict';

import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'

import './index.scss';

class Index extends React.Component {
  constructor(props){
    super(props);

    console.log('constructor page1')
  }
  goPage2 = () => {
    const { history } = this.props;

    history.push('/page2');
  }
  render() {
    console.log(this.props.match);

    return <div className="page1">
      I'm page1. 
      <div>go to <Link to="/page2">Page2</Link></div>
      {/* 利用 match.url + 相对路径，继续跳 */}
      <div>go to <Link to={`${this.props.match.url}/xxx`}>xxx</Link></div>
      <a onClick={this.goPage2} href="javascript:;">通过 history 跳转</a>

      {/* 这里也可以写路由 */}
      <Route exact path="/xx" render={() => <div>你是通过/xx路径进来的！</div>} />
    </div>;
  }
}

export default Index;