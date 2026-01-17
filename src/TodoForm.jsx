import React from "react";

const TodoForm = React.memo(({inputValue, setInputValue, addTodo}) =>{
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
    return(<>
        <h1>ToDo List</h1>
        <div className="todo-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Новая задача"
        />
        <button onClick={addTodo}>Добавить</button>
      </div></>
    )
});
export default TodoForm;