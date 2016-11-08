'use strict';

import CTest from 'components/test/';
import './index.scss';

class Test extends React.Component {
  constructor(props) {
    super(props);
    
    [].map(f => {
      this[f] = this[f].bind(this);
    });
  }
  render() {
    return (
      <div>
        <div>111</div>
        <CTest />
      </div>
    );
  }
}

ReactDOM.render(<Test />, document.getElementById('container'));

// todo::怎么不用在每个文件都加这段
if (module.hot) {
  module.hot.accept();
}
