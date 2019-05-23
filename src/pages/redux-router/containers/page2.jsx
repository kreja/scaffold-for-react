'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { addTodo, fetchStepAndAdd } from '../actions';

// 其实这可以提出到 UI 组件目录中
class Index extends React.Component {
  handleAdd = () => {
    // this.props.dispatch(addTodo('test ya')) // 不传 mapDispatchToProps 可用
    this.props.addTodo('test~');
  }

  handleFetchStepAndAdd = () => {
    this.props.fetchStepAndAdd().then(text => {
      console.log(`added text: ${text}`)
    });
  }

  render() {
    const { todos } = this.props;

    return <div className="page-redux">
      <h1>page2</h1>
      <div>go to <Link to="/page1">Page1</Link></div>
      <button onClick={this.handleAdd}>ADD</button>
      <button onClick={this.handleFetchStepAndAdd}>fetch and add</button>
      {
        todos.map(item => <div key={item.id}>{item.text}</div>)
      }
    </div>;
  }
}

const mapStateToProps = state => ({
  todos: state.todos
});

const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
  fetchStepAndAdd: text => dispatch(fetchStepAndAdd(text)),
});

// 或者设为对象
// const mapDispatchToProps = {
//   addTodo
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps // 不加这个就会传入 dispatch 作为 props
)(Index);