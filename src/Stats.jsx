import React from "react";

const Stats = React.memo(({todos, currentPage, totalPages})=>{
    return(<>
        {todos.length > 0 && (
            <div className="stats">
              Всего задач: {todos.length} | 
              Завершено: {todos.filter(t => t.completed).length} | 
              Осталось: {todos.filter(t => !t.completed).length} |
              Страница: {currentPage} из {totalPages}
            </div>
          )}
          </>
    )
})
export default Stats;