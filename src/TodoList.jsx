import React from "react"

const TodoList = React.memo(({currentTodos, setEditValue,
                editValue, saveEdit, cancelEdit,
                toggleTodo, startEditing, deleteTodo, 
                editingId}) => {
return(
    <ul className="todo-list">
      {currentTodos.length === 0 
      ?(<p className="empty-message">Нет задач</p>) 
      :(currentTodos.map(todo => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          {editingId === todo.id 
          ?(<div className="edit-form">
            <input value={editValue}
             onChange={(e) => setEditValue(e.target.value)}
              autoFocus/>
              <div className="edit-buttons">
                <button className="save" onClick={() => saveEdit(todo.id)}>Сохранить</button>
                <button className="cancel" onClick={cancelEdit}>Отмена</button>
              </div>
            </div>) 
          :(<><div className="todo-content">
                <span className="todo-text" onDoubleClick={() => startEditing(todo.id, todo.text)}>
                  {todo.text}</span>
                  <input type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}/>
                  <span className="todo-date">{new Date(todo.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="todo-actions">
                <button className="edit" onClick={() => startEditing(todo.id, todo.text)}>Редактировать</button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>Удалить</button>
              </div>
            </>
            )
          }
        </li>))
      )}
    </ul>
  )
});

export default TodoList;