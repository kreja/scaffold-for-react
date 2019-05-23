let nextTodoId = 0;

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const fetchStepAndAdd = () => {
  const myAction = (dispatch) => {

    return new Promise((resolve, reject) => { // mock 一个接口
      setTimeout(() => {
        const text = 'yoyo';
        dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        });

        resolve(text);
      }, 1000);
    });
  };

  myAction.type = 'FETCH_STEP_AND_ADD'; // 这样就可以打印出 action 的 type 了

  return myAction;
}