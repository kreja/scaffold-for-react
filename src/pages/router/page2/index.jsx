'use strict';

import React from 'react';
import { Link } from 'react-router-dom'

import './index.scss';

class Index extends React.Component {
  render() {
    console.log(this.props.match);
    
    return <div className="page2">
      I'm page2. 
      <div>go to <Link to="/page1">/page1</Link></div>
      <div>go to <Link to="/page1/2">/page1/2 带有参数</Link></div>
      <div>go to <Link to="/xx">/xx 会有特别渲染内容</Link></div>
      <div>go to <Link to="/xx?test=123">/xx?test=123</Link></div>
    </div>;
  }
}

export default Index;
