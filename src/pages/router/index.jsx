'use strict';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
// 要用 hash 模式就用 HashRouter ，其他都不用改
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Loadable from 'react-loadable';

import Layout from 'components/layout/index';

import './index.scss';

// 这是老的方式 react 官方支持后不需要用 Loadable 了
// const LoadablePage1 = Loadable({
//   loader: () => import(/* webpackChunkName: "page1" */ './page1/index'),
//   loading: function(){
//     return <div>loading</div>;
//   },
// });
// const LoadablePage2 = Loadable({
//   loader: () => import(/* webpackChunkName: "page2" */ './page2/index'),
//   loading: function(){
//     return <div>loading</div>;
//   },
// });
// <Router>
//   <Layout>
//     <Switch>
//       <Route exact path="/page1/:id" component={LoadablePage1}/>
//       <Route path="/page2" component={LoadablePage2}/>
//       <Route component={LoadablePage1} />
//     </Switch>
//   </Layout>
// </Router>

const Page1 = lazy(() => import(/* webpackChunkName: "page1" */ './page1/index'));
const Page2 = lazy(() => import(/* webpackChunkName: "page2" */ './page2/index'));

ReactDOM.render(<div>
  <Router>
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/page1/:id" component={Page1}/>
          <Route path="/page2" component={Page2}/>
          <Route component={Page1} />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
</div>, document.getElementById('root'));
