'use strict';

import { Link } from 'react-router';
import './index.scss';

class Layout extends React.Component {
  constructor(props) {
    super(props);

    [
      'renderMenus'
    ].map((s) => {
      this[s] = this[s].bind(this);
    });
  }
  renderMenus() {
    const menus = window.menus || {};
    let Menus = [];
    for (var pageName in menus) {
      Menus.push(
        <Link key={ pageName } 
            className="nav" 
            activeClassName="active" 
            to={ menus[pageName].path }>
          { pageName }
        </Link>
      );
    }

    return Menus;
  }
  render() {
    return (
      <div className="c-layout">
        <div>Nav: { this.renderMenus() }</div>
        <div className="content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Layout;
