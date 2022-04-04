import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  /* background: gray;  사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

function TodoList() {
  const todos = useTodoState();

  return (
    <TodoListBlock>
      {/* map을 화살표 함수로 사용할 때는 리턴() 또는 {return 컴포넌트;}를 작성 */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        ></TodoItem>
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
